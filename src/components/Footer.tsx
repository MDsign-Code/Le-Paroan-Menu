import React from 'react';
import { PhoneCall, QrCode, MapPin, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/menuData';
import logoImg from '../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo Dapur Le'Paroan"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Dapur Le'Paroan
                </h3>
                <p className="text-xs text-[#E86014] font-medium tracking-wide">
                  Harga Kaki Lima, Penyajian Kaki Lima
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              "Sekarang saatnya budaya tradisional Indonesia membuktikan pada dunia."
              Rasa Nusantara, praktis setiap hari dalam kemasan paper bowl &amp; lunch box bergizi seimbang.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Menu &amp; Konsep
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu-section" className="hover:text-[#E86014] transition-colors">
                  Menu Harian (Senin - Minggu)
                </a>
              </li>
              <li>
                <a href="#jadwal-mingguan" className="hover:text-[#E86014] transition-colors">
                  Rotasi 18 Menu Nusantara
                </a>
              </li>
              <li>
                <a href="#cara-pesan" className="hover:text-[#E86014] transition-colors">
                  Panduan Pesan &amp; Pembayaran QRIS
                </a>
              </li>
              <li className="text-stone-500">
                Paper Bowl &amp; Lunch Box Food-Grade
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Layanan &amp; Pemesanan
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong className="text-white font-mono">{WHATSAPP_NUMBER}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#E86014] shrink-0" />
                <span>Pembayaran: QRIS Semua Bank &amp; E-Wallet</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Jam Layanan: Senin – Minggu, 06.00 – 21.00 WIB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Unboxed Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Dapur Le'Paroan. Cita Rasa Nusantara Setiap Hari.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Kemasan Praktis</span>
            <span aria-hidden="true">·</span>
            <span>Gizi Seimbang</span>
            <span aria-hidden="true">·</span>
            <span>Halal &amp; Higienis</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
