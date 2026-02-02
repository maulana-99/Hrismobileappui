import { ReactNode, useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

interface HRLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function HRLayout({ children, currentPage, onNavigate }: HRLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'employees', icon: Users, label: 'Karyawan' },
    { id: 'approvals', icon: ClipboardCheck, label: 'Persetujuan' },
    { id: 'attendance', icon: Calendar, label: 'Kehadiran' },
    { id: 'reports', icon: BarChart3, label: 'Laporan' },
    { id: 'settings', icon: Settings, label: 'Pengaturan' },
  ];

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Selamat pagi, Admin HR' };
      case 'employees':
        return { title: 'Karyawan', subtitle: 'Kelola data karyawan' };
      case 'approvals':
        return { title: 'Persetujuan', subtitle: 'Review permintaan karyawan' };
      case 'attendance':
        return { title: 'Kehadiran', subtitle: 'Monitor kehadiran karyawan' };
      case 'reports':
        return { title: 'Laporan', subtitle: 'Analitik dan laporan' };
      case 'settings':
        return { title: 'Pengaturan', subtitle: 'Konfigurasi sistem' };
      default:
        return { title: 'Dashboard', subtitle: 'Selamat pagi, Admin HR' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
      {/* Sidebar */}
      <aside
        className={`${\n          sidebarCollapsed ? 'w-20' : 'w-64'\n        } bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-200 dark:border-zinc-800">
          {!sidebarCollapsed && (
            <div>
              <div className="text-zinc-900 dark:text-white font-bold text-lg">HRIS Admin</div>
              <div className="text-zinc-500 text-xs">Human Resources</div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all ${
                currentPage === item.id
                  ? 'bg-lime-400 text-zinc-900 shadow-lg shadow-lime-400/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={sidebarCollapsed ? 'Toggle Theme' : ''}
          >
            {isDarkMode ? <Moon className="w-5 h-5 flex-shrink-0" /> : <Sun className="w-5 h-5 flex-shrink-0" />}
            {!sidebarCollapsed && <span className="font-medium">{isDarkMode ? 'Dark' : 'Light'} Mode</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl text-zinc-900 dark:text-white font-bold">{pageInfo.title}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{pageInfo.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari karyawan..."
                className="w-80 bg-zinc-100 dark:bg-zinc-800 border-0 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/20"
              />
            </div>

            {/* Notifications */}
            <button className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative">
              <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-lime-400 rounded-full"></div>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
              <div className="text-right">
                <div className="text-sm text-zinc-900 dark:text-white font-bold">Sarah Admin</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">HR Manager</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center">
                <span className="text-zinc-900 font-bold text-sm">SA</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}