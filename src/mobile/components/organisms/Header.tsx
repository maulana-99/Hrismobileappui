import React from 'react';
import '../../styles/mobile.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
    badge?: boolean;
  };
  variant?: 'default' | 'large';
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  variant = 'default',
}) => {
  return (
    <div className="header">
      <div className="header-content">
        {leftAction && (
          <button
            onClick={leftAction.onPress}
            className="header-action pressable"
            aria-label="Menu"
          >
            {leftAction.icon}
          </button>
        )}

        {variant === 'large' && (title || subtitle) && (
          <div className="header-title-container">
            {subtitle && <span className="header-subtitle">{subtitle}</span>}
            {title && <span className="header-title-large">{title}</span>}
          </div>
        )}

        <div className="header-spacer" />

        {rightAction && (
          <button
            onClick={rightAction.onPress}
            className="header-action pressable"
            aria-label="Notifications"
          >
            {rightAction.icon}
            {rightAction.badge && <span className="header-badge" />}
          </button>
        )}
      </div>
    </div>
  );
};
