import React, { useState } from 'react';
import { Tatanan, BuktiDukung, UserSession } from '../types';
import { FileText, CheckCircle2, AlertCircle, Clock, Upload, ExternalLink, Trash2, Filter } from 'lucide-react';

interface TatananViewProps {
  tatananList: Tatanan[];
  buktiList: BuktiDukung[];
  currentUser: UserSession;
  onOpenUploadForIndikator: (tatananId: string, indikatorId: string) => void;
  onVerifyBukti: (buktiId: string, status: 'disetujui' | 'revisi' | 'ditolak', catatan: string) => void;
  onDeleteBukti: (buktiId: string) => void;
}

export const TatananView: React.FC<TatananViewProps> = ({
  tatananList,
  buktiList,
  currentUser,
  onOpenUploadForIndikator,
  onVerifyBukti,
  onDeleteBukti,
}) => {
  const [activeTatananId, setActiveTatananId] = useState<string>(tatananList[0].id);
  const [statusFilter, setStatusFilter] = useState<string>('semua');
  const [reviewNote, setReviewNote] = useState<Record<string, string>>({});
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  const currentTatanan = tatananList.find((t) => t.id === activeTatananId) || tatananList[0];

  const getStatusBadge = (status: BuktiDukung['status']) => {
    switch (status) {
      case 'disetujui':
        return { label: 'Disetujui', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
      case 'revisi':
        return { label: 'Perlu Revisi', bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: AlertCircle };
      case 'ditolak':
        return { label: 'Ditolak', bg: 'bg-red-100 text-red-800 border-red-300', icon: AlertCircle };
      case 'menunggu':
      default:
        return { label: 'Menunggu Verifikasi', bg: 'bg-blue-100 text-blue-800 border-blue-300', icon: Clock };
    }
  };

  return (
    <section id="tatanan-section" className="py-12 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1B3B2B]/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
              Matriks Indikator & Berkas Dukung
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1B3B2B] mt-1">
              7 Tatanan Kecamatan Sehat Temon
            </h2>
          </div>

          {/* Filter Status Bukti */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 font-medium">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-bold text-[#1B3B2B] outline-none cursor-pointer"
            >
              <option value="semua">Semua Status ({buktiList.length})</option>
              <option value="disetujui">Disetujui ({buktiList.filter(b => b.status === 'disetujui').length})</option>
              <option value="menunggu">Menunggu ({buktiList.filter(b => b.status === 'menunggu').length})</option>
              <option value="revisi">Revisi ({buktiList.filter(b => b.status === 'revisi').length})</option>
            </select>
          </div>
        </div>

        {/* 7 Tatanan Tab Navigation */}
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
          {tatananList.map((tat) => {
            const countBukti = buktiList.filter((b) => b.tatananId === tat.id).length;
            const isActive = tat.id === activeTatananId;
            return (
              <button
                key={tat.id}
                onClick={() => setActiveTatananId(tat.id)}
                className={`flex-none px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center gap-3 border cursor-pointer ${
                  isActive
                    ? 'bg-[#1B3B2B] text-white border-[#1B3B2B] shadow-lg shadow-[#1B3B2B]/20 scale-102'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#C59B27] hover:bg-gray-50'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  isActive ? 'bg-[#C59B27] text-[#1B3B2B]' : 'bg-gray-100 text-gray-700'
                }`}>
                  0{tat.nomor}
                </span>
                <span className="whitespace-nowrap">{tat.nama}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {countBukti}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tatanan Detail Banner */}
        <div className="bg-gradient-to-r from-[#1B3B2B] to-[#254F3A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C59B27]/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#C59B27] text-[#1B3B2B] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Tatanan 0{currentTatanan.nomor}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-2">{currentTatanan.nama}</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs">
              <span className="text-emerald-200">PJ Utama: </span>
              <span className="font-bold text-[#F4E0A5]">{currentTatanan.penanggungJawab}</span>
            </div>
          </div>
          <p className="text-sm text-emerald-100/90 leading-relaxed max-w-4xl">
            {currentTatanan.deskripsi}
          </p>
        </div>

        {/* Indikator List & Files Accordion/Cards */}
        <div className="space-y-6">
          {currentTatanan.indikatorList.map((ind) => {
            const indBuktiList = buktiList.filter((b) => {
              const matchInd = b.indikatorId === ind.id;
              const matchStatus = statusFilter === 'semua' || b.status === statusFilter;
              return matchInd && matchStatus;
            });

            return (
              <div
                key={ind.id}
                className="bg-white rounded-3xl border border-gray-200/80 shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Indikator Card Header */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#1B3B2B]/10 text-[#1B3B2B] font-extrabold text-xs px-2.5 py-1 rounded-md font-mono">
                        {ind.kode}
                      </span>
                      <h4 className="text-lg font-bold text-gray-900">{ind.nama}</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{ind.deskripsi}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                      <span>Target: <strong className="text-[#1B3B2B]">{ind.target}</strong></span>
                      <span>•</span>
                      <span>PJ: <strong className="text-gray-700">{ind.pjDefault}</strong></span>
                    </div>
                  </div>

                  {/* Upload Action Button for this Indikator */}
                  <button
                    onClick={() => onOpenUploadForIndikator(currentTatanan.id, ind.id)}
                    className="flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#254F3A] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer self-start md:self-center"
                  >
                    <Upload className="w-4 h-4 text-[#C59B27]" />
                    <span>Unggah Bukti ({ind.kode})</span>
                  </button>
                </div>

                {/* List Bukti Dukung Uploaded under this Indikator */}
                <div className="p-6 bg-white space-y-4">
                  {indBuktiList.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                      <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-600">Belum ada dokumen bukti dukung diunggah.</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Klik tombol di atas untuk mengunggah dokumen pertama untuk {ind.kode}.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {indBuktiList.map((bukti) => {
                        const statusInfo = getStatusBadge(bukti.status);
                        const StatusIcon = statusInfo.icon;
                        const isReviewing = reviewingId === bukti.id;

                        return (
                          <div
                            key={bukti.id}
                            className="bg-gray-50/80 hover:bg-gray-50 border border-gray-200 rounded-2xl p-5 transition space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusInfo.bg}`}>
                                    <StatusIcon className="w-3 h-3" />
                                    {statusInfo.label}
                                  </span>
                                  <span className="text-xs font-bold text-[#C59B27] bg-[#C59B27]/10 px-2 py-0.5 rounded-md">
                                    {bukti.periode} {bukti.tahun}
                                  </span>
                                  {bukti.nilaiRealisasi && (
                                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                      Capaian: {bukti.nilaiRealisasi}
                                    </span>
                                  )}
                                </div>
                                <h5 className="font-bold text-gray-900 text-sm">{bukti.judul}</h5>
                                <p className="text-xs text-gray-600">{bukti.deskripsi}</p>
                              </div>

                              {/* Action Buttons for Superadmin verification or viewing file */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <a
                                  href={bukti.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold px-3 py-1.5 rounded-xl text-xs transition"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>Lihat Berkas</span>
                                </a>

                                {currentUser.role === 'superadmin' && (
                                  <button
                                    onClick={() => setReviewingId(isReviewing ? null : bukti.id)}
                                    className="bg-[#C59B27] hover:bg-[#a6821e] text-[#1B3B2B] font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
                                  >
                                    Verifikasi
                                  </button>
                                )}

                                {(currentUser.role === 'superadmin' || currentUser.id === bukti.uploadedBy.id) && (
                                  <button
                                    onClick={() => onDeleteBukti(bukti.id)}
                                    className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition cursor-pointer"
                                    title="Hapus Dokumen"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Uploader Meta */}
                            <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-200/60 pt-2.5">
                              <div>
                                Diunggah oleh: <strong className="text-gray-800">{bukti.uploadedBy.name}</strong> ({bukti.uploadedBy.instansi})
                              </div>
                              <div>
                                {new Date(bukti.uploadedAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </div>
                            </div>

                            {/* Catatan Review Jika Ada */}
                            {bukti.catatanReview && (
                              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
                                <div className="font-bold flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Catatan Verifikasi Superadmin:</span>
                                </div>
                                <p className="leading-relaxed">{bukti.catatanReview}</p>
                              </div>
                            )}

                            {/* Superadmin Quick Form */}
                            {isReviewing && currentUser.role === 'superadmin' && (
                              <div className="mt-3 p-4 bg-white border border-[#C59B27]/40 rounded-2xl shadow-inner space-y-3">
                                <p className="text-xs font-bold text-[#1B3B2B]">Form Verifikasi Dokumen (Superadmin):</p>
                                <textarea
                                  value={reviewNote[bukti.id] || ''}
                                  onChange={(e) => setReviewNote({ ...reviewNote, [bukti.id]: e.target.value })}
                                  placeholder="Tulis catatan review atau alasan revisi/penolakan..."
                                  className="w-full text-xs p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#C59B27]"
                                  rows={2}
                                />
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      onVerifyBukti(bukti.id, 'disetujui', reviewNote[bukti.id] || 'Dokumen memenuhi syarat');
                                      setReviewingId(null);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                                  >
                                    Setujui Dokumen
                                  </button>
                                  <button
                                    onClick={() => {
                                      onVerifyBukti(bukti.id, 'revisi', reviewNote[bukti.id] || 'Perlu perbaikan');
                                      setReviewingId(null);
                                    }}
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                                  >
                                    Minta Revisi
                                  </button>
                                  <button
                                    onClick={() => setReviewingId(null)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
