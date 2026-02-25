import { useState } from 'react';
import { FileText, Download, Eye, FolderOpen, X, FileCheck, FileDown, AlertCircle, Trash2, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<any>(null);

  const documentCategories = [
    { name: 'Semua Dokumen', count: 12, active: true },
    { name: 'Kontrak', count: 3, active: false },
    { name: 'Sertifikat', count: 5, active: false },
    { name: 'Kebijakan', count: 4, active: false },
  ];

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Surat Kontrak Kerja',
      category: 'Kontrak',
      date: '1 Jan 2023',
      size: '2.4 MB',
      type: 'PDF',
      important: true,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 2,
      title: 'Sertifikat Pelatihan UI/UX Design',
      category: 'Sertifikat',
      date: '15 Mar 2024',
      size: '1.8 MB',
      type: 'PDF',
      important: false,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 3,
      title: 'Kebijakan Cuti Tahunan',
      category: 'Kebijakan',
      date: '1 Jan 2025',
      size: '856 KB',
      type: 'PDF',
      important: false,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 4,
      title: 'NPWP - Nomor Pokok Wajib Pajak',
      category: 'Kontrak',
      date: '10 Feb 2023',
      size: '542 KB',
      type: 'PDF',
      important: true,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 5,
      title: 'Sertifikat Workshop Design Thinking',
      category: 'Sertifikat',
      date: '22 Jun 2024',
      size: '1.2 MB',
      type: 'PDF',
      important: false,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 6,
      title: 'Peraturan Perusahaan 2025',
      category: 'Kebijakan',
      date: '1 Jan 2025',
      size: '3.1 MB',
      type: 'PDF',
      important: false,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 7,
      title: 'BPJS Kesehatan',
      category: 'Kontrak',
      date: '1 Jan 2023',
      size: '678 KB',
      type: 'PDF',
      important: true,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
  ]);

  const handleView = (doc: any) => {
    setSelectedDoc(doc);
    setIsPreviewOpen(true);
  };

  const handleDownloadClick = (doc: any) => {
    setSelectedDoc(doc);
    setIsDownloadOpen(true);
  };

  const handleDeleteClick = (doc: any) => {
    setDocToDelete(doc);
    setIsDeleteOpen(true);
  };

  const confirmDownload = () => {
    if (selectedDoc) {
      window.open(selectedDoc.url, '_blank');
      setIsDownloadOpen(false);
    }
  };

  const confirmDelete = () => {
    if (docToDelete) {
      setDocuments(prev => prev.filter(d => d.id !== docToDelete.id));
      setIsDeleteOpen(false);
      toast.success('Dokumen berhasil dihapus');
    }
  };

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
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${category.active
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
            key={doc.id}
            className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 relative group"
          >
            {/* Delete Button - Floating/Absolute positioning for cleaner look */}
            <button
              onClick={() => handleDeleteClick(doc)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
              title="Hapus Dokumen"
            >
              <Trash2 className="w-4 h-4" />
            </button>

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
                <div className="flex items-start justify-between gap-2 mb-2 pr-8">
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
                  <button
                    onClick={() => handleView(doc)}
                    className="flex-1 bg-lime-400/10 text-lime-600 dark:text-lime-400 py-2 px-3 rounded-xl hover:bg-lime-400/20 transition-colors text-sm flex items-center justify-center gap-2 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat</span>
                  </button>
                  <button
                    onClick={() => handleDownloadClick(doc)}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-2 px-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-zinc-500">
            <FolderOpen className="w-16 h-16 mb-4 opacity-10" />
            <p className="text-sm font-medium">Tidak ada dokumen tersedia</p>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden bg-white dark:bg-zinc-950 border-none shadow-2xl">
          <DialogHeader className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between space-y-0">
            <div>
              <DialogTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-lime-500" />
                {selectedDoc?.title}
              </DialogTitle>
              <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                {selectedDoc?.category} • {selectedDoc?.size}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex-1 bg-zinc-100 dark:bg-zinc-900/50 p-4">
            {selectedDoc?.type === 'PDF' ? (
              <iframe
                src={`${selectedDoc.url}#toolbar=0`}
                className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800"
                title={selectedDoc.title}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p>Preview tidak tersedia untuk format ini</p>
              </div>
            )}
          </div>
          <DialogFooter className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                onClick={() => setIsPreviewOpen(false)}
                className="flex-1 rounded-xl h-11 border-zinc-200 dark:border-zinc-800"
              >
                Tutup
              </Button>
              <Button
                onClick={() => {
                  setIsPreviewOpen(false);
                  setIsDownloadOpen(true);
                }}
                className="flex-1 rounded-xl h-11 bg-lime-400 hover:bg-lime-500 text-zinc-900 border-none font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Confirmation Dialog */}
      <Dialog open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-white dark:bg-zinc-950 border-none shadow-2xl rounded-3xl">
          <div className="relative p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-lime-400/10 flex items-center justify-center mb-6">
              <FileDown className="w-10 h-10 text-lime-600 dark:text-lime-400" />
            </div>

            <DialogHeader className="p-0 text-center mb-6">
              <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Download Dokumen?
              </DialogTitle>
              <DialogDescription className="text-zinc-600 dark:text-zinc-400 text-base">
                Anda akan mengunduh file <span className="font-bold text-zinc-900 dark:text-zinc-100">"{selectedDoc?.title}"</span>.
                Pastikan perangkat Anda memiliki ruang penyimpanan yang cukup.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 mb-8 border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-100 dark:border-zinc-700">
                <FileText className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {selectedDoc?.title}.pdf
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {selectedDoc?.size} • PDF Document
                </div>
              </div>
            </div>

            <div className="flex w-full gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsDownloadOpen(false)}
                className="flex-1 rounded-2xl h-12 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Batal
              </Button>
              <Button
                onClick={confirmDownload}
                className="flex-[2] rounded-2xl h-12 bg-lime-400 hover:bg-lime-500 text-zinc-900 border-none font-bold shadow-lg shadow-lime-400/20"
              >
                Unduh Sekarang
              </Button>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 px-8 py-3 flex items-center gap-2 border-t border-amber-100/50 dark:border-amber-900/20">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
              File ini mungkin mengandung informasi sensitif. Gunakan dengan bijak.
            </span>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-white dark:bg-zinc-950 border-none shadow-2xl rounded-3xl">
          <div className="relative p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-400/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            <DialogHeader className="p-0 text-center mb-6">
              <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Hapus Dokumen?
              </DialogTitle>
              <DialogDescription className="text-zinc-600 dark:text-zinc-400 text-base">
                Apakah Anda yakin ingin menghapus <span className="font-bold text-zinc-900 dark:text-zinc-100">"{docToDelete?.title}"</span>?
                Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>

            <div className="flex w-full gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 rounded-2xl h-12 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium"
              >
                Batal
              </Button>
              <Button
                onClick={confirmDelete}
                className="flex-[2] rounded-2xl h-12 bg-red-500 hover:bg-red-600 text-white border-none font-bold shadow-lg shadow-red-500/20"
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}