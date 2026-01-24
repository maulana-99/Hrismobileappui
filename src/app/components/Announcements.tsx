import { Megaphone } from 'lucide-react';

const announcements = [
  {
    title: 'Libur Tahun Baru 2026',
    description: 'Kantor tutup tanggal 31 Des - 2 Jan',
    time: '2 hari lalu',
    important: true,
  },
  {
    title: 'Update Kebijakan Cuti',
    description: 'Cek email untuk info lengkap',
    time: '1 minggu lalu',
    important: false,
  },
];

export function Announcements() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 px-1">
        <Megaphone className="w-4 h-4 text-zinc-500" />
        <div className="text-zinc-900 dark:text-white text-sm">Pengumuman</div>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <button
            key={index}
            className="w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700/50 transition-all text-left group"
          >
            <div className="flex items-start gap-3">
              {announcement.important && (
                <div className="w-2 h-2 bg-lime-400 rounded-full mt-1.5 flex-shrink-0"></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-zinc-900 dark:text-white text-sm mb-1">{announcement.title}</div>
                <div className="text-zinc-600 text-xs mb-2">{announcement.description}</div>
                <div className="text-zinc-400 dark:text-zinc-700 text-xs">{announcement.time}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}