# LearnGenix Backend

Backend API para la plataforma LearnGenix construido con FastAPI y Supabase.

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 2. Configurar variables de entorno

Copia el archivo `env.example` a `.env` y configura las variables:

```bash
cp env.example .env
```

Edita el archivo `.env` con tus configuraciones de Supabase:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# JWT
SECRET_KEY=tu_clave_secreta_muy_larga_y_segura_aqui

# API
API_V1_STR=/api/v1
PROJECT_NAME=LearnGenix API

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

### 3. Probar la configuración

```bash
python test_supabase.py
```

Este script verificará que tu configuración de Supabase sea correcta.

### 4. Inicializar usuarios de prueba

```bash
python init_db.py
```

Esto creará usuarios de prueba en tu base de datos Supabase.

## 🏃‍♂️ Ejecutar el servidor

### Desarrollo

```bash
python run.py
```

O directamente con uvicorn:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Producción

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📚 Documentación de la API

Una vez que el servidor esté corriendo, puedes acceder a:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

## 🔐 Endpoints de Autenticación

### Registro
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "name": "Nombre Usuario",
  "role": "student"
}
```

### Login
```
POST /api/v1/auth/login
Content-Type: application/x-www-form-urlencoded

username=usuario@ejemplo.com&password=contraseña123
```

### Obtener usuario actual
```
GET /api/v1/auth/me
Authorization: Bearer <token>
```

## 👥 Usuarios de Prueba

El script `init_db.py` crea los siguientes usuarios:

- **Estudiante**: student@test.com / password
- **Profesor**: teacher@test.com / password  
- **Admin**: admin@test.com / password

## 🧪 Scripts de Prueba

- `test_config.py` - Prueba la configuración básica
- `test_supabase.py` - Prueba la conexión con Supabase
- `init_db.py` - Inicializa usuarios de prueba
- `setup.py` - Configuración automática

## 🏗️ Estructura del Proyecto

```
Backend/
├── app/
│   ├── api/           # Endpoints de la API
│   ├── core/          # Configuración y utilidades
│   ├── crud/          # Operaciones de base de datos
│   ├── models/        # Modelos Pydantic
│   └── schemas/       # Esquemas Pydantic
├── requirements.txt   # Dependencias Python
├── init_db.py        # Script de inicialización
├── test_supabase.py  # Script de prueba
└── README.md         # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **FastAPI**: Framework web moderno y rápido
- **Supabase**: Backend-as-a-Service con PostgreSQL
- **Pydantic**: Validación de datos
- **Python-Jose**: Manejo de JWT
- **Uvicorn**: Servidor ASGI

## 🔑 Configuración de Supabase

### Variables de Entorno Necesarias

1. **SUPABASE_URL**: URL de tu proyecto Supabase
2. **SUPABASE_KEY**: Clave anónima (anon key) de tu proyecto
3. **SUPABASE_SERVICE_KEY**: Clave de servicio (service role key) para operaciones administrativas

### Políticas de Seguridad

El backend asume que ya tienes configuradas las políticas de seguridad en Supabase para:
- Lectura/escritura en la tabla `users`
- Autenticación de usuarios
- Gestión de sesiones

## 🚨 Notas Importantes

- El backend usa la **service key** para operaciones administrativas como crear usuarios
- La autenticación se maneja a través de Supabase Auth
- Los tokens JWT se generan localmente para compatibilidad con el frontend
- Asegúrate de que las políticas de Supabase permitan las operaciones necesarias

## 🔧 Solución de Problemas

### Error de configuración
Si ves errores de Pydantic, ejecuta:
```bash
python test_config.py
```

### Error de conexión con Supabase
Si hay problemas de conexión, ejecuta:
```bash
python test_supabase.py
```

### Error de dependencias
Si hay errores de importación:
```bash
pip install -r requirements.txt
``` 