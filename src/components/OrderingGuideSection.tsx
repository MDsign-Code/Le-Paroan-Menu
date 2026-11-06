import React from 'react';
import { MessageSquare, QrCode, PhoneCall, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, Download, Users, Settings2 } from 'lucide-react';
import { WHATSAPP_NUMBER, QRIS_MERCHANT_NAME, QRIS_NMID, QR_SUBDOMAIN, BRAND_LOCATION } from '../data/menuData';
import { Affiliator, formatPhoneForWhatsApp } from '../data/affiliatorsData';
import qrisGopayImg from '../assets/qris_gopay.jpg';

interface OrderingGuideSectionProps {
  affiliators?: Affiliator[];
  selectedAffiliator?: Affiliator;
  onSelectAffiliator?: (aff: Affiliator) => void;
  onOpenManageAffiliators?: () => void;
}

export const OrderingGuideSection: React.FC<OrderingGuideSectionProps> = ({
  affiliators = [],
  selectedAffiliator,
  onSelectAffiliator,
  onOpenManageAffiliators,
}) => {
  const currentPhone = selectedAffiliator?.phone || WHATSAPP_NUMBER;
  const currentName = selectedAffiliator?.name || "Admin Dapur Pusat";

  return (
    <section id="cara-pesan" className="py-14 bg-white border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E86014]">
            <QrCode className="w-4 h-4" />
            <span>Pemesanan &amp; Pembayaran Resmi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Cara Pesan WhatsApp &amp; Bayar QRIS GoPay
          </h2>
          <p className="text-sm text-stone-600">
            Dapur Le'Paroan • {BRAND_LOCATION}. Porsi lengkap, hangat, siap antar Bintaro &amp; sekitarnya.
          </p>
        </div>

        {/* 2 Column Card: CARA MEMESAN & PEMBAYARAN QRIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: CARA MEMESAN (Langsung Masuk WhatsApp Setelah Bayar) */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-stone-900">
                    Cara Memesan Menu Harian
                  </h3>
                  <p className="text-xs text-stone-500">
                    Order Otomatis Masuk ke WhatsApp Setelah Bayar
                  </p>
                </div>
              </div>

              {/* Step by step flow */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3 bg-white border border-[#E8DFD3] rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E86014] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                    1
                  </div>
                  <div className="text-xs text-stone-700">
                    <strong className="text-stone-900 block">Pilih Menu Harian</strong>
                    Pilih menu dari 21 ragam kuliner Nusantara dan tentukan porsi di keranjang.
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E8DFD3] rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00A5CF] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                    2
                  </div>
                  <div className="text-xs text-stone-700">
                    <strong className="text-stone-900 block">Bayar via QRIS GoPay Merchant</strong>
                    Scan QRIS resmi Dapur Le'Paroan melalui GoPay, BCA, Mandiri, BRI, BNI, OVO, atau DANA.
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/80 border border-emerald-300 rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                    3
                  </div>
                  <div className="text-xs text-stone-800">
                    <strong className="text-emerald-950 block">Langsung Masuk ke WhatsApp</strong>
                    Setelah klik konfirmasi pembayaran, rincian pesanan langsung terkirim otomatis ke WhatsApp Dapur Le'Paroan.
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E8DFD3] rounded-2xl space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Format Chat Otomatis WhatsApp:
                </div>
                <div className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  Nama Afiliator - Menu - Jam Antar - Alamat Bintaro
                </div>
                <p className="text-[11px] text-stone-500 pt-0.5">
                  Format chat otomatis mencantumkan 1 Nama Afiliator pilihan Anda (default: <em>Iket Ijo Bintaro</em>) langsung ke WhatsApp admin.
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Stok diperbarui setiap hari • Fresh Cooked Daily</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pengantaran terjadwal: Sarapan (06-10), Siang (11-14:30), Malam (17-21)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/6285964245547?text=${encodeURIComponent(`Halo Admin Dapur Le'Paroan, saya ingin memesan menu harian Iket Ijo Bintaro.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hubungi WhatsApp Resmi ({WHATSAPP_NUMBER})</span>
              </a>
            </div>
          </div>

          {/* Card 2: PEMBAYARAN QRIS */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00A5CF] text-white flex items-center justify-center shadow-xs">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-stone-900">
                      QRIS Gopay Merchant
                    </h3>
                    <p className="text-xs text-stone-500">
                      {QRIS_MERCHANT_NAME}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold text-[#008BB9] bg-cyan-100/80 border border-cyan-300 px-2.5 py-1 rounded-lg">
                  GOPAY OFFICIAL
                </span>
              </div>

              {/* QRIS Snapshot & Details */}
              <div className="p-4 bg-white border border-[#E8DFD3] rounded-2xl flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-stone-50 rounded-xl overflow-hidden border border-stone-200 p-1 flex items-center justify-center">
                  <img
                    src={qrisGopayImg}
                    alt="QRIS Gopay Merchant"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-stone-900">{QRIS_MERCHANT_NAME}</div>
                  <div className="font-mono text-[11px] text-stone-500">NMID: {QRIS_NMID}</div>
                  <div className="text-[11px] text-stone-500">Dicetak oleh: 93600914</div>
                  <a
                    href={qrisGopayImg}
                    download="QRIS_Gopay_LeParoan.jpg"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00A5CF] hover:underline pt-0.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download QRIS Gopay</span>
                  </a>
                </div>
              </div>

              {/* Strict Notice from brief */}
              <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-2xl space-y-1 text-xs text-red-950">
                <div className="font-bold flex items-center gap-1.5 text-red-700">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Kebijakan Pembayaran Resmi:</span>
                </div>
                <p className="text-[11px] text-red-800 leading-relaxed">
                  <strong>Hanya melalui QRIS — aman &amp; tercatat otomatis.</strong><br />
                  Mohon diperhatikan: <em>Tidak menerima transfer manual ke rekening pribadi.</em>
                </p>
              </div>

              <div className="p-3 bg-white border border-[#E8DFD3] rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Portal Menu &amp; QR</span>
                  <span className="font-mono font-bold text-stone-900">{QR_SUBDOMAIN}</span>
                </div>
                <span className="text-[11px] text-[#E86014] font-semibold">Scan &amp; Bayar Otomatis</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-center text-[11px] text-stone-500">
                Terima pembayaran QRIS dari mana saja: <strong>GoPay, BCA, Livin' Mandiri, BNI, Bank BRI, OVO, DANA</strong>, dan bank lainnya.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
