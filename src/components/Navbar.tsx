import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { BRAND_NAME, BRAND_LOCATION } from '../data/menuData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPriceTiers: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenPriceTiers,
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

        {/* Zone 3: Direct Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
