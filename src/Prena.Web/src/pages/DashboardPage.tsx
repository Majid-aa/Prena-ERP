import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { RiWallet3Line, RiUserLine, RiFileTextLine, RiBuilding2Line } from 'react-icons/ri';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getSummary()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: 'کل کاربران', value: stats.totalUsers, icon: <RiUserLine size={24} />, color: '#1A237E' },
    { title: 'کاربران فعال', value: stats.activeUsers, icon: <RiUserLine size={24} />, color: '#00C853' },
    { title: 'درآمد ماهانه', value: '۸۵۰,۰۰۰,۰۰۰', icon: <RiWallet3Line size={24} />, color: '#7C4DFF' },
    { title: 'اسناد امروز', value: '۴۲', icon: <RiFileTextLine size={24} />, color: '#FF6D00' },
  ];

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>👋 خوش آمدید، {user?.fullName || 'کاربر گرامی'}</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>خلاصه وضعیت امروز</p>
      </div>

      {loading ? (
        <div className="text-center p-5"><div className="spinner-border text-primary" /></div>
      ) : (
        <div className="row g-3">
          {cards.map((card, i) => (
            <div className="col-12 col-sm-6 col-xl-3" key={i}>
              <div className="card p-3" style={{ borderRadius: '12px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, backgroundColor: card.color + '15', color: card.color }}>
                    {card.icon}
                  </div>
                </div>
                <h3 style={{ fontWeight: 600, color: card.color }}>{card.value}</h3>
                <small className="text-muted">{card.title}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
