import { TrendingUp } from 'lucide-react';

export function StatsOverview() {
  const textureStyle = {
    backgroundImage: 'url("/master%202.png")',
    backgroundSize: '160px 160px',
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Leave Balance */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50 shadow-sm dark:shadow-none relative overflow-hidden">
        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
          style={textureStyle}
        />
        <div className="relative z-10">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs font-bold mb-3 uppercase tracking-wider">Sisa Cuti</div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-zinc-950 dark:text-white text-3xl font-extrabold">12</div>
            <div className="text-zinc-600 dark:text-zinc-400 text-sm font-bold mb-1">hari</div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-500 text-xs font-medium">dari 14 hari</div>
        </div>
      </div>

      {/* Attendance Streak */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50 shadow-sm dark:shadow-none relative overflow-hidden">
        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
          style={textureStyle}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">Kehadiran</div>
            <div className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-lime-600 dark:text-lime-400" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-zinc-950 dark:text-white text-3xl font-extrabold">28</div>
            <div className="text-zinc-600 dark:text-zinc-400 text-sm font-bold mb-1">hari</div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-500 text-xs font-medium">berturut-turut</div>
        </div>
        <div className="absolute right-0 bottom-0 w-20 h-20 bg-lime-400/5 rounded-tl-full"></div>
      </div>
    </div>
  );
}