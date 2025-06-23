from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserStatsBase(BaseModel):
    user_id: UUID
    total_exercises: Optional[int] = 0
    completed_exercises: Optional[int] = 0
    average_score: Optional[float] = 0
    total_time: Optional[int] = 0
    total_points: Optional[int] = 0
    current_streak: Optional[int] = 0
    best_streak: Optional[int] = 0
    last_activity: Optional[datetime] = None

class UserStatsCreate(UserStatsBase):
    pass

class UserStatsUpdate(BaseModel):
    total_exercises: Optional[int] = None
    completed_exercises: Optional[int] = None
    average_score: Optional[float] = None
    total_time: Optional[int] = None
    total_points: Optional[int] = None
    current_streak: Optional[int] = None
    best_streak: Optional[int] = None
    last_activity: Optional[datetime] = None

class UserStats(UserStatsBase):
    id: UUID
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True 