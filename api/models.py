from sqlalchemy import Column, String, JSON, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    created_at = Column(Date, nullable=False)


class IPLogger(Base):
    __tablename__ = "iploggers"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    template = Column(String, nullable=False)
    title_preview = Column(String, nullable=False)
    description_preview = Column(String, nullable=False)
    image_preview = Column(String, nullable=False)
    device_data = Column(Boolean, nullable=False)
    location_data = Column(Boolean, nullable=False)
    cam_data = Column(Boolean, nullable=False)
    created_at = Column(Date, nullable=False)

    user = relationship("User", back_populates="iploggers")


class BadTrip(Base):
    __tablename__ = "badtrips"

    id = Column(String, primary_key=True, index=True)
    iplogger_id = Column(String, ForeignKey("iploggers.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    ip = Column(String, nullable=False)
    device_data = Column(JSON, nullable=False)
    ip_location = Column(JSON, nullable=False)
    gps_location = Column(JSON, nullable=False)
    cam_image = Column(String, nullable=False)
    created_at = Column(Date, nullable=False)

    iplogger = relationship("IPLogger", back_populates="badtrips")
    user = relationship("User", back_populates="iploggers")