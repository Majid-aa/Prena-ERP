import React from 'react';
import { RiUserAddLine, RiEdit2Line, RiDeleteBinLine, RiSearchLine } from 'react-icons/ri';

const agents = [
  { id: '1', name: 'محمد رضایی', mobile: '09121112233', level: 'senior', customers: 45, status: 'active', joinDate: '۱۴۰۲/۰۳/۱۵' },
  { id: '2', name: 'زهرا موسوی', mobile: '09123334455', level: 'junior', customers: 22, status: 'active', joinDate: '۱۴۰۳/۰۱/۲۰' },
  { id: '3', name: 'علی کریمی', mobile: '09125556677', level: 'team_lead', customers: 120, status: 'active', joinDate: '۱۴۰۱/۰۸/۰۵' },
  { id: '4', name: 'مریم حسنی', mobile: '09128889900', level: 'junior', customers: 8, status: 'inactive', joinDate: '۱۴۰۳/۰۶/۰۱' },
];

const levelNames: Record<string, string> = { junior: 'پشتیبان عادی', senior: 'پشتیبان ارشد', team_lead: 'سرپرست تیم' };

export const AgentsPage: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>👥 مدیریت پشتیبان ها</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{agents.length} پشتیبان</p>
        </div>
        <button className="btn text-white d-flex align-items-center gap-2" style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 20px' }}>
          <RiUserAddLine /> افزودن پشتیبان
        </button>
      </div>

      <div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="position-relative">
              <RiSearchLine className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input type="text" className="form-control" placeholder="جستجوی پشتیبان..." style={{ paddingRight: '40px', borderRadius: '8px' }} />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" style={{ borderRadius: '8px' }}><option>همه سطوح</option><option>پشتیبان عادی</option><option>پشتیبان ارشد</option><option>سرپرست تیم</option></select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" style={{ borderRadius: '8px' }}><option>همه</option><option>فعال</option><option>غیرفعال</option></select>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr><th className="py-3 px-4">نام</th><th className="py-3 px-4">موبایل</th><th className="py-3 px-4">سطح</th><th className="py-3 px-4">مشتریان</th><th className="py-3 px-4">وضعیت</th><th className="py-3 px-4">عملیات</th></tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent.id}>
                  <td className="py-3 px-4"><div className="d-flex align-items-center gap-2"><div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: 36, height: 36, backgroundColor: '#1A237E' }}>{agent.name.charAt(0)}</div><span style={{ fontWeight: 500 }}>{agent.name}</span></div></td>
                  <td className="py-3 px-4" style={{ direction: 'ltr', textAlign: 'left' }}>{agent.mobile}</td>
                  <td className="py-3 px-4"><span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E' }}>{levelNames[agent.level]}</span></td>
                  <td className="py-3 px-4">{agent.customers} مشتری</td>
                  <td className="py-3 px-4"><span className="badge rounded-pill" style={{ backgroundColor: agent.status === 'active' ? 'rgba(0,200,83,0.1)' : 'rgba(255,23,68,0.1)', color: agent.status === 'active' ? '#00C853' : '#FF1744' }}>{agent.status === 'active' ? 'فعال' : 'غیرفعال'}</span></td>
                  <td className="py-3 px-4"><div className="d-flex gap-2"><button className="btn btn-sm btn-light" style={{ borderRadius: '6px' }}><RiEdit2Line /></button><button className="btn btn-sm btn-light" style={{ borderRadius: '6px', color: '#FF1744' }}><RiDeleteBinLine /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
