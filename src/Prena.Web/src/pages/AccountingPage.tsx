import { DatePicker, getToday } from '../components/common/DatePicker';
import React, { useState } from 'react';
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from 'react-icons/ri';
import api from '../services/api';

export const AccountingPage: React.FC = () => {
  // تاریخ امروز شمسی
  const getTodayJalali = () => {
    const now = new Date();
    const jalali = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
    return jalali.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  };

  const getTodayGregorian = () => getToday();

  const [date, setDate] = useState(getToday());
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState<any[]>([
    { accountId: '', debit: '', credit: '', description: '' },
    { accountId: '', debit: '', credit: '', description: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addLine = () => setLines([...lines, { accountId: '', debit: '', credit: '', description: '' }]);
  const removeLine = (i: number) => lines.length > 2 && setLines(lines.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: string, value: string) => {
    const updated = [...lines];
    updated[i] = { ...updated[i], [field]: value };
    setLines(updated);
  };

  const totalDebit = lines.reduce((sum, l) => sum + (parseFloat(l.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (parseFloat(l.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  // تبدیل تاریخ شمسی به میلادی برای API
  const convertJalaliToGregorian = (jalaliDate: string): string => {
    try {
      const parts = jalaliDate.split('/');
      if (parts.length !== 3) return getTodayGregorian();

      const [year, month, day] = parts.map(Number);
      const date = new Date(Date.UTC(year + 621, month - 1, day));
      return date.toISOString().split('T')[0];
    } catch {
      return getTodayGregorian();
    }
  };

  const handleSave = async () => {
    if (!isBalanced) { setMessage('❌ سند توازن ندارد!'); return; }
    if (!description.trim()) { setMessage('❌ شرح سند الزامی است.'); return; }

    setLoading(true); setMessage('');
    try {
      const gregorianDate = convertJalaliToGregorian(date);

      const payload = {
        voucherDate: gregorianDate,
        description: description,
        lines: lines.filter(l => l.debit || l.credit).map(l => ({
          accountId: '00000000-0000-0000-0000-000000000001',
          debit: parseFloat(l.debit) || 0,
          credit: parseFloat(l.credit) || 0,
          description: l.description || ''
        }))
      };

      const res = await api.post('/voucher', payload);
      setMessage(`✅ سند با موفقیت ثبت شد! شماره: ${res.data.data.voucherNumber}`);
      setDescription('');
      setLines([
        { accountId: '', debit: '', credit: '', description: '' },
        { accountId: '', debit: '', credit: '', description: '' },
      ]);
    } catch (e: any) {
      setMessage('❌ ' + (e.response?.data?.message || 'خطا در ثبت سند'));
    } finally { setLoading(false); }
  };

  const formatDateDisplay = (value: string) => {
    // نمایش تاریخ به فرمت YYYY/MM/DD
    const digits = value.replace(/[^0-9]/g, '').slice(0, 8);
    if (digits.length >= 5) return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6, 8)}`;
    if (digits.length >= 3) return `${digits.slice(0, 4)}/${digits.slice(4, 6)}`;
    return digits;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
    const formatted = formatDateDisplay(raw);
    setDate(formatted);
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>📄 ثبت سند حسابداری</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>ایجاد سند جدید</p>

      <div className="card p-4" style={{ borderRadius: '12px' }}>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">تاریخ سند</label>
            <input
              type="text"
              className="form-control"
              value={date}
              onChange={handleDateChange}
              placeholder="۱۴۰۳/۰۱/۱۵"
              maxLength={10}
              style={{ borderRadius: '8px', direction: 'ltr', textAlign: 'left', fontSize: '1rem' }}
            />
            <small className="text-muted">فرمت: YYYY/MM/DD (مثال: ۱۴۰۳/۰۱/۱۵)</small>
          </div>
          <div className="col-md-8">
            <label className="form-label">شرح سند</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="شرح سند را وارد کنید..."
              style={{ borderRadius: '8px' }}
            />
          </div>
        </div>

        <div className="table-responsive mb-3">
          <table className="table">
            <thead>
              <tr style={{ fontSize: '0.85rem' }}>
                <th>حساب</th>
                <th>بدهکار (ریال)</th>
                <th>بستانکار (ریال)</th>
                <th>شرح</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td><input className="form-control form-control-sm" placeholder="کد حساب" value={line.accountId} onChange={e => updateLine(i, 'accountId', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={line.debit} onChange={e => updateLine(i, 'debit', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input type="number" className="form-control form-control-sm" value={line.credit} onChange={e => updateLine(i, 'credit', e.target.value)} style={{ borderRadius: '6px' }} /></td>
                  <td><input className="form-control form-control-sm" value={line.description} onChange={e => updateLine(i, 'description', e.target.value)} placeholder="اختیاری" style={{ borderRadius: '6px' }} /></td>
                  <td><button className="btn btn-sm btn-light text-danger" onClick={() => removeLine(i)}><RiDeleteBinLine /></button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>
                <td>جمع</td>
                <td style={{ color: '#1A237E' }}>{totalDebit.toLocaleString()}</td>
                <td style={{ color: '#00C853' }}>{totalCredit.toLocaleString()}</td>
                <td colSpan={2}>
                  {totalDebit === 0 && totalCredit === 0 ? (
                    <span className="text-muted">مقادیر را وارد کنید</span>
                  ) : isBalanced ? (
                    <span style={{ color: '#00C853' }}>✅ متوازن</span>
                  ) : (
                    <span style={{ color: '#FF1744' }}>❌ اختلاف: {Math.abs(totalDebit - totalCredit).toLocaleString()}</span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-light" onClick={addLine}><RiAddLine /> افزودن سطر</button>
          <button className="btn text-white" onClick={handleSave} disabled={loading || !isBalanced} style={{ background: isBalanced ? 'linear-gradient(135deg, #1A237E, #283593)' : '#ccc', borderRadius: '8px', padding: '10px 24px' }}>
            <RiSaveLine /> {loading ? 'در حال ثبت...' : 'ثبت سند'}
          </button>
        </div>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} py-2 px-3`} style={{ borderRadius: '8px', fontSize: '0.9rem' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
