import { Search, Filter, Download, Plus, Mail, Phone, MoreVertical, Edit, Trash2 } from 'lucide-react';

export function EmployeesPage() {
  const employees = [
    {
      id: 'EMP-001',
      name: 'Budi Santoso',
      avatar: 'BS',
      color: 'from-blue-400 to-cyan-400',
      position: 'Product Designer',
      department: 'Design',
      email: 'budi.s@company.com',
      phone: '+62 812-3456-7890',
      joinDate: '1 Jan 2023',
      status: 'Active',
      attendance: 95,
    },
    {
      id: 'EMP-002',
      name: 'Siti Nurhaliza',
      avatar: 'SN',
      color: 'from-pink-400 to-rose-400',
      position: 'Design Lead',
      department: 'Design',
      email: 'siti.n@company.com',
      phone: '+62 813-4567-8901',
      joinDate: '15 Mar 2022',
      status: 'Active',
      attendance: 98,
    },
    {
      id: 'EMP-003',
      name: 'Ahmad Rahman',
      avatar: 'AR',
      color: 'from-orange-400 to-amber-400',
      position: 'Senior Engineer',
      department: 'Engineering',
      email: 'ahmad.r@company.com',
      phone: '+62 814-5678-9012',
      joinDate: '20 Jun 2021',
      status: 'Active',
      attendance: 92,
    },
    {
      id: 'EMP-004',
      name: 'Dewi Lestari',
      avatar: 'DL',
      color: 'from-purple-400 to-indigo-400',
      position: 'Frontend Engineer',
      department: 'Engineering',
      email: 'dewi.l@company.com',
      phone: '+62 815-6789-0123',
      joinDate: '10 Aug 2023',
      status: 'Active',
      attendance: 89,
    },
    {
      id: 'EMP-005',
      name: 'Rizky Pratama',
      avatar: 'RP',
      color: 'from-emerald-400 to-teal-400',
      position: 'Marketing Manager',
      department: 'Marketing',
      email: 'rizky.p@company.com',
      phone: '+62 816-7890-1234',
      joinDate: '5 Feb 2023',
      status: 'Active',
      attendance: 94,
    },
    {
      id: 'EMP-006',
      name: 'Maya Putri',
      avatar: 'MP',
      color: 'from-cyan-400 to-blue-400',
      position: 'Content Writer',
      department: 'Marketing',
      email: 'maya.p@company.com',
      phone: '+62 817-8901-2345',
      joinDate: '12 Nov 2022',
      status: 'Active',
      attendance: 96,
    },
    {
      id: 'EMP-007',
      name: 'Andi Wijaya',
      avatar: 'AW',
      color: 'from-red-400 to-pink-400',
      position: 'HR Specialist',
      department: 'Human Resources',
      email: 'andi.w@company.com',
      phone: '+62 818-9012-3456',
      joinDate: '25 Des 2025',
      status: 'Active',
      attendance: 100,
    },
    {
      id: 'EMP-008',
      name: 'Lina Kartika',
      avatar: 'LK',
      color: 'from-yellow-400 to-orange-400',
      position: 'UX Researcher',
      department: 'Design',
      email: 'lina.k@company.com',
      phone: '+62 819-0123-4567',
      joinDate: '8 Apr 2023',
      status: 'Active',
      attendance: 91,
    },
  ];

  const departments = [
    { name: 'Semua Departemen', count: 156, active: true },
    { name: 'Design', count: 24, active: false },
    { name: 'Engineering', count: 58, active: false },
    { name: 'Marketing', count: 32, active: false },
    { name: 'Human Resources', count: 12, active: false },
    { name: 'Finance', count: 18, active: false },
    { name: 'Operations', count: 12, active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-zinc-900 dark:text-white font-bold mb-1">Manajemen Karyawan</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Kelola data dan informasi karyawan</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="font-medium">Export Data</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-lime-400 text-zinc-900 rounded-xl hover:bg-lime-500 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="font-medium">Tambah Karyawan</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari nama, email, atau ID karyawan..."
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-0 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/20"
            />
          </div>

          {/* Department Filter */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Department Tags */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {departments.map((dept, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${
                dept.active
                  ? 'bg-lime-400 text-zinc-900 font-medium'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {dept.name} ({dept.count})
            </button>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Karyawan
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Jabatan
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Departemen
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Kontak
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Bergabung
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Kehadiran
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-4 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${employee.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-zinc-50 font-bold text-sm">{employee.avatar}</span>
                      </div>
                      <div>
                        <div className="text-zinc-900 dark:text-white font-bold text-sm">{employee.name}</div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs">{employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-zinc-900 dark:text-white text-sm">{employee.position}</div>
                  </td>
                  <td className="p-4">
                    <div className="inline-flex px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
                      {employee.department}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{employee.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-zinc-900 dark:text-white text-sm">{employee.joinDate}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            employee.attendance >= 95
                              ? 'bg-lime-500'
                              : employee.attendance >= 90
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${employee.attendance}%` }}
                        />
                      </div>
                      <span className="text-zinc-900 dark:text-white text-xs font-medium w-8">
                        {employee.attendance}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="inline-flex px-2.5 py-1 rounded-lg bg-lime-400/10 text-lime-600 dark:text-lime-400 text-xs font-medium">
                      {employee.status}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <Edit className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <MoreVertical className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Menampilkan 1-8 dari 156 karyawan</div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-2 rounded-lg bg-lime-400 text-zinc-900 font-medium text-sm">1</button>
            <button className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm">
              3
            </button>
            <button className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}