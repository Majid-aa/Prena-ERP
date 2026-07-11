import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { RiEyeLine, RiEyeOffLine, RiShieldCheckLine } from 'react-icons/ri';

export const LoginPage: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, companies } = useAuth();
  const navigate = useNavigate();

  const handleRequestOtp = async () => {
    if (mobile.length < 10) { setError('شماره موبایل معتبر وارد کنید'); return; }
    setLoading(true); setError('');
    try { await authService.requestOtp(mobile); setStep('otp'); }
    catch (e: any) { setError(e.response?.data?.message || 'خطا در ارسال کد'); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    if (code.length < 6) return;
    setLoading(true); setError('');
    try {
      await login(mobile, code);
      const updatedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
      if (updatedCompanies.length > 1) {
        navigate('/select-company');
      } else if (updatedCompanies.length === 1) {
        localStorage.setItem('currentCompany', JSON.stringify(updatedCompanies[0]));
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
    catch (e: any) { setError(e.response?.data?.message || 'کد نامعتبر است'); }
    finally { setLoading(false); }
  };

  const handlePasswordLogin = async () => {
    if (mobile.length < 10 || password.length < 6) {
      setError('نام کاربری و رمز عبور را وارد کنید');
      return;
    }
    setLoading(true); setError('');
    try {
      setError('ورود با رمز عبور به زودی فعال می‌شود');
    }
    catch (e: any) { setError(e.response?.data?.message || 'خطا در ورود'); }
    finally { setLoading(false); }
  };

  const handleCodeChange = (value: string) => {
    const digits = value.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(digits);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    setCode(pasted);
  };

  return (
    <div className="login-container">
      <div className="login-brand-panel">
        <div className="brand-overlay" />
        <div className="brand-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="16" fill="url(#logoGrad)" />
                <path d="M32 12L48 32L32 52L16 32L32 12Z" fill="white" opacity="0.9" />
                <circle cx="32" cy="32" r="8" fill="url(#logoGrad)" />
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64">
                    <stop stopColor="#1A237E" />
                    <stop offset="1" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className="brand-title">Prena</h1>
          <p className="brand-subtitle">پلتفرم جامع مدیریت سازمانی</p>
          <div className="brand-features">
            <div className="feature-item"><RiShieldCheckLine size={20} /><span>امنیت سازمانی با رمزنگاری پیشرفته</span></div>
            <div className="feature-item"><RiShieldCheckLine size={20} /><span>مدیریت یکپارچه فرآیندهای کسب‌وکار</span></div>
            <div className="feature-item"><RiShieldCheckLine size={20} /><span>دسترسی ابری از هر کجا و هر دستگاه</span></div>
          </div>
          <div className="brand-footer"><small>© ۲۰۲۶ Prena Cloud Platform. تمامی حقوق محفوظ است.</small></div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-wrapper">
          <div className="form-header">
            <h2 className="form-title">ورود به حساب کاربری</h2>
            <p className="form-subtitle">برای ادامه، اطلاعات خود را وارد نمایید</p>
          </div>

          <div className="login-mode-tabs">
            <button className={`mode-tab ${loginMode === 'password' ? 'active' : ''}`} onClick={() => { setLoginMode('password'); setError(''); }}>
              <span>👤</span> ورود با نام کاربری و رمز عبور
            </button>
            <button className={`mode-tab ${loginMode === 'otp' ? 'active' : ''}`} onClick={() => { setLoginMode('otp'); setError(''); setStep('mobile'); }}>
              <span>📱</span> ورود با موبایل
            </button>
          </div>

          {error && <div className="alert alert-danger py-2 px-3 text-center" style={{ fontSize: '0.85rem', borderRadius: '8px' }}>{error}</div>}

          {loginMode === 'password' ? (
            <>
              <div className="mb-3">
                <label className="form-label-custom">نام کاربری</label>
                <input type="text" className="form-control-custom" placeholder="نام کاربری یا شماره موبایل" value={mobile} onChange={(e) => setMobile(e.target.value)} style={{ direction: 'ltr', textAlign: 'left' }} />
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label-custom mb-0">رمز عبور</label>
                  <a href="#" className="forgot-link">فراموشی رمز عبور؟</a>
                </div>
                <div className="password-input-wrapper">
                  <input type={showPassword ? 'text' : 'password'} className="form-control-custom" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ direction: 'ltr' }} />
                  <button className="password-toggle" onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                  </button>
                </div>
              </div>
              <button className="btn-login" onClick={handlePasswordLogin} disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2" />در حال ورود...</> : 'ورود به سیستم'}
              </button>
            </>
          ) : (
            <>
              {step === 'mobile' ? (
                <>
                  <div className="mb-4">
                    <label className="form-label-custom">شماره موبایل</label>
                    <input type="tel" className="form-control-custom" placeholder="۰۹۱۲۳۴۵۶۷۸۹" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))} maxLength={11} style={{ direction: 'ltr', textAlign: 'left' }} />
                  </div>
                  <button className="btn-login" onClick={handleRequestOtp} disabled={loading}>{loading ? 'در حال ارسال...' : 'دریافت کد تأیید'}</button>
                </>
              ) : (
                <>
                  <div className="text-center mb-3">
                    <div className="otp-sent-icon">📩</div>
                    <p className="text-muted mb-1">کد تأیید به شماره زیر ارسال شد</p>
                    <p className="fw-bold mb-0" style={{ direction: 'ltr' }}>{mobile}</p>
                  </div>
                  <div className="mb-4">
                    <label className="form-label-custom text-center d-block">کد ۶ رقمی</label>
                    <input type="text" inputMode="numeric" className="form-control-custom text-center" value={code} onChange={(e) => handleCodeChange(e.target.value)} onPaste={handlePaste} maxLength={6} placeholder="• • • • • •" style={{ fontSize: '1.8rem', letterSpacing: '8px', direction: 'ltr', fontFamily: 'monospace' }} autoFocus />
                  </div>
                  <button className="btn-login mb-3" onClick={handleVerifyOtp} disabled={loading || code.length < 6}>{loading ? 'در حال بررسی...' : 'تأیید و ورود'}</button>
                  <div className="d-flex justify-content-between">
                    <button className="text-link" onClick={() => { setStep('mobile'); setCode(''); }}>✏️ اصلاح شماره</button>
                    <button className="text-link" onClick={handleRequestOtp} disabled={loading}>🔄 ارسال مجدد</button>
                  </div>
                </>
              )}
            </>
          )}

          <div className="register-section">
            <span className="text-muted">حساب کاربری ندارید؟</span>
            <a href="#" className="register-link">ثبت‌نام در Prena</a>
          </div>
        </div>
      </div>

      <style>{`
        .login-container { display: flex; min-height: 100vh; direction: rtl; }
        .login-brand-panel { flex: 1; background: linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 30%, #1A237E 70%, #283593 100%); position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 3rem; }
        .brand-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 50%, rgba(0,229,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,77,255,0.08) 0%, transparent 50%); }
        .brand-content { position: relative; z-index: 1; text-align: center; max-width: 450px; }
        .logo-icon { margin-bottom: 2rem; display: inline-block; filter: drop-shadow(0 8px 24px rgba(0,229,255,0.3)); }
        .brand-title { color: white; font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .brand-subtitle { color: rgba(255,255,255,0.7); font-size: 1.1rem; font-weight: 400; margin-bottom: 3rem; }
        .brand-features { text-align: right; margin-bottom: 3rem; }
        .feature-item { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8); margin-bottom: 1rem; font-size: 0.95rem; font-weight: 400; }
        .feature-item svg { color: #00E5FF; flex-shrink: 0; }
        .brand-footer { color: rgba(255,255,255,0.4); font-size: 0.8rem; font-weight: 300; }
        .login-form-panel { flex: 1; display: flex; align-items: center; justify-content: center; background: #ffffff; padding: 2rem; }
        .login-form-wrapper { width: 100%; max-width: 420px; }
        .form-header { margin-bottom: 2rem; text-align: center; }
        .form-title { font-size: 1.5rem; font-weight: 500; color: #1a1a2e; margin-bottom: 0.5rem; }
        .form-subtitle { color: #888; font-size: 0.9rem; font-weight: 400; margin: 0; }
        .login-mode-tabs { display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.5rem; }
        .mode-tab { flex: 1; padding: 14px 16px; border: 1px solid #e0e0e0; background: #fafafa; border-radius: 8px; font-size: 0.95rem; font-weight: 400; color: #666; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .mode-tab.active { border-color: #1A237E; background: #f5f7ff; color: #1A237E; }
        .mode-tab:hover { border-color: #1A237E; background: #fafbff; }
        .form-label-custom { display: block; margin-bottom: 6px; font-size: 0.85rem; font-weight: 400; color: #555; }
        .form-control-custom { width: 100%; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 1rem; font-weight: 400; transition: all 0.2s; background: #fafafa; outline: none; }
        .form-control-custom:focus { border-color: #1A237E; background: white; box-shadow: 0 0 0 2px rgba(26,35,126,0.06); }
        .form-control-custom::placeholder { color: #bbb; font-weight: 300; }
        .password-input-wrapper { position: relative; }
        .password-input-wrapper .form-control-custom { padding-left: 50px; }
        .password-toggle { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #bbb; cursor: pointer; padding: 4px; }
        .password-toggle:hover { color: #1A237E; }
        .forgot-link { font-size: 0.8rem; color: #1A237E; text-decoration: none; font-weight: 400; }
        .text-link { background: none; border: none; color: #888; font-size: 0.85rem; font-weight: 400; cursor: pointer; padding: 0; }
        .text-link:hover { color: #1A237E; }
        .btn-login { width: 100%; padding: 14px; background: linear-gradient(135deg, #1A237E 0%, #283593 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-bottom: 1.5rem; }
        .btn-login:hover { background: linear-gradient(135deg, #283593 0%, #1A237E 100%); box-shadow: 0 2px 8px rgba(26,35,126,0.2); }
        .btn-login:disabled { opacity: 0.5; cursor: not-allowed; }
        .register-section { text-align: center; padding-top: 1.5rem; border-top: 1px solid #eee; margin-top: 1rem; }
        .register-section span { font-size: 0.9rem; font-weight: 400; margin-left: 4px; }
        .register-link { color: #1A237E; font-weight: 400; text-decoration: none; font-size: 0.9rem; }
        .otp-sent-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        @media (max-width: 992px) { .login-brand-panel { display: none; } .login-form-panel { flex: 1; padding: 1.5rem; } }
      `}</style>
    </div>
  );
};
