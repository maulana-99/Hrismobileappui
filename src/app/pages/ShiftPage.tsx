import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon, Briefcase } from 'lucide-react';

type ShiftType = 'morning' | 'afternoon' | 'night' | 'off';

interface DayShift {
    day: number;
    date: Date;
    type: ShiftType;
    time: string;
    location: string;
}

export function ShiftPage() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026

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

    const daysInMonth = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        // Adjust for Monday start
        const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days: (DayShift | null)[] = [];

        // Padding
        for (let i = 0; i < startingDayIndex; i++) {
            days.push(null);
        }

        const shiftTypes: ShiftType[] = ['morning', 'afternoon', 'night', 'off'];

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const date = new Date(year, month, i);
            // Deterministic but random-looking shift assignment
            const dayOfWeek = date.getDay();
            let type: ShiftType = 'morning';

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                type = 'off';
            } else if (i % 3 === 0) {
                type = 'night';
            } else if (i % 2 === 0) {
                type = 'afternoon';
            }

            let time = '';
            switch (type) {
                case 'morning': time = '08:00 - 16:00'; break;
                case 'afternoon': time = '14:00 - 22:00'; break;
                case 'night': time = '22:00 - 06:00'; break;
                case 'off': time = 'Libur'; break;
            }

            days.push({
                day: i,
                date,
                type,
                time,
                location: 'Kantor Utama (Pusat)',
            });
        }

        return days;
    }, [currentDate]);

    const getShiftColor = (type: ShiftType) => {
        switch (type) {
            case 'morning': return 'bg-lime-400 text-zinc-950 shadow-lime-400/20';
            case 'afternoon': return 'bg-orange-400 text-zinc-950 shadow-orange-400/20';
            case 'night': return 'bg-indigo-500 text-white shadow-indigo-500/20';
            case 'off': return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500';
            default: return '';
        }
    };

    const getShiftLabel = (type: ShiftType) => {
        switch (type) {
            case 'morning': return 'Pagi';
            case 'afternoon': return 'Siang';
            case 'night': return 'Malam';
            case 'off': return 'Libur';
        }
    };

    const nextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Month Selector Card */}
            <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-6 relative overflow-hidden">
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

            {/* Shift Calendar Grid */}
            <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/50 shadow-sm rounded-[32px] p-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat mix-blend-overlay" style={textureStyle} />

                <div className="relative z-10">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pt-1">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map((day, idx) => (
                            <div key={idx} className="aspect-square relative">
                                {day ? (
                                    <div className={`w-full h-full rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all hover:scale-105 relative overflow-hidden group ${getShiftColor(day.type)}`}>
                                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat" style={denseTextureStyle} />
                                        <span className="text-xs font-black leading-none z-10">{day.day}</span>
                                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-80 z-10">{getShiftLabel(day.type)}</span>
                                    </div>
                                ) : (
                                    <div className="w-full h-full rounded-2xl opacity-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Shift Legend & Overview */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden shadow-sm">
                    <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={denseTextureStyle} />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-zinc-400" />
                            <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Keterangan Shift</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Pagi (08:00 - 16:00)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Siang (14:00 - 22:00)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Malam (22:00 - 06:00)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden shadow-sm">
                    <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat" style={denseTextureStyle} />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-zinc-400" />
                            <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Lokasi Default</span>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-100 dark:border-zinc-800/30">
                            <p className="text-[11px] font-black text-zinc-950 dark:text-white leading-tight">Kantor Jakarta Pusat</p>
                            <p className="text-[9px] text-zinc-500 mt-0.5">Sudirman Central Business District</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Card */}
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
