import React, { createContext, useContext, useState, useEffect } from 'react';

type User = { id: string; email: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => void;
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

  useEffect(() => {
    if (user) localStorage.setItem('veri_user', JSON.stringify(user));
    else localStorage.removeItem('veri_user');
  }, [user]);

  const login = async (email: string) => {
    // fake auth for frontend demo; replace with API call
    const u = { id: 'u_' + Math.random().toString(36).slice(2), email };
    setUser(u);
    return u;
  };

  const register = async (email: string) => {
    // fake register
    const u = { id: 'u_' + Math.random().toString(36).slice(2), email };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
