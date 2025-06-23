from pydantic import BaseModel
from typing import Optional, Any
from uuid import UUID
from datetime import datetime

class AchievementBase(BaseModel):
    name: str
    description: str
    icon: str
    points: Optional[int] = 0
    criteria: Optional[Any] = None

class AchievementCreate(AchievementBase):
    pass

class AchievementUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    points: Optional[int] = None
    criteria: Optional[Any] = None

class Achievement(AchievementBase):
    id: UUID
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True 