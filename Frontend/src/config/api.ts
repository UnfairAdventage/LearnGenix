// Configuración de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  TIMEOUT: 10000, // 10 segundos
};

// Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    RESEND_CONFIRMATION: '/auth/resend-confirmation',
  },
  EXERCISES: {
    LIST: '/exercises',
    CREATE: '/exercises',
    GET: (id: string) => `/exercises/${id}`,
    UPDATE: (id: string) => `/exercises/${id}`,
    DELETE: (id: string) => `/exercises/${id}`,
    NEXT: '/exercises/next',
    SUBMIT: '/exercises/submit',
  },
  PROGRESS: {
    GET: '/progress',
    SUBMIT: '/progress/submit',
  },
  SUBJECTS: {
    LIST: '/subjects',
    GET: (id: string) => `/subjects/${id}`,
  },
  TOPICS: {
    LIST: '/topics',
    GET: (id: string) => `/topics/${id}`,
  },
}; 