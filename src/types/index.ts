export type Role = 'superadmin' | 'tatanan' | 'puskesmas1' | 'puskesmas2';

export interface UserSession {
  id: string;
  name: string;
  role: Role;
  tatananId?: string; // If role === 'tatanan'
  instansi: string;
  email: string;
  avatar: string;
}

export interface Indikator {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  target: string;
  satuan: string;
  tatananId: string;
  pjDefault: string; // Penanggung Jawab
}

export interface Tatanan {
  id: string;
  nomor: number;
  nama: string;
  deskripsi: string;
  icon: string;
  color: string;
  penanggungJawab: string;
  indikatorList: Indikator[];
}

export type StatusVerifikasi = 'menunggu' | 'disetujui' | 'revisi' | 'ditolak';

export interface BuktiDukung {
  id: string;
  tatananId: string;
  indikatorId: string;
  judul: string;
  deskripsi: string;
  tahun: number;
  periode: 'Semester 1' | 'Semester 2' | 'Tahunan';
  fileUrl: string; // Base64 data or external URL / drive link
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'image' | 'doc' | 'link' | 'excel';
  uploadedBy: {
    id: string;
    name: string;
    role: Role;
    instansi: string;
  };
  uploadedAt: string; // ISO string
  status: StatusVerifikasi;
  catatanReview?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  nilaiRealisasi?: string;
  capaianPersen?: number;
}
