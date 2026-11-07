import React from 'react';
import logoImg from '../assets/logo.png';
import { DayKey, DAYS_LIST } from '../data/menuData';

interface HeroProps {
  selectedDay: DayKey | 'all';
  onSelectDay: (day: DayKey | 'all') => void;
}

export const Hero: React.FC<HeroProps> = ({ selectedDay, onSelectDay }) => {
  return (
    <section id="top" className="bg-[#FAF7F2] border-b border-[#E8DFD3] pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Habis Logo dan Nama Dapur Le'Paroan Iket Ijo Bintaro (Font warna Hijau/Hitam). Keterangan tidak perlu. */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3.5">
            <img
              src={logoImg}
              alt="Logo Dapur Le'Paroan Iket Ijo Bintaro"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover shadow-md border-2 border-amber-300/40 shrink-0"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0E3A2F] leading-none">
                DAPUR LE'PAROAN
              </h1>
              <div className="text-sm sm:text-base font-extrabold tracking-widest text-[#1C1917] uppercase mt-1">
                IKET IJO BINTARO
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-stone-700 bg-white border border-[#E8DFD3] px-3 py-1.5 rounded-xl shadow-2xs font-mono">
              21 Menu Terjadwal (Senin – Minggu)
            </span>
            <span className="text-[11px] font-extrabold text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1">
              <span>⭐ Pesan Antar H-1</span>
            </span>
          </div>
        </div>

        {/* Pilihan Hari Navigasi Cepat (Senin s/d Minggu) */}
        <div className="pt-2 border-t border-stone-200/70">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {DAYS_LIST.map((d) => {
              const isSelected = selectedDay === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => onSelectDay(d.key)}
                  className={`px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl transition-all shrink-0 cursor-pointer whitespace-nowrap shadow-2xs ${
                    isSelected
                      ? 'bg-[#0E3A2F] text-white ring-2 ring-[#0E3A2F]/30 scale-102'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#E8DFD3]'
                  }`}
                >
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
