import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, typography, spacing, borderRadius, layout } from '../../design-system/tokens';

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
  const isDark = false; // Would come from theme context

  const content = (
    <View
      style={[
        styles.container,
        showDivider && {
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.border.dark : colors.border.light,
        },
      ]}
    >
      {leftContent && <View style={styles.leftContent}>{leftContent}</View>}
      <View style={styles.textContent}>
        <Text
          style={[
            styles.title,
            { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
        {description && (
          <Text
            style={[
              styles.description,
              { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
            ]}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
      </View>
      {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    minHeight: layout.minTouchTarget,
  },
  leftContent: {
    marginRight: spacing.md,
  },
  textContent: {
    flex: 1,
  },
  rightContent: {
    marginLeft: spacing.md,
  },
  title: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.base,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  description: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
  },
  pressed: {
    opacity: 0.7,
  },
});
