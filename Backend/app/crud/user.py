from typing import Optional, List
from app.models.user import User, UserCreate, UserUpdate, UserRole
from app.core.supabase import get_supabase, get_supabase_client
from app.core.security import get_password_hash, verify_password
import logging

logger = logging.getLogger(__name__)

def get_user(user_id: str) -> Optional[User]:
    """Obtiene un usuario por ID"""
    try:
        supabase = get_supabase()
        response = supabase.table('users').select('*').eq('id', user_id).execute()
        
        if response.data:
            return User(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error getting user: {e}")
        return None

def get_user_by_email(email: str) -> Optional[User]:
    """Obtiene un usuario por email"""
    try:
        supabase = get_supabase()
        response = supabase.table('users').select('*').eq('email', email).execute()
        
        if response.data:
            return User(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error getting user by email: {e}")
        return None

def get_users(skip: int = 0, limit: int = 100) -> List[User]:
    """Obtiene una lista de usuarios"""
    try:
        supabase = get_supabase()
        response = supabase.table('users').select('*').range(skip, skip + limit - 1).execute()
        
        return [User(**user_data) for user_data in response.data]
    except Exception as e:
        logger.error(f"Error getting users: {e}")
        return []

def create_user(user: UserCreate) -> Optional[User]:
    """Crea un nuevo usuario"""
    try:
        logger.info(f"Iniciando creación de usuario: {user.email}")
        supabase = get_supabase()
        
        # Crear usuario en auth.users primero
        logger.info(f"Creando usuario en auth.users: {user.email}")
        auth_response = supabase.auth.admin.create_user({
            "email": user.email,
            "password": user.password,  # Usar la contraseña proporcionada
            "email_confirm": False  # No confirmar automáticamente el email
        })
        
        if not auth_response.user:
            logger.error("Failed to create auth user - auth_response.user is None")
            return None
        
        user_id = auth_response.user.id
        logger.info(f"Usuario creado en auth.users con ID: {user_id}")
        
        # Crear usuario en la tabla users con el ID correcto
        user_data = {
            "id": user_id,  # Usar el ID de auth.users
            "email": user.email,
            "name": user.name,
            "role": user.role.value,
            "avatar_url": None  # Establecer como None por defecto
        }
        
        logger.info(f"Insertando en tabla users: {user_data}")
        response = supabase.table('users').insert(user_data).execute()
        
        if response.data:
            logger.info(f"Usuario creado exitosamente en tabla users")
            return User(**response.data[0])
        else:
            logger.error(f"No se pudo insertar en tabla users: {response}")
            # Si falla la inserción en users, eliminar el usuario de auth.users
            try:
                supabase.auth.admin.delete_user(user_id)
                logger.info(f"Usuario eliminado de auth.users después de fallo en users")
            except Exception as cleanup_error:
                logger.error(f"Error al limpiar usuario de auth.users: {cleanup_error}")
            return None
            
    except Exception as e:
        logger.error(f"Error creating user {user.email}: {str(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return None

def update_user(user_id: str, user_update: UserUpdate) -> Optional[User]:
    """Actualiza un usuario"""
    try:
        supabase = get_supabase()
        
        update_data = user_update.dict(exclude_unset=True)
        if not update_data:
            return get_user(user_id)
        
        response = supabase.table('users').update(update_data).eq('id', user_id).execute()
        
        if response.data:
            return User(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error updating user: {e}")
        return None

def delete_user(user_id: str) -> bool:
    """Elimina un usuario"""
    try:
        supabase = get_supabase()
        
        # Eliminar de la tabla users
        response = supabase.table('users').delete().eq('id', user_id).execute()
        
        # Eliminar de auth.users
        supabase.auth.admin.delete_user(user_id)
        
        return True
    except Exception as e:
        logger.error(f"Error deleting user: {e}")
        return False

def authenticate_user(email: str, password: str) -> Optional[User]:
    """Autentica un usuario con email y contraseña usando Supabase Auth"""
    try:
        # Usar el cliente de Supabase (no el admin)
        supabase = get_supabase_client()
        
        # Intentar autenticar con Supabase Auth
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        if auth_response.user:
            # Verificar que el email esté confirmado
            if not auth_response.user.email_confirmed_at:
                logger.warning(f"Usuario no ha confirmado su email: {email}")
                return None
            
            # Obtener datos adicionales del usuario desde la tabla users
            user = get_user_by_email(email)
            if user:
                return user
            else:
                logger.warning(f"Usuario autenticado pero no encontrado en tabla users: {email}")
                return None
        else:
            logger.warning(f"Autenticación fallida para: {email}")
            return None
            
    except Exception as e:
        logger.error(f"Error authenticating user {email}: {e}")
        return None

def create_test_user(email: str, name: str, role: str, password: str = "password") -> Optional[User]:
    """Crea un usuario de prueba con contraseña específica"""
    try:
        supabase = get_supabase()
        
        # Crear usuario en auth.users con contraseña específica
        auth_response = supabase.auth.admin.create_user({
            "email": email,
            "password": password,
            "email_confirm": True
        })
        
        if not auth_response.user:
            raise Exception("Failed to create auth user")
        
        # Crear usuario en la tabla users
        user_data = {
            "id": auth_response.user.id,
            "email": email,
            "name": name,
            "role": role,
            "avatar_url": None
        }
        
        response = supabase.table('users').insert(user_data).execute()
        
        if response.data:
            logger.info(f"✅ Usuario creado: {email}")
            return User(**response.data[0])
        return None
    except Exception as e:
        logger.error(f"Error creating test user {email}: {e}")
        return None 