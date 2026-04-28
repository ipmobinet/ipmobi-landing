import uvicorn
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import init_db
from routers.auth import router as auth_router
from routers.trial import router as trial_router
from routers.admin import router as admin_router
from config import BACKEND_URL, FRONTEND_URL


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="IPMobi Trial API",
    description="Free 15-minute / 100MB mobile proxy trial system",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(auth_router)
app.include_router(trial_router)
app.include_router(admin_router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "ipmobi-trial-api"}




@app.post("/api/rotate")
async def public_rotate_ip(api_key: str = Header(None)):
    """Public API endpoint for clients to rotate their proxy IP.
    Call: POST https://api.ipmobi.net/api/rotate
    Header: X-API-Key: <your_api_key>
    """
    if api_key != "ipmobi-rotate-key-2026":
        raise HTTPException(401, "Invalid API key")
    
    import subprocess, re, time
    result = {"success": False, "message": "", "new_ip": ""}
    
    try:
        proc = subprocess.run(["mmcli", "-L"], capture_output=True, text=True, timeout=5)
        modems = re.findall(r'/Modem/(\d+)', proc.stdout)
        if modems:
            modem_id = modems[0]
            subprocess.run(["mmcli", "-m", modem_id, "--simple-disconnect"], capture_output=True, timeout=15)
            time.sleep(2)
            subprocess.run(["mmcli", "-m", modem_id, "--simple-connect='apn=internet'"], capture_output=True, timeout=30)
            subprocess.run(["systemctl", "restart", "3proxy"], capture_output=True, timeout=10)
            result["success"] = True
            result["message"] = f"Modem {modem_id} reconnected. New IP in 3-5s."
            return result
    except: pass
    
    try:
        subprocess.run(["systemctl", "restart", "3proxy"], capture_output=True, timeout=10)
        result["success"] = True
        result["message"] = "3proxy restarted"
    except Exception as e:
        result["message"] = str(e)
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8090, reload=True)
