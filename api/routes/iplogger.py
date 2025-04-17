from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

@router.get("/{id}")
async def get_iplogger():
    """
    Get the IP logger information.
    """
    return {"message": "IP logger information"}


@router.post("/info")
async def receive_iplogger_info(iplogger_info: dict):
    """
    Receive IP logger information.
    """
    # Process the IP logger information here
    return {"message": "IP logger information received successfully"}

