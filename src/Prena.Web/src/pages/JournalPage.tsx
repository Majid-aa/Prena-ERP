import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { RiFileTextLine } from 'react-icons/ri';

export const JournalPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadVouchers(); }, []);

  const loadVouchers = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.get('/voucher');
      const data = res.data?.data || res.data || [];
      setVouchers(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError('خطا در دریافت اسناد');
    } finally { setLoading(false); }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
    } catch { return dateStr; }
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال بارگذاری...</p></div>;

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>📒 دفتر روزنامه</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{vouchers.length} سند ثبت شده</p>
      </div>

      {error && <div className="alert alert-warning text-center" style={{ borderRadius: '12px' }}>{error} <button className="btn btn-sm btn-outline-warning ms-3" onClick={loadVouchers}>تلاش مجدد</button></div>}

      {!error && vouchers.length === 0 && (
        <div className="card p-5 text-center" style={{ borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem' }}>📒</div>
          <h5 style={{ fontWeight: 500 }}>سندی ثبت نشده است</h5>
          <p className="text-muted">از منوی حسابداری سند جدید ثبت کنید.</p>
        </div>
      )}

      {!error && vouchers.length > 0 && (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#fafafa' }}>
                <tr>
                  <th className="py-3 px-4">شماره سند</th>
                  <th className="py-3 px-4">تاریخ</th>
                  <th className="py-3 px-4">شرح</th>
                  <th className="py-3 px-4">وضعیت</th>
                  <th className="py-3 px-4">سطرها</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v: any) => (
                  <tr key={v.id}>
                    <td className="py-3 px-4"><span style={{ fontWeight: 500, color: '#1A237E' }}>{v.voucherNumber}</span></td>
                    <td className="py-3 px-4" style={{ direction: 'ltr', textAlign: 'left' }}>{formatDate(v.voucherDate)}</td>
                    <td className="py-3 px-4">{v.description || '---'}</td>
                    <td className="py-3 px-4"><span className="badge rounded-pill" style={{ backgroundColor: 'rgba(0,200,83,0.1)', color: '#00C853' }}>{v.status}</span></td>
                    <td className="py-3 px-4">{v.lines?.length || 0} سطر</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
