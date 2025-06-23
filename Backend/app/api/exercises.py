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
    Devuelve un ejercicio personalizado para el alumno (stub inicial, sin IA real).
    """
    # Normaliza subject_id: si es string vacío o no es UUID válido, lo trata como None
    if isinstance(subject_id, str):
        try:
            subject_id = UUID(subject_id) if subject_id else None
        except Exception:
            subject_id = None
    # Aquí se podría integrar IA. Por ahora, selecciona un ejercicio aleatorio del subject y dificultad.
    ejercicios = get_exercises(subject_id=subject_id)
    
    # Filtrar adicionalmente por dificultad si se especifica
    if difficulty:
        ejercicios = [e for e in ejercicios if e.difficulty == difficulty]

    if not ejercicios:
        raise HTTPException(status_code=404, detail="No hay ejercicios disponibles para los criterios dados")
    
    return random.choice(ejercicios) 