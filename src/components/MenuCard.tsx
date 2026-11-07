import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { formatRupiah } from '../utils/qrisGenerator';
import { Plus, Check, Star, Utensils, Clock, XCircle, Lock, AlertTriangle } from 'lucide-react';
import { MENU_IMAGES } from '../data/menuImages';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  overrideSlotLabel?: string;
  isLockedHariH?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onAddToCart,
  overrideSlotLabel,
  isLockedHariH = false,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const foodImage = MENU_IMAGES[item.id];
  const slotLabel = overrideSlotLabel || item.deliverySlot || item.mealLabel;

  const handleAdd = () => {
    if (isLockedHariH) return;
    onAddToCart(item, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 1200);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white border rounded-2xl p-3.5 sm:p-4 transition-all duration-200 ${
        isLockedHariH
          ? 'border-red-200 bg-stone-50/80 shadow-2xs opacity-95'
          : item.isPremiumHighlight
          ? 'border-amber-300 ring-1 ring-amber-300/60 shadow-amber-500/5 hover:shadow-md hover:border-[#0E3A2F]/40'
          : 'border-[#E8DFD3] hover:border-[#0E3A2F]/40 hover:shadow-md'
      }`}
    >
      <div>
        {/* Diatas Gambar: Keterangan Sesi & Jam Terkirim (misal: Sarapan (5-7) terkirim) */}
        <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0E3A2F]">
            <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{slotLabel}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {isLockedHariH ? (
              <span className="text-[10px] font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <XCircle className="w-3 h-3 text-red-600" />
                <span>(TERSEDIA) ✕ HARI H</span>
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                ✓ PESAN H-1
              </span>
            )}
            <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
              [{item.code}]
            </span>
          </div>
        </div>

        {/* Gambar Menu Makanan */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 mb-3 shadow-2xs">
          {!imageError && foodImage ? (
            <img
              src={foodImage}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className={`h-full w-full object-cover transition-transform duration-500 ${
                isLockedHariH ? 'grayscale-[20%] opacity-85' : 'group-hover:scale-105'
              }`}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
              <Utensils className="w-8 h-8 opacity-40 text-emerald-900" />
              <span className="text-[10px] text-stone-400 mt-1 font-medium">Dapur Le'Paroan</span>
            </div>
          )}

          {/* Premium Highlight Tag if 28K */}
          {item.isPremiumHighlight && !isLockedHariH && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-500 text-white font-bold text-[10px] rounded-md shadow-xs flex items-center gap-1 uppercase tracking-wider">
              <Star className="w-3 h-3 fill-white" />
              <span>PREMIUM ★</span>
            </div>
          )}

          {/* Overlay jika menu hari ini (Hari H): Tidak Bisa Klik */}
          {isLockedHariH && (
            <div className="absolute inset-0 bg-stone-950/45 backdrop-blur-[1px] flex flex-col items-center justify-center p-3 text-center">
              <span className="px-2.5 py-1 bg-red-600 text-white font-black text-[11px] rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-white" />
                <span>(TERSEDIA) ✕ DITUTUP HARI H</span>
              </span>
              <span className="text-[10px] text-amber-200 font-bold drop-shadow mt-1 bg-stone-900/70 px-2 py-0.5 rounded">
                🔒 Wajib Pesan Minimal H-1
              </span>
            </div>
          )}
        </div>

        {/* Nama Menu & Harga (Komposisi Ditiadakan) */}
        <div className="space-y-0.5 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-base sm:text-lg font-black transition-colors leading-tight ${
              isLockedHariH ? 'text-stone-700' : 'text-stone-900 group-hover:text-[#0E3A2F]'
            }`}>
              {item.name}
            </h3>
            <span className="text-base sm:text-lg font-black font-mono text-[#E86014] shrink-0">
              {item.priceDisplay}
            </span>
          </div>
          {item.subtitle && (
            <p className="text-[11px] text-stone-500 line-clamp-1">
              {item.subtitle}
            </p>
          )}

          {isLockedHariH && (
            <p className="text-[10px] font-bold text-red-600 pt-0.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
              <span>Pemesanan hari H ditutup demi menjaga kesegaran masakan.</span>
            </p>
          )}
        </div>
      </div>

      {/* Disetiap Gambar Tetap Ada Pilihan Pesanan + */}
      <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-stone-400 font-medium">Subtotal</div>
          <div className="text-sm font-bold font-mono text-stone-900 tabular-nums">
            {formatRupiah(item.price * quantity)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stepper Jumlah Pesanan */}
          <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
            <button
              type="button"
              disabled={isLockedHariH || quantity <= 1}
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
              disabled={isLockedHariH}
              onClick={() => setQuantity((q) => q + 1)}
              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Tombol Pesan: Terprogram TIDAK BISA KLIK di Hari H */}
          {isLockedHariH ? (
            <button
              type="button"
              disabled
              title="Pemesanan di hari H telah ditutup. Sistem Dapur Le'Paroan khusus melayani Pesan Antar H-1."
              className="px-3.5 py-2 text-xs font-black rounded-xl flex items-center gap-1.5 bg-stone-200 text-stone-500 border border-stone-300 cursor-not-allowed select-none shadow-none"
            >
              <XCircle className="w-3.5 h-3.5 text-red-500" />
              <span>(Tersedia) ✕</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#0E3A2F] hover:bg-[#09261E] text-white'
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
                  <span>Pesan H-1 +</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
