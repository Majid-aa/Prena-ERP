import React, { useState } from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';

export const SalesPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([{ product: '', quantity: 1, price: 0 }]);
  const [customer, setCustomer] = useState('');
  const [message, setMessage] = useState('');

  const addItem = () => setItems([...items, { product: '', quantity: 1, price: 0 }]);
  const removeItem = (i: number) => items.length > 1 && setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: string, value: any) => { const u = [...items]; u[i] = { ...u[i], [field]: value }; setItems(u); };

  const total = items.reduce((s, i) => s + (i.quantity * i.price), 0);

  const handleSubmit = () => {
    if (!customer || items.some(i => !i.product)) { setMessage('❌ فیلدها را پر کنید.'); return; }
    setMessage(`✅ فاکتور فروش به مبلغ ${total.toLocaleString()} ریال ثبت شد.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>🛒 صدور فاکتور فروش</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>ثبت فروش جدید</p>
      <div className="card p-4" style={{ borderRadius: '12px' }}>
        <div className="mb-3"><label className="form-label">مشتری</label><input type="text" className="form-control" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="نام مشتری" style={{ borderRadius: '8px' }} /></div>
        <div className="table-responsive mb-3">
          <table className="table"><thead><tr><th>محصول</th><th>تعداد</th><th>قیمت واحد</th><th>جمع</th><th></th></tr></thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td><input className="form-control form-control-sm" value={item.product} onChange={e => updateItem(i, 'product', e.target.value)} placeholder="نام محصول" style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} style={{ borderRadius: '6px', width: '80px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={item.price} onChange={e => updateItem(i, 'price', e.target.value)} style={{ borderRadius: '6px', width: '120px' }} /></td>
                  <td style={{ fontWeight: 500 }}>{(item.quantity * item.price).toLocaleString()}</td>
                  <td><button className="btn btn-sm btn-light text-danger" onClick={() => removeItem(i)}><RiDeleteBinLine /></button></td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr style={{ fontWeight: 700, backgroundColor: '#f5f5f5' }}><td colSpan={3}>جمع کل</td><td colSpan={2} style={{ color: '#1A237E', fontSize: '1.2rem' }}>{total.toLocaleString()} ریال</td></tr></tfoot>
          </table>
        </div>
        <div className="d-flex gap-2 mb-3"><button className="btn btn-light" onClick={addItem}><RiAddLine /> افزودن کالا</button><button className="btn text-white" onClick={handleSubmit} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 24px' }}>ثبت فاکتور</button></div>
        {message && <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} style={{ borderRadius: '8px' }}>{message}</div>}
      </div>
    </div>
  );
};