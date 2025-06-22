import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # API Configuration
    api_v1_str: str = "/api/v1"
    project_name: str = "LearnGenix API"
    
    # Supabase
    supabase_url: str = os.getenv("SUPABASE_URL", "")
    supabase_key: str = os.getenv("SUPABASE_KEY", "")
    supabase_service_key: str = os.getenv("SUPABASE_SERVICE_KEY", "")
    
    # JWT
    secret_key: str = os.getenv("SECRET_KEY", "your_secret_key_here_make_it_long_and_random")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    backend_cors_origins: List[str] = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Next.js dev server
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

settings = Settings() 