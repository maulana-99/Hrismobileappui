import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../design-system/tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  onPress,
  style,
}) => {
  const isDark = false; // Would come from theme context

  const getCardStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
    };

    const variantStyles: Record<string, ViewStyle> = {
      elevated: {
        backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
        ...shadows.md,
      },
      outlined: {
        backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
        borderWidth: 1,
        borderColor: isDark ? colors.border.dark : colors.border.light,
      },
      filled: {
        backgroundColor: isDark ? colors.surfaceSecondary.dark : colors.surfaceSecondary.light,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          getCardStyles(),
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[getCardStyles(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
