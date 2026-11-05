import { CartItem, OrderCustomerInfo } from '../types/order';
import { WHATSAPP_INTL, QRIS_MERCHANT_NAME } from '../data/menuData';
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
  const methodLabel = customer.method === 'delivery' ? 'Antar ke Alamat (Delivery)' : 'Ambil Sendiri (Takeaway / Pickup)';
  const paymentLabel = customer.paymentMethod === 'qris' 
    ? `QRIS (${QRIS_MERCHANT_NAME}) - ${isQrisPaid ? '✅ Sudah Scan & Bayar' : '⏳ Segera Konfirmasi QRIS'}` 
    : 'Tunai / Bayar di Tempat (COD)';

  const lines: string[] = [
    `*PESANAN BARU - DAPUR LE\'PAROAN*`,
    `ID Pesanan: *#${orderId}*`,
    `Waktu Pesan: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB`,
    ``,
    `*DATA PEMESAN:*`,
    `• Nama: ${customer.name || '-'}`,
    `• No. Telepon: ${customer.phone || '-'}`,
    `• Metode: ${methodLabel}`,
  ];

  if (customer.method === 'delivery') {
    lines.push(`• Alamat Pengiriman: ${customer.address || '-'}`);
  }

  if (customer.orderTime) {
    lines.push(`• Rencana Jam Makan / Ambil: ${customer.orderTime}`);
  }

  if (customer.additionalNotes) {
    lines.push(`• Catatan Khusus: ${customer.additionalNotes}`);
  }

  lines.push(``);
  lines.push(`*DAFTAR MENU PESANAN:*`);

  items.forEach((item, index) => {
    let title = `${index + 1}. *${item.item.name}*`;
    if (item.selectedVariant) {
      title += ` (${item.selectedVariant})`;
    }
    if (item.selectedOption) {
      title += ` [${item.selectedOption}]`;
    }
    lines.push(title);
    lines.push(`   ${item.quantity}x @ ${formatRupiah(item.unitPrice)} = *${formatRupiah(item.unitPrice * item.quantity)}*`);
    if (item.customerNote) {
      lines.push(`   _Catatan: ${item.customerNote}_`);
    }
  });

  // Calculate cashback if Friday items exist
  const fridayItemCount = items.filter(i => i.item.day === 'jumat').reduce((acc, i) => acc + i.quantity, 0);
  if (fridayItemCount > 0) {
    lines.push(``);
    lines.push(`✨ *Jumat Berkah:* Alokasi infak berbagi Rp${(fridayItemCount * 500).toLocaleString('id-ID')} (${fridayItemCount} porsi x Rp500)`);
  }

  lines.push(``);
  lines.push(`*TOTAL PEMBAYARAN:* *${formatRupiah(totalAmount)}*`);
  lines.push(`Metode Bayar: ${paymentLabel}`);
  lines.push(``);
  lines.push(`Halo Admin Dapur Le\'Paroan, saya ingin mengonfirmasi pesanan ini. Mohon diproses ya. Terima kasih! 🙏🍛`);

  return lines.join('\n');
}

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_INTL}?text=${encoded}`;
}
