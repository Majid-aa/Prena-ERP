import React, { useState, useEffect } from 'react';
import { RiAddLine, RiDeleteBinLine, RiSaveLine, RiSearchLine } from 'react-icons/ri';
import { productService } from '../services/productService';
import api from '../services/api';

export const ReceiptPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [header, setHeader] = useState({ date: new Date().toISOString().split('T')[0], description: '', supplier: '' });
  const [lines, setLines] = useState<any[]>([{ productId: '', productName: '', quantity: '', price: '', total: 0 }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger'>('success');

  useEffect(() => { productService.getProducts().then(setProducts).catch(console.error); }, []);

  const addLine = () => setLines([...lines, { productId: '', productName: '', quantity: '', price: '', total: 0 }]);
  const removeLine = (i: number) => lines.length > 1 && setLines(lines.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: string, value: any) => {
    const updated = [...lines];
    updated[i] = { ...updated[i], [field]: value };
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      updated[i].productName = product?.name || '';
      updated[i].price = product?.price || '';
    }
    updated[i].total = (parseFloat(updated[i].quantity) || 0) * (parseFloat(updated[i].price) || 0);
    setLines(updated);
  };

  const totalQuantity = lines.reduce((s, l) => s + (parseFloat(l.quantity) || 0), 0);
  const totalAmount = lines.reduce((s, l) => s + (l.total || 0), 0);

  const handleSave = async () => {
    if (!header.description || !header.supplier || lines.some(l => !l.productId || !l.quantity)) {
      setMessage('❌ لطفا همه فیلدهای هدر و سطرها را پر کنید.');
      setMessageType('danger');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/inventory/receipt', {
        date: header.date,
        description: header.description,
        supplier: header.supplier,
        lines: lines.map(l => ({ productId: l.productId, quantity: parseFloat(l.quantity), price: parseFloat(l.price) }))
      });
      setMessage(`✅ ${res.data.message}`);
      setMessageType('success');
      setHeader({ date: new Date().toISOString().split('T')[0], description: '', supplier: '' });
      setLines([{ productId: '', productName: '', quantity: '', price: '', total: 0 }]);
    } catch (e: any) {
      setMessage('❌ خطا در ثبت رسید انبار');
      setMessageType('danger');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>📥 ثبت رسید انبار</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>ورود کالا به انبار</p>

      <div className="card p-4" style={{ borderRadius: '12px' }}>
        {/* ========== HEADER ========== */}
        <div className="border rounded-3 p-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
          <h6 className="mb-3" style={{ fontWeight: 600, color: '#1A237E' }}>📋 اطلاعات هدر</h6>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>تاریخ</label>
              <input type="date" className="form-control form-control-sm" value={header.date} onChange={e => setHeader({...header, date: e.target.value})} style={{ borderRadius: '8px' }} />
            </div>
            <div className="col-md-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>تامین کننده</label>
              <input type="text" className="form-control form-control-sm" value={header.supplier} onChange={e => setHeader({...header, supplier: e.target.value})} placeholder="نام تامین کننده" style={{ borderRadius: '8px' }} />
            </div>
            <div className="col-md-6">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>شرح</label>
              <input type="text" className="form-control form-control-sm" value={header.description} onChange={e => setHeader({...header, description: e.target.value})} placeholder="شرح رسید" style={{ borderRadius: '8px' }} />
            </div>
          </div>
        </div>

        {/* ========== LINES ========== */}
        <h6 className="mb-3" style={{ fontWeight: 600, color: '#1A237E' }}>📦 اقلام</h6>
        <div className="table-responsive mb-3">
          <table className="table table-sm">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th>کالا</th>
                <th style={{ width: '100px' }}>تعداد</th>
                <th style={{ width: '130px' }}>قیمت واحد</th>
                <th style={{ width: '130px' }}>جمع</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td>
                    <select className="form-select form-select-sm" value={line.productId} onChange={e => updateLine(i, 'productId', e.target.value)} style={{ borderRadius: '6px' }}>
                      <option value="">انتخاب کالا...</option>
                      {products.map((p: any) => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
                    </select>
                  </td>
                  <td><input type="number" className="form-control form-control-sm" value={line.quantity} onChange={e => updateLine(i, 'quantity', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={line.price} onChange={e => updateLine(i, 'price', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td style={{ fontWeight: 500 }}>{(line.total || 0).toLocaleString()}</td>
                  <td><button className="btn btn-sm btn-light text-danger" onClick={() => removeLine(i)}><RiDeleteBinLine size={14} /></button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 700, backgroundColor: '#f5f5f5' }}>
                <td>جمع</td>
                <td>{totalQuantity}</td>
                <td></td>
                <td style={{ color: '#1A237E' }}>{totalAmount.toLocaleString()} ریال</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-light btn-sm" onClick={addLine}><RiAddLine /> افزودن کالا</button>
          <button className="btn btn-sm text-white" onClick={handleSave} disabled={loading} style={{ background: loading ? '#ccc' : 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '8px 20px' }}>
            <RiSaveLine /> {loading ? 'در حال ثبت...' : 'ثبت رسید'}
          </button>
        </div>

        {message && <div className={`alert alert-${messageType} py-2 px-3`} style={{ borderRadius: '8px', fontSize: '0.9rem' }}>{message}</div>}
      </div>
    </div>
  );
};