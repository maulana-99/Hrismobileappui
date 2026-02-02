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
        <div className={`bg-[#121214] rounded-[32px] p-6 font-plus-jakarta ${className}`}>
            {/* Heatmap Grids with Horizontal Scroll */}
            <div className="overflow-x-auto pb-6 scrollbar-hide custom-scrollbar">
                <div className="flex gap-8 px-2 min-w-max">
                    {monthsData.map((month) => {
                        const isActive = selectedMonth === month.name;
                        return (
                            <div
                                key={month.name}
                                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${selectedMonth && !isActive ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                                    }`}
                                onClick={() => setSelectedMonth(isActive ? null : month.name)}
                            >
                                <span className={`text-[13px] font-medium mb-4 transition-colors ${isActive ? 'text-[#a3e635]' : 'text-zinc-100'
                                    }`}>
                                    {month.name}
                                </span>
                                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-zinc-800/40 ring-1 ring-zinc-700/50' : ''}`}>
                                    {/* Day Initials Header */}
                                    <div className="grid grid-cols-7 gap-1.5 mb-2 px-0.5">
                                        {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, i) => (
                                            <span key={i} className="text-[8px] text-zinc-600 font-bold text-center">
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {month.days.map((day, idx) => {
                                            let statusClass = 'bg-zinc-800';
                                            if (day.status === 'present') statusClass = 'bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.4)]';
                                            if (day.status === 'late') statusClass = 'bg-[#fb923c] shadow-[0_0_8px_rgba(251,146,60,0.4)]';
                                            if (day.status === 'absent') statusClass = 'bg-[#f87171] shadow-[0_0_8px_rgba(248,113,113,0.4)]';

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
                <div className="flex items-center justify-between mb-3">
                    <span className="text-zinc-400 text-xs font-medium">
                        {selectedMonth ? `Ringkasan Bulan ${selectedMonth}` : 'Ringkasan 6 Bulan'}
                    </span>
                    <button
                        onClick={() => setSelectedMonth(null)}
                        className={`text-zinc-500 text-[10px] hover:text-[#a3e635] transition-colors ${!selectedMonth && 'invisible'}`}
                    >
                        Reset Filter
                    </button>
                </div>

                {/* Segmented Bar */}
                <div className="h-1.5 w-full bg-zinc-800 rounded-full flex overflow-hidden mb-4">
                    <div
                        style={{ width: `${stats.present}%` }}
                        className="h-full bg-[#a3e635] transition-all duration-700 ease-in-out"
                    />
                    <div
                        style={{ width: `${stats.late}%` }}
                        className="h-full bg-[#fb923c] transition-all duration-700 ease-in-out"
                    />
                    <div
                        style={{ width: `${stats.absent}%` }}
                        className="h-full bg-[#f87171] transition-all duration-700 ease-in-out"
                    />
                </div>

                {/* Legend/Labels */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                            <span className="text-zinc-100 text-[11px] font-medium">{stats.raw.present} Masuk</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#fb923c]" />
                            <span className="text-zinc-100 text-[11px] font-medium">{stats.raw.late} Telat</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                            <span className="text-zinc-100 text-[11px] font-medium">{stats.raw.absent} Alpa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
