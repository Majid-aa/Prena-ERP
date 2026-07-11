import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { RegisterPage } from './pages/RegisterPage';
import { CompanySelectPage } from './pages/CompanySelectPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { RolesPage } from './pages/RolesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AccountingPage } from './pages/AccountingPage';
import { JournalPage } from './pages/JournalPage';
import { TrialBalancePage } from './pages/TrialBalancePage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CompaniesPage } from './pages/admin/CompaniesPage';
import { ModulesPage } from './pages/admin/ModulesPage';
import { AgentsPage } from './pages/admin/AgentsPage';
import './styles/global.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { LedgerPage } from './pages/LedgerPage';
import { ProfitLossPage } from './pages/ProfitLossPage';

const ProtectedRoute: React.FC<{children:React.ReactNode}> = ({children}) => {
  const {isAuthenticated, isLoading} = useAuth();
  if(isLoading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><div className="spinner-border text-primary"/></div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;
};

const Placeholder: React.FC<{title:string}> = ({title}) => (
  <div className="card p-5 text-center" style={{borderRadius:'12px'}}>
    <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🚧</div>
    <h4 style={{fontWeight:500}}>{title}</h4>
    <p className="text-muted">این ماژول به زودی در دسترس خواهد بود.</p>
  </div>
);

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/select-company" element={<ProtectedRoute><CompanySelectPage/></ProtectedRoute>}/>
          <Route path="/" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard"/>}/>
            <Route path="dashboard" element={<DashboardPage/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            <Route path="users" element={<UsersPage/>}/>
            <Route path="roles" element={<RolesPage/>}/>
            <Route path="settings" element={<SettingsPage/>}/>
            <Route path="accounting" element={<AccountingPage/>}/>
            <Route path="accounting/journal" element={<JournalPage/>}/>
            <Route path="accounting/trial-balance" element={<TrialBalancePage/>}/>
            <Route path="accounting/ledger" element={<LedgerPage/>}/>
            <Route path="accounting/profit-loss" element={<ProfitLossPage/>}/>
            <Route path="treasury" element={<Placeholder title="خزانه داری"/>}/>
            <Route path="inventory" element={<Placeholder title="انبارداری"/>}/>
            <Route path="sales" element={<Placeholder title="فروش"/>}/>
            <Route path="admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="admin/companies" element={<CompaniesPage/>}/>
            <Route path="admin/modules" element={<ModulesPage/>}/>
            <Route path="admin/agents" element={<AgentsPage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
