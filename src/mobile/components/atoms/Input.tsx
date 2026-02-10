import React, { useState } from 'react';
import '../../styles/mobile.css';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  autoComplete,
  leftIcon,
  rightIcon,
  style,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputType = () => {
    if (secureTextEntry) return 'password';
    switch (keyboardType) {
      case 'email-address':
        return 'email';
      case 'numeric':
        return 'number';
      case 'phone-pad':
        return 'tel';
      default:
        return 'text';
    }
  };

  const containerClasses = [
    'input-container',
    isFocused ? 'focused' : '',
    error ? 'error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`input-wrapper ${className}`} style={style}>
      {label && <label className="input-label">{label}</label>}
      <div className={containerClasses}>
        {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={numberOfLines}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="input-field"
            style={{ resize: 'none', minHeight: numberOfLines * 24 }}
          />
        ) : (
          <input
            type={getInputType()}
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="input-field"
          />
        )}
        {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};