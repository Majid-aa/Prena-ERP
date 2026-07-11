import React, { useState, useEffect } from 'react';
import { RiBuilding2Line } from 'react-icons/ri';
import { companyService } from '../../services/companyService';

const planNames: Record<string, string> = { Free: 'رایگان', Basic: 'پایه', Pro: 'حرفه ای', Enterprise: 'سازمانی' };

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    companyService.getCompanies()
      .then(setCompanies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>شرکت ها</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{companies.length} شرکت</p>
        </div>
      </div>

      <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th className="py-3 px-4">شرکت</th>
                <th className="py-3 px-4">پلن</th>
                <th className="py-3 px-4">کاربران</th>
                <th className="py-3 px-4">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c: any, i: number) => (
                <tr key={c.id || i}>
                  <td className="py-3 px-4">
                    <div className="d-flex align-items-center gap-2">
                      <RiBuilding2Line size={20} color="#1A237E" />
                      <span style={{ fontWeight: 500 }}>{c.name}</span>
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
                </tr>
              ))}
              {companies.length === 0 && <tr><td colSpan={4} className="text-center py-5 text-muted">شرکتی یافت نشد</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
