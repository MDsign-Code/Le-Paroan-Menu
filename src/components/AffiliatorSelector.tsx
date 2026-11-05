import React from 'react';
import { UserCheck, Phone, MapPin, ChevronDown, Settings2, Share2 } from 'lucide-react';
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
    <div className="p-3.5 bg-white border border-[#E8DFD3] rounded-2xl space-y-2.5 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tujuan WhatsApp Afiliator / Agen</span>
        </div>

        <button
          type="button"
          onClick={onOpenManageModal}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E86014] hover:text-[#D0520E] cursor-pointer"
        >
          <Settings2 className="w-3 h-3" />
          <span>Kelola / Tambah Agen</span>
        </button>
      </div>

      {/* Select Dropdown / Quick Switch */}
      <div className="relative">
        <select
          value={selectedAffiliator.id}
          onChange={(e) => {
            const found = affiliators.find((a) => a.id === e.target.value);
            if (found) onSelectAffiliator(found);
          }}
          className="w-full appearance-none px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E86014]/30 focus:border-[#E86014] cursor-pointer pr-8"
        >
          {affiliators.map((aff) => (
            <option key={aff.id} value={aff.id}>
              [{aff.code}] {aff.name} — {aff.phone} ({aff.area})
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Active Details Card */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-stone-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
        <div className="flex items-center gap-1.5 text-emerald-800 font-semibold font-mono">
          <Phone className="w-3 h-3 text-emerald-600" />
          <span>Nomor WA: {selectedAffiliator.phone}</span>
        </div>
        <div className="flex items-center gap-1 text-stone-500">
          <MapPin className="w-3 h-3 text-stone-400" />
          <span>Wilayah: {selectedAffiliator.area}</span>
        </div>
      </div>
    </div>
  );
};
