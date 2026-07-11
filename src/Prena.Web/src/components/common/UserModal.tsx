import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiCheckLine, RiCloseLine as RiCrossLine } from 'react-icons/ri';

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  editUser?: any;
}

export const UserModal: React.FC<UserModalProps> = ({ show, onClose, onSave, editUser }) => {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    role: 'viewer',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength checks
  const passwordChecks = {
    minLength: form.password.length >= 8,
    hasUpper: /[A-Z]/.test(form.password),
    hasLower: /[a-z]/.test(form.password),
    hasNumber: /[0-9]/.test(form.password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  
  const getPasswordStrengthColor = () => {
    if (form.password.length === 0) return '#e0e0e0';
    if (passwordStrength <= 2) return '#FF1744';
    if (passwordStrength <= 4) return '#FF6D00';
    return '#00C853';
  };

  const getPasswordStrengthText = () => {
    if (form.password.length === 0) return '';
    if (passwordStrength <= 2) return 'ضعیف';
    if (passwordStrength <= 4) return 'متوسط';
    return 'قوی';
  };

  useEffect(() => {
    if (editUser) {
      setForm({
        fullName: editUser.fullName || '',
        mobile: editUser.mobile || '',
        role: editUser.role || 'viewer',
        password: '',
      });
    } else {
      setForm({ fullName: '', mobile: '', role: 'viewer', password: '' });
    }
    setErrors({});
  }, [editUser, show]);

  const validate = () => {
    const errs: Record<string, string> = {};
    
    if (!form.fullName.trim()) {
      errs.fullName = 'نام و نام خانوادگی الزامی است';
    }
    
    if (!form.mobile.trim()) {
      errs.mobile = 'شماره موبایل الزامی است';
    } else if (!/^09\d{9}$/.test(form.mobile)) {
      errs.mobile = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود';
    }

    if (!editUser) {
      if (!form.password) {
        errs.password = 'رمز عبور الزامی است';
      } else {
        if (form.password.length < 8) errs.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
        else if (!/[A-Z]/.test(form.password)) errs.password = 'رمز عبور باید شامل حروف بزرگ انگلیسی باشد';
        else if (!/[a-z]/.test(form.password)) errs.password = 'رمز عبور باید شامل حروف کوچک انگلیسی باشد';
        else if (!/[0-9]/.test(form.password)) errs.password = 'رمز عبور باید شامل اعداد باشد';
        else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) errs.password = 'رمز عبور باید شامل علائم خاص باشد (مثل @#$%)';
      }
    } else if (form.password) {
      if (form.password.length < 8) errs.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
      else if (!/[A-Z]/.test(form.password)) errs.password = 'رمز عبور باید شامل حروف بزرگ انگلیسی باشد';
      else if (!/[a-z]/.test(form.password)) errs.password = 'رمز عبور باید شامل حروف کوچک انگلیسی باشد';
      else if (!/[0-9]/.test(form.password)) errs.password = 'رمز عبور باید شامل اعداد باشد';
      else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) errs.password = 'رمز عبور باید شامل علائم خاص باشد (مثل @#$%)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            
            {/* Header */}
            <div className="modal-header border-0 px-4 pt-4 pb-0">
              <h5 className="modal-title" style={{ fontWeight: 500 }}>
                {editUser ? '✏️ ویرایش کاربر' : '👤 افزودن کاربر جدید'}
              </h5>
              <button className="btn btn-light rounded-circle p-2" onClick={onClose} style={{ width: 36, height: 36 }}>
                <RiCloseLine size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body px-4 py-3">
              
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}>
                  نام و نام خانوادگی <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="مثال: علی محمدی"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  style={{ borderRadius: '8px', padding: '10px 14px' }}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>

              {/* Mobile */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}>
                  شماره موبایل <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/[^0-9]/g, '') })}
                  maxLength={11}
                  style={{ direction: 'ltr', textAlign: 'left', borderRadius: '8px', padding: '10px 14px' }}
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>

              {/* Role */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}>نقش کاربری</label>
                <select
                  className="form-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={{ borderRadius: '8px', padding: '10px 14px' }}
                >
                  <option value="company_admin">مدیر شرکت</option>
                  <option value="accountant">حسابدار</option>
                  <option value="warehouse_keeper">انباردار</option>
                  <option value="viewer">مشاهده‌گر</option>
                </select>
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="form-label" style={{ fontSize: '0.85rem', color: '#555' }}>
                  {editUser ? 'رمز عبور جدید (در صورت تغییر)' : 'رمز عبور'} 
                  {!editUser && <span className="text-danger"> *</span>}
                </label>
                <div className="position-relative">
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder={editUser ? 'در صورت عدم تغییر خالی بگذارید' : 'حداقل ۸ کاراکتر'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ borderRadius: '8px', padding: '10px 14px', direction: 'ltr' }}
                  />
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}

                {/* Password Strength Bar */}
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="d-flex gap-1 mb-2">
                      {[1,2,3,4,5].map((level) => (
                        <div
                          key={level}
                          className="flex-grow-1"
                          style={{
                            height: '4px',
                            borderRadius: '2px',
                            backgroundColor: level <= passwordStrength ? getPasswordStrengthColor() : '#e0e0e0',
                            transition: 'background-color 0.3s',
                          }}
                        />
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small style={{ color: getPasswordStrengthColor(), fontWeight: 500 }}>
                        {getPasswordStrengthText()}
                      </small>
                    </div>
                  </div>
                )}

                {/* Password Requirements Checklist */}
                <div className="mt-3 p-3 rounded-3" style={{ backgroundColor: '#f8f9fa', fontSize: '0.8rem' }}>
                  <p className="mb-2 fw-medium text-muted" style={{ fontSize: '0.8rem' }}>الزامات رمز عبور:</p>
                  
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {passwordChecks.minLength ? (
                      <RiCheckLine size={14} color="#00C853" />
                    ) : (
                      <RiCrossLine size={14} color="#bbb" />
                    )}
                    <span style={{ color: passwordChecks.minLength ? '#00C853' : '#999' }}>
                      حداقل ۸ کاراکتر
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-1">
                    {passwordChecks.hasUpper ? (
                      <RiCheckLine size={14} color="#00C853" />
                    ) : (
                      <RiCrossLine size={14} color="#bbb" />
                    )}
                    <span style={{ color: passwordChecks.hasUpper ? '#00C853' : '#999' }}>
                      شامل حروف بزرگ انگلیسی (A-Z)
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-1">
                    {passwordChecks.hasLower ? (
                      <RiCheckLine size={14} color="#00C853" />
                    ) : (
                      <RiCrossLine size={14} color="#bbb" />
                    )}
                    <span style={{ color: passwordChecks.hasLower ? '#00C853' : '#999' }}>
                      شامل حروف کوچک انگلیسی (a-z)
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-1">
                    {passwordChecks.hasNumber ? (
                      <RiCheckLine size={14} color="#00C853" />
                    ) : (
                      <RiCrossLine size={14} color="#bbb" />
                    )}
                    <span style={{ color: passwordChecks.hasNumber ? '#00C853' : '#999' }}>
                      شامل اعداد (0-9)
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    {passwordChecks.hasSymbol ? (
                      <RiCheckLine size={14} color="#00C853" />
                    ) : (
                      <RiCrossLine size={14} color="#bbb" />
                    )}
                    <span style={{ color: passwordChecks.hasSymbol ? '#00C853' : '#999' }}>
                      شامل علائم خاص (!@#$%^&*)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 px-4 pb-4 pt-0">
              <button 
                className="btn btn-light flex-grow-1" 
                onClick={onClose} 
                style={{ borderRadius: '8px' }}
              >
                انصراف
              </button>
              <button
                className="btn flex-grow-1 text-white"
                onClick={handleSave}
                style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}
              >
                {editUser ? 'ذخیره تغییرات' : 'افزودن کاربر'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
