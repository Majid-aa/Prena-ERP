import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RiBuilding2Line, RiArrowLeftSLine } from 'react-icons/ri';

export const CompanySelectPage: React.FC = () => {
  const { companies, logout } = useAuth();
  const navigate = useNavigate();

  const handleSelectCompany = (company: any) => {
    localStorage.setItem('currentCompany', JSON.stringify(company));
    navigate('/dashboard');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="card p-5 shadow-lg" style={{ width: '480px', maxWidth: '92vw', borderRadius: '16px' }}>
        <div className="text-center mb-4">
          <div className="d-inline-block mb-3" style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #1A237E, #7C4DFF)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <RiBuilding2Line size={32} color="white" />
          </div>
          <h4 style={{ fontWeight: 500 }}>انتخاب شرکت</h4>
          <p className="text-muted">شما به چند شرکت دسترسی دارید. لطفاً یکی را انتخاب کنید.</p>
        </div>

        <div className="d-flex flex-column gap-3 mb-4">
          {(companies || []).map((company: any, i: number) => (
            <button
              key={i}
              className="btn btn-light text-start p-3 d-flex align-items-center gap-3"
              style={{ borderRadius: '12px', border: '1px solid #e0e0e0', transition: 'all 0.2s' }}
              onClick={() => handleSelectCompany(company)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1A237E';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,35,126,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #1A237E, #7C4DFF)', color: 'white', fontSize: '1.2rem' }}
              >
                {company.name?.charAt(0) || 'ش'}
              </div>
              <div className="flex-grow-1">
                <div style={{ fontWeight: 500 }}>{company.name}</div>
                <small className="text-muted">{company.role || 'کاربر'}</small>
              </div>
              <RiArrowLeftSLine size={20} className="text-muted" />
            </button>
          ))}
        </div>

        <button 
          className="btn btn-link text-muted w-100" 
          onClick={logout}
          style={{ fontSize: '0.9rem' }}
        >
          خروج از حساب کاربری
        </button>
      </div>
    </div>
  );
};
