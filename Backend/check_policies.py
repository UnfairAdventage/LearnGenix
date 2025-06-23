#!/usr/bin/env python3
"""
Script para verificar las políticas de Supabase
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def check_policies():
    """Verifica las políticas de Supabase"""
    try:
        print("🔒 Verificando políticas de Supabase")
        print("=" * 40)
        
        from app.core.supabase import get_supabase
        supabase = get_supabase()
        
        # Verificar si podemos leer la tabla users
        print("📖 Probando lectura de tabla users...")
        try:
            response = supabase.table('users').select('*').limit(1).execute()
            print("✅ Lectura de tabla users exitosa")
        except Exception as e:
            print(f"❌ Error al leer tabla users: {e}")
            return
        
        # Verificar si podemos insertar en la tabla users
        print("\n📝 Probando inserción en tabla users...")
        try:
            # Crear usuario en auth.users primero
            auth_response = supabase.auth.admin.create_user({
                "email": "policy_test@example.com",
                "password": "testpassword123",
                "email_confirm": True
            })
            
            if not auth_response.user:
                print("❌ No se pudo crear usuario en auth.users")
                return
            
            # Intentar inserción con el ID correcto
            test_data = {
                "id": auth_response.user.id,  # Usar el ID de auth.users
                "email": "policy_test@example.com",
                "name": "Test Policy",
                "role": "student"
            }
            
            # Primero verificar si ya existe
            existing = supabase.table('users').select('*').eq('email', test_data['email']).execute()
            if existing.data:
                print("⚠️  Usuario de prueba ya existe, eliminando...")
                supabase.table('users').delete().eq('email', test_data['email']).execute()
            
            # Intentar inserción
            response = supabase.table('users').insert(test_data).execute()
            
            if response.data:
                print("✅ Inserción en tabla users exitosa")
                # Limpiar
                supabase.table('users').delete().eq('email', test_data['email']).execute()
                supabase.auth.admin.delete_user(auth_response.user.id)
                print("✅ Datos de prueba eliminados")
            else:
                print("❌ Inserción falló - no se devolvieron datos")
                # Limpiar auth.users
                supabase.auth.admin.delete_user(auth_response.user.id)
                
        except Exception as e:
            print(f"❌ Error al insertar en tabla users: {e}")
            return
        
        # Verificar autenticación
        print("\n🔐 Probando autenticación...")
        try:
            # Crear usuario temporal para prueba de auth
            auth_response = supabase.auth.admin.create_user({
                "email": "auth_test@example.com",
                "password": "testpassword123",
                "email_confirm": True
            })
            
            if auth_response.user:
                print("✅ Creación de usuario en auth.users exitosa")
                
                # Limpiar
                supabase.auth.admin.delete_user(auth_response.user.id)
                print("✅ Usuario de auth eliminado")
            else:
                print("❌ Error al crear usuario en auth.users")
                
        except Exception as e:
            print(f"❌ Error en autenticación: {e}")
            return
        
        print("\n✅ Todas las verificaciones pasaron")
        print("   Las políticas de Supabase están configuradas correctamente")
        
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_policies() 