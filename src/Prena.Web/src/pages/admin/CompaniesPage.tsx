import React, { useState, useEffect } from 'react';
import { RiBuilding2Line, RiSearchLine } from 'react-icons/ri';
import { companyService } from '../../services/companyService';

const planNames: Record<string, string> = {
  Free: 'رایگان', Basic: 'پایه', Pro: 'حرفه ای', Enterprise: 'سازمانی'
};

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadCompanies(); }, []);

  const loadCompanies = async () => {
    setLoading(true); setError('');
    try { const data = await companyService.getCompanies(); setCompanies(data); }
    catch (e: any) { setError('خطا در دریافت شرکت ها از سرور'); }
    finally { setLoading(false); }
  };

  const filteredCompanies = companies.filter((c: any) =>
    (c.name || '').includes(search) || (c.slug || '').includes(search)
  );

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال بارگذاری...</p></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>🏢 مدیریت شرکت ها</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{companies.length} شرکت ثبت شده</p>
        </div>
      </div>

      <div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
        <div className="position-relative">
          <RiSearchLine className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input type="text" className="form-control" placeholder="جستجوی شرکت..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: '40px', borderRadius: '8px' }} />
        </div>
      </div>

      {error && <div className="alert alert-warning text-center" style={{ borderRadius: '12px' }}>{error} <button className="btn btn-sm btn-outline-warning ms-3" onClick={loadCompanies}>تلاش مجدد</button></div>}

      {!error && filteredCompanies.length === 0 && <div className="card p-5 text-center" style={{ borderRadius: '12px' }}><div style={{ fontSize: '3rem' }}>🏢</div><h5>شرکتی یافت نشد</h5></div>}

      {!error && filteredCompanies.length > 0 && (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#fafafa' }}>
                <tr>
                  <th className="py-3 px-4">شرکت</th>
                  <th className="py-3 px-4">پلن</th>
                  <th className="py-3 px-4">کاربران</th>
                  <th className="py-3 px-4">وضعیت</th>
                  <th className="py-3 px-4">تاریخ ثبت</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((c: any, i: number) => (
                  <tr key={c.id || i}>
                    <td className="py-3 px-4">
                      <div className="d-flex align-items-center gap-2">
                        <RiBuilding2Line size={20} color="#1A237E" />
                        <div>
                          <div style={{ fontWeight: 500 }}>{c.name}</div>
                          <small className="text-muted">{c.slug}</small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E' }}>
                        {planNames[c.plan] || c.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4">{c.users || 0} نفر</td>
                    <td className="py-3 px-4">
                      <span className="badge rounded-pill" style={{
                        backgroundColor: c.status === 'Active' ? 'rgba(0,200,83,0.1)' : 'rgba(255,109,0,0.1)',
                        color: c.status === 'Active' ? '#00C853' : '#FF6D00'
                      }}>
                        {c.status === 'Active' ? 'فعال' : c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted">{c.createdAt || '---'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
