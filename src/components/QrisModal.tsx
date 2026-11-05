import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ShieldCheck, Download, Smartphone, ArrowRight, ExternalLink, ZoomIn } from 'lucide-react';
import { formatRupiah } from '../utils/qrisGenerator';
import { QRIS_MERCHANT_NAME, QRIS_NMID, WHATSAPP_NUMBER } from '../data/menuData';
import qrisGopayImg from '../assets/qris_gopay.jpg';

interface QrisModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalAmount: number;
  onConfirmQrisPaid: () => void;
  affiliatorName?: string;
  affiliatorPhone?: string;
}

export const QrisModal: React.FC<QrisModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalAmount,
  onConfirmQrisPaid,
  affiliatorName,
  affiliatorPhone,
}) => {
  const [copiedAmount, setCopiedAmount] = useState<boolean>(false);
  const [copiedNmid, setCopiedNmid] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(900); // 15 mins
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setSecondsLeft(900);
      setIsZoomed(false);
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

  const handleCopyNmid = () => {
    navigator.clipboard.writeText(QRIS_NMID);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* GoPay Merchant & QRIS Top Header Banner */}
        <div className="bg-gradient-to-r from-[#00A5CF] via-[#008BB9] to-[#006E96] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="bg-white text-[#008BB9] px-2.5 py-1 rounded-lg font-black tracking-wider text-xs shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>gopay merchant</span>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-cyan-100 uppercase">
                QRIS Standar Nasional · GPN
              </div>
              <div className="text-xs sm:text-sm font-black text-white tracking-tight">
                Dapur Le'Paroan
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Merchant Verified Badge & Name */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-900 text-[10px] font-extrabold uppercase tracking-wider border border-cyan-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A5CF]" />
              <span>GOPAY MERCHANT RESMI</span>
              <span>·</span>
              <span>IKET IJO BINTARO</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight mt-1">
              {QRIS_MERCHANT_NAME}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500 font-mono">
              <button
                onClick={handleCopyNmid}
                className="inline-flex items-center gap-1 hover:text-stone-900 cursor-pointer"
                title="Klik untuk salin NMID"
              >
                <span>NMID: {QRIS_NMID}</span>
                {copiedNmid ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
              </button>
              <span>·</span>
              <span className="text-[#E86014] font-bold">Pesanan #{orderId}</span>
            </div>
          </div>

          {/* Official GoPay Merchant QRIS Card Image */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group p-2.5 bg-linear-to-b from-stone-50 to-white rounded-2xl border-2 border-stone-200 shadow-md max-w-[290px] sm:max-w-[320px]">
              
              <img
                src={qrisGopayImg}
                alt={`QRIS GoPay ${QRIS_MERCHANT_NAME}`}
                className="w-full h-auto rounded-xl object-contain border border-stone-100 cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                onClick={() => setIsZoomed(true)}
              />

              {/* Hover overlay hint */}
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-4 right-4 bg-stone-900/80 hover:bg-stone-900 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-xs shadow-md cursor-pointer transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Perbesar</span>
              </button>
            </div>

            {/* Quick Actions for QR Image */}
            <div className="mt-3 flex items-center gap-2">
              <a
                href={qrisGopayImg}
                download="QRIS_Gopay_LeParoan.jpg"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-300 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-stone-600" />
                <span>Simpan Gambar QRIS</span>
              </a>

              <span className="text-stone-300">|</span>

              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <span>Batas Waktu:</span>
                <span className="font-mono font-bold text-[#E86014] bg-orange-50 px-2 py-0.5 rounded border border-orange-200 tabular-nums">
                  {timerStr}
                </span>
              </div>
            </div>
          </div>

          {/* Total Nominal Transfer Box with Copy */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                Total Nominal Pembayaran
              </div>
              <div className="text-2xl font-black font-mono text-stone-900 mt-0.5 tabular-nums">
                {formatRupiah(totalAmount)}
              </div>
            </div>

            <button
              onClick={handleCopyAmount}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white border border-stone-200 hover:border-stone-400 rounded-xl text-stone-700 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {copiedAmount ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Salin Nominal</span>
                </>
              )}
            </button>
          </div>

          {/* Supported Apps List */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <Smartphone className="w-3.5 h-3.5 text-[#00A5CF]" />
              <span>Dapat Dibayar Menggunakan:</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] sm:text-xs text-stone-600 leading-relaxed">
              <strong>GoPay</strong>, BCA Mobile, Livin' by Mandiri, BNI Mobile, BRImo, OVO, DANA, ShopeePay, LinkAja, dan seluruh aplikasi m-Banking perbankan yang memiliki fitur scan QRIS.
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-2 text-xs text-stone-600 bg-stone-50/70 p-3.5 rounded-xl border border-stone-200">
            <div className="font-bold text-stone-800">Petunjuk Pembayaran:</div>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] sm:text-xs text-stone-600">
              <li>Buka aplikasi <strong>GoPay</strong>, m-Banking, atau E-Wallet Anda.</li>
              <li>Pilih menu <strong>Bayar / Scan QRIS</strong>.</li>
              <li>Scan kode QRIS di atas (atau unggah dari galeri jika disimpan).</li>
              <li>Pastikan nama merchant tertera: <strong>{QRIS_MERCHANT_NAME}</strong>.</li>
              <li>Masukkan nominal sesuai total yaitu <strong>{formatRupiah(totalAmount)}</strong> lalu selesaikan pembayaran.</li>
              <li>Klik tombol konfirmasi hijau di bawah untuk kirim bukti ke WhatsApp admin.</li>
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
            className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Saya Sudah Bayar via QRIS (Kirim ke WA {affiliatorName ? affiliatorName : 'Admin'})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Lightbox Zoom Modal for QRIS */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 bg-stone-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold font-mono">QRIS GOPAY MERCHANT</span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1 text-stone-300 hover:text-white rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={qrisGopayImg}
              alt="QRIS Fullscreen"
              className="w-full h-auto object-contain"
            />
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
              <a
                href={qrisGopayImg}
                download="QRIS_Gopay_LeParoan.jpg"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
              >
                <Download className="w-4 h-4" />
                <span>Download Gambar QRIS</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
