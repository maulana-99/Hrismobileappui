export function TodaySchedule() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
      <div className="flex items-center justify-between mb-5">
        <div className="text-zinc-900 dark:text-white text-sm">Jadwal Hari Ini</div>
        <div className="text-zinc-500 dark:text-zinc-600 text-xs">Rabu, 25 Des</div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-4">
          <div className="text-zinc-500 text-xs pt-0.5 w-12">09:00</div>
          <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-3 border border-zinc-100 dark:border-zinc-800/30">
            <div className="text-zinc-900 dark:text-white text-sm mb-1">Team Standup</div>
            <div className="text-zinc-600 dark:text-zinc-600 text-xs">Meeting Room A • 30 min</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="text-zinc-500 text-xs pt-0.5 w-12">14:00</div>
          <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-3 border border-zinc-100 dark:border-zinc-800/30">
            <div className="text-zinc-900 dark:text-white text-sm mb-1">Design Review</div>
            <div className="text-zinc-600 dark:text-zinc-600 text-xs">Virtual • 1 hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}