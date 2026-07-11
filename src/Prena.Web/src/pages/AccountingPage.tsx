import React, { useState } from 'react';
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from 'react-icons/ri';
import api from '../services/api';

export const AccountingPage: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState<any[]>([
    { accountId: '', debit: 0, credit: 0, description: '' },
    { accountId: '', debit: 0, credit: 0, description: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addLine = () => setLines([...lines, { accountId: '', debit: 0, credit: 0, description: '' }]);
  const removeLine = (i: number) => lines.length > 2 && setLines(lines.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: string, value: any) => {
    const updated = [...lines];
    updated[i] = { ...updated[i], [field]: value };
    setLines(updated);
  };

  const totalDebit = lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleSave = async () => {
    if (!isBalanced) { setMessage('سند توازن ندارد!'); return; }
    setLoading(true); setMessage('');
    try {
      await api.post('/voucher', { voucherDate: date, description, lines });
      setMessage('✅ سند با موفقیت ثبت شد!');
      setDescription(''); setLines([{ accountId: '', debit: 0, credit: 0, description: '' }, { accountId: '', debit: 0, credit: 0, description: '' }]);
    } catch (e: any) { setMessage('❌ ' + (e.response?.data?.message || 'خطا')); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>📄 ثبت سند حسابداری</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>ایجاد سند جدید</p>

      <div className="card p-4" style={{ borderRadius: '12px' }}>
        <div className="row g-3 mb-3">
          <div className="col-md-4"><label className="form-label">تاریخ</label><input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} style={{ borderRadius: '8px' }} /></div>
          <div className="col-md-8"><label className="form-label">شرح</label><input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="شرح سند..." style={{ borderRadius: '8px' }} /></div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>حساب</th><th>بدهکار</th><th>بستانکار</th><th>شرح</th><th></th></tr></thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td><input className="form-control form-control-sm" placeholder="کد حساب" value={line.accountId} onChange={e => updateLine(i, 'accountId', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={line.debit} onChange={e => updateLine(i, 'debit', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={line.credit} onChange={e => updateLine(i, 'credit', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input className="form-control form-control-sm" value={line.description} onChange={e => updateLine(i, 'description', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><button className="btn btn-sm btn-light text-danger" onClick={() => removeLine(i)}><RiDeleteBinLine /></button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600, backgroundColor: '#fafafa' }}>
                <td>جمع</td>
                <td style={{ color: '#1A237E' }}>{totalDebit.toLocaleString()}</td>
                <td style={{ color: '#00C853' }}>{totalCredit.toLocaleString()}</td>
                <td colSpan={2} style={{ color: isBalanced ? '#00C853' : '#FF1744' }}>{isBalanced ? '✅ متوازن' : `❌ اختلاف: ${Math.abs(totalDebit - totalCredit).toLocaleString()}`}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light" onClick={addLine}><RiAddLine /> افزودن سطر</button>
          <button className="btn text-white" onClick={handleSave} disabled={loading || !isBalanced} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}><RiSaveLine /> {loading ? 'در حال ثبت...' : 'ثبت سند'}</button>
        </div>
        {message && <div className={`alert mt-3 ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} style={{ borderRadius: '8px' }}>{message}</div>}
      </div>
    </div>
  );
};
