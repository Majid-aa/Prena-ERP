import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import { RiBuilding2Line, RiUserLine, RiMoneyDollarCircleLine, RiBarChart2Line } from 'react-icons/ri';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalCompanies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getSummary()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: 'کل شرکت ها', value: stats.totalCompanies, icon: <RiBuilding2Line size={24} />, color: '#1A237E', bg: 'rgba(26,35,126,0.1)' },
    { title: 'کل کاربران', value: stats.totalUsers, icon: <RiUserLine size={24} />, color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
    { title: 'کاربران فعال', value: stats.activeUsers, icon: <RiUserLine size={24} />, color: '#7C4DFF', bg: 'rgba(124,77,255,0.1)' },
    { title: 'درآمد ماهانه', value: '۸۵۰,۰۰۰,۰۰۰', icon: <RiMoneyDollarCircleLine size={24} />, color: '#FF6D00', bg: 'rgba(255,109,0,0.1)' },
  ];

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>🛡️ داشبورد مدیریت</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>خوش آمدید، {user?.fullName || 'مدیر سیستم'}</p>
      </div>

      {loading ? (
        <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال بارگذاری...</p></div>
      ) : (
        <div className="row g-3 mb-4">
          {cards.map((card, i) => (
            <div className="col-12 col-sm-6 col-xl-3" key={i}>
              <div className="card p-3 h-100" style={{ borderRadius: '12px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, backgroundColor: card.bg, color: card.color }}>{card.icon}</div>
                </div>
                <h3 className="mb-1" style={{ fontWeight: 600, color: card.color }}>{card.value}</h3>
                <small className="text-muted">{card.title}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '3rem' }}>📊</div>
            <h5>گزارشات پیشرفته</h5>
            <p className="text-muted">به زودی...</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '3rem' }}>🔧</div>
            <h5>تنظیمات سیستم</h5>
            <p className="text-muted">به زودی...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
