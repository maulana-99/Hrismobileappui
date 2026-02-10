import React, { useState } from 'react';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import '../styles/mobile.css';

// Icons
const BackIcon = () => <span style={{ fontSize: 20 }}>←</span>;
const MailIcon = () => <span style={{ fontSize: 20 }}>✉️</span>;
const CheckCircleIcon = () => <span style={{ fontSize: 48, color: '#a3e635' }}>✓</span>;

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
      <div className="success-container">
        <div className="success-icon">
          <CheckCircleIcon />
        </div>

        <h2 className="success-title">Email Terkirim!</h2>

        <p className="success-message">
          Kami telah mengirimkan link reset password ke email {email}. Silakan cek inbox atau
          folder spam Anda.
        </p>

        <div className="success-actions">
          <Button title="Kembali ke Login" onPress={onBack} fullWidth />
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Back Button */}
      <div className="back-button-container">
        <Button
          title=""
          onPress={onBack}
          variant="ghost"
          icon={<BackIcon />}
        />
      </div>

      {/* Header */}
      <div className="login-header">
        <h1 className="login-title">Lupa Password?</h1>
        <p className="login-subtitle">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset password
        </p>
      </div>

      {/* Form */}
      <div className="login-form">
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
      </div>

      {/* Info */}
      <div className="info-container">
        <div className="info-box">
          <p className="info-text">
            💡 Link reset password akan berlaku selama 1 jam. Jika tidak menerima email, coba
            cek folder spam atau hubungi IT Support.
          </p>
        </div>
      </div>
    </div>
  );
};
