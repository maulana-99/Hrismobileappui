import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Megaphone, 
  UserCheck, 
  Calendar,
  FileText,
  AlertCircle,
  Bell,
  ArrowLeft,
} from 'lucide-react';

type NotificationCategory = 'today' | 'week' | 'earlier';

export interface Notification {
  id: string;
  icon: typeof CheckCircle;
  title: string;
  description: string;
  time: string;
  category: NotificationCategory;
  isRead: boolean;
  fullContent?: string;
  actionLabel?: string;
  actionUrl?: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    icon: CheckCircle,
    title: 'Cuti Disetujui',
    description: 'Pengajuan cuti tanggal 25-27 Jan telah disetujui oleh HR Manager',
    time: '1j lalu',
    category: 'today',
    isRead: false,
    fullContent: 'Pengajuan cuti Anda untuk tanggal 25-27 Januari 2026 telah disetujui oleh HR Manager (Ibu Sarah Wijaya).\n\nDetail Cuti:\n• Tanggal: 25-27 Januari 2026\n• Durasi: 3 hari\n• Jenis: Cuti Tahunan\n• Alasan: Keperluan Keluarga\n• Disetujui oleh: Sarah Wijaya (HR Manager)\n• Tanggal Persetujuan: 22 Januari 2026, 14:30 WIB\n\nSisa kuota cuti tahunan Anda: 9 hari\n\nSelamat berlibur!',
    actionLabel: 'Lihat Detail Cuti',
  },
  {
    id: '2',
    icon: Clock,
    title: 'Reminder Absensi',
    description: 'Jangan lupa clock out sebelum jam 18:00 WIB',
    time: '2j lalu',
    category: 'today',
    isRead: false,
    fullContent: 'Pengingat Absensi Harian\n\nHalo Budi!\n\nIni adalah pengingat untuk melakukan clock out sebelum jam 18:00 WIB.\n\nStatus Absensi Hari Ini:\n• Clock In: 08:45 WIB\n• Lokasi: Jakarta Office - Lantai 5\n• Total Jam Kerja: 7 jam 15 menit (saat ini)\n\nPastikan Anda melakukan clock out dengan:\n1. Foto selfie di lokasi kantor\n2. Sebelum meninggalkan area kantor\n3. Maksimal pukul 18:00 WIB\n\nTerima kasih!',
    actionLabel: 'Clock Out Sekarang',
  },
  {
    id: '3',
    icon: DollarSign,
    title: 'Slip Gaji Tersedia',
    description: 'Slip gaji bulan Januari 2026 sudah dapat diunduh',
    time: '5j lalu',
    category: 'today',
    isRead: true,
    fullContent: 'Slip Gaji Bulan Januari 2026\n\nSlip gaji untuk periode Januari 2026 telah tersedia dan dapat diunduh.\n\nRingkasan Gaji:\n• Gaji Pokok: Rp 12.000.000\n• Tunjangan: Rp 3.500.000\n• Total Gaji Kotor: Rp 15.500.000\n• Potongan: Rp 1.250.000\n• Take Home Pay: Rp 14.250.000\n\nTanggal Transfer: 25 Januari 2026\nBank: BCA\nNo. Rekening: ****1234\n\nUnduh slip gaji Anda untuk arsip pribadi.',
    actionLabel: 'Unduh Slip Gaji',
  },
  {
    id: '4',
    icon: UserCheck,
    title: 'Izin Kerja Disetujui',
    description: 'Pengajuan izin terlambat tanggal 20 Jan telah disetujui',
    time: '2 hari lalu',
    category: 'week',
    isRead: true,
    fullContent: 'Persetujuan Izin Terlambat\n\nPengajuan izin terlambat Anda telah disetujui oleh Manager.\n\nDetail Izin:\n• Tanggal: 20 Januari 2026\n• Waktu Terlambat: 30 menit\n• Jam Clock In: 09:00 WIB (seharusnya 08:30 WIB)\n• Alasan: Kemacetan luar biasa di Tol Dalam Kota\n• Disetujui oleh: Ahmad Pratama (Team Lead)\n• Status: Approved\n\nCatatan: Harap usahakan untuk datang tepat waktu. Keterlambatan berulang dapat mempengaruhi evaluasi kinerja.',
    actionLabel: 'Lihat Riwayat Izin',
  },
  {
    id: '5',
    icon: Calendar,
    title: 'Event: Team Building',
    description: 'Team building akan diadakan tanggal 30 Jan di Puncak',
    time: '3 hari lalu',
    category: 'week',
    isRead: true,
    fullContent: 'Team Building - Q1 2026\n\nPT. Tech Indonesia mengundang seluruh karyawan untuk mengikuti acara Team Building Quarterly.\n\nDetail Event:\n• Tanggal: 30 Januari 2026 (Kamis)\n• Waktu: 07:00 - 17:00 WIB\n• Lokasi: Villa Puncak Resort, Bogor\n• Dresscode: Casual/Olahraga\n• Transport: Disediakan dari kantor (berangkat jam 07:00)\n\nAgenda:\n• 07:00 - Keberangkatan\n• 09:00 - Ice Breaking & Games\n• 12:00 - Lunch\n• 13:30 - Outdoor Activities\n• 16:00 - Kepulangan\n\nHarap konfirmasi kehadiran Anda maksimal 26 Januari 2026.',
    actionLabel: 'Konfirmasi Kehadiran',
  },
  {
    id: '6',
    icon: Megaphone,
    title: 'Pengumuman Penting',
    description: 'Update kebijakan WFH dan dress code untuk tahun 2026',
    time: '5 hari lalu',
    category: 'week',
    isRead: true,
    fullContent: 'Pengumuman Kebijakan Baru 2026\n\nKepada Seluruh Karyawan PT. Tech Indonesia,\n\nBerikut adalah update kebijakan perusahaan yang berlaku mulai 1 Februari 2026:\n\n1. Work From Home (WFH)\n• WFH 2 hari per minggu (Selasa & Kamis)\n• Wajib WFO: Senin, Rabu, Jumat\n• Request WFH tambahan harus diajukan H-2\n\n2. Dress Code\n• Senin-Kamis: Smart Casual\n• Jumat: Casual Friday (no jeans robek)\n• Meeting Client: Formal\n\n3. Jam Kerja\n• Flexible hours: 08:00-10:00 (jam masuk)\n• Minimum 8 jam kerja per hari\n• Core hours: 10:00-15:00 (wajib ada)\n\nKebijakan lengkap dapat diakses di portal HR.',
    actionLabel: 'Baca Kebijakan Lengkap',
  },
  {
    id: '7',
    icon: FileText,
    title: 'Dokumen Kontrak',
    description: 'Kontrak kerja periode 2026 sudah dapat diunduh di menu Dokumen',
    time: '1 minggu lalu',
    category: 'earlier',
    isRead: true,
    fullContent: 'Kontrak Kerja Periode 2026\n\nDokumen kontrak kerja Anda untuk periode 2026 telah tersedia.\n\nDetail Kontrak:\n• Nama: Budi Santoso\n• Posisi: Product Designer - Senior\n• Periode: 1 Januari - 31 Desember 2026\n• Status: Karyawan Tetap\n• Lokasi: Jakarta Office\n\nPerubahan dari Kontrak Sebelumnya:\n• Kenaikan gaji 12%\n• Tambahan tunjangan kesehatan keluarga\n• Upgrade ke posisi Senior\n• Kuota cuti tahunan: 14 hari\n\nHarap unduh, baca dengan teliti, dan tanda tangan kontrak secara digital melalui menu Dokumen maksimal 31 Januari 2026.',
    actionLabel: 'Unduh Kontrak',
  },
  {
    id: '8',
    icon: AlertCircle,
    title: 'Reminder Evaluasi',
    description: 'Periode evaluasi kinerja Q4 2025 akan segera ditutup',
    time: '2 minggu lalu',
    category: 'earlier',
    isRead: true,
    fullContent: 'Reminder: Evaluasi Kinerja Q4 2025\n\nSegera lengkapi evaluasi kinerja Anda!\n\nDeadline: 25 Januari 2026\nStatus: Belum Lengkap (60%)\n\nYang perlu dilengkapi:\n✓ Self Assessment (Done)\n✓ Peer Review (Done)\n✗ Goal Setting Q1 2026 (Pending)\n✗ Development Plan (Pending)\n\nEvaluasi kinerja ini akan mempengaruhi:\n• Performance bonus Q4 2025\n• Salary review tahun 2026\n• Career development plan\n• Training & development opportunities\n\nSegera lengkapi untuk memastikan Anda mendapatkan penilaian yang akurat.',
    actionLabel: 'Lengkapi Evaluasi',
  },
  {
    id: '9',
    icon: DollarSign,
    title: 'Reimburse Diproses',
    description: 'Pengajuan reimburse transport sebesar Rp 250.000 sedang diproses',
    time: '2 minggu lalu',
    category: 'earlier',
    isRead: true,
    fullContent: 'Status Reimburse Transport\n\nPengajuan reimburse Anda sedang dalam proses.\n\nDetail Reimburse:\n• Nomor Pengajuan: RMB-2026-0015\n• Tanggal Pengajuan: 8 Januari 2026\n• Jenis: Transport - Client Meeting\n• Jumlah: Rp 250.000\n• Status: In Review\n\nRincian:\n• Grab to Client Office: Rp 85.000\n• Parking Fee: Rp 15.000\n• Grab return: Rp 90.000\n• Toll Fee: Rp 60.000\n\nEstimasi waktu proses: 3-5 hari kerja\nMetode pembayaran: Transfer ke rekening gaji\n\nAnda akan menerima notifikasi saat reimburse telah disetujui.',
    actionLabel: 'Lihat Status Detail',
  },
];

