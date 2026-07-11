import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RiBuilding2Line, RiUserLine, RiMoneyDollarCircleLine, RiBarChart2Line } from 'react-icons/ri';

const stats = [
  { title: 'کل شرکت‌ها', value: '۱۲۸', change: '+۱۲', icon: <RiBuilding2Line size={24} />, color: '#1A237E' },
  { title: 'کاربران فعال', value: '۲,۴۵۰', change: '+۱۸٪', icon: <RiUserLine size={24} />, color: '#00C853' },
  { title: 'درآمد ماهانه', value: '۸۵۰,۰۰۰,۰۰۰', change: '+۲۲٪', icon: <RiMoneyDollarCircleLine size={24} />, color: '#7C4DFF' },
  { title: 'تیکت‌های باز', value: '۴۵', change: '-۸', icon: <RiBarChart2Line size={24} />, color: '#FF6D00' },
];

const recentCompanies = [
  { name: 'شرکت بازرگانی آسمان', plan: 'حرفه‌ای', status: 'active', date: 'امروز' },
  { name: 'فروشگاه اینترنتی دیجی‌کالا', plan: 'سازمانی', status: 'active', date: 'دیروز' },
  { name: 'کارخانه تولیدی البرز', plan: 'پایه', status: 'trial', date: '۲ روز پیش' },
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>داشبورد مدیریت</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          خوش آمدید، {user?.fullName || 'مدیر سیستم'}
        </p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {stats.map((stat, i) => (
          <div className="col-12 col-sm-6 col-xl-3" key={i}>
            <div className="card p-3" style={{ borderRadius: '12px' }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48, backgroundColor: stat.color + '15', color: stat.color }}
                >
                  {stat.icon}
                </div>
                <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(0,200,83,0.1)', color: '#00C853' }}>
                  {stat.change}
                </span>
              </div>
              <h3 style={{ fontWeight: 600, color: stat.color }}>{stat.value}</h3>
              <small className="text-muted">{stat.title}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Companies */}
      <div className="card" style={{ borderRadius: '12px' }}>
        <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0" style={{ fontWeight: 500 }}>شرکت‌های اخیر</h5>
          <button className="btn btn-sm text-white" style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}>
            مشاهده همه
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th className="py-3 px-4">نام شرکت</th>
                <th className="py-3 px-4">پلن</th>
                <th className="py-3 px-4">وضعیت</th>
                <th className="py-3 px-4">تاریخ ثبت</th>
                <th className="py-3 px-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {recentCompanies.map((company, i) => (
                <tr key={i}>
                  <td className="py-3 px-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: 36, height: 36, backgroundColor: '#1A237E', fontSize: '0.85rem' }}>
                        {company.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{company.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E' }}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge rounded-pill" style={{
                      backgroundColor: company.status === 'active' ? 'rgba(0,200,83,0.1)' : 'rgba(255,109,0,0.1)',
                      color: company.status === 'active' ? '#00C853' : '#FF6D00'
                    }}>
                      {company.status === 'active' ? 'فعال' : 'آزمایشی'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted">{company.date}</td>
                  <td className="py-3 px-4">
                    <button className="btn btn-sm btn-light" style={{ borderRadius: '6px' }}>مشاهده</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};