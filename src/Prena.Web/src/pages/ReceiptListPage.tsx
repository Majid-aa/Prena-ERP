import React, { useState } from 'react';
import { RiAddLine, RiEyeLine, RiSearchLine } from 'react-icons/ri';
import { Modal } from '../components/common/Modal';
import { ReceiptPage } from './ReceiptPage';

const mockReceipts = [
  { id: '1', number: 'REC-1403-001', date: '۱۴۰۳/۰۴/۱۵', supplier: 'شرکت بازرگانی آسمان', totalAmount: 12500000, itemCount: 5, description: 'خرید مواد اولیه' },
  { id: '2', number: 'REC-1403-002', date: '۱۴۰۳/۰۴/۱۰', supplier: 'صنایع تولیدی البرز', totalAmount: 8500000, itemCount: 3, description: 'قطعات یدکی' },
  { id: '3', number: 'REC-1403-003', date: '۱۴۰۳/۰۴/۰۵', supplier: 'واردات کالای تهران', totalAmount: 32000000, itemCount: 12, description: 'محصولات نهایی' },
];

export const ReceiptListPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = mockReceipts.filter(r => r.number.includes(search) || r.supplier.includes(search) || r.description.includes(search));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>📥 رسیدهای انبار</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{mockReceipts.length} رسید ثبت شده</p>
        </div>
        <button className="btn text-white d-flex align-items-center gap-2" onClick={() => setShowModal(true)} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 20px' }}>
          <RiAddLine /> رسید جدید
        </button>
      </div>

      <div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
        <div className="position-relative">
          <RiSearchLine className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input type="text" className="form-control" placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: '40px', borderRadius: '8px' }} />
        </div>
      </div>

      <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th className="py-3 px-4">شماره</th>
                <th className="py-3 px-4">تاریخ</th>
                <th className="py-3 px-4">تامین کننده</th>
                <th className="py-3 px-4">تعداد اقلام</th>
                <th className="py-3 px-4">مبلغ کل</th>
                <th className="py-3 px-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td className="py-3 px-4"><span style={{ fontWeight: 500, color: '#1A237E' }}>{r.number}</span></td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">{r.supplier}</td>
                  <td className="py-3 px-4">{r.itemCount} قلم</td>
                  <td className="py-3 px-4" style={{ fontWeight: 500 }}>{r.totalAmount.toLocaleString()} ریال</td>
                  <td className="py-3 px-4"><button className="btn btn-sm btn-light" style={{ borderRadius: '6px' }}><RiEyeLine /> مشاهده</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal برای ایجاد رسید جدید */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title="ثبت رسید انبار جدید" size="xl">
        <ReceiptPage />
      </Modal>
    </div>
  );
};