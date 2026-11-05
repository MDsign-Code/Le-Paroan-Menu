import React, { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, ArrowRight, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { generateQRMatrix, formatRupiah } from '../utils/qrisGenerator';
import { QRIS_MERCHANT_NAME, QRIS_NMID, WHATSAPP_NUMBER } from '../data/menuData';

interface QrisModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalAmount: number;
  onConfirmQrisPaid: () => void;
}

export const QrisModal: React.FC<QrisModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalAmount,
  onConfirmQrisPaid,
}) => {
  const [copiedAmount, setCopiedAmount] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(900); // 15 mins
  const [matrix, setMatrix] = useState<boolean[][]>([]);

  useEffect(() => {
    if (isOpen) {
      setSecondsLeft(900);
      const generated = generateQRMatrix(`QRIS.${QRIS_NMID}.${orderId}.${totalAmount}`, 29);
      setMatrix(generated);
    }
  }, [isOpen, orderId, totalAmount]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(totalAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Official-Style QRIS Header Banner */}
        <div className="bg-[#DF192A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white text-[#DF192A] px-2.5 py-1 rounded-md font-extrabold tracking-wider text-sm shadow-xs">
              QRIS
            </div>
            <div>
              <div className="text-[11px] font-medium tracking-wide text-white/90 uppercase">
                Standar Pembayaran Nasional
              </div>
              <div className="text-xs font-bold text-white tracking-wide">
                GPN · ASPI · Bank Indonesia
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Merchant Card */}
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
              Merchant Resmi
            </span>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              {QRIS_MERCHANT_NAME}
            </h3>
            <div className="flex items-center justify-center gap-2 text-xs text-stone-500 font-mono">
              <span>NMID: {QRIS_NMID}</span>
              <span>·</span>
              <span>ID: #{orderId}</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative p-4 bg-white rounded-2xl border-2 border-stone-200 shadow-sm max-w-[280px]">
              {/* QR Matrix */}
              <svg
                viewBox="0 0 29 29"
                className="w-56 h-56 sm:w-60 sm:h-60"
                shapeRendering="crispEdges"
              >
                {matrix.map((row, r) =>
                  row.map((cell, c) =>
                    cell ? (
                      <rect
                        key={`${r}-${c}`}
                        x={c}
                        y={r}
                        width={1}
                        height={1}
                        fill="#1C1917"
                      />
                    ) : null
                  )
                )}
              </svg>

              {/* QRIS Center Emblem */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white p-1 rounded-md shadow-xs border border-stone-200">
                  <div className="bg-[#DF192A] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded leading-none">
                    QRIS
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
              <span>Batas Waktu Bayar:</span>
              <span className="font-mono font-bold text-[#E86014] bg-orange-50 px-2 py-0.5 rounded border border-orange-200 tabular-nums">
                {timerStr}
              </span>
            </div>
          </div>

          {/* Nominal Box with Copy button */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 font-medium">Total Nominal Transfer</div>
              <div className="text-2xl font-black font-mono text-stone-900 mt-0.5 tabular-nums">
                {formatRupiah(totalAmount)}
              </div>
            </div>

            <button
              onClick={handleCopyAmount}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-stone-200 hover:border-stone-400 rounded-xl text-stone-700 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {copiedAmount ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Salin Angka</span>
                </>
              )}
            </button>
          </div>

          {/* Supported Apps */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <Smartphone className="w-3.5 h-3.5 text-[#E86014]" />
              <span>Dukungan Aplikasi Pembayaran:</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 leading-relaxed">
              BCA Mobile, Livin' by Mandiri, BRImo, BNI Mobile, GoPay, OVO, DANA, ShopeePay, LinkAja, AstraPay, dan seluruh m-Banking berlogo QRIS.
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2 text-xs text-stone-600">
            <div className="font-semibold text-stone-800">Petunjuk Pembayaran:</div>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Buka aplikasi m-Banking atau E-Wallet pilihan Anda.</li>
              <li>Pilih menu <strong>Scan / Bayar QRIS</strong>.</li>
              <li>Arahkan kamera ke kode QR di layar ini.</li>
              <li>Pastikan nama merchant tertera <strong>{QRIS_MERCHANT_NAME}</strong>.</li>
              <li>Selesaikan pembayaran dan klik tombol konfirmasi di bawah.</li>
            </ol>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#EBE3D7] flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            Batal / Kembali
          </button>

          <button
            onClick={onConfirmQrisPaid}
            className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Saya Sudah Bayar (Konfirmasi via WhatsApp)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
