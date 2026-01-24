import { User, Mail, Phone, MapPin, Calendar, Briefcase, CreditCard, Shield, Edit } from 'lucide-react';

export function ProfilePage() {
  const profile = {
    name: 'Budi Santoso',
    employeeId: 'EMP-2023-001',
    email: 'budi.santoso@company.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    joinDate: '1 Januari 2023',
    department: 'Design',
    position: 'Product Designer',
    manager: 'Siti Nurhaliza',
  };

  const bankInfo = {
    accountName: 'Budi Santoso',
    bankName: 'Bank Mandiri',
    accountNumber: '1234567890',
  };

  const emergency = {
    name: 'Ani Santoso',
    relationship: 'Istri',
    phone: '+62 813-9876-5432',
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-lime-400 to-emerald-400 rounded-3xl p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900/10 flex items-center justify-center">
              <span className="text-zinc-900 text-2xl font-bold">BS</span>
            </div>
            <button className="w-10 h-10 rounded-xl bg-zinc-900/10 flex items-center justify-center hover:bg-zinc-900/20 transition-colors">
              <Edit className="w-5 h-5 text-zinc-900" />
            </button>
          </div>
          <div className="text-zinc-900 text-2xl font-semibold mb-1">{profile.name}</div>
          <div className="text-zinc-900/60 text-sm mb-3">{profile.position}</div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/10 text-zinc-900 text-xs font-medium">
            <span>ID: {profile.employeeId}</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white font-medium">Informasi Pribadi</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-zinc-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Email</div>
              <div className="text-zinc-900 dark:text-white text-sm">{profile.email}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-zinc-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Telepon</div>
              <div className="text-zinc-900 dark:text-white text-sm">{profile.phone}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-zinc-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Alamat</div>
              <div className="text-zinc-900 dark:text-white text-sm">{profile.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white font-medium">Informasi Pekerjaan</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Departemen</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{profile.department}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Jabatan</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{profile.position}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Manajer</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{profile.manager}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Tanggal Bergabung</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{profile.joinDate}</div>
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white font-medium">Informasi Bank</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Nama Bank</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{bankInfo.bankName}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Nama Pemegang</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{bankInfo.accountName}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Nomor Rekening</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{bankInfo.accountNumber}</div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <div className="text-zinc-900 dark:text-white font-medium">Kontak Darurat</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Nama</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{emergency.name}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Hubungan</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{emergency.relationship}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">Telepon</div>
            <div className="text-zinc-900 dark:text-white text-sm font-medium">{emergency.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}