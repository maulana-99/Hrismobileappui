import { useState, useEffect } from 'react';
import { Bell, Menu, Calendar, FileText, Briefcase, Users, LogOut } from 'lucide-react';
import { SidePanel } from './components/SidePanel';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { PayslipPage } from './pages/PayslipPage';
import { TeamPage } from './pages/TeamPage';
import { ProfilePage } from './pages/ProfilePage';
import { DocumentsPage } from './pages/DocumentsPage';
import { LeavePage } from './pages/LeavePage';
import { PermissionPage } from './pages/PermissionPage';
import { ReimbursePage } from './pages/ReimbursePage';
import { AttendancePage } from './pages/AttendancePage';
import { NotificationPage } from './pages/NotificationPage';

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
      case 'team':
        return <TeamPage />;
      case 'profile':
        return <ProfilePage />;
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
      case 'team':
        return { greeting: '', name: 'Tim', subtitle: 'Direktori Karyawan' };
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
      default:
        return { greeting: 'Selamat Pagi,', name: 'Budi Santoso', subtitle: 'Product Designer • Jakarta Office' };
    }
  };

  const pageTitle = getPageTitle();

  // Check if on notification page
  const isNotificationPage = currentPage === 'notifications';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-300">
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
          <header className="px-5 pt-12 pb-6">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setIsSidePanelOpen(true)}
                className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-400" />
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage('notifications')}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all relative ${
                    currentPage === 'notifications'
                      ? 'bg-lime-600 dark:bg-lime-400 border-lime-600 dark:border-lime-400 shadow-lg shadow-lime-600/20 dark:shadow-lime-400/20'
                      : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Bell className={`w-5 h-5 transition-colors ${
                    currentPage === 'notifications'
                      ? 'text-white dark:text-zinc-900'
                      : 'text-zinc-700 dark:text-zinc-400'
                  }`} />
                  {currentPage !== 'notifications' && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-lime-600 dark:bg-lime-400 rounded-full"></div>
                  )}
                </button>
              </div>
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
        <div className={`px-5 ${isNotificationPage ? 'pt-12 pb-8' : 'pb-32'}`}>{renderPage()}</div>

        {/* Bottom Navigation - Hide on notification page */}
        {!isNotificationPage && (
          <div className="fixed bottom-0 left-0 right-0 bg-zinc-50/90 dark:bg-[#0a0a0a]/80 border-t border-zinc-200 dark:border-zinc-900/50 backdrop-blur-xl z-40">
            <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-around">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <Briefcase
                  className={`w-5 h-5 ${
                    currentPage === 'home' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                />
                <span
                  className={`text-[10px] ${
                    currentPage === 'home' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
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
                  className={`w-5 h-5 ${
                    currentPage === 'calendar' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                />
                <span
                  className={`text-[10px] ${
                    currentPage === 'calendar' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
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
                  className={`w-5 h-5 ${
                    currentPage === 'payslip' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                />
                <span
                  className={`text-[10px] ${
                    currentPage === 'payslip' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                >
                  Slip Gaji
                </span>
              </button>
              <button
                onClick={() => setCurrentPage('team')}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <Users
                  className={`w-5 h-5 ${
                    currentPage === 'team' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                />
                <span
                  className={`text-[10px] ${
                    currentPage === 'team' ? 'text-lime-600 dark:text-lime-400' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                >
                  Tim
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}