import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import authService from '../services/authService';
import type { IUser } from '../types';

// 1. Define what data we want to share across the app
interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

// 2. Create the Context with default empty values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. The Provider Component (The "Parent" that wraps the app)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is already logged in when the app starts
  useEffect(() => {
    const checkLoggedIn = () => {
      const token = authService.getCurrentUser();
      if (token) {
        // In a real app, you might call an API like /auth/me here to get user details.
        // For now, we assume if there is a token, they are logged in.
        setIsAuthenticated(true);
        // Optional: Recover user data from localStorage if you saved it there, 
        // or leave it null until we implement a "fetch profile" API.
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  // Login Action
  const login = async (userData: any) => {
    const data = await authService.login(userData);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // Register Action
  const register = async (userData: any) => {
    const data = await authService.register(userData);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // Logout Action
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};