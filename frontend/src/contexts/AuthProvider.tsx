'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, LoginRequest, RegisterRequest } from '@/modules/auth/types/AuthTypes';
import { AuthRepository } from '@/modules/auth/repositories/AuthRepository';
import { useToast } from './ToastProvider';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<{ success: boolean; message?: string }>;
  register: (request: RegisterRequest) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const token = localStorage.getItem('userToken');
      const storedData = localStorage.getItem('userData');
      if (token && storedData) {
        setUser(JSON.parse(storedData) as AuthUser);
      }
    } catch (e) {
      console.error('Failed to parse stored user data', e);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (request: LoginRequest) => {
    try {
      const response = await AuthRepository.login(request);
      if (response.success && response.session) {
        localStorage.setItem('userToken', response.session.token);
        localStorage.setItem('userData', JSON.stringify(response.session.user));
        setUser(response.session.user);
        showToast('Login successful', 'success');
      } else {
        showToast(response.message || 'Login failed', 'error');
      }
      return { success: response.success, message: response.message };
    } catch (error) {
      showToast('An unexpected error occurred', 'error');
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const register = async (request: RegisterRequest) => {
    try {
      const response = await AuthRepository.register(request);
      if (response.success && response.session) {
        localStorage.setItem('userToken', response.session.token);
        localStorage.setItem('userData', JSON.stringify(response.session.user));
        setUser(response.session.user);
        showToast('Registration complete', 'success');
      } else {
        showToast(response.message || 'Registration failed', 'error');
      }
      return { success: response.success, message: response.message };
    } catch (error) {
      showToast('An unexpected error occurred', 'error');
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await AuthRepository.logout();
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      setUser(null);
      showToast('Logout successful', 'success');
    } catch (error) {
      showToast('Logout failed', 'error');
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      showToast('Password reset email sent', 'success');
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      showToast('Failed to send reset email', 'error');
      return { success: false, message: 'Failed to send reset email' };
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
