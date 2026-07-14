import React, { useState, useRef, useEffect } from 'react';
import { RiCalendarLine } from 'react-icons/ri';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className, style }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const months = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  const weekDays = ['ش','ی','د','س','چ','پ','ج'];
  const daysInMonths = [31,31,31,31,31,31,30,30,30,30,30,29];

  const pick = (d: number) => {
    onChange(y + '/' + String(m).padStart(2,'0') + '/' + String(d).padStart(2,'0'));
    setOpen(false);
  };

  return (
    <div className="position-relative" style={style} ref={ref}>
      <RiCalendarLine style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#1A237E', zIndex: 1, pointerEvents: 'none' }} size={18} />
      <input type="text" className={className || 'form-control'} value={value} readOnly onClick={() => setOpen(!open)}
        placeholder="1403/01/15" style={{ direction: 'ltr', textAlign: 'left', borderRadius: 8, paddingLeft: 40, fontSize: '0.95rem', border: '1px solid #e0e0e0', cursor: 'pointer', background: 'white' }} />
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 9999, background: 'white', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', padding: 16, minWidth: 300, marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <button onClick={() => { if(m===1){setM(12);setY(y-1)}else{setM(m-1)} }} style={{ border: 'none', background: '#f0f0f0', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>◀</button>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{months[m-1]} {y}</span>
            <button onClick={() => { if(m===12){setM(1);setY(y+1)}else{setM(m+1)} }} style={{ border: 'none', background: '#f0f0f0', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>▶</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 8 }}>
            {weekDays.map((wd, i) => (
              <div key={i} style={{ fontSize: '0.75rem', color: '#999', fontWeight: 500, padding: '4px 0' }}>{wd}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
            {Array.from({ length: daysInMonths[m-1] }, (_, i) => i + 1).map(d => (
              <button key={d} onClick={() => pick(d)}
                style={{ width: '100%', aspectRatio: '1', border: 'none', borderRadius: 8, background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = '#e8e8ff'}
                onMouseLeave={e => (e.target as HTMLElement).style.background = 'transparent'}>
                {d}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const getToday = (): string => {
  const n = new Date();
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(n).replace(/[۰-۹]/g, d => '0123456789'.indexOf(d).toString());
  } catch {
    return n.getFullYear() + '/' + String(n.getMonth()+1).padStart(2,'0') + '/' + String(n.getDate()).padStart(2,'0');
  }
};

export const getTodayParts = (): { year: number; month: number; day: number } => {
  const today = getToday();
  const parts = today.split('/');
  return { year: parseInt(parts[0]), month: parseInt(parts[1]), day: parseInt(parts[2]) };
};