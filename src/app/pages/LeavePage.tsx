import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export function LeavePage() {
  const [showForm, setShowForm] = useState(false);

  const leaveBalance = {
    annual: 12,
    sick: 12,
    total: 14,
  };

  const leaveHistory = [
    {
      type: 'Cuti Tahunan',
      startDate: '5 Jan 2026',
      endDate: '7 Jan 2026',
      days: 3,
      reason: 'Liburan keluarga',
      status: 'approved',
      appliedDate: '20 Des 2025',
    },
    {
      type: 'Cuti Sakit',
      startDate: '15 Des 2025',
      endDate: '16 Des 2025',
      days: 2,
      reason: 'Demam dan flu',
      status: 'approved',
      appliedDate: '15 Des 2025',
    },
    {
      type: 'Cuti Tahunan',
      startDate: '20 Des 2025',
      endDate: '22 Des 2025',
      days: 3,
      reason: 'Acara keluarga',
      status: 'pending',
      appliedDate: '18 Des 2025',
    },
    {
      type: 'Cuti Tahunan',
      startDate: '10 Nov 2025',
      endDate: '11 Nov 2025',
      days: 2,
      reason: 'Urusan pribadi',
      status: 'approved',
      appliedDate: '1 Nov 2025',
    },
  ];

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

  return (
    <div className="space-y-6">
      {/* Leave Balance Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-2xl p-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
            style={{
              backgroundImage: 'url(/master%202.png)',
              backgroundSize: '240px 240px',
            }}
          />
          <div className="relative z-10">
            <div className="text-zinc-900/60 text-xs mb-1">Sisa Cuti</div>
            <div className="text-zinc-900 text-2xl font-bold mb-0.5">{leaveBalance.annual}</div>
            <div className="text-zinc-900/60 text-[10px]">hari</div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50">
          <div className="text-zinc-500 text-xs mb-1">Sakit</div>
          <div className="text-zinc-900 dark:text-white text-2xl font-bold mb-0.5">{leaveBalance.sick}</div>
          <div className="text-zinc-500 text-[10px]">hari</div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50">
          <div className="text-zinc-500 text-xs mb-1">Total</div>
          <div className="text-zinc-900 dark:text-white text-2xl font-bold mb-0.5">{leaveBalance.total}</div>
          <div className="text-zinc-500 text-[10px]">hari</div>
        </div>
      </div>

      {/* Apply Leave Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-zinc-50 rounded-2xl p-4 hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Ajukan Cuti Baru</span>
      </button>

      {/* Leave Form */}
      {showForm && (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-zinc-900 dark:text-white font-bold">Form Pengajuan Cuti</div>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Jenis Cuti</label>
            <select className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white">
              <option>Cuti Tahunan</option>
              <option>Cuti Sakit</option>
              <option>Cuti Melahirkan</option>
              <option>Cuti Menikah</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Tanggal Mulai</label>
              <input
                type="date"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Tanggal Selesai</label>
              <input
                type="date"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Alasan</label>
            <textarea
              rows={3}
              placeholder="Jelaskan alasan pengajuan cuti..."
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Batal
            </button>
            <button className="flex-1 bg-lime-400 text-zinc-900 py-3 rounded-xl hover:bg-lime-500 transition-colors font-medium">
              Ajukan Cuti
            </button>
          </div>
        </div>
      )}

      {/* Leave History */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm font-bold">Riwayat Pengajuan</div>
        </div>

        <div className="space-y-3">
          {leaveHistory.map((leave, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="text-zinc-900 dark:text-white font-bold text-sm mb-1">{leave.type}</div>
                  <div className="text-zinc-600 dark:text-zinc-400 text-xs">
                    {leave.startDate} - {leave.endDate} • {leave.days} hari
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(leave.status)}`}>
                  {getStatusIcon(leave.status)}
                  <span>{getStatusLabel(leave.status)}</span>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
                <div className="text-zinc-500 dark:text-zinc-500 text-xs mb-1">Alasan:</div>
                <div className="text-zinc-700 dark:text-zinc-300 text-sm">{leave.reason}</div>
              </div>

              <div className="mt-3 text-zinc-400 dark:text-zinc-600 text-xs">
                Diajukan: {leave.appliedDate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}