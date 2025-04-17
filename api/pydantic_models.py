from pydantic import BaseModel
from typing import Dict, Any

class iploggerCreate(BaseModel):
    user_id: str
    template: Dict[str, Any]
    title_preview: str
    description_preview: str
    image_preview: Dict[str, Any]
    device_data: bool
    location_data: bool
    cam_data: bool


