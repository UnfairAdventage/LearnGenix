from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.crud.user import create_user, authenticate_user, get_user_by_email
from app.schemas.user import UserCreate, User, Token
from app.core.security import create_access_token
from app.core.config import settings
from app.api.deps import get_current_active_user
from app.core.supabase import get_supabase
from pydantic import BaseModel
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class ResendConfirmationRequest(BaseModel):
    email: str

@router.post("/register", response_model=Token)
def register(user: UserCreate):
    """Registra un nuevo usuario"""
    try:
        logger.info(f"Intentando registrar usuario: {user.email}")
        
        # Verificar si el usuario ya existe
        db_user = get_user_by_email(email=user.email)
        if db_user:
            logger.warning(f"Usuario ya existe: {user.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya está registrado"
            )
        
        # Crear el usuario
        logger.info(f"Creando usuario en Supabase: {user.email}")
        db_user = create_user(user=user)
        
        if not db_user:
            logger.error(f"Error al crear usuario: {user.email}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error al crear el usuario"
            )
        
        logger.info(f"Usuario creado exitosamente: {user.email}")
        
        # Crear token de acceso
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": db_user.email}, expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": db_user
        }
        
    except HTTPException:
        # Re-lanzar HTTPExceptions sin modificar
        raise
    except Exception as e:
        logger.error(f"Error inesperado en registro: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno del servidor: {str(e)}"
        )

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Inicia sesión de un usuario"""
    try:
        # Autenticar usuario
        user = authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email o contraseña incorrectos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Crear token de acceso
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error en login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno del servidor"
        )

@router.post("/resend-confirmation")
def resend_confirmation(request: ResendConfirmationRequest):
    """Reenvía el email de confirmación"""
    try:
        supabase = get_supabase()
        
        # Verificar si el usuario existe
        db_user = get_user_by_email(email=request.email)
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
        
        # Reenviar email de confirmación usando el método correcto
        response = supabase.auth.resend({"type": "signup", "email": request.email})
        
        logger.info(f"Email de confirmación reenviado a: {request.email}")
        
        return {
            "message": "Email de confirmación reenviado correctamente",
            "email": request.email
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error al reenviar confirmación: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al reenviar el email de confirmación"
        )

@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    """Obtiene información del usuario actual"""
    return current_user 