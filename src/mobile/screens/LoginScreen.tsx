import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { colors, typography, spacing, borderRadius } from '../design-system/tokens';

// Icons - Replace with react-native-vector-icons
const EyeIcon = () => <Text style={{ fontSize: 20 }}>👁️</Text>;
const EyeOffIcon = () => <Text style={{ fontSize: 20 }}>🙈</Text>;
const MailIcon = () => <Text style={{ fontSize: 20 }}>✉️</Text>;
const LockIcon = () => <Text style={{ fontSize: 20 }}>🔒</Text>;

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const isDark = false; // Would come from theme context

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setErrors({ email: '', password: '' });

    // Validation
    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email harus diisi';
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Password harus diisi';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Proceed with login
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (error) {
      setErrors({
        email: '',
        password: 'Email atau password salah',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.background.dark : colors.background.light },
      ]}
      edges={['top', 'bottom']}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / App Name */}
          <View style={styles.logoContainer}>
            <View
              style={[
                styles.logo,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text style={styles.logoText}>HR</Text>
            </View>
            <Text
              style={[
                styles.appName,
                { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
              ]}
            >
              HRIS Mobile
            </Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
              ]}
            >
              Login
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
              ]}
            >
              Masuk ke akun HRIS Anda
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <Input
              label="Email"
              placeholder="nama@perusahaan.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: '' });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={<MailIcon />}
              error={errors.email}
              disabled={isLoading}
            />

            {/* Password Input */}
            <Input
              label="Password"
              placeholder="Masukkan password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              leftIcon={<LockIcon />}
              rightIcon={
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Pressable>
              }
              error={errors.password}
              disabled={isLoading}
            />

            {/* Forgot Password */}
            <View style={styles.forgotPasswordContainer}>
              <Pressable
                onPress={onForgotPassword}
                disabled={isLoading}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text
                  style={[
                    styles.forgotPassword,
                    { color: colors.primary },
                  ]}
                >
                  Lupa password?
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Button
              title={isLoading ? 'Memproses...' : 'Login'}
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            />
          </View>

          {/* Spacer for better spacing */}
          <View style={styles.spacer} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
              ]}
            >
              HRIS Mobile App v1.0.0
            </Text>
            <Text
              style={[
                styles.footerText,
                { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
              ]}
            >
              © 2026 PT Perusahaan Indonesia
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['3xl'],
    color: '#18181b',
  },
  appName: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['3xl'],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.base,
  },
  form: {
    marginBottom: spacing.lg,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  forgotPassword: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.sm,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  footerText: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
    marginBottom: spacing.xs,
  },
});
