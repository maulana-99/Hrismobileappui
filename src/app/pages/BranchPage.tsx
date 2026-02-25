import { useState } from 'react';
import { Search, MapPin, Users, Navigation, CheckCircle2, XCircle, ChevronRight, Phone, Mail } from 'lucide-react';

export function BranchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranch, setSelectedBranch] = useState<any>(null);

    const branches = [
        {
            id: 1,
            name: 'Jakarta Headquarters',
            address: 'Jl. Jend. Sudirman No. 1, Karet Tengsin',
            city: 'Jakarta Pusat',
            latitude: -6.21462,
            longitude: 106.81848,
            geo_radius_meters: 100,
            is_active: true,
            employees: [
                { name: 'Budi Santoso', role: 'Product Designer', avatar: 'BS', color: 'from-lime-400 to-emerald-400' },
                { name: 'Siti Nurhaliza', role: 'Design Lead', avatar: 'SN', color: 'from-pink-400 to-rose-400' },
                { name: 'Ahmad Rahman', role: 'Senior Engineer', avatar: 'AR', color: 'from-blue-400 to-cyan-400' },
            ]
        },
        {
            id: 2,
            name: 'Bandung Creative Hub',
            address: 'Jl. Ir. H. Juanda No. 123, Dago',
            city: 'Bandung',
            latitude: -6.89148,
            longitude: 107.61065,
            geo_radius_meters: 50,
            is_active: true,
            employees: [
                { name: 'Dewi Lestari', role: 'Product Designer', avatar: 'DL', color: 'from-purple-400 to-indigo-400' },
                { name: 'Rizky Pratama', role: 'Frontend Engineer', avatar: 'RP', color: 'from-orange-400 to-amber-400' },
            ]
        },
        {
            id: 3,
            name: 'Surabaya Sales Office',
            address: 'Jl. Tunjungan No. 56, Genteng',
            city: 'Surabaya',
            latitude: -7.25747,
            longitude: 112.73829,
            geo_radius_meters: 75,
            is_active: true,
            employees: [
                { name: 'Maya Putri', role: 'Marketing Manager', avatar: 'MP', color: 'from-emerald-400 to-teal-400' },
            ]
        },
        {
            id: 4,
            name: 'Bali Remote Hub',
            address: 'Jl. Raya Uluwatu No. 88, Jimbaran',
            city: 'Badung',
            latitude: -8.79012,
            longitude: 115.16523,
            geo_radius_meters: 200,
            is_active: false,
            employees: []
        }
    ];

    const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedBranch) {
        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => setSelectedBranch(null)}
                    className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium hover:text-lime-500 transition-colors"
                >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Kembali ke Daftar Cabang
                </button>

                {/* Branch Detail Header */}
                <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-lime-500/20">
                    <div
                        className="absolute inset-0 opacity-50 bg-repeat mix-blend-overlay"
                        style={{
                            backgroundImage: 'url(/master%202.png)',
                            backgroundSize: '240px 240px',
                        }}
                    />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900/10 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-zinc-900" />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${selectedBranch.is_active ? 'bg-zinc-900 text-lime-400' : 'bg-zinc-900/20 text-zinc-700'
                                }`}>
                                {selectedBranch.is_active ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                        <h2 className="text-zinc-900 text-2xl font-bold mb-1">{selectedBranch.name}</h2>
                        <p className="text-zinc-900/60 text-sm">{selectedBranch.city}</p>
                    </div>
                </div>

                {/* Location Info */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50 space-y-4">
                    <div className="flex items-start gap-3">
                        <Navigation className="w-5 h-5 text-zinc-400 mt-0.5" />
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Alamat Lengkap</div>
                            <div className="text-zinc-900 dark:text-white text-sm leading-relaxed">{selectedBranch.address}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Koordinat</div>
                            <div className="text-zinc-900 dark:text-white text-xs font-mono">
                                {selectedBranch.latitude}, {selectedBranch.longitude}
                            </div>
                        </div>
                        <div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Geo Radius</div>
                            <div className="text-zinc-900 dark:text-white text-sm font-bold">
                                {selectedBranch.geo_radius_meters} Meter
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employees in Branch */}
                <div className="space-y-4">
                    <h3 className="text-zinc-900 dark:text-white font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-lime-500" />
                        Karyawan di Cabang Ini ({selectedBranch.employees.length})
                    </h3>
                    <div className="space-y-3">
                        {selectedBranch.employees.length > 0 ? (
                            selectedBranch.employees.map((emp: any, idx: number) => (
                                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-sm">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${emp.color} flex items-center justify-center text-white font-bold shrink-0 shadow-md`}>
                                        {emp.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-zinc-900 dark:text-white font-bold text-sm truncate">{emp.name}</div>
                                        <div className="text-zinc-500 dark:text-zinc-400 text-xs truncate">{emp.role}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-lime-500 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-lime-500 transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-zinc-500 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                                Belum ada karyawan yang terdaftar di cabang ini.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Cari nama cabang atau kota..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl pl-12 pr-4 py-3.5 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/20 focus:border-lime-400 transition-all font-medium"
                />
            </div>

            {/* Branch List */}
            <div className="space-y-4">
                <h3 className="text-zinc-900 dark:text-white font-bold text-lg">Daftar Cabang</h3>
                <div className="grid gap-4">
                    {filteredBranches.map((branch) => (
                        <button
                            key={branch.id}
                            onClick={() => setSelectedBranch(branch)}
                            className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:rotate-6 ${branch.is_active
                                    ? 'bg-gradient-to-br from-lime-400 to-emerald-500 shadow-lime-500/20 text-zinc-900'
                                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 shadow-none'
                                }`}>
                                <MapPin className="w-7 h-7" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-zinc-900 dark:text-white font-bold truncate">{branch.name}</h4>
                                    {branch.is_active ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-500 shrink-0" />
                                    ) : (
                                        <XCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                    )}
                                </div>
                                <div className="text-zinc-500 dark:text-zinc-400 text-sm truncate mb-2">{branch.city}</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-[10px] text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-wider bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded-md">
                                        <Users className="w-3 h-3" />
                                        {branch.employees.length} Karyawan
                                    </div>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                    {filteredBranches.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-zinc-500 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <MapPin className="w-16 h-16 mb-4 opacity-10" />
                            <p className="text-sm font-medium">Tidak ada cabang yang ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
