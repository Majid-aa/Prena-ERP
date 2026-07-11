import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RiUserLine, RiMailLine, RiPhoneLine, RiShieldKeyholeLine, RiSaveLine } from 'react-icons/ri';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || '', email: '', currentPassword: '', newPassword: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 style={{ fontWeight: 500 }}>پروفایل کاربری</h4>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>مدیریت اطلاعات شخصی و امنیتی</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card p-4 text-center" style={{ borderRadius: '12px' }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center text-white mx-auto mb-3" style={{ width: 96, height: 96, background: 'linear-gradient(135deg, #1A237E, #7C4DFF)', fontSize: '2.5rem' }}>
              {user?.fullName?.charAt(0) || '؟'}
            </div>
            <h5 style={{ fontWeight: 500 }}>{user?.fullName || 'کاربر'}</h5>
            <p className="text-muted" style={{ direction: 'ltr' }}>{user?.mobile}</p>
            <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E' }}>
              {user?.isSuperAdmin ? 'سوپر ادمین' : 'کاربر'}
            </span>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card p-4" style={{ borderRadius: '12px' }}>
            <h5 className="mb-4" style={{ fontWeight: 500 }}>ویرایش اطلاعات</h5>
            
            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}><RiUserLine className="ms-1" /> نام و نام خانوادگی</label>
              <input type="text" className="form-control" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} style={{ borderRadius: '8px' }} />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}><RiPhoneLine className="ms-1" /> شماره موبایل</label>
              <input type="text" className="form-control" value={user?.mobile || ''} disabled style={{ borderRadius: '8px', direction: 'ltr', textAlign: 'left' }} />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}><RiMailLine className="ms-1" /> ایمیل (اختیاری)</label>
              <input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="example@email.com" style={{ borderRadius: '8px', direction: 'ltr', textAlign: 'left' }} />
            </div>

            <hr />
            <h6 className="mb-3" style={{ fontWeight: 500 }}><RiShieldKeyholeLine className="ms-1" /> تغییر رمز عبور</h6>

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>رمز عبور فعلی</label>
              <input type="password" className="form-control" value={form.currentPassword} onChange={e => setForm({...form, currentPassword: e.target.value})} style={{ borderRadius: '8px' }} />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>رمز عبور جدید</label>
              <input type="password" className="form-control" value={form.newPassword} onChange={e => setForm({...form, newPassword: e.target.value})} style={{ borderRadius: '8px' }} />
            </div>

            <button className="btn text-white d-flex align-items-center gap-2" onClick={handleSave} style={{ background: saved ? '#00C853' : 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 24px', transition: 'all 0.3s' }}>
              {saved ? '✅ ذخیره شد!' : <><RiSaveLine /> ذخیره تغییرات</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
