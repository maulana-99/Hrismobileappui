import React from 'react';
import '../../styles/mobile.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  onPress?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  onPress,
  style,
  className = '',
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'elevated':
        return 'card-elevated';
      case 'outlined':
        return 'card-outlined';
      case 'filled':
        return 'card-filled';
      default:
        return 'card-elevated';
    }
  };

  const cardClasses = ['card', getVariantClass(), className].filter(Boolean).join(' ');

  if (onPress) {
    return (
      <div
        onClick={onPress}
        className={`${cardClasses} pressable`}
        style={style}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onPress();
          }
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cardClasses} style={style}>
      {children}
    </div>
  );
};
