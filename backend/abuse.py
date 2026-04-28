import time
from datetime import datetime, timezone, timedelta

# In-memory IP rate limit: {ip: timestamp}
_ip_rate_map: dict[str, float] = {}

# Device fingerprint rate limit: {fingerprint: [timestamps]}
_fingerprint_map: dict[str, list[float]] = {}

# Blocklisted email domains (temp mail providers)
BLOCKLISTED_DOMAINS = {
    "mailinator.com",
    "guerrillamail.com",
    "10minutemail.com",
    "tempmail.com",
    "throwaway.email",
    "yopmail.com",
    "sharklasers.com",
    "trashmail.com",
    "maildrop.cc",
    "getnada.com",
    "temp-mail.org",
    "fakeinbox.com",
    "mailmetrash.com",
    "mailcatch.com",
    "spambox.us",
    "tempinbox.com",
    "discard.email",
    "mailexpire.com",
}


def check_ip_rate_limit(ip: str) -> bool:
    """
    Returns True if IP is allowed (within rate limit).
    Max 1 trial per IP per 24 hours.
    """
    now = time.time()
    last_time = _ip_rate_map.get(ip)
    if last_time and (now - last_time) < 86400:
        return False
    _ip_rate_map[ip] = now
    return True


def check_device_fingerprint(fingerprint: str) -> bool:
    """
    Returns True if device fingerprint is allowed.
    Max 3 trials per fingerprint per 30 days.
    """
    now = time.time()
    timestamps = _fingerprint_map.get(fingerprint, [])

    # Clean old entries
    cutoff = now - (30 * 86400)
    timestamps = [t for t in timestamps if t > cutoff]

    if len(timestamps) >= 3:
        return False

    timestamps.append(now)
    _fingerprint_map[fingerprint] = timestamps
    return True


def is_email_domain_blocklisted(email: str) -> bool:
    """Check if email domain is a known temporary email provider."""
    if not email or "@" not in email:
        return False
    domain = email.split("@", 1)[1].lower().strip()
    return domain in BLOCKLISTED_DOMAINS


async def check_github_account_age(access_token: str) -> tuple[bool, str | None]:
    """
    Check GitHub account age via API.
    Returns (is_valid, error_message).
    Rejects if account created < 30 days ago.
    """
    import httpx

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "ipmobi-trial",
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get("https://api.github.com/user", headers=headers, timeout=10)
            if resp.status_code != 200:
                return False, f"GitHub API error: {resp.status_code}"

            data = resp.json()
            created_at_str = data.get("created_at")
            if not created_at_str:
                return False, "Could not fetch account creation date"

            created_at = datetime.fromisoformat(created_at_str.replace("Z", "+00:00"))
            now = datetime.now(timezone.utc)
            days_old = (now - created_at).days

            if days_old < 30:
                return False, f"GitHub account is only {days_old} days old (minimum 30 required)"

            return True, None

        except httpx.RequestError as e:
            return False, f"GitHub API request failed: {str(e)}"


async def check_google_account_age(access_token: str) -> tuple[bool, str | None]:
    """
    Check Google account age via People API.
    Falls back to allowing if we can't get the data.
    """
    import httpx

    headers = {"Authorization": f"Bearer {access_token}"}

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(
                "https://people.googleapis.com/v1/people/me?personFields=metadata",
                headers=headers,
                timeout=10,
            )
            if resp.status_code != 200:
                # Cannot verify, allow by default
                return True, None

            data = resp.json()
            metadata = data.get("metadata", {})
            source = metadata.get("sources", [{}])[0]
            created_at_str = source.get("profileMetadata", {}).get("objectType")

            # Google doesn't reliably expose account creation date via People API
            # so we skip this check for Google and rely on other abuse prevention
            return True, None

        except httpx.RequestError:
            return True, None
