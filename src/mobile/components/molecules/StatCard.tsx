import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../atoms/Card';
import { colors, typography, spacing } from '../../design-system/tokens';

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
  const isDark = false; // Would come from theme context

  if (variant === 'gradient') {
    // For gradient variant, would use LinearGradient from expo-linear-gradient
    return (
      <Card variant="elevated" onPress={onPress}>
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text
              style={[
                styles.label,
                { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' },
              ]}
            >
              {label}
            </Text>
            <Text
              style={[
                styles.value,
                { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
              ]}
            >
              {value}
            </Text>
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      </Card>
    );
  }

  return (
    <Card variant="outlined" onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text
            style={[
              styles.label,
              { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
            ]}
          >
            {label}
          </Text>
          <Text
            style={[
              styles.value,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            {value}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
  },
  label: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
    marginBottom: spacing.xs,
  },
  value: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['2xl'],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
  },
  iconContainer: {
    marginLeft: spacing.md,
  },
});
