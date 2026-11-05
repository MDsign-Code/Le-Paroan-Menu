import imgNasiUduk from '../assets/images/menu_nasi_uduk_betawi_1793868951244.jpg';
import imgPecel from '../assets/images/menu_nasi_pecel_madiun_1793868951850.jpg';
import imgSopIga from '../assets/images/menu_sop_iga_1793868930506.jpg';
import imgCoto from '../assets/images/menu_coto_makassar_1793859285524.jpg';
import imgRendang from '../assets/images/menu_nasi_rendang_padang_1793859285836.jpg';
import imgRawon from '../assets/images/menu_rawon_surabaya_1793859287033.jpg';
import imgJinggo from '../assets/images/menu_nasi_jinggo_bali_1793859288308.jpg';
import imgRameRame from '../assets/images/menu_paket_rame_rame_1793859288183.jpg';
import imgTehRempah from '../assets/images/menu_teh_rempah_pokak_1793859291866.jpg';

export const MENU_IMAGES: Record<string, string> = {
  // Sarapan (06:00 - 10:00) — 7 Menu
  'sarapan-nj': imgJinggo,     // Nasi Jenggo Bali
  'sarapan-ba': imgRawon,      // Bubur Ayam Le'Paroan
  'sarapan-nk': imgRendang,    // Nasi Krawu Gresik
  'sarapan-nu': imgNasiUduk,   // Nasi Uduk Betawi (Foto Resmi Retouched)
  'sarapan-ls': imgJinggo,     // Lontong Sayur Medan
  'sarapan-ng': imgRendang,    // Nasi Gudeg Krecek Jogya
  'sarapan-np': imgPecel,      // Nasi Pecel Madiun (Foto Resmi Retouched)

  // Makan Siang (11:00 - 14:30) — 7 Menu
  'siang-sa': imgCoto,         // Soto Ayam Lamongan
  'siang-sm': imgCoto,         // Soto Madura Premium ★
  'siang-cm': imgRawon,        // Cwie Mie Malang
  'siang-np': imgRendang,      // Nasi Padang Rendang + Nangka
  'siang-si': imgSopIga,       // Sop Iga (Foto Resmi Retouched)
  'siang-aa': imgSopIga,       // Sop Iga fallback
  'siang-eg': imgCoto,         // Empal Gentong
  'siang-smie': imgRawon,      // Soto Mie

  // Makan Malam (17:00 - 21:00) — 7 Menu
  'malam-bj': imgRawon,        // Bakmi Jawa Ayam Kampung
  'malam-tc': imgCoto,         // Tahu Campur Surabaya
  'malam-gk': imgRendang,      // Gulai Kacang Ijo Roti Maryam
  'malam-sb': imgCoto,         // Soto Betawi Premium ★
  'malam-nb': imgRendang,      // Nasi Babat Madura
  'malam-ng': imgJinggo,       // Nasi Goreng Kampung
  'malam-tt': imgPecel,        // Tahu Tek / Ketoprak

  // Minuman
  'teh-rempah': imgTehRempah,  // Teh Rempah
};
