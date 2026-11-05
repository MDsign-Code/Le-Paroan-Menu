import { CartItem, OrderCustomerInfo } from '../types/order';
import { WHATSAPP_INTL, QRIS_MERCHANT_NAME, BRAND_NAME, BRAND_LOCATION } from '../data/menuData';
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

  const lines: string[] = [
    `*PESANAN MENU HARIAN - ${BRAND_NAME}*`,
    `📍 *${BRAND_LOCATION}* (Harga Kaki 5 • Penyajian Bintang 5)`,
    `No. Pesanan: *#${orderId}*`,
    `Waktu Pesan: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB`,
    ``,
    `*FORMAT CHAT PEMESANAN:*`,
    `• *Nama Pemesan*: ${customer.name || '-'}`,
    `• *Agen / Afiliator*: ${customer.affiliatorName ? customer.affiliatorName : 'Langsung (Tanpa Afiliator)'}`,
    `• *No. WhatsApp*: ${customer.phone || '-'}`,
    `• *Jam Antar / Ambil*: ${customer.orderTime || 'Segera / Sesuai Jadwal'}`,
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
  lines.push(`Metode Pembayaran: *QRIS* (${isQrisPaid ? '✅ SUDAH SCAN & BAYAR QRIS' : '⏳ Menunggu Konfirmasi QRIS'})`);
  lines.push(`_Pembayaran hanya melalui QRIS — Aman, tercatat otomatis & Xendit Verified._`);
  lines.push(``);
  lines.push(`Halo Admin Dapur Le\'Paroan Iket Ijo Bintaro, mohon pesanan segera diproses. Terima kasih! 🙏🍛`);

  return lines.join('\n');
}

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_INTL}?text=${encoded}`;
}
