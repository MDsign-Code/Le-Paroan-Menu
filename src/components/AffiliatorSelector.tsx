import React from 'react';
import { UserCheck, Phone, MapPin, ChevronDown, Settings2, CheckCircle2, Sparkles } from 'lucide-react';
import { Affiliator } from '../data/affiliatorsData';

interface AffiliatorSelectorProps {
  affiliators: Affiliator[];
  selectedAffiliator: Affiliator;
  onSelectAffiliator: (aff: Affiliator) => void;
  onOpenManageModal: () => void;
  compact?: boolean;
}

export const AffiliatorSelector: React.FC<AffiliatorSelectorProps> = ({
  affiliators,
  selectedAffiliator,
  onSelectAffiliator,
  onOpenManageModal,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <button
          onClick={onOpenManageModal}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg font-medium transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="truncate max-w-[130px] sm:max-w-[200px]">
            {selectedAffiliator.name}
          </span>
          <ChevronDown className="w-3 h-3 text-emerald-700 shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-[#E8DFD3] rounded-2xl space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0E3A2F]">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Pilihan Afiliator WhatsApp (A s/d C)</span>
        </div>

        <button
          type="button"
          onClick={onOpenManageModal}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E86014] hover:text-[#D0520E] cursor-pointer"
        >
          <Settings2 className="w-3 h-3" />
          <span>Kelola / No. WA</span>
        </button>
      </div>

      {/* Pilihan 3 Tombol Cepat: Afiliator A, Afiliator B, Afiliator C */}
      <div className="grid grid-cols-3 gap-2">
        {affiliators.slice(0, 3).map((aff) => {
          const isSelected = selectedAffiliator.id === aff.id;
          return (
            <button
              key={aff.id}
              type="button"
              onClick={() => onSelectAffiliator(aff)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                isSelected
                  ? 'bg-emerald-50 border-[#0E3A2F] ring-2 ring-[#0E3A2F]/20 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0E3A2F] text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              )}
              <span className={`text-xs font-black block leading-none ${isSelected ? 'text-[#0E3A2F]' : 'text-stone-800'}`}>
                {aff.name}
              </span>
              <span className="text-[10px] font-mono text-stone-500 block truncate max-w-full px-1">
                {aff.phone}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dropdown untuk daftar lengkap / custom */}
      <div className="relative">
        <select
          value={selectedAffiliator.id}
          onChange={(e) => {
            const found = affiliators.find((a) => a.id === e.target.value);
            if (found) onSelectAffiliator(found);
          }}
          className="w-full appearance-none px-3.5 py-2 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0E3A2F]/30 focus:border-[#0E3A2F] cursor-pointer pr-8"
        >
          {affiliators.map((aff) => (
            <option key={aff.id} value={aff.id}>
              {aff.name} — WA: {aff.phone} ({aff.area})
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Detail Afiliator Terpilih */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <div>
            <span className="font-bold text-stone-900 block leading-tight">
              Tujuan: {selectedAffiliator.name}
            </span>
            <span className="text-[11px] text-stone-600">
              Wilayah: {selectedAffiliator.area}
            </span>
          </div>
        </div>

        <div className="font-mono font-bold text-[#0E3A2F] flex items-center gap-1.5 self-end sm:self-auto">
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>{selectedAffiliator.phone}</span>
        </div>
      </div>
    </div>
  );
};
