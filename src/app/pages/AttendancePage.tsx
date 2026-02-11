import { Calendar, Clock, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { MonthlyHeatmapCard } from '../components/MonthlyHeatmapCard';

export function AttendancePage() {
  const textureStyle = {
    backgroundImage: 'url("/master%202.png")',
    backgroundSize: '400px 400px',
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
      {/* Monthly Heatmap Card */}
      <MonthlyHeatmapCard />

      {/* Attendance History */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm font-bold tracking-tight">Riwayat Kehadiran</div>
        </div>

        <div className="space-y-4">
          {attendanceHistory.map((record, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900/50 rounded-[28px] p-5 border border-zinc-200 dark:border-zinc-800/50 shadow-sm relative overflow-hidden group"
            >
              {/* Background Texture */}
              <div
                className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat"
                style={{ ...textureStyle, backgroundSize: '180px 180px' }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="text-zinc-950 dark:text-white font-black text-base mb-1 tracking-tight">
                      {record.day}, {record.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-500 text-xs font-medium">
                      <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      {record.location}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                    <span>{getStatusLabel(record.status)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/20 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-repeat"
                      style={{ ...textureStyle, backgroundSize: '120px 120px' }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase">Masuk</div>
                      </div>
                      <div className="text-zinc-950 dark:text-white font-black text-lg tabular-nums">{record.checkIn}</div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/20 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-repeat"
                      style={{ ...textureStyle, backgroundSize: '120px 120px' }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase">Keluar</div>
                      </div>
                      <div className="text-zinc-950 dark:text-white font-black text-lg tabular-nums">{record.checkOut}</div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/20 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-repeat"
                      style={{ ...textureStyle, backgroundSize: '120px 120px' }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase mb-1.5">Total</div>
                      <div className="text-zinc-950 dark:text-white font-black text-lg tabular-nums">{record.workHours}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}