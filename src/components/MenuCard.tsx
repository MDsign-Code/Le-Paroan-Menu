import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { formatRupiah } from '../utils/qrisGenerator';
import { Plus, Check, Star, Utensils, CheckCircle } from 'lucide-react';
import { MENU_IMAGES } from '../data/menuImages';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const foodImage = MENU_IMAGES[item.id];

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 1200);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white border rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md ${
        item.isPremiumHighlight
          ? 'border-amber-300 shadow-amber-500/5 ring-1 ring-amber-300/60'
          : 'border-[#E8DFD3] hover:border-[#D9CEBF]'
      }`}
    >
      <div>
        {/* Leading Food Photography Slot */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 mb-3.5 shadow-2xs">
          {!imageError && foodImage ? (
            <img
              src={foodImage}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-amber-50/50 text-stone-400">
              <Utensils className="w-8 h-8 opacity-40 text-[#E86014]" />
              <span className="text-[10px] text-stone-400 mt-1 font-medium">Dapur Le'Paroan</span>
            </div>
          )}

          {/* Code badge (e.g. NJ, SM, SB) on top left */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="w-7 h-7 bg-stone-950/90 text-white rounded-lg flex items-center justify-center font-mono font-black text-xs shadow-sm">
              {item.code}
            </span>
            <span className="px-2 py-1 bg-stone-900/80 backdrop-blur-xs text-white rounded-lg text-[10px] font-semibold tracking-wide">
              {item.mealLabel}
            </span>
          </div>

          {/* Premium Badge if applicable */}
          {item.isPremiumHighlight && (
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-amber-500 text-white font-bold text-[10px] rounded-lg shadow-sm flex items-center gap-1 uppercase tracking-wider">
              <Star className="w-3 h-3 fill-white" />
              <span>★ HARGA PREMIUM</span>
            </div>
          )}

          {/* Availability Status bottom right */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-emerald-700/90 backdrop-blur-xs text-white rounded-md text-[10px] font-bold flex items-center gap-1 shadow-2xs font-mono">
            <CheckCircle className="w-3 h-3 text-emerald-200" />
            <span>{item.stockStatus}</span>
          </div>
        </div>

        {/* Title & Price Header */}
        <div className="space-y-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-extrabold text-stone-900 group-hover:text-[#E86014] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="text-base sm:text-lg font-black font-mono text-[#E86014] shrink-0">
              {item.priceDisplay}
            </span>
          </div>
          {item.subtitle && (
            <p className="text-xs text-[#E86014] font-medium">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Komposisi Saja */}
        <div className="mt-3 p-2.5 bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl text-xs text-stone-700 leading-relaxed">
          <span className="font-semibold text-stone-900">Komposisi: </span>
          {item.composition}
        </div>
      </div>

      {/* Card Footer: Subtotal, Stepper & Pesan Button */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-stone-400 font-medium">Subtotal</div>
          <div className="text-sm sm:text-base font-bold font-mono text-stone-900 tabular-nums">
            {formatRupiah(item.price * quantity)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stepper */}
          <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              -
            </button>
            <span className="w-6 text-center text-xs font-bold font-mono text-stone-800 tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 rounded cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E86014] hover:bg-[#D0520E] text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Masuk!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Pesan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
