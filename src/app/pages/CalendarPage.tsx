import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarPage() {
  const currentMonth = 'Desember 2025';
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  
  // Generate calendar days (simplified)
  const calendarDays = [
    { day: 1, hasEvent: false, isToday: false, isWeekend: false },
    { day: 2, hasEvent: true, isToday: false, isWeekend: false },
    { day: 3, hasEvent: false, isToday: false, isWeekend: false },
    { day: 4, hasEvent: false, isToday: false, isWeekend: false },
    { day: 5, hasEvent: false, isToday: false, isWeekend: false },
    { day: 6, hasEvent: false, isToday: false, isWeekend: true },
    { day: 7, hasEvent: false, isToday: false, isWeekend: true },
    { day: 8, hasEvent: false, isToday: false, isWeekend: false },
    { day: 9, hasEvent: false, isToday: false, isWeekend: false },
    { day: 10, hasEvent: false, isToday: false, isWeekend: false },
    { day: 11, hasEvent: false, isToday: false, isWeekend: false },
    { day: 12, hasEvent: true, isToday: false, isWeekend: false },
    { day: 13, hasEvent: false, isToday: false, isWeekend: true },
    { day: 14, hasEvent: false, isToday: false, isWeekend: true },
    { day: 15, hasEvent: false, isToday: false, isWeekend: false },
    { day: 16, hasEvent: false, isToday: false, isWeekend: false },
    { day: 17, hasEvent: false, isToday: false, isWeekend: false },
    { day: 18, hasEvent: false, isToday: false, isWeekend: false },
    { day: 19, hasEvent: false, isToday: false, isWeekend: false },
    { day: 20, hasEvent: false, isToday: false, isWeekend: true },
    { day: 21, hasEvent: false, isToday: false, isWeekend: true },
    { day: 22, hasEvent: false, isToday: false, isWeekend: false },
    { day: 23, hasEvent: false, isToday: false, isWeekend: false },
    { day: 24, hasEvent: false, isToday: false, isWeekend: false },
    { day: 25, hasEvent: true, isToday: true, isWeekend: false },
    { day: 26, hasEvent: false, isToday: false, isWeekend: false },
    { day: 27, hasEvent: false, isToday: false, isWeekend: true },
    { day: 28, hasEvent: false, isToday: false, isWeekend: true },
    { day: 29, hasEvent: false, isToday: false, isWeekend: false },
    { day: 30, hasEvent: false, isToday: false, isWeekend: false },
    { day: 31, hasEvent: true, isToday: false, isWeekend: false },
  ];

  const events = [
    { date: '2 Des', title: 'Team Building', time: '09:00 - 17:00', type: 'company' },
    { date: '12 Des', title: 'Performance Review', time: '14:00 - 15:00', type: 'personal' },
    { date: '25 Des', title: 'Libur Natal', time: 'Sepanjang hari', type: 'holiday' },
    { date: '31 Des', title: 'Tutup Tahun', time: 'Sepanjang hari', type: 'holiday' },
  ];

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center justify-between mb-6">
          <div className="text-zinc-900 dark:text-white font-medium">{currentMonth}</div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </button>
          </div>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((item, index) => (
            <button
              key={index}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm relative transition-colors ${
                item.isToday
                  ? 'bg-lime-400 text-zinc-900 font-semibold'
                  : item.isWeekend
                  ? 'text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {item.day}
              {item.hasEvent && !item.isToday && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-lime-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <CalendarIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm">Event Mendatang</div>
        </div>

        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 text-center">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{event.date}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-zinc-900 dark:text-white text-sm font-medium mb-1">
                        {event.title}
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400 text-xs">{event.time}</div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs ${
                        event.type === 'holiday'
                          ? 'bg-lime-400/10 text-lime-600 dark:text-lime-400'
                          : event.type === 'company'
                          ? 'bg-blue-400/10 text-blue-600 dark:text-blue-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {event.type === 'holiday' ? 'Libur' : event.type === 'company' ? 'Kantor' : 'Pribadi'}
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