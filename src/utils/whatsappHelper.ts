import { CartItem, OrderCustomerInfo } from '../types/order';
import { QRIS_MERCHANT_NAME, BRAND_NAME, BRAND_LOCATION, WHATSAPP_INTL } from '../data/menuData';
import { formatPhoneForWhatsApp } from '../data/affiliatorsData';
import { formatRupiah } from './qrisGenerator';

export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DLP-${dateStr}-${randomStr}`;
}

export function buildWhatsAppMessage(
  orderId: string,
  items: CartItem[],
  customer: OrderCustomerInfo,
  totalAmount: number,
  isQrisPaid: boolean = false
): string {
  const methodLabel = customer.method === 'delivery' 
    ? 'Siap Antar Bintaro & Sekitarnya (Delivery)' 
    : 'Ambil Sendiri di Dapur (Takeaway / Pickup)';

  // Build menu summary line for standard chat format: Nama Afiliator - Menu - Jam Antar
  const menuSummary = items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ');
  const jamAntar = customer.orderTime || 'Segera';
  const hasAfiliator = Boolean(customer.affiliatorName?.trim());
  const namaAfiliator = hasAfiliator ? customer.affiliatorName!.trim() : 'Dapur Pusat (Tanpa Afiliator)';

  const isH1 = customer.deliveryTiming === 'h-min-1';
  const layananText = isH1
    ? `⭐ PESAN ANTAR H-1 (Pre-order Besok${customer.deliveryDateH1 ? ` · ${customer.deliveryDateH1}` : ''})`
    : '🛵 Antar Hari Ini';

  const lines: string[] = [
    `*PESANAN MENU HARIAN - ${BRAND_NAME}*`,
    `📍 *${BRAND_LOCATION}* (Harga Kaki 5 • Penyajian Bintang 5)`,
    `No. Pesanan: *#${orderId}*`,
    `Waktu Pesan: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB`,
    ``,
    `*FORMAT CHAT:*`,
    `*${isH1 ? '[PESAN ANTAR H-1] ' : ''}${hasAfiliator ? `${namaAfiliator} - ` : ''}${menuSummary} - ${jamAntar}*`,
    ``,
    `*RINCIAN PEMESANAN:*`,
    `• *Layanan Waktu*: *${layananText}*`,
    `• *Kolom Afiliator*: *${hasAfiliator ? namaAfiliator : '(Dikosongkan)'}*`,
    `• *Nama Pemesan*: ${customer.name || '-'}`,
    `• *No. WhatsApp Pemesan*: ${customer.phone || '-'}`,
    `• *Jam Antar / Ambil*: ${jamAntar}`,
    `• *Metode*: ${methodLabel}`,
  ];

  if (customer.method === 'delivery') {
    lines.push(`• *Alamat Pengantaran*: ${customer.address || 'Area Bintaro'}`);
  }

  if (customer.additionalNotes) {
    lines.push(`• *Catatan Tambahan*: ${customer.additionalNotes}`);
  }

  lines.push(``);
  lines.push(`*DAFTAR MENU PESANAN (KOMPOSISI LENGKAP):*`);

  items.forEach((item, index) => {
    let title = `${index + 1}. [${item.item.code}] *${item.item.name}* (${item.item.priceDisplay})`;
    lines.push(title);
    lines.push(`   ${item.quantity}x @ ${formatRupiah(item.unitPrice)} = *${formatRupiah(item.unitPrice * item.quantity)}*`);
    if (item.customerNote) {
      lines.push(`   _Catatan: ${item.customerNote}_`);
    }
  });

  lines.push(``);
  lines.push(`*TOTAL PEMBAYARAN:* *${formatRupiah(totalAmount)}*`);
  lines.push(`Metode Pembayaran: *QRIS GoPay Merchant* (${isQrisPaid ? '✅ SUDAH SCAN & BAYAR QRIS' : '⏳ Menunggu Konfirmasi QRIS'})`);
  lines.push(`_Pembayaran hanya melalui QRIS — Aman & tercatat otomatis (${QRIS_MERCHANT_NAME})._`);
  lines.push(``);
  lines.push(`Halo Admin Dapur Le'Paroan, saya telah menyelesaikan konfirmasi pembayaran QRIS untuk pesanan #${orderId}. Mohon segera diproses. Terima kasih! 🙏🍛`);

  return lines.join('\n');
}

export function getWhatsAppUrl(message: string, rawPhone?: string): string {
  const targetPhone = rawPhone ? formatPhoneForWhatsApp(rawPhone) : WHATSAPP_INTL;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${targetPhone}?text=${encoded}`;
}
