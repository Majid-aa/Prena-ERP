import React, { useState, useEffect } from 'react';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { roleService } from '../services/roleService';

export const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadRoles(); }, []);

  const loadRoles = async () => {
    setLoading(true); setError('');
    try { const data = await roleService.getRoles(); setRoles(data); }
    catch (e: any) { setError('خطا در دریافت نقش ها از سرور'); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال بارگذاری...</p></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>🛡️ نقش ها و دسترسی ها</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{roles.length} نقش تعریف شده</p>
        </div>
        <button className="btn text-white d-flex align-items-center gap-2" style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 20px' }}>
          <RiShieldKeyholeLine /> ایجاد نقش جدید
        </button>
      </div>

      {error && <div className="alert alert-warning text-center" style={{ borderRadius: '12px' }}>{error} <button className="btn btn-sm btn-outline-warning ms-3" onClick={loadRoles}>تلاش مجدد</button></div>}

      {!error && roles.length === 0 && <div className="card p-5 text-center" style={{ borderRadius: '12px' }}><div style={{ fontSize: '3rem' }}>🛡️</div><h5>نقشی یافت نشد</h5></div>}

      {!error && roles.length > 0 && (
        <div className="row g-3">
          {roles.map((role: any, i: number) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div className="card p-4 h-100" style={{ borderRadius: '12px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 style={{ fontWeight: 500 }}>{role.name}</h5>
                    <small className="text-muted">{role.key}</small>
                  </div>
                  <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E', fontWeight: 400 }}>
                    {role.scope}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">کاربران</small>
                    <small style={{ fontWeight: 500 }}>{role.users} نفر</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">دسترسی ها</small>
                    <small style={{ fontWeight: 500 }}>{role.permissions}</small>
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="btn btn-light w-100" style={{ borderRadius: '8px', fontSize: '0.85rem' }}>مشاهده و ویرایش</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
