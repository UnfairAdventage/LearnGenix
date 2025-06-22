#!/usr/bin/env python3
"""
Script para ejecutar el servidor de desarrollo de LearnGenix Backend
"""
import uvicorn
import os
import sys

# Agregar el directorio actual al path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🚀 Iniciando servidor de desarrollo LearnGenix Backend...")
    print("📚 Documentación disponible en: http://localhost:8000/docs")
    print("🔗 API Base URL: http://localhost:8000/api/v1")
    print("⏹️  Presiona Ctrl+C para detener el servidor\n")
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 