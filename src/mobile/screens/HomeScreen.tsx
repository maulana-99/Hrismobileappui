import React from 'react';
import { Header } from '../components/organisms/Header';
import { Card } from '../components/atoms/Card';
import { StatCard } from '../components/molecules/StatCard';
import { Button } from '../components/atoms/Button';
import '../styles/mobile.css';

// Icons
const MenuIcon = () => <span>☰</span>;
const BellIcon = () => <span>🔔</span>;
const ClockIcon = () => <span>⏰</span>;
const CalendarIcon = () => <span>📅</span>;
const FileIcon = () => <span>📄</span>;
const UserIcon = () => <span>👤</span>;
const DollarIcon = () => <span>💰</span>;
const SunIcon = () => <span style={{ fontSize: 16 }}>☀️</span>;
const MoonIcon = () => <span style={{ fontSize: 16 }}>🌙</span>;

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpenMenu: () => void;
  onLogout?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenMenu, onLogout }) => {
  const quickActions = [
    {
      id: 'leave',
      label: 'Ajukan Cuti',
      icon: <CalendarIcon />,
    },
    {
      id: 'payslip',
      label: 'Slip Gaji',
      icon: <FileIcon />,
    },
    {
      id: 'permission',
      label: 'Izin Kerja',
      icon: <UserIcon />,
    },
    {
      id: 'reimburse',
      label: 'Reimburse',
      icon: <DollarIcon />,
    },
  ];

  const schedule = [
    {
      time: '09:00',
      title: 'Team Standup',
      location: 'Meeting Room A • 30 min',
    },
    {
      time: '14:00',
      title: 'Design Review',
      location: 'Virtual • 1 hour',
    },
  ];

  const announcements = [
    {
      title: 'Libur Tahun Baru 2026',
      description: 'Kantor tutup tanggal 31 Des - 2 Jan',
      time: '2 hari lalu',
      important: true,
    },
    {
      title: 'Update Kebijakan Cuti',
      description: 'Cek email untuk info lengkap',
      time: '1 minggu lalu',
      important: false,
    },
  ];

  // Shift data
  const currentShift = {
    name: 'Shift Pagi',
    icon: <SunIcon />,
    timeStart: '08:00',
    timeEnd: '16:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    status: 'active',
  };

  const weeklyShifts = [
    { day: 'Sen', date: '3', shift: 'Pagi', icon: <SunIcon />, isToday: false },
    { day: 'Sel', date: '4', shift: 'Pagi', icon: <SunIcon />, isToday: true },
    { day: 'Rab', date: '5', shift: 'Siang', icon: <MoonIcon />, isToday: false },
    { day: 'Kam', date: '6', shift: 'Siang', icon: <MoonIcon />, isToday: false },
    { day: 'Jum', date: '7', shift: 'Pagi', icon: <SunIcon />, isToday: false },
    { day: 'Sab', date: '8', shift: 'Libur', icon: null, isToday: false },
    { day: 'Min', date: '9', shift: 'Libur', icon: null, isToday: false },
  ];

  return (
    <div className="mobile-container flex-1">
      <Header
        title="Budi Santoso"
        subtitle="Selamat Pagi,"
        variant="large"
        leftAction={{
          icon: <MenuIcon />,
          onPress: onOpenMenu,
        }}
        rightAction={{
          icon: <BellIcon />,
          onPress: () => { },
          badge: true,
        }}
      />

      <div className="scroll-view content-padding">
        {/* Clock In Button */}
        <Card variant="elevated" className="section">
          <div className="clock-in-container">
            <div className="clock-in-info">
              <span className="clock-in-label">Belum Clock In</span>
              <span className="clock-in-time">08:45 WIB</span>
              <span className="clock-in-date">Rabu, 25 Des 2025</span>
            </div>
            <button className="clock-in-button pressable">
              <ClockIcon />
            </button>
          </div>
        </Card>

        {/* Shift Section */}
        <div className="section">
          <div className="section-header">
            <span className="section-title" style={{ marginBottom: 0 }}>Shift Anda</span>
            <span className="see-all-link">Lihat Semua</span>
          </div>

          {/* Current Shift Card */}
          <div className="shift-card-container">
            <div className="shift-card">
              <div className="shift-card-glow" />
              <div className="shift-card-content">
                <div className="shift-card-header">
                  <div className="shift-icon-container">
                    {currentShift.icon}
                  </div>
                  <div className="shift-status-badge">
                    <span className="shift-status-dot" />
                    <span className="shift-status-text">Aktif</span>
                  </div>
                </div>
                <div className="shift-name">{currentShift.name}</div>
                <div className="shift-time-row">
                  <div className="shift-time-block">
                    <span className="shift-time-label">Mulai</span>
                    <span className="shift-time-value">{currentShift.timeStart}</span>
                  </div>
                  <div className="shift-time-divider">
                    <span className="shift-time-divider-text">→</span>
                  </div>
                  <div className="shift-time-block">
                    <span className="shift-time-label">Selesai</span>
                    <span className="shift-time-value">{currentShift.timeEnd}</span>
                  </div>
                </div>
                <div className="shift-break-info">
                  <span className="shift-break-text">
                    ☕ Istirahat: {currentShift.breakStart} - {currentShift.breakEnd}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Shift Schedule */}
          <div className="weekly-shift-container">
            <span className="weekly-shift-title">Jadwal Minggu Ini</span>
            <div className="weekly-shift-grid">
              {weeklyShifts.map((item, index) => (
                <div
                  key={index}
                  className={`weekly-shift-item ${item.isToday ? 'today' : ''} ${item.shift === 'Libur' ? 'off-day' : ''}`}
                >
                  <span className="weekly-shift-day">{item.day}</span>
                  <span className="weekly-shift-date">{item.date}</span>
                  <div className="weekly-shift-icon">
                    {item.icon ? item.icon : <span className="weekly-shift-off-text">-</span>}
                  </div>
                  <span className="weekly-shift-label">{item.shift}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="section">
          <div className="stats-grid">
            <div className="stat-column">
              <StatCard label="Sisa Cuti" value="12" subtitle="dari 14 hari" />
            </div>
            <div className="stat-column">
              <StatCard label="Kehadiran" value="28" subtitle="hari berturut-turut" />
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="section">
          <span className="section-title">Jadwal Hari Ini</span>
          <Card variant="outlined">
            {schedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <span className="schedule-time">{item.time}</span>
                <div className="schedule-content">
                  <span className="schedule-title">{item.title}</span>
                  <span className="schedule-location">{item.location}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="section">
          <span className="section-title">Quick Actions</span>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className="quick-action pressable"
                onClick={() => onNavigate(action.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onNavigate(action.id);
                  }
                }}
              >
                <span className="quick-action-icon">{action.icon}</span>
                <span className="quick-action-label">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="section last-section">
          <span className="section-title">Pengumuman</span>
          {announcements.map((announcement, index) => (
            <Card
              key={index}
              variant="outlined"
              style={index > 0 ? { marginTop: 16 } : undefined}
            >
              <div className="announcement">
                {announcement.important && <div className="announcement-badge" />}
                <div className="announcement-content">
                  <span className="announcement-title">{announcement.title}</span>
                  <span className="announcement-description">{announcement.description}</span>
                  <span className="announcement-time">{announcement.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        {onLogout && (
          <div className="section last-section">
            <Button variant="outlined" onPress={onLogout} fullWidth>
              🚪 Keluar / Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};