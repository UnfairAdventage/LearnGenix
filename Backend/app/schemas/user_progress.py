from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserProgressBase(BaseModel):
    user_id: UUID
    exercise_id: UUID
    score: float = 0
    time_spent: Optional[int] = 0
    answer: Optional[str] = None
    is_correct: Optional[bool] = False

class UserProgressCreate(UserProgressBase):
    pass

class UserProgressUpdate(BaseModel):
    score: Optional[float] = None
    time_spent: Optional[int] = None
    answer: Optional[str] = None
    is_correct: Optional[bool] = None

class UserProgress(UserProgressBase):
    id: UUID
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True 