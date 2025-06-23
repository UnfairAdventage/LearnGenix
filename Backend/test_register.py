#!/usr/bin/env python3
"""
Script para probar el endpoint de registro
"""
import requests
import json

def test_register():
    """Prueba el endpoint de registro"""
    url = "http://localhost:8000/api/v1/auth/register"
    
    # Datos de prueba
    test_user = {
        "email": "test@example.com",
        "name": "Usuario de Prueba",
        "password": "testpassword123",
        "role": "student"
    }
    
    print("🧪 Probando endpoint de registro...")
    print(f"📡 URL: {url}")
    print(f"📝 Datos: {json.dumps(test_user, indent=2)}")
    
    try:
        response = requests.post(url, json=test_user)
        
        print(f"\n📊 Respuesta:")
        print(f"   Status Code: {response.status_code}")
        print(f"   Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Registro exitoso!")
            print(f"   Token: {data.get('access_token', 'N/A')[:20]}...")
            print(f"   User: {data.get('user', {}).get('email', 'N/A')}")
        else:
            print(f"   ❌ Error en el registro")
            try:
                error_data = response.json()
                print(f"   Error: {error_data}")
            except:
                print(f"   Error: {response.text}")
                
    except requests.exceptions.ConnectionError:
        print("❌ No se pudo conectar al servidor")
        print("   Asegúrate de que el servidor esté corriendo en http://localhost:8000")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    test_register() 