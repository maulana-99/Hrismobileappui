import { ClockInButton } from '../components/ClockInButton';
import { TodaySchedule } from '../components/TodaySchedule';
import { StatsOverview } from '../components/StatsOverview';
import { QuickActions } from '../components/QuickActions';
import { Announcements } from '../components/Announcements';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-4">
      {/* Clock In/Out Button */}
      <ClockInButton />

      {/* Today's Schedule */}
      <TodaySchedule />

      {/* Stats Overview */}
      <StatsOverview />

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />

      {/* Announcements */}
      <Announcements />
    </div>
  );
}