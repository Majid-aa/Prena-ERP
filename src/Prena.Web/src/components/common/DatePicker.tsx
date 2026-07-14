import React from 'react';
import { RiCalendarLine } from 'react-icons/ri';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className, style }) => {
  const formatDate = (val: string): string => {
    const digits = val.replace(/[^0-9]/g, '').slice(0, 8);
    if (digits.length >= 5) return digits.slice(0, 4) + '/' + digits.slice(4, 6) + '/' + digits.slice(6, 8);
    if (digits.length >= 3) return digits.slice(0, 4) + '/' + digits.slice(4, 6);
    return digits;
  };

  return (
    <div className="position-relative" style={style}>
      <RiCalendarLine className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#1A237E', zIndex: 1, pointerEvents: 'none' }} size={18} />
      <input type="text" className={className || 'form-control'} value={value} onChange={(e) => onChange(formatDate(e.target.value))}
        placeholder="1403/01/15" maxLength={10}
        style={{ direction: 'ltr', textAlign: 'left', borderRadius: '8px', paddingLeft: '40px', fontSize: '0.95rem', border: '1px solid #e0e0e0' }} />
    </div>
  );
};

export const getToday = (): string => {
  const n = new Date();
  try {
    const f = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return f.format(n).replace(/[۰-۹]/g, d => '0123456789'.indexOf(d).toString());
  } catch {
    return n.getFullYear() + '/' + String(n.getMonth()+1).padStart(2,'0') + '/' + String(n.getDate()).padStart(2,'0');
  }
};