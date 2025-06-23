from typing import Optional, List
from uuid import UUID
from app.schemas.user_achievement import UserAchievementCreate, UserAchievement, UserAchievementUpdate
from app.core.supabase import get_supabase
import logging

logger = logging.getLogger(__name__)

TABLE_NAME = 'user_achievements'

def create_user_achievement(achievement: UserAchievementCreate) -> Optional[UserAchievement]:
    try:
        supabase = get_supabase()
        data = achievement.dict()
        response = supabase.table(TABLE_NAME).insert(data).execute()
        if response.data and len(response.data) > 0:
            return UserAchievement(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error creando user_achievement: {e}")
        return None

def get_user_achievements_by_user_id(user_id: UUID) -> List[UserAchievement]:
    try:
        supabase = get_supabase()
        response = supabase.table(TABLE_NAME).select('*').eq('user_id', str(user_id)).execute()
        return [UserAchievement(**item) for item in response.data] if response.data else []
    except Exception as e:
        logger.error(f"Error obteniendo user_achievements por user_id: {e}")
        return []

def delete_user_achievement(achievement_id: UUID) -> bool:
    try:
        supabase = get_supabase()
        supabase.table(TABLE_NAME).delete().eq('id', str(achievement_id)).execute()
        return True
    except Exception as e:
        logger.error(f"Error eliminando user_achievement: {e}")
        return False 