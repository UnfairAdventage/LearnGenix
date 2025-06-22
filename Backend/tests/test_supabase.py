#!/usr/bin/env python3
"""
Script de prueba para verificar la conexión con Supabase
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

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
        from app.core.supabase import get_supabase
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

if __name__ == "__main__":
    print("🧪 Prueba de conexión con Supabase")
    print("=" * 40)
    
    if test_supabase_connection():
        print("\n✅ Todo está funcionando correctamente!")
        print("   Puedes ejecutar: python init_db.py")
    else:
        print("\n❌ Hay problemas con la configuración")
        print("   Revisa el archivo .env y las credenciales de Supabase") 