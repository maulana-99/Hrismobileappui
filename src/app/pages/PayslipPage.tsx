import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, ChevronDown, Wallet, TrendingDown, Building2, BarChart3 } from 'lucide-react';

// Currency formatter for Indonesian Rupiah
const formatRupiah = (amount: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

// --- Donut Chart SVG Component ---
function DonutChart({ earnings, deductions, grossPay }: { earnings: number; deductions: number; grossPay: number }) {
  const total = earnings + deductions;
  const size = 200;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const earningsPercent = total > 0 ? earnings / total : 0;
  const earningsArc = circumference * earningsPercent;
  const deductionsArc = circumference * (1 - earningsPercent);
  const gap = 6;

  return (
    <div className="relative flex items-center justify-center mx-auto w-[200px] h-[200px] my-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor"
          className="text-zinc-200 dark:text-zinc-800"
          strokeWidth={strokeWidth}
        />
        {/* Earnings arc (indigo) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#6C5CE7"
          strokeWidth={strokeWidth}
          strokeDasharray={`${earningsArc - gap} ${circumference - earningsArc + gap}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        {/* Deductions arc (golden yellow) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#F5C542"
          strokeWidth={strokeWidth}
          strokeDasharray={`${deductionsArc - gap} ${circumference - deductionsArc + gap}`}
          strokeDashoffset={`${-(earningsArc)}`}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-zinc-900 dark:text-white text-[22px] font-bold tracking-tight">
          {formatRupiah(grossPay)}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500 text-xs">
          Gaji Kotor
        </span>
      </div>
    </div>
  );
}

// --- Legend Item ---
function LegendItem({ color, amount, label }: { color: string; amount: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <div className="flex flex-col">
        <span className="text-zinc-900 dark:text-white text-sm font-semibold">
          {formatRupiah(amount)}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400 text-xs">{label}</span>
      </div>
    </div>
  );
}

// --- Amount Row ---
function AmountRow({
  label,
  amount,
  description,
  isTotal = false,
  totalColor,
  isLast = false,
}: {
  label: string;
  amount: number;
  description?: string;
  isTotal?: boolean;
  totalColor?: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 ${
        !isLast ? 'border-b border-zinc-100 dark:border-zinc-800/60' : ''
      } ${isTotal ? 'bg-zinc-50 dark:bg-zinc-800/40' : ''}`}
    >
      <div className="flex flex-col">
        <span
          className={`text-sm ${isTotal ? 'font-bold' : 'font-normal'} ${
            totalColor ? '' : 'text-zinc-900 dark:text-white'
          }`}
          style={totalColor ? { color: totalColor } : undefined}
        >
          {label}
        </span>
        {description && (
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{description}</span>
        )}
      </div>
      <span
        className={`text-sm ${isTotal ? 'font-bold' : 'font-semibold'} ${
          totalColor ? '' : 'text-zinc-900 dark:text-white'
        }`}
        style={totalColor ? { color: totalColor } : undefined}
      >
        {formatRupiah(amount)}
      </span>
    </div>
  );
}

// --- Collapsible Section Card ---
function SectionCard({
  icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-zinc-900/60 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 pt-5 pb-3 group"
      >
        <div className="flex items-center gap-2.5">
          <div className="text-zinc-500 dark:text-zinc-400">{icon}</div>
          <span className="text-zinc-900 dark:text-white font-semibold text-base">{title}</span>
        </div>
        <div className={`w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 ${isOpen ? '' : '-rotate-90'}`}>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-4 mb-4 border border-zinc-100 dark:border-zinc-800/60 rounded-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PayslipPage() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(5); // June
  const [isBpjsOpen, setIsBpjsOpen] = useState(true);

  // Bulan terakhir yang sudah digaji (0-indexed). Bulan setelahnya disabled.
  // Simulasi: gaji terakhir bulan Juni (index 5)
  const lastPaidMonth = 5;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const years = [2022, 2023, 2024, 2025, 2026];

  // Data slip gaji
  const data = {
    earnings: [
      { label: 'Gaji Pokok', amount: 8000000 },
      { label: 'Tunjangan Jabatan', amount: 2000000 },
      { label: 'Tunjangan Transport', amount: 1500000 },
      { label: 'Tunjangan Makan', amount: 1000000 },
    ],
    totalEarnings: 12500000,
    deductions: [
      { label: 'PPh 21', amount: 750000 },
      { label: 'BPJS Kesehatan', amount: 80000 },
      { label: 'BPJS Ketenagakerjaan', amount: 160000 },
      { label: 'Jaminan Pensiun', amount: 80000 },
    ],
    totalDeductions: 1070000,
    bpjs: {
      employee: [
        { label: 'BPJS Kesehatan', amount: 80000, desc: '1% dari gaji pokok' },
        { label: 'JHT', amount: 160000, desc: '2% dari gaji pokok' },
        { label: 'JP', amount: 80000, desc: '1% dari gaji pokok' },
      ],
      employer: [
        { label: 'BPJS Kesehatan', amount: 320000, desc: '4% dari gaji pokok' },
        { label: 'JHT', amount: 296000, desc: '3.7% dari gaji pokok' },
        { label: 'JKK', amount: 19200, desc: '0.24% dari gaji pokok' },
        { label: 'JKM', amount: 24000, desc: '0.3% dari gaji pokok' },
        { label: 'JP', amount: 160000, desc: '2% dari gaji pokok' },
      ],
      totalEmployee: 320000,
      totalEmployer: 819200,
    },
    attendance: { workingDays: 22, totalDays: 22, prorate: 100 },
    grossPay: 12500000,
    netPay: 11430000,
  };

  return (
    <div className="space-y-5">
      {/* Period Filter */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-3xl p-4 border border-zinc-200/80 dark:border-zinc-800/50 shadow-sm space-y-3">
        {/* Year Row — compact inline with arrows */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedYear((y) => Math.max(y - 1, 2020))}
            className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-zinc-900 dark:text-white font-semibold text-base tracking-wide">{selectedYear}</span>
          <button
            onClick={() => setSelectedYear((y) => Math.min(y + 1, 2030))}
            className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-100 dark:bg-zinc-800/60" />

        {/* Month Grid — 2 rows of 6 */}
        <div className="grid grid-cols-6 gap-1.5">
          {months.map((month, index) => {
            const isDisabled = index > lastPaidMonth;
            const isActive = index === selectedMonth;
            return (
              <button
                key={month}
                onClick={() => !isDisabled && setSelectedMonth(index)}
                disabled={isDisabled}
                className={`py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-lime-400 text-zinc-900 font-bold shadow-md shadow-lime-400/25'
                    : isDisabled
                      ? 'bg-zinc-50/50 dark:bg-zinc-800/20 text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                {month}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payslip Summary — Donut Chart Card */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/50 shadow-sm text-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">
          Gaji kotor bulan <strong className="text-zinc-900 dark:text-white">{months[selectedMonth]}</strong> yang diterima
        </p>

        <DonutChart
          earnings={data.totalEarnings}
          deductions={data.totalDeductions}
          grossPay={data.grossPay}
        />

        <div className="flex items-center justify-center gap-8 mt-4">
          <LegendItem color="#6C5CE7" amount={data.totalEarnings} label="Pendapatan" />
          <LegendItem color="#F5C542" amount={data.totalDeductions} label="Potongan" />
        </div>
      </div>

      {/* Earning Details */}
      <SectionCard icon={<Wallet className="w-5 h-5" />} title="Detail Pendapatan">
        {data.earnings.map((item, idx) => (
          <AmountRow key={idx} label={item.label} amount={item.amount} />
        ))}
        <AmountRow label="Total Pendapatan" amount={data.totalEarnings} isTotal totalColor="#6C5CE7" isLast />
      </SectionCard>

      {/* Deduction Details */}
      <SectionCard icon={<TrendingDown className="w-5 h-5" />} title="Detail Potongan">
        {data.deductions.map((item, idx) => (
          <AmountRow key={idx} label={item.label} amount={item.amount} />
        ))}
        <AmountRow label="Total Potongan" amount={data.totalDeductions} isTotal totalColor="#F5C542" isLast />
      </SectionCard>

      {/* BPJS Contributions — Collapsible */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden shadow-sm">
        <button
          onClick={() => setIsBpjsOpen(!isBpjsOpen)}
          className="w-full flex items-center justify-between px-5 pt-5 pb-3 group"
        >
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <span className="text-zinc-900 dark:text-white font-semibold text-base">Kontribusi BPJS</span>
          </div>
          <div className={`w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 ${isBpjsOpen ? '' : '-rotate-90'}`}>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </div>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isBpjsOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {/* Employee */}
          <div className="px-5 pt-1 pb-1">
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Kontribusi Karyawan
            </span>
          </div>
          <div className="mx-4 mb-2 border border-zinc-100 dark:border-zinc-800/60 rounded-2xl overflow-hidden">
            {data.bpjs.employee.map((item, idx) => (
              <AmountRow key={idx} label={item.label} amount={item.amount} description={item.desc} />
            ))}
            <AmountRow label="Total Karyawan" amount={data.bpjs.totalEmployee} isTotal totalColor="#6C5CE7" isLast />
          </div>

          {/* Employer */}
          <div className="px-5 pt-2 pb-1">
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Kontribusi Perusahaan
            </span>
          </div>
          <div className="mx-4 mb-4 border border-zinc-100 dark:border-zinc-800/60 rounded-2xl overflow-hidden">
            {data.bpjs.employer.map((item, idx) => (
              <AmountRow key={idx} label={item.label} amount={item.amount} description={item.desc} />
            ))}
            <AmountRow label="Total Perusahaan" amount={data.bpjs.totalEmployer} isTotal totalColor="#34d399" isLast />
          </div>
        </div>
      </div>

      {/* Attendance & Prorate */}
      <SectionCard icon={<BarChart3 className="w-5 h-5" />} title="Kehadiran & Prorate">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">Hari Kerja</span>
          <span className="text-zinc-900 dark:text-white text-sm font-semibold">
            {data.attendance.workingDays} / {data.attendance.totalDays} hari
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">Persentase Prorate</span>
          <span className="text-zinc-900 dark:text-white text-sm font-semibold">{data.attendance.prorate}%</span>
        </div>
      </SectionCard>

      {/* Net & Gross Summary */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800/50 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-zinc-900 dark:text-white font-semibold text-base">Ringkasan</span>
          <span className="text-[11px] font-medium text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-400/10 px-3 py-1 rounded-full">
            {months[selectedMonth]} {selectedYear}
          </span>
        </div>

        {/* Net Salary */}
        <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 space-y-1">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs">Gaji Bersih</span>
          <div className="text-zinc-900 dark:text-white text-2xl font-bold tracking-tight">
            {formatRupiah(data.netPay)}
          </div>
          <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">Setelah semua potongan</span>
        </div>

        {/* Gross Salary */}
        <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 space-y-1">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs">Gaji Kotor</span>
          <div className="text-zinc-900 dark:text-white text-2xl font-bold tracking-tight">
            {formatRupiah(data.grossPay)}
          </div>
          <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">Sebelum potongan</span>
        </div>

        {/* Download Button */}
        <button className="w-full mt-2 bg-lime-400 hover:bg-lime-500 text-zinc-900 py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/20 active:scale-[0.98]">
          <Download className="w-4 h-4" />
          <span>Unduh Slip Gaji</span>
        </button>
      </div>

    </div>
  );
}