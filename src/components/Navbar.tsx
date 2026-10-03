import React, { useState } from 'react';
import { UserSession } from '../types';
import { USER_PROFILES } from '../data/mockData';
import { ShieldCheck, UserCheck, Stethoscope, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentUser: UserSession;
  onSwitchUser: (user: UserSession) => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onSwitchUser, onOpenUpload }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'superadmin':
        return { label: 'Superadmin (Tim Pembina)', bg: 'bg-[#C59B27]/20 text-[#C59B27] border-[#C59B27]/40' };
      case 'tatanan':
        return { label: 'Pengelola Tatanan KKS', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'puskesmas1':
        return { label: 'Puskesmas Temon I', bg: 'bg-teal-500/20 text-teal-300 border-teal-500/40' };
      case 'puskesmas2':
        return { label: 'Puskesmas Temon II', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      default:
        return { label: role, bg: 'bg-gray-500/20 text-gray-300 border-gray-500/40' };
    }
  };

  const badge = getRoleBadge(currentUser.role);

  return (
    <header className="sticky top-0 z-50 bg-[#1B3B2B]/95 backdrop-blur-md border-b border-[#C59B27]/30 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C59B27] to-[#8F6F19] p-0.5 shadow-lg shadow-[#C59B27]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#1B3B2B] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-black text-xl tracking-tighter text-[#C59B27]">KS</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl tracking-tight text-white">
                  SEHAT<span className="text-[#C59B27]">MON</span>
                </h1>
                <span className="bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#C59B27] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  KKS 2026
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-medium">
                Kapanewon Sehat Temon • Kab. Kulon Progo
              </p>
            </div>
          </div>

          {/* Quick Action & User Switcher */}
          <div className="flex items-center gap-4">
            
            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#C59B27] to-[#A37E1E] hover:from-[#d8aa2b] hover:to-[#b88e22] text-[#1B3B2B] font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-[#C59B27]/20 transition transform active:scale-95 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#1B3B2B]" />
              <span>Unggah Bukti Dukung</span>
            </button>

            {/* Role / User Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 bg-[#111827]/60 hover:bg-[#111827]/90 border border-white/10 p-2 rounded-xl transition text-left cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-lg object-cover ring-2 ring-[#C59B27]/50"
                />
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-white line-clamp-1">{currentUser.name}</p>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#111827] border border-[#C59B27]/30 rounded-2xl shadow-2xl py-2 z-50 text-white animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs text-gray-400">Simulasi Mode Akses Pengguna:</p>
                  </div>
                  
                  {Object.values(USER_PROFILES).map((usr) => (
                    <button
                      key={usr.id}
                      onClick={() => {
                        onSwitchUser(usr);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition ${
                        currentUser.id === usr.id ? 'bg-[#C59B27]/10 border-l-4 border-[#C59B27]' : ''
                      }`}
                    >
                      <img src={usr.avatar} alt={usr.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{usr.name}</p>
                        <p className="text-[10px] text-emerald-300/80 truncate">{usr.instansi}</p>
                      </div>
                      {usr.role === 'superadmin' && <ShieldCheck className="w-4 h-4 text-[#C59B27]" />}
                      {usr.role === 'tatanan' && <UserCheck className="w-4 h-4 text-emerald-400" />}
                      {(usr.role === 'puskesmas1' || usr.role === 'puskesmas2') && <Stethoscope className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
