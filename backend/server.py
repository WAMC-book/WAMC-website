from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Who Are My Clients API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------- Models ----------

class LeadCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    role: str = Field(min_length=1, max_length=120)  # entrepreneur status / role
    source: Optional[str] = "chapter_download"


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    first_name: str
    last_name: str
    email: str
    role: str
    source: str
    created_at: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    message: str
    created_at: str


class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: str
    category: str
    link: Optional[str] = None
    image: Optional[str] = None
    type: str  # "article" | "worksheet" | "tool" | "download"


# ---------- Seed resources (static placeholder catalog) ----------

SEED_RESOURCES: List[dict] = [
    {
        "id": "r-001",
        "title": "The Client Clarity Worksheet",
        "description": "A printable worksheet to map out who you actually serve — and who you don't.",
        "category": "Worksheet",
        "link": "#",
        "image": "/assets/images/stock-crosswalk.jpg",
        "type": "worksheet",
    },
    {
        "id": "r-002",
        "title": "10 Questions Before You Launch",
        "description": "A short reflection guide for early-stage founders who haven't sold yet.",
        "category": "Guide",
        "link": "#",
        "image": "/assets/images/stock-street.jpg",
        "type": "download",
    },
    {
        "id": "r-003",
        "title": "How I Misread My First Client",
        "description": "A short essay on the gap between who you think you're serving and who actually shows up.",
        "category": "Article",
        "link": "#",
        "image": "/assets/images/stock-london.jpg",
        "type": "article",
    },
    {
        "id": "r-004",
        "title": "Positioning Map Template",
        "description": "A one-page canvas to describe your client, their context, and what they are really hiring you for.",
        "category": "Template",
        "link": "#",
        "image": "/assets/images/stock-professionals.jpg",
        "type": "tool",
    },
    {
        "id": "r-005",
        "title": "First 3 Chapters of the Book",
        "description": "Start reading today. A free preview of \"Who Are My Clients?\"",
        "category": "Book Preview",
        "link": "#chapters",
        "image": "/assets/images/book-cover.png",
        "type": "download",
    },
    {
        "id": "r-006",
        "title": "Reader Questions — Answered",
        "description": "A growing list of questions from readers, with short, honest answers.",
        "category": "Article",
        "link": "#",
        "image": "/assets/images/stock-crosswalk.jpg",
        "type": "article",
    },
]


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Who Are My Clients API", "status": "ok"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "first_name": payload.first_name.strip(),
        "last_name": payload.last_name.strip(),
        "email": payload.email.lower().strip(),
        "role": payload.role.strip(),
        "source": payload.source or "chapter_download",
        "created_at": now_iso(),
    }
    await db.leads.insert_one(doc.copy())
    return Lead(**doc)


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    items = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Lead(**i) for i in items]


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "message": payload.message.strip(),
        "created_at": now_iso(),
    }
    await db.contact_messages.insert_one(doc.copy())
    return ContactMessage(**doc)


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [ContactMessage(**i) for i in items]


@api_router.get("/resources", response_model=List[Resource])
async def list_resources(category: Optional[str] = None):
    items = SEED_RESOURCES
    if category and category.lower() != "all":
        items = [r for r in items if r["category"].lower() == category.lower()]
    return [Resource(**r) for r in items]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
