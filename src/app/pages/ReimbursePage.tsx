import { DollarSign, Plus, Upload, CheckCircle, Clock, XCircle, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export function ReimbursePage() {
  const [showForm, setShowForm] = useState(false);

  const reimbursementStats = {
    pending: 2500000,
    approved: 8750000,
    total: 11250000,
  };

  const reimbursementHistory = [
    {
      category: 'Transport',
      amount: 350000,
      date: '20 Des 2025',
      description: 'Taxi ke meeting klien di BSD',
      status: 'approved',
      receiptUrl: '#',
      appliedDate: '20 Des 2025',
      approvedDate: '22 Des 2025',
    },
    {
      category: 'Makan',
      amount: 250000,
      date: '18 Des 2025',
      description: 'Makan siang dengan tim project',
      status: 'approved',
      receiptUrl: '#',
      appliedDate: '18 Des 2025',
      approvedDate: '19 Des 2025',
    },
    {
      category: 'Peralatan',
      amount: 1500000,
      date: '15 Des 2025',
      description: 'Beli monitor eksternal untuk WFH',
      status: 'pending',
      receiptUrl: '#',
      appliedDate: '15 Des 2025',
    },
    {
      category: 'Transport',
      amount: 500000,
      date: '12 Des 2025',
      description: 'Bensin perjalanan dinas ke Bandung',
      status: 'approved',
      receiptUrl: '#',
      appliedDate: '12 Des 2025',
      approvedDate: '13 Des 2025',
    },
    {
      category: 'Internet',
      amount: 1000000,
      date: '10 Des 2025',
      description: 'Biaya internet rumah untuk WFH (Okt-Des)',
      status: 'pending',
      receiptUrl: '#',
      appliedDate: '10 Des 2025',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-lime-400/10 text-lime-600 dark:text-lime-400';
      case 'pending':
        return 'bg-amber-400/10 text-amber-600 dark:text-amber-400';
      case 'rejected':
        return 'bg-red-400/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Transport':
        return 'bg-blue-400/10 text-blue-600 dark:text-blue-400';
      case 'Makan':
        return 'bg-orange-400/10 text-orange-600 dark:text-orange-400';
      case 'Peralatan':
        return 'bg-purple-400/10 text-purple-600 dark:text-purple-400';
      case 'Internet':
        return 'bg-cyan-400/10 text-cyan-600 dark:text-cyan-400';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl p-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
            style={{
              backgroundImage: 'url(/master%202.png)',
              backgroundSize: '240px 240px',
            }}
          />
          <div className="relative z-10">
            <div className="text-zinc-50/80 text-xs mb-1">Disetujui</div>
            <div className="text-zinc-50 text-lg font-bold mb-0.5">{formatCurrency(reimbursementStats.approved).replace('Rp', '')}</div>
            <div className="text-zinc-50/80 text-[10px]">Rp</div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50">
          <div className="text-zinc-500 text-xs mb-1">Pending</div>
          <div className="text-zinc-900 dark:text-white text-lg font-bold mb-0.5">{formatCurrency(reimbursementStats.pending).replace('Rp', '')}</div>
          <div className="text-zinc-500 text-[10px]">Rp</div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50">
          <div className="text-zinc-500 text-xs mb-1">Total</div>
          <div className="text-zinc-900 dark:text-white text-lg font-bold mb-0.5">{formatCurrency(reimbursementStats.total).replace('Rp', '')}</div>
          <div className="text-zinc-500 text-[10px]">Rp</div>
        </div>
      </div>

      {/* Apply Reimbursement Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-zinc-50 rounded-2xl p-4 hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Ajukan Reimburse Baru</span>
      </button>

      {/* Reimbursement Form */}
      {showForm && (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-zinc-900 dark:text-white font-bold">Form Reimburse</div>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Kategori</label>
            <select className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white">
              <option>Transport</option>
              <option>Makan & Minum</option>
              <option>Peralatan Kerja</option>
              <option>Internet</option>
              <option>Akomodasi</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Jumlah</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">Rp</span>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Tanggal</label>
            <input
              type="date"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Deskripsi</label>
            <textarea
              rows={3}
              placeholder="Jelaskan detail pengeluaran..."
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-none"
            />
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Upload Bukti</label>
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center hover:border-lime-400 dark:hover:border-lime-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <div className="text-zinc-600 dark:text-zinc-400 text-sm mb-1">Upload foto/scan bukti</div>
              <div className="text-zinc-400 text-xs">JPG, PNG, PDF (Max 5MB)</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Batal
            </button>
            <button className="flex-1 bg-lime-400 text-zinc-900 py-3 rounded-xl hover:bg-lime-500 transition-colors font-medium">
              Ajukan Reimburse
            </button>
          </div>
        </div>
      )}

      {/* Reimbursement History */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <DollarSign className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm font-bold">Riwayat Reimburse</div>
        </div>

        <div className="space-y-3">
          {reimbursementHistory.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-500 text-xs">•</div>
                  <div className="text-zinc-600 dark:text-zinc-400 text-xs">{item.date}</div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  <span>{getStatusLabel(item.status)}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-zinc-900 dark:text-white text-xl font-bold mb-1">
                  {formatCurrency(item.amount)}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm">{item.description}</div>
              </div>

              {item.status === 'approved' && item.approvedDate && (
                <div className="bg-lime-400/10 rounded-xl p-3 mb-3">
                  <div className="text-lime-600 dark:text-lime-400 text-xs">
                    ✓ Disetujui pada {item.approvedDate}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-zinc-400 dark:text-zinc-600 text-xs">
                  Diajukan: {item.appliedDate}
                </div>
                <button className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 text-xs flex items-center gap-1">
                  Lihat Bukti →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}