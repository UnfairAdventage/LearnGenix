from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_current_active_user
from app.schemas.user import User
from app.core.supabase import get_supabase
from typing import Any, List
from app.schemas.subject import Subject, SubjectCreate, SubjectUpdate
from app.schemas.topic import Topic, TopicCreate, TopicUpdate
from app.schemas.achievement import Achievement, AchievementCreate, AchievementUpdate
from uuid import UUID

router = APIRouter()

@router.get("/summary")
def get_dashboard_summary(current_user: User = Depends(get_current_active_user)) -> Any:
    """
    Devuelve un resumen personalizado para el dashboard del usuario autenticado (alumno o profesor).
    """
    supabase = get_supabase()
    user_id = str(current_user.id)
    role = current_user.role
    summary = {
        "user": {
            "id": user_id,
            "name": current_user.name,
            "email": current_user.email,
            "role": role,
        },
        "progress": {},
        "achievements": [],
        "recent_activity": [],
        "stats": {},
    }

    # Progreso general y por materia
    stats_resp = supabase.table('user_stats').select('*').eq('user_id', user_id).maybe_single().execute()
    if stats_resp and stats_resp.data:
        summary["stats"] = stats_resp.data
    else:
        summary["stats"] = {}

    # Logros recientes
    achievements_resp = supabase.table('user_achievements').select('*,achievement_id(*,name,description,icon)').eq('user_id', user_id).order('unlocked_at', desc=True).limit(5).execute()
    if achievements_resp and achievements_resp.data:
        summary["achievements"] = [
            {
                "name": a.get('achievement_id', {}).get('name'),
                "description": a.get('achievement_id', {}).get('description'),
                "icon": a.get('achievement_id', {}).get('icon'),
                "unlocked_at": a.get('unlocked_at')
            }
            for a in achievements_resp.data
        ]

    # Actividad reciente (últimos ejercicios respondidos)
    activity_resp = supabase.table('user_progress').select('*,exercise_id(title,subject_id)').eq('user_id', user_id).order('completed_at', desc=True).limit(5).execute()
    if activity_resp and activity_resp.data:
        summary["recent_activity"] = [
            {
                "exercise_title": a.get('exercise_id', {}).get('title'),
                "subject_id": a.get('exercise_id', {}).get('subject_id'),
                "score": a.get('score'),
                "is_correct": a.get('is_correct'),
                "completed_at": a.get('completed_at'),
                "time_spent": a.get('time_spent')
            }
            for a in activity_resp.data
        ]

    # Progreso general (puedes calcularlo aquí o en el frontend)
    if summary["stats"]:
        total = summary["stats"].get("total_exercises", 0)
        completed = summary["stats"].get("completed_exercises", 0)
        summary["progress"] = {
            "general": int((completed / total) * 100) if total else 0,
            "by_subject": {
                # Aquí podrías agregar lógica para progreso por materia
            }
        }

    # Si es profesor, puedes agregar más datos (ejercicios creados, estudiantes activos, etc.)
    if role == 'teacher':
        # Ejercicios creados
        created_resp = supabase.table('exercises').select('id').eq('created_by', user_id).execute()
        summary["created_exercises"] = len(created_resp.data) if created_resp and created_resp.data else 0
        # Estudiantes activos (ejemplo: usuarios con progreso en ejercicios creados por este profesor)
        # ... lógica adicional ...

    return summary 

# SUBJECT ENDPOINTS
@router.get('/subjects', response_model=List[Subject])
def get_subjects() -> Any:
    supabase = get_supabase()
    resp = supabase.table('subjects').select('*').execute()
    return resp.data or []

@router.get('/subjects/{subject_id}', response_model=Subject)
def get_subject(subject_id: UUID) -> Any:
    supabase = get_supabase()
    resp = supabase.table('subjects').select('*').eq('id', str(subject_id)).maybe_single().execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail='Subject not found')
    return resp.data

@router.post('/subjects', response_model=Subject, status_code=status.HTTP_201_CREATED)
def create_subject(subject: SubjectCreate) -> Any:
    supabase = get_supabase()
    resp = supabase.table('subjects').insert(subject.dict()).single().execute()
    return resp.data

@router.put('/subjects/{subject_id}', response_model=Subject)
def update_subject(subject_id: UUID, subject: SubjectUpdate) -> Any:
    supabase = get_supabase()
    resp = supabase.table('subjects').update(subject.dict(exclude_unset=True)).eq('id', str(subject_id)).single().execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail='Subject not found')
    return resp.data

@router.delete('/subjects/{subject_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_subject(subject_id: UUID) -> None:
    supabase = get_supabase()
    resp = supabase.table('subjects').delete().eq('id', str(subject_id)).execute()
    if resp.status_code == 404:
        raise HTTPException(status_code=404, detail='Subject not found')

# TOPIC ENDPOINTS
@router.get('/topics', response_model=List[Topic])
def get_topics() -> Any:
    supabase = get_supabase()
    resp = supabase.table('topics').select('*').execute()
    return resp.data or []

@router.get('/topics/{topic_id}', response_model=Topic)
def get_topic(topic_id: UUID) -> Any:
    supabase = get_supabase()
    resp = supabase.table('topics').select('*').eq('id', str(topic_id)).maybe_single().execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail='Topic not found')
    return resp.data

@router.post('/topics', response_model=Topic, status_code=status.HTTP_201_CREATED)
def create_topic(topic: TopicCreate) -> Any:
    supabase = get_supabase()
    resp = supabase.table('topics').insert(topic.dict()).single().execute()
    return resp.data

@router.put('/topics/{topic_id}', response_model=Topic)
def update_topic(topic_id: UUID, topic: TopicUpdate) -> Any:
    supabase = get_supabase()
    resp = supabase.table('topics').update(topic.dict(exclude_unset=True)).eq('id', str(topic_id)).single().execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail='Topic not found')
    return resp.data

@router.delete('/topics/{topic_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_topic(topic_id: UUID) -> None:
    supabase = get_supabase()
    resp = supabase.table('topics').delete().eq('id', str(topic_id)).execute()
    if resp.status_code == 404:
        raise HTTPException(status_code=404, detail='Topic not found')

# ACHIEVEMENT ENDPOINTS
@router.get('/achievements', response_model=List[Achievement])
def get_achievements() -> Any:
    supabase = get_supabase()
    resp = supabase.table('achievements').select('*').execute()
    return resp.data or []

@router.get('/achievements/{achievement_id}', response_model=Achievement)
def get_achievement(achievement_id: UUID) -> Any:
    supabase = get_supabase()
    resp = supabase.table('achievements').select('*').eq('id', str(achievement_id)).maybe_single().execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail='Achievement not found')
    return resp.data

@router.post('/achievements', response_model=Achievement, status_code=status.HTTP_201_CREATED)
def create_achievement(achievement: AchievementCreate) -> Any:
    supabase = get_supabase()
    resp = supabase.table('achievements').insert(achievement.dict()).single().execute()
    return resp.data

@router.put('/achievements/{achievement_id}', response_model=Achievement)
def update_achievement(achievement_id: UUID, achievement: AchievementUpdate) -> Any:
    supabase = get_supabase()
    resp = supabase.table('achievements').update(achievement.dict(exclude_unset=True)).eq('id', str(achievement_id)).single().execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail='Achievement not found')
    return resp.data

@router.delete('/achievements/{achievement_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_achievement(achievement_id: UUID) -> None:
    supabase = get_supabase()
    resp = supabase.table('achievements').delete().eq('id', str(achievement_id)).execute()
    if resp.status_code == 404:
        raise HTTPException(status_code=404, detail='Achievement not found') 