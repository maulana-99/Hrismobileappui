import { useState, useEffect } from 'react';
import { ClockInButton } from '../components/ClockInButton';
import { StatsOverview } from '../components/StatsOverview';
import { QuickActions } from '../components/QuickActions';
import { Announcements } from '../components/Announcements';
import { MonthlyHeatmapCard } from '../components/MonthlyHeatmapCard';
import { ShiftCard } from '../components/ShiftCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('dashboard_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      const visibilityMap = settings.reduce((acc: any, curr: any) => {
        acc[curr.id] = curr.enabled;
        return acc;
      }, {});
      setVisibleCards(visibilityMap);
    } else {
      // Default all to true if no settings found
      setVisibleCards({
        clockIn: true,
        shift: true,
        heatmap: true,
        stats: true,
        quickActions: true,
        announcements: true
      });
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Clock In/Out Button */}
      {visibleCards.clockIn !== false && <ClockInButton />}

      {/* Shift Card - New Premium Section */}
      {visibleCards.shift !== false && <ShiftCard onNavigate={onNavigate} />}

      {/* Attendance History Heatmap - Monthly Style */}
      {visibleCards.heatmap !== false && <MonthlyHeatmapCard />}

      {/* Stats Overview */}
      {visibleCards.stats !== false && <StatsOverview />}

      {/* Quick Actions */}
      {visibleCards.quickActions !== false && <QuickActions onNavigate={onNavigate} />}

      {/* Announcements */}
      {visibleCards.announcements !== false && <Announcements />}

      {/* If nothing is visible */}
      {Object.values(visibleCards).every(v => v === false) && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-zinc-500 text-sm">Dashboard Anda sangat bersih.<br />Aktifkan kartu kembali di Pengaturan.</p>
        </div>
      )}
    </div>
  );
}