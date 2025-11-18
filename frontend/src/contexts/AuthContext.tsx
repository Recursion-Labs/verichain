import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

type User = { id: string; email: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string) => Promise<void>;
  register: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem('veri_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('veri_user', JSON.stringify(user));
      localStorage.setItem('veri_token', user.id); // Using user ID as token for demo
    } else {
      localStorage.removeItem('veri_user');
      localStorage.removeItem('veri_token');
    }
  }, [user]);

  const login = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.login(email);
      // OTP sent successfully
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.register(email);
      // OTP sent successfully
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.verifyOTP(email, otp);
      const user = { id: response.user.id, email: response.user.email };
      setUser(user);
      return user;
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verifyOTP, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
