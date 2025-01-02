import { api } from '@/lib/axios';
import { useState, useEffect } from 'react';

interface AuthResponse {
  token: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/sessions', {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Erro no login', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
