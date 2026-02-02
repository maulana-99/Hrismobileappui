import { Download, Eye, ChevronRight } from 'lucide-react';

export function PayslipPage() {
  const currentPayslip = {
    month: 'Desember 2025',
    grossSalary: 15000000,
    deductions: 1500000,
    netSalary: 13500000,
    paymentDate: '30 Desember 2025',
    status: 'Diproses',
  };

  const payslipHistory = [
    { month: 'November 2025', amount: 13500000, date: '30 Nov 2025', status: 'Dibayar' },
    { month: 'Oktober 2025', amount: 13500000, date: '30 Okt 2025', status: 'Dibayar' },
    { month: 'September 2025', amount: 13500000, date: '30 Sep 2025', status: 'Dibayar' },
    { month: 'Agustus 2025', amount: 13500000, date: '30 Agu 2025', status: 'Dibayar' },
    { month: 'Juli 2025', amount: 13500000, date: '30 Jul 2025', status: 'Dibayar' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Current Month Summary */}
      <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-3xl p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
          style={{
            backgroundImage: 'url(/master%202.png)',
            backgroundSize: '240px 240px',
          }}
        />
        <div className="relative z-10">
          <div className="text-zinc-900/60 text-sm mb-1">Gaji Bulan Ini</div>
          <div className="text-zinc-900 text-3xl font-bold mb-4">
            {formatCurrency(currentPayslip.netSalary)}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zinc-900/60 text-xs mb-1">Tanggal Pembayaran</div>
              <div className="text-zinc-900 text-sm font-medium">{currentPayslip.paymentDate}</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/10 text-zinc-900 text-xs font-medium">
              {currentPayslip.status}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="text-zinc-900 dark:text-white font-bold mb-4">Rincian Gaji</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="text-zinc-600 dark:text-zinc-400 text-sm">Gaji Pokok</div>
            <div className="text-zinc-900 dark:text-white font-bold">
              {formatCurrency(currentPayslip.grossSalary)}
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center justify-between py-2">
            <div className="text-zinc-600 dark:text-zinc-400 text-sm">Potongan</div>
            <div className="text-red-600 dark:text-red-400 font-medium">
              -{formatCurrency(currentPayslip.deductions)}
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center justify-between py-2">
            <div className="text-zinc-900 dark:text-white font-bold">Total Diterima</div>
            <div className="text-lime-600 dark:text-lime-400 font-bold text-lg">
              {formatCurrency(currentPayslip.netSalary)}
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white py-3 px-4 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          <span>Download Slip Gaji</span>
        </button>
      </div>

      {/* History */}
      <div>
        <div className="text-zinc-900 dark:text-white text-sm font-bold mb-4 px-1">Riwayat Slip Gaji</div>
        <div className="space-y-3">
          {payslipHistory.map((item, index) => (
            <button
              key={index}
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-zinc-900 dark:text-white text-sm font-bold">{item.month}</div>
                    <div className="text-zinc-600 dark:text-zinc-400 text-xs">{item.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-zinc-900 dark:text-white font-bold text-sm">
                      {formatCurrency(item.amount)}
                    </div>
                    <div className="text-lime-600 dark:text-lime-400 text-xs">{item.status}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}