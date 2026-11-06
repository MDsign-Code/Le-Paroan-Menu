import React, { useState } from 'react';
import { QrCode, ShoppingBag, Download, ShieldCheck, AlertTriangle, ArrowRight, ExternalLink, Check, Copy } from 'lucide-react';
import { QRIS_MERCHANT_NAME, QRIS_NMID, WHATSAPP_NUMBER, QR_SUBDOMAIN, BRAND_LOCATION } from '../data/menuData';
import { CartItem, OrderCustomerInfo } from '../types/order';
import { Affiliator } from '../data/affiliatorsData';
import { AffiliatorSelector } from './AffiliatorSelector';
import { formatRupiah } from '../utils/qrisGenerator';
import qrisGopayImg from '../assets/qris_gopay.jpg';

interface QrisPaymentSectionProps {
  cartItems: CartItem[];
  totalAmount: number;
  customerInfo: OrderCustomerInfo;
  onUpdateCustomerInfo: (info: Partial<OrderCustomerInfo>) => void;
  onOpenCart: () => void;
  onProceedToQris: () => void;
  affiliators: Affiliator[];
  selectedAffiliator: Affiliator;
  onSelectAffiliator: (aff: Affiliator) => void;
  onOpenManageModal: () => void;
}

export const QrisPaymentSection: React.FC<QrisPaymentSectionProps> = ({
  cartItems,
  totalAmount,
  customerInfo,
  onUpdateCustomerInfo,
  onOpenCart,
  onProceedToQris,
  affiliators,
  selectedAffiliator,
  onSelectAffiliator,
  onOpenManageModal,
}) => {
  const [copiedNmid, setCopiedNmid] = useState(false);
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCopyNmid = () => {
    navigator.clipboard?.writeText(QRIS_NMID);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  return (
    <section id="bayar-qris" className="py-12 bg-white border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Narasi Tegas sesuai permintaan: BAYAR DISINI 👇 */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 text-amber-900 border border-amber-300 rounded-full text-xs font-black tracking-wide uppercase">
            <QrCode className="w-3.5 h-3.5 text-[#0E3A2F]" />
            <span>Pembayaran Resmi QRIS Gopay Merchant</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#0E3A2F] tracking-tight">
            BAYAR DISINI 👇
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Scan langsung dengan kamera HP, GoPay, BCA, Mandiri, BRI, BNI, OVO, DANA atau semua aplikasi bank Anda.
          </p>
        </div>

        {/* 2 Grid: Gambar QRIS + Keranjang / Ringkasan Pembayaran */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Gambar QRIS Resmi */}
          <div className="lg:col-span-6 bg-[#FAF7F2] border-2 border-[#0E3A2F]/20 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm space-y-5">
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#E8DFD3]">
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0E3A2F] block">
                  QRIS Gopay Merchant
                </span>
                <span className="text-sm font-black text-stone-900">
                  {QRIS_MERCHANT_NAME}
                </span>
              </div>
              <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 border border-cyan-300 px-2.5 py-1 rounded-lg">
                GOPAY OFFICIAL
              </span>
            </div>

            {/* Gambar QRIS Utama */}
            <div className="relative w-full max-w-[340px] bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-md">
              <img
                src={qrisGopayImg}
                alt="QRIS Gopay Dapur Le'Paroan - LE PAROAN, DIGITAL & KREA"
                className="w-full h-auto rounded-xl object-contain mx-auto"
              />
              
              <div className="mt-3 pt-2 border-t border-stone-100 text-left text-stone-600 text-[11px] space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-mono">NMID:</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-stone-800">
                    <span>{QRIS_NMID}</span>
                    <button
                      type="button"
                      onClick={handleCopyNmid}
                      title="Salin NMID"
                      className="text-stone-400 hover:text-stone-700 p-0.5"
                    >
                      {copiedNmid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Dicetak oleh:</span>
                  <span className="font-mono">93600914</span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi QRIS */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-[340px]">
              <a
                href={qrisGopayImg}
                download="QRIS_Gopay_LeParoan.jpg"
                className="flex-1 py-2.5 px-4 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#0E3A2F]" />
                <span>Download QRIS</span>
              </a>

              <button
                type="button"
                onClick={onProceedToQris}
                className="flex-1 py-2.5 px-4 bg-[#0E3A2F] hover:bg-[#09261E] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Perbesar QR</span>
              </button>
            </div>

            {/* Peringatan Resmi */}
            <div className="w-full p-3.5 bg-red-50/80 border border-red-200 rounded-2xl text-left text-xs text-red-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Ketentuan Pembayaran:</span>
              </div>
              <p className="text-[11px] text-red-800 leading-relaxed">
                <strong>Hanya melalui QRIS — aman &amp; tercatat otomatis.</strong> Tidak menerima transfer manual ke rekening perorangan.
              </p>
            </div>

          </div>

          {/* Kolom Kanan: Keranjang & Detail Pesanan */}
          <div className="lg:col-span-6 bg-[#FAF7F2] border border-[#E8DFD3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD3]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0E3A2F] text-white flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-[#0E3A2F]">
                      Keranjang Pesanan
                    </h3>
                    <p className="text-xs text-stone-500">
                      {cartTotalCount > 0 ? `${cartTotalCount} Porsi Menu Terpilih` : 'Belum ada menu yang dipilih'}
                    </p>
                  </div>
                </div>

                {cartTotalCount > 0 && (
                  <button
                    type="button"
                    onClick={onOpenCart}
                    className="text-xs font-bold text-[#E86014] hover:underline cursor-pointer"
                  >
                    Edit Keranjang
                  </button>
                )}
              </div>

              {/* Status Keranjang */}
              {cartItems.length > 0 ? (
                <div className="space-y-3">
                  <div className="bg-white border border-[#E8DFD3] rounded-2xl p-4 divide-y divide-stone-100 max-h-[220px] overflow-y-auto">
                    {cartItems.map((ci) => (
                      <div key={ci.cartItemId} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <span className="font-bold text-stone-900 block truncate">
                            {ci.item.name}
                          </span>
                          <span className="text-[11px] font-mono text-stone-500">
                            {ci.quantity}x @ {formatRupiah(ci.unitPrice)}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-stone-800 shrink-0">
                          {formatRupiah(ci.unitPrice * ci.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total Tagihan Box */}
                  <div className="p-4 bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                        Total yang Harus Dibayar
                      </span>
                      <span className="text-2xl font-black font-mono text-[#0E3A2F]">
                        {formatRupiah(totalAmount)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-emerald-900 font-semibold block">
                        Scan QRIS di samping
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Lalu konfirmasi WhatsApp
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-6 text-center text-stone-400 space-y-2">
                  <ShoppingBag className="w-8 h-8 mx-auto text-stone-300 stroke-1" />
                  <p className="text-xs font-semibold text-stone-600">
                    Keranjang masih kosong.
                  </p>
                  <p className="text-[11px] text-stone-400 max-w-xs mx-auto">
                    Silakan klik tombol <strong>Pesan +</strong> pada gambar menu terjadwal (Senin s/d Minggu) di atas.
                  </p>
                  <a
                    href="#jadwal-harian"
                    className="inline-block mt-2 px-3.5 py-1.5 bg-[#0E3A2F] text-white rounded-lg text-xs font-bold hover:bg-[#09261E] transition-colors"
                  >
                    Pilih Menu Harian
                  </a>
                </div>
              )}

              {/* Form Pilihan Afiliator A sampai C */}
              <AffiliatorSelector
                affiliators={affiliators}
                selectedAffiliator={selectedAffiliator}
                onSelectAffiliator={(aff) => {
                  onSelectAffiliator(aff);
                  onUpdateCustomerInfo({
                    affiliatorName: aff.name,
                    affiliatorPhone: aff.phone,
                  });
                }}
                onOpenManageModal={onOpenManageModal}
              />

            </div>

            {/* Action Button: Buka Keranjang & Bayar */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={onOpenCart}
                className="w-full py-3.5 px-4 bg-[#0E3A2F] hover:bg-[#09261E] text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {cartTotalCount > 0 ? `Buka Keranjang Pesanan (${cartTotalCount} Menu · ${formatRupiah(totalAmount)})` : 'Buka Keranjang Pesanan'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersedia untuk Pengantaran Wilayah Bintaro &amp; Sekitarnya</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
