import {
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
} from 'lucide-react';

export function HRDashboard() {
  // Dashboard Stats
  const stats = [
    {
      label: 'Total Karyawan',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Hadir Hari Ini',
      value: '142',
      change: '91%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-lime-500 to-emerald-500',
    },
    {
      label: 'Pending Approval',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Total Reimburse',
      value: 'Rp 45.2M',
      change: '+8.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const pendingApprovals = [
    {
      employee: 'Budi Santoso',
      department: 'Design',
      type: 'Cuti Tahunan',
      date: '5-7 Jan 2026',
      days: '3 hari',
      avatar: 'BS',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      employee: 'Siti Nurhaliza',
      department: 'Engineering',
      type: 'Reimburse',
      date: '20 Des 2025',
      days: 'Rp 1.5M',
      avatar: 'SN',
      color: 'from-pink-400 to-rose-400',
    },
    {
      employee: 'Ahmad Rahman',
      department: 'Marketing',
      type: 'Izin Terlambat',
      date: '25 Des 2025',
      days: '30 menit',
      avatar: 'AR',
      color: 'from-orange-400 to-amber-400',
    },
    {
      employee: 'Dewi Lestari',
      department: 'Design',
      type: 'Cuti Sakit',
      date: '24 Des 2025',
      days: '1 hari',
      avatar: 'DL',
      color: 'from-purple-400 to-indigo-400',
    },
    {
      employee: 'Rizky Pratama',
      department: 'Engineering',
      type: 'Reimburse',
      date: '23 Des 2025',
      days: 'Rp 850K',
      avatar: 'RP',
      color: 'from-emerald-400 to-teal-400',
    },
  ];

  const recentActivities = [
    {
      action: 'Approved leave request',
      employee: 'Maya Putri',
      time: '5 menit lalu',
      type: 'approval',
    },
    {
      action: 'New employee added',
      employee: 'Andi Wijaya',
      time: '1 jam lalu',
      type: 'employee',
    },
    {
      action: 'Rejected reimbursement',
      employee: 'Bambang Susilo',
      time: '2 jam lalu',
      type: 'rejection',
    },
    {
      action: 'Updated attendance policy',
      employee: 'System',
      time: '3 jam lalu',
      type: 'system',
    },
  ];

  const attendanceToday = [
    { status: 'Hadir Tepat Waktu', count: 120, percentage: 77, color: 'bg-lime-500' },
    { status: 'Terlambat', count: 22, percentage: 14, color: 'bg-amber-500' },
    { status: 'Izin/Cuti', count: 10, percentage: 6, color: 'bg-blue-500' },
    { status: 'Belum Absen', count: 4, percentage: 3, color: 'bg-zinc-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">{stat.label}</div>
                <div className="text-zinc-900 dark:text-white text-3xl font-bold">{stat.value}</div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-zinc-50" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-lime-600 dark:text-lime-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-zinc-400 text-sm">vs bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="col-span-2 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-zinc-900 dark:text-white font-bold text-lg">Pending Approval</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {pendingApprovals.length} permintaan menunggu
                </p>
              </div>
              <button className="text-lime-600 dark:text-lime-400 text-sm font-medium hover:text-lime-700 dark:hover:text-lime-300">
                Lihat Semua →
              </button>
            </div>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${approval.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-zinc-50 font-bold">{approval.avatar}</span>
                    </div>
                    <div>
                      <div className="text-zinc-900 dark:text-white font-bold mb-0.5">{approval.employee}</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {approval.department} • {approval.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <div className="text-zinc-900 dark:text-white text-sm font-bold">{approval.date}</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs">{approval.days}</div>
                    </div>
                    <button className="px-4 py-2 bg-lime-400 text-zinc-900 rounded-lg hover:bg-lime-500 transition-colors text-sm font-medium">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Today */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-zinc-900 dark:text-white font-bold text-lg mb-1">Kehadiran Hari Ini</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Status real-time</p>
          </div>

          <div className="p-5 space-y-4">
            {attendanceToday.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-zinc-900 dark:text-white text-sm font-bold">{item.status}</div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                    {item.count} ({item.percentage}%)
                  </div>
                </div>
                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-zinc-200 dark:border-zinc-800">
            <button className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-2.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">
              Lihat Detail Kehadiran
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-zinc-900 dark:text-white font-bold text-lg">Aktivitas Terbaru</h2>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {recentActivities.map((activity, index) => (
            <div key={index} className="p-5 flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activity.type === 'approval'
                    ? 'bg-lime-400/10 text-lime-600 dark:text-lime-400'
                    : activity.type === 'rejection'
                    ? 'bg-red-400/10 text-red-600 dark:text-red-400'
                    : activity.type === 'employee'
                    ? 'bg-blue-400/10 text-blue-600 dark:text-blue-400'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {activity.type === 'approval' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : activity.type === 'rejection' ? (
                  <AlertCircle className="w-5 h-5" />
                ) : activity.type === 'employee' ? (
                  <Users className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-zinc-900 dark:text-white text-sm">
                  <span className="font-medium">{activity.action}</span> • {activity.employee}
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}