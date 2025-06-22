from supabase import create_client, Client
from app.core.config import settings

# Cliente de Supabase para operaciones del servidor
supabase: Client = create_client(settings.supabase_url, settings.supabase_service_key)

# Cliente de Supabase para operaciones del cliente (con anon key)
supabase_client: Client = create_client(settings.supabase_url, settings.supabase_key)

def get_supabase() -> Client:
    """Retorna el cliente de Supabase para operaciones del servidor"""
    return supabase

def get_supabase_client() -> Client:
    """Retorna el cliente de Supabase para operaciones del cliente"""
    return supabase_client 