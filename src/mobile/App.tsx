import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LeaveRequestScreen } from './screens/LeaveRequestScreen';
import { BottomSheet } from './components/molecules/BottomSheet';
import { ListItem } from './components/molecules/ListItem';
import { colors, typography, spacing } from './design-system/tokens';

// Icons
const HomeIcon = () => <Text>🏠</Text>;
const CalendarIcon = () => <Text>📅</Text>;
const FileIcon = () => <Text>📄</Text>;
const UsersIcon = () => <Text>👥</Text>;
const UserIcon = () => <Text>👤</Text>;
const FolderIcon = () => <Text>📁</Text>;
const ClockIcon = () => <Text>⏰</Text>;
const LogOutIcon = () => <Text>🚪</Text>;
const SettingsIcon = () => <Text>⚙️</Text>;
const MoonIcon = () => <Text>🌙</Text>;
const SunIcon = () => <Text>☀️</Text>;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state
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
      <SafeAreaProvider>
        <LoginScreen 
          onLogin={handleLogin} 
          onForgotPassword={handleForgotPassword} 
        />
      </SafeAreaProvider>
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
      // Add other screens here
      default:
        return <HomeScreen onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} onLogout={handleLogout} />;
    }
  };

  const renderBottomTab = (id: string, icon: React.ReactNode, label: string) => {
    const isActive = currentScreen === id;
    return (
      <Pressable
        key={id}
        style={styles.tabItem}
        onPress={() => handleNavigate(id)}
      >
        <View style={styles.tabIcon}>{icon}</View>
        <Text
          style={[
            styles.tabLabel,
            {
              color: isActive
                ? colors.primary
                : isDarkMode
                ? colors.text.tertiary.dark
                : colors.text.tertiary.light,
            },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaProvider>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode
              ? colors.background.dark
              : colors.background.light,
          },
        ]}
      >
        {/* Screens */}
        {renderScreen()}

        {/* Bottom Navigation */}
        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: isDarkMode
                ? 'rgba(10, 10, 10, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              borderTopColor: isDarkMode ? colors.border.dark : colors.border.light,
            },
          ]}
        >
          {renderBottomTab('home', <HomeIcon />, 'Home')}
          {renderBottomTab('calendar', <CalendarIcon />, 'Kalender')}
          {renderBottomTab('payslip', <FileIcon />, 'Slip Gaji')}
          {renderBottomTab('team', <UsersIcon />, 'Tim')}
        </View>

        {/* Side Menu */}
        <BottomSheet
          visible={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          title="Menu"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* User Info */}
            <View style={styles.menuUser}>
              <View style={styles.menuAvatar}>
                <Text style={styles.menuAvatarText}>BS</Text>
              </View>
              <View style={styles.menuUserInfo}>
                <Text
                  style={[
                    styles.menuUserName,
                    {
                      color: isDarkMode
                        ? colors.text.primary.dark
                        : colors.text.primary.light,
                    },
                  ]}
                >
                  Budi Santoso
                </Text>
                <Text
                  style={[
                    styles.menuUserRole,
                    {
                      color: isDarkMode
                        ? colors.text.secondary.dark
                        : colors.text.secondary.light,
                    },
                  ]}
                >
                  Product Designer
                </Text>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItems}>
              {menuItems.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.label}
                  leftContent={item.icon}
                  onPress={() => handleNavigate(item.id)}
                  showDivider
                />
              ))}
            </View>

            {/* Settings */}
            <View style={styles.menuSection}>
              <Text
                style={[
                  styles.menuSectionTitle,
                  {
                    color: isDarkMode
                      ? colors.text.tertiary.dark
                      : colors.text.tertiary.light,
                  },
                ]}
              >
                Pengaturan
              </Text>

              <ListItem
                title={isDarkMode ? 'Dark Mode' : 'Light Mode'}
                leftContent={isDarkMode ? <MoonIcon /> : <SunIcon />}
                onPress={() => setIsDarkMode(!isDarkMode)}
                showDivider
              />

              <ListItem
                title="Pengaturan Akun"
                leftContent={<SettingsIcon />}
                onPress={() => {}}
                showDivider
              />
            </View>

            {/* Logout */}
            <View style={styles.menuLogout}>
              <ListItem
                title="Keluar"
                leftContent={<LogOutIcon />}
                onPress={handleLogout}
              />
            </View>

            <View style={{ height: spacing['2xl'] }} />
          </ScrollView>
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  tabIcon: {
    marginBottom: spacing.xs,
  },
  tabLabel: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.xs,
  },
  menuUser: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuAvatarText: {
    fontFamily: typography.family.bold,
    fontSize: typography.size.xl,
    color: '#18181b',
  },
  menuUserInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  menuUserName: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.lg,
    marginBottom: spacing.xs,
  },
  menuUserRole: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.base,
  },
  menuItems: {
    paddingTop: spacing.sm,
  },
  menuSection: {
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  menuSectionTitle: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.xs,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    letterSpacing: typography.letterSpacing.wide,
  },
  menuLogout: {
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});