import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/organisms/Header';
import { Card } from '../components/atoms/Card';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { StatCard } from '../components/molecules/StatCard';
import { ListItem } from '../components/molecules/ListItem';
import { colors, typography, spacing, borderRadius } from '../design-system/tokens';

// Icons
const BackIcon = () => <Text>←</Text>;
const CheckIcon = () => <Text>✓</Text>;
const ClockIcon = () => <Text>⏰</Text>;
const XIcon = () => <Text>✕</Text>;

interface LeaveRequestScreenProps {
  onBack: () => void;
}

export const LeaveRequestScreen: React.FC<LeaveRequestScreenProps> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const isDark = false; // Would come from theme context

  const leaveBalance = [
    { label: 'Sisa Cuti', value: '12', subtitle: 'hari' },
    { label: 'Sakit', value: '12', subtitle: 'hari' },
    { label: 'Total', value: '14', subtitle: 'hari' },
  ];

  const leaveHistory = [
    {
      id: '1',
      type: 'Cuti Tahunan',
      startDate: '5 Jan 2026',
      endDate: '7 Jan 2026',
      days: '3 hari',
      reason: 'Liburan keluarga',
      status: 'approved',
      appliedDate: '20 Des 2025',
    },
    {
      id: '2',
      type: 'Cuti Sakit',
      startDate: '15 Des 2025',
      endDate: '16 Des 2025',
      days: '2 hari',
      reason: 'Demam dan flu',
      status: 'approved',
      appliedDate: '15 Des 2025',
    },
    {
      id: '3',
      type: 'Cuti Tahunan',
      startDate: '20 Des 2025',
      endDate: '22 Des 2025',
      days: '3 hari',
      reason: 'Acara keluarga',
      status: 'pending',
      appliedDate: '18 Des 2025',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: {
        backgroundColor: 'rgba(163, 230, 53, 0.1)',
        color: colors.success,
        icon: <CheckIcon />,
        label: 'Disetujui',
      },
      pending: {
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        color: colors.warning,
        icon: <ClockIcon />,
        label: 'Menunggu',
      },
      rejected: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: colors.error,
        icon: <XIcon />,
        label: 'Ditolak',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: config.backgroundColor },
        ]}
      >
        <Text style={[styles.statusText, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    );
  };

  const renderLeaveItem = ({ item }: { item: typeof leaveHistory[0] }) => (
    <Card variant="outlined" style={styles.leaveItem}>
      <View style={styles.leaveHeader}>
        <View style={styles.leaveInfo}>
          <Text
            style={[
              styles.leaveType,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            {item.type}
          </Text>
          <Text
            style={[
              styles.leaveDates,
              { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
            ]}
          >
            {item.startDate} - {item.endDate} • {item.days}
          </Text>
        </View>
        {getStatusBadge(item.status)}
      </View>

      <View
        style={[
          styles.leaveReason,
          {
            backgroundColor: isDark
              ? colors.surfaceSecondary.dark
              : colors.surfaceSecondary.light,
          },
        ]}
      >
        <Text
          style={[
            styles.leaveReasonLabel,
            { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
          ]}
        >
          Alasan:
        </Text>
        <Text
          style={[
            styles.leaveReasonText,
            { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
          ]}
        >
          {item.reason}
        </Text>
      </View>

      <Text
        style={[
          styles.leaveAppliedDate,
          { color: isDark ? colors.text.tertiary.dark : colors.text.tertiary.light },
        ]}
      >
        Diajukan: {item.appliedDate}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.background.dark : colors.background.light },
      ]}
      edges={['top']}
    >
      <Header
        leftAction={{
          icon: <BackIcon />,
          onPress: onBack,
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View
          style={[
            styles.titleContainer,
            { backgroundColor: isDark ? colors.background.dark : colors.background.light },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            Pengajuan Cuti
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light },
            ]}
          >
            Kelola Cuti Tahunan
          </Text>
        </View>

        {/* Leave Balance */}
        <View style={styles.section}>
          <View style={styles.balanceGrid}>
            {leaveBalance.map((item, index) => (
              <View key={index} style={styles.balanceItem}>
                <StatCard
                  label={item.label}
                  value={item.value}
                  subtitle={item.subtitle}
                  variant={index === 0 ? 'gradient' : 'default'}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Apply Leave Button */}
        <View style={styles.section}>
          <Button
            title="Ajukan Cuti Baru"
            onPress={() => setShowForm(!showForm)}
            fullWidth
          />
        </View>

        {/* Leave Form */}
        {showForm && (
          <View style={styles.section}>
            <Card variant="outlined">
              <Text
                style={[
                  styles.formTitle,
                  { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
                ]}
              >
                Form Pengajuan Cuti
              </Text>

              <Input
                label="Jenis Cuti"
                value=""
                onChangeText={() => {}}
                placeholder="Pilih jenis cuti"
              />

              <View style={styles.dateRow}>
                <View style={styles.dateColumn}>
                  <Input
                    label="Tanggal Mulai"
                    value=""
                    onChangeText={() => {}}
                    placeholder="DD/MM/YYYY"
                  />
                </View>
                <View style={styles.dateColumn}>
                  <Input
                    label="Tanggal Selesai"
                    value=""
                    onChangeText={() => {}}
                    placeholder="DD/MM/YYYY"
                  />
                </View>
              </View>

              <Input
                label="Alasan"
                value=""
                onChangeText={() => {}}
                placeholder="Jelaskan alasan pengajuan cuti..."
                multiline
                numberOfLines={3}
              />

              <View style={styles.formActions}>
                <View style={styles.formButton}>
                  <Button
                    title="Batal"
                    onPress={() => setShowForm(false)}
                    variant="outline"
                    fullWidth
                  />
                </View>
                <View style={styles.formButton}>
                  <Button title="Ajukan Cuti" onPress={() => {}} fullWidth />
                </View>
              </View>
            </Card>
          </View>
        )}

        {/* Leave History */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? colors.text.primary.dark : colors.text.primary.light },
            ]}
          >
            Riwayat Pengajuan
          </Text>
          <FlatList
            data={leaveHistory}
            renderItem={renderLeaveItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          />
        </View>

        <View style={{ height: spacing.xl }} />
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
  },
  titleContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: typography.family.bold,
    fontSize: typography.size['2xl'],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.base,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.base,
    marginBottom: spacing.md,
  },
  balanceGrid: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm,
  },
  balanceItem: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  formTitle: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.lg,
    marginBottom: spacing.lg,
  },
  dateRow: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm,
  },
  dateColumn: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  formActions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginHorizontal: -spacing.sm,
  },
  formButton: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  leaveItem: {
    marginBottom: 0,
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  leaveInfo: {
    flex: 1,
  },
  leaveType: {
    fontFamily: typography.family.semiBold,
    fontSize: typography.size.base,
    marginBottom: spacing.xs,
  },
  leaveDates: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  statusText: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.xs,
  },
  leaveReason: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  leaveReasonLabel: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
    marginBottom: spacing.xs,
  },
  leaveReasonText: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.base,
  },
  leaveAppliedDate: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
  },
});
