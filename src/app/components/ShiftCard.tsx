import { useState, useMemo } from "react";
import { Sun, Moon, Sunset, Clock, ChevronRight, Timer, Coffee, Umbrella, Sparkles } from "lucide-react";
import type {
    Shift,
    EmployeeShift,
    ShiftSchedule,
} from "../types/shift";
import {
    DAY_NAMES_ID,
    getShiftType,
    formatTime,
    getScheduleForDay,
    isShiftActive,
} from "../types/shift";

// ============================================
// Mock Data based on Database Tables
// ============================================

// Table: shifts - Master shift definitions
const mockShifts: Shift[] = [
    {
        id: 1,
        name: 'Shift Pagi',
        code: 'PAGI',
        description: 'Shift kerja pagi hari',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 2,
        name: 'Shift Siang',
        code: 'SIANG',
        description: 'Shift kerja siang/sore hari',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 3,
        name: 'Shift Malam',
        code: 'MALAM',
        description: 'Shift kerja malam hari',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
    },
];

const mockEmployeeShift: EmployeeShift = {
    id: 1,
    employee_id: 101,
    shift_id: 1,
    effective_from: '2026-01-01',
    effective_to: null,
    created_at: '2026-01-01T00:00:00Z',
};

const mockShiftSchedules: ShiftSchedule[] = [
    { id: 1, shift_id: 1, day_of_week: 1, start_time: '08:00:00', end_time: '16:00:00', is_working_day: true },
    { id: 2, shift_id: 1, day_of_week: 2, start_time: '14:00:00', end_time: '22:00:00', is_working_day: true },
    { id: 3, shift_id: 1, day_of_week: 3, start_time: '22:00:00', end_time: '06:00:00', is_working_day: true },
    { id: 4, shift_id: 1, day_of_week: 4, start_time: '08:00:00', end_time: '16:00:00', is_working_day: true },
    { id: 5, shift_id: 1, day_of_week: 5, start_time: '14:00:00', end_time: '22:00:00', is_working_day: true },
    { id: 6, shift_id: 1, day_of_week: 6, start_time: '08:00:00', end_time: '12:00:00', is_working_day: false },
    { id: 7, shift_id: 1, day_of_week: 0, start_time: '08:00:00', end_time: '12:00:00', is_working_day: false },
];

interface ShiftCardProps {
    onNavigate?: (page: string) => void;
}

