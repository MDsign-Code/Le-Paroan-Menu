import React from 'react';
import { ShoppingBag, MapPin, Phone, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { BRAND_NAME, BRAND_LOCATION } from '../data/menuData';
import { Affiliator } from '../data/affiliatorsData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPriceTiers: () => void;
  selectedAffiliator?: Affiliator;
  onOpenAffiliators?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenPriceTiers,
  selectedAffiliator,
  onOpenAffiliators,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Zone */}
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group">
          <img
            src={logoImg}
            alt="Dapur Le'Paroan Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-lg tracking-tight text-stone-900 group-hover:text-[#E86014] transition-colors leading-tight">
              {BRAND_NAME}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#E86014] tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {BRAND_LOCATION}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600">
          <a
            href="#sarapan"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Sarapan
          </a>
          <a
            href="#siang"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Makan Siang
          </a>
          <a
            href="#malam"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Makan Malam
          </a>
          <button
            onClick={onOpenPriceTiers}
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-stone-600"
          >
            Harga (20K-28K)
          </button>
          <a
            href="#cara-pesan"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Cara Pesan &amp; QRIS
          </a>
        </nav>

        {/* Zone 3: Affiliator Badge & Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Affiliator Quick Badge */}
          {selectedAffiliator && onOpenAffiliators && (
            <button
              onClick={onOpenAffiliators}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 border border-emerald-200/90 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Klik untuk memilih atau mengubah Afiliator WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline text-stone-500 font-normal">WA:</span>
              <span className="truncate max-w-[90px] sm:max-w-[140px] font-bold">
                {selectedAffiliator.name}
              </span>
              <ChevronDown className="w-3 h-3 text-emerald-700 shrink-0 opacity-70" />
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Keranjang pesanan ${cartCount} item`}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline whitespace-nowrap">Keranjang</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-white text-[#E86014] rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
