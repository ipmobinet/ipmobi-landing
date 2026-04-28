import os

# OAuth
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID", "")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET", "")

# JWT
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-in-production-k8s9d7f3")

# Proxy
PROXY_DOMAIN = os.getenv("PROXY_DOMAIN", "gw.ipmobi.net")
TRIAL_DURATION_MINUTES = int(os.getenv("TRIAL_DURATION_MINUTES", "15"))
TRIAL_MAX_BYTES = int(os.getenv("TRIAL_MAX_BYTES", str(104857600)))  # 100 MB

# Backend
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8001")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# SSH provisioning (placeholder)
SSH_HOST = os.getenv("SSH_HOST", "")
SSH_USER = os.getenv("SSH_USER", "")
SSH_KEY_PATH = os.getenv("SSH_KEY_PATH", "")

# DB
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./trial.db")
