import { TrendingUp } from 'lucide-react';

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Leave Balance */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50">
        <div className="text-zinc-500 text-xs mb-3">Sisa Cuti</div>
        <div className="flex items-end gap-2 mb-1">
          <div className="text-zinc-900 dark:text-white text-3xl">12</div>
          <div className="text-zinc-600 text-sm mb-1">hari</div>
        </div>
        <div className="text-zinc-600 text-xs">dari 14 hari</div>
      </div>

      {/* Attendance Streak */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="text-zinc-500 text-xs">Kehadiran</div>
            <div className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-lime-400" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-zinc-900 dark:text-white text-3xl">28</div>
            <div className="text-zinc-600 text-sm mb-1">hari</div>
          </div>
          <div className="text-zinc-600 text-xs">berturut-turut</div>
        </div>
        <div className="absolute right-0 bottom-0 w-20 h-20 bg-lime-400/5 rounded-tl-full"></div>
      </div>
    </div>
  );
}