interface NotificationDetailPopupProps {
  notification: Notification | null;
  onClose: () => void;
}

function NotificationDetailPopup({ notification, onClose }: NotificationDetailPopupProps) {
  if (!notification) return null;

  const Icon = notification.icon;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-lime-400/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-lime-600 dark:text-lime-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-900 dark:text-white text-lg mb-1">
                  {notification.title}
                </h3>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {notification.time}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            <div className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {notification.fullContent || notification.description}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
            {notification.actionLabel && (
              <button className="w-full py-3 rounded-xl bg-lime-400 hover:bg-lime-500 transition-colors text-zinc-900 text-sm">
                {notification.actionLabel}
              </button>
            )}
            <button 
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-900 dark:text-white text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function NotificationPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<NotificationCategory>('today');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const filteredNotifications = notifications.filter(
    (notification) => notification.category === activeTab
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const tabs = [
    { id: 'today' as const, label: 'Hari Ini' },
    { id: 'week' as const, label: 'Minggu Ini' },
    { id: 'earlier' as const, label: 'Sebelumnya' },
  ];

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 -mt-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-zinc-900 dark:text-white text-2xl">Notifikasi</h1>
            <div className="text-zinc-600 dark:text-zinc-400 text-sm">
              Pemberitahuan & Pengingat
            </div>
          </div>
        </div>

        {/* Stats */}
        {unreadCount > 0 && (
          <div className="bg-lime-400/10 dark:bg-lime-400/5 border border-lime-400/20 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-lime-600 dark:text-lime-400" />
              </div>
              <div>
                <div className="text-zinc-900 dark:text-white text-sm">
                  {unreadCount} Notifikasi Baru
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 text-xs">
                  Anda memiliki pesan yang belum dibaca
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-1 inline-flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl transition-all text-sm ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-20 h-20 rounded-3xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-zinc-400 dark:text-zinc-600" />
              </div>
              <div className="text-zinc-900 dark:text-white mb-1">
                Tidak Ada Notifikasi
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                Belum ada notifikasi untuk periode ini
              </div>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 hover:border-lime-400/50 dark:hover:border-lime-400/30 transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400/10 transition-all">
                    <notification.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1.5">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0" />
                      )}
                      <div className="text-zinc-900 dark:text-white text-sm flex-1">
                        {notification.title}
                      </div>
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed line-clamp-2">
                      {notification.description}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-zinc-400 dark:text-zinc-600 text-xs whitespace-nowrap flex-shrink-0">
                    {notification.time}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail Popup */}
      <NotificationDetailPopup
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </>
  );
}