import imgNasiUduk from '../assets/images/menu_nasi_uduk_betawi_1793859283378.jpg';
import imgPecel from '../assets/images/menu_pecel_empal_madiun_1793859284131.jpg';
import imgCoto from '../assets/images/menu_coto_makassar_1793859285524.jpg';
import imgRendang from '../assets/images/menu_nasi_rendang_padang_1793859285836.jpg';
import imgRawon from '../assets/images/menu_rawon_surabaya_1793859287033.jpg';
import imgJinggo from '../assets/images/menu_nasi_jinggo_bali_1793859288308.jpg';
import imgRameRame from '../assets/images/menu_paket_rame_rame_1793859288183.jpg';
import imgTehRempah from '../assets/images/menu_teh_rempah_pokak_1793859291866.jpg';

export const MENU_IMAGES: Record<string, string> = {
  // Senin
  'senin-sarapan': imgNasiUduk,
  'senin-siang': imgPecel,
  'senin-malam': imgCoto,

  // Selasa
  'selasa-sarapan': imgRawon,
  'selasa-siang': imgRendang,
  'selasa-malam': imgJinggo,

  // Rabu
  'rabu-sarapan': imgJinggo,
  'rabu-siang': imgCoto,
  'rabu-malam': imgCoto,

  // Kamis
  'kamis-sarapan': imgNasiUduk,
  'kamis-siang': imgRendang,
  'kamis-malam': imgPecel,

  // Jumat
  'jumat-sarapan': imgNasiUduk,
  'jumat-siang': imgRawon,
  'jumat-malam': imgRawon,

  // Sabtu
  'sabtu-sarapan': imgJinggo,
  'sabtu-siang': imgCoto,
  'sabtu-malam': imgRendang,

  // Minggu & Minuman
  'minggu-paket': imgRameRame,
  'teh-rempah': imgTehRempah,
};
