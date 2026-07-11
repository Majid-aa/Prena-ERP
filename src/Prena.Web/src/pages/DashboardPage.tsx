import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { RiWallet3Line, RiUserLine, RiFileTextLine, RiBuilding2Line } from 'react-icons/ri';

export const DashboardPage: React.FC = () => {
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
    { title: 'کل کاربران', value: stats.totalUsers, icon: <RiUserLine size={24} />, color: '#1A237E', bg: 'rgba(26,35,126,0.1)' },
    { title: 'کاربران فعال', value: stats.activeUsers, icon: <RiUserLine size={24} />, color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
    { title: 'شرکت ها', value: stats.totalCompanies, icon: <RiBuilding2Line size={24} />, color: '#7C4DFF', bg: 'rgba(124,77,255,0.1)' },
    { title: 'درآمد ماهانه', value: '۸۵۰,۰۰۰,۰۰۰', icon: <RiWallet3Line size={24} />, color: '#FF6D00', bg: 'rgba(255,109,0,0.1)' },
  ];

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>👋 خوش آمدید، {user?.fullName || 'کاربر گرامی'}</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>خلاصه وضعیت امروز سیستم</p>
      </div>

      {loading ? (
        <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال بارگذاری داشبورد...</p></div>
      ) : (
        <div className="row g-3">
          {cards.map((card, i) => (
            <div className="col-12 col-sm-6 col-xl-3" key={i}>
              <div className="card p-3 h-100" style={{ borderRadius: '12px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, backgroundColor: card.bg, color: card.color }}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="mb-1" style={{ fontWeight: 600, color: card.color }}>{card.value}</h3>
                <small className="text-muted">{card.title}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-8">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 style={{ fontWeight: 500 }}>📈 دسترسی سریع</h5>
            <div className="row g-3 mt-2">
              {[
                { title: 'سند حسابداری جدید', icon: '📄', path: '/accounting' },
                { title: 'فاکتور فروش', icon: '🧾', path: '/sales' },
                { title: 'مدیریت کاربران', icon: '👥', path: '/users' },
                { title: 'گزارشات مالی', icon: '📊', path: '/accounting/reports' },
              ].map((item, i) => (
                <div className="col-6" key={i}>
                  <a href={item.path} className="btn btn-light w-100 p-3 text-center text-decoration-none" style={{ borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                    <small style={{ color: '#333' }}>{item.title}</small>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 style={{ fontWeight: 500 }}>🕐 وضعیت سیستم</h5>
            <div className="mt-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded-circle bg-success" style={{ width: 10, height: 10 }} />
                <small>سرور: فعال</small>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded-circle bg-success" style={{ width: 10, height: 10 }} />
                <small>دیتابیس: متصل</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle bg-success" style={{ width: 10, height: 10 }} />
                <small>نسخه: ۱.۰.۰</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
