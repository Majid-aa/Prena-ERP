import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { RiBarChart2Line } from 'react-icons/ri';

export const TrialBalancePage: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadTrialBalance(); }, []);

  const loadTrialBalance = async () => {
    setLoading(true);
    try {
      const res = await api.get('/voucher');
      const vouchers = res.data?.data || res.data || [];

      // محاسبه تراز آزمایشی از روی اسناد
      const accountMap: Record<string, any> = {};
      vouchers.forEach((v: any) => {
        v.lines?.forEach((l: any) => {
          const key = l.accountId || 'unknown';
          if (!accountMap[key]) accountMap[key] = { accountId: key, totalDebit: 0, totalCredit: 0 };
          accountMap[key].totalDebit += l.debit || 0;
          accountMap[key].totalCredit += l.credit || 0;
        });
      });

      setAccounts(Object.values(accountMap));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const totalDebit = accounts.reduce((s, a) => s + a.totalDebit, 0);
  const totalCredit = accounts.reduce((s, a) => s + a.totalCredit, 0);

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">در حال محاسبه...</p></div>;

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>📊 تراز آزمایشی</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{accounts.length} حساب</p>
      </div>

      {accounts.length === 0 ? (
        <div className="card p-5 text-center" style={{ borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem' }}>📊</div>
          <h5 style={{ fontWeight: 500 }}>داده‌ای برای نمایش وجود ندارد</h5>
          <p className="text-muted">ابتدا اسناد حسابداری را ثبت کنید.</p>
        </div>
      ) : (
        <>
          <div className="card" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: '#fafafa' }}>
                  <tr>
                    <th className="py-3 px-4">کد حساب</th>
                    <th className="py-3 px-4">گردش بدهکار</th>
                    <th className="py-3 px-4">گردش بستانکار</th>
                    <th className="py-3 px-4">مانده</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a: any, i: number) => {
                    const balance = a.totalDebit - a.totalCredit;
                    return (
                      <tr key={i}>
                        <td className="py-3 px-4"><span style={{ fontWeight: 500 }}>{a.accountId.slice(0, 8)}...</span></td>
                        <td className="py-3 px-4" style={{ color: '#1A237E' }}>{a.totalDebit.toLocaleString()}</td>
                        <td className="py-3 px-4" style={{ color: '#00C853' }}>{a.totalCredit.toLocaleString()}</td>
                        <td className="py-3 px-4" style={{ color: balance >= 0 ? '#1A237E' : '#FF1744', fontWeight: 500 }}>
                          {balance >= 0 ? `${balance.toLocaleString()} (بد)` : `${Math.abs(balance).toLocaleString()} (بس)`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot style={{ backgroundColor: '#f5f5f5', fontWeight: 700 }}>
                  <tr>
                    <td className="py-3 px-4">جمع کل</td>
                    <td className="py-3 px-4" style={{ color: '#1A237E' }}>{totalDebit.toLocaleString()}</td>
                    <td className="py-3 px-4" style={{ color: '#00C853' }}>{totalCredit.toLocaleString()}</td>
                    <td className="py-3 px-4" style={{ color: totalDebit === totalCredit ? '#00C853' : '#FF1744' }}>
                      {totalDebit === totalCredit ? '✅ متوازن' : '❌ نامتوازن'}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
