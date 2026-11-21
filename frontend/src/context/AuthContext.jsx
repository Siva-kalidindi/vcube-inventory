import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    return token ? { token, name, role, email } : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, name, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('name', name || email.split('@')[0]);
      localStorage.setItem('role', role || 'STAFF');
      localStorage.setItem('email', email);

      const userData = { token, name: name || email.split('@')[0], role: role || 'STAFF', email };
      setUser(userData);
      return { success: true, data: response.data };
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response?.data : null) ||
        err.message ||
        'Login failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'STAFF') => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      const { token, name: userName, role: userRole } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('name', userName || name);
      localStorage.setItem('role', userRole || role);
      localStorage.setItem('email', email);

      const userData = { token, name: userName || name, role: userRole || role, email };
      setUser(userData);
      return { success: true, data: response.data };
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response?.data : null) ||
        err.message ||
        'Registration failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user?.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
