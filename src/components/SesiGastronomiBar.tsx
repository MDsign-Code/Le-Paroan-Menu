import React from 'react';
import { Clock, Utensils, Moon, Sun, Sunrise, Sparkles } from 'lucide-react';

export const SesiGastronomiBar: React.FC = () => {
  return (
    <section className="bg-white border-b border-[#E8DFD3] py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Header Title */}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest text-[#0E3A2F]">
                SESI GASTRONOMI
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              3 Sesi Masakan Nusantara Segar Setiap Hari (Fresh Cooked Daily)
            </p>
          </div>

          {/* 3 Sesi Gastronomi Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 flex-1 max-w-3xl">
            {/* 01. Sarapan */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Sunrise className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-900 block uppercase">
                  01. Sarapan
                </span>
                <span className="text-xs font-black text-stone-800 block">
                  06:00 - 10:00 WIB
                </span>
              </div>
            </div>

            {/* 02. Makan Siang */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-orange-900 block uppercase">
                  02. Makan Siang
                </span>
                <span className="text-xs font-black text-stone-800 block">
                  11:00 - 14:30 WIB
                </span>
              </div>
            </div>

            {/* 03. Makan Malam */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-emerald-900 block uppercase">
                  03. Makan Malam
                </span>
                <span className="text-xs font-black text-stone-800 block">
                  17:00 - 21:00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Badge Komposisi Harga */}
          <div className="hidden lg:flex flex-col items-end shrink-0 text-right">
            <span className="text-[11px] font-extrabold text-[#E86014] tracking-wide">
              Komposisi Harga:
            </span>
            <span className="text-xs font-black font-mono text-[#0E3A2F]">
              20K Base • 28K Premium
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
