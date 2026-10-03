import React, { useState } from 'react';
import { Tatanan, UserSession, BuktiDukung } from '../types';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Link } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  tatananList: Tatanan[];
  currentUser: UserSession;
  defaultTatananId?: string;
  defaultIndikatorId?: string;
  onSubmit: (newBukti: Omit<BuktiDukung, 'id' | 'uploadedAt' | 'status'>) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  tatananList,
  currentUser,
  defaultTatananId,
  defaultIndikatorId,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [tatananId, setTatananId] = useState<string>(defaultTatananId || tatananList[0].id);
  const selectedTatanan = tatananList.find((t) => t.id === tatananId) || tatananList[0];
  
  const [indikatorId, setIndikatorId] = useState<string>(
    defaultIndikatorId || selectedTatanan.indikatorList[0]?.id || ''
  );
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tahun, setTahun] = useState<number>(2026);
  const [periode, setPeriode] = useState<'Semester 1' | 'Semester 2' | 'Tahunan'>('Semester 1');
  const [nilaiRealisasi, setNilaiRealisasi] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'image' | 'doc' | 'link' | 'excel'>('pdf');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('2.5 MB');
  const [errorMsg, setErrorMsg] = useState('');

  const handleTatananChange = (id: string) => {
    setTatananId(id);
    const tat = tatananList.find((t) => t.id === id);
    if (tat && tat.indikatorList.length > 0) {
      setIndikatorId(tat.indikatorList[0].id);
    }
  };

  const handleSimulateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setFileUrl(URL.createObjectURL(file));
      if (file.name.endsWith('.pdf')) setFileType('pdf');
      else if (file.name.match(/\.(jpg|jpeg|png)$/i)) setFileType('image');
      else setFileType('doc');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim()) {
      setErrorMsg('Judul berkas bukti dukung wajib diisi.');
      return;
    }
    if (!fileName.trim() && !fileUrl.trim()) {
      setErrorMsg('Silakan pilih berkas atau sertakan tautan bukti dukung.');
      return;
    }

    onSubmit({
      tatananId,
      indikatorId,
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      tahun,
      periode,
      fileName: fileName.trim() || 'Tautan Dokumen External',
      fileSize: fileSize || '1.0 MB',
      fileType,
      fileUrl: fileUrl.trim() || 'https://drive.google.com/drive/folders/temon-sehat',
      nilaiRealisasi: nilaiRealisasi.trim(),
      uploadedBy: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role,
        instansi: currentUser.instansi,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#1B3B2B] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center">
              <Upload className="w-5 h-5 text-[#C59B27]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Unggah Bukti Dukung</h3>
              <p className="text-xs text-emerald-200">Kapanewon Sehat Temon • Tahun {tahun}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-sm">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tatanan & Indikator Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Pilih Tatanan KKS
              </label>
              <select
                value={tatananId}
                onChange={(e) => handleTatananChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#C59B27]"
              >
                {tatananList.map((t) => (
                  <option key={t.id} value={t.id}>
                    0{t.nomor} - {t.nama}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Indikator Terkait
              </label>
              <select
                value={indikatorId}
                onChange={(e) => setIndikatorId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#C59B27]"
              >
                {selectedTatanan.indikatorList.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    [{ind.kode}] {ind.nama.slice(0, 35)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Judul Berkas */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Judul Berkas Bukti Dukung <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Laporan Verifikasi Bebas Buang Air Besar Sembarangan (ODF)"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#C59B27]"
            />
          </div>

          {/* Deskripsi & Angka Realisasi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Keterangan / Ringkasan Isi
              </label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Jelaskan ringkas sumber data, lokasi kalurahan, atau nomor surat/SK..."
                rows={2}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-800 outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Capaian/Realisasi
              </label>
              <input
                type="text"
                value={nilaiRealisasi}
                onChange={(e) => setNilaiRealisasi(e.target.value)}
                placeholder="mis: 95% atau 15 Kal"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#C59B27]"
              />
              <p className="text-[10px] text-gray-400 mt-1">Sesuai satuan target indikator.</p>
            </div>
          </div>

          {/* Tahun & Periode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Tahun Penilaian
              </label>
              <select
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#C59B27]"
              >
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Periode
              </label>
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#C59B27]"
              >
                <option value="Semester 1">Semester 1 (Jan - Jun)</option>
                <option value="Semester 2">Semester 2 (Jul - Des)</option>
                <option value="Tahunan">Tahunan Penuh</option>
              </select>
            </div>
          </div>

          {/* File Upload Dropzone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Unggah Dokumen (PDF, SK, Laporan, atau Tautan Cloud)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#C59B27] bg-gray-50/50 transition">
              <input
                type="file"
                id="file-input"
                onChange={handleSimulateFile}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx"
              />
              <label htmlFor="file-input" className="cursor-pointer space-y-2 block">
                <FileText className="w-8 h-8 text-[#C59B27] mx-auto" />
                <div className="text-xs font-bold text-gray-700">
                  {fileName ? (
                    <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {fileName} ({fileSize})
                    </span>
                  ) : (
                    <span>Klik untuk pilih berkas PDF/Dokumen dari komputer</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400">Maksimum ukuran berkas: 25 MB (Format PDF disarankan)</p>
              </label>
            </div>

            {/* Alternatif Tautan Google Drive */}
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <Link className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px] text-gray-500 font-medium">Atau cantumkan tautan Google Drive / Cloud:</span>
              </div>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => {
                  setFileUrl(e.target.value);
                  if (!fileName) setFileName('Tautan Google Drive');
                }}
                placeholder="https://drive.google.com/file/d/..."
                className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-xs text-gray-700 outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] hover:bg-[#254F3A] font-bold text-xs text-white shadow-lg shadow-[#1B3B2B]/20 transition cursor-pointer"
            >
              Simpan & Ajukan Verifikasi
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
