import React from 'react';
import { MealTime, PriceTier, MEAL_TIMES } from '../data/menuData';
import { Search, Clock, Sparkles } from 'lucide-react';

interface MealFilterToolbarProps {
  selectedMeal: MealTime | 'all';
  onSelectMeal: (meal: MealTime | 'all') => void;
  selectedTier: PriceTier | 'all';
  onSelectTier: (tier: PriceTier | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const MealFilterToolbar: React.FC<MealFilterToolbarProps> = ({
  selectedMeal,
  onSelectMeal,
  selectedTier,
  onSelectTier,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-white border-y border-[#EBE3D7] shadow-xs py-5 sticky top-18 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top bar: Section Title & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E86014]" />
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Pilih Jadwal Waktu Makan
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              21 pilihan menu terbagi dalam 3 sesi gastronomi harian (Sarapan, Siang, dan Malam)
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari soto, rendang, bubur, iga..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E86014]/20 focus:border-[#E86014]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Meal Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectMeal('all')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer whitespace-nowrap ${
              selectedMeal === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Semua Menu (21 Pilihan)
          </button>

          {MEAL_TIMES.map((m) => {
            const isSelected = selectedMeal === m.key;
            return (
              <button
                key={m.key}
                onClick={() => onSelectMeal(m.key)}
                className={`relative px-4 py-2.5 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#E86014] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span className="text-sm">{m.iconSymbol}</span>
                <span>{m.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  07 Menu
                </span>
              </button>
            );
          })}

          <button
            onClick={() => onSelectMeal('minuman')}
            className={`px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer whitespace-nowrap ${
              selectedMeal === 'minuman'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            🍵 Teh Rempah (5K)
          </button>
        </div>

        {/* Price Tier Segmented Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none border-t border-stone-100">
          <span className="text-xs text-stone-400 font-medium shrink-0 mr-1">Filter Harga:</span>
          
          <button
            onClick={() => onSelectTier('all')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              selectedTier === 'all'
                ? 'bg-[#E86014]/15 text-[#E86014] font-bold border border-[#E86014]/30'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Semua Harga
          </button>

          <button
            onClick={() => onSelectTier('standard')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              selectedTier === 'standard'
                ? 'bg-[#E86014]/15 text-[#E86014] font-bold border border-[#E86014]/30'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            20K Base (Standard)
          </button>

          <button
            onClick={() => onSelectTier('special')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              selectedTier === 'special'
                ? 'bg-[#E86014]/15 text-[#E86014] font-bold border border-[#E86014]/30'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            22K - 23K (Special)
          </button>

          <button
            onClick={() => onSelectTier('iga')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              selectedTier === 'iga'
                ? 'bg-[#E86014]/15 text-[#E86014] font-bold border border-[#E86014]/30'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            25K (Iga / Premium)
          </button>

          <button
            onClick={() => onSelectTier('premium')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              selectedTier === 'premium'
                ? 'bg-amber-500 text-white font-bold shadow-2xs'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span>★ 28K (Premium Highlight)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
