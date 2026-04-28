from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Vishesh & Veeraja Wedding API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ----------------------- RSVP MODELS -----------------------
class RSVPCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    guest_name: str = Field(..., min_length=1, max_length=120)
    side: Literal["groom", "bride"]
    event_id: str
    event_name: str
    status: Literal["attending", "not_attending"]
    note: Optional[str] = None


class RSVP(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    guest_name: str
    side: Literal["groom", "bride"]
    event_id: str
    event_name: str
    status: Literal["attending", "not_attending"]
    note: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ----------------------- ROUTES -----------------------
@api_router.get("/")
async def root():
    return {"message": "Vishesh & Veeraja Wedding API", "date": "2026-05-08"}


@api_router.post("/rsvp", response_model=RSVP)
async def create_rsvp(payload: RSVPCreate):
    rsvp = RSVP(**payload.model_dump())
    doc = rsvp.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.rsvps.insert_one(doc)
    return rsvp


@api_router.get("/rsvp", response_model=List[RSVP])
async def list_rsvps(side: Optional[str] = None, status: Optional[str] = None):
    query = {}
    if side:
        query['side'] = side
    if status:
        query['status'] = status
    rsvps = await db.rsvps.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for r in rsvps:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rsvps


@api_router.get("/rsvp/summary")
async def rsvp_summary():
    total = await db.rsvps.count_documents({})
    attending = await db.rsvps.count_documents({"status": "attending"})
    not_attending = await db.rsvps.count_documents({"status": "not_attending"})
    return {
        "total": total,
        "attending": attending,
        "not_attending": not_attending,
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

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
