from fastapi import APIRouter, Depends, HTTPException, Header, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from datetime import datetime, timezone, timedelta
import random

from database import get_session
from models import User, Trial, TrialStatus
from auth import create_access_token, decode_access_token
from provisioning import provision_proxy, revoke_proxy
from config import TRIAL_DURATION_MINUTES, TRIAL_MAX_BYTES

router = APIRouter(prefix="/api/trial", tags=["trial"])


async def get_current_user(
    authorization: str = Header(None),
    session: AsyncSession = Depends(get_session),
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = authorization.split(" ", 1)[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    if user.is_blocked:
        raise HTTPException(status_code=403, detail="Account is blocked")

    return user


@router.post("/start")
async def start_trial(
    request: Request,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    x_device_fingerprint: str = Header(None),
    x_forwarded_for: str = Header(None),
):
    """Start a new trial for the authenticated user."""

    # Check if user already has an active trial
    result = await session.execute(
        select(Trial).where(
            and_(
                Trial.user_id == user.id,
                Trial.status == TrialStatus.ACTIVE,
            )
        )
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=409,
            detail=f"Active trial already exists (expires at {existing.expires_at.isoformat()})",
        )

    # Check if user has had trials in the past (max 1 trial ever per user)
    result = await session.execute(
        select(Trial).where(Trial.user_id == user.id)
    )
    past_trials = result.scalars().all()
    if len(past_trials) >= 1:
        raise HTTPException(
            status_code=429,
            detail="You have already used your free trial. Only one trial per account.",
        )

    # Provision proxy
    try:
        proxy_info = provision_proxy()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to provision proxy: {str(e)}")

    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=TRIAL_DURATION_MINUTES)

    trial = Trial(
        user_id=user.id,
        proxy_host=proxy_info["host"],
        proxy_port=proxy_info["port"],
        proxy_user=proxy_info["username"],
        proxy_pass=proxy_info["password"],
        started_at=now,
        expires_at=expires_at,
        bytes_used=0,
        status=TrialStatus.ACTIVE,
    )

    session.add(trial)
    await session.commit()
    await session.refresh(trial)

    return {
        "status": "success",
        "trial": {
            "id": trial.id,
            "proxy_host": trial.proxy_host,
            "proxy_port": trial.proxy_port,
            "proxy_user": trial.proxy_user,
            "proxy_pass": trial.proxy_pass,
            "started_at": trial.started_at.isoformat(),
            "expires_at": trial.expires_at.isoformat(),
            "bytes_used": trial.bytes_used,
            "max_bytes": TRIAL_MAX_BYTES,
            "duration_minutes": TRIAL_DURATION_MINUTES,
            "status": trial.status.value,
        },
        "token": create_access_token({"user_id": user.id, "type": "trial"}),
    }


@router.get("/status")
async def get_trial_status(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Get current trial status."""

    result = await session.execute(
        select(Trial).where(
            and_(
                Trial.user_id == user.id,
                Trial.status == TrialStatus.ACTIVE,
            )
        ).order_by(Trial.id.desc())
    )
    trial = result.scalar_one_or_none()

    if not trial:
        # Check if expired
        result = await session.execute(
            select(Trial).where(Trial.user_id == user.id).order_by(Trial.id.desc())
        )
        trial = result.scalar_one_or_none()
        if trial:
            return {
                "status": "no_active_trial",
                "last_trial": {
                    "status": trial.status.value,
                    "expires_at": trial.expires_at.isoformat(),
                },
            }
        return {"status": "no_trial"}

    now = datetime.now(timezone.utc)

    # Auto-expire if past expiry
    if now >= trial.expires_at:
        trial.status = TrialStatus.EXPIRED
        await session.commit()
        return {
            "status": "expired",
            "trial": {
                "id": trial.id,
                "expires_at": trial.expires_at.isoformat(),
                "bytes_used": trial.bytes_used,
                "max_bytes": TRIAL_MAX_BYTES,
            },
        }

    time_remaining = (trial.expires_at - now).total_seconds()
    return {
        "status": "active",
        "trial": {
            "id": trial.id,
            "proxy_host": trial.proxy_host,
            "proxy_port": trial.proxy_port,
            "proxy_user": trial.proxy_user,
            "proxy_pass": trial.proxy_pass,
            "started_at": trial.started_at.isoformat(),
            "expires_at": trial.expires_at.isoformat(),
            "bytes_used": trial.bytes_used,
            "max_bytes": TRIAL_MAX_BYTES,
            "duration_minutes": TRIAL_DURATION_MINUTES,
            "time_remaining_seconds": int(time_remaining),
        },
    }


@router.post("/revoke")
async def revoke_trial(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Manually revoke an active trial."""

    result = await session.execute(
        select(Trial).where(
            and_(
                Trial.user_id == user.id,
                Trial.status == TrialStatus.ACTIVE,
            )
        )
    )
    trial = result.scalar_one_or_none()

    if not trial:
        raise HTTPException(status_code=404, detail="No active trial found")

    # Revoke on proxy server
    try:
        revoke_proxy(trial.proxy_user)
    except Exception:
        pass  # Non-fatal

    trial.status = TrialStatus.REVOKED
    await session.commit()

    return {"status": "revoked", "detail": "Trial has been revoked"}
