import { Calendar, Clock, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export function AttendancePage() {
  const monthStats = {
    present: 18,
    late: 2,
    absent: 0,
    workDays: 20,
    percentage: 90,
  };

  const attendanceHistory = [
    {
      date: '25 Des 2025',
      day: 'Rabu',
      checkIn: '08:45',
      checkOut: '17:30',
      workHours: '8h 45m',
      status: 'on-time',
      location: 'Kantor Jakarta',
    },
    {
      date: '24 Des 2025',
      day: 'Selasa',
      checkIn: '08:50',
      checkOut: '17:25',
      workHours: '8h 35m',
      status: 'on-time',
      location: 'Kantor Jakarta',
    },
    {
      date: '23 Des 2025',
      day: 'Senin',
      checkIn: '09:15',
      checkOut: '17:40',
      workHours: '8h 25m',
      status: 'late',
      location: 'Kantor Jakarta',
    },
    {
      date: '20 Des 2025',
      day: 'Jumat',
      checkIn: '08:30',
      checkOut: '17:15',
      workHours: '8h 45m',
      status: 'on-time',
      location: 'WFH',
    },
    {
      date: '19 Des 2025',
      day: 'Kamis',
      checkIn: '08:40',
      checkOut: '17:20',
      workHours: '8h 40m',
      status: 'on-time',
      location: 'Kantor Jakarta',
    },
    {
      date: '18 Des 2025',
      day: 'Rabu',
      checkIn: '09:05',
      checkOut: '17:35',
      workHours: '8h 30m',
      status: 'late',
      location: 'Kantor Jakarta',
    },
    {
      date: '17 Des 2025',
      day: 'Selasa',
      checkIn: '08:35',
      checkOut: '17:25',
      workHours: '8h 50m',
      status: 'on-time',
      location: 'Kantor Jakarta',
    },
    {
      date: '16 Des 2025',
      day: 'Senin',
      checkIn: '08:55',
      checkOut: '17:30',
      workHours: '8h 35m',
      status: 'on-time',
      location: 'WFH',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'bg-lime-400/10 text-lime-600 dark:text-lime-400';
      case 'late':
        return 'bg-amber-400/10 text-amber-600 dark:text-amber-400';
      case 'absent':
        return 'bg-red-400/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="w-4 h-4" />;
      case 'late':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'Tepat Waktu';
      case 'late':
        return 'Terlambat';
      case 'absent':
        return 'Tidak Hadir';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Month Summary */}
      <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-3xl p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-zinc-900/60 text-sm mb-1">Kehadiran Bulan Ini</div>
              <div className="text-zinc-900 text-3xl font-bold">{monthStats.percentage}%</div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-zinc-900/10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-zinc-900" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-900/10 rounded-xl p-3">
              <div className="text-zinc-900/60 text-xs mb-1">Hadir</div>
              <div className="text-zinc-900 text-xl font-bold">{monthStats.present}</div>
            </div>
            <div className="bg-zinc-900/10 rounded-xl p-3">
              <div className="text-zinc-900/60 text-xs mb-1">Terlambat</div>
              <div className="text-zinc-900 text-xl font-bold">{monthStats.late}</div>
            </div>
            <div className="bg-zinc-900/10 rounded-xl p-3">
              <div className="text-zinc-900/60 text-xs mb-1">Alpa</div>
              <div className="text-zinc-900 text-xl font-bold">{monthStats.absent}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        <button className="flex-shrink-0 px-4 py-2 rounded-xl bg-lime-400 text-zinc-900 font-medium text-sm">
          Desember 2025
        </button>
        <button className="flex-shrink-0 px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">
          November 2025
        </button>
        <button className="flex-shrink-0 px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">
          Oktober 2025
        </button>
      </div>

      {/* Attendance History */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm">Riwayat Kehadiran</div>
        </div>

        <div className="space-y-3">
          {attendanceHistory.map((record, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm mb-0.5">
                    {record.day}, {record.date}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400 text-xs">{record.location}</div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(record.status)}`}>
                  {getStatusIcon(record.status)}
                  <span>{getStatusLabel(record.status)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <div className="text-zinc-500 text-xs">Masuk</div>
                  </div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">{record.checkIn}</div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <div className="text-zinc-500 text-xs">Keluar</div>
                  </div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">{record.checkOut}</div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
                  <div className="text-zinc-500 text-xs mb-1">Total</div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">{record.workHours}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}