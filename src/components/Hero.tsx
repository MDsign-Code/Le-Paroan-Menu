import React from 'react';
import { ArrowDown, QrCode, PhoneCall, Sparkles, UtensilsCrossed, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { BRAND_NAME, BRAND_LOCATION, BRAND_TAGLINE, BRAND_DELIVERY_AREA, WHATSAPP_NUMBER } from '../data/menuData';
import logoImg from '../assets/logo.png';

interface HeroProps {
  onOpenPriceTiers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPriceTiers }) => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EC] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#EBE3D7] pt-8 pb-12 md:py-16">
      {/* Background motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#E86014_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Story & 21 Menus */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E86014]">
              <span className="flex items-center gap-1 bg-[#E86014]/10 px-2.5 py-1 rounded-md">
                <MapPin className="w-3.5 h-3.5" />
                {BRAND_LOCATION}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{BRAND_TAGLINE}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.15] text-balance">
              Menu Harian Nusantara{' '}
              <span className="text-[#E86014] block sm:inline">
                21 Pilihan Menu
              </span>
            </h1>

            {/* Subheading & Core Promise */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              <strong>Sarapan • Makan Siang • Makan Malam</strong>. Komposisi porsi lengkap{' '}
              <em>Nasi • Lauk • Sayur • Sambal</em> yang disajikan hangat, higienis, dan 
              <strong> {BRAND_DELIVERY_AREA}</strong>.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-stone-700 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Stok Diperbarui Setiap Hari
              </span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="text-amber-500 font-bold">🍳</span>
                Fresh Cooked Daily
              </span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="text-red-500 font-bold">🌶️</span>
                Sambal Rempah Autentik
              </span>
            </div>

            {/* Price Composition Tiers Bar */}
            <div className="bg-white/90 border border-[#E8DFD3] rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 uppercase tracking-wider">
                  Komposisi Harga: 20K – 28K
                </span>
                <button
                  onClick={onOpenPriceTiers}
                  className="text-[#E86014] hover:underline font-semibold cursor-pointer"
                >
                  Lihat Detail Tier
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="bg-[#FAF7F2] border border-stone-200 rounded-xl p-2.5 text-center">
                  <div className="text-sm font-black text-stone-900 font-mono">20K</div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase mt-0.5">STANDARD</div>
                </div>
                <div className="bg-[#FAF7F2] border border-stone-200 rounded-xl p-2.5 text-center">
                  <div className="text-sm font-black text-stone-900 font-mono">22K - 23K</div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase mt-0.5">SPECIAL</div>
                </div>
                <div className="bg-[#FAF7F2] border border-stone-200 rounded-xl p-2.5 text-center">
                  <div className="text-sm font-black text-[#E86014] font-mono">25K</div>
                  <div className="text-[10px] font-bold text-[#E86014] uppercase mt-0.5">IGA / PREMIUM</div>
                </div>
                <div className="bg-amber-500 text-white rounded-xl p-2.5 text-center shadow-xs">
                  <div className="text-sm font-black font-mono">28K</div>
                  <div className="text-[10px] font-bold uppercase mt-0.5 tracking-wide">PREMIUM ★</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Pilih 21 Menu Harian</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#cara-pesan"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-700 border border-[#DDD4C5] rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#00A5CF]" />
                <span>Pembayaran QRIS (GoPay Merchant)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Brand Logo & 3 Meal Windows */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-[#1C1917] to-[#292524] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800">
              
              {/* Retro Orange Logo badge */}
              <div className="flex items-center justify-between pb-5 border-b border-stone-800">
                <div className="flex items-center gap-3.5">
                  <img
                    src={logoImg}
                    alt="Logo Dapur Le'Paroan"
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl object-cover shadow-md border border-amber-300/40 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#E86014] bg-[#E86014]/20 px-2 py-0.5 rounded">
                      IKET IJO BINTARO
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-1">Dapur Le'Paroan</h2>
                    <p className="text-[11px] text-stone-400">Harga Kaki 5 • Penyajian Bintang 5</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 font-semibold block">
                    Bintaro Delivery
                  </span>
                </div>
              </div>

              {/* 3 Meal Windows breakdown */}
              <div className="py-5 space-y-3">
                <div className="bg-stone-800/70 border border-stone-700/60 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍚</span>
                    <div>
                      <div className="text-xs font-bold text-white">Sarapan (07 Menu)</div>
                      <div className="text-[11px] text-stone-400">Gastronomi Pagi • 06:00 - 10:00 WIB</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">20K</span>
                </div>

                <div className="bg-stone-800/70 border border-stone-700/60 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍜</span>
                    <div>
                      <div className="text-xs font-bold text-white">Makan Siang (07 Menu)</div>
                      <div className="text-[11px] text-stone-400">Pegawai &amp; Mahasiswa • 11:00 - 14:30 WIB</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">20K - 28K</span>
                </div>

                <div className="bg-stone-800/70 border border-stone-700/60 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌙</span>
                    <div>
                      <div className="text-xs font-bold text-white">Makan Malam (07 Menu)</div>
                      <div className="text-[11px] text-stone-400">Rumah Tangga &amp; Apartemen • 17:00 - 21:00 WIB</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">20K - 28K</span>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">WhatsApp Resmi:</span>
                <a
                  href={`https://wa.me/6285964245547`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold font-mono transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{WHATSAPP_NUMBER}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
