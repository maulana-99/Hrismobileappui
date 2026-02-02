import { FileText, Download, Eye, FolderOpen } from 'lucide-react';

export function DocumentsPage() {
  const documentCategories = [
    { name: 'Semua Dokumen', count: 12, active: true },
    { name: 'Kontrak', count: 3, active: false },
    { name: 'Sertifikat', count: 5, active: false },
    { name: 'Kebijakan', count: 4, active: false },
  ];

  const documents = [
    {
      title: 'Surat Kontrak Kerja',
      category: 'Kontrak',
      date: '1 Jan 2023',
      size: '2.4 MB',
      type: 'PDF',
      important: true,
    },
    {
      title: 'Sertifikat Pelatihan UI/UX Design',
      category: 'Sertifikat',
      date: '15 Mar 2024',
      size: '1.8 MB',
      type: 'PDF',
      important: false,
    },
    {
      title: 'Kebijakan Cuti Tahunan',
      category: 'Kebijakan',
      date: '1 Jan 2025',
      size: '856 KB',
      type: 'PDF',
      important: false,
    },
    {
      title: 'NPWP - Nomor Pokok Wajib Pajak',
      category: 'Kontrak',
      date: '10 Feb 2023',
      size: '542 KB',
      type: 'PDF',
      important: true,
    },
    {
      title: 'Sertifikat Workshop Design Thinking',
      category: 'Sertifikat',
      date: '22 Jun 2024',
      size: '1.2 MB',
      type: 'PDF',
      important: false,
    },
    {
      title: 'Peraturan Perusahaan 2025',
      category: 'Kebijakan',
      date: '1 Jan 2025',
      size: '3.1 MB',
      type: 'PDF',
      important: false,
    },
    {
      title: 'BPJS Kesehatan',
      category: 'Kontrak',
      date: '1 Jan 2023',
      size: '678 KB',
      type: 'PDF',
      important: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-lime-400/10 flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-lime-600 dark:text-lime-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-bold">Dokumen Saya</div>
            <div className="text-zinc-600 dark:text-zinc-400 text-sm">
              {documents.length} dokumen tersimpan
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {documentCategories.map((category, index) => (
          <button
            key={index}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${
              category.active
                ? 'bg-lime-400 text-zinc-900 font-medium'
                : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative">
                <FileText className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                {doc.important && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-white dark:border-zinc-900" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="text-zinc-900 dark:text-white font-bold text-sm mb-1">
                      {doc.title}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-medium">
                    {doc.type}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-lime-400/10 text-lime-600 dark:text-lime-400 py-2 px-3 rounded-xl hover:bg-lime-400/20 transition-colors text-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Lihat</span>
                  </button>
                  <button className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-2 px-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
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