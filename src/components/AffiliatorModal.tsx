import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Check, Copy, Phone, MapPin, UserCheck, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { Affiliator, formatPhoneForWhatsApp, formatPhoneDisplay } from '../data/affiliatorsData';

interface AffiliatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliators: Affiliator[];
  selectedAffiliator: Affiliator;
  onSelectAffiliator: (aff: Affiliator) => void;
  onSaveAffiliators: (list: Affiliator[]) => void;
}

export const AffiliatorModal: React.FC<AffiliatorModalProps> = ({
  isOpen,
  onClose,
  affiliators,
  selectedAffiliator,
  onSelectAffiliator,
  onSaveAffiliators,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formArea, setFormArea] = useState<string>('');
  const [formCode, setFormCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleOpenAdd = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormName('');
    setFormPhone('');
    setFormArea('');
    setFormCode(`AFF-${String(affiliators.length + 1).padStart(2, '0')}`);
    setErrorMsg('');
  };

  const handleOpenEdit = (aff: Affiliator) => {
    setIsEditing(true);
    setEditingId(aff.id);
    setFormName(aff.name);
    setFormPhone(aff.phone);
    setFormArea(aff.area);
    setFormCode(aff.code);
    setErrorMsg('');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setErrorMsg('Nama Afiliator wajib diisi.');
      return;
    }
    const cleanDigits = formPhone.replace(/\D/g, '');
    if (cleanDigits.length < 9) {
      setErrorMsg('Nomor WhatsApp tidak valid (minimal 9 digit).');
      return;
    }

    if (editingId) {
      // Update
      const updated = affiliators.map((a) =>
        a.id === editingId
          ? {
              ...a,
              name: formName.trim(),
              phone: formPhone.trim(),
              area: formArea.trim() || 'Bintaro & Sekitarnya',
              code: formCode.trim().toUpperCase() || a.code,
            }
          : a
      );
      onSaveAffiliators(updated);
      if (selectedAffiliator.id === editingId) {
        const found = updated.find((a) => a.id === editingId);
        if (found) onSelectAffiliator(found);
      }
    } else {
      // Add new
      const newId = `aff-${Date.now().toString(36)}`;
      const newAff: Affiliator = {
        id: newId,
        name: formName.trim(),
        phone: formPhone.trim(),
        area: formArea.trim() || 'Area Bintaro',
        code: formCode.trim().toUpperCase() || `AFF-${affiliators.length + 1}`,
      };
      const updated = [...affiliators, newAff];
      onSaveAffiliators(updated);
      onSelectAffiliator(newAff);
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (affiliators.length <= 1) {
      alert('Minimal harus ada satu nomor WhatsApp tujuan.');
      return;
    }
    if (confirm('Yakin ingin menghapus affiliator ini?')) {
      const updated = affiliators.filter((a) => a.id !== id);
      onSaveAffiliators(updated);
      if (selectedAffiliator.id === id) {
        onSelectAffiliator(updated[0]);
      }
    }
  };

  const handleCopyLink = (aff: Affiliator) => {
    const origin = window.location.origin + window.location.pathname;
    const shareUrl = `${origin}?aff=${encodeURIComponent(aff.id)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(aff.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#FAF7F2] border-b border-[#E8DFD3] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E86014] text-white flex items-center justify-center shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-stone-900 tracking-tight">
                Pilih &amp; Kelola Nomor Afiliator WhatsApp
              </h3>
              <p className="text-xs text-stone-500">
                Pesanan akan otomatis dikirim ke nomor WhatsApp affiliator terpilih
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Add / Edit Form Drawer */}
          {isEditing ? (
            <form onSubmit={handleSaveForm} className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E86014]" />
                  <span>{editingId ? 'Edit Data Afiliator' : 'Tambah Afiliator Baru'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Batal
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-100 text-red-800 rounded-lg text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Nama Afiliator / Agen *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Afiliator Sektor 9 (Bu Ratna)"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Nomor WhatsApp Tujuan *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081298765432"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Wilayah / Area Antar
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sektor 7, 8, 9, Emerald"
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Kode Singkat
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: AFF-01 / PUSAT"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 font-mono font-bold uppercase focus:outline-none focus:ring-1 focus:ring-[#E86014]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200/60 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Simpan Afiliator
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Daftar Afiliator Tersedia ({affiliators.length})
              </span>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E86014] hover:bg-[#D0520E] text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Afiliator / No. WA</span>
              </button>
            </div>
          )}

          {/* List of Affiliators */}
          <div className="space-y-3">
            {affiliators.map((aff) => {
              const isSelected = selectedAffiliator.id === aff.id;
              return (
                <div
                  key={aff.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-[#E86014] bg-orange-50/50 shadow-xs ring-1 ring-[#E86014]/50'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-stone-900 text-white font-mono text-[10px] font-bold">
                          {aff.code}
                        </span>
                        <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
                          {aff.name}
                        </h4>
                        {aff.isDefault && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                            PUSAT
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#E86014] bg-orange-100 px-2 py-0.2 rounded-full border border-orange-200">
                            SEDANG AKTIF
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-0.5">
                        <div className="flex items-center gap-1 font-mono text-emerald-700 font-bold">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{aff.phone}</span>
                        </div>
                        <span className="text-stone-300">·</span>
                        <div className="flex items-center gap-1 text-stone-500">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{aff.area}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {/* Copy Share Link */}
                      <button
                        type="button"
                        onClick={() => handleCopyLink(aff)}
                        className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                        title="Salin Link Khusus Afiliator Ini"
                      >
                        {copiedId === aff.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(aff)}
                        className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                        title="Edit Data Afiliator"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      {!aff.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleDelete(aff.id)}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Hapus Afiliator"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Select / Active */}
                      <button
                        type="button"
                        onClick={() => onSelectAffiliator(aff)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 active:scale-95'
                        }`}
                      >
                        {isSelected ? '✓ Terpilih' : 'Pilih Ini'}
                      </button>
                    </div>
                  </div>

                  {copiedId === aff.id && (
                    <div className="mt-2 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ✓ Link pemesanan khusus afiliator <strong>{aff.name}</strong> berhasil disalin! Bagikan ke pelanggan Anda.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-[11px] text-stone-600 leading-relaxed">
            💡 <strong>Fitur Link Khusus Afiliator</strong>: Setiap agen dapat membagikan link khusus (klik icon bagikan <Share2 className="w-3 h-3 inline mx-0.5 text-stone-600" />). Saat pelanggan membuka link tersebut, nomor WhatsApp pesanan akan otomatis terarah ke agen yang bersangkutan!
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD3] flex items-center justify-between">
          <div className="text-xs text-stone-600 font-medium">
            Afiliator Aktif: <strong className="text-stone-900">{selectedAffiliator.name}</strong> ({selectedAffiliator.phone})
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
