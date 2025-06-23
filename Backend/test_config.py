#!/usr/bin/env python3
"""
Script de prueba para verificar la configuración
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from app.core.config import settings
    print("✅ Configuración cargada correctamente")
    print(f"📡 API URL: {settings.api_v1_str}")
    print(f"🔗 Supabase URL: {settings.supabase_url[:20]}..." if settings.supabase_url else "❌ Supabase URL no configurada")
    print(f"🔑 Supabase Key: {'✅ Configurada' if settings.supabase_key else '❌ No configurada'}")
    print(f"🔐 Service Key: {'✅ Configurada' if settings.supabase_service_key else '❌ No configurada'}")
except Exception as e:
    print(f"❌ Error al cargar configuración: {e}")
    import traceback
    traceback.print_exc() 