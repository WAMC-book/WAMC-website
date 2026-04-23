"""SQLAlchemy ORM models for Supabase."""
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime
from database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Lead(Base):
    __tablename__ = "leads"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    first_name = Column(String(80), nullable=False)
    last_name = Column(String(80), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    role = Column(String(120), nullable=False)
    source = Column(String(60), nullable=False, default="chapter_download")
    locale = Column(String(8), nullable=False, default="en", index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=utcnow, index=True)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    message = Column(Text, nullable=False)
    locale = Column(String(8), nullable=False, default="en")
    created_at = Column(DateTime(timezone=True), nullable=False, default=utcnow, index=True)
