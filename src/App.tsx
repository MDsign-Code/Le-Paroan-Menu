import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuCard } from './components/MenuCard';
import { CartDrawer } from './components/CartDrawer';
import { QrisModal } from './components/QrisModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PriceTiersModal } from './components/PriceTiersModal';
import { AffiliatorModal } from './components/AffiliatorModal';
import { SesiGastronomiBar } from './components/SesiGastronomiBar';
import { QrisPaymentSection } from './components/QrisPaymentSection';
import { Footer } from './components/Footer';
import {
  MENU_ITEMS,
  MenuItem,
  DayKey,
  DAYS_SCHEDULE,
  BRAND_NAME,
  BRAND_LOCATION,
  WHATSAPP_NUMBER,
} from './data/menuData';
import {
  Affiliator,
  getStoredAffiliators,
  saveStoredAffiliators,
  getInitialSelectedAffiliator,
} from './data/affiliatorsData';
import { CartItem, OrderCustomerInfo } from './types/order';
import { generateOrderId, buildWhatsAppMessage, getWhatsAppUrl } from './utils/whatsappHelper';
import { formatRupiah } from './utils/qrisGenerator';
import { ShoppingBag, ArrowRight, Calendar, Search, Sparkles } from 'lucide-react';

export default function App() {
  // Day filter state: 'all' or 'senin', 'selasa', etc.
  const [selectedDay, setSelectedDay] = useState<DayKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Affiliators State (Afiliator A sampai C)
  const [affiliators, setAffiliators] = useState<Affiliator[]>(() => getStoredAffiliators());
  const [selectedAffiliator, setSelectedAffiliator] = useState<Affiliator>(() => getInitialSelectedAffiliator());
  const [isAffiliatorModalOpen, setIsAffiliatorModalOpen] = useState<boolean>(false);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dlp_bintaro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>(() => {
    const initialAff = getInitialSelectedAffiliator();
    try {
      const saved = localStorage.getItem('dlp_bintaro_customer_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          affiliatorName: parsed.affiliatorName || initialAff.name,
          affiliatorPhone: parsed.affiliatorPhone || initialAff.phone,
          deliveryTiming: parsed.deliveryTiming || 'hari-ini',
          deliveryDateH1: parsed.deliveryDateH1 || 'Besok',
        };
      }
    } catch {
      // ignore
    }
    return {
      name: '',
      affiliatorName: initialAff.name,
      affiliatorPhone: initialAff.phone,
      phone: '',
      method: 'delivery',
      deliveryTiming: 'hari-ini',
      deliveryDateH1: 'Besok',
      address: '',
      orderMealTime: 'semua',
      orderTime: '',
      paymentMethod: 'qris',
      additionalNotes: '',
    };
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPriceTiersOpen, setIsPriceTiersOpen] = useState<boolean>(false);
  const [isQrisOpen, setIsQrisOpen] = useState<boolean>(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState<boolean>(false);

  // Switch / Select Affiliator (A, B, C)
  const handleSelectAffiliator = (aff: Affiliator) => {
    setSelectedAffiliator(aff);
    setCustomerInfo((prev) => ({
      ...prev,
      affiliatorName: aff.name,
      affiliatorPhone: aff.phone,
    }));
  };

  const handleSaveAffiliators = (updated: Affiliator[]) => {
    setAffiliators(updated);
    saveStoredAffiliators(updated);
    const stillActive = updated.find((a) => a.id === selectedAffiliator.id);
    if (stillActive) {
      setSelectedAffiliator(stillActive);
    } else if (updated.length > 0) {
      handleSelectAffiliator(updated[0]);
    }
  };

  // Active Order Details
  const [activeOrderId, setActiveOrderId] = useState<string>('');
  const [isQrisPaid, setIsQrisPaid] = useState<boolean>(false);
  const [activeWaMessage, setActiveWaMessage] = useState<string>('');
  const [activeWaUrl, setActiveWaUrl] = useState<string>('');

  // Save Cart & Customer info
  useEffect(() => {
    try {
      localStorage.setItem('dlp_bintaro_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dlp_bintaro_customer_v6', JSON.stringify(customerInfo));
    } catch (e) {
      // ignore
    }
  }, [customerInfo]);

  // Add Item to Cart
  const handleAddToCart = (item: MenuItem, quantity: number) => {
    const cartItemId = item.id;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            unitPrice: item.price,
            quantity,
            customerNote: '',
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdateCustomerInfo = (info: Partial<OrderCustomerInfo>) => {
    setCustomerInfo((prev) => ({ ...prev, ...info }));
  };

  // Cart total calculations
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cartItems]
  );

  const cartTotalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Filter Days schedule based on selectedDay & search query
  const displayedSchedule = useMemo(() => {
    let days = DAYS_SCHEDULE;
    if (selectedDay !== 'all') {
      days = days.filter((d) => d.key === selectedDay);
    }

    if (!searchQuery.trim()) {
      return days;
    }

    const q = searchQuery.toLowerCase();
    // Filter days that contain matched meals
    return days
      .map((day) => {
        const matchingMeals = day.meals.filter((m) => {
          const item = MENU_ITEMS.find((it) => it.id === m.itemId);
          if (!item) return false;
          return (
            item.name.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q) ||
            m.headerLabel.toLowerCase().includes(q)
          );
        });
        return {
          ...day,
          meals: matchingMeals,
        };
      })
      .filter((day) => day.meals.length > 0);
  }, [selectedDay, searchQuery]);

  // Proceed to QRIS
  const handleProceedToQris = () => {
    const orderId = generateOrderId();
    setActiveOrderId(orderId);
    setIsCartOpen(false);
    setIsQrisOpen(true);
  };

  // Confirm QRIS Payment & Directly Enter WhatsApp to official Dapur Le'Paroan (085964245547)
  const handleConfirmQrisPaid = () => {
    setIsQrisPaid(true);
    setIsQrisOpen(false);

    const msg = buildWhatsAppMessage(
      activeOrderId,
      cartItems,
      customerInfo,
      totalAmount,
      true
    );
    setActiveWaMessage(msg);
    const targetPhone = selectedAffiliator?.phone || WHATSAPP_NUMBER;
    const targetUrl = getWhatsAppUrl(msg, targetPhone);
    setActiveWaUrl(targetUrl);
    setIsOrderSuccessOpen(true);

    // Langsung masuk ke WhatsApp setelah konfirmasi pembayaran sesuai instruksi user
    try {
      window.open(targetUrl, '_blank');
    } catch {
      // fallback
    }
  };

  // Proceed Direct to WhatsApp
  const handleProceedDirectWhatsApp = () => {
    const orderId = generateOrderId();
    setActiveOrderId(orderId);
    setIsQrisPaid(false);
    setIsCartOpen(false);

    const msg = buildWhatsAppMessage(
      orderId,
      cartItems,
      customerInfo,
      totalAmount,
      false
    );
    setActiveWaMessage(msg);
    const targetPhone = selectedAffiliator?.phone || WHATSAPP_NUMBER;
    const targetUrl = getWhatsAppUrl(msg, targetPhone);
    setActiveWaUrl(targetUrl);
    setIsOrderSuccessOpen(true);

    try {
      window.open(targetUrl, '_blank');
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPriceTiers={() => setIsPriceTiersOpen(true)}
        selectedAffiliator={selectedAffiliator}
        onOpenAffiliatorModal={() => setIsAffiliatorModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Header Bersih: Logo & Nama Dapur Le'Paroan Iket Ijo Bintaro (Font Hijau/Hitam) */}
        <Hero
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* SESI GASTRONOMI: 01. Sarapan (06-10), 02. Siang (11-14:30), 03. Malam (17-21) */}
        <SesiGastronomiBar />

        {/* Section Menu Pilihan Terjadwal (Senin s/d Minggu) */}
        <section id="jadwal-harian" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Quick Search & Count Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8DFD3] shadow-2xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0E3A2F]" />
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-[#0E3A2F] block">
                  Jadwal Menu Pilihan Harian
                </span>
                <span className="text-[11px] text-stone-500">
                  {selectedDay === 'all' ? 'Menampilkan Senin s/d Minggu' : `Menampilkan Hari ${selectedDay.toUpperCase()}`}
                </span>
              </div>
            </div>

            {/* Simple Search Input */}
            <div className="relative min-w-[220px] sm:min-w-[260px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari soto, rendang, bubur, iga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#0E3A2F]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Susunan Menu Per Hari (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu) */}
          {displayedSchedule.length > 0 ? (
            <div className="space-y-12">
              {displayedSchedule.map((day) => (
                <div key={day.key} id={day.key} className="space-y-4 pt-2">
                  
                  {/* Judul Hari (Senin / Selasa / dst) */}
                  <div className="flex items-center justify-between border-b-2 border-[#0E3A2F]/20 pb-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0E3A2F] text-white flex items-center justify-center font-black text-sm shadow-xs">
                        {day.name.slice(0, 3)}
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#0E3A2F] tracking-tight">
                          {day.name}
                        </h2>
                        <span className="text-[11px] text-stone-500">
                          3 Pilihan Terjadwal (Sarapan, Makan Siang, Makan Malam)
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shadow-2xs">
                      Tersedia
                    </span>
                  </div>

                  {/* 3 Gambar Menu Terjadwal (Sarapan, Makan Siang, Makan Malam) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {day.meals.map((meal) => {
                      const item = MENU_ITEMS.find((it) => it.id === meal.itemId);
                      if (!item) return null;
                      return (
                        <MenuCard
                          key={item.id}
                          item={item}
                          overrideSlotLabel={meal.headerLabel}
                          onAddToCart={handleAddToCart}
                        />
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
              Tidak ada menu yang sesuai dengan pencarian Anda.
            </div>
          )}

          {/* Minuman Khas Nusantara (Setiap Hari) */}
          <div className="pt-8 border-t border-stone-200/80">
            <div className="mb-4">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                Minuman Pendamping
              </span>
              <h3 className="text-lg font-black text-[#0E3A2F] mt-1">
                Teh Rempah Le'Paroan (Tersedia Setiap Hari)
              </h3>
              <p className="text-xs text-stone-500">
                Pilihan Varian Serai Segar atau Rempah Pokak Hangat (5K)
              </p>
            </div>

            <div className="max-w-md">
              {(() => {
                const tehItem = MENU_ITEMS.find((it) => it.id === 'teh-rempah');
                if (!tehItem) return null;
                return (
                  <MenuCard
                    item={tehItem}
                    overrideSlotLabel="Minuman Khas (Setiap Hari)"
                    onAddToCart={handleAddToCart}
                  />
                );
              })()}
            </div>
          </div>

        </section>

        {/* BAYAR DISINI 👇 Gambar QRIS / Keranjang */}
        <QrisPaymentSection
          cartItems={cartItems}
          totalAmount={totalAmount}
          customerInfo={customerInfo}
          onUpdateCustomerInfo={handleUpdateCustomerInfo}
          onOpenCart={() => setIsCartOpen(true)}
          onProceedToQris={handleProceedToQris}
          affiliators={affiliators}
          selectedAffiliator={selectedAffiliator}
          onSelectAffiliator={handleSelectAffiliator}
          onOpenManageModal={() => setIsAffiliatorModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobile Sticky Cart CTA Bar (<= 15% height) */}
      {cartTotalItems > 0 && (
        <div className="md:hidden fixed bottom-4 inset-x-4 z-40 animate-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#0E3A2F] text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between font-semibold text-sm active:scale-98 transition-all cursor-pointer border border-emerald-950/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white text-[#0E3A2F] flex items-center justify-center text-xs font-bold font-mono">
                {cartTotalItems}
              </div>
              <span>Lihat Keranjang</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono font-bold">{formatRupiah(totalAmount)}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        customerInfo={customerInfo}
        onUpdateCustomerInfo={handleUpdateCustomerInfo}
        onProceedToQris={handleProceedToQris}
        onProceedDirectWhatsApp={handleProceedDirectWhatsApp}
        affiliators={affiliators}
        selectedAffiliator={selectedAffiliator}
        onSelectAffiliator={handleSelectAffiliator}
        onOpenManageAffiliators={() => setIsAffiliatorModalOpen(true)}
      />

      {/* QRIS Payment Modal */}
      <QrisModal
        isOpen={isQrisOpen}
        onClose={() => setIsQrisOpen(false)}
        orderId={activeOrderId}
        totalAmount={totalAmount}
        onConfirmQrisPaid={handleConfirmQrisPaid}
        affiliatorName={selectedAffiliator.name}
        affiliatorPhone={selectedAffiliator.phone}
      />

      {/* Order Success & WhatsApp Forward Modal */}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderId={activeOrderId}
        waMessage={activeWaMessage}
        waUrl={activeWaUrl}
        isQrisPaid={isQrisPaid}
        totalAmount={totalAmount}
        affiliatorName={selectedAffiliator.name}
        affiliatorPhone={selectedAffiliator.phone}
      />

      {/* Modal Kelola Afiliator WhatsApp */}
      <AffiliatorModal
        isOpen={isAffiliatorModalOpen}
        onClose={() => setIsAffiliatorModalOpen(false)}
        affiliators={affiliators}
        selectedAffiliator={selectedAffiliator}
        onSelectAffiliator={handleSelectAffiliator}
        onSaveAffiliators={handleSaveAffiliators}
      />

      {/* Price Tiers Modal */}
      <PriceTiersModal
        isOpen={isPriceTiersOpen}
        onClose={() => setIsPriceTiersOpen(false)}
      />
    </div>
  );
}
