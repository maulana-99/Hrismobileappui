import React from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, layout } from '../../design-system/tokens';

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
  const insets = useSafeAreaInsets();
  const isDark = false; // Would come from theme context

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.md,
          backgroundColor: isDark ? colors.background.dark : colors.background.light,
        },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? colors.background.dark : colors.background.light}
      />
      <View style={styles.content}>
        {leftAction && (
          <Pressable
            onPress={leftAction.onPress}
            style={({ pressed }) => [
              styles.action,
              {
                backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
                borderColor: isDark ? colors.border.dark : colors.border.light,
              },
              pressed && styles.pressed,
            ]}
          >
            {leftAction.icon}
          </Pressable>
        )}

        {variant === 'large' && (title || subtitle) && (
          <View style={styles.titleContainer}>
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
                ]}
              >
                {subtitle}
              </Text>
            )}
            {title && (
              <Text
                style={[
                  styles.titleLarge,
                  { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
                ]}
              >
                {title}
              </Text>
            )}
          </View>
        )}

        <View style={styles.spacer} />

        {rightAction && (
          <Pressable
            onPress={rightAction.onPress}
            style={({ pressed }) => [
              styles.action,
              {
                backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
                borderColor: isDark ? colors.border.dark : colors.border.light,
              },
              pressed && styles.pressed,
            ]}
          >
            {rightAction.icon}
            {rightAction.badge && <View style={styles.badge} />}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  action: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  titleLarge: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['3xl'],
  },
});
