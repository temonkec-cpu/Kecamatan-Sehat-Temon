import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, FileText, Activity } from 'lucide-react';
import { BuktiDukung, Tatanan } from '../types';

interface HeroSectionProps {
  onOpenUpload: () => void;
  buktiList: BuktiDukung[];
  tatananList: Tatanan[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenUpload, buktiList, tatananList }) => {
  const totalUpload = buktiList.length;
  const verifiedCount = buktiList.filter((b) => b.status === 'disetujui').length;
  const pendingCount = buktiList.filter((b) => b.status === 'menunggu').length;
  const totalIndikator = tatananList.reduce((acc, t) => acc + t.indikatorList.length, 0);
  const percentComplete = Math.round((verifiedCount / totalIndikator) * 100);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3B2B] via-[#11291E] to-[#0D1F17] text-white py-16 lg:py-24 border-b border-[#C59B27]/30 shadow-2xl">
      
      {/* Background Decorative Elements (Aura & Grid Pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C59B27] rounded-full blur-[140px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500 rounded-full blur-[160px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-[#C59B27]/15 border border-[#C59B27]/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
              <Sparkles className="w-4 h-4 text-[#C59B27] animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-[#E5BF54]">
                Portal Resmi Verifikasi Kecamatan Sehat
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              Pemantauan & Bukti Dukung <br />
              <span className="bg-gradient-to-r from-[#F4E0A5] via-[#C59B27] to-[#E5BF54] bg-clip-text text-transparent">
                Kapanewon Sehat Temon
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Sistem terpadu verifikasi 7 Tatanan Kabupaten/Kota Sehat (KKS) Kapanewon Temon. 
              Kolaborasi Puskesmas Temon I & II, Pengelola Tatanan, dan Tim Pembina KKS Kulon Progo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenUpload}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#C59B27] to-[#8F6F19] hover:from-[#d9aa2b] hover:to-[#a37f1e] text-[#1B3B2B] font-extrabold px-7 py-4 rounded-2xl shadow-xl shadow-[#C59B27]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base cursor-pointer"
              >
                <FileText className="w-5 h-5 text-[#1B3B2B] group-hover:scale-110 transition-transform" />
                <span>Unggah Berkas Bukti Dukung</span>
              </button>

              <a
                href="#tatanan-section"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-4 rounded-2xl backdrop-blur-md transition text-base"
              >
                <span>Lihat 7 Tatanan KKS</span>
              </a>
            </div>

            {/* Badges / Micro-details */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>Standard Kemenkes & Kemendagri</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verifikasi Bertingkat 3 Roles</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Dashboard Stat Card (The WOW Factor Card) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              
              {/* Glow Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C59B27] via-emerald-500 to-[#C59B27] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />

              {/* Card Container */}
              <div className="relative bg-[#111827]/90 border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-white space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Capaian Pemantauan</h3>
                    <p className="text-xl font-bold font-serif text-[#C59B27]">Temon Sehat 2026</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                {/* Main Progress Bar & Gauge */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-emerald-200">Keterpenuhan Dokumen Indikator</span>
                    <span className="text-2xl font-black font-mono text-[#C59B27]">{percentComplete}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#C59B27] to-emerald-400 rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: `${percentComplete}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {verifiedCount} dari {totalIndikator} indikator KKS terverifikasi sah.
                  </p>
                </div>

                {/* Grid 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Total Berkas</p>
                    <p className="text-xl font-bold text-white mt-1">{totalUpload}</p>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3 text-center">
                    <p className="text-[10px] text-emerald-400 uppercase font-semibold">Disetujui</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">{verifiedCount}</p>
                  </div>
                  <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3 text-center">
                    <p className="text-[10px] text-amber-400 uppercase font-semibold">Review</p>
                    <p className="text-xl font-bold text-amber-400 mt-1">{pendingCount}</p>
                  </div>
                </div>

                {/* Sub-info instansi */}
                <div className="bg-[#1B3B2B]/60 rounded-xl p-3 border border-[#C59B27]/20 flex items-center justify-between text-xs">
                  <span className="text-gray-300">Cakupan Wilayah:</span>
                  <span className="font-bold text-[#C59B27]">15 Kalurahan se-Temon</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
