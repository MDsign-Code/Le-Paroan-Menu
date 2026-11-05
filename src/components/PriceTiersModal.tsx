import React from 'react';
import { X, Sparkles, Star, Tag, CheckCircle2 } from 'lucide-react';
import { PRICE_TIERS } from '../data/menuData';

interface PriceTiersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceTiersModal: React.FC<PriceTiersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#EBE3D7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E86014]/15 text-[#E86014] flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Komposisi Harga Menu (20K – 28K)
              </h3>
              <p className="text-xs text-stone-500">
                Dapur Le'Paroan • Iket Ijo Bintaro
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Harga disesuaikan dengan kualitas daging pilihan, bahan baku rempah, dan kelengkapan porsi. 
            Semua menu disajikan lengkap: <strong>Nasi • Lauk • Sayur • Sambal</strong>.
          </p>

          <div className="space-y-3 pt-2">
            {/* 20K Standard */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-stone-900 text-lg">20K</span>
                  <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider bg-stone-200/60 px-2 py-0.5 rounded">
                    STANDARD
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Seluruh menu sarapan (Nasi Jenggo, Bubur Ayam, Nasi Krawu, Nasi Uduk, Lontong Sayur, Gudeg, Nasi Pecel) + Soto Ayam Lamongan, Soto Mie, Nasi Goreng, Tahu Tek.
                </p>
              </div>
            </div>

            {/* 22K-23K Special */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-stone-900 text-lg">22K - 23K</span>
                  <span className="text-[11px] font-bold text-[#E86014] uppercase tracking-wider bg-orange-100/70 px-2 py-0.5 rounded">
                    SPECIAL
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Cwie Mie Malang, Nasi Padang Rendang + Nangka, Bakmi Jawa Ayam Kampung Asli, Tahu Campur Surabaya, Nasi Babat Madura.
                </p>
              </div>
            </div>

            {/* 25K Iga/Premium */}
            <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-[#E86014] text-lg">25K</span>
                  <span className="text-[11px] font-bold text-[#E86014] uppercase tracking-wider bg-orange-200/60 px-2 py-0.5 rounded">
                    IGA / PREMIUM
                  </span>
                </div>
                <p className="text-xs text-stone-700 mt-1">
                  Asem Asem Iga Sapi + Peda, Empal Gentong Cirebon, Gulai Kacang Ijo Roti Maryam. Olahan iga &amp; daging sapi empuk istimewa.
                </p>
              </div>
            </div>

            {/* 28K Premium Highlight */}
            <div className="p-4 bg-amber-500 text-white rounded-2xl shadow-sm flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-white text-lg">28K</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    PREMIUM ★ HIGHLIGHT
                  </span>
                </div>
                <p className="text-xs text-amber-50 mt-1">
                  <strong>Soto Madura Premium</strong> &amp; <strong>Soto Betawi Premium</strong>. Menggunakan potongan daging sapi pilihan melimpah dengan kuah kaldu rempah pekat santan susu asli.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Porsi lengkap, hangat, siap antar ke wilayah Bintaro &amp; sekitarnya.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EBE3D7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
