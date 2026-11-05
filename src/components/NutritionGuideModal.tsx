import React from 'react';
import { X, ShieldCheck, Box, Heart, AlertCircle } from 'lucide-react';
import { NUTRITION_GUIDELINES } from '../data/menuData';

interface NutritionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NutritionGuideModal: React.FC<NutritionGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#EBE3D7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E86014]/15 text-[#E86014] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Komposisi Menu &amp; Keseimbangan Gizi
              </h3>
              <p className="text-xs text-stone-500">
                Konsep sajian terukur harian Dapur Le'Paroan
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800 text-sm">
          {/* Note Banner */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Panduan komposisi sajian berdasarkan konsep menu Dapur Le'Paroan. Persentase merupakan pembagian porsi menu, bukan hasil uji laboratorium kandungan gizi.
            </p>
          </div>

          {/* Table Breakdown from PDF Page 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Tabel Pembagian Porsi Menurut Waktu Makan
            </h4>
            
            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-stone-200 text-stone-700 font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">Waktu</th>
                    <th className="py-3 px-3 text-center">Karbohidrat</th>
                    <th className="py-3 px-3 text-center">Protein</th>
                    <th className="py-3 px-3 text-center">Sayur</th>
                    <th className="py-3 px-3.5">Karakter Sajian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {NUTRITION_GUIDELINES.map((row) => (
                    <tr key={row.meal} className="hover:bg-stone-50/50">
                      <td className="py-3.5 px-3.5 font-bold text-stone-900 whitespace-nowrap">
                        {row.meal}
                        <span className="block text-[11px] font-normal text-stone-400 font-mono">
                          {row.time}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-semibold text-amber-700 bg-amber-50/40">
                        {row.karbo}%
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-semibold text-red-700 bg-red-50/40">
                        {row.protein}%
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-semibold text-emerald-700 bg-emerald-50/40">
                        {row.sayur}%
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-600 leading-snug">
                        {row.char}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Practical Packaging Section */}
          <div className="p-4 bg-orange-50/60 border border-orange-200/70 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Box className="w-4 h-4 text-[#E86014]" />
              <span>Kemasan Praktis &amp; Higienis</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Menu disiapkan dengan konsep kemasan praktis menggunakan <strong>paper bowl</strong> dan <strong>lunch box</strong> berkualitas food-grade, untuk mendukung penyajian yang ringkas, rapi, dan mudah dibawa komuter serta pekerja kantor.
            </p>
          </div>

          {/* Social Impact / Jumat Berkah */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span>Program Jumat Berkah Berbagi</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Setiap pemesanan menu hari Jumat, Dapur Le'Paroan mengalokasikan cashback <strong>Rp500 per porsi</strong> dengan target dana berbagi <strong>Rp250.000 per hari</strong> untuk sesama yang membutuhkan.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EBE3D7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
          >
            Mengerti &amp; Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
