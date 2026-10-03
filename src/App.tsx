import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TatananView } from './components/TatananView';
import { UploadModal } from './components/UploadModal';
import { USER_PROFILES, LIST_TATANAN, INITIAL_BUKTI_DUKUNG } from './data/mockData';
import { UserSession, BuktiDukung } from './types';
import { Shield, Sparkles, Building2, Stethoscope, Award, HeartHandshake } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserSession>(USER_PROFILES.superadmin);
  const [buktiList, setBuktiList] = useState<BuktiDukung[]>(INITIAL_BUKTI_DUKUNG);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<{ tatananId?: string; indikatorId?: string }>({});

  const handleOpenUpload = (tatananId?: string, indikatorId?: string) => {
    setUploadTarget({ tatananId, indikatorId });
    setUploadModalOpen(true);
  };

  const handleAddBukti = (newBukti: Omit<BuktiDukung, 'id' | 'uploadedAt' | 'status'>) => {
    const created: BuktiDukung = {
      ...newBukti,
      id: `bd-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
      status: 'menunggu',
    };
    setBuktiList([created, ...buktiList]);
  };

  const handleVerifyBukti = (
    buktiId: string,
    status: 'disetujui' | 'revisi' | 'ditolak',
    catatan: string
  ) => {
    setBuktiList(
      buktiList.map((b) => {
        if (b.id === buktiId) {
          return {
            ...b,
            status,
            catatanReview: catatan,
            reviewedBy: currentUser.name,
            reviewedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );
  };

  const handleDeleteBukti = (buktiId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berkas bukti dukung ini?')) {
      setBuktiList(buktiList.filter((b) => b.id !== buktiId));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col font-sans selection:bg-[#C59B27]/30 selection:text-[#1B3B2B]">
      
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={setCurrentUser}
        onOpenUpload={() => handleOpenUpload()}
      />

      {/* Hero Section with Wow Factor */}
      <HeroSection
        onOpenUpload={() => handleOpenUpload()}
        buktiList={buktiList}
        tatananList={LIST_TATANAN}
      />

      {/* Main Content: 7 Tatanan & Matrix Indikator */}
      <main className="flex-1">
        <TatananView
          tatananList={LIST_TATANAN}
          buktiList={buktiList}
          currentUser={currentUser}
          onOpenUploadForIndikator={(tId, indId) => handleOpenUpload(tId, indId)}
          onVerifyBukti={handleVerifyBukti}
          onDeleteBukti={handleDeleteBukti}
        />
      </main>

      {/* Upload Modal Form */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        tatananList={LIST_TATANAN}
        currentUser={currentUser}
        defaultTatananId={uploadTarget.tatananId}
        defaultIndikatorId={uploadTarget.indikatorId}
        onSubmit={handleAddBukti}
      />

      {/* Footer Info & Instansi Partner */}
      <footer className="bg-[#111827] text-white border-t border-[#C59B27]/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C59B27] flex items-center justify-center font-serif font-black text-sm text-[#1B3B2B]">
                  KS
                </div>
                <span className="font-serif font-bold text-lg text-white">
                  SEHAT<span className="text-[#C59B27]">MON</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Portal digital resmi pengumpulan dan verifikasi bukti dukung 7 Tatanan Kabupaten/Kota Sehat (KKS) Kapanewon Temon, Kabupaten Kulon Progo, D.I. Yogyakarta.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#C59B27] uppercase tracking-wider">Mitra Fasilitas Kesehatan</p>
              <ul className="space-y-1 text-gray-300">
                <li className="flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-emerald-400" /> Puskesmas Temon I</li>
                <li className="flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-cyan-400" /> Puskesmas Temon II</li>
                <li className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-amber-400" /> Forum KKS Temon</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#C59B27] uppercase tracking-wider">Pengesahan & Standar</p>
              <p className="text-gray-400 leading-relaxed">
                Mengacu pada Peraturan Bersama Menteri Dalam Negeri & Menteri Kesehatan tentang Pedoman Penyelenggaraan Kabupaten/Kota Sehat.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© 2026 Pemerintah Kapanewon Temon • Hak Cipta Dilindungi</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#C59B27]" /> Swasti Saba Wiwerda Ready</span>
              <span className="flex items-center gap-1"><HeartHandshake className="w-3.5 h-3.5 text-emerald-400" /> Temon Guyub Rukun</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
