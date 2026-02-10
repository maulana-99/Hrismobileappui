import React, { useState } from 'react';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LeaveRequestScreen } from './screens/LeaveRequestScreen';
import { BottomSheet } from './components/molecules/BottomSheet';
import { ListItem } from './components/molecules/ListItem';
import './styles/mobile.css';

// Icons
const HomeIcon = () => <span>🏠</span>;
const CalendarIcon = () => <span>📅</span>;
const FileIcon = () => <span>📄</span>;
const UsersIcon = () => <span>👥</span>;
const UserIcon = () => <span>👤</span>;
const FolderIcon = () => <span>📁</span>;
const ClockIcon = () => <span>⏰</span>;
const LogOutIcon = () => <span>🚪</span>;
const SettingsIcon = () => <span>⚙️</span>;
const MoonIcon = () => <span>🌙</span>;
const SunIcon = () => <span>☀️</span>;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Home' },
    { id: 'profile', icon: <UserIcon />, label: 'Profil' },
    { id: 'documents', icon: <FolderIcon />, label: 'Dokumen' },
    { id: 'attendance', icon: <ClockIcon />, label: 'Riwayat Absensi' },
  ];

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@company.com' && password === 'password123') {
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} onLogout={handleLogout} />;
      case 'leave':
        return <LeaveRequestScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} onLogout={handleLogout} />;
    }
  };

  const renderBottomTab = (id: string, icon: React.ReactNode, label: string) => {
    const isActive = currentScreen === id;
    return (
      <div
        key={id}
        className={`tab-item ${isActive ? 'active' : ''}`}
        onClick={() => handleNavigate(id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleNavigate(id);
          }
        }}
      >
        <span className="tab-icon">{icon}</span>
        <span className="tab-label">{label}</span>
      </div>
    );
  };

  return (
    <div className={`mobile-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Screens */}
      {renderScreen()}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {renderBottomTab('home', <HomeIcon />, 'Home')}
        {renderBottomTab('calendar', <CalendarIcon />, 'Kalender')}
        {renderBottomTab('payslip', <FileIcon />, 'Slip Gaji')}
        {renderBottomTab('team', <UsersIcon />, 'Tim')}
      </div>

      {/* Side Menu */}
      <BottomSheet
        visible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Menu"
      >
        {/* User Info */}
        <div className="menu-user">
          <div className="menu-avatar">
            <span className="menu-avatar-text">BS</span>
          </div>
          <div className="menu-user-info">
            <span className="menu-user-name">Budi Santoso</span>
            <span className="menu-user-role">Product Designer</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              title={item.label}
              leftContent={item.icon}
              onPress={() => handleNavigate(item.id)}
              showDivider
            />
          ))}
        </div>

        {/* Settings */}
        <div className="menu-section">
          <span className="menu-section-title">Pengaturan</span>

          <ListItem
            title={isDarkMode ? 'Dark Mode' : 'Light Mode'}
            leftContent={isDarkMode ? <MoonIcon /> : <SunIcon />}
            onPress={() => setIsDarkMode(!isDarkMode)}
            showDivider
          />

          <ListItem
            title="Pengaturan Akun"
            leftContent={<SettingsIcon />}
            onPress={() => { }}
            showDivider
          />
        </div>

        {/* Logout */}
        <div className="menu-logout">
          <ListItem
            title="Keluar"
            leftContent={<LogOutIcon />}
            onPress={handleLogout}
          />
        </div>

        <div style={{ height: 40 }} />
      </BottomSheet>
    </div>
  );
}