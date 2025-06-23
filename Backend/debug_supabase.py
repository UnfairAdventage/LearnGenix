#!/usr/bin/env python3
"""
Script para diagnosticar problemas con Supabase
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def debug_supabase():
    """Diagnostica problemas con Supabase"""
    try:
        print("🔧 Diagnóstico de Supabase")
        print("=" * 40)
        
        # Verificar configuración
        from app.core.config import settings
        print("📋 Configuración:")
        print(f"   Supabase URL: {settings.supabase_url}")
        print(f"   Supabase Key: {'✅ Configurada' if settings.supabase_key else '❌ No configurada'}")
        print(f"   Service Key: {'✅ Configurada' if settings.supabase_service_key else '❌ No configurada'}")
        
        if not settings.supabase_url or not settings.supabase_key or not settings.supabase_service_key:
            print("\n❌ Configuración incompleta")
            return
        
        # Probar conexión
        print("\n🔗 Probando conexión...")
        from app.core.supabase import get_supabase, get_supabase_client
        
        try:
            supabase = get_supabase()
            print("✅ Cliente de Supabase creado")
            
            # Probar consulta simple
            response = supabase.table('users').select('count').execute()
            print("✅ Consulta a tabla users exitosa")
            
        except Exception as e:
            print(f"❌ Error de conexión: {e}")
            return
        
        # Probar creación de usuario
        print("\n👤 Probando creación de usuario...")
        from app.crud.user import create_test_user
        
        test_email = "debug_test@example.com"
        
        # Primero verificar si ya existe
        existing_user = supabase.table('users').select('*').eq('email', test_email).execute()
        if existing_user.data:
            print(f"⚠️  Usuario de prueba ya existe: {test_email}")
            # Intentar eliminar
            try:
                supabase.auth.admin.delete_user(existing_user.data[0]['id'])
                print("✅ Usuario de prueba eliminado")
            except Exception as e:
                print(f"⚠️  No se pudo eliminar usuario existente: {e}")
        
        # Crear usuario de prueba
        user = create_test_user(
            email=test_email,
            name="Usuario Debug",
            role="student",
            password="debugpassword123"
        )
        
        if user:
            print("✅ Usuario de prueba creado exitosamente")
            
            # Limpiar
            try:
                supabase.auth.admin.delete_user(user.id)
                print("✅ Usuario de prueba eliminado")
            except Exception as e:
                print(f"⚠️  No se pudo limpiar usuario de prueba: {e}")
        else:
            print("❌ Error al crear usuario de prueba")
            
    except ImportError as e:
        print(f"❌ Error de importación: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_supabase() 