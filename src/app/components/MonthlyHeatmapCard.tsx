import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';

type AttendanceStatus = 'present' | 'late' | 'absent' | 'empty' | 'future';

interface DayData {
    day: number;
    date: Date;
    status: AttendanceStatus;
}

export function MonthlyHeatmapCard({ className = '' }: { className?: string }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthName = useMemo(() => {
        return currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
    }, [currentDate]);

    const daysInMonth = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        // Adjust for Monday start (S S R K J S M)
        // firstDayOfMonth: 0 (Sun), 1 (Mon), ..., 6 (Sat)
        // We want Monday (1) to be index 0.
        const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days: DayData[] = [];

        // Padding for the beginning of the month
        for (let i = 0; i < startingDayIndex; i++) {
            days.push({
                day: 0,
                date: new Date(0),
                status: 'empty'
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const date = new Date(year, month, i);
            let status: AttendanceStatus = 'present';

            if (date > today) {
                status = 'future';
            } else {
                const rand = Math.random();
                if (rand > 0.9) status = 'absent';
                else if (rand > 0.8) status = 'late';
                else status = 'present';
            }

            days.push({
                day: i,
                date,
                status
            });
        }

        return days;
    }, [currentDate]);

    const stats = useMemo(() => {
        const present = daysInMonth.filter(d => d.status === 'present').length;
        const late = daysInMonth.filter(d => d.status === 'late').length;
        const absent = daysInMonth.filter(d => d.status === 'absent').length;
        const total = present + late + absent || 1;

        return {
            present,
            late,
            absent,
            percentage: Math.round((present / total) * 100)
        };
    }, [daysInMonth]);

    const nextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    return (
        <div className={`bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-6 font-plus-jakarta overflow-hidden relative ${className}`}>
            {/* Background Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
                style={{
                    backgroundImage: 'url("/master%202.png")',
                    backgroundSize: '180px 180px',
                }}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-xl bg-lime-400/10 flex items-center justify-center">
                                <CalendarIcon className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                            </div>
                            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">{monthName}</span>
                        </div>

                        <div className="flex items-end gap-3">
                            <h2 className="text-zinc-900 dark:text-white text-4xl font-black tracking-tighter">
                                {stats.percentage}%
                            </h2>
                            <div className="flex items-center gap-1 bg-lime-500/10 text-lime-600 dark:text-lime-400 px-2 py-1 rounded-lg mb-1">
                                <TrendingUp className="w-3 h-3" />
                                <span className="text-[10px] font-bold">+2.4%</span>
                            </div>
                        </div>
                        <p className="text-zinc-400 dark:text-zinc-500 text-[11px] font-medium">Kehadiran bulan ini meningkat dari bulan lalu</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevMonth}
                            className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-6">
                    <div className="grid grid-cols-7 gap-2 mb-3">
                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
                            <span key={day} className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold text-center uppercase tracking-wider">
                                {day}
                            </span>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map((day, idx) => {
                            let statusClass = 'bg-zinc-100 dark:bg-zinc-900';
                            let tooltip = '';

                            if (day.status === 'present') {
                                statusClass = 'bg-lime-500 dark:bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.3)]';
                                tooltip = 'Hadir';
                            } else if (day.status === 'late') {
                                statusClass = 'bg-orange-500 dark:bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]';
                                tooltip = 'Terlambat';
                            } else if (day.status === 'absent') {
                                statusClass = 'bg-rose-500 dark:bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                                tooltip = 'Alpa';
                            } else if (day.status === 'future') {
                                statusClass = 'bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/30';
                            } else if (day.status === 'empty') {
                                statusClass = 'opacity-0 pointer-events-none';
                            }

                            return (
                                <div
                                    key={idx}
                                    className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 relative group hover:scale-110 hover:z-20 cursor-default ${statusClass}`}
                                >
                                    {day.day > 0 && (
                                        <span className={`text-[9px] font-bold ${day.status === 'present' || day.status === 'late' || day.status === 'absent'
                                            ? 'text-white'
                                            : 'text-zinc-400 dark:text-zinc-600'
                                            }`}>
                                            {day.day}
                                        </span>
                                    )}
                                    {tooltip && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                            {day.day} {monthName}: {tooltip}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex flex-col">
                        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Masuk</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                            <span className="text-zinc-900 dark:text-white font-extrabold text-sm">{stats.present} Hari</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Lat</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-zinc-900 dark:text-white font-extrabold text-sm">{stats.late} Hari</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Alpa</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-zinc-900 dark:text-white font-extrabold text-sm">{stats.absent} Hari</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
