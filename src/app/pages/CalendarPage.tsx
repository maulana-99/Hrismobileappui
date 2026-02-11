import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

export function CalendarPage() {
  const currentMonth = 'Desember 2025';
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const textureStyle = {
    backgroundImage: 'url("/master%202.png")',
    backgroundSize: '400px 400px',
  };

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
    { date: '2 Des', title: 'Team Building', time: '09:00 - 17:00', type: 'company', location: 'Merapi Ballroom' },
    { date: '12 Des', title: 'Performance Review', time: '14:00 - 15:00', type: 'personal', location: 'Meeting Room 3' },
    { date: '25 Des', title: 'Libur Natal', time: 'Sepanjang hari', type: 'holiday', location: 'Hari Libur Nasional' },
    { date: '31 Des', title: 'Tutup Tahun', time: 'Sepanjang hari', type: 'holiday', location: 'Kantor Pusat' },
  ];

  return (
    <div className="space-y-6">
      {/* Calendar Card */}
      <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-6 font-plus-jakarta overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={textureStyle} />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="text-zinc-950 dark:text-white text-xl font-black tracking-tight">{currentMonth}</div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95">
                <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </button>
              <button className="w-10 h-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95">
                <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map((day) => (
              <div key={day} className="text-center text-[10px] text-zinc-400 dark:text-zinc-600 font-black uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((item, index) => (
              <button
                key={index}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs relative transition-all duration-300 hover:scale-110 group ${item.isToday
                  ? 'bg-lime-400 text-zinc-950 font-black shadow-lg shadow-lime-400/20'
                  : item.isWeekend
                    ? 'text-zinc-400 dark:text-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
              >
                <div className="relative z-10">{item.day}</div>
                {item.hasEvent && !item.isToday && (
                  <div className="absolute bottom-2 w-1 h-1 rounded-full bg-lime-500" />
                )}
                {/* Micro hover effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-zinc-100/50 dark:bg-zinc-800/50 transition-opacity pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div>
        <div className="flex items-center gap-2 mb-5 px-1">
          <CalendarIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white text-sm font-black tracking-tight uppercase tracking-wider">Event Mendatang</div>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900/50 rounded-[28px] p-5 border border-zinc-200 dark:border-zinc-800/50 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={textureStyle} />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/50 flex flex-col items-center justify-center group-hover:bg-lime-400 transition-colors duration-500">
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 font-bold uppercase tracking-tighter leading-none mb-1">
                      {event.date.split(' ')[1]}
                    </div>
                    <div className="text-lg text-zinc-900 dark:text-white group-hover:text-zinc-900 font-black leading-none">
                      {event.date.split(' ')[0]}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-zinc-950 dark:text-white text-base font-black tracking-tight leading-tight">
                        {event.title}
                      </h4>
                      <div
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${event.type === 'holiday'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : event.type === 'company'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                          }`}
                      >
                        {event.type === 'holiday' ? 'Libur' : event.type === 'company' ? 'Kantor' : 'Pribadi'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-500 text-xs font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{event.location}</span>
                      </div>
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