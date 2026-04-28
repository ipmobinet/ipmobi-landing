from sqlalchemy import Column, Integer, BigInteger, String, Boolean, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, timezone
import enum

Base = declarative_base()


class TrialStatus(str, enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    REVOKED = "revoked"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    provider = Column(String(16), nullable=False)  # "google" or "github"
    provider_id = Column(String(128), nullable=False, unique=True)
    email = Column(String(256), nullable=True)
    name = Column(String(256), nullable=True)
    avatar_url = Column(String(512), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_blocked = Column(Boolean, default=False)

    trials = relationship("Trial", back_populates="user", cascade="all, delete-orphan")


class Trial(Base):
    __tablename__ = "trials"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    proxy_host = Column(String(256), nullable=False)
    proxy_port = Column(Integer, nullable=False)
    proxy_user = Column(String(64), nullable=False)
    proxy_pass = Column(String(64), nullable=False)
    started_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    expires_at = Column(DateTime(timezone=True), nullable=False)
    bytes_used = Column(BigInteger, default=0)
    status = Column(SAEnum(TrialStatus), default=TrialStatus.ACTIVE)

    user = relationship("User", back_populates="trials")
