import { Clock, Plus, CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export function PermissionPage() {
  const [showForm, setShowForm] = useState(false);

  const permissionHistory = [
    {
      type: 'Terlambat',
      date: '20 Des 2025',
      time: '09:30',
      duration: '30 menit',
      reason: 'Macet di jalan tol',
      status: 'approved',
      appliedDate: '20 Des 2025',
    },
    {
      type: 'Pulang Awal',
      date: '15 Des 2025',
      time: '15:00',
      duration: '2 jam',
      reason: 'Anak sakit perlu ke dokter',
      status: 'approved',
      appliedDate: '15 Des 2025',
    },
    {
      type: 'Keluar Kantor',
      date: '10 Des 2025',
      time: '10:00 - 12:00',
      duration: '2 jam',
      reason: 'Meeting dengan klien di luar kantor',
      status: 'approved',
      appliedDate: '9 Des 2025',
    },
    {
      type: 'Terlambat',
      date: '5 Des 2025',
      time: '09:15',
      duration: '15 menit',
      reason: 'Ban mobil kempes',
      status: 'pending',
      appliedDate: '5 Des 2025',
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Terlambat':
        return 'bg-orange-400/10 text-orange-600 dark:text-orange-400';
      case 'Pulang Awal':
        return 'bg-blue-400/10 text-blue-600 dark:text-blue-400';
      case 'Keluar Kantor':
        return 'bg-purple-400/10 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
          style={{
            backgroundImage: 'url(/master%202.png)',
            backgroundSize: '240px 240px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-50/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-zinc-50" />
            </div>
            <div>
              <div className="text-zinc-50/80 text-sm">Izin Kerja</div>
              <div className="text-zinc-50 text-xl font-bold">Quick Request</div>
            </div>
          </div>
          <div className="text-zinc-50/80 text-sm">
            Ajukan izin terlambat, pulang awal, atau keluar kantor dengan mudah
          </div>
        </div>
      </div>

      {/* Apply Permission Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-zinc-50 rounded-2xl p-4 hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Ajukan Izin Baru</span>
      </button>

      {/* Permission Form */}
      {showForm && (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-zinc-900 dark:text-white font-bold">Form Izin Kerja</div>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Jenis Izin</label>
            <select className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white">
              <option>Terlambat</option>
              <option>Pulang Awal</option>
              <option>Keluar Kantor</option>
              <option>Tidak Masuk</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Tanggal</label>
              <input
                type="date"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Waktu</label>
              <input
                type="time"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Durasi</label>
            <input
              type="text"
              placeholder="Contoh: 30 menit, 2 jam"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400"
            />
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 text-sm mb-2 block">Alasan</label>
            <textarea
              rows={3}
              placeholder="Jelaskan alasan izin..."
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
              Ajukan Izin
            </button>
          </div>
        </div>
      )}

      {/* Permission History */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm font-bold">Riwayat Izin</div>
        </div>

        <div className="space-y-3">
          {permissionHistory.map((permission, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getTypeColor(permission.type)}`}>
                    {permission.type}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-500 text-xs">•</div>
                  <div className="text-zinc-600 dark:text-zinc-400 text-xs">{permission.date}</div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(permission.status)}`}>
                  {getStatusIcon(permission.status)}
                  <span>{getStatusLabel(permission.status)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div>
                  <div className="text-zinc-500 dark:text-zinc-500 text-xs mb-0.5">Waktu</div>
                  <div className="text-zinc-900 dark:text-white text-sm font-bold">{permission.time}</div>
                </div>
                <div>
                  <div className="text-zinc-500 dark:text-zinc-500 text-xs mb-0.5">Durasi</div>
                  <div className="text-zinc-900 dark:text-white text-sm font-bold">{permission.duration}</div>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
                <div className="text-zinc-500 dark:text-zinc-500 text-xs mb-1">Alasan:</div>
                <div className="text-zinc-700 dark:text-zinc-300 text-sm">{permission.reason}</div>
              </div>

              <div className="mt-3 text-zinc-400 dark:text-zinc-600 text-xs">
                Diajukan: {permission.appliedDate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}