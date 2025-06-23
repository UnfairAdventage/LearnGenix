import { API_CONFIG, ENDPOINTS } from '../config/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autorización si existe
    const token = localStorage.getItem('learngenix_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Autenticación
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(`${this.baseURL}${ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Credenciales inválidas');
    }

    return await response.json();
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>(ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async resendConfirmation(email: string): Promise<{ message: string; email: string }> {
    return this.request<{ message: string; email: string }>(ENDPOINTS.AUTH.RESEND_CONFIRMATION, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>(ENDPOINTS.AUTH.ME);
  }

  // Utilidades
  setToken(token: string) {
    localStorage.setItem('learngenix_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('learngenix_token');
  }

  removeToken() {
    localStorage.removeItem('learngenix_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async getNextExercise(subject_id: string, difficulty: string = 'medium'): Promise<any> {
    return this.request<any>(ENDPOINTS.EXERCISES.NEXT, {
      method: 'POST',
      body: JSON.stringify({ subject_id, difficulty }),
    });
  }

  async getDashboardSummary(): Promise<any> {
    return this.request<any>('/dashboard/summary', {
      method: 'GET',
    });
  }
 
  async getSubjects(): Promise<any[]> {
    return this.request<any[]>('/dashboard/subjects', { method: 'GET' });
  }

  async getTopics(): Promise<any[]> {
    return this.request<any[]>('/dashboard/topics', { method: 'GET' });
  }

  async getAchievements(): Promise<any[]> {
    return this.request<any[]>('/dashboard/achievements', { method: 'GET' });
  }

  async submitExercise({ exercise_id, answer, time_spent }: { exercise_id: string, answer: string, time_spent?: number }): Promise<{ success: boolean; is_correct: boolean; score: number }> {
    return this.request<{ success: boolean; is_correct: boolean; score: number }>(ENDPOINTS.EXERCISES.SUBMIT, {
      method: 'POST',
      body: JSON.stringify({ exercise_id, answer, time_spent }),
    });
  }
}

export const apiService = new ApiService(); 