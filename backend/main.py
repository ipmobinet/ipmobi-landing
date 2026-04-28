import uvicorn
from fastapi import FastAPI
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


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8090, reload=True)
