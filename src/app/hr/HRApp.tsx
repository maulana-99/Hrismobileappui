import { useState, useEffect } from 'react';
import { HRDashboard } from './HRDashboard';
import { EmployeesPage } from './pages/EmployeesPage';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { HRLayout } from './components/HRLayout';

export function HRApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <HRDashboard />;
      case 'employees':
        return <EmployeesPage />;
      case 'approvals':
        return <ApprovalsPage />;
      case 'attendance':
        return <div className="text-zinc-900 dark:text-white">Attendance Page - Coming Soon</div>;
      case 'reports':
        return <div className="text-zinc-900 dark:text-white">Reports Page - Coming Soon</div>;
      case 'settings':
        return <div className="text-zinc-900 dark:text-white">Settings Page - Coming Soon</div>;
      default:
        return <HRDashboard />;
    }
  };

  return <HRLayout currentPage={currentPage} onNavigate={setCurrentPage}>{renderPage()}</HRLayout>;
}
