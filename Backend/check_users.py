#!/usr/bin/env python3
"""
Script para verificar usuarios en Supabase
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def check_users():
    """Verifica los usuarios existentes en Supabase"""
    try:
        from app.core.supabase import get_supabase
        
        print("🔍 Verificando usuarios en Supabase...")
        supabase = get_supabase()
        
        # Obtener todos los usuarios
        response = supabase.table('users').select('*').execute()
        
        if response.data:
            print(f"✅ Encontrados {len(response.data)} usuarios:")
            for user in response.data:
                print(f"   - {user['email']} ({user['role']}) - ID: {user['id']}")
        else:
            print("❌ No se encontraron usuarios")
            
        # Verificar usuarios específicos
        test_emails = ['student@test.com', 'teacher@test.com', 'admin@test.com']
        print("\n🔍 Verificando usuarios de prueba...")
        
        for email in test_emails:
            user_response = supabase.table('users').select('*').eq('email', email).execute()
            if user_response.data:
                user = user_response.data[0]
                print(f"   ✅ {email} existe (ID: {user['id']}, Role: {user['role']})")
            else:
                print(f"   ❌ {email} NO existe")
                
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_users() 