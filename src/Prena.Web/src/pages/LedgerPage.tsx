import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { RiSearchLine } from 'react-icons/ri';

export const LedgerPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/voucher');
      const data = res.data?.data || res.data || [];
      setVouchers(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('fa-IR'); } catch { return d; }
  };

  // استخراج تمام سطرها از اسناد
  const allLines = vouchers.flatMap((v: any) =>
    (v.lines || []).map((l: any) => ({
      ...l,
      voucherNumber: v.voucherNumber,
      voucherDate: v.voucherDate,
      description: v.description
    }))
  );

  const filteredLines = allLines.filter((l: any) =>
    (l.accountId || '').includes(search) ||
    (l.description || '').includes(search) ||
    (l.voucherNumber || '').includes(search)
  );

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>📖 دفتر کل</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{filteredLines.length} ردیف</p>
      </div>

      <div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
        <div className="position-relative">
          <RiSearchLine className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input type="text" className="form-control" placeholder="جستجو در اسناد..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: '40px', borderRadius: '8px' }} />
        </div>
      </div>

      {filteredLines.length === 0 ? (
        <div className="card p-5 text-center" style={{ borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem' }}>📖</div>
          <h5>داده‌ای یافت نشد</h5>
        </div>
      ) : (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#fafafa' }}>
                <tr>
                  <th className="py-3 px-4">شماره سند</th>
                  <th className="py-3 px-4">تاریخ</th>
                  <th className="py-3 px-4">شرح</th>
                  <th className="py-3 px-4">بدهکار</th>
                  <th className="py-3 px-4">بستانکار</th>
                </tr>
              </thead>
              <tbody>
                {filteredLines.map((l: any, i: number) => (
                  <tr key={i}>
                    <td className="py-3 px-4"><span style={{ fontWeight: 500, color: '#1A237E' }}>{l.voucherNumber}</span></td>
                    <td className="py-3 px-4">{formatDate(l.voucherDate)}</td>
                    <td className="py-3 px-4">{l.description || l.description || '---'}</td>
                    <td className="py-3 px-4" style={{ color: '#1A237E' }}>{(l.debit || 0).toLocaleString()}</td>
                    <td className="py-3 px-4" style={{ color: '#00C853' }}>{(l.credit || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#f5f5f5', fontWeight: 700 }}>
                <tr>
                  <td className="py-3 px-4" colSpan={3}>جمع</td>
                  <td className="py-3 px-4" style={{ color: '#1A237E' }}>{filteredLines.reduce((s: number, l: any) => s + (l.debit || 0), 0).toLocaleString()}</td>
                  <td className="py-3 px-4" style={{ color: '#00C853' }}>{filteredLines.reduce((s: number, l: any) => s + (l.credit || 0), 0).toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};