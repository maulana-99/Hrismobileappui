import { useState, useEffect } from 'react';
import { Bell, Menu, Calendar, FileText, Briefcase, Users, LogOut, MapPin } from 'lucide-react';
import { SidePanel } from './components/SidePanel';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { PayslipPage } from './pages/PayslipPage';
import { BranchPage } from './pages/BranchPage';
import { ProfilePage } from './pages/ProfilePage';
import { DocumentsPage } from './pages/DocumentsPage';
import { Toaster } from 'sonner';
import { LeavePage } from './pages/LeavePage';
import { PermissionPage } from './pages/PermissionPage';
import { ReimbursePage } from './pages/ReimbursePage';
import { AttendancePage } from './pages/AttendancePage';
import { NotificationPage } from './pages/NotificationPage';
import { SettingsPage } from './pages/SettingsPage';
import { ShiftPage } from './pages/ShiftPage';
import { EditProfilePage } from './pages/EditProfilePage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@company.com' && password === 'password123') {
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error('Email atau password salah'));
        }
      }, 1500);
    });
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsSidePanelOpen(false);
    setCurrentPage('home');
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    alert('Fitur lupa password akan segera tersedia!');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} onForgotPassword={handleForgotPassword} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'calendar':
        return <CalendarPage />;
      case 'payslip':
        return <PayslipPage />;
      case 'branch':
        return <BranchPage />;
      case 'profile':
        return <ProfilePage onEdit={() => setCurrentPage('edit-profile')} />;
      case 'documents':
        return <DocumentsPage />;
      case 'leave':
        return <LeavePage />;
      case 'permission':
        return <PermissionPage />;
      case 'reimburse':
        return <ReimbursePage />;
      case 'attendance':
        return <AttendancePage />;
      case 'notifications':
        return <NotificationPage onBack={() => setCurrentPage('home')} />;
      case 'settings':
        return <SettingsPage />;
      case 'edit-profile':
        return (
          <EditProfilePage
            onBack={() => setCurrentPage('profile')}
            onSave={(data) => {
              console.log('Saved:', data);
              // In a real app, you'd update the global state or call an API here
              setCurrentPage('profile');
            }}
          />
        );
      case 'shift':
        return <ShiftPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return { greeting: 'Selamat Pagi,', name: 'Budi Santoso', subtitle: 'Product Designer • Jakarta Office' };
      case 'calendar':
        return { greeting: '', name: 'Kalender', subtitle: 'Jadwal & Event' };
      case 'payslip':
        return { greeting: '', name: 'Slip Gaji', subtitle: 'Riwayat Pembayaran' };
      case 'branch':
        return { greeting: '', name: 'Branch', subtitle: 'Lokasi Cabang & Karyawan' };
      case 'profile':
        return { greeting: '', name: 'Profil', subtitle: 'Informasi Pribadi' };
      case 'documents':
        return { greeting: '', name: 'Dokumen', subtitle: 'File & Sertifikat' };
      case 'leave':
        return { greeting: '', name: 'Pengajuan Cuti', subtitle: 'Kelola Cuti Tahunan' };
      case 'permission':
        return { greeting: '', name: 'Izin Kerja', subtitle: 'Terlambat & Keluar Kantor' };
      case 'reimburse':
        return { greeting: '', name: 'Reimburse', subtitle: 'Klaim Pengeluaran' };
      case 'attendance':
        return { greeting: '', name: 'Riwayat Absensi', subtitle: 'Kehadiran & Jam Kerja' };
      case 'notifications':
        return { greeting: '', name: 'Notifikasi', subtitle: 'Pemberitahuan & Pengingat' };
      case 'settings':
        return { greeting: '', name: 'Pengaturan', subtitle: 'Konfigurasi Aplikasi' };
      case 'shift':
        return { greeting: '', name: 'Jadwal Shift', subtitle: 'Lihat Shift Bulanan Anda' };
      case 'edit-profile':
        return { greeting: '', name: 'Edit Profil', subtitle: 'Kontak Darurat' };
      default:
        return { greeting: 'Selamat Pagi,', name: 'Budi Santoso', subtitle: 'Product Designer • Jakarta Office' };
    }
  };

  const pageTitle = getPageTitle();

  // Check if on notification page
  const isNotificationPage = currentPage === 'notifications';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <Toaster position="top-center" expand={false} richColors />
      {/* Side Panel */}
      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        onLogout={handleLogout}
      />

      {/* Mobile Container */}
      <div className="max-w-md mx-auto min-h-screen bg-zinc-50 dark:bg-[#0a0a0a]">
        {/* Header - Hide on notification page */}
        {!isNotificationPage && (
          <header className="px-5 pt-6 pb-6">
            <div className="flex items-center justify-between mb-8">
              {/* Premium Menu Button */}
              <button
                onClick={() => setIsSidePanelOpen(true)}
                className="group relative w-11 h-11 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md dark:shadow-zinc-950/50"
              >
                {/* Subtle gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-300/50 to-transparent dark:from-zinc-700/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
                <Menu className="relative w-5 h-5 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </button>

              {/* Premium Notification Button */}
              <button
                onClick={() => setCurrentPage('notifications')}
                className={`group relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${currentPage === 'notifications'
                  ? 'bg-gradient-to-br from-lime-400 to-emerald-500 shadow-lg shadow-lime-500/30'
                  : 'bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-sm hover:shadow-md dark:shadow-zinc-950/50'
                  }`}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity ${currentPage === 'notifications'
                  ? 'bg-gradient-to-br from-lime-300/50 to-transparent opacity-100'
                  : 'bg-gradient-to-br from-zinc-300/50 to-transparent dark:from-zinc-700/50 dark:to-transparent opacity-0 group-hover:opacity-100'
                  }`} />
                <div className={`absolute inset-[1px] rounded-2xl ${currentPage === 'notifications'
                  ? 'bg-gradient-to-br from-lime-400 to-emerald-500'
                  : 'bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900'
                  }`} />

                <Bell className={`relative w-5 h-5 transition-all ${currentPage === 'notifications'
                  ? 'text-white'
                  : 'text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white'
                  }`} />

                {/* Notification Badge with pulse animation */}
                {currentPage !== 'notifications' && (
                  <div className="absolute -top-0.5 -right-0.5">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-br from-lime-400 to-emerald-500 border-2 border-zinc-50 dark:border-zinc-900"></span>
                    </span>
                  </div>
                )}
              </button>
            </div>

            <div>
              {pageTitle.greeting && (
                <div className="text-zinc-500 text-sm mb-1">{pageTitle.greeting}</div>
              )}
              <h1 className="text-zinc-900 dark:text-white text-3xl mb-1">{pageTitle.name}</h1>
              <div className="text-zinc-600 text-sm">{pageTitle.subtitle}</div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <div className={`px-5 ${isNotificationPage ? 'pt-6 pb-8' : 'pb-32'}`}>{renderPage()}</div>

        {/* Bottom Navigation - Hide on notification page */}
        {!isNotificationPage && (
          <div className="fixed bottom-0 left-0 right-0 bg-zinc-50/90 dark:bg-[#0a0a0a]/80 border-t border-zinc-200 dark:border-zinc-900/50 backdrop-blur-xl z-40">
            <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-around">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <Briefcase
                  className={`w-5 h-5 ${currentPage === 'home' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                />
                <span
                  className={`text-[10px] ${currentPage === 'home' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                >
                  Home
                </span>
              </button>
              <button
                onClick={() => setCurrentPage('calendar')}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <Calendar
                  className={`w-5 h-5 ${currentPage === 'calendar' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                />
                <span
                  className={`text-[10px] ${currentPage === 'calendar' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                >
                  Kalender
                </span>
              </button>
              <button
                onClick={() => setCurrentPage('payslip')}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <FileText
                  className={`w-5 h-5 ${currentPage === 'payslip' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                />
                <span
                  className={`text-[10px] ${currentPage === 'payslip' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                >
                  Slip Gaji
                </span>
              </button>
              <button
                onClick={() => setCurrentPage('branch')}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <MapPin
                  className={`w-5 h-5 ${currentPage === 'branch' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                />
                <span
                  className={`text-[10px] ${currentPage === 'branch' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                >
                  Branch
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}