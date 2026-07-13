import React, { useState, useEffect } from 'react';
import { DatePicker, getToday } from '../components/common/DatePicker';
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from 'react-icons/ri';
import { productService } from '../services/productService';
import api from '../services/api';

export const IssuePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [header, setHeader] = useState({ date: getToday(), description: '', department: '' });
  const [lines, setLines] = useState<any[]>([{ productId: '', productName: '', quantity: '', total: 0 }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger'>('success');

  useEffect(() => { productService.getProducts().then(setProducts).catch(console.error); }, []);

  const addLine = () => setLines([...lines, { productId: '', productName: '', quantity: '', total: 0 }]);
  const removeLine = (i: number) => lines.length > 1 && setLines(lines.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: string, value: any) => {
    const updated = [...lines];
    updated[i] = { ...updated[i], [field]: value };
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      updated[i].productName = product?.name || '';
    }
    setLines(updated);
  };

  const totalQuantity = lines.reduce((s, l) => s + (parseFloat(l.quantity) || 0), 0);

  const handleSave = async () => {
    if (!header.description || !header.department || lines.some(l => !l.productId || !l.quantity)) {
      setMessage('❌ لطفا همه فیلدهای هدر و سطرها را پر کنید.');
      setMessageType('danger');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/inventory/issue', {
        date: header.date,
        description: header.description,
        department: header.department,
        lines: lines.map(l => ({ productId: l.productId, quantity: parseFloat(l.quantity) }))
      });
      setMessage(`✅ ${res.data.message}`);
      setMessageType('success');
      setHeader({ date: getToday(), description: '', department: '' });
      setLines([{ productId: '', productName: '', quantity: '', total: 0 }]);
    } catch (e: any) {
      setMessage('❌ خطا در ثبت حواله انبار');
      setMessageType('danger');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>📤 ثبت حواله انبار</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>خروج کالا از انبار</p>

      <div className="card p-4" style={{ borderRadius: '12px' }}>
        {/* ========== HEADER ========== */}
        <div className="border rounded-3 p-3 mb-4" style={{ backgroundColor: '#fff3e0' }}>
          <h6 className="mb-3" style={{ fontWeight: 600, color: '#E65100' }}>📋 اطلاعات هدر</h6>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>تاریخ</label>
              <DatePicker value={header.date} onChange={(v: string) => setHeader({...header, date: v})} className="form-control form-control-sm" />
            </div>
            <div className="col-md-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>واحد درخواست کننده</label>
              <input type="text" className="form-control form-control-sm" value={header.department} onChange={e => setHeader({...header, department: e.target.value})} placeholder="نام واحد" style={{ borderRadius: '8px' }} />
            </div>
            <div className="col-md-6">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>شرح</label>
              <input type="text" className="form-control form-control-sm" value={header.description} onChange={e => setHeader({...header, description: e.target.value})} placeholder="شرح حواله" style={{ borderRadius: '8px' }} />
            </div>
          </div>
        </div>

        {/* ========== LINES ========== */}
        <h6 className="mb-3" style={{ fontWeight: 600, color: '#E65100' }}>📦 اقلام</h6>
        <div className="table-responsive mb-3">
          <table className="table table-sm">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th>کالا</th>
                <th style={{ width: '100px' }}>تعداد</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td>
                    <select className="form-select form-select-sm" value={line.productId} onChange={e => updateLine(i, 'productId', e.target.value)} style={{ borderRadius: '6px' }}>
                      <option value="">انتخاب کالا...</option>
                      {products.map((p: any) => <option key={p.id} value={p.id}>{p.name} ({p.code}) - موجودی: {p.quantity}</option>)}
                    </select>
                  </td>
                  <td><input type="number" className="form-control form-control-sm" value={line.quantity} onChange={e => updateLine(i, 'quantity', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><button className="btn btn-sm btn-light text-danger" onClick={() => removeLine(i)}><RiDeleteBinLine size={14} /></button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 700, backgroundColor: '#f5f5f5' }}>
                <td>جمع</td>
                <td style={{ color: '#E65100' }}>{totalQuantity}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-light btn-sm" onClick={addLine}><RiAddLine /> افزودن کالا</button>
          <button className="btn btn-sm text-white" onClick={handleSave} disabled={loading} style={{ background: loading ? '#ccc' : 'linear-gradient(135deg, #E65100, #FF9800)', borderRadius: '8px', padding: '8px 20px' }}>
            <RiSaveLine /> {loading ? 'در حال ثبت...' : 'ثبت حواله'}
          </button>
        </div>

        {message && <div className={`alert alert-${messageType} py-2 px-3`} style={{ borderRadius: '8px', fontSize: '0.9rem' }}>{message}</div>}
      </div>
    </div>
  );
};