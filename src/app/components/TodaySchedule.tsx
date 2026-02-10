export function TodaySchedule() {
  const textureStyle = {
    backgroundImage: 'url("/master%202.png")',
    backgroundSize: '160px 160px',
  };

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden">
      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
        style={textureStyle}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="text-zinc-950 dark:text-white text-sm font-bold tracking-tight">Jadwal Hari Ini</div>
          <div className="text-zinc-500 dark:text-zinc-600 text-xs font-medium">Rabu, 25 Des</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 group">
            <div className="text-zinc-400 dark:text-zinc-600 text-[10px] pt-1.5 w-10 font-bold uppercase tracking-wider">09:00</div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/20 group-hover:border-lime-400/30 transition-colors">
              <div className="text-zinc-950 dark:text-white text-sm font-bold mb-1 leading-tight">Team Standup</div>
              <div className="text-zinc-500 dark:text-zinc-500 text-xs">Meeting Room A • 30 min</div>
            </div>
          </div>

          <div className="flex items-start gap-4 group">
            <div className="text-zinc-400 dark:text-zinc-600 text-[10px] pt-1.5 w-10 font-bold uppercase tracking-wider">14:00</div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/20 group-hover:border-lime-400/30 transition-colors">
              <div className="text-zinc-950 dark:text-white text-sm font-bold mb-1 leading-tight">Design Review</div>
              <div className="text-zinc-500 dark:text-zinc-500 text-xs">Virtual • 1 hour</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}