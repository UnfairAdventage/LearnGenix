from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class TopicBase(BaseModel):
    name: str
    subject_id: Optional[UUID] = None
    description: Optional[str] = None
    difficulty: Optional[str] = 'medium'

class TopicCreate(TopicBase):
    pass

class TopicUpdate(BaseModel):
    name: Optional[str] = None
    subject_id: Optional[UUID] = None
    description: Optional[str] = None
    difficulty: Optional[str] = None

class Topic(TopicBase):
    id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True 