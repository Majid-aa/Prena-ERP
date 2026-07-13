import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { RiCheckLine, RiCloseLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 9999 }}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { icon: <RiCheckLine size={20} />, bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
    error: { icon: <RiCloseLine size={20} />, bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
    warning: { icon: <RiErrorWarningLine size={20} />, bg: '#fff3cd', color: '#856404', border: '#ffeaa7' },
    info: { icon: <RiInformationLine size={20} />, bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' },
  }[toast.type];

  return (
    <div
      className="d-flex align-items-center gap-3 p-3 shadow-lg mb-2"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        borderRadius: '12px',
        minWidth: '300px',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      {config.icon}
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
    </div>
  );
};