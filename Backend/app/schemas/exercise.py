from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from uuid import UUID
from datetime import datetime

class ExerciseBase(BaseModel):
    title: str
    description: Optional[str] = None
    content: str
    type: Literal['multiple_choice', 'open_ended', 'true_false', 'matching']
    difficulty: Literal['easy', 'medium', 'hard'] = 'medium'
    subject_id: Optional[UUID] = None
    topic_id: Optional[UUID] = None
    options: Optional[dict] = None  # Para preguntas de opción múltiple, etc.
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    points: Optional[int] = 10
    time_limit: Optional[int] = None

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    type: Optional[Literal['multiple_choice', 'open_ended', 'true_false', 'matching']] = None
    difficulty: Optional[Literal['easy', 'medium', 'hard']] = None
    subject_id: Optional[UUID] = None
    topic_id: Optional[UUID] = None
    options: Optional[dict] = None
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    points: Optional[int] = None
    time_limit: Optional[int] = None

class Exercise(ExerciseBase):
    id: UUID
    created_by: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True 