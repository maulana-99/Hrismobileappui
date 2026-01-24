import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onForgotPassword?: () => void;
}

export function LoginPage({ onLogin, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-lime-400 mb-4">
            <span className="text-2xl">🏢</span>
          </div>
          <h1 className="text-3xl text-zinc-900 dark:text-white mb-2">HRIS Mobile</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Masuk ke akun Anda
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Forgot Password */}
            {onForgotPassword && (
              <div className="mb-6 text-right">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-lime-500 hover:text-lime-400 transition-colors"
                  disabled={isLoading}
                >
                  Lupa password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-lime-400 hover:bg-lime-500 text-zinc-900 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
            Email: <span className="text-lime-500">demo@company.com</span>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
            Password: <span className="text-lime-500">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
}