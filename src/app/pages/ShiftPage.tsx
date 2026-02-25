import { useState, useMemo } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Calendar as CalendarIcon,
    Briefcase,
    Sun,
    Sunset,
    Moon,
    Umbrella,
    Info,
    Shield,
    CalendarDays,
} from 'lucide-react';
import type {
    Shift,
    EmployeeShift,
    ShiftSchedule,
} from '../types/shift';
import {
    DAY_NAMES_ID,
    DAY_NAMES_FULL_ID,
    getShiftType,
    formatTime,
    getScheduleForDay,
} from '../types/shift';

// ============================================
// Mock Data based on Database Tables
// ============================================

// Table: shifts
const mockShift: Shift = {
    id: 1,
    name: 'Shift Pagi',
    code: 'PAGI',
    description: 'Shift kerja pagi hari',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
};

// Table: employee_shifts
const mockEmployeeShift: EmployeeShift = {
    id: 1,
    employee_id: 101,
    shift_id: 1,
    effective_from: '2026-01-15',
    effective_to: '2026-06-30',
    created_at: '2026-01-10T00:00:00Z',
};

// Table: shift_schedules (7 entries for day_of_week 0-6)
const mockShiftSchedules: ShiftSchedule[] = [
    { id: 1, shift_id: 1, day_of_week: 1, start_time: '08:00:00', end_time: '16:00:00', is_working_day: true },
    { id: 2, shift_id: 1, day_of_week: 2, start_time: '14:00:00', end_time: '22:00:00', is_working_day: true },
    { id: 3, shift_id: 1, day_of_week: 3, start_time: '22:00:00', end_time: '06:00:00', is_working_day: true },
    { id: 4, shift_id: 1, day_of_week: 4, start_time: '08:00:00', end_time: '16:00:00', is_working_day: true },
    { id: 5, shift_id: 1, day_of_week: 5, start_time: '14:00:00', end_time: '22:00:00', is_working_day: true },
    { id: 6, shift_id: 1, day_of_week: 6, start_time: '08:00:00', end_time: '12:00:00', is_working_day: false },
    { id: 7, shift_id: 1, day_of_week: 0, start_time: '08:00:00', end_time: '12:00:00', is_working_day: false },
];

// ============================================
// Helpers
// ============================================

type ShiftType = 'morning' | 'afternoon' | 'night' | 'off';

interface CalendarDay {
    day: number;
    date: Date;
    shiftType: ShiftType;
    shiftLabel: string;
    startTime: string | null;
    endTime: string | null;
    isWorkingDay: boolean;
    isToday: boolean;
    isInEffectivePeriod: boolean;
}

const getShiftLabelFromType = (type: ShiftType): string => {
    switch (type) {
        case 'morning': return 'Pagi';
        case 'afternoon': return 'Siang';
        case 'night': return 'Malam';
        default: return 'Libur';
    }
};

const getShiftIcon = (type: ShiftType, size: string = 'w-4 h-4') => {
    switch (type) {
        case 'morning': return <Sun className={size} />;
        case 'afternoon': return <Sunset className={size} />;
        case 'night': return <Moon className={size} />;
        default: return <Umbrella className={size} />;
    }
};

// ============================================
// Component
// ============================================

