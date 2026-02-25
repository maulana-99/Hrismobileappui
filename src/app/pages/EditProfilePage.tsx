import { useState } from 'react';
import { ArrowLeft, Shield, User, Phone, Save } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

interface EditProfilePageProps {
    onBack: () => void;
    onSave: (data: { emergencyName: string; emergencyPhone: string }) => void;
}

export function EditProfilePage({ onBack, onSave }: EditProfilePageProps) {
    const [emergencyName, setEmergencyName] = useState('Ani Santoso');
    const [emergencyPhone, setEmergencyPhone] = useState('+62 813-9876-5432');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            onSave({ emergencyName, emergencyPhone });
            setIsSaving(false);
            toast.success('Profil berhasil diperbarui', {
                description: 'Informasi kontak darurat telah disimpan.',
            });
            onBack();
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-2">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
                >
                    <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </button>
                <div>
                    <h2 className="text-zinc-900 dark:text-white text-xl font-bold">Edit Kontak Darurat</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Perbarui informasi kontak darurat Anda</p>
                </div>
            </div>

            {/* Hero Card Visual */}
            <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-lime-500/20">
                <div
                    className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
                    style={{
                        backgroundImage: 'url(/master%202.png)',
                        backgroundSize: '240px 240px',
                    }}
                />
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                        <div className="text-zinc-900 font-bold">Keamanan & Kontak</div>
                        <div className="text-zinc-900/60 text-xs">Pastikan data ini selalu valid</div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50 space-y-6 shadow-sm">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="emergencyName" className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                            <User className="w-4 h-4" /> Nama Kontak Darurat
                        </Label>
                        <Input
                            id="emergencyName"
                            placeholder="Masukkan nama lengkap"
                            value={emergencyName}
                            onChange={(e) => setEmergencyName(e.target.value)}
                            className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-12 focus:ring-lime-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="emergencyPhone" className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                            <Phone className="w-4 h-4" /> Nomor Telepon Darurat
                        </Label>
                        <Input
                            id="emergencyPhone"
                            placeholder="+62 ..."
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                            className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-12 focus:ring-lime-500"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-lime-500/25 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {isSaving ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Menyimpan...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Save className="w-5 h-5" />
                            Simpan Perubahan
                        </div>
                    )}
                </Button>
            </div>

            {/* Information Tip */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                <p className="text-amber-800 dark:text-amber-300 text-xs leading-relaxed text-center">
                    Informasi ini sangat penting untuk keadaan darurat. Kami akan menghubungi orang ini jika terjadi sesuatu pada Anda saat bekerja.
                </p>
            </div>
        </div>
    );
}
