import React from 'react';
import { RiCheckLine, RiCloseLine, RiToggleLine } from 'react-icons/ri';

const modules = [
  { code: 'CORE', name: 'هسته مرکزی', price: 'رایگان', active: true, required: true },
  { code: 'ACCOUNTING', name: 'حسابداری', price: '۲,۰۰۰,۰۰۰', active: true, required: false },
  { code: 'TREASURY', name: 'خزانه داری', price: '۱,۰۰۰,۰۰۰', active: true, required: false },
  { code: 'INVENTORY', name: 'انبارداری', price: '۱,۵۰۰,۰۰۰', active: true, required: false },
  { code: 'SALES', name: 'فروش', price: '۲,۰۰۰,۰۰۰', active: true, required: false },
  { code: 'CRM', name: 'مدیریت ارتباط با مشتریان', price: '۱,۰۰۰,۰۰۰', active: false, required: false },
  { code: 'HRM', name: 'منابع انسانی و حقوق', price: '۲,۵۰۰,۰۰۰', active: false, required: false },
  { code: 'FIXED_ASSETS', name: 'دارایی ثابت', price: '۱,۰۰۰,۰۰۰', active: false, required: false },
  { code: 'CONTRACT', name: 'مدیریت قراردادها', price: '۱,۵۰۰,۰۰۰', active: false, required: false },
  { code: 'BI', name: 'هوش تجاری', price: '۲,۰۰۰,۰۰۰', active: false, required: false },
  { code: 'ECOMMERCE', name: 'فروشگاه اینترنتی', price: '۳,۰۰۰,۰۰۰', active: false, required: false },
  { code: 'HELPDESK', name: 'پشتیبانی هوشمند', price: 'رایگان', active: true, required: true },
  { code: 'WORKFLOW', name: 'گردش کار', price: '۲,۰۰۰,۰۰۰', active: false, required: false },
];

export const ModulesPage: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>مدیریت ماژول ها</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            {modules.length} ماژول - {modules.filter(m => m.active).length} فعال
          </p>
        </div>
      </div>

      <div className="row g-3">
        {modules.map((mod, i) => (
          <div className="col-12 col-md-6 col-lg-4" key={i}>
            <div className="card p-4 h-100" style={{ borderRadius: '12px', opacity: mod.required ? 1 : 0.9 }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 40, height: 40,
                      backgroundColor: mod.active ? 'rgba(0,200,83,0.1)' : 'rgba(0,0,0,0.05)',
                      color: mod.active ? '#00C853' : '#999'
                    }}
                  >
                    {mod.active ? <RiCheckLine size={20} /> : <RiCloseLine size={20} />}
                  </div>
                  <div>
                    <h6 className="mb-0" style={{ fontWeight: 500 }}>{mod.name}</h6>
                    <small className="text-muted">{mod.code}</small>
                  </div>
                </div>
                {mod.required && (
                  <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E', fontWeight: 400 }}>
                    اجباری
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">قیمت ماهانه</small>
                  <small style={{ fontWeight: 500 }}>{mod.price} تومان</small>
                </div>
              </div>

              <div className="mt-auto">
                {mod.required ? (
                  <button className="btn btn-light w-100" disabled style={{ borderRadius: '8px', fontSize: '0.85rem' }}>
                    ماژول اجباری
                  </button>
                ) : (
                  <button
                    className={`btn w-100 ${mod.active ? 'btn-light' : ''}`}
                    style={{
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      background: mod.active ? '' : 'linear-gradient(135deg, #1A237E, #283593)',
                      color: mod.active ? '#333' : 'white',
                    }}
                  >
                    {mod.active ? 'غیرفعال سازی' : 'فعال سازی'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
