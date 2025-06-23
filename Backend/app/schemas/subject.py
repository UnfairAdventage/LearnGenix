from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class SubjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: str
    color: Optional[str] = 'bg-blue-500'

class SubjectCreate(SubjectBase):
    pass

class SubjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None

class Subject(SubjectBase):
    id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True 