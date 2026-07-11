import React, { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

const mockProducts = [
  { id: '1', name: 'محصول A', code: 'PRD-001', quantity: 150, unit: 'عدد', price: 250000 },
  { id: '2', name: 'محصول B', code: 'PRD-002', quantity: 80, unit: 'کیلوگرم', price: 180000 },
  { id: '3', name: 'محصول C', code: 'PRD-003', quantity: 12, unit: 'عدد', price: 1200000 },
];

export const InventoryPage: React.FC = () => {
  const [tab, setTab] = useState<'in' | 'out'>('in');
  const [form, setForm] = useState({ product: '', quantity: '', description: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!form.product || !form.quantity) { setMessage('❌ فیلدها را پر کنید.'); return; }
    setMessage(`✅ ${tab === 'in' ? 'رسید' : 'حواله'} انبار ثبت شد.`);
    setForm({ product: '', quantity: '', description: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>📦 انبارداری</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>مدیریت موجودی کالاها</p>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <div className="d-flex gap-2 mb-3">
              <button className={`btn ${tab === 'in' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setTab('in')}>📥 رسید</button>
              <button className={`btn ${tab === 'out' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setTab('out')}>📤 حواله</button>
            </div>
            <select className="form-select mb-3" value={form.product} onChange={e => setForm({...form, product: e.target.value})} style={{ borderRadius: '8px' }}>
              <option value="">انتخاب کالا...</option>
              {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
            </select>
            <input type="number" className="form-control mb-3" placeholder="تعداد" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} style={{ borderRadius: '8px' }} />
            <input type="text" className="form-control mb-3" placeholder="شرح" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ borderRadius: '8px' }} />
            <button className="btn text-white" onClick={handleSubmit} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '12px' }}>
              {tab === 'in' ? 'ثبت رسید' : 'ثبت حواله'}
            </button>
            {message && <div className={`alert mt-3 ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} style={{ borderRadius: '8px', fontSize: '0.9rem' }}>{message}</div>}
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: '#fafafa' }}>
                  <tr><th className="py-3 px-4">کد</th><th className="py-3 px-4">نام</th><th className="py-3 px-4">موجودی</th><th className="py-3 px-4">واحد</th><th className="py-3 px-4">قیمت (ریال)</th></tr>
                </thead>
                <tbody>
                  {mockProducts.map(p => (
                    <tr key={p.id}>
                      <td className="py-3 px-4"><span style={{ fontWeight: 500 }}>{p.code}</span></td>
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4"><span style={{ color: p.quantity < 20 ? '#FF1744' : '#00C853', fontWeight: 500 }}>{p.quantity}</span></td>
                      <td className="py-3 px-4">{p.unit}</td>
                      <td className="py-3 px-4">{p.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};