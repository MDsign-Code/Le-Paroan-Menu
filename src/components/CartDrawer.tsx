import React, { useState } from 'react';
import { CartItem, OrderCustomerInfo, PaymentMethod, OrderMethod } from '../types/order';
import { formatRupiah } from '../utils/qrisGenerator';
import { X, Trash2, ShoppingBag, ArrowRight, QrCode, Banknote, Sparkles, AlertCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/menuData';
import { MENU_IMAGES } from '../data/menuImages';
import { Affiliator } from '../data/affiliatorsData';
import { AffiliatorSelector } from './AffiliatorSelector';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  customerInfo: OrderCustomerInfo;
  onUpdateCustomerInfo: (info: Partial<OrderCustomerInfo>) => void;
  onProceedToQris: () => void;
  onProceedDirectWhatsApp: () => void;
  affiliators: Affiliator[];
  selectedAffiliator: Affiliator;
  onSelectAffiliator: (aff: Affiliator) => void;
  onOpenManageAffiliators: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customerInfo,
  onUpdateCustomerInfo,
  onProceedToQris,
  onProceedDirectWhatsApp,
  affiliators,
  selectedAffiliator,
  onSelectAffiliator,
  onOpenManageAffiliators,
}) => {
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!customerInfo.name.trim()) {
      setErrorMsg('Silakan isi Nama Pemesan terlebih dahulu.');
      return;
    }
    if (!customerInfo.phone.trim()) {
      setErrorMsg('Silakan isi Nomor WhatsApp Pemesan.');
      return;
    }
    if (customerInfo.method === 'delivery' && !customerInfo.address.trim()) {
      setErrorMsg('Silakan cantumkan Alamat Pengiriman.');
      return;
    }

    setErrorMsg('');
    if (customerInfo.paymentMethod === 'qris') {
      onProceedToQris();
    } else {
      onProceedDirectWhatsApp();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DFD5] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E8DFD3] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E86014]/10 text-[#E86014] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">Keranjang Pesanan</h2>
                <p className="text-xs text-stone-500">
                  {cartItems.length} menu dipilih · Dapur Le'Paroan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Kosongkan Keranjang"
                >
                  Kosongkan
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-stone-300" />
                <div>
                  <h3 className="text-sm font-bold text-stone-700">Keranjang Anda Masih Kosong</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                    Silakan pilih menu Nusantara lezat Dapur Le'Paroan untuk memulai pesanan.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-semibold bg-[#E86014] text-white rounded-xl shadow-xs hover:bg-[#D0520E] transition-colors cursor-pointer"
                >
                  Lihat Menu Hari Ini
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Menu Dipilih
                  </h3>
                  {cartItems.map((item) => {
                    const thumb = MENU_IMAGES[item.item.id];
                    return (
                      <div
                        key={item.cartItemId}
                        className="bg-white border border-[#E8DFD3] rounded-2xl p-3.5 shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5 min-w-0">
                            {thumb && (
                              <img
                                src={thumb}
                                alt={item.item.name}
                                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-100"
                              />
                            )}
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                                <span className="font-mono text-[#E86014] mr-1">[{item.item.code}]</span>
                                {item.item.name}
                              </h4>
                              <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                                {item.item.priceDisplay} / porsi
                              </div>
                            </div>
                          </div>

                          <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Hapus menu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                        <div className="text-xs font-mono font-bold text-stone-800 tabular-nums">
                          {formatRupiah(item.unitPrice * item.quantity)}
                        </div>

                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 rounded cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono text-stone-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 rounded cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

                {/* Delivery Area note */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-950">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-800">Dapur Le'Paroan Bintaro: </span>
                    Porsi lengkap hangat <em>Nasi • Lauk • Sayur • Sambal</em> siap antar ke seluruh area Bintaro &amp; sekitarnya.
                  </div>
                </div>

                {/* Customer Checkout Form */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Informasi Pemesan
                  </h3>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-3 bg-white border border-[#E8DFD3] rounded-2xl p-4">
                    {/* Customer Name */}
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Nama Pemesan / Kantor <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Pak Herman (Bintaro Sektor 7)"
                        value={customerInfo.name}
                        onChange={(e) =>
                          onUpdateCustomerInfo({ name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                      />
                    </div>

                    {/* Affiliator & WhatsApp Selector */}
                    <div>
                      <AffiliatorSelector
                        affiliators={affiliators}
                        selectedAffiliator={selectedAffiliator}
                        onSelectAffiliator={onSelectAffiliator}
                        onOpenManageModal={onOpenManageAffiliators}
                      />
                    </div>

                    {/* WhatsApp Phone */}
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Nomor WhatsApp Pemesan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          onUpdateCustomerInfo({ phone: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                      />
                    </div>

                    {/* Order Delivery Method */}
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Metode Pengambilan
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCustomerInfo({ method: 'delivery' })
                          }
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                            customerInfo.method === 'delivery'
                              ? 'border-[#E86014] bg-[#E86014]/10 text-[#E86014]'
                              : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          🛵 Antar Alamat (Delivery)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCustomerInfo({ method: 'pickup' })
                          }
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                            customerInfo.method === 'pickup'
                              ? 'border-[#E86014] bg-[#E86014]/10 text-[#E86014]'
                              : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          🥡 Ambil Sendiri (Takeaway)
                        </button>
                      </div>
                    </div>

                    {/* Address if delivery */}
                    {customerInfo.method === 'delivery' && (
                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          Alamat Pengantaran / Nomor Meja <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Tuliskan nama jalan, nomor rumah, patokan atau gedung kantor..."
                          value={customerInfo.address}
                          onChange={(e) =>
                            onUpdateCustomerInfo({ address: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                        />
                      </div>
                    )}

                    {/* Requested delivery time */}
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Rencana Jam Makan / Pengambilan
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Jam 12.00 WIB (Makan Siang)"
                        value={customerInfo.orderTime}
                        onChange={(e) =>
                          onUpdateCustomerInfo({ orderTime: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                      />
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Catatan Khusus untuk Dapur (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Sambal dipisah, bawa sendok garpu..."
                        value={customerInfo.additionalNotes}
                        onChange={(e) =>
                          onUpdateCustomerInfo({ additionalNotes: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                      Metode Pembayaran
                    </label>

                    <div className="grid grid-cols-1 gap-2">
                      {/* QRIS Option */}
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateCustomerInfo({ paymentMethod: 'qris' })
                        }
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          customerInfo.paymentMethod === 'qris'
                            ? 'border-[#E86014] bg-orange-50/70 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            customerInfo.paymentMethod === 'qris'
                              ? 'bg-[#DF192A] text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <QrCode className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900">
                              QRIS GoPay Merchant (Semua Bank &amp; E-Wallet)
                            </span>
                            <span className="text-[10px] font-bold text-[#008BB9] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                              GOPAY RESMI
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Scan via GoPay, BCA, Mandiri, BRI, BNI, OVO, DANA, dll. Aman &amp; otomatis. <em>Tidak menerima transfer manual.</em>
                          </p>
                        </div>
                      </button>

                      {/* Cash Option */}
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateCustomerInfo({ paymentMethod: 'tunai' })
                        }
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          customerInfo.paymentMethod === 'tunai'
                            ? 'border-[#E86014] bg-orange-50/70 shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            customerInfo.paymentMethod === 'tunai'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-stone-900">
                            Tunai / Bayar di Tempat (COD)
                          </span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Bayar saat pesanan diambil atau saat kurir tiba di lokasi.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Subtotal & Proceed Button */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8DFD3] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-400 font-medium">Total Tagihan</div>
                  <div className="text-xl font-black font-mono text-stone-900 tabular-nums">
                    {formatRupiah(totalAmount)}
                  </div>
                </div>

                <div className="text-right text-[11px] text-stone-400">
                  Direct WhatsApp ke:<br />
                  <span className="font-semibold text-emerald-600 font-mono">
                    {WHATSAPP_NUMBER}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {customerInfo.paymentMethod === 'qris' ? (
                  <>
                    <QrCode className="w-4 h-4" />
                    <span>Lanjut ke Pembayaran QRIS</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Kirim Pesanan ke WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
