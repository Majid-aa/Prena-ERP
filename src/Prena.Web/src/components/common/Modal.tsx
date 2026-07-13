import React, { useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, title, size = 'md', children, footer }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;

  const sizes: Record<string, string> = { sm: '400px', md: '600px', lg: '800px', xl: '1000px' };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />
      <div className="modal fade show d-block" tabIndex={-1} onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: sizes[size] }} onClick={e => e.stopPropagation()}>
          <div className="modal-content" style={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div className="modal-header border-0 px-4 pt-4 pb-0">
              <h5 className="modal-title" style={{ fontWeight: 600 }}>{title}</h5>
              <button className="btn btn-light rounded-circle p-2" onClick={onClose} style={{ width: 36, height: 36 }}>
                <RiCloseLine size={18} />
              </button>
            </div>
            <div className="modal-body px-4 py-3">
              {children}
            </div>
            {footer && (
              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};