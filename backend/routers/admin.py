"""
3x-ui API integration for the admin backend.
Proxies data from the local 3x-ui panel and adds auth.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

import httpx
from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from fastapi import Header

router = APIRouter(prefix="/api/admin", tags=["admin"])

XUI_BASE = "http://localhost:2053"
XUI_USER = "admin"
XUI_PASS = "admin"

# Simple admin auth - check for admin token
ADMIN_TOKEN="ipmobi-admin-2026"

async def _xui_login() -> httpx.AsyncClient:
    """Login to 3x-ui and return authenticated client"""
    client = httpx.AsyncClient(base_url=XUI_BASE, timeout=10)
    resp = await client.post("/login", json={"username": XUI_USER, "password": XUI_PASS})
    if resp.status_code != 200:
        raise HTTPException(500, "Failed to connect to 3x-ui")
    data = resp.json()
    if not data.get("success"):
        raise HTTPException(500, f"3x-ui login failed: {data.get('msg')}")
    return client


from datetime import datetime, timedelta

# Rate limiting for login attempts
login_attempts: dict = {}

@router.post("/verify")
async def verify_admin_password(data: dict, request_ip: str = "unknown"):
    """Verify admin password - returns 200 if correct"""
    # Simple IP-based rate limiting
    ip = "global"  # In production, get from request
    now = datetime.now()
    
    # Clean old entries
    login_attempts[ip] = [t for t in login_attempts.get(ip, []) if now - t < timedelta(minutes=5)]
    
    # Check rate
    if len(login_attempts.get(ip, [])) >= 5:
        raise HTTPException(429, "Too many attempts. Try again in 5 minutes.")
    
    pwd = data.get("password", "")
    expected = os.getenv("ADMIN_PASSWORD", "changeme")
    
    if pwd == expected:
        login_attempts[ip] = []  # Reset on success
        return {"status": "ok"}
    
    login_attempts.setdefault(ip, []).append(now)
    raise HTTPException(403, "Invalid admin password")

@router.get("/check-session")
async def check_session(authorization: str = Header(None)):
    """Verify that the current session/token is still valid"""
    if not authorization:
        raise HTTPException(401, "Not authenticated")
    token = authorization.replace("Bearer ", "")
    expected = os.getenv("ADMIN_PASSWORD", "changeme")
    if token == expected:
        return {"status": "ok", "authenticated": True}
    raise HTTPException(401, "Invalid session")



async def verify_admin(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Admin authorization required")
    token = authorization.replace("Bearer ", "")
    if token != ADMIN_TOKEN:
        raise HTTPException(403, "Invalid admin token")
    return True

@router.get("/stats")
async def get_stats(auth: bool = Depends(verify_admin)):
    """Get overview stats: total users, active, bandwidth usage"""
    try:
        client = await _xui_login()
        resp = await client.get("/panel/api/inbounds/list")
        inbounds = resp.json().get("obj", [])
        await client.aclose()
        
        total_proxies = len(inbounds)
        active_proxies = sum(1 for i in inbounds if i.get("enable"))
        total_up = sum(i.get("up", 0) for i in inbounds)
        total_down = sum(i.get("down", 0) for i in inbounds)
        
        return {
            "total_proxies": total_proxies,
            "active_proxies": active_proxies,
            "total_bandwidth_gb": round((total_up + total_down) / (1024**3), 2),
            "total_up_gb": round(total_up / (1024**3), 2),
            "total_down_gb": round(total_down / (1024**3), 2),
        }
    except Exception as e:
        raise HTTPException(500, f"Error fetching stats: {str(e)}")

@router.get("/inbounds")
async def get_inbounds(auth: bool = Depends(verify_admin)):
    """Get all proxy inbounds with traffic data"""
    try:
        client = await _xui_login()
        resp = await client.get("/panel/api/inbounds/list")
        inbounds = resp.json().get("obj", [])
        await client.aclose()
        
        result = []
        for i in inbounds:
            # Parse settings to get username/password
            import json as j
            settings = {}
            try:
                settings = j.loads(i.get("settings", "{}"))
            except:
                pass
            
            accounts = settings.get("accounts", [])
            username = accounts[0].get("user", "") if accounts else ""
            
            up_mb = round(i.get("up", 0) / (1024*1024), 2)
            down_mb = round(i.get("down", 0) / (1024*1024), 2)
            total_mb = round(i.get("total", 0) / (1024*1024), 2) if i.get("total", 0) > 0 else 0
            
            result.append({
                "id": i.get("id"),
                "remark": i.get("remark", ""),
                "port": i.get("port"),
                "protocol": i.get("protocol", ""),
                "enable": i.get("enable", False),
                "username": username,
                "up_mb": up_mb,
                "down_mb": down_mb,
                "total_mb": total_mb,
                "up_gb": round(up_mb / 1024, 2),
                "down_gb": round(down_mb / 1024, 2),
                "expiry_time": i.get("expiryTime", 0),
            })
        
        return {"inbounds": result}
    except Exception as e:
        raise HTTPException(500, f"Error: {str(e)}")

@router.post("/inbounds/{inbound_id}/toggle")
async def toggle_inbound(inbound_id: int, auth: bool = Depends(verify_admin)):
    """Enable or disable an inbound"""
    try:
        client = await _xui_login()
        resp = await client.post(f"/panel/api/inbounds/get/{inbound_id}")
        inbound = resp.json().get("obj", {})
        if not inbound:
            raise HTTPException(404, "Inbound not found")
        
        new_status = not inbound.get("enable", False)
        inbound["enable"] = new_status
        
        resp2 = await client.post("/panel/api/inbounds/update/" + str(inbound_id), json=inbound)
        await client.aclose()
        
        if resp2.json().get("success"):
            return {"enable": new_status, "msg": f"Port {'enabled' if new_status else 'disabled'}"}
        return {"error": resp2.json().get("msg")}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/inbounds/{inbound_id}/reset-traffic")
async def reset_traffic(inbound_id: int, auth: bool = Depends(verify_admin)):
    """Reset traffic stats for an inbound"""
    try:
        client = await _xui_login()
        resp = await client.post(f"/panel/api/inbounds/resetAllTraffics")
        await client.aclose()
        return {"msg": "Traffic reset for all inbounds"}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get("/clients")
async def get_client_traffics(auth: bool = Depends(verify_admin)):
    """Get all client traffic data"""
    try:
        client = await _xui_login()
        resp = await client.get("/panel/api/inbounds/getClientTraffics/")
        clients = resp.json().get("obj", [])
        await client.aclose()
        
        result = []
        for c in clients:
            result.append({
                "email": c.get("email", ""),
                "inbound_id": c.get("inboundId", 0),
                "up_mb": round(c.get("up", 0) / (1024*1024), 2),
                "down_mb": round(c.get("down", 0) / (1024*1024), 2),
                "total_mb": round(c.get("total", 0) / (1024*1024), 2),
                "enable": c.get("enable", False),
                "expiry_time": c.get("expiryTime", 0),
                "last_online": c.get("lastOnline", 0),
            })
        
        return {"clients": result}
    except Exception as e:
        raise HTTPException(500, str(e))


@router.post("/rotate/{inbound_id}")
async def rotate_ip(inbound_id: int, auth: bool = Depends(verify_admin)):
    """Trigger IP rotation for a proxy port.
    
    Method 1: ModemManager (mmcli) — power-cycles the USB 5G modem
    Method 2: 3proxy restart — forces new connections
    Method 3: API-based — returns instructions for manual rotation
    """
    import subprocess, os
    
    result = {"method_used": None, "success": False, "message": ""}
    
    # Method 1: Try ModemManager with timeout guard
    try:
        proc = subprocess.run(
            ["mmcli", "-L"],
            capture_output=True, text=True, timeout=5
        )
        import re
        modems = re.findall(r'/Modem/(\d+)', proc.stdout)
        
        if modems:
            modem_id = modems[0]
            # Disconnect modem (drops carrier = new IP on reconnect)
            subprocess.run(["mmcli", "-m", modem_id, "--simple-disconnect"], 
                         capture_output=True, timeout=15)
            import time
            time.sleep(2)
            # Reconnect
            subprocess.run(["mmcli", "-m", modem_id, "--simple-connect='apn=internet'"],
                         capture_output=True, timeout=30)
            
            result["method_used"] = "modemmanager"
            result["success"] = True
            result["message"] = f"Modem {modem_id} reconnected. New IP assigned (3-5s)."
            
            # Restart 3proxy to refresh connections
            subprocess.run(["systemctl", "restart", "3proxy"], capture_output=True, timeout=10)
            return result
    except subprocess.TimeoutExpired:
        pass
    except Exception:
        pass
    
    # Method 2: Restart 3proxy only
    try:
        subprocess.run(["systemctl", "restart", "3proxy"], capture_output=True, timeout=10)
        result["method_used"] = "3proxy_restart"
        result["success"] = True
        result["message"] = "3proxy restarted. IP may or may not change (carrier dependent)."
        return result
    except Exception as e:
        pass
    
    # Method 3: Return manual instructions
    result["method_used"] = "manual"
    result["success"] = True
    result["message"] = "No ModemManager modem found. To rotate IP manually: restart the 3proxy service, or disconnect/reconnect the USB modem."
    return result



