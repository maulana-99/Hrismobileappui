import React, { useState } from 'react';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import '../styles/mobile.css';

// Icons
const EyeIcon = () => <span style={{ fontSize: 20 }}>👁️</span>;
const EyeOffIcon = () => <span style={{ fontSize: 20 }}>🙈</span>;
const MailIcon = () => <span style={{ fontSize: 20 }}>✉️</span>;
const LockIcon = () => <span style={{ fontSize: 20 }}>🔒</span>;

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
    <div className="login-container">
      {/* Logo / App Name */}
      <div className="logo-container">
        <div className="logo">
          <span className="logo-text">HR</span>
        </div>
        <span className="app-name">HRIS Mobile</span>
      </div>

      {/* Header */}
      <div className="login-header">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Masuk ke akun HRIS Anda</p>
      </div>

      {/* Form */}
      <div className="login-form">
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
          error={errors.password}
          disabled={isLoading}
        />

        {/* Forgot Password */}
        <div className="forgot-password-container">
          <span
            className="forgot-password"
            onClick={onForgotPassword}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onForgotPassword();
              }
            }}
          >
            Lupa password?
          </span>
        </div>

        {/* Login Button */}
        <Button
          title={isLoading ? 'Memproses...' : 'Login'}
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
          fullWidth
        />
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p className="footer-text">HRIS Mobile App v1.0.0</p>
        <p className="footer-text">© 2026 PT Perusahaan Indonesia</p>
      </div>
    </div>
  );
};
