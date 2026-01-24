import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/organisms/Header';
import { Card } from '../components/atoms/Card';
import { StatCard } from '../components/molecules/StatCard';
import { Button } from '../components/atoms/Button';
import { colors, typography, spacing, borderRadius } from '../design-system/tokens';

// Icons would come from react-native-vector-icons or similar
const MenuIcon = () => <Text>☰</Text>;
const BellIcon = () => <Text>🔔</Text>;
const ClockIcon = () => <Text>⏰</Text>;
const CalendarIcon = () => <Text>📅</Text>;
const FileIcon = () => <Text>📄</Text>;
const UserIcon = () => <Text>👤</Text>;
const DollarIcon = () => <Text>💰</Text>;

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpenMenu: () => void;
  onLogout?: () => void; // Add logout handler
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenMenu, onLogout }) => {
  const isDark = false; // Would come from theme context

  const quickActions = [
    {
      id: 'leave',
      label: 'Ajukan Cuti',
      icon: <CalendarIcon />,
      color: colors.gradients.blue,
    },
    {
      id: 'payslip',
      label: 'Slip Gaji',
      icon: <FileIcon />,
      color: colors.gradients.purple,
    },
    {
      id: 'permission',
      label: 'Izin Kerja',
      icon: <UserIcon />,
      color: colors.gradients.orange,
    },
    {
      id: 'reimburse',
      label: 'Reimburse',
      icon: <DollarIcon />,
      color: colors.gradients.emerald,
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

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.background.dark : colors.background.light },
      ]}
      edges={['top']}
    >
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
          onPress: () => {},
          badge: true,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Clock In Button */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.clockInContainer}>
            <View style={styles.clockInInfo}>
              <Text
                style={[
                  styles.clockInLabel,
                  { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
                ]}
              >
                Belum Clock In
              </Text>
              <Text
                style={[
                  styles.clockInTime,
                  { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
                ]}
              >
                08:45 WIB
              </Text>
              <Text
                style={[
                  styles.clockInDate,
                  { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
                ]}
              >
                Rabu, 25 Des 2025
              </Text>
            </View>
            <Pressable style={styles.clockInButton}>
              <ClockIcon />
            </Pressable>
          </View>
        </Card>

        {/* Stats Overview */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <View style={styles.statColumn}>
              <StatCard label="Sisa Cuti" value="12" subtitle="dari 14 hari" />
            </View>
            <View style={styles.statColumn}>
              <StatCard label="Kehadiran" value="28" subtitle="hari berturut-turut" />
            </View>
          </View>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            Jadwal Hari Ini
          </Text>
          <Card variant="outlined">
            {schedule.map((item, index) => (
              <View key={index} style={[styles.scheduleItem, index > 0 && styles.scheduleItemSpacing]}>
                <Text
                  style={[
                    styles.scheduleTime,
                    { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
                  ]}
                >
                  {item.time}
                </Text>
                <View style={styles.scheduleContent}>
                  <Text
                    style={[
                      styles.scheduleTitle,
                      { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.scheduleLocation,
                      { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
                    ]}
                  >
                    {item.location}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                onPress={() => onNavigate(action.id)}
                style={({ pressed }) => [
                  styles.quickAction,
                  {
                    backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
                    borderColor: isDark ? colors.border.dark : colors.border.light,
                  },
                  pressed && styles.quickActionPressed,
                ]}
              >
                <View style={styles.quickActionIcon}>{action.icon}</View>
                <Text
                  style={[
                    styles.quickActionLabel,
                    { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Announcements */}
        <View style={[styles.section, styles.lastSection]}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            Pengumuman
          </Text>
          {announcements.map((announcement, index) => (
            <Card
              key={index}
              variant="outlined"
              style={index > 0 && { marginTop: spacing.md }}
              onPress={() => {}}
            >
              <View style={styles.announcement}>
                {announcement.important && <View style={styles.announcementBadge} />}
                <View style={styles.announcementContent}>
                  <Text
                    style={[
                      styles.announcementTitle,
                      { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
                    ]}
                  >
                    {announcement.title}
                  </Text>
                  <Text
                    style={[
                      styles.announcementDescription,
                      { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
                    ]}
                  >
                    {announcement.description}
                  </Text>
                  <Text
                    style={[
                      styles.announcementTime,
                      { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
                    ]}
                  >
                    {announcement.time}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Logout Button */}
        {onLogout && (
          <View style={[styles.section, styles.lastSection]}>
            <Button
              variant="outlined"
              onPress={onLogout}
              fullWidth
            >
              🚪 Keluar / Logout
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginTop: spacing.lg,
  },
  lastSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.base,
    marginBottom: spacing.md,
  },
  clockInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clockInInfo: {
    flex: 1,
  },
  clockInLabel: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  clockInTime: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['3xl'],
    marginBottom: spacing.xs,
  },
  clockInDate: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
  },
  clockInButton: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm,
  },
  statColumn: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  scheduleItem: {
    flexDirection: 'row',
  },
  scheduleItemSpacing: {
    marginTop: spacing.md,
  },
  scheduleTime: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    width: 48,
    paddingTop: spacing.xs,
  },
  scheduleContent: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary.light,
    borderRadius: borderRadius.md,
  },
  scheduleTitle: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.base,
    marginBottom: spacing.xs,
  },
  scheduleLocation: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  quickAction: {
    width: '50%',
    padding: spacing.sm,
  },
  quickActionInner: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    minHeight: 100,
  },
  quickActionPressed: {
    opacity: 0.7,
  },
  quickActionIcon: {
    marginBottom: spacing.md,
  },
  quickActionLabel: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.base,
  },
  announcement: {
    flexDirection: 'row',
  },
  announcementBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
    marginTop: spacing.sm,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.base,
    marginBottom: spacing.xs,
  },
  announcementDescription: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  announcementTime: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
  },
});