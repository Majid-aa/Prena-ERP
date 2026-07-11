import React, { useState } from 'react';
import { RiAddLine, RiSendPlaneLine } from 'react-icons/ri';

export const TreasuryPage: React.FC = () => {
  const [tab, setTab] = useState<'receipt' | 'payment'>('receipt');
  const [form, setForm] = useState({ amount: '', description: '', account: '', date: new Date().toISOString().split('T')[0] });
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!form.amount || !form.description) { setMessage('❌ لطفا همه فیلدها را پر کنید.'); return; }
    setMessage(`✅ ${tab === 'receipt' ? 'دریافت' : 'پرداخت'} با موفقیت ثبت شد.`);
    setForm({ amount: '', description: '', account: '', date: new Date().toISOString().split('T')[0] });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500 }}>💰 {tab === 'receipt' ? 'دریافت وجه' : 'پرداخت وجه'}</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>مدیریت جریان های نقدی</p>

      <div className="d-flex gap-2 mb-4">
        <button className={`btn ${tab === 'receipt' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setTab('receipt')}>📥 دریافت</button>
        <button className={`btn ${tab === 'payment' ? 'btn-prena text-white' : 'btn-light'}`} onClick={() => setTab('payment')}>📤 پرداخت</button>
      </div>

      <div className="card p-4" style={{ borderRadius: '12px' }}>
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">تاریخ</label><input type="date" className="form-control" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{ borderRadius: '8px' }} /></div>
          <div className="col-md-6"><label className="form-label">مبلغ (ریال)</label><input type="number" className="form-control" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="مبلغ را وارد کنید" style={{ borderRadius: '8px' }} /></div>
          <div className="col-md-6"><label className="form-label">حساب</label><select className="form-select" value={form.account} onChange={e => setForm({...form, account: e.target.value})} style={{ borderRadius: '8px' }}><option value="">انتخاب کنید...</option><option value="bank">بانک تجارت</option><option value="cash">صندوق</option></select></div>
          <div className="col-md-6"><label className="form-label">شرح</label><input type="text" className="form-control" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="شرح عملیات" style={{ borderRadius: '8px' }} /></div>
        </div>
        <button className="btn text-white mt-4" onClick={handleSubmit} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '12px 24px' }}>{tab === 'receipt' ? 'ثبت دریافت' : 'ثبت پرداخت'}</button>
        {message && <div className={`alert mt-3 ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} style={{ borderRadius: '8px' }}>{message}</div>}
      </div>
    </div>
  );
};