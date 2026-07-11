import React, { useState, useEffect } from 'react';
import { roleService } from '../services/roleService';

export const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadRoles(); }, []);

  const loadRoles = async () => {
    setLoading(true);
    try { const data = await roleService.getRoles(); setRoles(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>نقش ها</h4>
      <p className="text-muted">{roles.length} نقش</p>
      <div className="row g-3">
        {roles.map((r: any, i: number) => (
          <div className="col-12 col-md-6 col-lg-4" key={i}>
            <div className="card p-4" style={{ borderRadius: '12px' }}>
              <h5>{r.name}</h5>
              <small className="text-muted">{r.key}</small>
              <div className="mt-2">
                <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E' }}>{r.scope}</span>
              </div>
              <p className="mt-2 mb-0"><small>{r.users} کاربر - {r.permissions}</small></p>
            </div>
          </div>
        ))}
        {roles.length === 0 && <div className="col-12 text-center py-5 text-muted">نقشی یافت نشد</div>}
      </div>
    </div>
  );
};
