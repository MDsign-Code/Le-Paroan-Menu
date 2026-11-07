import React from 'react';
import { AlertTriangle, Clock, Calendar, ShieldCheck, XCircle, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { DayKey, DAYS_LIST } from '../data/menuData';

interface PesanAntarH1PolicyBannerProps {
  currentTodayKey: DayKey;
  onSetSimulatedToday?: (day: DayKey) => void;
}

export const PesanAntarH1PolicyBanner: React.FC<PesanAntarH1PolicyBannerProps> = ({
  currentTodayKey,
  onSetSimulatedToday,
}) => {
  const todayObj = DAYS_LIST.find((d) => d.key === currentTodayKey) || { name: 'Jumat', key: 'jumat' };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/15 to-emerald-950/10 border-2 border-amber-600/70 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
      {/* Top Tag & Main Headline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-200/80 pb-3.5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-xs flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              <span>ATURAN KETAT SISTEM</span>
            </span>
            <span className="px-3 py-1 bg-[#0E3A2F] text-amber-300 text-[11px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>KHUSUS LAYANAN PESAN ANTAR H-1</span>
            </span>
            <span className="text-xs font-bold text-red-700 font-mono bg-red-100/80 border border-red-200 px-2.5 py-0.5 rounded-lg">
              ✕ TIDAK MELAYANI HARI H (SAME DAY)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0E3A2F] tracking-tight pt-1">
            Narasi &amp; Ketentuan Resmi: Layanan Pesan Antar H-1
          </h2>
        </div>

        {/* Status Hari Ini Box */}
        <div className="bg-white border-2 border-amber-400 rounded-2xl p-3 shrink-0 text-left sm:text-right shadow-2xs">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Hari Ini (Hari H Terkunci):
          </div>
          <div className="text-base font-black text-red-700 flex items-center sm:justify-end gap-1.5 font-mono">
            <span>{todayObj.name}</span>
            <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-md uppercase font-bold">
              ✕ DITUTUP
            </span>
          </div>
        </div>
      </div>

      {/* Penjelasan Lengkap Mengapa Wajib Pesan Antar H-1 */}
      <div className="space-y-3">
        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-semibold">
          Demi menjaga standar rasa <strong>"Harga Kaki 5 • Penyajian Bintang 5"</strong>, Dapur Le'Paroan <strong>HANYA MEMASAK SESUAI PESANAN H-1</strong> (maksimal diterima H-1 pukul 21:00 WIB). Kami <strong>TIDAK MENYEDIAKAN STOK MAKANAN SISA/KEMARIN</strong>.
        </p>

        {/* 3 Pilar Kebijakan H-1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Pilar 1: Hari H Terprogram Terkunci */}
          <div className="bg-white p-4 rounded-2xl border-2 border-red-300 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-red-700 font-black text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>1. Hari H Terprogram Terkunci</span>
            </div>
            <p className="text-xs text-stone-700 leading-snug">
              Semua menu makanan pada <strong>Hari Ini ({todayObj.name})</strong> secara otomatis <strong>TIDAK BISA DIKLIK</strong> dan berstatus <strong>(TERSEDIA) ✕ DITUTUP</strong>.
            </p>
          </div>

          {/* Pilar 2: 100% Fresh Cooked Daily */}
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0E3A2F] font-black text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2. 100% Fresh Cooked Daily</span>
            </div>
            <p className="text-xs text-stone-700 leading-snug">
              Bahan baku rempah dan daging baru dibeli serta diracik subuh/pagi hari khusus sesuai jumlah pesanan H-1 yang sudah terverifikasi QRIS.
            </p>
          </div>

          {/* Pilar 3: Pengantaran Tepat Sesi */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>3. Tepat Waktu Tanpa Antre</span>
            </div>
            <p className="text-xs text-stone-700 leading-snug">
              Kurir siap antar tepat waktu di 3 sesi: Sarapan (05-07), Siang (11-13), dan Malam (17-19) ke seluruh Bintaro &amp; sekitarnya.
            </p>
          </div>

        </div>

        {/* Petunjuk Pemesanan Pelanggan */}
        <div className="p-3.5 bg-emerald-950 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Cara Pesan:</strong> Silakan pilih menu untuk <strong>Besok (H-1)</strong> atau hari-hari berikutnya pada jadwal di bawah ini. Tombol <strong>Pesan H-1 +</strong> aktif untuk seluruh hari mendatang.
            </span>
          </div>

          {/* Simulasi Hari Ini untuk Pengujian */}
          {onSetSimulatedToday && (
            <div className="flex items-center gap-1.5 shrink-0 bg-emerald-900/80 px-2.5 py-1.5 rounded-xl border border-emerald-800 text-[11px]">
              <span className="text-emerald-200">Simulasi Hari H:</span>
              <select
                value={currentTodayKey}
                onChange={(e) => onSetSimulatedToday(e.target.value as DayKey)}
                className="bg-stone-900 text-white text-xs font-bold rounded px-1.5 py-0.5 border border-emerald-700 cursor-pointer"
              >
                {DAYS_LIST.filter((d) => d.key !== 'all').map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.name} {d.key === currentTodayKey ? '(Hari H)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
