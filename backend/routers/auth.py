from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import httpx
from datetime import datetime, timezone

from database import get_session, async_session
from models import User
from auth import create_access_token
from abuse import (
    check_ip_rate_limit,
    check_device_fingerprint,
    is_email_domain_blocklisted,
    check_github_account_age,
    check_google_account_age,
)
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, BACKEND_URL, FRONTEND_URL

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/google")
async def google_login():
    """Redirect to Google OAuth consent screen."""
    redirect_uri = f"{BACKEND_URL}/auth/google/callback"
    auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={redirect_uri}"
        "&response_type=code"
        "&scope=openid%20email%20profile"
        "&access_type=offline"
    )
    return RedirectResponse(url=auth_url)


@router.get("/google/callback")
async def google_callback(
    request: Request,
    code: str | None = None,
    error: str | None = None,
):
    """Handle Google OAuth callback."""
    if error:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error={error}")

    if not code:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=no_code")

    # Exchange code for tokens
    redirect_uri = f"{BACKEND_URL}/auth/google/callback"
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
            },
            headers={"Accept": "application/json"},
            timeout=10,
        )

        if token_resp.status_code != 200:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=token_exchange_failed")

        token_data = token_resp.json()
        access_token = token_data.get("access_token")
        if not access_token:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=no_access_token")

        # Get user info from Google
        user_resp = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=10,
        )

        if user_resp.status_code != 200:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=userinfo_failed")

        user_data = user_resp.json()

    google_id = user_data.get("id")
    email = user_data.get("email", "")
    name = user_data.get("name", "")
    avatar = user_data.get("picture", "")

    if not google_id:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=no_user_id")

    # Abuse prevention checks
    client_ip = request.client.host if request.client else "unknown"

    if not check_ip_rate_limit(client_ip):
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=rate_limited")

    if is_email_domain_blocklisted(email):
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=blocklisted_email")

    # Account age check (best effort for Google)
    age_valid, age_error = await check_google_account_age(access_token)
    if not age_valid:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=account_too_new&detail={age_error}")

    # Create or get user
    async with async_session() as session:
        result = await session.execute(
            select(User).where(
                User.provider == "google",
                User.provider_id == google_id,
            )
        )
        user = result.scalar_one_or_none()

        if not user:
            user = User(
                provider="google",
                provider_id=google_id,
                email=email,
                name=name,
                avatar_url=avatar,
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)
        elif user.is_blocked:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=blocked")

        jwt_token = create_access_token({"user_id": user.id, "provider": "google"})

    return RedirectResponse(url=f"{FRONTEND_URL}/auth/callback?token={jwt_token}&provider=google")


@router.get("/github")
async def github_login():
    """Redirect to GitHub OAuth consent screen."""
    redirect_uri = f"{BACKEND_URL}/auth/github/callback"
    auth_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        f"&redirect_uri={redirect_uri}"
        "&scope=read:user%20user:email"
    )
    return RedirectResponse(url=auth_url)


@router.get("/github/callback")
async def github_callback(
    request: Request,
    code: str | None = None,
    error: str | None = None,
):
    """Handle GitHub OAuth callback."""
    if error:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error={error}")

    if not code:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=no_code")

    # Exchange code for tokens
    redirect_uri = f"{BACKEND_URL}/auth/github/callback"
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": redirect_uri,
            },
            headers={"Accept": "application/json"},
            timeout=10,
        )

        if token_resp.status_code != 200:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=token_exchange_failed")

        token_data = token_resp.json()
        access_token = token_data.get("access_token")
        if not access_token:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=no_access_token")

        # Get user info from GitHub
        user_resp = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "ipmobi-trial",
            },
            timeout=10,
        )

        if user_resp.status_code != 200:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=userinfo_failed")

        user_data = user_resp.json()

        # Get primary email
        email = user_data.get("email", "")
        if not email:
            emails_resp = await client.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "ipmobi-trial",
                },
                timeout=10,
            )
            if emails_resp.status_code == 200:
                emails = emails_resp.json()
                for e in emails:
                    if e.get("primary") and e.get("verified"):
                        email = e.get("email", "")
                        break
                if not email and emails:
                    email = emails[0].get("email", "")

    github_id = str(user_data.get("id", ""))
    name = user_data.get("name") or user_data.get("login", "")
    avatar = user_data.get("avatar_url", "")

    if not github_id:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=no_user_id")

    # Abuse prevention checks
    client_ip = request.client.host if request.client else "unknown"

    if not check_ip_rate_limit(client_ip):
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=rate_limited")

    if is_email_domain_blocklisted(email):
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=blocklisted_email")

    # GitHub account age check
    age_valid, age_error = await check_github_account_age(access_token)
    if not age_valid:
        return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=account_too_new&detail={age_error}")

    # Create or get user
    async with async_session() as session:
        result = await session.execute(
            select(User).where(
                User.provider == "github",
                User.provider_id == github_id,
            )
        )
        user = result.scalar_one_or_none()

        if not user:
            user = User(
                provider="github",
                provider_id=github_id,
                email=email,
                name=name,
                avatar_url=avatar,
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)
        elif user.is_blocked:
            return RedirectResponse(url=f"{FRONTEND_URL}/trial?error=blocked")

        jwt_token = create_access_token({"user_id": user.id, "provider": "github"})

    return RedirectResponse(url=f"{FRONTEND_URL}/auth/callback?token={jwt_token}&provider=github")
