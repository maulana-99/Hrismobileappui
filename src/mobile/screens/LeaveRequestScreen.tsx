import React, { useState } from 'react';
import { Header } from '../components/organisms/Header';
import { Card } from '../components/atoms/Card';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { StatCard } from '../components/molecules/StatCard';
import '../styles/mobile.css';

// Icons
const BackIcon = () => <span>←</span>;
const CheckIcon = () => <span>✓</span>;
const ClockIcon = () => <span>⏰</span>;
const XIcon = () => <span>✕</span>;

interface LeaveRequestScreenProps {
  onBack: () => void;
}

export const LeaveRequestScreen: React.FC<LeaveRequestScreenProps> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Disetujui';
      case 'pending':
        return 'Menunggu';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  const renderLeaveItem = (item: typeof leaveHistory[0]) => (
    <Card key={item.id} variant="outlined" className="leave-item">
      <div className="leave-header">
        <div className="leave-info">
          <span className="leave-type">{item.type}</span>
          <span className="leave-dates">
            {item.startDate} - {item.endDate} • {item.days}
          </span>
        </div>
        <div className={`status-badge ${item.status}`}>
          <span className={`status-text ${item.status}`}>
            {getStatusLabel(item.status)}
          </span>
        </div>
      </div>

      <div className="leave-reason">
        <span className="leave-reason-label">Alasan:</span>
        <span className="leave-reason-text">{item.reason}</span>
      </div>

      <span className="leave-applied-date">Diajukan: {item.appliedDate}</span>
    </Card>
  );

  return (
    <div className="mobile-container flex-1">
      <Header
        leftAction={{
          icon: <BackIcon />,
          onPress: onBack,
        }}
      />

      <div className="scroll-view">
        <div className="title-container">
          <span className="page-title">Pengajuan Cuti</span>
          <span className="page-subtitle">Kelola Cuti Tahunan</span>
        </div>

        {/* Leave Balance */}
        <div className="section content-padding">
          <div className="balance-grid">
            {leaveBalance.map((item, index) => (
              <div key={index} className="balance-item">
                <StatCard
                  label={item.label}
                  value={item.value}
                  subtitle={item.subtitle}
                  variant={index === 0 ? 'gradient' : 'default'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Apply Leave Button */}
        <div className="section content-padding">
          <Button
            title="Ajukan Cuti Baru"
            onPress={() => setShowForm(!showForm)}
            fullWidth
          />
        </div>

        {/* Leave Form */}
        {showForm && (
          <div className="section content-padding">
            <Card variant="outlined">
              <span className="form-title">Form Pengajuan Cuti</span>

              <Input
                label="Jenis Cuti"
                value=""
                onChangeText={() => { }}
                placeholder="Pilih jenis cuti"
              />

              <div className="date-row">
                <div className="date-column">
                  <Input
                    label="Tanggal Mulai"
                    value=""
                    onChangeText={() => { }}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div className="date-column">
                  <Input
                    label="Tanggal Selesai"
                    value=""
                    onChangeText={() => { }}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>

              <Input
                label="Alasan"
                value=""
                onChangeText={() => { }}
                placeholder="Jelaskan alasan pengajuan cuti..."
                multiline
                numberOfLines={3}
              />

              <div className="form-actions">
                <div className="form-button">
                  <Button
                    title="Batal"
                    onPress={() => setShowForm(false)}
                    variant="outline"
                    fullWidth
                  />
                </div>
                <div className="form-button">
                  <Button title="Ajukan Cuti" onPress={() => { }} fullWidth />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Leave History */}
        <div className="section content-padding">
          <span className="section-title">Riwayat Pengajuan</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {leaveHistory.map(renderLeaveItem)}
          </div>
        </div>

        <div style={{ height: 32 }} />
      </div>
    </div>
  );
};
