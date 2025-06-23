from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.auth import router as auth_router
from app.api.exercises import router as exercises_router
from app.api.dashboard import router as dashboard_router

app = FastAPI(
    title=settings.project_name,
    openapi_url=f"{settings.api_v1_str}/openapi.json"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth_router, prefix=f"{settings.api_v1_str}/auth", tags=["auth"])
app.include_router(exercises_router, prefix=f"{settings.api_v1_str}/exercises", tags=["exercises"])
app.include_router(dashboard_router, prefix=f"{settings.api_v1_str}/dashboard", tags=["dashboard"])

@app.get("/")
def read_root():
    return {"message": "¡Bienvenido a LearnGenix API!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"} 