#!/usr/bin/env python3
"""
Script de prueba para verificar la conexión con Supabase
"""
import sys
import os
import requests
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append('./app')
from app.core.supabase import get_supabase

API_URL = os.getenv("API_URL", "http://localhost:8000/api/v1")
TOKEN = os.getenv("TEST_TOKEN", "")  # Debe ser un token válido de usuario
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def test_supabase_connection():
    """Prueba la conexión con Supabase"""
    try:
        print("🔧 Probando configuración...")
        from app.core.config import settings
        
        if not settings.supabase_url or not settings.supabase_key:
            print("❌ Variables de Supabase no configuradas")
            print("   Configura SUPABASE_URL y SUPABASE_KEY en el archivo .env")
            return False
        
        print("✅ Configuración cargada")
        print(f"🔗 Supabase URL: {settings.supabase_url}")
        
        print("\n🔗 Probando conexión con Supabase...")
        supabase = get_supabase()
        
        # Probar una consulta simple
        response = supabase.table('users').select('count').execute()
        print("✅ Conexión exitosa con Supabase")
        
        # Verificar si hay usuarios
        if hasattr(response, 'count'):
            print(f"📊 Usuarios en la base de datos: {response.count}")
        else:
            print("📊 No se pudo obtener el conteo de usuarios")
        
        return True
        
    except ImportError as e:
        print(f"❌ Error de importación: {e}")
        print("   Ejecuta: pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"❌ Error de conexión: {e}")
        return False

def test_next_exercise_empty_subject():
    resp = requests.post(f"{API_URL}/exercises/next", json={"subject_id": "", "difficulty": "medium"}, headers=HEADERS)
    assert resp.status_code != 422, f"422 con subject_id vacio: {resp.text}"

def test_next_exercise_null_subject():
    resp = requests.post(f"{API_URL}/exercises/next", json={"subject_id": None, "difficulty": "medium"}, headers=HEADERS)
    assert resp.status_code != 422, f"422 con subject_id null: {resp.text}"

def test_next_exercise_valid_subject():
    # Reemplaza por un UUID válido de subject existente en tu base
    valid_uuid = "00000000-0000-0000-0000-000000000000"
    resp = requests.post(f"{API_URL}/exercises/next", json={"subject_id": valid_uuid, "difficulty": "medium"}, headers=HEADERS)
    assert resp.status_code != 422, f"422 con subject_id válido: {resp.text}"

def print_exercises():
    supabase = get_supabase()
    resp = supabase.table('exercises').select('id,title,type,options').execute()
    print("\nTabla exercises:")
    for row in resp.data:
        print(row)

def print_subjects():
    supabase = get_supabase()
    resp = supabase.table('subjects').select('*').execute()
    print("\nTabla subjects:")
    for row in resp.data:
        print(row)

if __name__ == "__main__":
    print("🧪 Prueba de conexión con Supabase")
    print("=" * 40)
    
    if test_supabase_connection():
        print("\n✅ Todo está funcionando correctamente!")
        print("   Puedes ejecutar: python init_db.py")
        print_exercises()
        print_subjects()
    else:
        print("\n❌ Hay problemas con la configuración")
        print("   Revisa el archivo .env y las credenciales de Supabase") 