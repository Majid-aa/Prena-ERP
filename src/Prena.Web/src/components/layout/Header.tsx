import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  RiNotification3Line, RiLogoutBoxLine, RiMenuLine,
  RiBuilding2Line, RiArrowDownSLine, RiSearchLine,
  RiUserLine, RiSettingsLine, RiShieldKeyholeLine
} from 'react-icons/ri';

interface Props { onToggleSidebar: () => void; }

export const Header: React.FC<Props> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const currentCompany = JSON.parse(localStorage.getItem('currentCompany') || '{}');

  return (
    <header className="header d-flex align-items-center justify-content-between">
      {/* Left Side */}
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-link text-dark d-md-none p-0" onClick={onToggleSidebar}>
          <RiMenuLine size={24} />
        </button>

        {/* Company Selector */}
        <div className="dropdown">
          <button 
            className="btn btn-light d-flex align-items-center gap-2" 
            data-bs-toggle="dropdown"
            style={{ borderRadius: '8px', padding: '8px 16px' }}
          >
            <RiBuilding2Line size={18} />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
              {currentCompany?.name || 'Prena ERP'}
            </span>
            <RiArrowDownSLine size={16} />
          </button>
          <ul className="dropdown-menu" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <li><h6 className="dropdown-header">شرکت‌های من</h6></li>
            <li><button className="dropdown-item d-flex align-items-center gap-2" onClick={() => navigate('/select-company')}>
              <RiBuilding2Line /> تغییر شرکت
            </button></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item d-flex align-items-center gap-2" onClick={() => navigate('/settings')}>
              <RiSettingsLine /> تنظیمات شرکت
            </button></li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-2">
        {/* Search */}
        <div className="d-none d-md-flex align-items-center bg-light rounded-3 px-3 py-1" style={{ width: '250px' }}>
          <RiSearchLine size={16} className="text-muted ms-2" />
          <input 
            type="text" 
            className="form-control border-0 bg-transparent" 
            placeholder="جستجوی سریع..." 
            style={{ fontSize: '0.85rem', boxShadow: 'none' }}
          />
          <kbd className="bg-white text-muted px-2 rounded-2" style={{ fontSize: '0.7rem', border: '1px solid #ddd' }}>Ctrl+K</kbd>
        </div>

        {/* Notifications */}
        <div className="dropdown">
          <button 
            className="btn btn-light position-relative rounded-circle" 
            data-bs-toggle="dropdown"
            style={{ width: 40, height: 40 }}
          >
            <RiNotification3Line size={18} />
            <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
              ۳
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu-end p-3" style={{ width: '320px', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h6 className="mb-3">اعلان‌ها</h6>
            {[
              { text: 'فاکتور جدید ثبت شد', time: '۵ دقیقه پیش', color: '#00C853' },
              { text: 'موجودی کالا به حد هشدار رسید', time: '۱ ساعت پیش', color: '#FF1744' },
              { text: 'یادآوری سررسید چک', time: 'دیروز', color: '#FF6D00' },
            ].map((n, i) => (
              <div key={i} className="d-flex align-items-center gap-2 mb-2 p-2 rounded-2" style={{ background: '#f8f9fa' }}>
                <div className="rounded-circle flex-shrink-0" style={{ width: 8, height: 8, backgroundColor: n.color }} />
                <div className="flex-grow-1">
                  <small style={{ fontWeight: 500 }}>{n.text}</small>
                  <br />
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>{n.time}</small>
                </div>
              </div>
            ))}
            <button className="btn btn-link w-100 text-center mt-2" style={{ fontSize: '0.85rem' }}>مشاهده همه</button>
          </div>
        </div>

        {/* User Menu */}
        <div className="dropdown">
          <button 
            className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" 
            data-bs-toggle="dropdown"
            style={{ borderRadius: '8px', padding: '6px 12px' }}
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
              style={{ 
                width: 32, height: 32, 
                background: 'linear-gradient(135deg, #1A237E, #7C4DFF)',
                fontSize: '0.8rem'
              }}
            >
              {user?.fullName?.charAt(0) || '؟'}
            </div>
            <span className="d-none d-md-inline" style={{ fontSize: '0.9rem' }}>
              {user?.fullName || user?.mobile}
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <li>
              <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => navigate('/profile')}>
                <RiUserLine /> پروفایل
              </button>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => navigate('/settings')}>
                <RiSettingsLine /> تنظیمات
              </button>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item d-flex align-items-center gap-2 text-danger" onClick={logout}>
                <RiLogoutBoxLine /> خروج
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
