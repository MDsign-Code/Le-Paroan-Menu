import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { formatRupiah } from '../utils/qrisGenerator';
import { Plus, Check, Box, Sparkles, HeartHandshake, Info } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedVariant?: string,
    selectedOption?: string,
    customerNote?: string
  ) => void;
  onOpenNutritionDetail: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onAddToCart,
  onOpenNutritionDetail,
}) => {
  const defaultVariant = item.variants ? item.variants[0].name : undefined;
  const defaultOption = item.options ? item.options.choices[0] : undefined;

  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(defaultVariant);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(defaultOption);
  const [customerNote, setCustomerNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);

  // Compute current unit price
  let currentUnitPrice = item.price;
  if (item.variants && selectedVariant) {
    const matched = item.variants.find((v) => v.name === selectedVariant);
    if (matched) {
      currentUnitPrice = matched.price;
    }
  }

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedVariant, selectedOption, customerNote);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setCustomerNote('');
      setShowNoteInput(false);
      setQuantity(1);
    }, 1200);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white border border-[#E8DFD3] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-[#D9CEBF]">
      <div>
        {/* Unboxed Metadata Header (Anti-slop compliance: unboxed text with separators) */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#E86014] font-semibold">{item.dayLabel}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{item.mealLabel}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <Box className="w-3 h-3 text-stone-400" />
            <span className="truncate max-w-[140px]">{item.packaging}</span>
          </div>
        </div>

        {/* Dish Title */}
        <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#E86014] transition-colors leading-snug">
          {item.name}
        </h3>

        {/* Description from PDF */}
        <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-3 leading-relaxed">
          {item.description}
        </p>

        {/* Highlights / Special Notes */}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="mt-3 space-y-1">
            {item.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-stone-500">
                <span className="text-[#E86014] text-xs font-bold leading-none mt-1">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Friday Berkah notice */}
        {item.cashbackNote && (
          <div className="mt-3 p-2.5 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2 text-xs text-amber-900">
            <HeartHandshake className="w-4 h-4 text-[#E86014] shrink-0 mt-0.5" />
            <div className="leading-tight">
              <span className="font-semibold text-[#E86014]">Jumat Berkah: </span>
              {item.cashbackNote}
            </div>
          </div>
        )}

        {/* Nutritional balance indicator bar */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="font-medium">Komposisi Porsi Gizi:</span>
            <button
              onClick={onOpenNutritionDetail}
              className="text-[#E86014] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{item.nutrition.karbo}% K · {item.nutrition.protein}% P · {item.nutrition.sayur}% S</span>
              <Info className="w-3 h-3" />
            </button>
          </div>
          <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${item.nutrition.karbo}%` }}
              className="bg-amber-400"
              title={`Karbohidrat: ${item.nutrition.karbo}%`}
            />
            <div
              style={{ width: `${item.nutrition.protein}%` }}
              className="bg-red-400"
              title={`Protein: ${item.nutrition.protein}%`}
            />
            <div
              style={{ width: `${item.nutrition.sayur}%` }}
              className="bg-emerald-500"
              title={`Sayuran: ${item.nutrition.sayur}%`}
            />
          </div>
        </div>

        {/* Variant selector (e.g. Reguler / Premium) */}
        {item.variants && (
          <div className="mt-4 space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Pilihan Porsi:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {item.variants.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setSelectedVariant(v.name)}
                  className={`px-2.5 py-1.5 text-xs rounded-lg border text-left transition-all cursor-pointer ${
                    selectedVariant === v.name
                      ? 'border-[#E86014] bg-[#E86014]/5 text-[#E86014] font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div className="truncate">{v.name}</div>
                  <div className="font-mono text-[11px] font-bold text-stone-900 mt-0.5">
                    {formatRupiah(v.price)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Options Selector (e.g. Nasi vs Bubur, Teh Serai vs Pokak, Ketupat vs Buras) */}
        {item.options && (
          <div className="mt-4 space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              {item.options.title}:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {item.options.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setSelectedOption(choice)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                    selectedOption === choice
                      ? 'border-[#E86014] bg-[#E86014]/10 text-[#E86014] font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Customer Note Toggle & Input */}
        <div className="mt-3">
          {!showNoteInput ? (
            <button
              type="button"
              onClick={() => setShowNoteInput(true)}
              className="text-[11px] text-stone-500 hover:text-[#E86014] transition-colors cursor-pointer"
            >
              + Tambah catatan kustom (tanpa pedas, sambal pisah, dll)
            </button>
          ) : (
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Contoh: Sambal dipisah, tanpa tauge..."
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price & Add to Cart button */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-stone-400 font-medium">Harga</div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-900 tabular-nums">
            {formatRupiah(currentUnitPrice)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              -
            </button>
            <span className="w-7 text-center text-xs font-bold font-mono text-stone-800 tabular-nums">
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
