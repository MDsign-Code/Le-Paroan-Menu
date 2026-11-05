import React from 'react';
import { MessageSquare, QrCode, Utensils, CheckCircle, PhoneCall, ShieldCheck, Zap } from 'lucide-react';
import { WHATSAPP_NUMBER, QRIS_MERCHANT_NAME } from '../data/menuData';

export const OrderingGuideSection: React.FC = () => {
  return (
    <section id="cara-pesan" className="py-14 bg-white border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E86014]">
            <Zap className="w-3.5 h-3.5" />
            <span>Praktis &amp; Cepat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Cara Pemesanan via WhatsApp &amp; QRIS
          </h2>
          <p className="text-sm text-stone-600">
            Pesan langsung tanpa perlu unduh aplikasi tambahan. Cukup pilih menu, scan QRIS, dan kirim konfirmasi WhatsApp ke <strong>{WHATSAPP_NUMBER}</strong>.
          </p>
        </div>

        {/* 4 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#E86014] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              1
            </div>
            <h3 className="font-bold text-base text-stone-900">Pilih Menu Harian</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tentukan menu Nusantara pilihan Anda (Sarapan, Siang, Malam, atau Teh Rempah) sesuai hari yang diinginkan.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#E86014] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              2
            </div>
            <h3 className="font-bold text-base text-stone-900">Isi Data Pemesan</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Buka Keranjang, cantumkan nama, nomor WhatsApp, serta pilih metode Antar ke Alamat atau Ambil Sendiri.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#E86014] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              3
            </div>
            <h3 className="font-bold text-base text-stone-900">Pembayaran QRIS</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Scan barcode QRIS dengan m-Banking (BCA, Mandiri, BRI, BNI) atau E-Wallet (GoPay, OVO, DANA, ShopeePay) atas nama <strong>{QRIS_MERCHANT_NAME}</strong>.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#E86014] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              4
            </div>
            <h3 className="font-bold text-base text-stone-900">Konfirmasi WhatsApp</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Kirim format pesanan otomatis ke nomor resmi <strong>{WHATSAPP_NUMBER}</strong>. Dapur langsung menyiapkan makanan Anda!
            </p>
          </div>
        </div>

        {/* QRIS Highlight Showcase Box */}
        <div id="kontak-qris" className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide">
                <QrCode className="w-3.5 h-3.5" />
                <span>QRIS Quick Response Code Indonesian Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Mendukung Pembayaran Digital Semua Bank &amp; Dompet Digital
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Dapur Le'Paroan mempermudah transaksi Anda tanpa repot kembalian tunai. Setiap pemesanan menghasilkan nominal QRIS presisi yang dapat discan oleh aplikasi perbankan nasional maupun e-wallet favorit Anda.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-300 pt-1">
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">BCA Mobile</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">Livin' Mandiri</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">BRImo</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">BNI Mobile</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">GoPay</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">OVO</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">DANA</span>
                <span className="px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">ShopeePay</span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-stone-800/80 border border-stone-700 rounded-2xl p-5 text-center space-y-3">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Layanan Pelanggan WhatsApp
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {WHATSAPP_NUMBER}
              </div>
              <p className="text-[11px] text-stone-400 leading-tight">
                Punya pesanan dalam jumlah banyak, rapat kantor, atau katering acara? Hubungi kami langsung.
              </p>
              <a
                href={`https://wa.me/6285964245547?text=${encodeURIComponent("Halo Dapur Le'Paroan, saya ingin bertanya seputar pemesanan menu.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Chat Admin Dapur</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
