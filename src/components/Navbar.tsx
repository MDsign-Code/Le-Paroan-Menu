import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { BRAND_NAME, BRAND_LOCATION } from '../data/menuData';

import { Affiliator } from '../data/affiliatorsData';
import { UserCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPriceTiers: () => void;
  selectedAffiliator?: Affiliator;
  onOpenAffiliatorModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenPriceTiers,
  selectedAffiliator,
  onOpenAffiliatorModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Zone */}
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group">
          <img
            src={logoImg}
            alt="Dapur Le'Paroan Logo"
            className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl object-cover shadow-sm ring-1 ring-amber-300/50 border border-emerald-900/30 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-black text-sm sm:text-lg tracking-tight text-[#0E3A2F] group-hover:text-stone-900 transition-colors leading-tight">
              {BRAND_NAME}
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-[#1C1917] tracking-wider flex items-center gap-1 uppercase">
              <MapPin className="w-3 h-3 text-[#0E3A2F]" />
              {BRAND_LOCATION}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-stone-700">
          <a
            href="#jadwal-harian"
            className="hover:text-[#0E3A2F] transition-colors whitespace-nowrap shrink-0"
          >
            Jadwal Harian
          </a>
          <a
            href="#senin"
            className="hover:text-[#0E3A2F] transition-colors whitespace-nowrap shrink-0"
          >
            Senin – Minggu
          </a>
          <button
            onClick={onOpenPriceTiers}
            className="hover:text-[#0E3A2F] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-stone-700"
          >
            Harga (20K-28K)
          </button>
          <a
            href="#bayar-qris"
            className="hover:text-[#0E3A2F] transition-colors whitespace-nowrap shrink-0 text-[#E86014] font-bold"
          >
            Bayar QRIS
          </a>
        </nav>

        {/* Zone 3: Direct Cart & Affiliator Indicator */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {selectedAffiliator && (
            <button
              type="button"
              onClick={onOpenAffiliatorModal}
              title="Ganti / Kelola Afiliator"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#0E3A2F] border border-emerald-300 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="max-w-[90px] sm:max-w-[130px] truncate">{selectedAffiliator.name}</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Keranjang pesanan ${cartCount} item`}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0E3A2F] hover:bg-[#09261E] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline whitespace-nowrap">Keranjang</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-white text-[#0E3A2F] rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
