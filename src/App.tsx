import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DaySelector } from './components/DaySelector';
import { MenuCard } from './components/MenuCard';
import { CartDrawer } from './components/CartDrawer';
import { QrisModal } from './components/QrisModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { NutritionGuideModal } from './components/NutritionGuideModal';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { OrderingGuideSection } from './components/OrderingGuideSection';
import { Footer } from './components/Footer';
import { MENU_ITEMS, MenuItem, DayOfWeek, MealType, DAYS_INFO, WHATSAPP_NUMBER } from './data/menuData';
import { CartItem, OrderCustomerInfo } from './types/order';
import { generateOrderId, buildWhatsAppMessage, getWhatsAppUrl } from './utils/whatsappHelper';
import { formatRupiah } from './utils/qrisGenerator';
import { ShoppingBag, ArrowRight, Sparkles, FilterX } from 'lucide-react';

export default function App() {
  // Determine current day of week (Senin - Minggu)
  const getTodayDayKey = (): DayOfWeek => {
    const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday ...
    switch (dayIndex) {
      case 1: return 'senin';
      case 2: return 'selasa';
      case 3: return 'rabu';
      case 4: return 'kamis';
      case 5: return 'jumat';
      case 6: return 'sabtu';
      case 0: return 'minggu';
      default: return 'senin';
    }
  };

  const todayDayKey = useMemo(() => getTodayDayKey(), []);

  // Filter states
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'all'>(todayDayKey);
  const [selectedMeal, setSelectedMeal] = useState<MealType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dlp_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>(() => {
    try {
      const saved = localStorage.getItem('dlp_customer_info');
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        method: 'delivery',
        address: '',
        orderDay: 'hari-ini',
        orderTime: '',
        paymentMethod: 'qris',
        additionalNotes: '',
      };
    } catch {
      return {
        name: '',
        phone: '',
        method: 'delivery',
        address: '',
        orderDay: 'hari-ini',
        orderTime: '',
        paymentMethod: 'qris',
        additionalNotes: '',
      };
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState<boolean>(false);
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
      localStorage.setItem('dlp_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dlp_customer_info', JSON.stringify(customerInfo));
    } catch (e) {
      // ignore
    }
  }, [customerInfo]);

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedVariant?: string,
    selectedOption?: string,
    customerNote?: string
  ) => {
    let unitPrice = item.price;
    if (item.variants && selectedVariant) {
      const match = item.variants.find((v) => v.name === selectedVariant);
      if (match) unitPrice = match.price;
    }

    const cartItemId = `${item.id}-${selectedVariant || 'default'}-${selectedOption || 'default'}-${customerNote || ''}`;

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
            selectedVariant,
            selectedOption,
            unitPrice,
            quantity,
            customerNote: customerNote || '',
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
      // Day filter
      if (selectedDay !== 'all') {
        const isTehRempah = item.id === 'teh-rempah';
        const isFamilyPack = item.id === 'minggu-paket' && selectedDay === 'minggu';
        const matchesDay = item.day === selectedDay;
        // Teh Rempah is available every day
        if (!matchesDay && !isTehRempah && !isFamilyPack) {
          return false;
        }
      }

      // Meal filter
      if (selectedMeal !== 'all') {
        if (item.mealType !== selectedMeal) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDayLabel = item.dayLabel.toLowerCase().includes(query);
        const matchesMeal = item.mealLabel.toLowerCase().includes(query);
        const matchesTag = item.tag.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesDayLabel && !matchesMeal && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDay, selectedMeal, searchQuery]);

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

  // Proceed Direct to WhatsApp (Tunai / COD)
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
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNutrition={() => setIsNutritionOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          currentDay={todayDayKey}
          onSelectDay={(day) => setSelectedDay(day)}
          onOpenNutrition={() => setIsNutritionOpen(true)}
        />

        {/* Day & Meal Selector Toolbar */}
        <section id="menu-section">
          <DaySelector
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            selectedMeal={selectedMeal}
            onSelectMeal={setSelectedMeal}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            todayDayKey={todayDayKey}
          />
        </section>

        {/* Menu Grid Section */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-[#E86014]">
                Daftar Sajian Pilihan
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                {selectedDay === 'all'
                  ? 'Semua Menu Mingguan (Senin - Minggu)'
                  : `Menu Hari ${DAYS_INFO.find((d) => d.key === selectedDay)?.label}`}
                {selectedMeal !== 'all' && (
                  <span className="text-stone-500 font-normal text-base ml-2">
                    · {selectedMeal === 'sarapan' ? 'Sarapan Pagi' : selectedMeal === 'siang' ? 'Makan Siang' : selectedMeal === 'malam' ? 'Makan Malam' : selectedMeal === 'minuman' ? 'Minuman' : 'Paket Rame-Rame'}
                  </span>
                )}
              </h2>
            </div>

            <div className="text-xs text-stone-500 font-medium">
              Menampilkan <span className="font-bold text-stone-900">{filteredMenuItems.length}</span> pilihan sajian
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
                  onOpenNutritionDetail={() => setIsNutritionOpen(true)}
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
                  Coba ubah kata kunci pencarian atau pilih hari dan kategori waktu lainnya.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedDay('all');
                  setSelectedMeal('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#E86014] rounded-xl hover:bg-[#D0520E] transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </section>

        {/* Weekly Schedule Matrix */}
        <WeeklyScheduleView
          onSelectDay={(day) => {
            setSelectedDay(day);
            const el = document.getElementById('menu-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* WhatsApp & QRIS Ordering Guide */}
        <OrderingGuideSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobile Sticky Cart CTA Bar (Controlled <=15% height) */}
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

      {/* Nutrition & Packaging Guide Modal */}
      <NutritionGuideModal
        isOpen={isNutritionOpen}
        onClose={() => setIsNutritionOpen(false)}
      />
    </div>
  );
}