export function ShiftPage() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
    const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

    const textureStyle = {
        backgroundImage: 'url("/master%202.png")',
        backgroundSize: '400px 400px',
    };

    const denseTextureStyle = {
        backgroundImage: 'url("/master%202.png")',
        backgroundSize: '180px 180px',
    };

    const monthName = useMemo(() => {
        return currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
    }, [currentDate]);

    // Check if a date is within the employee's effective assignment period
    const isInEffectivePeriod = (date: Date): boolean => {
        const effectiveFrom = new Date(mockEmployeeShift.effective_from);
        effectiveFrom.setHours(0, 0, 0, 0);

        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        if (checkDate < effectiveFrom) return false;

        if (mockEmployeeShift.effective_to) {
            const effectiveTo = new Date(mockEmployeeShift.effective_to);
            effectiveTo.setHours(0, 0, 0, 0);
            if (checkDate > effectiveTo) return false;
        }
        return true;
    };

    // Build calendar for the month using shift_schedules data
    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Monday start
        const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days: (CalendarDay | null)[] = [];

        for (let i = 0; i < startingDayIndex; i++) {
            days.push(null);
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const date = new Date(year, month, i);
            const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, etc.
            const schedule = getScheduleForDay(mockShiftSchedules, dayOfWeek);
            const inPeriod = isInEffectivePeriod(date);

            let shiftType: ShiftType = 'off';
            let isWorkingDay = false;

            if (inPeriod && schedule) {
                isWorkingDay = schedule.is_working_day;
                shiftType = isWorkingDay ? getShiftType(schedule.start_time) : 'off';
            }

            const dateCheck = new Date(date);
            dateCheck.setHours(0, 0, 0, 0);

            days.push({
                day: i,
                date,
                shiftType,
                shiftLabel: getShiftLabelFromType(shiftType),
                startTime: inPeriod && schedule ? formatTime(schedule.start_time) : null,
                endTime: inPeriod && schedule ? formatTime(schedule.end_time) : null,
                isWorkingDay,
                isToday: dateCheck.getTime() === today.getTime(),
                isInEffectivePeriod: inPeriod,
            });
        }

        return days;
    }, [currentDate]);

    // Weekly pattern summary from shift_schedules
    const weeklyPattern = useMemo(() => {
        // Order: Senin(1) -> Minggu(0)
        const orderedDays = [1, 2, 3, 4, 5, 6, 0];
        return orderedDays.map(dayOfWeek => {
            const schedule = getScheduleForDay(mockShiftSchedules, dayOfWeek);
            const isWorking = schedule?.is_working_day ?? false;
            const type: ShiftType = schedule && isWorking ? getShiftType(schedule.start_time) : 'off';
            return {
                dayOfWeek,
                dayName: DAY_NAMES_ID[dayOfWeek],
                dayNameFull: DAY_NAMES_FULL_ID[dayOfWeek],
                shiftType: type,
                shiftLabel: getShiftLabelFromType(type),
                startTime: schedule ? formatTime(schedule.start_time) : null,
                endTime: schedule ? formatTime(schedule.end_time) : null,
                isWorkingDay: isWorking,
            };
        });
    }, []);

    // Shift stats for the month
    const monthStats = useMemo(() => {
        const stats = { morning: 0, afternoon: 0, night: 0, off: 0, total: 0 };
        calendarDays.forEach(day => {
            if (day) {
                stats.total++;
                stats[day.shiftType]++;
            }
        });
        return stats;
    }, [calendarDays]);

    const getShiftColor = (type: ShiftType) => {
        switch (type) {
            case 'morning': return 'bg-lime-400 text-zinc-950 shadow-lime-400/20';
            case 'afternoon': return 'bg-orange-400 text-zinc-950 shadow-orange-400/20';
            case 'night': return 'bg-indigo-500 text-white shadow-indigo-500/20';
            case 'off': return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600';
            default: return '';
        }
    };

    const getShiftDotColor = (type: ShiftType) => {
        switch (type) {
            case 'morning': return 'bg-lime-400';
            case 'afternoon': return 'bg-orange-400';
            case 'night': return 'bg-indigo-500';
            case 'off': return 'bg-zinc-300 dark:bg-zinc-600';
        }
    };

    const nextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        setSelectedDay(null);
    };

    const prevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        setSelectedDay(null);
    };

    const formatEffectiveDate = (dateStr: string | null): string => {
        if (!dateStr) return 'Sekarang';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-5 animate-fade-in">

            {/* ── Shift Assignment Info ── */}
            <div className="bg-gradient-to-br from-lime-400 via-emerald-400 to-teal-500 rounded-[32px] p-px shadow-xl shadow-emerald-500/10">
                <div className="rounded-[31px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl overflow-hidden relative">
                    <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-repeat mix-blend-overlay" style={denseTextureStyle} />
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-teal-300/20 blur-3xl" />

                    <div className="relative z-10 p-5">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center shadow-lg">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-extrabold text-lg tracking-tight drop-shadow-sm">{mockShift.name}</h3>
                                <p className="text-white/70 text-sm font-medium">Kode: {mockShift.code}</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <span className="text-white text-xs font-bold">
                                    {mockShift.is_active ? '● Aktif' : '○ Nonaktif'}
                                </span>
                            </div>
                        </div>

                        {/* Effective period from employee_shifts */}
                        <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-3.5">
                            <div className="flex items-center gap-2 mb-2">
                                <CalendarDays className="w-3.5 h-3.5 text-white/60" />
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Periode Efektif</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                                    <p className="text-white/50 text-[9px] font-bold uppercase tracking-wider mb-0.5">Dari</p>
                                    <p className="text-white text-sm font-bold">{formatEffectiveDate(mockEmployeeShift.effective_from)}</p>
                                </div>
                                <div className="w-6 h-0.5 bg-white/30 rounded-full" />
                                <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                                    <p className="text-white/50 text-[9px] font-bold uppercase tracking-wider mb-0.5">Sampai</p>
                                    <p className="text-white text-sm font-bold">{formatEffectiveDate(mockEmployeeShift.effective_to)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shift Description */}
                        {mockShift.description && (
                            <div className="mt-3 flex items-start gap-2 bg-white/10 rounded-xl px-3 py-2">
                                <Info className="w-3.5 h-3.5 text-white/50 mt-0.5 shrink-0" />
                                <p className="text-white/70 text-xs font-medium leading-relaxed">{mockShift.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Weekly Pattern (from shift_schedules) ── */}
            <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] pointer-events-none bg-repeat mix-blend-overlay" style={textureStyle} />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Pola Jadwal Mingguan</span>
                    </div>

                    <div className="space-y-2">
                        {weeklyPattern.map((item) => (
                            <div
                                key={item.dayOfWeek}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 ${item.isWorkingDay
                                        ? 'bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50'
                                        : 'bg-zinc-50/50 dark:bg-zinc-900/30 border border-dashed border-zinc-200 dark:border-zinc-800/30'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.isWorkingDay
                                        ? item.shiftType === 'morning' ? 'bg-lime-100 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400'
                                            : item.shiftType === 'afternoon' ? 'bg-orange-100 dark:bg-orange-400/10 text-orange-500 dark:text-orange-400'
                                                : 'bg-indigo-100 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600'
                                    }`}>
                                    {getShiftIcon(item.shiftType, 'w-4 h-4')}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-zinc-900 dark:text-white text-sm font-bold">{item.dayNameFull}</p>
                                    <p className={`text-[11px] font-semibold ${item.isWorkingDay ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-600'
                                        }`}>
                                        {item.isWorkingDay ? `${item.shiftLabel} Shift` : 'Hari Libur'}
                                    </p>
                                </div>

                                {item.isWorkingDay ? (
                                    <div className="text-right">
                                        <p className="text-zinc-900 dark:text-white text-sm font-bold tabular-nums">
                                            {item.startTime} - {item.endTime}
                                        </p>
                                    </div>
                                ) : (
                                    <span className="text-zinc-400 dark:text-zinc-600 text-xs font-bold uppercase tracking-wider">OFF</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Month Selector ── */}
            <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat mix-blend-overlay" style={denseTextureStyle} />

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-lime-400/10 flex items-center justify-center">
                            <CalendarIcon className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div>
                            <h2 className="text-zinc-900 dark:text-white text-xl font-black tracking-tight">{monthName}</h2>
                            <p className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Jadwal Shift Bulanan</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={prevMonth} className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextMonth} className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Calendar Grid ── */}
            <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat mix-blend-overlay" style={textureStyle} />

                <div className="relative z-10">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pt-1">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, idx) => (
                            <div key={idx} className="aspect-square relative">
                                {day ? (
                                    <button
                                        onClick={() => setSelectedDay(day)}
                                        className={`w-full h-full rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all hover:scale-105 relative overflow-hidden group ${day.isInEffectivePeriod
                                                ? getShiftColor(day.shiftType)
                                                : 'bg-zinc-50 dark:bg-zinc-900/30 text-zinc-300 dark:text-zinc-700 border border-dashed border-zinc-200 dark:border-zinc-800/40'
                                            } ${day.isToday ? 'ring-2 ring-lime-500 ring-offset-2 dark:ring-offset-[#121214] scale-105 z-10' : ''} ${selectedDay?.day === day.day ? 'ring-2 ring-zinc-400 dark:ring-zinc-500 ring-offset-1 dark:ring-offset-[#121214]' : ''
                                            }`}
                                    >
                                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat" style={denseTextureStyle} />
                                        <span className="text-xs font-black leading-none z-10">{day.day}</span>
                                        {day.isInEffectivePeriod ? (
                                            <span className="text-[8px] font-black uppercase tracking-tighter opacity-80 z-10">{day.shiftLabel}</span>
                                        ) : (
                                            <span className="text-[7px] font-bold opacity-40 z-10">—</span>
                                        )}
                                    </button>
                                ) : (
                                    <div className="w-full h-full rounded-2xl opacity-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Selected Day Detail ── */}
            {selectedDay && (
                <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-5 relative overflow-hidden animate-fade-in">
                    <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] pointer-events-none bg-repeat mix-blend-overlay" style={denseTextureStyle} />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedDay.shiftType === 'morning' ? 'bg-lime-100 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400'
                                    : selectedDay.shiftType === 'afternoon' ? 'bg-orange-100 dark:bg-orange-400/10 text-orange-500 dark:text-orange-400'
                                        : selectedDay.shiftType === 'night' ? 'bg-indigo-100 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                                }`}>
                                {getShiftIcon(selectedDay.shiftType, 'w-5 h-5')}
                            </div>
                            <div>
                                <h3 className="text-zinc-900 dark:text-white text-base font-black">
                                    {selectedDay.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                                    {selectedDay.isInEffectivePeriod
                                        ? selectedDay.isWorkingDay ? `${selectedDay.shiftLabel} Shift — ${mockShift.name}` : 'Hari Libur'
                                        : 'Di luar periode shift'
                                    }
                                </p>
                            </div>
                        </div>

                        {selectedDay.isInEffectivePeriod && selectedDay.isWorkingDay ? (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-3.5 border border-zinc-100 dark:border-zinc-800/50 text-center">
                                    <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Mulai</p>
                                    <p className="text-zinc-900 dark:text-white text-2xl font-black tabular-nums">{selectedDay.startTime}</p>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-3.5 border border-zinc-100 dark:border-zinc-800/50 text-center">
                                    <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Selesai</p>
                                    <p className="text-zinc-900 dark:text-white text-2xl font-black tabular-nums">{selectedDay.endTime}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/50 text-center">
                                <Umbrella className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bold">
                                    {selectedDay.isInEffectivePeriod ? 'Tidak ada jadwal kerja' : 'Belum/Sudah tidak ditugaskan'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Monthly Stats ── */}
            <div className="grid grid-cols-4 gap-2">
                {[
                    { type: 'morning' as ShiftType, icon: Sun, color: 'lime', label: 'Pagi', count: monthStats.morning },
                    { type: 'afternoon' as ShiftType, icon: Sunset, color: 'orange', label: 'Siang', count: monthStats.afternoon },
                    { type: 'night' as ShiftType, icon: Moon, color: 'indigo', label: 'Malam', count: monthStats.night },
                    { type: 'off' as ShiftType, icon: Umbrella, color: 'zinc', label: 'Libur', count: monthStats.off },
                ].map((stat) => (
                    <div
                        key={stat.type}
                        className={`bg-${stat.color}-50 dark:bg-white/[0.03] backdrop-blur-md rounded-2xl p-3 text-center border border-${stat.color}-100 dark:border-white/[0.08] relative overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 group`}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.08] dark:opacity-30 pointer-events-none bg-repeat mix-blend-overlay transition-opacity duration-300 group-hover:opacity-40"
                            style={{ ...textureStyle, backgroundSize: '100px 100px' }}
                        />
                        <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center mb-1">
                                <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-500 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`} />
                            </div>
                            <p className={`text-${stat.color}-600 dark:text-${stat.color}-400 text-2xl font-black tracking-tighter mb-0.5`}>{stat.count}</p>
                            <p className={`text-zinc-600 dark:text-white/60 text-[9px] font-black uppercase tracking-tighter`}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Shift Legend ── */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={denseTextureStyle} />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Keterangan Warna</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { type: 'morning' as ShiftType, label: 'Shift Pagi' },
                            { type: 'afternoon' as ShiftType, label: 'Shift Siang' },
                            { type: 'night' as ShiftType, label: 'Shift Malam' },
                            { type: 'off' as ShiftType, label: 'Hari Libur' },
                        ].map(item => (
                            <div key={item.type} className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${getShiftDotColor(item.type)}`} />
                                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{item.label}</span>
                            </div>
                        ))}
                        <div className="col-span-2 flex items-center gap-2 mt-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                            <div className="w-2.5 h-2.5 rounded border border-dashed border-zinc-300 dark:border-zinc-600" />
                            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500">Di luar periode efektif</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Quick Action ── */}
            <button className="w-full bg-zinc-950 dark:bg-white p-5 rounded-[28px] flex items-center justify-between group overflow-hidden relative shadow-xl active:scale-[0.98] transition-all">
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-repeat invert dark:invert-0" style={denseTextureStyle} />
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Briefcase className="w-6 h-6 text-white dark:text-zinc-950" />
                    </div>
                    <div className="text-left">
                        <p className="text-white dark:text-zinc-950 text-base font-black tracking-tight">Ajukan Tukar Shift</p>
                        <p className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase">Temukan pengganti hari kerja</p>
                    </div>
                </div>
                <ChevronRight className="w-6 h-6 text-white dark:text-zinc-950 opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
