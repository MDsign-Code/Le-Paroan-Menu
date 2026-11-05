import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Copy, Check, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/menuData';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  waMessage: string;
  waUrl: string;
  isQrisPaid: boolean;
  totalAmount: number;
  affiliatorName?: string;
  affiliatorPhone?: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderId,
  waMessage,
  waUrl,
  isQrisPaid,
  totalAmount,
  affiliatorName,
  affiliatorPhone,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#E86014', '#F59E0B', '#10B981', '#ffffff'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-emerald-50 to-white text-center border-b border-stone-100 space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
            Pesanan Berhasil Disiapkan!
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Nomor Pesanan: <strong className="font-mono text-stone-900">#{orderId}</strong>
            {isQrisPaid ? ' · QRIS Terkonfirmasi' : ' · Metode Tunai'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status Box */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              {isQrisPaid ? <QrCode className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div className="text-xs text-emerald-950">
              <div className="font-bold">
                {isQrisPaid ? 'Pembayaran QRIS Siap Dikirim' : 'Pesanan Siap Diteruskan'}
              </div>
              <div className="text-emerald-700 mt-0.5">
                Kirim detail pesanan Anda ke WhatsApp {affiliatorName ? <strong className="text-stone-900">{affiliatorName}</strong> : "Dapur Le'Paroan"} (<strong>{affiliatorPhone || WHATSAPP_NUMBER}</strong>) agar pesanan langsung diproses.
              </div>
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold">Format Pesan WhatsApp:</span>
              <button
                onClick={handleCopy}
                className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Pesan</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs text-stone-700 whitespace-pre-wrap max-h-48 overflow-y-auto select-all leading-relaxed">
              {waMessage}
            </div>
          </div>

          {/* Direct WhatsApp Call to Action */}
          <div className="space-y-2.5 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Buka WhatsApp Sekarang (Kirim Pesanan)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Format Pesanan Berhasil Disalin ke Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Pesan jika WhatsApp Tidak Terbuka Otomatis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#EBE3D7] flex justify-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            Selesai &amp; Kembali ke Halaman Menu
          </button>
        </div>

      </div>
    </div>
  );
};
