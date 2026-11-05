// Official Retouched Photos from Attachments (No Prices on Tags/Stickers)
import imgNasiJenggo from '../assets/images/menu_nasi_jenggo_clean_1793875570042.jpg';
import imgBuburAyam from '../assets/images/menu_bubur_ayam_clean_1793875570888.jpg';
import imgNasiKrawu from '../assets/images/menu_nasi_krawu_clean_1793875570767.jpg';
import imgNasiUduk from '../assets/images/menu_nasi_uduk_box_clean_1793875592400.jpg';
import imgLontongSayur from '../assets/images/menu_lontong_sayur_clean_1793875593774.jpg';
import imgNasiGudeg from '../assets/images/menu_gudeg_krecek_clean_1793875594804.jpg';
import imgPecel from '../assets/images/menu_nasi_pecel_madiun_1793868951850.jpg';
import imgSopIga from '../assets/images/menu_sop_iga_1793868930506.jpg';

// Supporting Authentic Nusantara Photography
import imgCoto from '../assets/images/menu_coto_makassar_1793859285524.jpg';
import imgRendang from '../assets/images/menu_nasi_rendang_padang_1793859285836.jpg';
import imgRawon from '../assets/images/menu_rawon_surabaya_1793859287033.jpg';
import imgTehRempah from '../assets/images/menu_teh_rempah_pokak_1793859291866.jpg';

export const MENU_IMAGES: Record<string, string> = {
  // ==========================================
  // SARAPAN (06:00 - 10:00) — 7 MENU RESMI (100% Foto Asli Tanpa Harga)
  // ==========================================
  'sarapan-nj': imgNasiJenggo,     // Nasi Jenggo Bali
  'sarapan-ba': imgBuburAyam,      // Bubur Ayam Le'Paroan (Cianjur)
  'sarapan-nk': imgNasiKrawu,      // Nasi Krawu Gresik
  'sarapan-nu': imgNasiUduk,       // Nasi Uduk Betawi
  'sarapan-ls': imgLontongSayur,   // Lontong Sayur Medan
  'sarapan-ng': imgNasiGudeg,      // Nasi Gudeg Krecek Jogya
  'sarapan-np': imgPecel,          // Nasi Pecel Madiun

  // ==========================================
  // MAKAN SIANG (11:00 - 14:30) — 7 MENU
  // ==========================================
  'siang-sa': imgCoto,             // Soto Ayam Lamongan
  'siang-sm': imgCoto,             // Soto Madura Premium ★
  'siang-cm': imgRawon,            // Cwie Mie Malang
  'siang-np': imgRendang,          // Nasi Padang Rendang + Nangka
  'siang-si': imgSopIga,           // Sop Iga (Foto Resmi Retouched)
  'siang-aa': imgSopIga,           // Sop Iga fallback
  'siang-eg': imgCoto,             // Empal Gentong
  'siang-smie': imgRawon,          // Soto Mie

  // ==========================================
  // MAKAN MALAM (17:00 - 21:00) — 7 MENU
  // ==========================================
  'malam-bj': imgRawon,            // Bakmi Jawa Ayam Kampung
  'malam-tc': imgCoto,             // Tahu Campur Surabaya
  'malam-gk': imgRendang,          // Gulai Kacang Ijo Roti Maryam
  'malam-sb': imgCoto,             // Soto Betawi Premium ★
  'malam-nb': imgRendang,          // Nasi Babat Madura
  'malam-ng': imgNasiJenggo,       // Nasi Goreng Kampung
  'malam-tt': imgPecel,            // Tahu Tek / Ketoprak

  // Minuman Khas
  'teh-rempah': imgTehRempah,      // Teh Rempah
};
