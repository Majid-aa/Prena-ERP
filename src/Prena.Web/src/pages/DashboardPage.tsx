import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/common/ToastContainer';
import { dashboardService } from '../services/dashboardService';
import { RiWallet3Line, RiUserLine, RiFileTextLine, RiBuilding2Line, RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalCompanies: 0, totalVouchers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const data = await dashboardService.getSummary();
      setStats(data);
    } catch (e) {
      showToast('خطا در بارگذاری داشبورد', 'error');
    } finally { setLoading(false); }
  };

  const chartData = {
    labels: ['کاربران', 'شرکت ها', 'اسناد', 'درآمد'],
    datasets: [{
      label: 'آمار',
      data: [stats.totalUsers, stats.totalCompanies, stats.totalVouchers, 850],
      backgroundColor: ['#1A237E', '#00C853', '#FF6D00', '#7C4DFF'],
      borderRadius: 8,
    }],
  };

  const cards = [
    { title: 'کل کاربران', value: stats.totalUsers, icon: <RiUserLine size={24} />, color: '#1A237E', bg: 'rgba(26,35,126,0.1)', change: '+12%', up: true },
    { title: 'کاربران فعال', value: stats.activeUsers, icon: <RiUserLine size={24} />, color: '#00C853', bg: 'rgba(0,200,83,0.1)', change: '+8%', up: true },
    { title: 'شرکت ها', value: stats.totalCompanies, icon: <RiBuilding2Line size={24} />, color: '#7C4DFF', bg: 'rgba(124,77,255,0.1)', change: '+5%', up: true },
    { title: 'اسناد امروز', value: stats.totalVouchers || 42, icon: <RiFileTextLine size={24} />, color: '#FF6D00', bg: 'rgba(255,109,0,0.1)', change: '+15%', up: true },
  ];

  const quickActions = [
    { title: 'سند حسابداری جدید', icon: 'A', path: '/accounting', color: '#1A237E' },
    { title: 'فاکتور فروش', icon: 'B', path: '/sales', color: '#00C853' },
    { title: 'رسید انبار', icon: 'C', path: '/inventory/receipt', color: '#7C4DFF' },
    { title: 'گزارشات مالی', icon: 'D', path: '/reports/financial', color: '#FF6D00' },
  ];

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال بارگذاری...</p></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>خوش آمدید, {user?.fullName || 'کاربر گرامی'}</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>خلاصه وضعیت امروز سیستم</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {cards.map((card, i) => (
          <div className="col-12 col-sm-6 col-xl-3" key={i}>
            <div className="card p-3 h-100" style={{ borderRadius: '12px' }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, backgroundColor: card.bg, color: card.color }}>{card.icon}</div>
                <span className="badge rounded-pill" style={{ backgroundColor: card.up ? 'rgba(0,200,83,0.1)' : 'rgba(255,23,68,0.1)', color: card.up ? '#00C853' : '#FF1744', fontSize: '0.75rem' }}>
                  {card.up ? '+' : '-'} {card.change}
                </span>
              </div>
              <h3 className="mb-1" style={{ fontWeight: 600, color: card.color }}>{card.value}</h3>
              <small className="text-muted">{card.title}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 style={{ fontWeight: 500 }}>آمار کلی</h5>
            <div style={{ height: '250px' }}>
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 style={{ fontWeight: 500 }}>دسترسی سریع</h5>
            <div className="d-flex flex-column gap-2 mt-3">
              {quickActions.map((action, i) => (
                <a key={i} href={action.path} className="btn btn-light text-start p-3 text-decoration-none d-flex align-items-center gap-3" style={{ borderRadius: '10px' }}>
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, backgroundColor: action.color + '15', fontSize: '1.2rem' }}>{action.icon}</div>
                  <span style={{ fontWeight: 500, color: '#333' }}>{action.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};