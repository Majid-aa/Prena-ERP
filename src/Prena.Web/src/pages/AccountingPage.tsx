import React, { useState, useEffect } from 'react';
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from 'react-icons/ri';
import { DatePicker, getToday } from '../components/common/DatePicker';
import { accountService } from '../services/accountService';
import api from '../services/api';

export const AccountingPage: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [header, setHeader] = useState({ date: getToday(), description: '', type: 'simple' });
  const [lines, setLines] = useState<any[]>([{ accountId: '', accountName: '', debit: '', credit: '', description: '' }, { accountId: '', accountName: '', debit: '', credit: '', description: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'danger'>('success');

  useEffect(() => { accountService.getAccounts().then(setAccounts).catch(console.error); }, []);

  const addLine = () => setLines([...lines, { accountId: '', accountName: '', debit: '', credit: '', description: '' }]);
  const removeLine = (i: number) => lines.length > 2 && setLines(lines.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: string, value: string) => {
    const updated = [...lines];
    updated[i] = { ...updated[i], [field]: value };
    if (field === 'accountId') {
      const acc = accounts.find(a => a.id === value);
      updated[i].accountName = acc ? acc.code + ' - ' + acc.name : '';
    }
    if (field === 'debit' && value) updated[i].credit = '';
    if (field === 'credit' && value) updated[i].debit = '';
    setLines(updated);
  };

  const totalDebit = lines.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleSave = async () => {
    if (!isBalanced) { setMessage('سند توازن ندارد'); setMsgType('danger'); return; }
    if (!header.description) { setMessage('شرح سند الزامی است'); setMsgType('danger'); return; }
    setLoading(true);
    try {
      const res = await api.post('/voucher', {
        voucherDate: new Date().toISOString().split('T')[0],
        description: header.description,
        type: header.type,
        lines: lines.filter(l => l.accountId && (l.debit || l.credit)).map(l => ({
          accountId: l.accountId, debit: parseFloat(l.debit) || 0, credit: parseFloat(l.credit) || 0, description: l.description || ''
        }))
      });
      setMessage('سند با موفقیت ثبت شد. شماره: ' + res.data.data.voucherNumber);
      setMsgType('success');
      setHeader({ date: getToday(), description: '', type: 'simple' });
      setLines([{ accountId: '', accountName: '', debit: '', credit: '', description: '' }, { accountId: '', accountName: '', debit: '', credit: '', description: '' }]);
    } catch (e: any) { setMessage('خطا: ' + (e.response?.data?.message || 'نامشخص')); setMsgType('danger'); }
    finally { setLoading(false); }
  };

  const voucherTypes = [
    { value: 'simple', label: 'سند ساده' },
    { value: 'compound', label: 'سند مرکب' },
    { value: 'opening', label: 'سند افتتاحیه' },
    { value: 'closing', label: 'سند اختتامیه' },
    { value: 'adjustment', label: 'سند اصلاحی' },
  ];

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>ثبت سند حسابداری</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>ایجاد سند جدید</p>

      <div className="card p-4" style={{ borderRadius: '12px' }}>
        <div className="border rounded-3 p-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
          <h6 style={{ fontWeight: 600, color: '#1A237E' }}>اطلاعات سند</h6>
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>نوع سند</label>
              <select className="form-select form-select-sm" value={header.type} onChange={e => setHeader({...header, type: e.target.value})} style={{ borderRadius: '8px' }}>
                {voucherTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>تاریخ</label>
              <DatePicker value={header.date} onChange={(v: string) => setHeader({...header, date: v})} className="form-control form-control-sm" />
            </div>
            <div className="col-md-7">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>شرح سند</label>
              <input type="text" className="form-control form-control-sm" value={header.description} onChange={e => setHeader({...header, description: e.target.value})} placeholder="شرح سند را وارد کنید" style={{ borderRadius: '8px' }} />
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: 600, color: '#1A237E' }}>سطرهای سند</h6>
        <div className="table-responsive mb-3">
          <table className="table table-sm">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr><th>حساب</th><th style={{ width: '130px' }}>بدهکار (ریال)</th><th style={{ width: '130px' }}>بستانکار (ریال)</th><th>شرح</th><th style={{ width: '40px' }}></th></tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td>
                    <select className="form-select form-select-sm" value={line.accountId} onChange={e => updateLine(i, 'accountId', e.target.value)} style={{ borderRadius: '6px' }}>
                      <option value="">انتخاب حساب...</option>
                      {accounts.map((a: any) => <option key={a.id} value={a.id}>{a.code} - {a.name}</option>)}
                    </select>
                  </td>
                  <td><input type="number" className="form-control form-control-sm" value={line.debit} onChange={e => updateLine(i, 'debit', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={line.credit} onChange={e => updateLine(i, 'credit', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input className="form-control form-control-sm" value={line.description} onChange={e => updateLine(i, 'description', e.target.value)} placeholder="شرح سطر" style={{ borderRadius: '6px' }} /></td>
                  <td><button className="btn btn-sm btn-light text-danger" onClick={() => removeLine(i)}><RiDeleteBinLine size={14} /></button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 700, backgroundColor: '#f5f5f5' }}>
                <td>جمع</td>
                <td style={{ color: '#1A237E' }}>{totalDebit.toLocaleString()}</td>
                <td style={{ color: '#00C853' }}>{totalCredit.toLocaleString()}</td>
                <td colSpan={2}>{isBalanced ? <span style={{ color: '#00C853' }}>✅ متوازن</span> : <span style={{ color: '#FF1744' }}>❌ اختلاف: {Math.abs(totalDebit - totalCredit).toLocaleString()}</span>}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-light btn-sm" onClick={addLine}><RiAddLine /> افزودن سطر</button>
          <button className="btn btn-sm text-white" onClick={handleSave} disabled={loading || !isBalanced} style={{ background: isBalanced ? 'linear-gradient(135deg, #1A237E, #283593)' : '#ccc', borderRadius: '8px', padding: '8px 20px' }}>
            <RiSaveLine /> {loading ? 'در حال ثبت...' : 'ثبت سند'}
          </button>
        </div>
        {message && <div className={`alert alert-${msgType} py-2 px-3`} style={{ borderRadius: '8px', fontSize: '0.9rem' }}>{message}</div>}
      </div>
    </div>
  );
};