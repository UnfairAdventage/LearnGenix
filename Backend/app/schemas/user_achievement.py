from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserAchievementBase(BaseModel):
    user_id: UUID
    achievement_id: UUID

class UserAchievementCreate(UserAchievementBase):
    pass

class UserAchievementUpdate(BaseModel):
    unlocked_at: Optional[datetime] = None

class UserAchievement(UserAchievementBase):
    id: UUID
    unlocked_at: Optional[datetime] = None

    class Config:
        orm_mode = True 