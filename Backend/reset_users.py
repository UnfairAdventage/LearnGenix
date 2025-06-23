#!/usr/bin/env python3
"""
Script para limpiar y recrear usuarios de prueba
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def reset_users():
    """Limpia y recrea usuarios de prueba"""
    try:
        from app.core.supabase import get_supabase
        from app.models.user import UserRole
        from app.crud.user import create_test_user
        
        print("🧹 Limpiando usuarios existentes...")
        supabase = get_supabase()
        
        # Obtener usuarios existentes
        response = supabase.table('users').select('*').execute()
        
        if response.data:
            print(f"🗑️  Eliminando {len(response.data)} usuarios existentes...")
            for user in response.data:
                try:
                    # Eliminar de auth.users
                    supabase.auth.admin.delete_user(user['id'])
                    print(f"   ✅ Eliminado: {user['email']}")
                except Exception as e:
                    print(f"   ⚠️  Error eliminando {user['email']}: {e}")
        
        # Crear usuarios de prueba
        test_users = [
            {
                "email": "student@test.com",
                "name": "Ana Estudiante",
                "role": UserRole.STUDENT.value
            },
            {
                "email": "teacher@test.com",
                "name": "Prof. García",
                "role": UserRole.TEACHER.value
            },
            {
                "email": "admin@test.com",
                "name": "Admin Sistema",
                "role": UserRole.ADMIN.value
            }
        ]

        print("\n👥 Creando usuarios de prueba...")
        for user_data in test_users:
            try:
                print(f"   Creando usuario: {user_data['email']}")
                
                user = create_test_user(
                    email=user_data['email'],
                    name=user_data['name'],
                    role=user_data['role'],
                    password="password"
                )
                
                if user:
                    print(f"   ✅ Usuario creado: {user_data['email']}")
                else:
                    print(f"   ❌ Error al crear usuario: {user_data['email']}")
                    
            except Exception as e:
                print(f"   ❌ Error al crear usuario {user_data['email']}: {e}")

        print("\n📋 Credenciales de prueba:")
        for user_data in test_users:
            print(f"   {user_data['role']}: {user_data['email']} / password")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("🔄 Reseteando usuarios de prueba...")
    reset_users() 