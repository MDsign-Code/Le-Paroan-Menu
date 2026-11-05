import React from 'react';
import { ArrowDown, QrCode, PhoneCall, Sparkles, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { DayOfWeek } from '../data/menuData';

interface HeroProps {
  currentDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
  onOpenNutrition: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentDay, onSelectDay, onOpenNutrition }) => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EC] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#EBE3D7] pt-8 pb-14 md:py-16">
      {/* Subtle decorative background motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#E86014_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Story & Order CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed editorial tagline */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E86014]">
              <span>Dapur Le'Paroan</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Harga Kaki Lima, Penyajian Kaki Lima</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Rasa Nusantara</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Sekarang Saatnya Budaya Tradisional Indonesia{' '}
              <span className="text-[#E86014] underline decoration-[#E86014]/30 decoration-wavy underline-offset-4">
                Membuktikan pada Dunia
              </span>
            </h1>

            {/* Subheading & Core Promise */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              18 pilihan menu Nusantara berganti setiap hari dari pagi hingga malam. 
              Disiapkan higienis dalam kemasan praktis <strong>Paper Bowl</strong> &amp; <strong>Lunch Box</strong> dengan 
              perhatian khusus pada keseimbangan gizi harian.
            </p>

            {/* Key Value Propositions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 border border-[#E8DFD3] rounded-xl p-3 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">WhatsApp Direct</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">0859-6424-5547</div>
              </div>
              <div className="bg-white/80 border border-[#E8DFD3] rounded-xl p-3 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Pembayaran</div>
                <div className="text-sm font-bold text-[#E86014] mt-0.5 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  QRIS Semua Bank
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/80 border border-[#E8DFD3] rounded-xl p-3 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Kemasan</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">Paper Bowl Praktis</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Pilih Menu Sekarang</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenNutrition}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-stone-50 text-stone-700 border border-[#DDD4C5] rounded-xl font-medium text-sm transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Panduan Keseimbangan Gizi</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card with Retro Logo & Today's Highlight */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-[#1C1917] to-[#292524] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800">
              {/* Retro Orange Logo badge */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/Le_Paron_Retro_Orange_Logo_066b3e07.png"
                    alt="Logo Dapur Le'Paroan"
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#E86014]">
                      Menu Digital Resmi
                    </span>
                    <h2 className="text-lg font-bold text-white">Dapur Le'Paroan</h2>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-stone-800 text-[#F59E0B] rounded-lg border border-stone-700 font-mono">
                  Online 06.00-21.00
                </span>
              </div>

              {/* Weekly Highlights Info */}
              <div className="py-5 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E86014]/20 text-[#E86014] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Menu Berganti 7 Hari</h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Senin s/d Minggu menyajikan cita rasa khas Betawi, Madiun, Makassar, Solo, Bali, Padang, Madura, dan Surabaya.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E86014]/20 text-[#E86014] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Porsi Sarapan, Siang &amp; Malam Terukur</h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Sarapan cepat berenergi, makan siang mengenyangkan berprotein tinggi, dan santap malam berkuah hangat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-white">Program Jumat Berkah</h3>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Alokasi infak Rp500 per porsi setiap hari Jumat untuk aksi berbagi bersama masyarakat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">Pemesanan Langsung:</span>
                <a
                  href="https://wa.me/6285964245547"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>0859-6424-5547</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
