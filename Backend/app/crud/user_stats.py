from typing import Optional
from uuid import UUID
from app.schemas.user_stats import UserStatsCreate, UserStatsUpdate, UserStats
from app.core.supabase import get_supabase
import logging

logger = logging.getLogger(__name__)

TABLE_NAME = 'user_stats'

def create_user_stats(stats: UserStatsCreate) -> Optional[UserStats]:
    try:
        supabase = get_supabase()
        data = stats.dict()
        response = supabase.table(TABLE_NAME).insert(data).execute()
        if response.data and len(response.data) > 0:
            return UserStats(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error creando user_stats: {e}")
        return None

def get_user_stats_by_user_id(user_id: UUID) -> Optional[UserStats]:
    try:
        supabase = get_supabase()
        response = supabase.table(TABLE_NAME).select('*').eq('user_id', str(user_id)).maybe_single().execute()
        if response.data:
            return UserStats(**response.data)
        return None
    except Exception as e:
        logger.error(f"Error obteniendo user_stats por user_id: {e}")
        return None

def update_user_stats(user_id: UUID, stats_update: UserStatsUpdate) -> Optional[UserStats]:
    try:
        supabase = get_supabase()
        update_data = stats_update.dict(exclude_unset=True)
        response = supabase.table(TABLE_NAME).update(update_data).eq('user_id', str(user_id)).execute()
        if response.data:
            return UserStats(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error actualizando user_stats: {e}")
        return None

def delete_user_stats(user_id: UUID) -> bool:
    try:
        supabase = get_supabase()
        supabase.table(TABLE_NAME).delete().eq('user_id', str(user_id)).execute()
        return True
    except Exception as e:
        logger.error(f"Error eliminando user_stats: {e}")
        return False 