export function ShiftCard({ onNavigate }: ShiftCardProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isHovered, setIsHovered] = useState(false);

    const currentShift = useMemo(() => {
        const shift = mockShifts.find(s => s.id === mockEmployeeShift.shift_id);
        const schedules = mockShiftSchedules.filter(s => s.shift_id === mockEmployeeShift.shift_id);
        const today = new Date().getDay();
        const todaySchedule = getScheduleForDay(schedules, today);

        return {
            shift,
            schedules,
            todaySchedule,
            isActive: todaySchedule ? isShiftActive(todaySchedule) : false,
        };
    }, []);

    const weeklyShifts = useMemo(() => {
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((currentDayOfWeek === 0 ? 7 : currentDayOfWeek) - 1));

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            const dayOfWeek = date.getDay();
            const schedule = getScheduleForDay(currentShift.schedules, dayOfWeek);
            const isWorkingDay = schedule?.is_working_day ?? false;
            const shiftType = schedule && isWorkingDay ? getShiftType(schedule.start_time) : 'off';

            const shiftNameMap = { morning: 'Pagi', afternoon: 'Siang', night: 'Malam', off: 'Libur' };

            return {
                dayOfWeek,
                dayName: DAY_NAMES_ID[dayOfWeek],
                date: date.getDate(),
                fullDate: date,
                shiftName: shiftNameMap[shiftType],
                shiftType,
                startTime: schedule ? formatTime(schedule.start_time) : null,
                endTime: schedule ? formatTime(schedule.end_time) : null,
                isWorkingDay,
                isToday: date.toDateString() === today.toDateString(),
                isSelected: date.toDateString() === selectedDate.toDateString(),
            };
        });
    }, [currentShift.schedules, selectedDate]);

    const displayShiftInfo = useMemo(() => {
        if (!currentShift.shift) return null;
        const dayOfWeek = selectedDate.getDay();
        const schedule = getScheduleForDay(currentShift.schedules, dayOfWeek);
        const isToday = selectedDate.toDateString() === new Date().toDateString();

        if (!schedule) return { isWorkingDay: false, isToday, dateDisplay: selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' }) };

        const type = getShiftType(schedule.start_time);
        const shiftNameMap = { morning: 'Shift Pagi', afternoon: 'Shift Siang', night: 'Shift Malam' };

        return {
            name: shiftNameMap[type] || currentShift.shift.name,
            type,
            timeStart: formatTime(schedule.start_time),
            timeEnd: formatTime(schedule.end_time),
            isWorkingDay: schedule.is_working_day,
            isActive: isToday && isShiftActive(schedule),
            isToday,
            dateDisplay: selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' }),
        };
    }, [currentShift, selectedDate]);

    const shiftStats = useMemo(() => {
        const stats: Record<string, number> = { morning: 0, afternoon: 0, night: 0 };
        weeklyShifts.forEach(day => {
            if (day.isWorkingDay && day.shiftType !== 'off') stats[day.shiftType]++;
        });
        return stats;
    }, [weeklyShifts]);

    const getShiftIcon = (type: string) => {
        switch (type) {
            case 'morning': return <Sun className="w-4 h-4" />;
            case 'afternoon': return <Sunset className="w-4 h-4" />;
            case 'night': return <Moon className="w-4 h-4" />;
            default: return null;
        }
    };

    const getShiftGradient = (type: string) => {
        switch (type) {
            case 'morning': return 'from-amber-400 via-orange-400 to-rose-400';
            case 'afternoon': return 'from-violet-400 via-purple-400 to-fuchsia-400';
            case 'night': return 'from-indigo-500 via-purple-500 to-pink-500';
            default: return 'from-zinc-400 to-zinc-500';
        }
    };

    const getShiftBgColor = (type: string, isToday: boolean) => {
        if (isToday) return 'bg-lime-400';
        switch (type) {
            case 'morning': return 'bg-amber-50 dark:bg-amber-900/20';
            case 'afternoon': return 'bg-violet-50 dark:bg-violet-900/20';
            case 'night': return 'bg-indigo-50 dark:bg-indigo-900/20';
            default: return 'bg-zinc-50 dark:bg-zinc-900/30';
        }
    };

    const getShiftTextColor = (type: string, isToday: boolean) => {
        if (isToday) return 'text-zinc-900';
        switch (type) {
            case 'morning': return 'text-amber-600 dark:text-amber-400';
            case 'afternoon': return 'text-violet-600 dark:text-violet-400';
            case 'night': return 'text-indigo-600 dark:text-indigo-400';
            default: return 'text-zinc-400 dark:text-zinc-500';
        }
    };

    const calculateWorkedTime = () => {
        if (!displayShiftInfo || !displayShiftInfo.isWorkingDay) return '0j 0m';
        const now = new Date();
        const [startHour, startMin] = (displayShiftInfo.timeStart || '00:00').split(':').map(Number);
        const [endHour, endMin] = (displayShiftInfo.timeEnd || '00:00').split(':').map(Number);
        const startTime = new Date(now);
        startTime.setHours(startHour, startMin, 0, 0);
        let endTime = new Date(now);
        endTime.setHours(endHour, endMin, 0, 0);
        if (endTime < startTime) {
            if (now.getHours() < endHour || (now.getHours() === endHour && now.getMinutes() < endMin)) startTime.setDate(startTime.getDate() - 1);
            else if (now.getHours() >= startHour) endTime.setDate(endTime.getDate() + 1);
        }
        if (now < startTime) return '0j 0m';
        if (now > endTime) return 'Selesai';
        const diff = now.getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}j ${minutes}m`;
    };

    const textureStyle = {
        backgroundImage: 'url("/master%202.png")',
        backgroundSize: '400px 400px',
    };

    const denseTextureStyle = {
        backgroundImage: 'url("/master%202.png")',
        backgroundSize: '180px 180px',
    };

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-bold tracking-tight">Shift Anda</h3>
                </div>
                <button
                    onClick={() => onNavigate?.('shift')}
                    className="flex items-center gap-1 text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300 text-sm font-bold transition-colors"
                >
                    Lihat Semua
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {displayShiftInfo && displayShiftInfo.isWorkingDay ? (
                <div
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getShiftGradient(displayShiftInfo.type!)} p-px transition-all duration-500 group`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative overflow-hidden rounded-[23px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
                        <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-repeat mix-blend-overlay" style={denseTextureStyle} />
                        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/20 blur-3xl transition-all duration-700 ${isHovered ? 'scale-150 opacity-30' : 'scale-100 opacity-20'}`} />
                        <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-white/10 blur-3xl transition-all duration-700 ${isHovered ? 'scale-150 opacity-20' : 'scale-100 opacity-10'}`} />
                        <div className="relative p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {getShiftIcon(displayShiftInfo.type!)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg drop-shadow-sm">{displayShiftInfo.name}</h4>
                                        <p className="text-white/70 text-sm">{displayShiftInfo.isToday ? 'Hari ini' : displayShiftInfo.dateDisplay}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <span className="relative flex h-2 w-2">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${displayShiftInfo.isActive ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-2 w-2 ${displayShiftInfo.isActive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                    </span>
                                    <span className="text-white text-xs font-semibold">{displayShiftInfo.isActive ? 'Aktif' : 'Menunggu'}</span>
                                </div>
                            </div>
                            <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-white/60 text-xs mb-1">Mulai</p>
                                        <p className="text-white text-xl font-bold tabular-nums">{displayShiftInfo.timeStart}</p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-white/40"></div>
                                            <div className="w-8 h-0.5 bg-gradient-to-r from-white/40 to-white/20"></div>
                                            <Timer className="w-4 h-4 text-white/60" />
                                            <div className="w-8 h-0.5 bg-gradient-to-l from-white/40 to-white/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-white/40"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-xs mb-1">Selesai</p>
                                        <p className="text-white text-xl font-bold tabular-nums">{displayShiftInfo.timeEnd}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
                                    <Timer className="w-4 h-4 text-white/70" />
                                    <div>
                                        <p className="text-white/60 text-[10px]">Sudah Bekerja</p>
                                        <p className="text-white text-xs font-medium">{calculateWorkedTime()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 p-px transition-all duration-500 group">
                    <div className="relative overflow-hidden rounded-[23px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl p-6">
                        <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-repeat mix-blend-overlay" style={denseTextureStyle} />
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-teal-300/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full animate-pulse"></div>
                                <div className="relative w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30 group-hover:rotate-6 transition-transform duration-500">
                                    <Umbrella className="w-10 h-10 text-white" />
                                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-200 animate-bounce" />
                                </div>
                            </div>
                            <h4 className="text-white font-extrabold text-2xl mb-2 tracking-tight drop-shadow-md">{displayShiftInfo?.isToday ? 'Waktunya Istirahat! ✨' : (displayShiftInfo?.dateDisplay || 'Hari Libur')}</h4>
                            <div className="bg-black/10 backdrop-blur-sm px-4 py-2 rounded-2xl mb-4 border border-white/10">
                                <p className="text-white/90 text-sm font-medium">{displayShiftInfo?.isToday ? 'Nikmati hari libur Anda hari ini.' : 'Tidak ada jadwal shift pada tanggal ini.'}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                <Coffee className="w-4 h-4 text-white" />
                                <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Happy Holiday</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden">
                {/* Background Texture */}
                <div
                    className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat"
                    style={textureStyle}
                />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3 text-zinc-600 dark:text-zinc-400">
                        <p className="text-sm font-bold">Jadwal Minggu Ini</p>
                        <p className="text-xs font-medium uppercase tracking-wider">Feb 2026</p>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                        {weeklyShifts.map((item, index) => (
                            <button
                                key={index}
                                className={`relative flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden group/btn ${getShiftBgColor(item.shiftType, item.isSelected)} ${item.isSelected ? 'ring-2 ring-lime-400 ring-offset-2 dark:ring-offset-zinc-900 shadow-lg' : ''} ${item.isToday && !item.isSelected ? 'border border-lime-400/50' : ''}`}
                                onClick={() => setSelectedDate(item.fullDate)}
                            >
                                {/* Micro Texture inside button */}
                                <div
                                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
                                    style={{ ...textureStyle, backgroundSize: '100px 100px' }}
                                />

                                <div className="relative z-10 flex flex-col items-center">
                                    {item.isToday && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime-500" />}
                                    <span className={`text-[9px] font-bold mb-0.5 uppercase tracking-tighter ${item.isSelected ? 'text-zinc-900' : 'text-zinc-500 dark:text-zinc-500'}`}>{item.dayName}</span>
                                    <span className={`text-sm font-black mb-1 ${item.isSelected ? 'text-zinc-900' : 'text-zinc-950 dark:text-white'}`}>{item.date}</span>
                                    <div className={`h-5 flex items-center justify-center ${getShiftTextColor(item.shiftType, item.isSelected)}`}>
                                        {item.shiftType !== 'off' ? getShiftIcon(item.shiftType) : <Umbrella className="w-3 h-3 opacity-40" />}
                                    </div>
                                    <span className={`text-[8px] font-bold uppercase tracking-tighter ${item.isSelected ? 'text-zinc-900/80' : getShiftTextColor(item.shiftType, item.isSelected)}`}>{item.shiftName}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {[
                    { type: 'morning', icon: Sun, color: 'amber', label: 'Shift Pagi', count: shiftStats.morning },
                    { type: 'afternoon', icon: Sunset, color: 'violet', label: 'Shift Siang', count: shiftStats.afternoon },
                    { type: 'night', icon: Moon, color: 'indigo', label: 'Shift Malam', count: shiftStats.night },
                ].map((stat) => (
                    <div key={stat.type} className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-xl p-3 text-center border border-${stat.color}-100 dark:border-${stat.color}-800/30 relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={textureStyle} />
                        <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-500`} />
                            </div>
                            <p className={`text-${stat.color}-950 dark:text-${stat.color}-400 text-xl font-black`}>{stat.count}</p>
                            <p className={`text-${stat.color}-600 dark:text-${stat.color}-500 text-[10px] font-bold uppercase tracking-tighter`}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
