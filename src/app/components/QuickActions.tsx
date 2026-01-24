import { FileText, Calendar, DollarSign, UserCheck, ArrowUpRight } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (page: string) => void;
}

const actions = [
  { icon: Calendar, label: 'Ajukan Cuti', page: 'leave', color: 'from-blue-500 to-blue-600' },
  { icon: FileText, label: 'Slip Gaji', page: 'payslip', color: 'from-purple-500 to-purple-600' },
  { icon: UserCheck, label: 'Izin Kerja', page: 'permission', color: 'from-orange-500 to-orange-600' },
  { icon: DollarSign, label: 'Reimburse', page: 'reimburse', color: 'from-emerald-500 to-emerald-600' },
];

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <div>
      <div className="text-zinc-900 dark:text-white text-sm mb-4 px-1">Quick Actions</div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onNavigate(action.page)}
            className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 hover:brightness-110 transition-all group text-left relative overflow-hidden active:scale-[0.98]`}
          >
            <div className="relative z-10 flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-50/20 flex items-center justify-center mb-3">
                <action.icon className="w-5 h-5 text-zinc-50" />
              </div>
              <div className="w-6 h-6 rounded-lg bg-zinc-50/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-50" />
              </div>
            </div>
            <div className="relative z-10 text-zinc-50 text-sm font-medium">{action.label}</div>
            <div className="absolute inset-0 bg-zinc-50/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}