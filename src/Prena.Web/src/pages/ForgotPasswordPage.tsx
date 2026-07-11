import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowRightLine, RiMailLine, RiPhoneLine } from 'react-icons/ri';

export const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'input' | 'sent'>('input');
  const [method, setMethod] = useState<'mobile' | 'email'>('mobile');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (method === 'mobile' && value.length < 10) {
      setError('شماره موبایل معتبر وارد کنید');
      return;
    }
    if (method === 'email' && !value.includes('@')) {
      setError('ایمیل معتبر وارد کنید');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('sent');
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="card p-5 shadow-lg" style={{ width: '440px', maxWidth: '92vw', borderRadius: '16px' }}>
        
        {step === 'input' ? (
          <>
            <div className="text-center mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
              <h4 style={{ fontWeight: 500 }}>فراموشی رمز عبور</h4>
              <p className="text-muted">شماره موبایل یا ایمیل خود را وارد کنید تا لینک بازیابی ارسال شود.</p>
            </div>

            {error && <div className="alert alert-danger py-2 px-3 text-center" style={{ fontSize: '0.85rem', borderRadius: '8px' }}>{error}</div>}

            {/* Method Tabs */}
            <div className="d-flex gap-2 mb-3">
              <button
                className={`btn flex-grow-1 ${method === 'mobile' ? 'text-white' : 'btn-light'}`}
                style={{ background: method === 'mobile' ? 'linear-gradient(135deg, #1A237E, #283593)' : '', borderRadius: '8px' }}
                onClick={() => { setMethod('mobile'); setValue(''); setError(''); }}
              >
                <RiPhoneLine className="ms-1" /> موبایل
              </button>
              <button
                className={`btn flex-grow-1 ${method === 'email' ? 'text-white' : 'btn-light'}`}
                style={{ background: method === 'email' ? 'linear-gradient(135deg, #1A237E, #283593)' : '', borderRadius: '8px' }}
                onClick={() => { setMethod('email'); setValue(''); setError(''); }}
              >
                <RiMailLine className="ms-1" /> ایمیل
              </button>
            </div>

            <div className="mb-4">
              <input
                type={method === 'email' ? 'email' : 'tel'}
                className="form-control"
                placeholder={method === 'mobile' ? '۰۹۱۲۳۴۵۶۷۸۹' : 'example@email.com'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ borderRadius: '8px', padding: '12px', direction: 'ltr', textAlign: 'left' }}
              />
            </div>

            <button
              className="btn text-white w-100 py-2 mb-3"
              onClick={handleSubmit}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              ارسال لینک بازیابی
            </button>

            <button className="btn btn-link w-100 text-muted" onClick={() => navigate('/login')}>
              <RiArrowRightLine className="ms-1" /> بازگشت به صفحه ورود
            </button>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📩</div>
            <h4 style={{ fontWeight: 500 }}>لینک بازیابی ارسال شد</h4>
            <p className="text-muted mb-4">
              اگر {method === 'mobile' ? 'شماره موبایل' : 'ایمیل'} وارد شده در سیستم ثبت شده باشد، لینک بازیابی رمز عبور برای شما ارسال خواهد شد.
            </p>
            <button
              className="btn text-white px-4"
              onClick={() => navigate('/login')}
              style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}
            >
              بازگشت به صفحه ورود
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
