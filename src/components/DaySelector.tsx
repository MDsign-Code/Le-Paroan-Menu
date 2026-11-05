import React from 'react';
import { DAYS_INFO, DayOfWeek, MealType } from '../data/menuData';
import { Search, Calendar, Sparkles } from 'lucide-react';

interface DaySelectorProps {
  selectedDay: DayOfWeek | 'all';
  onSelectDay: (day: DayOfWeek | 'all') => void;
  selectedMeal: MealType | 'all';
  onSelectMeal: (meal: MealType | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  todayDayKey: DayOfWeek;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDay,
  onSelectDay,
  selectedMeal,
  onSelectMeal,
  searchQuery,
  onSearchChange,
  todayDayKey,
}) => {
  const mealFilters: { key: MealType | 'all'; label: string }[] = [
    { key: 'all', label: 'Semua Waktu' },
    { key: 'sarapan', label: 'Sarapan Pagi' },
    { key: 'siang', label: 'Makan Siang' },
    { key: 'malam', label: 'Makan Malam' },
    { key: 'minuman', label: 'Minuman' },
    { key: 'paket', label: 'Paket Spesial' },
  ];

  return (
    <div className="bg-white border-y border-[#EBE3D7] shadow-xs py-5 sticky top-18 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top bar: Section Title, Search Bar, and Today Quick Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#E86014]" />
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Pilih Jadwal &amp; Hari Menu
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Menu fresh disiapkan harian sesuai rotasi rempah Nusantara Dapur Le'Paroan
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick jump to Today */}
            <button
              onClick={() => onSelectDay(todayDayKey)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedDay === todayDayKey
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Menu Hari Ini ({DAYS_INFO.find(d => d.key === todayDayKey)?.label})</span>
            </button>

            {/* Search Input */}
            <div className="relative min-w-[180px] sm:min-w-[220px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari menu, iga, rawon..."
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
        </div>

        {/* Day Selector Tabs (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectDay('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer whitespace-nowrap ${
              selectedDay === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            Semua Hari (Senin - Minggu)
          </button>

          {DAYS_INFO.map((day) => {
            const isToday = day.key === todayDayKey;
            const isSelected = selectedDay === day.key;

            return (
              <button
                key={day.key}
                onClick={() => onSelectDay(day.key)}
                className={`relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#E86014] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                <span>{day.label}</span>
                {isToday && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Hari Ini
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Meal Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none border-t border-stone-100">
          <span className="text-xs text-stone-400 font-medium shrink-0 mr-1">Waktu:</span>
          {mealFilters.map((meal) => {
            const isSelected = selectedMeal === meal.key;
            return (
              <button
                key={meal.key}
                onClick={() => onSelectMeal(meal.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#E86014]/15 text-[#E86014] font-semibold border border-[#E86014]/30'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {meal.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
