import { CheckCircle, XCircle, Clock, Calendar, DollarSign, UserCheck, FileText, Eye } from 'lucide-react';
import { useState } from 'react';

export function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Semua', count: 23 },
    { id: 'leave', label: 'Cuti', count: 12 },
    { id: 'permission', label: 'Izin', count: 6 },
    { id: 'reimburse', label: 'Reimburse', count: 5 },
  ];

  const approvals = [
    {
      id: 'REQ-2025-001',
      type: 'Cuti Tahunan',
      category: 'leave',
      employee: {
        name: 'Budi Santoso',
        avatar: 'BS',
        color: 'from-blue-400 to-cyan-400',
        position: 'Product Designer',
        department: 'Design',
      },
      details: {
        startDate: '5 Jan 2026',
        endDate: '7 Jan 2026',
        days: '3 hari',
        reason: 'Liburan keluarga ke Bali',
      },
      submittedDate: '20 Des 2025, 14:30',
      status: 'pending',
    },
    {
      id: 'REQ-2025-002',
      type: 'Reimburse',
      category: 'reimburse',
      employee: {
        name: 'Siti Nurhaliza',
        avatar: 'SN',
        color: 'from-pink-400 to-rose-400',
        position: 'Design Lead',
        department: 'Design',
      },
      details: {
        amount: 'Rp 1.500.000',
        category: 'Peralatan Kerja',
        description: 'Pembelian monitor eksternal untuk WFH',
        date: '20 Des 2025',
      },
      submittedDate: '20 Des 2025, 10:15',
      status: 'pending',
    },
    {
      id: 'REQ-2025-003',
      type: 'Izin Terlambat',
      category: 'permission',
      employee: {
        name: 'Ahmad Rahman',
        avatar: 'AR',
        color: 'from-orange-400 to-amber-400',
        position: 'Senior Engineer',
        department: 'Engineering',
      },
      details: {
        date: '25 Des 2025',
        time: '09:30',
        duration: '30 menit',
        reason: 'Macet di jalan tol akibat kecelakaan',
      },
      submittedDate: '25 Des 2025, 09:30',
      status: 'pending',
    },
    {
      id: 'REQ-2025-004',
      type: 'Cuti Sakit',
      category: 'leave',
      employee: {
        name: 'Dewi Lestari',
        avatar: 'DL',
        color: 'from-purple-400 to-indigo-400',
        position: 'Frontend Engineer',
        department: 'Engineering',
      },
      details: {
        startDate: '24 Des 2025',
        endDate: '24 Des 2025',
        days: '1 hari',
        reason: 'Demam tinggi, sudah ke dokter',
      },
      submittedDate: '24 Des 2025, 08:00',
      status: 'pending',
    },
    {
      id: 'REQ-2025-005',
      type: 'Reimburse',
      category: 'reimburse',
      employee: {
        name: 'Rizky Pratama',
        avatar: 'RP',
        color: 'from-emerald-400 to-teal-400',
        position: 'Marketing Manager',
        department: 'Marketing',
      },
      details: {
        amount: 'Rp 850.000',
        category: 'Transport',
        description: 'Bensin dan tol perjalanan dinas ke Bandung',
        date: '23 Des 2025',
      },
      submittedDate: '23 Des 2025, 16:45',
      status: 'pending',
    },
    {
      id: 'REQ-2025-006',
      type: 'Pulang Awal',
      category: 'permission',
      employee: {
        name: 'Maya Putri',
        avatar: 'MP',
        color: 'from-cyan-400 to-blue-400',
        position: 'Content Writer',
        department: 'Marketing',
      },
      details: {
        date: '23 Des 2025',
        time: '15:00',
        duration: '2 jam',
        reason: 'Anak sakit perlu dibawa ke dokter',
      },
      submittedDate: '23 Des 2025, 11:20',
      status: 'pending',
    },
  ];

  const getTypeIcon = (category: string) => {
    switch (category) {
      case 'leave':
        return <Calendar className="w-5 h-5" />;
      case 'reimburse':
        return <DollarSign className="w-5 h-5" />;
      case 'permission':
        return <UserCheck className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (category: string) => {
    switch (category) {
      case 'leave':
        return 'bg-blue-400/10 text-blue-600 dark:text-blue-400';
      case 'reimburse':
        return 'bg-emerald-400/10 text-emerald-600 dark:text-emerald-400';
      case 'permission':
        return 'bg-orange-400/10 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  const filteredApprovals = activeTab === 'all' ? approvals : approvals.filter(a => a.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-zinc-900 dark:text-white font-bold mb-1">Persetujuan</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Review dan kelola semua permintaan karyawan</p>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-2 border border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-lime-400 text-zinc-900 shadow-lg shadow-lime-400/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <div className="font-medium text-sm">{tab.label}</div>
              <div className={`text-xs mt-0.5 ${activeTab === tab.id ? 'text-zinc-900/70' : 'text-zinc-400'}`}>
                {tab.count} pending
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.map((approval) => (
          <div
            key={approval.id}
            className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${approval.employee.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-zinc-50 font-semibold">{approval.employee.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold text-lg mb-0.5">
                      {approval.employee.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {approval.employee.position} • {approval.employee.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${getTypeColor(approval.category)}`}>
                    {getTypeIcon(approval.category)}
                    <span className="font-medium text-sm">{approval.type}</span>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 mb-6">
                <div className="grid grid-cols-2 gap-6">
                  {approval.category === 'leave' && (
                    <>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Tanggal</div>
                        <div className="text-zinc-900 dark:text-white font-medium">
                          {approval.details.startDate} - {approval.details.endDate}
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Durasi</div>
                        <div className="text-zinc-900 dark:text-white font-medium">{approval.details.days}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Alasan</div>
                        <div className="text-zinc-900 dark:text-white">{approval.details.reason}</div>
                      </div>
                    </>
                  )}

                  {approval.category === 'reimburse' && (
                    <>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Jumlah</div>
                        <div className="text-zinc-900 dark:text-white font-bold text-xl">
                          {approval.details.amount}
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Kategori</div>
                        <div className="text-zinc-900 dark:text-white font-medium">{approval.details.category}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Deskripsi</div>
                        <div className="text-zinc-900 dark:text-white">{approval.details.description}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Tanggal</div>
                        <div className="text-zinc-900 dark:text-white font-medium">{approval.details.date}</div>
                      </div>
                      <div className="flex items-center">
                        <button className="flex items-center gap-2 text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          Lihat Bukti
                        </button>
                      </div>
                    </>
                  )}

                  {approval.category === 'permission' && (
                    <>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Tanggal & Waktu</div>
                        <div className="text-zinc-900 dark:text-white font-medium">
                          {approval.details.date} • {approval.details.time}
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Durasi</div>
                        <div className="text-zinc-900 dark:text-white font-medium">{approval.details.duration}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Alasan</div>
                        <div className="text-zinc-900 dark:text-white">{approval.details.reason}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Diajukan {approval.submittedDate}
                  </span>
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm">ID: {approval.id}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-lime-400 text-zinc-900 rounded-xl hover:bg-lime-500 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Setujui</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">Tolak</span>
                </button>
                <button className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-zinc-900 dark:text-white font-semibold text-lg mb-2">Tidak ada permintaan pending</h3>
          <p className="text-zinc-500 dark:text-zinc-400">Semua permintaan sudah diproses</p>
        </div>
      )}
    </div>
  );
}