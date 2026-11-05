export type DayOfWeek = 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu' | 'minggu';
export type MealType = 'sarapan' | 'siang' | 'malam' | 'minuman' | 'paket';

export interface MenuItem {
  id: string;
  name: string;
  day: DayOfWeek;
  dayLabel: string;
  mealType: MealType;
  mealLabel: string;
  price: number;
  priceDisplay: string;
  hasVariants?: boolean;
  variants?: { name: string; price: number }[];
  options?: { title: string; choices: string[] };
  description: string;
  highlights?: string[];
  packaging: string;
  nutrition: {
    karbo: number;
    protein: number;
    sayur: number;
    notes: string;
  };
  cashbackNote?: string;
  badge?: string;
  tag: string;
  imageUrl?: string;
}

export interface DayInfo {
  key: DayOfWeek;
  label: string;
  shortLabel: string;
  subtitle: string;
}

export const DAYS_INFO: DayInfo[] = [
  { key: 'senin', label: 'Senin', shortLabel: 'Sen', subtitle: 'Awal pekan penuh energi' },
  { key: 'selasa', label: 'Selasa', shortLabel: 'Sel', subtitle: 'Fokus & semangat berkarya' },
  { key: 'rabu', label: 'Rabu', shortLabel: 'Rab', subtitle: 'Cita rasa khas kepulauan' },
  { key: 'kamis', label: 'Kamis', shortLabel: 'Kam', subtitle: 'Menu kaya bumbu & protein' },
  { key: 'jumat', label: 'Jumat', shortLabel: 'Jum', subtitle: 'Jumat Berkah berbagi rezeki' },
  { key: 'sabtu', label: 'Sabtu', shortLabel: 'Sab', subtitle: 'Santai akhir pekan nikmat' },
  { key: 'minggu', label: 'Minggu', shortLabel: 'Min', subtitle: 'Paket spesial rame-rame' },
];

