from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import bcrypt
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database import engine, get_db
from models import Lead as LeadORM, ContactMessage as ContactORM


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Auth config
JWT_SECRET = os.environ.get('JWT_SECRET', 'dev-secret')
JWT_ALG = 'HS256'
ADMIN_PASSWORD_HASH = os.environ.get('ADMIN_PASSWORD_HASH', '')

# Create the main app without a prefix
app = FastAPI(title="Who Are My Clients API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def verify_password(plain: str, hashed: str) -> bool:
    if not hashed:
        return False
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_token(hours: int = 12) -> str:
    payload = {
        "sub": "admin",
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=hours),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def require_admin(request: Request) -> dict:
    token = request.cookies.get("wamc_admin")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Invalid role")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Pydantic Schemas ----------

class LeadCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    role: str = Field(min_length=1, max_length=120)
    source: Optional[str] = "chapter_download"
    locale: Optional[str] = "en"


class LeadOut(BaseModel):
    model_config = ConfigDict(extra="ignore", from_attributes=True)
    id: str
    first_name: str
    last_name: str
    email: str
    role: str
    source: str
    locale: Optional[str] = "en"
    created_at: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)
    locale: Optional[str] = "en"


class ContactOut(BaseModel):
    model_config = ConfigDict(extra="ignore", from_attributes=True)
    id: str
    name: str
    email: str
    message: str
    locale: Optional[str] = "en"
    created_at: str


class LoginPayload(BaseModel):
    password: str = Field(min_length=1)


class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: str
    category: str
    link: Optional[str] = None
    image: Optional[str] = None
    type: str


def lead_to_out(row: LeadORM) -> LeadOut:
    return LeadOut(
        id=row.id,
        first_name=row.first_name,
        last_name=row.last_name,
        email=row.email,
        role=row.role,
        source=row.source,
        locale=row.locale,
        created_at=row.created_at.isoformat() if row.created_at else "",
    )


def contact_to_out(row: ContactORM) -> ContactOut:
    return ContactOut(
        id=row.id,
        name=row.name,
        email=row.email,
        message=row.message,
        locale=row.locale,
        created_at=row.created_at.isoformat() if row.created_at else "",
    )


SEED_RESOURCES: List[dict] = [
    {"id": "r-001", "title": "The Client Clarity Worksheet", "description": "A printable worksheet to map out who you actually serve — and who you don't.", "category": "Worksheet", "link": "#", "image": "/assets/images/stock-crosswalk.jpg", "type": "worksheet"},
    {"id": "r-002", "title": "10 Questions Before You Launch", "description": "A short reflection guide for early-stage founders who haven't sold yet.", "category": "Guide", "link": "#", "image": "/assets/images/stock-street.jpg", "type": "download"},
    {"id": "r-003", "title": "How I Misread My First Client", "description": "A short essay on the gap between who you think you're serving and who actually shows up.", "category": "Article", "link": "#", "image": "/assets/images/stock-london.jpg", "type": "article"},
    {"id": "r-004", "title": "Positioning Map Template", "description": "A one-page canvas to describe your client and what they are really hiring you for.", "category": "Template", "link": "#", "image": "/assets/images/stock-professionals.jpg", "type": "tool"},
    {"id": "r-005", "title": "First 3 Chapters of the Book", "description": "Start reading today. A free preview of \"Who Are My Clients?\"", "category": "Book Preview", "link": "#chapters", "image": "/assets/images/book-cover.png", "type": "download"},
    {"id": "r-006", "title": "Reader Questions — Answered", "description": "A growing list of questions from readers, with short, honest answers.", "category": "Article", "link": "#", "image": "/assets/images/stock-crosswalk.jpg", "type": "article"},
]


# ---------- Public Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Who Are My Clients API", "status": "ok"}


@api_router.post("/leads", response_model=LeadOut)
async def create_lead(payload: LeadCreate, db: AsyncSession = Depends(get_db)):
    row = LeadORM(
        first_name=payload.first_name.strip(),
        last_name=payload.last_name.strip(),
        email=payload.email.lower().strip(),
        role=payload.role.strip(),
        source=(payload.source or "chapter_download"),
        locale=(payload.locale or "en").lower(),
        created_at=now_utc(),
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return lead_to_out(row)


@api_router.post("/contact", response_model=ContactOut)
async def create_contact(payload: ContactCreate, db: AsyncSession = Depends(get_db)):
    row = ContactORM(
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        message=payload.message.strip(),
        locale=(payload.locale or "en").lower(),
        created_at=now_utc(),
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return contact_to_out(row)


@api_router.get("/resources", response_model=List[Resource])
async def list_resources(category: Optional[str] = None):
    items = SEED_RESOURCES
    if category and category.lower() != "all":
        items = [r for r in items if r["category"].lower() == category.lower()]
    return [Resource(**r) for r in items]


# ---------- Admin Routes ----------

@api_router.post("/admin/login")
async def admin_login(payload: LoginPayload, response: Response):
    if not verify_password(payload.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Invalid password")
    token = create_token(hours=12)
    response.set_cookie(
        key="wamc_admin",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=12 * 3600,
        path="/",
    )
    return {"ok": True, "token": token}


@api_router.post("/admin/logout")
async def admin_logout(response: Response):
    response.delete_cookie("wamc_admin", path="/")
    return {"ok": True}


@api_router.get("/admin/me")
async def admin_me(_: dict = Depends(require_admin)):
    return {"ok": True, "role": "admin"}


@api_router.get("/admin/leads", response_model=List[LeadOut])
async def admin_list_leads(_: dict = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LeadORM).order_by(LeadORM.created_at.desc()).limit(5000))
    return [lead_to_out(r) for r in result.scalars().all()]


@api_router.get("/admin/contacts", response_model=List[ContactOut])
async def admin_list_contacts(_: dict = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ContactORM).order_by(ContactORM.created_at.desc()).limit(5000))
    return [contact_to_out(r) for r in result.scalars().all()]


@api_router.get("/admin/stats")
async def admin_stats(_: dict = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    leads_count = (await db.execute(select(func.count()).select_from(LeadORM))).scalar_one()
    contacts_count = (await db.execute(select(func.count()).select_from(ContactORM))).scalar_one()
    en_leads = (await db.execute(select(func.count()).select_from(LeadORM).where(LeadORM.locale == "en"))).scalar_one()
    fr_leads = (await db.execute(select(func.count()).select_from(LeadORM).where(LeadORM.locale == "fr"))).scalar_one()
    return {
        "leads_total": leads_count,
        "contacts_total": contacts_count,
        "leads_by_locale": {"en": en_leads, "fr": fr_leads},
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db():
    await engine.dispose()
