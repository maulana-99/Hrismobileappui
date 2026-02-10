import React from 'react';
import '../../styles/mobile.css';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  className = '',
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'button-primary';
      case 'secondary':
        return 'button-secondary';
      case 'outline':
      case 'outlined':
        return 'button-outline';
      case 'ghost':
        return 'button-ghost';
      default:
        return 'button-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'button-sm';
      case 'lg':
        return 'button-lg';
      default:
        return '';
    }
  };

  const buttonClasses = [
    'button',
    getVariantClass(),
    getSizeClass(),
    fullWidth ? 'button-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      onClick={onPress}
      disabled={disabled || loading}
      className={buttonClasses}
      style={style}
    >
      {loading ? (
        <span className="loading-spinner" />
      ) : (
        <>
          {icon && <span style={{ marginRight: title || children ? 8 : 0 }}>{icon}</span>}
          {title || children}
        </>
      )}
    </button>
  );
};
