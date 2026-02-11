import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export function LeavePage() {
  const [showForm, setShowForm] = useState(false);

  const textureStyle = {
    backgroundImage: 'url("/master%202.png")',
    backgroundSize: '400px 400px',
  };

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
        <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-2xl p-4 relative overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 opacity-[0.15] bg-repeat mix-blend-overlay"
            style={{
              backgroundImage: 'url(/master%202.png)',
              backgroundSize: '160px 160px',
            }}
          />
          <div className="relative z-10 text-zinc-950">
            <div className="text-zinc-900/60 text-[10px] font-bold uppercase tracking-wider mb-1">Sisa Cuti</div>
            <div className="text-3xl font-black tabular-nums">{leaveBalance.annual}</div>
            <div className="text-zinc-900/60 text-[10px] font-bold">hari</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={{ ...textureStyle, backgroundSize: '180px 180px' }} />
          <div className="relative z-10">
            <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Sakit</div>
            <div className="text-zinc-950 dark:text-white text-2xl font-black tabular-nums">{leaveBalance.sick}</div>
            <div className="text-zinc-500 text-[10px] font-bold">hari</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={{ ...textureStyle, backgroundSize: '180px 180px' }} />
          <div className="relative z-10">
            <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total</div>
            <div className="text-zinc-950 dark:text-white text-2xl font-black tabular-nums">{leaveBalance.total}</div>
            <div className="text-zinc-500 text-[10px] font-bold">hari</div>
          </div>
        </div>
      </div>

      {/* Apply Leave Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-50 dark:to-zinc-100 dark:text-zinc-950 text-white rounded-2xl p-5 hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 opacity-[0.1] bg-repeat pointer-events-none invert dark:invert-0" style={{ ...textureStyle, backgroundSize: '240px 240px' }} />
        <Plus className="w-5 h-5 relative z-10" />
        <span className="font-bold tracking-tight relative z-10">Ajukan Cuti Baru</span>
      </button>

      {/* Leave History */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm font-bold tracking-tight uppercase tracking-wider">Riwayat Pengajuan</div>
        </div>

        <div className="space-y-4">
          {leaveHistory.map((leave, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900/50 rounded-[28px] p-5 border border-zinc-200 dark:border-zinc-800/50 shadow-sm relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2] pointer-events-none bg-repeat"
                style={{ ...textureStyle, backgroundSize: '160px 160px' }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="text-zinc-950 dark:text-white font-black text-base mb-1 tracking-tight">{leave.type}</div>
                    <div className="text-zinc-500 dark:text-zinc-500 text-xs font-medium">
                      {leave.startDate} - {leave.endDate} • {leave.days} hari
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${getStatusColor(leave.status)}`}>
                    {getStatusIcon(leave.status)}
                    <span>{getStatusLabel(leave.status)}</span>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/20 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-repeat" style={{ ...textureStyle, backgroundSize: '120px 120px' }} />
                  <div className="relative z-10">
                    <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase mb-1.5 tracking-wider">Alasan:</div>
                    <div className="text-zinc-700 dark:text-zinc-300 text-sm font-medium leading-relaxed">{leave.reason}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-zinc-400 dark:text-zinc-600 text-[10px] font-bold uppercase tracking-wider">
                    Diajukan: {leave.appliedDate}
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}