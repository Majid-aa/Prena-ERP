import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowRightLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    mobile: '',
    companyName: '',
    industry: '',
    fullName: '',
    password: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const passwordChecks = {
    minLength: form.password.length >= 8,
    hasUpper: /[A-Z]/.test(form.password),
    hasLower: /[a-z]/.test(form.password),
    hasNumber: /[0-9]/.test(form.password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password),
  };
  const allPasswordChecksPassed = Object.values(passwordChecks).every(Boolean);

  const handleRegister = async () => {
    if (!form.acceptTerms) {
      setError('لطفاً قوانین و مقررات را بپذیرید');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="card p-5 shadow-lg" style={{ width: '500px', maxWidth: '92vw', borderRadius: '16px' }}>
        
        {/* Progress Steps */}
        <div className="d-flex justify-content-center mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 36, height: 36,
                  backgroundColor: step >= s ? '#1A237E' : '#e0e0e0',
                  color: step >= s ? 'white' : '#999',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                }}
              >
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div style={{ width: 40, height: 2, backgroundColor: step > s ? '#1A237E' : '#e0e0e0' }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <div className="text-center mb-4">
              <h4 style={{ fontWeight: 500 }}>🚀 ثبت‌نام در Prena</h4>
              <p className="text-muted">اطلاعات اولیه را وارد کنید</p>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>شماره موبایل</label>
              <input type="tel" className="form-control" placeholder="۰۹۱۲۳۴۵۶۷۸۹" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} style={{ borderRadius: '8px', direction: 'ltr', textAlign: 'left' }} />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>نام شرکت</label>
              <input type="text" className="form-control" placeholder="نام شرکت خود را وارد کنید" value={form.companyName} onChange={(e) => setForm({...form, companyName: e.target.value})} style={{ borderRadius: '8px' }} />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>نوع صنعت</label>
              <select className="form-select" value={form.industry} onChange={(e) => setForm({...form, industry: e.target.value})} style={{ borderRadius: '8px' }}>
                <option value="">انتخاب کنید...</option>
                <option value="retail">فروشگاهی</option>
                <option value="manufacturing">تولیدی</option>
                <option value="services">خدماتی</option>
                <option value="tech">فناوری</option>
                <option value="construction">ساختمانی</option>
              </select>
            </div>

            <button
              className="btn text-white w-100 py-2"
              onClick={() => setStep(2)}
              disabled={!form.mobile || !form.companyName || !form.industry}
              style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', opacity: (!form.mobile || !form.companyName || !form.industry) ? 0.5 : 1 }}
            >
              ادامه
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-4">
              <h4 style={{ fontWeight: 500 }}>🔐 اطلاعات حساب</h4>
              <p className="text-muted">نام کاربری و رمز عبور خود را تنظیم کنید</p>
            </div>

            {error && <div className="alert alert-danger py-2 px-3 text-center" style={{ fontSize: '0.85rem', borderRadius: '8px' }}>{error}</div>}

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>نام و نام خانوادگی</label>
              <input type="text" className="form-control" placeholder="نام کامل خود را وارد کنید" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} style={{ borderRadius: '8px' }} />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>رمز عبور</label>
              <input type="password" className="form-control" placeholder="حداقل ۸ کاراکتر" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} style={{ borderRadius: '8px', direction: 'ltr' }} />
              
              {/* Password Checklist */}
              <div className="mt-2 p-2 rounded-3" style={{ backgroundColor: '#f8f9fa', fontSize: '0.75rem' }}>
                {Object.entries({ minLength: '۸+ کاراکتر', hasUpper: 'حروف بزرگ', hasLower: 'حروف کوچک', hasNumber: 'اعداد', hasSymbol: 'علائم خاص' }).map(([key, label]) => (
                  <div key={key} className="d-flex align-items-center gap-2" style={{ color: passwordChecks[key as keyof typeof passwordChecks] ? '#00C853' : '#999' }}>
                    {passwordChecks[key as keyof typeof passwordChecks] ? <RiCheckLine size={12} /> : <RiCloseLine size={12} />}
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-check-label d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                <input type="checkbox" className="form-check-input" checked={form.acceptTerms} onChange={(e) => setForm({...form, acceptTerms: e.target.checked})} />
                <span>قوانین و مقررات Prena را می‌پذیرم</span>
              </label>
            </div>

            <button
              className="btn text-white w-100 py-2"
              onClick={handleRegister}
              disabled={loading || !allPasswordChecksPassed || !form.fullName || !form.acceptTerms}
              style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', opacity: (!allPasswordChecksPassed || !form.fullName || !form.acceptTerms) ? 0.5 : 1 }}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              تکمیل ثبت‌نام
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h4 style={{ fontWeight: 500 }}>ثبت‌نام با موفقیت انجام شد!</h4>
            <p className="text-muted mb-4">به خانواده Prena خوش آمدید. اکنون می‌توانید وارد سیستم شوید.</p>
            <button
              className="btn text-white px-5 py-2"
              onClick={() => navigate('/login')}
              style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}
            >
              ورود به سیستم
            </button>
          </div>
        )}

        <button className="btn btn-link w-100 text-muted mt-3" onClick={() => navigate('/login')}>
          <RiArrowRightLine className="ms-1" /> قبلاً ثبت‌نام کرده‌اید؟ ورود
        </button>
      </div>
    </div>
  );
};
