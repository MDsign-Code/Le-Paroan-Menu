import React from 'react';
import { ShoppingBag } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenNutrition: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenNutrition,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone */}
        <a href="#top" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
          <img
            src={logoImg}
            alt="Dapur Le'Paroan Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-stone-900 group-hover:text-[#E86014] transition-colors">
            Dapur Le'Paroan
          </span>
        </a>

        {/* Zone 2: 4-5 Navigation Links (Single-Line, Text with hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#menu-section"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Menu Harian
          </a>
          <a
            href="#jadwal-mingguan"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Jadwal 7 Hari
          </a>
          <button
            onClick={onOpenNutrition}
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Keseimbangan Gizi
          </button>
          <a
            href="#cara-pesan"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Cara Pemesanan
          </a>
          <a
            href="#kontak-qris"
            className="hover:text-[#E86014] transition-colors whitespace-nowrap shrink-0"
          >
            Pembayaran QRIS
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Keranjang Pesanan) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`Keranjang pesanan ${cartCount} item`}
            className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl font-semibold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="whitespace-nowrap">Keranjang</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-white text-[#E86014] rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
