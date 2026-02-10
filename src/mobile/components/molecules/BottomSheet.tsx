import React, { useEffect } from 'react';
import '../../styles/mobile.css';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[];
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [visible, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="bottom-sheet-overlay">
      <div className="bottom-sheet-backdrop" onClick={onClose} />
      <div className="bottom-sheet-container">
        <div className="bottom-sheet-header">
          <div className="bottom-sheet-handle" />
          {title && <span className="bottom-sheet-title">{title}</span>}
        </div>
        <div className="bottom-sheet-content scroll-view">{children}</div>
      </div>
    </div>
  );
};
