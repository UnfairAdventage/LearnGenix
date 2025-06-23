from fastapi import APIRouter, HTTPException, Depends, status, Body
from typing import List, Optional, Union
from uuid import UUID
from app.schemas.exercise import Exercise, ExerciseCreate, ExerciseUpdate
from app.crud.exercise import (
    create_exercise, get_exercises, get_exercise_by_id, update_exercise, delete_exercise
)
from app.api.deps import get_current_active_user
from app.schemas.user import User
import random
from app.core.supabase import get_supabase
from app.schemas.user_progress import UserProgressCreate
from app.schemas.user_stats import UserStatsUpdate
from app.schemas.user_achievement import UserAchievementCreate
from app.crud.user_progress import create_user_progress, get_user_progress_by_user_and_exercise
from app.crud.user_stats import get_user_stats_by_user_id, update_user_stats, create_user_stats
from app.crud.user_achievement import create_user_achievement, get_user_achievements_by_user_id
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=Exercise, status_code=status.HTTP_201_CREATED)
def create_new_exercise(
    exercise: ExerciseCreate,
    current_user: User = Depends(get_current_active_user)
):
    created = create_exercise(exercise, created_by=current_user.id)
    if not created:
        raise HTTPException(status_code=400, detail="No se pudo crear el ejercicio")
    return created

@router.get("/", response_model=List[Exercise])
def list_exercises(skip: int = 0, limit: int = 100):
    return get_exercises(skip=skip, limit=limit)

@router.get("/{exercise_id}", response_model=Exercise)
def get_exercise(exercise_id: UUID):
    exercise = get_exercise_by_id(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return exercise

@router.put("/{exercise_id}", response_model=Exercise)
def update_exercise_endpoint(
    exercise_id: UUID,
    exercise_update: ExerciseUpdate,
    current_user: User = Depends(get_current_active_user)
):
    updated = update_exercise(exercise_id, exercise_update)
    if not updated:
        raise HTTPException(status_code=404, detail="No se pudo actualizar el ejercicio")
    return updated

@router.delete("/{exercise_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_exercise_endpoint(
    exercise_id: UUID,
    current_user: User = Depends(get_current_active_user)
):
    deleted = delete_exercise(exercise_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="No se pudo eliminar el ejercicio")
    return None

@router.post("/next", response_model=Exercise)
def get_next_exercise(
    subject_id: Union[str, UUID, None] = Body(None),
    difficulty: str = Body('medium'),
    current_user: User = Depends(get_current_active_user)
):
    """
    Devuelve un ejercicio personalizado para el alumno, sin repetir ejercicios ya completados.
    """
    # Normaliza subject_id
    if isinstance(subject_id, str):
        try:
            subject_id = UUID(subject_id) if subject_id else None
        except Exception:
            subject_id = None

    supabase = get_supabase()
    # Obtener IDs de ejercicios ya completados por el usuario
    completados_resp = supabase.table('user_progress').select('exercise_id').eq('user_id', str(current_user.id)).execute()
    completados = set([row['exercise_id'] for row in completados_resp.data]) if completados_resp.data else set()

    # Obtener ejercicios disponibles
    ejercicios = get_exercises(subject_id=subject_id)
    # Filtrar por dificultad
    if difficulty:
        ejercicios = [e for e in ejercicios if e.difficulty == difficulty]
    # Filtrar los ya completados
    ejercicios = [e for e in ejercicios if str(e.id) not in completados]

    if not ejercicios:
        raise HTTPException(status_code=404, detail="No hay ejercicios disponibles para los criterios dados o ya completaste todos")
    return random.choice(ejercicios)

class SubmitExerciseRequest(BaseModel):
    exercise_id: UUID
    answer: str
    time_spent: Optional[int] = 0

@router.post("/submit")
def submit_exercise(
    data: SubmitExerciseRequest,
    current_user: User = Depends(get_current_active_user)
):
    # 1. Obtener el ejercicio
    exercise = get_exercise_by_id(data.exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")

    # 2. Calcular si la respuesta es correcta
    is_correct = False
    score = 0
    if exercise.correct_answer is not None:
        is_correct = (data.answer.strip().lower() == exercise.correct_answer.strip().lower())
        score = exercise.points if is_correct else 0
    # Si no hay correct_answer, se asume 0 puntos

    # 3. Guardar progreso (user_progress)
    # Evitar duplicados: solo uno por user+exercise
    existing = get_user_progress_by_user_and_exercise(current_user.id, data.exercise_id)
    if existing:
        raise HTTPException(status_code=400, detail="Ya has respondido este ejercicio")
    progress = UserProgressCreate(
        user_id=str(current_user.id),
        exercise_id=str(data.exercise_id),
        score=score,
        time_spent=data.time_spent,
        answer=data.answer,
        is_correct=is_correct
    )
    create_user_progress(progress)

    # 4. Actualizar stats (user_stats)
    stats = get_user_stats_by_user_id(current_user.id)
    now = datetime.utcnow()
    if stats:
        update = UserStatsUpdate(
            completed_exercises=(stats.completed_exercises or 0) + 1,
            total_exercises=(stats.total_exercises or 0) + 1,  # O mantener igual si ya está bien
            average_score=((stats.average_score or 0) * (stats.completed_exercises or 0) + score) / ((stats.completed_exercises or 0) + 1),
            total_time=(stats.total_time or 0) + (data.time_spent or 0),
            total_points=(stats.total_points or 0) + score,
            last_activity=now
        )
        update_user_stats(str(current_user.id), update)
    else:
        create_user_stats(UserStatsUpdate(
            user_id=str(current_user.id),
            completed_exercises=1,
            total_exercises=1,
            average_score=score,
            total_time=data.time_spent or 0,
            total_points=score,
            current_streak=1,
            best_streak=1,
            last_activity=now
        ))

    # 5. Asignar logros (ejemplo: primer ejercicio correcto)
    achievements = get_user_achievements_by_user_id(current_user.id)
    if is_correct and len(achievements) == 0:
        # Ejemplo: asignar logro por primer ejercicio correcto
        primer_logro_id = None
        supabase = get_supabase()
        resp = supabase.table('achievements').select('id').eq('name', 'Primer ejercicio correcto').maybe_single().execute()
        if resp and resp.data:
            primer_logro_id = resp.data['id']
        if primer_logro_id:
            create_user_achievement(UserAchievementCreate(user_id=current_user.id, achievement_id=primer_logro_id))

    return {"success": True, "is_correct": is_correct, "score": score} 