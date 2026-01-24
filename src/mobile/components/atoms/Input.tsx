import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, layout } from '../../design-system/tokens';

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
  style?: ViewStyle;
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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isDark = false; // Would come from theme context

  const getContainerStyles = (): ViewStyle => {
    return {
      backgroundColor: isDark ? colors.surfaceSecondary.dark : colors.surfaceSecondary.light,
      borderWidth: 1,
      borderColor: error
        ? colors.error
        : isFocused
        ? colors.primary
        : isDark
        ? colors.border.dark
        : colors.border.light,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      minHeight: layout.inputHeight,
      flexDirection: 'row',
      alignItems: multiline ? 'flex-start' : 'center',
    };
  };

  const getInputStyles = (): TextStyle => {
    return {
      flex: 1,
      fontFamily: typography.family.regular,
      fontSize: typography.size.base,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      paddingVertical: 0,
      ...(multiline && { textAlignVertical: 'top' }),
    };
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View style={getContainerStyles()}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? colors.text.tertiary.dark : colors.text.tertiary.light}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={getInputStyles()}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.sm,
    marginBottom: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.sm,
    justifyContent: 'center',
  },
  rightIcon: {
    marginLeft: spacing.sm,
    justifyContent: 'center',
  },
  error: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
});