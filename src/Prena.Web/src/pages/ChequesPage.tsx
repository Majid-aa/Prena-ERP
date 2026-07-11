import React, { useState } from 'react';
import { RiAddLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

const mockCheques = [
  { id: '1', number: '۱۲۳۴۵۶', bank: 'تجارت', amount: 50000000, dueDate: '۱۴۰۳/۰۴/۱۵', type: 'دریافتی', status: 'pending' },
  { id: '2', number: '۷۸۹۰۱۲', bank: 'ملت', amount: 25000000, dueDate: '۱۴۰۳/۰۵/۲۰', type: 'پرداختی', status: 'pending' },
  { id: '3', number: '۳۴۵۶۷۸', bank: 'صادرات', amount: 100000000, dueDate: '۱۴۰۳/۰۳/۱۰', type: 'دریافتی', status: 'collected' },
];

const statusNames: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'در انتظار', color: '#FF6D00', bg: 'rgba(255,109,0,0.1)' },
  collected: { label: 'وصول شده', color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
  bounced: { label: 'برگشتی', color: '#FF1744', bg: 'rgba(255,23,68,0.1)' },
};

export const ChequesPage: React.FC = () => {
  const [cheques] = useState(mockCheques);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>💳 مدیریت چک</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{cheques.length} چک ثبت شده</p>
        </div>
        <button className="btn text-white d-flex align-items-center gap-2" style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 20px' }}>
          <RiAddLine /> ثبت چک جدید
        </button>
      </div>

      <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th className="py-3 px-4">شماره چک</th>
                <th className="py-3 px-4">بانک</th>
                <th className="py-3 px-4">مبلغ (ریال)</th>
                <th className="py-3 px-4">تاریخ سررسید</th>
                <th className="py-3 px-4">نوع</th>
                <th className="py-3 px-4">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {cheques.map(ch => {
                const status = statusNames[ch.status];
                return (
                  <tr key={ch.id}>
                    <td className="py-3 px-4"><span style={{ fontWeight: 500, color: '#1A237E' }}>{ch.number}</span></td>
                    <td className="py-3 px-4">{ch.bank}</td>
                    <td className="py-3 px-4">{ch.amount.toLocaleString()}</td>
                    <td className="py-3 px-4" style={{ direction: 'ltr', textAlign: 'left' }}>{ch.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className="badge rounded-pill" style={{ backgroundColor: ch.type === 'دریافتی' ? 'rgba(0,200,83,0.1)' : 'rgba(255,23,68,0.1)', color: ch.type === 'دریافتی' ? '#00C853' : '#FF1744' }}>
                        {ch.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge rounded-pill" style={{ backgroundColor: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};