import { Search, Mail, Phone, MapPin } from 'lucide-react';

export function TeamPage() {
  const departments = [
    { name: 'Semua Tim', count: 24, active: true },
    { name: 'Design', count: 8, active: false },
    { name: 'Engineering', count: 12, active: false },
    { name: 'Marketing', count: 4, active: false },
  ];

  const teamMembers = [
    {
      name: 'Siti Nurhaliza',
      role: 'Design Lead',
      department: 'Design',
      location: 'Jakarta',
      email: 'siti.n@company.com',
      phone: '+62 812-3456-7890',
      avatar: 'SN',
      color: 'from-pink-400 to-rose-400',
    },
    {
      name: 'Ahmad Rahman',
      role: 'Senior Engineer',
      department: 'Engineering',
      location: 'Jakarta',
      email: 'ahmad.r@company.com',
      phone: '+62 813-4567-8901',
      avatar: 'AR',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      name: 'Dewi Lestari',
      role: 'Product Designer',
      department: 'Design',
      location: 'Bandung',
      email: 'dewi.l@company.com',
      phone: '+62 814-5678-9012',
      avatar: 'DL',
      color: 'from-purple-400 to-indigo-400',
    },
    {
      name: 'Rizky Pratama',
      role: 'Frontend Engineer',
      department: 'Engineering',
      location: 'Jakarta',
      email: 'rizky.p@company.com',
      phone: '+62 815-6789-0123',
      avatar: 'RP',
      color: 'from-orange-400 to-amber-400',
    },
    {
      name: 'Maya Putri',
      role: 'Marketing Manager',
      department: 'Marketing',
      location: 'Surabaya',
      email: 'maya.p@company.com',
      phone: '+62 816-7890-1234',
      avatar: 'MP',
      color: 'from-emerald-400 to-teal-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Cari nama atau departemen..."
          className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl pl-12 pr-4 py-3.5 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/20 focus:border-lime-400"
        />
      </div>

      {/* Department Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {departments.map((dept, index) => (
          <button
            key={index}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${
              dept.active
                ? 'bg-lime-400 text-zinc-900 font-medium'
                : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {dept.name} ({dept.count})
          </button>
        ))}
      </div>

      {/* Team Members */}
      <div className="space-y-3">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center`}
              >
                <span className="text-white font-semibold">{member.avatar}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-zinc-900 dark:text-white font-medium">{member.name}</div>
                    <div className="text-zinc-600 dark:text-zinc-400 text-sm">{member.role}</div>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs">
                    {member.department}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1.5 mt-3">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-lime-400/10 text-lime-600 dark:text-lime-400 py-2 px-3 rounded-xl hover:bg-lime-400/20 transition-colors text-sm">
                    Chat
                  </button>
                  <button className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-2 px-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm">
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}