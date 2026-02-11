import { useMemo, useState } from 'react';

type AttendanceStatus = 'present' | 'late' | 'absent' | 'empty';

interface DayData {
    day: number;
    status: AttendanceStatus;
}

interface MonthData {
    name: string;
    days: DayData[];
}

export function AttendanceHeatmap({ className = '' }: { className?: string }) {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    // Generate sample data for 6 months to enable scrolling
    const monthsData: MonthData[] = useMemo(() => {
        const months = ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar'];
        return months.map((name, monthIdx) => {
            const daysInMonth = 30; // Simplified
            const days: DayData[] = [];

            for (let i = 0; i < 35; i++) {
                const rand = Math.random();
                let status: AttendanceStatus = 'empty';

                if (i < daysInMonth) {
                    if (rand > 0.95) status = 'absent';
                    else if (rand > 0.85) status = 'late';
                    else if (rand > 0.75) status = 'present';
                }

                days.push({
                    day: i + 1,
                    status
                });
            }
            return { name, days };
        });
    }, []);

    // Calculate stats based on selection
    const stats = useMemo(() => {
        let present = 0, late = 0, absent = 0;

        const targetMonths = selectedMonth
            ? monthsData.filter(m => m.name === selectedMonth)
            : monthsData;

        targetMonths.forEach(month => {
            month.days.forEach(day => {
                if (day.status === 'present') present++;
                if (day.status === 'late') late++;
                if (day.status === 'absent') absent++;
            });
        });

        const total = present + late + absent || 1;
        return {
            present: (present / total) * 100,
            late: (late / total) * 100,
            absent: (absent / total) * 100,
            raw: { present, late, absent }
        };
    }, [monthsData, selectedMonth]);

    return (
        <div className={`bg-white dark:bg-[#121214] border border-zinc-200 dark:border-transparent shadow-md dark:shadow-none rounded-[32px] p-6 font-plus-jakarta relative overflow-hidden ${className}`}>
            {/* Background Texture */}
            <div
                className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat"
                style={{
                    backgroundImage: 'url("/master%202.png")',
                    backgroundSize: '180px 180px',
                }}
            />

            <div className="relative z-10">
                {/* Heatmap Grids with Horizontal Scroll */}
                <div className="overflow-x-auto pb-6 scrollbar-hide custom-scrollbar">
                    <div className="flex gap-8 px-2 min-w-max">
                        {monthsData.map((month) => {
                            const isActive = selectedMonth === month.name;
                            return (
                                <div
                                    key={month.name}
                                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${selectedMonth && !isActive ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
                                        }`}
                                    onClick={() => setSelectedMonth(isActive ? null : month.name)}
                                >
                                    <span className={`text-[13px] font-extrabold mb-4 transition-colors ${isActive ? 'text-lime-600 dark:text-[#a3e635]' : 'text-zinc-950 dark:text-zinc-100'
                                        }`}>
                                        {month.name}
                                    </span>
                                    <div className={`p-2.5 rounded-2xl transition-all ${isActive ? 'bg-zinc-100 dark:bg-zinc-800/40 ring-1 ring-zinc-200 dark:ring-zinc-700/50 shadow-inner' : ''}`}>
                                        {/* Day Initials Header */}
                                        <div className="grid grid-cols-7 gap-1.5 mb-2.5 px-0.5">
                                            {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, i) => (
                                                <span key={i} className="text-[9px] text-zinc-500 dark:text-zinc-600 font-extrabold text-center">
                                                    {day}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1.5">
                                            {month.days.map((day, idx) => {
                                                let statusClass = 'bg-zinc-200 dark:bg-zinc-800';
                                                if (day.status === 'present') statusClass = 'bg-lime-500 dark:bg-[#a3e635] shadow-[0_0_8px_rgba(132,204,22,0.4)]';
                                                if (day.status === 'late') statusClass = 'bg-orange-500 dark:bg-[#fb923c] shadow-[0_0_8px_rgba(249,115,22,0.4)]';
                                                if (day.status === 'absent') statusClass = 'bg-rose-500 dark:bg-[#f87171] shadow-[0_0_8px_rgba(244,63,94,0.4)]';

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`w-[8px] h-[8px] rounded-[2px] transition-colors duration-300 ${statusClass}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary Bar Section */}
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-zinc-600 dark:text-zinc-400 text-xs font-bold tracking-tight">
                            {selectedMonth ? `Ringkasan Bulan ${selectedMonth}` : 'Ringkasan 6 Bulan'}
                        </span>
                        <button
                            onClick={() => setSelectedMonth(null)}
                            className={`text-zinc-600 dark:text-zinc-500 text-[10px] font-extrabold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-white transition-all ${!selectedMonth && 'invisible'}`}
                        >
                            Tampilkan Semua
                        </button>
                    </div>

                    {/* Segmented Bar - High Contrast */}
                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full flex overflow-hidden mb-6 border border-zinc-200 dark:border-transparent">
                        <div
                            style={{ width: `${stats.present}%` }}
                            className="h-full bg-lime-500 dark:bg-[#a3e635] transition-all duration-700 ease-in-out relative group"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div
                            style={{ width: `${stats.late}%` }}
                            className="h-full bg-orange-500 dark:bg-[#fb923c] transition-all duration-700 ease-in-out relative group"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div
                            style={{ width: `${stats.absent}%` }}
                            className="h-full bg-rose-500 dark:bg-[#f87171] transition-all duration-700 ease-in-out relative group"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    {/* Legend/Labels - Modern Badges */}
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-transparent shrink-0">
                            <div className="w-2 h-2 rounded-full bg-lime-500" />
                            <span className="text-zinc-950 dark:text-zinc-100 text-[11px] font-extrabold">{stats.raw.present} Masuk</span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-transparent shrink-0">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-zinc-950 dark:text-zinc-100 text-[11px] font-extrabold">{stats.raw.late} Telat</span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-transparent shrink-0">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="text-zinc-950 dark:text-zinc-100 text-[11px] font-extrabold">{stats.raw.absent} Alpa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
