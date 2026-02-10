import React from 'react';
import { Card } from '../atoms/Card';
import '../../styles/mobile.css';

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'gradient';
  gradientColors?: string[];
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon,
  variant = 'default',
  onPress,
}) => {
  return (
    <Card variant={variant === 'gradient' ? 'elevated' : 'outlined'} onPress={onPress}>
      <div className="stat-card-content">
        <div className="stat-card-text">
          <span className="stat-card-label">{label}</span>
          <span className="stat-card-value">{value}</span>
          {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
        </div>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>
    </Card>
  );
};
