import React from 'react';
import '../../styles/mobile.css';

interface ListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  description,
  leftContent,
  rightContent,
  onPress,
  showDivider = false,
}) => {
  const itemClasses = [
    'list-item',
    showDivider ? 'with-divider' : '',
    onPress ? 'pressable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {leftContent && <div className="list-item-left">{leftContent}</div>}
      <div className="list-item-text">
        <div className="list-item-title">{title}</div>
        {subtitle && <div className="list-item-subtitle">{subtitle}</div>}
        {description && <div className="list-item-description">{description}</div>}
      </div>
      {rightContent && <div className="list-item-right">{rightContent}</div>}
    </>
  );

  if (onPress) {
    return (
      <div
        className={itemClasses}
        onClick={onPress}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onPress();
          }
        }}
      >
        {content}
      </div>
    );
  }

  return <div className={itemClasses}>{content}</div>;
};
