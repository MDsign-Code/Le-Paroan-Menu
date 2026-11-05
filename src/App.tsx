import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealFilterToolbar } from './components/MealFilterToolbar';
import { MenuCard } from './components/MenuCard';
import { CartDrawer } from './components/CartDrawer';
import { QrisModal } from './components/QrisModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PriceTiersModal } from './components/PriceTiersModal';
import { OrderingGuideSection } from './components/OrderingGuideSection';
import { Footer } from './components/Footer';
import { MENU_ITEMS, MenuItem, MealTime, PriceTier, BRAND_NAME, BRAND_LOCATION, WHATSAPP_NUMBER } from './data/menuData';
import { CartItem, OrderCustomerInfo } from './types/order';
import { generateOrderId, buildWhatsAppMessage, getWhatsAppUrl } from './utils/whatsappHelper';
import { formatRupiah } from './utils/qrisGenerator';
import { ShoppingBag, ArrowRight, FilterX, Clock, Star } from 'lucide-react';

export default function App() {
  // Filter states
  const [selectedMeal, setSelectedMeal] = useState<MealTime | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<PriceTier | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    try {
      const saved = localStorage.getItem('dlp_bintaro_customer');
      return saved ? JSON.parse(saved) : {
        name: '',
        affiliatorName: '',
        phone: '',
        method: 'delivery',
        address: '',
        orderMealTime: 'semua',
        orderTime: '',
        paymentMethod: 'qris',
        additionalNotes: '',
      };
    } catch {
      return {
        name: '',
        affiliatorName: '',
        phone: '',
        method: 'delivery',
        address: '',
        orderMealTime: 'semua',
        orderTime: '',
        paymentMethod: 'qris',
        additionalNotes: '',
      };
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPriceTiersOpen, setIsPriceTiersOpen] = useState<boolean>(false);
  const [isQrisOpen, setIsQrisOpen] = useState<boolean>(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState<boolean>(false);

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
      localStorage.setItem('dlp_bintaro_customer', JSON.stringify(customerInfo));
    } catch (e) {
      // ignore
    }
  }, [customerInfo]);

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number
  ) => {
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

  // Filtered menu items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Meal filter
      if (selectedMeal !== 'all') {
        if (item.mealTime !== selectedMeal) {
          return false;
        }
      }

      // Tier filter
      if (selectedTier !== 'all') {
        if (item.tier !== selectedTier) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesComp = item.composition.toLowerCase().includes(query);
        const matchesTag = item.tag.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesDesc && !matchesComp && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [selectedMeal, selectedTier, searchQuery]);

  // Proceed to QRIS
  const handleProceedToQris = () => {
    const orderId = generateOrderId();
    setActiveOrderId(orderId);
    setIsCartOpen(false);
    setIsQrisOpen(true);
  };

  // Confirm QRIS Payment & Ready to WhatsApp
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
    setActiveWaUrl(getWhatsAppUrl(msg));
    setIsOrderSuccessOpen(true);
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
    setActiveWaUrl(getWhatsAppUrl(msg));
    setIsOrderSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPriceTiers={() => setIsPriceTiersOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          onOpenPriceTiers={() => setIsPriceTiersOpen(true)}
        />

        {/* Meal & Tier Filter Toolbar */}
        <section id="menu-section">
          <MealFilterToolbar
            selectedMeal={selectedMeal}
            onSelectMeal={setSelectedMeal}
            selectedTier={selectedTier}
            onSelectTier={setSelectedTier}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </section>

        {/* 21 Menu Showcase Grid */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Filter Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-[#E86014]">
                {BRAND_NAME} • {BRAND_LOCATION}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-0.5">
                {selectedMeal === 'all'
                  ? 'Katalog 21 Pilihan Menu Harian'
                  : selectedMeal === 'sarapan'
                  ? '07 Menu Sarapan (Gastronomi Pagi • 06:00-10:00)'
                  : selectedMeal === 'siang'
                  ? '07 Menu Makan Siang (Pegawai & Mahasiswa • 11:00-14:30)'
                  : selectedMeal === 'malam'
                  ? '07 Menu Makan Malam (Rumah Tangga & Apartemen • 17:00-21:00)'
                  : 'Minuman Khas Rempah'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Porsi lengkap, hangat, siap antar Bintaro &amp; sekitarnya • Fresh Cooked Daily
              </p>
            </div>

            <div className="text-xs text-stone-600 font-semibold bg-white px-3.5 py-2 rounded-xl border border-[#E8DFD3] shadow-2xs self-start sm:self-auto">
              Menampilkan <span className="font-bold text-[#E86014] font-mono">{filteredMenuItems.length}</span> Menu Tersedia
            </div>
          </div>

          {/* Cards Grid */}
          {filteredMenuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E8DFD3] rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <FilterX className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Tidak Ada Menu yang Sesuai
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Coba sesuaikan kata kunci pencarian atau reset filter harga.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedMeal('all');
                  setSelectedTier('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#E86014] rounded-xl hover:bg-[#D0520E] transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </section>


        {/* WhatsApp & QRIS Ordering Guide */}
        <OrderingGuideSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobile Sticky Cart CTA Bar (<= 15% height) */}
      {cartTotalItems > 0 && (
        <div className="md:hidden fixed bottom-4 inset-x-4 z-40 animate-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#E86014] text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between font-semibold text-sm active:scale-98 transition-all cursor-pointer border border-[#D0520E]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white text-[#E86014] flex items-center justify-center text-xs font-bold font-mono">
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
      />

      {/* QRIS Payment Modal */}
      <QrisModal
        isOpen={isQrisOpen}
        onClose={() => setIsQrisOpen(false)}
        orderId={activeOrderId}
        totalAmount={totalAmount}
        onConfirmQrisPaid={handleConfirmQrisPaid}
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
      />

      {/* Price Tiers Modal */}
      <PriceTiersModal
        isOpen={isPriceTiersOpen}
        onClose={() => setIsPriceTiersOpen(false)}
      />
    </div>
  );
}
