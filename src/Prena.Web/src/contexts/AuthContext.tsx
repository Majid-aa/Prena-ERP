import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  user: any;
  companies: any[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (mobile: string, code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      authService.getCurrentUser()
        .then((data: any) => setUser(data))
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('companies');
        })
        .finally(() => setIsLoading(false));
      
      const savedCompanies = localStorage.getItem('companies');
      if (savedCompanies) setCompanies(JSON.parse(savedCompanies));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (mobile: string, code: string) => {
    const res = await authService.verifyOtp(mobile, code);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('companies', JSON.stringify(res.companies || []));
    setUser(res.user);
    setCompanies(res.companies || []);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('companies');
    localStorage.removeItem('currentCompany');
    setUser(null);
    setCompanies([]);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, companies, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
