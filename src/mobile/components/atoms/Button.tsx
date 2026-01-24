import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, layout } from '../../design-system/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}) => {
  const isDark = false; // Would come from theme context

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: layout.minTouchTarget,
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      sm: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
      },
      md: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
      },
      lg: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? colors.border.light : colors.primary,
      },
      secondary: {
        backgroundColor: isDark ? colors.surface.dark : colors.surfaceSecondary.light,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: isDark ? colors.border.dark : colors.border.light,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: typography.family.semiBold,
      textAlign: 'center',
    };

    // Size styles
    const sizeStyles: Record<string, TextStyle> = {
      sm: {
        fontSize: typography.size.sm,
      },
      md: {
        fontSize: typography.size.base,
      },
      lg: {
        fontSize: typography.size.lg,
      },
    };

    // Variant styles
    const variantStyles: Record<string, TextStyle> = {
      primary: {
        color: disabled ? colors.text.tertiary.light : '#18181b',
      },
      secondary: {
        color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      },
      outline: {
        color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      },
      ghost: {
        color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getButtonStyles(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#18181b' : colors.text.primary.light}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={getTextStyles()}>{title}</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
