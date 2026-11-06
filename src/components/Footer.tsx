import React from 'react';
import { PhoneCall, QrCode, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER, BRAND_NAME, BRAND_LOCATION, BRAND_TAGLINE, QR_SUBDOMAIN } from '../data/menuData';
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
                className="h-14 w-14 rounded-2xl object-cover shadow-sm border border-amber-300/30 shrink-0"
              />
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {BRAND_NAME}
                </h3>
                <p className="text-xs text-[#E86014] font-bold tracking-wide">
                  {BRAND_LOCATION} · {BRAND_TAGLINE}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Menu Harian Nusantara 21 Pilihan: Sarapan (06-10), Makan Siang (11-14:30), dan Makan Malam (17-21). Porsi lengkap, hangat, siap antar Bintaro &amp; sekitarnya.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 rounded-lg border border-stone-700 text-[11px] text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pembayaran QRIS Resmi • Xendit Verified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Sesi Gastronomi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sarapan" className="hover:text-[#E86014] transition-colors">
                  01. Sarapan (06:00 - 10:00 WIB)
                </a>
              </li>
              <li>
                <a href="#siang" className="hover:text-[#E86014] transition-colors">
                  02. Makan Siang (11:00 - 14:30 WIB)
                </a>
              </li>
              <li>
                <a href="#malam" className="hover:text-[#E86014] transition-colors">
                  03. Makan Malam (17:00 - 21:00 WIB)
                </a>
              </li>
              <li className="text-[#E86014] font-medium pt-1">
                Komposisi Harga: 20K Base • 28K Premium
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Layanan &amp; Afiliator Bintaro
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  WhatsApp:{' '}
                  <a
                    href="https://wa.me/6285964245547"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-mono font-bold transition-colors underline decoration-emerald-500/50 underline-offset-2"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#DF192A] shrink-0" />
                <span>QR Portal: <strong className="text-white font-mono">{QR_SUBDOMAIN}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Layanan: Setiap Hari, 06.00 – 21.00 WIB</span>
              </div>
              <p className="text-[11px] text-stone-500 italic pt-1">
                Format Chat: Nama Afiliator - Menu - Jam Antar - Alamat
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Dapur Le'Paroan — Iket Ijo Bintaro • Masakan Nusantara Harian.
          </div>
          <div className="flex items-center gap-3 text-stone-400 text-[11px]">
            <span>20K Base</span>
            <span aria-hidden="true">·</span>
            <span>28K Premium Highlight</span>
            <span aria-hidden="true">·</span>
            <span>Fresh Cooked Daily</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
