import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { productService } from '../services/productService';

export const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [tab, setTab] = useState<'in' | 'out'>('in');
  const [form, setForm] = useState({ productId: '', quantity: '', description: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { productService.getProducts().then(setProducts).catch(console.error); }, []);

  const handleSubmit = async () => {
    if (!form.productId || !form.quantity) { setMessage('❌ فیلدها را پر کنید.'); return; }
    setLoading(true);
    try {
      const endpoint = tab === 'in' ? '/inventory/receipt' : '/inventory/issue';
      const res = await api.post(endpoint, { productId: form.productId, quantity: parseFloat(form.quantity), description: form.description });
      setMessage(`✅ ${res.data.message}`);
      setForm({ productId: '', quantity: '', description: '' });
    } catch (e) { setMessage('❌ خطا در ثبت عملیات'); }
    finally { setLoading(false); }
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
            <select className="form-select mb-3" value={form.productId} onChange={e => setForm({...form, productId: e.target.value})} style={{ borderRadius: '8px' }}>
              <option value="">انتخاب کالا...</option>
              {products.map((p: any) => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
            </select>
            <input type="number" className="form-control mb-3" placeholder="تعداد" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} style={{ borderRadius: '8px' }} />
            <input type="text" className="form-control mb-3" placeholder="شرح" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ borderRadius: '8px' }} />
            <button className="btn text-white" onClick={handleSubmit} disabled={loading} style={{ background: loading ? '#ccc' : 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '12px' }}>
              {loading ? 'در حال ثبت...' : tab === 'in' ? 'ثبت رسید' : 'ثبت حواله'}
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
                  {products.map((p: any) => (
                    <tr key={p.id}>
                      <td className="py-3 px-4"><span style={{ fontWeight: 500 }}>{p.code}</span></td>
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4"><span style={{ color: p.quantity < 20 ? '#FF1744' : '#00C853', fontWeight: 500 }}>{p.quantity}</span></td>
                      <td className="py-3 px-4">{p.unit}</td>
                      <td className="py-3 px-4">{p.price?.toLocaleString()}</td>
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