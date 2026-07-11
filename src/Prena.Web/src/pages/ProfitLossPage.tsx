import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';

export const ProfitLossPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/voucher');
      const vouchers = res.data?.data || res.data || [];

      let totalIncome = 0;
      let totalExpense = 0;

      vouchers.forEach((v: any) => {
        (v.lines || []).forEach((l: any) => {
          // فرض: بستانکار = درآمد، بدهکار = هزینه
          totalIncome += l.credit || 0;
          totalExpense += l.debit || 0;
        });
      });

      setIncome(totalIncome);
      setExpense(totalExpense);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const netProfit = income - expense;
  const isProfitable = netProfit >= 0;

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>💰 گزارش سود و زیان</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>خلاصه عملکرد مالی</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
            <h5 style={{ fontWeight: 500 }}>درآمدها</h5>
            <h3 style={{ color: '#00C853' }}>{income.toLocaleString()}</h3>
            <small className="text-muted">ریال</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📉</div>
            <h5 style={{ fontWeight: 500 }}>هزینه‌ها</h5>
            <h3 style={{ color: '#FF1744' }}>{expense.toLocaleString()}</h3>
            <small className="text-muted">ریال</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card p-4 text-center" style={{ borderRadius: '12px', background: isProfitable ? 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' : 'linear-gradient(135deg, #ffebee, #ffcdd2)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {isProfitable ? '🎉' : '⚠️'}
            </div>
            <h5 style={{ fontWeight: 500 }}>{isProfitable ? 'سود خالص' : 'زیان خالص'}</h5>
            <h3 style={{ color: isProfitable ? '#00C853' : '#FF1744' }}>
              {Math.abs(netProfit).toLocaleString()}
            </h3>
            <small className={isProfitable ? 'text-success' : 'text-danger'}>
              {isProfitable ? <RiArrowUpLine /> : <RiArrowDownLine />}
              {isProfitable ? ' سودده' : ' زیان‌ده'}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};