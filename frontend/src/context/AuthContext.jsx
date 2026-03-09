import { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('vnl_token'));
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('vnl_admin');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const { token: authToken, admin: adminData } = response.data;
      localStorage.setItem('vnl_token', authToken);
      localStorage.setItem('vnl_admin', JSON.stringify(adminData));
      setToken(authToken);
      setAdmin(adminData);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response?.data?.message || 'Login failed.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('vnl_token');
    localStorage.removeItem('vnl_admin');
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({ token, admin, loading, isAuthenticated: Boolean(token), login, logout }),
    [token, admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
};
