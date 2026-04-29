"""
3x-ui API integration for the admin backend.
Proxies data from the local 3x-ui panel and adds auth.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime, timedelta

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

import httpx
from fastapi import APIRouter, HTTPException, Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from database import get_session
from models import User, Trial

router = APIRouter(prefix="/api/admin", tags=["admin"])

XUI_BASE = "http://localhost:2053"
XUI_USER = "admin"
XUI_PASS = "admin"

# Admin auth from environment
ADMIN_TOKEN = os.getenv("ADMIN_PASSWORD", "changeme")

# Rate limiting for login attempts
login_attempts: dict = {}

async def verify_admin(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Admin authorization required")
    token = authorization.replace("Bearer ", "")
    if token != ADMIN_TOKEN:
        raise HTTPException(403, "Invalid admin token")
    return True

# ── User Management ──────────────────────────────────────────

@router.get("/users")
async def list_users(auth: bool = Depends(verify_admin), session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    user_list = []
    for user in users:
        trial_result = await session.execute(
            select(Trial).where(Trial.user_id == user.id).order_by(Trial.started_at.desc()).limit(1)
        )
        latest_trial = trial_result.scalar_one_or_none()
        count_result = await session.execute(select(func.count(Trial.id)).where(Trial.user_id == user.id))
        trial_count = count_result.scalar() or 0
        user_list.append({
            "id": user.id, "email": user.email or "N/A", "name": user.name or "Unknown",
            "provider": user.provider, "provider_id": user.provider_id,
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "is_blocked": user.is_blocked, "trial_count": trial_count,
            "latest_trial": {
                "status": latest_trial.status.value if latest_trial else None,
                "started_at": latest_trial.started_at.isoformat() if latest_trial and latest_trial.started_at else None,
                "expires_at": latest_trial.expires_at.isoformat() if latest_trial and latest_trial.expires_at else None,
                "proxy_port": latest_trial.proxy_port if latest_trial else None,
                "bytes_used": latest_trial.bytes_used if latest_trial else 0,
            } if latest_trial else None,
        })
    return {"users": user_list, "total": len(user_list)}

@router.post("/users/{user_id}/unbind")
async def unbind_user(user_id: int, auth: bool = Depends(verify_admin), session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Trial).where(Trial.user_id == user_id))
    trials = result.scalars().all()
    for t in trials:
        await session.delete(t)
    await session.commit()
    return {"status": "ok", "message": f"Unbound {len(trials)} trial(s) for user {user_id}"}

@router.post("/users/{user_id}/block")
async def block_user(user_id: int, auth: bool = Depends(verify_admin), session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(404, "User not found")
    user.is_blocked = not user.is_blocked
    await session.commit()
    return {"status": "ok", "blocked": user.is_blocked}

# ── Auth / Session ───────────────────────────────────────────

@router.post("/verify")
async def verify_admin_password(data: dict):
    ip = "global"
    now = datetime.now()
    login_attempts[ip] = [t for t in login_attempts.get(ip, []) if now - t < timedelta(minutes=5)]
    if len(login_attempts.get(ip, [])) >= 5:
        raise HTTPException(429, "Too many attempts. Try again in 5 minutes.")
    pwd = data.get("password", "")
    if pwd == ADMIN_TOKEN:
        login_attempts[ip] = []
        return {"status": "ok"}
    login_attempts.setdefault(ip, []).append(now)
    raise HTTPException(403, "Invalid admin password")

@router.get("/check-session")
async def check_session(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Not authenticated")
    token = authorization.replace("Bearer ", "")
    if token == ADMIN_TOKEN:
        return {"status": "ok", "authenticated": True}
    raise HTTPException(401, "Invalid session")

# ── Stats / 3x-UI Proxy ──────────────────────────────────────

async def _xui_login() -> httpx.AsyncClient:
    client = httpx.AsyncClient(base_url=XUI_BASE, timeout=10)
    resp = await client.post("/login", json={"username": XUI_USER, "password": XUI_PASS})
    if resp.status_code != 200:
        raise HTTPException(500, "Failed to connect to 3x-ui")
    data = resp.json()
    if not data.get("success"):
        raise HTTPException(500, f"3x-ui login failed: {data.get('msg')}")
    return client

@router.get("/stats")
async def get_stats(auth: bool = Depends(verify_admin)):
    try:
        client = await _xui_login()
        resp = await client.get("/panel/api/inbounds/list")
        inbounds = resp.json().get("obj", [])
        total_proxies = len(inbounds)
        active_proxies = sum(1 for i in inbounds if i.get("enable"))
        total_up = sum(i.get("up", 0) for i in inbounds)
        total_down = sum(i.get("down", 0) for i in inbounds)
        total_bandwidth_gb = round((total_up + total_down) / (1024**3), 2)
        total_up_gb = round(total_up / (1024**3), 2)
        total_down_gb = round(total_down / (1024**3), 2)
        return {
            "total_proxies": total_proxies, "active_proxies": active_proxies,
            "total_bandwidth_gb": total_bandwidth_gb, "total_up_gb": total_up_gb, "total_down_gb": total_down_gb,
        }
    except Exception as e:
        raise HTTPException(500, f"Failed to fetch stats: {e}")

@router.get("/inbounds")
async def get_inbounds(auth: bool = Depends(verify_admin)):
    try:
        client = await _xui_login()
        resp = await client.get("/panel/api/inbounds/list")
        return resp.json()
    except Exception as e:
        raise HTTPException(500, f"Failed to fetch inbounds: {e}")

@router.post("/inbounds/{inbound_id}/toggle")
async def toggle_inbound(inbound_id: int, auth: bool = Depends(verify_admin)):
    try:
        client = await _xui_login()
        resp = await client.post(f"/panel/api/inbounds/update/{inbound_id}")
        return resp.json()
    except Exception as e:
        raise HTTPException(500, f"Failed to toggle inbound: {e}")

@router.post("/inbounds/{inbound_id}/reset-traffic")
async def reset_traffic(inbound_id: int, auth: bool = Depends(verify_admin)):
    try:
        client = await _xui_login()
        resp = await client.post(f"/panel/api/inbounds/resetAllTraffics/{inbound_id}")
        return resp.json()
    except Exception as e:
        raise HTTPException(500, f"Failed to reset traffic: {e}")

@router.get("/clients")
async def get_clients(auth: bool = Depends(verify_admin)):
    try:
        client = await _xui_login()
        resp = await client.get("/panel/api/inbounds/list")
        inbounds = resp.json().get("obj", [])
        all_clients = []
        for inbound in inbounds:
            client_list = inbound.get("clientStats", [])
            for c in client_list:
                c["inbound_id"] = inbound.get("id")
                c["inbound_remark"] = inbound.get("remark")
                all_clients.append(c)
        return {"clients": all_clients, "total": len(all_clients)}
    except Exception as e:
        raise HTTPException(500, f"Failed to fetch clients: {e}")

@router.post("/rotate/{inbound_id}")
async def rotate_proxy(inbound_id: int, auth: bool = Depends(verify_admin)):
    try:
        client = await _xui_login()
        new_port = inbound_id + 10000
        resp = await client.post(f"/panel/api/inbounds/update/{inbound_id}", json={"port": new_port})
        return {"status": "rotated", "new_port": new_port}
    except Exception as e:
        raise HTTPException(500, f"Rotation failed: {e}")
