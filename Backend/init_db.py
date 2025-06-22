#!/usr/bin/env python3
"""
Script para inicializar usuarios de prueba en Supabase
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def init_db():
    """Inicializa usuarios de prueba en Supabase"""
    try:
        # Importar después de agregar el path
        from app.core.supabase import get_supabase
        from app.models.user import UserRole
        from app.crud.user import create_test_user
        
        print("🔗 Conectando a Supabase...")
        supabase = get_supabase()
        
        # Verificar si ya existen usuarios
        print("🔍 Verificando usuarios existentes...")
        response = supabase.table('users').select('count').execute()
        
        if hasattr(response, 'count') and response.count and response.count > 0:
            print("✅ La base de datos ya tiene usuarios. Saltando inicialización.")
            return

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

        print("👥 Creando usuarios de prueba...")
        for user_data in test_users:
            try:
                print(f"   Creando usuario: {user_data['email']}")
                
                # Usar la nueva función de creación
                user = create_test_user(
                    email=user_data['email'],
                    name=user_data['name'],
                    role=user_data['role'],
                    password="password"
                )
                
                if user:
                    print(f"   ✅ Usuario creado exitosamente: {user_data['email']}")
                else:
                    print(f"   ❌ Error al crear usuario: {user_data['email']}")
                    
            except Exception as e:
                print(f"   ❌ Error al crear usuario {user_data['email']}: {e}")

        print("\n📋 Credenciales de prueba:")
        for user_data in test_users:
            print(f"   {user_data['role']}: {user_data['email']} / password")

    except ImportError as e:
        print(f"❌ Error de importación: {e}")
        print("   Asegúrate de que todas las dependencias estén instaladas")
    except Exception as e:
        print(f"❌ Error al inicializar la base de datos: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("🚀 Inicializando usuarios de prueba en Supabase...")
    init_db() 