export const NUTRITION_GUIDELINES = [
  {
    meal: 'Sarapan',
    time: '06.30 - 10.00 WIB',
    karbo: 60,
    protein: 20,
    sayur: 20,
    char: 'Tidak pedas dan tidak berminyak berlebihan, memberikan energi prima di awal hari.',
  },
  {
    meal: 'Makan Siang',
    time: '11.30 - 14.30 WIB',
    karbo: 50,
    protein: 30,
    sayur: 20,
    char: 'Lebih mengenyangkan; porsi protein tinggi, sambal disajikan terpisah.',
  },
  {
    meal: 'Makan Malam',
    time: '17.30 - 21.00 WIB',
    karbo: 40,
    protein: 30,
    sayur: 30,
    char: 'Lebih ringan dan berkuah hangat agar nyaman dicerna menjelang istirahat.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SENIN ---
  {
    id: 'senin-sarapan',
    name: 'Nasi Uduk Betawi + Ayam Suwir',
    day: 'senin',
    dayLabel: 'Senin',
    mealType: 'sarapan',
    mealLabel: 'Sarapan',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Nasi uduk gurih wangi pandan dan santan, disajikan bersama suwiran ayam berbumbu lezat, bihun goreng, tempe orek, dan sambal terpisah.',
    highlights: ['Praktis untuk komuter yang butuh sarapan cepat', 'Rasa gurih seimbang & harum santan'],
    packaging: 'Paper Bowl Praktis Ramah Lingkungan',
    nutrition: {
      karbo: 60,
      protein: 20,
      sayur: 20,
      notes: 'Tidak pedas dan tidak berminyak berlebihan.',
    },
    tag: 'Komuter Cepat',
  },
  {
    id: 'senin-siang',
    name: 'Nasi Pecel Madiun + Empal Gepuk',
    day: 'senin',
    dayLabel: 'Senin',
    mealType: 'siang',
    mealLabel: 'Makan Siang',
    price: 20000,
    priceDisplay: 'Reguler Rp20.000 / Premium Rp25.000',
    hasVariants: true,
    variants: [
      { name: 'Porsi Reguler (Empal Standar)', price: 20000 },
      { name: 'Porsi Premium (Empal Gepuk Jumbo)', price: 25000 },
    ],
    description: 'Sayuran rebus segar bernutrisi tinggi dengan guyuran bumbu siram pecel Madiun khas legit gurih berpadu dengan empal gepuk empuk meresap.',
    highlights: ['Disajikan dengan bumbu siram terpisah', 'Empal gepuk daging sapi empuk'],
    packaging: 'Lunch Box Higienis Sekat Terpisah',
    nutrition: {
      karbo: 50,
      protein: 30,
      sayur: 20,
      notes: 'Mengenyangkan dengan bumbu siram kacang gurih terpisah.',
    },
    tag: 'Menu Favorit',
  },
  {
    id: 'senin-malam',
    name: 'Sop Iga + Nasi + Sambal Kecap + Jeruk Nipis',
    day: 'senin',
    dayLabel: 'Senin',
    mealType: 'malam',
    mealLabel: 'Makan Malam',
    price: 25000,
    priceDisplay: 'Rp25.000',
    description: 'Sop iga sapi berkuah bening kaya rempah kapulaga, cengkeh, dan kayu manis, disajikan hangat lengkap dengan potongan wortel, kentang, dan sambal kecap pedas segar.',
    highlights: ['Hangat, ringan, dan berkuah untuk 1 porsi', 'Menenangkan dan melegakan tenggorokan'],
    packaging: 'Paper Bowl Tahan Panas + Nasi Pisah',
    nutrition: {
      karbo: 40,
      protein: 30,
      sayur: 30,
      notes: 'Lebih ringan dan berkuah agar nyaman dinikmati.',
    },
    tag: 'Kuah Hangat',
  },

  // --- SELASA ---
  {
    id: 'selasa-sarapan',
    name: 'Bubur Ayam Buffet Hotel *5 Komplit',
    day: 'selasa',
    dayLabel: 'Selasa',
    mealType: 'sarapan',
    mealLabel: 'Sarapan',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Bubur lembut beras organik dengan kuah kaldu kuning harum, taburan ayam suwir premium, cakwe empuk, kedelai goreng renyah, kerupuk, dan telur.',
    highlights: ['Sarapan komplet dengan gaya sajian hotel bintang lima', 'Tekstur bubur lembut gurih alami'],
    packaging: 'Paper Bowl Praktis Seal Rapat',
    nutrition: {
      karbo: 60,
      protein: 20,
      sayur: 20,
      notes: 'Sajian lembut dan ramah pencernaan di pagi hari.',
    },
    tag: 'Hotel Style',
  },
  {
    id: 'selasa-siang',
    name: 'Nasi / Bubur Gudeg Krecek + Ayam Suwir + ½ Telur + Tahu Bacem',
    day: 'selasa',
    dayLabel: 'Selasa',
    mealType: 'siang',
    mealLabel: 'Makan Siang',
    price: 25000,
    priceDisplay: 'Rp25.000',
    options: {
      title: 'Pilihan Karbohidrat',
      choices: ['Nasi Putih Hangat', 'Bubur Gurih Halus'],
    },
    description: 'Sajian gudeg nangka muda manis gurih khas Jogja, sambal krecek pedas gurih, ayam suwir berbumbu areh kental, setengah telur pindang, dan tahu bacem lembut.',
    highlights: ['Premium dengan areh kental siram', 'Cocok untuk makan siang di kantor'],
    packaging: 'Lunch Box Kompartemen Rapi',
    nutrition: {
      karbo: 50,
      protein: 30,
      sayur: 20,
      notes: 'Pilihan areh siram gurih mantap.',
    },
    tag: 'Menu Kantor',
  },
  {
    id: 'selasa-malam',
    name: 'Nasi Goreng Kampung + Suwir Ayam Kampung + Irisan Telur',
    day: 'selasa',
    dayLabel: 'Selasa',
    mealType: 'malam',
    mealLabel: 'Makan Malam',
    price: 20000,
    priceDisplay: 'Reguler Rp20.000',
    description: 'Nasi goreng racikan bumbu kampung tradisional tanpa MSG berlebih, wangi bawang merah cabai ulek dengan suwiran ayam kampung gurih dan irisan telur dadar.',
    highlights: ['Pilihan makan malam yang ringan dan nikmat', 'Ayam kampung asli gurih alami'],
    packaging: 'Paper Bowl / Lunch Box Ringkas',
    nutrition: {
      karbo: 40,
      protein: 30,
      sayur: 30,
      notes: 'Tidak enek, ringan, dan pas untuk santap malam.',
    },
    tag: 'Klasik Nusantara',
  },

  // --- RABU ---
  {
    id: 'rabu-sarapan',
    name: 'Lontong Sayur Medan',
    day: 'rabu',
    dayLabel: 'Rabu',
    mealType: 'sarapan',
    mealLabel: 'Sarapan',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Lontong pulen disiram gulai labu siam dan kacang panjang santan gurih kemerahan, dilengkapi tauco Medan yang khas, mie balado, dan telur rebus.',
    highlights: ['Menu sarapan khas dengan cita rasa Nusantara', 'Aroma tauco Medan autentik'],
    packaging: 'Paper Bowl Anti Rembes',
    nutrition: {
      karbo: 60,
      protein: 20,
      sayur: 20,
      notes: 'Kaya rempah dan gurih berselera.',
    },
    tag: 'Khas Medan',
  },
  {
    id: 'rabu-siang',
    name: 'Coto Makassar + Ketupat / Buras + Sambal Tauco',
    day: 'rabu',
    dayLabel: 'Rabu',
    mealType: 'siang',
    mealLabel: 'Makan Siang',
    price: 25000,
    priceDisplay: 'Rp25.000',
    options: {
      title: 'Pilihan Pendamping',
      choices: ['Ketupat Tradisional', 'Buras Gurih Santan'],
    },
    description: 'Potongan daging sapi empuk berpadu kuah coto gurih berbahan dasar kacang tanah sangrai dan rempah khas Sulawesi Selatan, disajikan lengkap dengan sambal tauco dan jeruk nipis.',
    highlights: ['Premium. Sajian kaya rasa untuk dinikmati bersama', 'Kuah kacang sangrai beraroma kuat'],
    packaging: 'Paper Bowl Kuah Coto Terpisah',
    nutrition: {
      karbo: 50,
      protein: 30,
      sayur: 20,
      notes: 'Tinggi protein daging sapi lokal empuk.',
    },
    tag: 'Kuliner Legendaris',
  },
  {
    id: 'rabu-malam',
    name: 'Sop Konro Makassar',
    day: 'rabu',
    dayLabel: 'Rabu',
    mealType: 'malam',
    mealLabel: 'Makan Malam',
    price: 28000,
    priceDisplay: 'Rp28.000',
    description: 'Iga sapi empuk bertabur bawang goreng dalam kuah cokelat pekat khas rempah kluwek, kayu manis, dan cengkeh. Sangat lezat diseruput hangat.',
    highlights: ['Premium. Hangat, berkuah, dan nyaman untuk malam hari', 'Iga berdaging tebal'],
    packaging: 'Paper Bowl Tahan Panas + Nasi',
    nutrition: {
      karbo: 40,
      protein: 30,
      sayur: 30,
      notes: 'Sangat menghangatkan tubuh di malam hari.',
    },
    tag: 'Spesial Iga',
  },

  // --- KAMIS ---
  {
    id: 'kamis-sarapan',
    name: 'Nasi Kuning Komplit',
    day: 'kamis',
    dayLabel: 'Kamis',
    mealType: 'sarapan',
    mealLabel: 'Sarapan',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Nasi kuning wangi kunyit segar dan daun salam, lauk ayam suwir bumbu rujak, irisan telur dadar halus, orek tempe garing manis, timun, dan sambal terasi matang.',
    highlights: ['Pilihan sarapan untuk anak sekolah, mahasiswa & pekerja', 'Warna cerah selera makan tinggi'],
    packaging: 'Lunch Box Praktis',
    nutrition: {
      karbo: 60,
      protein: 20,
      sayur: 20,
      notes: 'Porsi pas mengenyangkan hingga siang.',
    },
    tag: 'Komplit Murah',
  },
  {
    id: 'kamis-siang',
    name: 'Nasi Rendang Padang + Daun Singkong + Sayur Nangka + Sambal Cabai Hijau',
    day: 'kamis',
    dayLabel: 'Kamis',
    mealType: 'siang',
    mealLabel: 'Makan Siang',
    price: 25000,
    priceDisplay: 'Rp25.000',
    description: 'Rendang daging sapi santan pekat karamelisasi khas Minangkabau, daun singkong rebus lembut, gulai nangka muda, dan sambal ijo lado mudo gurih pedas.',
    highlights: ['Premium. Porsi mengenyangkan dengan lauk kaya protein', 'Bumbu rendang meresap ke serat daging'],
    packaging: 'Lunch Box Sekat Terpisah',
    nutrition: {
      karbo: 50,
      protein: 30,
      sayur: 20,
      notes: 'Mengenyangkan dengan lauk kaya protein tinggi.',
    },
    tag: 'Rendang Padang',
  },
  {
    id: 'kamis-malam',
    name: 'Ketoprak Telur + Bumbu Siram',
    day: 'kamis',
    dayLabel: 'Kamis',
    mealType: 'malam',
    mealLabel: 'Makan Malam',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Perpaduan ketupat lembut, tahu goreng renyah, bihun, tauge segar, telur goreng, disiram saus kacang bawang putih kental gurih manis dengan kerupuk merah.',
    highlights: ['Pilihan berbasis sayuran untuk makan malam lebih ringan', 'Bumbu kacang diulek segar'],
    packaging: 'Paper Bowl / Lunch Box Bumbu Siram Pisah',
    nutrition: {
      karbo: 40,
      protein: 30,
      sayur: 30,
      notes: 'Ringan, sehat berbasis sayur dan protein nabati.',
    },
    tag: 'Vegetable Plant-Based',
  },

  // --- JUMAT ---
  {
    id: 'jumat-sarapan',
    name: 'Nasi Liwet Solo + Opor Ayam Suwir + Tahu + Krecek + ½ Telur',
    day: 'jumat',
    dayLabel: 'Jumat',
    mealType: 'sarapan',
    mealLabel: 'Sarapan',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Nasi gurih masak santan khas Solo beraroma serai dan daun salam, disajikan dengan suwir opor ayam empuk, tahu bacem, sambal goreng krecek pedas, dan separuh telur pindang.',
    highlights: ['Jumat Berkah: alokasi cashback Rp500 per porsi untuk dana berbagi', 'Cita rasa gurih manis Solo yang ngangenin'],
    packaging: 'Lunch Box Daun Pisang Higienis',
    nutrition: {
      karbo: 60,
      protein: 20,
      sayur: 20,
      notes: 'Keseimbangan gizi sarapan santai.',
    },
    cashbackNote: 'Alokasi Cashback Rp500/porsi dialokasikan untuk program sosial Jumat Berkah (target Rp250.000/hari)',
    badge: 'Program Berkah',
    tag: 'Jumat Berkah',
  },
  {
    id: 'jumat-siang',
    name: 'Cwie Mie Malang + Bakso + Pangsit + Kuah Siram + Saus',
    day: 'jumat',
    dayLabel: 'Jumat',
    mealType: 'siang',
    mealLabel: 'Makan Siang',
    price: 23000,
    priceDisplay: 'Rp23.000',
    description: 'Mie tipis lembut khas kota Malang dengan taburan ayam cincang gurih menyerupai abon halus, daun selada segar, bakso sapi kenyal, pangsit goreng renyah, serta kuah kaldu siram terpisah.',
    highlights: ['Premium. Sajian mie dengan pelengkap yang komplet', 'Pangsit goreng kriuk gurih'],
    packaging: 'Paper Bowl + Kuah Terpisah',
    nutrition: {
      karbo: 50,
      protein: 30,
      sayur: 20,
      notes: 'Komposisi mie komplet dengan protein bakso & ayam.',
    },
    tag: 'Favorit Komplet',
  },
  {
    id: 'jumat-malam',
    name: 'Rawon Surabaya + Bergedel Daging + Telur Asin + Sambal Terasi',
    day: 'jumat',
    dayLabel: 'Jumat',
    mealType: 'malam',
    mealLabel: 'Makan Malam',
    price: 28000,
    priceDisplay: 'Rp28.000',
    description: 'Rawon daging sapi kuah hitam kluwek khas Jawa Timur, bergedel kentang daging lembut, separuh telur asin masir, tauge pendek segar, dan sambal terasi pedas mantap.',
    highlights: ['Premium. Kuah hitam gurih dengan pelengkap khas', 'Daging sapi sandung lamur empuk'],
    packaging: 'Lunch Box & Paper Bowl Kuah Pisah',
    nutrition: {
      karbo: 40,
      protein: 30,
      sayur: 30,
      notes: 'Kuah kluwek berkhasiat antioksidan & kaya rasa.',
    },
    tag: 'Menu Juara',
  },

  // --- SABTU ---
  {
    id: 'sabtu-sarapan',
    name: 'Nasi Jinggo Bali + Sate Lilit + Sambal Matah',
    day: 'sabtu',
    dayLabel: 'Sabtu',
    mealType: 'sarapan',
    mealLabel: 'Sarapan',
    price: 20000,
    priceDisplay: 'Rp20.000',
    description: 'Nasi pulen dengan sate lilit ikan tenggiri berbumbu base genep Bali, suwir ayam betutu, kacang tanah goreng, serundeng manis, dan sambal matah harum minyak kelapa.',
    highlights: ['Menu santai untuk memulai hari libur akhir pekan', 'Sate lilit rempah wangi'],
    packaging: 'Kemasan Daun / Lunch Box',
    nutrition: {
      karbo: 60,
      protein: 20,
      sayur: 20,
      notes: 'Segar dan memacu energi di akhir pekan.',
    },
    tag: 'Spesial Bali',
  },
  {
    id: 'sabtu-siang',
    name: 'Soto Daging Madura + Telur + Nasi + Sambal Jeruk Nipis',
    day: 'sabtu',
    dayLabel: 'Sabtu',
    mealType: 'siang',
    mealLabel: 'Makan Siang',
    price: 28000,
    priceDisplay: 'Rp28.000',
    description: 'Soto daging sapi kuah bening kekuningan kaya kaldu rempah, potongan daging sapi empuk, telur rebus, irisan seledri dan daun bawang, disajikan bersama nasi pulen dan jeruk nipis.',
    highlights: ['Premium. Soto hangat dengan cita rasa segar', 'Kuah kaldu sapi pekat gurih alami'],
    packaging: 'Paper Bowl Kuah Hangat Terpisah',
    nutrition: {
      karbo: 50,
      protein: 30,
      sayur: 20,
      notes: 'Kuah segar penyemangat siang hari.',
    },
    tag: 'Soto Segar',
  },
  {
    id: 'sabtu-malam',
    name: 'Nasi Madura + Babat + Paru + Hati + Usus Goreng + Sambal Korek',
    day: 'sabtu',
    dayLabel: 'Sabtu',
    mealType: 'malam',
    mealLabel: 'Makan Malam',
    price: 23000,
    priceDisplay: 'Rp23.000',
    description: 'Nasi pulen bertabur serundeng kelapa kuning dengan lauk aneka jeroan gurih goreng garing (babat, paru, hati, usus) yang dibumbui rempah tajam, dilengkapi sambal korek pedas nampol.',
    highlights: ['Premium. Sajian kaya lauk untuk malam Minggu', 'Gorengan garing bumbu rempah Madura'],
    packaging: 'Lunch Box Praktis',
    nutrition: {
      karbo: 40,
      protein: 30,
      sayur: 30,
      notes: 'Lauk gurih kaya tekstur untuk santap malam.',
    },
    tag: 'Malam Minggu',
  },

  // --- MINGGU / PAKET & MINUMAN ---
  {
    id: 'minggu-paket',
    name: 'Paket Spesial Rame-Rame (Untuk 5 Orang)',
    day: 'minggu',
    dayLabel: 'Minggu',
    mealType: 'paket',
    mealLabel: 'Paket Spesial',
    price: 110000,
    priceDisplay: 'Rp110.000 (Porsi 5 Orang)',
    description: 'Dirancang untuk dinikmati bersama keluarga tercinta, teman kumpul, atau rekan kerja. Sajian aneka lauk Nusantara pilihan lengkap dengan nasi, sayur berimbang, dan aneka sambal.',
    highlights: ['Porsi melimpah pas untuk 5 orang', 'Menu & lauk dapat dikustomisasi langsung ke Dapur Le\'Paroan'],
    packaging: '5 Set Lunch Box / Paket Family Box Ringkas',
    nutrition: {
      karbo: 45,
      protein: 30,
      sayur: 25,
      notes: 'Komposisi seimbang untuk dinikmati ramai-ramai.',
    },
    badge: 'Paket Hemat Keluarga',
    tag: 'Family Pack',
  },
  {
    id: 'teh-rempah',
    name: 'Teh Rempah Le\'Paroan',
    day: 'senin',
    dayLabel: 'Setiap Hari',
    mealType: 'minuman',
    mealLabel: 'Minuman Khas',
    price: 5000,
    priceDisplay: 'Rp5.000',
    options: {
      title: 'Pilihan Varian Rasa',
      choices: ['Rasa Serai (Wangi Segar Relaksasi)', 'Rasa Pokak (Hangat Jahe & Rempah Nusantara)'],
    },
    description: 'Minuman teh seduh racikan rempah khas Nusantara dari Dapur Le\'Paroan. Tersedia varian Serai yang segar relaksasi atau varian Pokak khas rempah hangat melegakan tubuh.',
    highlights: ['Racikan rempah alami 100% tanpa pengawet', 'Bisa disajikan hangat atau dengan es batu segar'],
    packaging: 'Sealed Beverage Cup 400ml',
    nutrition: {
      karbo: 10,
      protein: 0,
      sayur: 90,
      notes: 'Minuman herbal rempah alami menyehatkan metabolisme.',
    },
    tag: 'Minuman Rempah',
  },
];

export const WHATSAPP_NUMBER = '085964245547';
export const WHATSAPP_INTL = '6285964245547';
export const QRIS_MERCHANT_NAME = "DAPUR LE'PAROAN";
export const QRIS_NMID = 'ID1023285942455';
