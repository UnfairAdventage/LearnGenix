#!/usr/bin/env python3
"""
Script de configuración rápida para LearnGenix Backend
"""
import os
import sys
from pathlib import Path

def create_env_file():
    """Crea el archivo .env si no existe"""
    env_file = Path('.env')
    env_example = Path('env.example')
    
    if not env_file.exists() and env_example.exists():
        print("📝 Creando archivo .env desde env.example...")
        os.system(f'cp env.example .env')
        print("✅ Archivo .env creado. ¡Recuerda configurar tus variables de Supabase!")
    elif env_file.exists():
        print("✅ Archivo .env ya existe")
    else:
        print("❌ No se encontró env.example")

def install_dependencies():
    """Instala las dependencias"""
    print("📦 Instalando dependencias...")
    result = os.system('pip install -r requirements.txt')
    if result == 0:
        print("✅ Dependencias instaladas")
    else:
        print("❌ Error al instalar dependencias")

def check_supabase_config():
    """Verifica la configuración de Supabase"""
    env_file = Path('.env')
    if not env_file.exists():
        print("❌ Archivo .env no encontrado")
        return False
    
    with open(env_file, 'r') as f:
        content = f.read()
    
    required_vars = ['SUPABASE_URL', 'SUPABASE_KEY', 'SUPABASE_SERVICE_KEY']
    missing_vars = []
    
    for var in required_vars:
        if f'{var}=' not in content or f'{var}=your_' in content:
            missing_vars.append(var)
    
    if missing_vars:
        print(f"⚠️  Variables de Supabase no configuradas: {', '.join(missing_vars)}")
        print("   Edita el archivo .env con tus credenciales de Supabase")
        return False
    
    print("✅ Configuración de Supabase verificada")
    return True

def main():
    print("🚀 Configuración rápida de LearnGenix Backend")
    print("=" * 50)
    
    # Crear archivo .env
    create_env_file()
    
    # Instalar dependencias
    install_dependencies()
    
    # Verificar configuración
    print("\n🔧 Verificando configuración...")
    if check_supabase_config():
        print("\n✅ Configuración completada!")
        print("\n📋 Próximos pasos:")
        print("1. Ejecuta: python init_db.py")
        print("2. Ejecuta: python run.py")
        print("3. Ve a: http://localhost:8000/docs")
    else:
        print("\n❌ Configuración incompleta")
        print("   Configura las variables de Supabase en el archivo .env")

if __name__ == "__main__":
    main() 