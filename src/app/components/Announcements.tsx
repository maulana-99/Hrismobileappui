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
  const textureStyle = {
    backgroundImage: 'url("/master%202.png")',
    backgroundSize: '400px 400px',
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 px-1">
        <Megaphone className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <div className="text-zinc-950 dark:text-white text-sm font-bold tracking-tight">Pengumuman Terbaru</div>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <button
            key={index}
            className="w-full bg-white dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700/50 shadow-sm dark:shadow-none hover:shadow-md transition-all text-left group relative overflow-hidden"
          >
            {/* Background Texture */}
            <div
              className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none bg-repeat"
              style={textureStyle}
            />

            <div className="relative z-10 flex items-start gap-3">
              {announcement.important && (
                <div className="w-2.5 h-2.5 bg-lime-500 dark:bg-lime-400 rounded-full mt-1.5 flex-shrink-0 animate-pulse"></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-zinc-950 dark:text-white text-sm font-bold mb-1 leading-tight">{announcement.title}</div>
                <div className="text-zinc-600 dark:text-zinc-400 text-xs mb-2 leading-relaxed">{announcement.description}</div>
                <div className="text-zinc-400 dark:text-zinc-600 text-[10px] font-medium uppercase tracking-wider">{announcement.time}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}