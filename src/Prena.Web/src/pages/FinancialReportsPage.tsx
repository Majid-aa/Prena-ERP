import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const FinancialReportsPage: React.FC = () => {
  const [period, setPeriod] = useState('month');

  const barData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    datasets: [
      {
        label: 'درآمد (میلیون ریال)',
        data: [120, 150, 180, 200, 250, 280],
        backgroundColor: 'rgba(26, 35, 126, 0.7)',
        borderColor: '#1A237E',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'هزینه (میلیون ریال)',
        data: [80, 95, 110, 130, 160, 170],
        backgroundColor: 'rgba(255, 23, 68, 0.7)',
        borderColor: '#FF1744',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ['فروش محصولات', 'خدمات', 'سرمایه‌گذاری', 'سایر'],
    datasets: [
      {
        data: [450, 250, 150, 100],
        backgroundColor: ['#1A237E', '#00C853', '#FF6D00', '#7C4DFF'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { font: { family: 'IRANSans', size: 12 }, padding: 20 } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { font: { family: 'IRANSans', size: 12 }, padding: 20 } },
    },
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>📊 گزارشات مالی</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>تحلیل درآمد و هزینه</p>
        </div>
        <div className="d-flex gap-2">
          <button className={`btn btn-sm ${period === 'month' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setPeriod('month')}>ماهانه</button>
          <button className={`btn btn-sm ${period === 'quarter' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setPeriod('quarter')}>فصل</button>
          <button className={`btn btn-sm ${period === 'year' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setPeriod('year')}>سالانه</button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 style={{ fontWeight: 500 }}>📈 روند درآمد و هزینه</h5>
            <div style={{ height: '350px' }}>
              <Bar data={barData} options={options} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 style={{ fontWeight: 500 }}>🥧 ترکیب درآمد</h5>
            <div style={{ height: '350px' }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-3">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem' }}>💰</div>
            <h3 style={{ color: '#00C853', fontWeight: 600 }}>۱,۱۸۰</h3>
            <small className="text-muted">کل درآمد (میلیون ریال)</small>
            <span className="badge bg-success bg-opacity-10 text-success mt-2">+۲۲٪</span>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem' }}>📉</div>
            <h3 style={{ color: '#FF1744', fontWeight: 600 }}>۷۴۵</h3>
            <small className="text-muted">کل هزینه (میلیون ریال)</small>
            <span className="badge bg-danger bg-opacity-10 text-danger mt-2">+۱۵٪</span>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem' }}>🎯</div>
            <h3 style={{ color: '#1A237E', fontWeight: 600 }}>۴۳۵</h3>
            <small className="text-muted">سود خالص (میلیون ریال)</small>
            <span className="badge bg-primary bg-opacity-10 text-primary mt-2">+۳۵٪</span>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem' }}>📊</div>
            <h3 style={{ color: '#7C4DFF', fontWeight: 600 }}>۳۶.۸٪</h3>
            <small className="text-muted">حاشیه سود</small>
            <span className="badge bg-purple bg-opacity-10 text-purple mt-2">+۵٪</span>
          </div>
        </div>
      </div>
    </div>
  );
};