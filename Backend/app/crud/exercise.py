from typing import List, Optional
from uuid import UUID
from app.schemas.exercise import ExerciseCreate, ExerciseUpdate, Exercise
from app.core.supabase import get_supabase
import logging

logger = logging.getLogger(__name__)

TABLE_NAME = 'exercises'

# Crear ejercicio
def create_exercise(exercise: ExerciseCreate, created_by: UUID) -> Optional[Exercise]:
    try:
        supabase = get_supabase()
        data = exercise.dict()
        data['created_by'] = str(created_by)
        response = supabase.table(TABLE_NAME).insert(data).execute()
        if response.data:
            return Exercise(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error creando ejercicio: {e}")
        return None

def parse_options(options):
    if isinstance(options, list):
        # Convierte la lista en un dict tipo {'a': ..., 'b': ...}
        return {chr(97 + i): v for i, v in enumerate(options)}
    return options

# Listar ejercicios
def get_exercises(skip: int = 0, limit: int = 100, subject_id: Optional[UUID] = None) -> List[Exercise]:
    try:
        supabase = get_supabase()
        query = supabase.table(TABLE_NAME).select('*')
        
        if subject_id:
            query = query.eq('subject_id', str(subject_id))

        response = query.range(skip, skip + limit - 1).execute()
        
        return [Exercise(**{**item, 'options': parse_options(item.get('options'))}) for item in response.data]
    except Exception as e:
        logger.error(f"Error listando ejercicios: {e}")
        return []

# Obtener ejercicio por ID
def get_exercise_by_id(exercise_id: UUID) -> Optional[Exercise]:
    try:
        supabase = get_supabase()
        response = supabase.table(TABLE_NAME).select('*').eq('id', str(exercise_id)).single().execute()
        if response.data:
            return Exercise(**{**response.data, 'options': parse_options(response.data.get('options'))})
        return None
    except Exception as e:
        logger.error(f"Error obteniendo ejercicio por ID: {e}")
        return None

# Actualizar ejercicio
def update_exercise(exercise_id: UUID, exercise_update: ExerciseUpdate) -> Optional[Exercise]:
    try:
        supabase = get_supabase()
        update_data = exercise_update.dict(exclude_unset=True)
        response = supabase.table(TABLE_NAME).update(update_data).eq('id', str(exercise_id)).execute()
        if response.data:
            return Exercise(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error actualizando ejercicio: {e}")
        return None

# Eliminar ejercicio
def delete_exercise(exercise_id: UUID) -> bool:
    try:
        supabase = get_supabase()
        supabase.table(TABLE_NAME).delete().eq('id', str(exercise_id)).execute()
        return True
    except Exception as e:
        logger.error(f"Error eliminando ejercicio: {e}")
        return False 