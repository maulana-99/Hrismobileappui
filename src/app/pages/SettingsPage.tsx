import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Eye, EyeOff, ChevronLeft } from 'lucide-react';

interface ComponentSetting {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

const DEFAULT_SETTINGS: ComponentSetting[] = [
    { id: 'clockIn', label: 'Tombol Absensi', description: 'Tombol masuk dan keluar kerja', enabled: true },
    { id: 'schedule', label: 'Jadwal Hari Ini', description: 'Informasi shift dan jam kerja hari ini', enabled: true },
    { id: 'heatmap', label: 'Heatmap Kehadiran', description: 'Visualisasi grid kontribusi kehadiran', enabled: true },
    { id: 'stats', label: 'Ringkasan Statistik', description: 'Sisa cuti dan streak kehadiran', enabled: true },
    { id: 'quickActions', label: 'Aksi Cepat', description: 'Shortcut pengajuan izin, cuti, dll', enabled: true },
    { id: 'announcements', label: 'Pengumuman', description: 'Berita dan informasi perusahaan', enabled: true },
];

export function SettingsPage() {
    const [settings, setSettings] = useState<ComponentSetting[]>(() => {
        const saved = localStorage.getItem('dashboard_settings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('dashboard_settings', JSON.stringify(settings));
    }, [settings]);

    const toggleSetting = (id: string) => {
        setSettings(prev => prev.map(s =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
        ));
    };

    return (
        <div className="space-y-6">
            <div className="bg-zinc-900/10 dark:bg-zinc-800/30 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-lime-400/20 flex items-center justify-center">
                        <SettingsIcon className="w-5 h-5 text-lime-400" />
                    </div>
                    <div>
                        <h2 className="text-zinc-900 dark:text-white font-bold">Pengaturan Dashboard</h2>
                        <p className="text-zinc-500 text-xs text-sm">Atur kartu yang tampil di beranda</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {settings.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 transition-all hover:border-lime-400/30"
                        >
                            <div className="flex-1">
                                <div className="text-zinc-900 dark:text-white text-sm font-semibold mb-0.5">
                                    {item.label}
                                </div>
                                <div className="text-zinc-500 text-[11px]">
                                    {item.description}
                                </div>
                            </div>

                            <button
                                onClick={() => toggleSetting(item.id)}
                                className={`w-12 h-6 rounded-full relative transition-all duration-300 ${item.enabled ? 'bg-lime-400' : 'bg-zinc-200 dark:bg-zinc-800'
                                    }`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'
                                    } shadow-sm`} />

                                <div className="absolute inset-0 flex items-center justify-between px-1.5 opacity-50">
                                    {item.enabled ? (
                                        <Eye size={10} className="text-zinc-900 ml-auto" />
                                    ) : (
                                        <EyeOff size={10} className="text-zinc-400 mr-auto" />
                                    )}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-4">
                <p className="text-amber-600 dark:text-amber-400 text-xs leading-relaxed text-sm">
                    <strong>Catatan:</strong> Perubahan akan langsung disimpan dan diterapkan pada tampilan halaman beranda Anda.
                </p>
            </div>
        </div>
    );
}
