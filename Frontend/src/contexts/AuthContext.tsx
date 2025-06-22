import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiService, User as ApiUser } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Función para convertir ApiUser a User
const convertApiUserToUser = (apiUser: ApiUser): User => ({
  id: apiUser.id.toString(),
  name: apiUser.name,
  email: apiUser.email,
  role: apiUser.role as 'student' | 'teacher'
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (apiService.isAuthenticated()) {
          const apiUser = await apiService.getCurrentUser();
          setUser(convertApiUserToUser(apiUser));
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        // Si hay error, limpiar token inválido
        apiService.removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ username: email, password });
      apiService.setToken(response.access_token);
      setUser(convertApiUserToUser(response.user));
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher') => {
    try {
      const response = await apiService.register({ name, email, password, role });
      apiService.setToken(response.access_token);
      setUser(convertApiUserToUser(response.user));
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    apiService.removeToken();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};