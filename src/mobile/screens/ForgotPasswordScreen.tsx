import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { colors, typography, spacing, borderRadius } from '../design-system/tokens';

// Icons
const BackIcon = () => <Text style={{ fontSize: 20 }}>←</Text>;
const MailIcon = () => <Text style={{ fontSize: 20 }}>✉️</Text>;
const CheckCircleIcon = () => <Text style={{ fontSize: 48 }}>✓</Text>;

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onResetPassword: (email: string) => Promise<void>;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onResetPassword,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const isDark = false; // Would come from theme context

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email harus diisi');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    try {
      await onResetPassword(email);
      setIsSuccess(true);
    } catch (error) {
      setEmailError('Email tidak ditemukan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDark ? colors.background.dark : colors.background.light },
        ]}
        edges={['top', 'bottom']}
      >
        <View style={styles.successContainer}>
          <View
            style={[
              styles.successIcon,
              {
                backgroundColor: 'rgba(163, 230, 53, 0.1)',
              },
            ]}
          >
            <CheckCircleIcon />
          </View>

          <Text
            style={[
              styles.successTitle,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            Email Terkirim!
          </Text>

          <Text
            style={[
              styles.successMessage,
              { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
            ]}
          >
            Kami telah mengirimkan link reset password ke email {email}. Silakan cek inbox atau
            folder spam Anda.
          </Text>

          <View style={styles.successActions}>
            <Button title="Kembali ke Login" onPress={onBack} fullWidth />
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <View style={styles.backButtonContainer}>
            <Button
              title=""
              onPress={onBack}
              variant="ghost"
              icon={<BackIcon />}
              style={styles.backButton}
            />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
              ]}
            >
              Lupa Password?
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
              ]}
            >
              Masukkan email Anda dan kami akan mengirimkan link untuk reset password
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="nama@perusahaan.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) {
                  setEmailError('');
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={<MailIcon />}
              error={emailError}
              disabled={isLoading}
            />

            <Button
              title={isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            />
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <View
              style={[
                styles.infoBox,
                {
                  backgroundColor: isDark
                    ? colors.surfaceSecondary.dark
                    : colors.surfaceSecondary.light,
                },
              ]}
            >
              <Text
                style={[
                  styles.infoText,
                  { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
                ]}
              >
                💡 Link reset password akan berlaku selama 1 jam. Jika tidak menerima email, coba
                cek folder spam atau hubungi IT Support.
              </Text>
            </View>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  backButtonContainer: {
    marginBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
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
    lineHeight: typography.size.base * typography.lineHeight.relaxed,
  },
  form: {
    marginBottom: spacing.lg,
  },
  infoContainer: {
    marginTop: spacing.lg,
  },
  infoBox: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  infoText: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm * typography.lineHeight.relaxed,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['2xl'],
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  successMessage: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.base,
    lineHeight: typography.size.base * typography.lineHeight.relaxed,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  successActions: {
    width: '100%',
  },
});
