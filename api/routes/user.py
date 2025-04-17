from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

@router.post("/create_iplogger")
async def create_iplogger():
    return {"message": "IP logger created successfully"}


@router.get("/get_badtrips")
async def get_badtrips():
    return {"message": "IP logger retrieved successfully"}


@router.delete("/delete_iplogger")
async def delete_iplogger():
    return {"message": "IP logger deleted successfully"}

