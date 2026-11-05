import React from 'react';
import { DAYS_INFO, MENU_ITEMS, DayOfWeek } from '../data/menuData';
import { Calendar, ArrowRight, Utensils, HeartHandshake } from 'lucide-react';

interface WeeklyScheduleViewProps {
  onSelectDay: (day: DayOfWeek) => void;
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({ onSelectDay }) => {
  return (
    <section id="jadwal-mingguan" className="py-14 bg-[#FAF7F2] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E86014]">
              <Calendar className="w-4 h-4" />
              <span>Rotasi Menu Mingguan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Jadwal Kuliner 7 Hari Le'Paroan
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Setiap hari menghadirkan 3 menu khas Nusantara berbeda untuk Sarapan, Makan Siang, dan Makan Malam.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium bg-white px-3.5 py-2 rounded-xl border border-[#E8DFD3] shadow-2xs self-start sm:self-auto">
            18 Menu Berbeda + Minuman Teh Rempah
          </div>
        </div>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DAYS_INFO.map((day) => {
            const dayItems = MENU_ITEMS.filter((i) => i.day === day.key);
            const isFriday = day.key === 'jumat';
            const isSunday = day.key === 'minggu';

            return (
              <div
                key={day.key}
                className="bg-white border border-[#E8DFD3] rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-md hover:border-[#D9CEBF] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h3 className="font-bold text-base text-stone-900">{day.label}</h3>
                      <p className="text-[11px] text-stone-500">{day.subtitle}</p>
                    </div>
                    {isFriday && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Berkah
                      </span>
                    )}
                    {isSunday && (
                      <span className="text-[10px] font-bold text-[#E86014] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                        Rame-Rame
                      </span>
                    )}
                  </div>

                  <div className="py-3 space-y-2.5">
                    {dayItems.length > 0 ? (
                      dayItems.map((item) => (
                        <div key={item.id} className="text-xs">
                          <div className="text-[10px] uppercase font-bold text-[#E86014]">
                            {item.mealLabel}
                          </div>
                          <div className="font-semibold text-stone-800 line-clamp-1 mt-0.5">
                            {item.name}
                          </div>
                          <div className="text-[11px] font-mono text-stone-500">
                            {item.priceDisplay}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-stone-400 italic py-2">
                        Paket Rame-Rame &amp; Minuman
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <button
                    onClick={() => onSelectDay(day.key)}
                    className="w-full py-2 text-xs font-semibold text-[#E86014] hover:text-white bg-[#E86014]/10 hover:bg-[#E86014] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Pilih Menu {day.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
