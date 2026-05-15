import React, { useState } from 'react';
import { Header } from '../components/organisms/Header';
import { Card } from '../components/atoms/Card';
import { Button } from '../components/atoms/Button';
import '../styles/mobile.css';

// Currency formatter for Indonesian Rupiah
const formatRupiah = (amount: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

// Icons
const BackIcon = () => <span>←</span>;
const MoreIcon = () => <span>⋮</span>;
const DownloadIcon = () => <span>⬇</span>;
const WalletIcon = () => <span>💰</span>;
const ChevronDownIcon = () => <span>▾</span>;

interface PayslipScreenProps {
  onBack: () => void;
}

// --- Donut Chart Component ---
interface DonutChartProps {
  earnings: number;
  deductions: number;
  grossPay: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ earnings, deductions, grossPay }) => {
  const total = earnings + deductions;
  const size = 200;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const earningsPercent = total > 0 ? earnings / total : 0;
  const deductionsPercent = total > 0 ? deductions / total : 0;

  const earningsArc = circumference * earningsPercent;
  const deductionsArc = circumference * deductionsPercent;
  const gap = 4; // small gap between arcs

  return (
    <div className="payslip-donut-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--border-light)"
          strokeWidth={strokeWidth}
        />
        {/* Earnings arc (indigo) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#5B4CC4"
          strokeWidth={strokeWidth}
          strokeDasharray={`${earningsArc - gap} ${circumference - earningsArc + gap}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          className="payslip-donut-arc"
        />
        {/* Deductions arc (golden yellow) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F5C542"
          strokeWidth={strokeWidth}
          strokeDasharray={`${deductionsArc - gap} ${circumference - deductionsArc + gap}`}
          strokeDashoffset={circumference * 0.25 - earningsArc}
          strokeLinecap="round"
          className="payslip-donut-arc"
        />
      </svg>
      <div className="payslip-donut-center">
        <span className="payslip-donut-amount" style={{ fontSize: '22px' }}>{formatRupiah(grossPay)}</span>
        <span className="payslip-donut-label">Gaji Kotor</span>
      </div>
    </div>
  );
};

// --- Legend Item Component ---
interface LegendItemProps {
  color: string;
  amount: number;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, amount, label }) => (
  <div className="payslip-legend-item">
    <div className="payslip-legend-dot" style={{ backgroundColor: color }} />
    <div className="payslip-legend-text">
      <span className="payslip-legend-amount">{formatRupiah(amount)}</span>
      <span className="payslip-legend-label">{label}</span>
    </div>
  </div>
);

// --- Amount Row Component ---
interface AmountRowProps {
  label: string;
  amount: number;
  isTotal?: boolean;
  totalColor?: string;
  showTopBorder?: boolean;
}

const AmountRow: React.FC<AmountRowProps> = ({ label, amount, isTotal = false, totalColor, showTopBorder = false }) => (
  <div className={`payslip-amount-row ${isTotal ? 'payslip-amount-row-total' : ''} ${showTopBorder ? 'payslip-amount-row-border' : ''}`}>
    <span
      className={`payslip-amount-label ${isTotal ? 'payslip-amount-label-total' : ''}`}
      style={totalColor ? { color: totalColor } : undefined}
    >
      {label}
    </span>
    <span
      className={`payslip-amount-value ${isTotal ? 'payslip-amount-value-total' : ''}`}
      style={totalColor ? { color: totalColor } : undefined}
    >
      {formatRupiah(amount)}
    </span>
  </div>
);

// --- Pagination Dots Component ---
interface PaginationDotsProps {
  total: number;
  active: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ total, active }) => (
  <div className="payslip-pagination">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`payslip-dot ${i === active ? 'payslip-dot-active' : ''}`}
      />
    ))}
  </div>
);

// --- Main PayslipScreen Component ---
export const PayslipScreen: React.FC<PayslipScreenProps> = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(5); // June (0-indexed)
  const [activePage, setActivePage] = useState(0);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const years = [2022, 2023, 2024, 2025, 2026];

  // Data slip gaji
  const payslipData = {
    earnings: {
      items: [
        { label: 'Gaji Pokok', amount: 8000000 },
        { label: 'Tunjangan Jabatan', amount: 2000000 },
        { label: 'Tunjangan Transport', amount: 1500000 },
        { label: 'Tunjangan Makan', amount: 1000000 },
      ],
      total: 12500000,
    },
    deductions: {
      items: [
        { label: 'PPh 21', amount: 750000 },
        { label: 'BPJS Kesehatan', amount: 80000 },
        { label: 'BPJS Ketenagakerjaan', amount: 160000 },
        { label: 'Jaminan Pensiun', amount: 80000 },
      ],
      total: 1070000,
    },
    bpjs: {
      employee: [
        { label: 'BPJS Kesehatan', amount: 80000, description: '1% dari gaji pokok' },
        { label: 'JHT', amount: 160000, description: '2% dari gaji pokok' },
        { label: 'JP', amount: 80000, description: '1% dari gaji pokok' },
      ],
      employer: [
        { label: 'BPJS Kesehatan', amount: 320000, description: '4% dari gaji pokok' },
        { label: 'JHT', amount: 296000, description: '3.7% dari gaji pokok' },
        { label: 'JKK', amount: 19200, description: '0.24% dari gaji pokok' },
        { label: 'JKM', amount: 24000, description: '0.3% dari gaji pokok' },
        { label: 'JP', amount: 160000, description: '2% dari gaji pokok' },
      ],
      totalEmployee: 320000,
      totalEmployer: 819200,
    },
    attendance: {
      workingDays: 22,
      totalDays: 22,
      proratePercentage: 100,
    },
    grossPay: 12500000,
    netPay: 11430000,
  };

  return (
    <div className="mobile-container flex-1">
      {/* App Bar */}
      <div className="payslip-appbar">
        <button className="header-action pressable" onClick={onBack} aria-label="Back">
          <BackIcon />
        </button>
        <span className="payslip-appbar-title">Slip Gaji</span>
        <button className="header-action pressable" aria-label="More options">
          <MoreIcon />
        </button>
      </div>

      <div className="scroll-view">
        {/* Period Filter Section */}
        <div className="payslip-filter-section content-padding">
          {/* Year Selector */}
          <div className="payslip-year-selector" onClick={() => setShowYearDropdown(!showYearDropdown)}>
            <span className="payslip-year-text">{selectedYear}</span>
            <ChevronDownIcon />
          </div>
          {showYearDropdown && (
            <div className="payslip-year-dropdown">
              {years.map((year) => (
                <div
                  key={year}
                  className={`payslip-year-option ${year === selectedYear ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedYear(year);
                    setShowYearDropdown(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}

          {/* Month Tabs */}
          <div className="payslip-month-tabs">
            {months.map((month, index) => (
              <button
                key={month}
                className={`payslip-month-tab ${index === selectedMonth ? 'active' : ''}`}
                onClick={() => setSelectedMonth(index)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Payslip Summary Card — Donut Chart */}
        <div className="content-padding">
          <Card variant="elevated" className="payslip-summary-card">
            <p className="payslip-description">
              Gaji kotor bulan <strong>{months[selectedMonth]}</strong> yang diterima
            </p>

            <DonutChart
              earnings={payslipData.earnings.total}
              deductions={payslipData.deductions.total}
              grossPay={payslipData.grossPay}
            />

            <div className="payslip-legend-row">
              <LegendItem color="#5B4CC4" amount={payslipData.earnings.total} label="Pendapatan" />
              <LegendItem color="#F5C542" amount={payslipData.deductions.total} label="Potongan" />
            </div>
          </Card>
        </div>

        {/* Salary Breakdown — Earnings */}
        <div className="content-padding section">
          <Card variant="elevated" className="payslip-breakdown-card">
            <div className="payslip-section-header">
              <span className="payslip-section-icon"><WalletIcon /></span>
              <span className="payslip-section-title">Detail Pendapatan</span>
            </div>

            <div className="payslip-table">
              {payslipData.earnings.items.map((item, idx) => (
                <AmountRow key={idx} label={item.label} amount={item.amount} />
              ))}
              <AmountRow
                label="Total Pendapatan"
                amount={payslipData.earnings.total}
                isTotal
                totalColor="#5B4CC4"
                showTopBorder
              />
            </div>
          </Card>
        </div>

        {/* Salary Breakdown — Deductions */}
        <div className="content-padding section">
          <Card variant="elevated" className="payslip-breakdown-card">
            <div className="payslip-section-header">
              <span className="payslip-section-icon">📉</span>
              <span className="payslip-section-title">Detail Potongan</span>
            </div>

            <div className="payslip-table">
              {payslipData.deductions.items.map((item, idx) => (
                <AmountRow key={idx} label={item.label} amount={item.amount} />
              ))}
              <AmountRow
                label="Total Potongan"
                amount={payslipData.deductions.total}
                isTotal
                totalColor="#F5C542"
                showTopBorder
              />
            </div>
          </Card>
        </div>

        {/* BPJS Contributions */}
        <div className="content-padding section">
          <Card variant="elevated" className="payslip-breakdown-card">
            <div className="payslip-section-header">
              <span className="payslip-section-icon">🏥</span>
              <span className="payslip-section-title">Kontribusi BPJS</span>
            </div>

            {/* Employee */}
            <span className="payslip-sub-section-label">KONTRIBUSI KARYAWAN</span>
            <div className="payslip-table">
              {payslipData.bpjs.employee.map((item, idx) => (
                <div key={idx} className="payslip-amount-row">
                  <div className="payslip-amount-label-group">
                    <span className="payslip-amount-label">{item.label}</span>
                    <span className="payslip-amount-desc">{item.description}</span>
                  </div>
                  <span className="payslip-amount-value">
                    {formatRupiah(item.amount)}
                  </span>
                </div>
              ))}
              <AmountRow
                label="Total Karyawan"
                amount={payslipData.bpjs.totalEmployee}
                isTotal
                totalColor="#5B4CC4"
                showTopBorder
              />
            </div>

            {/* Employer */}
            <span className="payslip-sub-section-label" style={{ marginTop: 16 }}>KONTRIBUSI PERUSAHAAN</span>
            <div className="payslip-table">
              {payslipData.bpjs.employer.map((item, idx) => (
                <div key={idx} className="payslip-amount-row">
                  <div className="payslip-amount-label-group">
                    <span className="payslip-amount-label">{item.label}</span>
                    <span className="payslip-amount-desc">{item.description}</span>
                  </div>
                  <span className="payslip-amount-value">
                    {formatRupiah(item.amount)}
                  </span>
                </div>
              ))}
              <AmountRow
                label="Total Perusahaan"
                amount={payslipData.bpjs.totalEmployer}
                isTotal
                totalColor="#34d399"
                showTopBorder
              />
            </div>
          </Card>
        </div>

        {/* Attendance & Prorate */}
        <div className="content-padding section">
          <Card variant="elevated" className="payslip-breakdown-card">
            <div className="payslip-section-header">
              <span className="payslip-section-icon">📊</span>
              <span className="payslip-section-title">Kehadiran & Prorate</span>
            </div>

            <div className="payslip-info-table">
              <div className="payslip-info-row">
                <span className="payslip-info-label">Hari Kerja</span>
                <span className="payslip-info-value">{payslipData.attendance.workingDays} / {payslipData.attendance.totalDays} hari</span>
              </div>
              <div className="payslip-info-row">
                <span className="payslip-info-label">Persentase Prorate</span>
                <span className="payslip-info-value">{payslipData.attendance.proratePercentage}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Net & Gross Summary Card */}
        <div className="content-padding section">
          <Card variant="elevated" className="payslip-summary-final-card">
            <div className="payslip-summary-header">
              <span className="payslip-summary-title">Ringkasan</span>
              <span className="payslip-period-badge">{months[selectedMonth]} {selectedYear}</span>
            </div>

            <div className="payslip-net-box">
              <span className="payslip-box-label">Gaji Bersih</span>
              <span className="payslip-box-amount">{formatRupiah(payslipData.netPay)}</span>
              <span className="payslip-box-status">Setelah semua potongan</span>
            </div>

            <div className="payslip-gross-box">
              <span className="payslip-box-label">Gaji Kotor</span>
              <span className="payslip-box-amount">{formatRupiah(payslipData.grossPay)}</span>
              <span className="payslip-box-status">Sebelum potongan</span>
            </div>

            <Button
              onPress={() => {}}
              fullWidth
              icon={<DownloadIcon />}
              className="payslip-download-btn"
            >
              Unduh Slip Gaji
            </Button>
          </Card>
        </div>

        {/* Pagination Dots */}
        <PaginationDots total={2} active={activePage} />

        <div style={{ height: 32 }} />
      </div>
    </div>
  );
};
