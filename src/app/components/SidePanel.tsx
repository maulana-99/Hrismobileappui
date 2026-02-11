import { X, Sun, Moon, Home, User, FileText, Folder, LogOut, Settings, HelpCircle, Calendar } from 'lucide-react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout?: () => void; // Add logout handler
}

const menuItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'profile', icon: User, label: 'Profil' },
  { id: 'documents', icon: Folder, label: 'Dokumen' },
  { id: 'attendance', icon: FileText, label: 'Riwayat Absensi' },
  { id: 'shift', icon: Calendar, label: 'Jadwal Shift' },
];

export function SidePanel({ isOpen, onClose, isDarkMode, onToggleTheme, onNavigate, currentPage, onLogout }: SidePanelProps) {
  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-zinc-50 dark:bg-zinc-950 z-50 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-lime-400 to-emerald-400 p-6 pb-8 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
              style={{
                backgroundImage: 'url(/master%202.png)',
                backgroundSize: '240px 240px',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="text-zinc-900 text-lg font-bold">Menu</div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-zinc-900/10 flex items-center justify-center hover:bg-zinc-900/20 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-900" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900/10 flex items-center justify-center">
                  <span className="text-zinc-900 text-xl font-bold">BS</span>
                </div>
                <div>
                  <div className="text-zinc-900 font-bold text-base">Budi Santoso</div>
                  <div className="text-zinc-900/60 text-sm">Product Designer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4 overflow-y-auto">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${currentPage === item.id
                    ? 'bg-lime-400 text-zinc-900 shadow-lg shadow-lime-400/20'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Settings Section */}
            <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500 dark:text-zinc-600 mb-3 px-4">Pengaturan</div>

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <>
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Light Mode</span>
                    </>
                  )}
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-lime-400' : 'bg-zinc-300'} relative`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-zinc-50 transition-transform shadow-sm ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </button>

              <button
                onClick={() => handleNavigate('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${currentPage === 'settings'
                  ? 'bg-lime-400 text-zinc-900 shadow-lg shadow-lime-400/20'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Pengaturan Dashboard</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors mt-1">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Pengaturan Akun</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors mt-1">
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Bantuan & Support</span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}