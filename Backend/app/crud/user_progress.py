from typing import Optional, List
from uuid import UUID
from app.schemas.user_progress import UserProgressCreate, UserProgressUpdate, UserProgress
from app.core.supabase import get_supabase
import logging

logger = logging.getLogger(__name__)

TABLE_NAME = 'user_progress'

def create_user_progress(progress: UserProgressCreate) -> Optional[UserProgress]:
    try:
        supabase = get_supabase()
        data = progress.dict()
        response = supabase.table(TABLE_NAME).insert(data).execute()
        if response.data and len(response.data) > 0:
            return UserProgress(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error creando user_progress: {e}")
        return None

def get_user_progress_by_id(progress_id: UUID) -> Optional[UserProgress]:
    try:
        supabase = get_supabase()
        response = supabase.table(TABLE_NAME).select('*').eq('id', str(progress_id)).single().execute()
        if response.data:
            return UserProgress(**response.data)
        return None
    except Exception as e:
        logger.error(f"Error obteniendo user_progress por id: {e}")
        return None

def get_user_progress_by_user_and_exercise(user_id: UUID, exercise_id: UUID) -> Optional[UserProgress]:
    try:
        supabase = get_supabase()
        response = supabase.table(TABLE_NAME).select('*').eq('user_id', str(user_id)).eq('exercise_id', str(exercise_id)).maybe_single().execute()
        if response.data:
            return UserProgress(**response.data)
        return None
    except Exception as e:
        logger.error(f"Error obteniendo user_progress por usuario y ejercicio: {e}")
        return None

def update_user_progress(progress_id: UUID, progress_update: UserProgressUpdate) -> Optional[UserProgress]:
    try:
        supabase = get_supabase()
        update_data = progress_update.dict(exclude_unset=True)
        response = supabase.table(TABLE_NAME).update(update_data).eq('id', str(progress_id)).execute()
        if response.data:
            return UserProgress(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error actualizando user_progress: {e}")
        return None

def delete_user_progress(progress_id: UUID) -> bool:
    try:
        supabase = get_supabase()
        supabase.table(TABLE_NAME).delete().eq('id', str(progress_id)).execute()
        return True
    except Exception as e:
        logger.error(f"Error eliminando user_progress: {e}")
        return False 