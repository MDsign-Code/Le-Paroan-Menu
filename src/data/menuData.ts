export type MealTime = 'sarapan' | 'siang' | 'malam' | 'minuman';
export type PriceTier = 'standard' | 'special' | 'iga' | 'premium';

export interface MenuItem {
  id: string;
  code: string;
  name: string;
  subtitle?: string;
  mealTime: MealTime;
  mealLabel: string;
  price: number;
  priceDisplay: string;
  tier: PriceTier;
  tierLabel: string;
  isPremiumHighlight?: boolean;
  stockStatus: 'TERSEDIA' | 'HABIS';
  description: string;
  composition: string;
  packaging: string;
  badge?: string;
  tag: string;
}

export interface MealTimeInfo {
  key: MealTime;
  title: string;
  timeWindow: string;
  targetAudience: string;
  iconSymbol: string;
  menuCount: string;
}

export const MEAL_TIMES: MealTimeInfo[] = [
  {
    key: 'sarapan',
    title: 'Sarapan',
    timeWindow: '06:00 - 10:00 WIB',
    targetAudience: 'Gastronomi Pagi • Komuter & Rumah Tangga',
    iconSymbol: '🍚',
    menuCount: '07 Menu',
  },
  {
    key: 'siang',
    title: 'Makan Siang',
    timeWindow: '11:00 - 14:30 WIB',
    targetAudience: 'Pegawai • Rumah Tangga • Mahasiswa',
    iconSymbol: '🍜',
    menuCount: '07 Menu',
  },
  {
    key: 'malam',
    title: 'Makan Malam',
    timeWindow: '17:00 - 21:00 WIB',
    targetAudience: 'Rumah Tangga & Apartemen Bintaro',
    iconSymbol: '🌙',
    menuCount: '07 Menu',
  },
];

export const PRICE_TIERS = [
  { tier: '20K', name: 'STANDARD', range: 'Rp 20.000', desc: 'Sajian lengkap, hemat & berenergi prima' },
  { tier: '22-23K', name: 'SPECIAL', range: 'Rp 22.000 - Rp 23.000', desc: 'Racikan bumbu kampung & mie Nusantara khas' },
  { tier: '25K', name: 'IGA / PREM', range: 'Rp 25.000', desc: 'Olahan daging empuk, iga & santan pekat' },
  { tier: '28K', name: 'PREMIUM ★', range: 'Rp 28.000', desc: 'Soto Madura & Soto Betawi daging pilihan terbaik' },
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // SARAPAN (06:00 - 10:00) — 07 MENU
  // ==========================================
  {
    id: 'sarapan-nj',
    code: 'NJ',
    name: 'Nasi Jenggo Bali',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Nasi gurih harum beralas daun pisang dengan lauk sate lilit ikan tenggiri, suwir ayam betutu, kacang goreng, serundeng kelapa, dan sambal matah wangi kelapa.',
    composition: 'Nasi pulen • Sate lilit • Suwir ayam betutu • Serundeng • Sambal matah',
    packaging: 'Paper Bowl / Kemasan Daun Higienis',
    tag: 'Khas Bali',
  },
  {
    id: 'sarapan-ba',
    code: 'BA',
    name: "Bubur Ayam Le'Paroan",
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Bubur beras organik lembut berkuah kaldu kuning harum, suwiran ayam gurih berlimpah, cakwe renyah, kedelai goreng, kerupuk, dan taburan seledri bawang goreng.',
    composition: 'Bubur kaldu ayam • Ayam suwir • Cakwe • Kedelai • Kerupuk',
    packaging: 'Paper Bowl Tahan Panas Food-Grade',
    tag: 'Hotel Style',
  },
  {
    id: 'sarapan-nk',
    code: 'NK',
    name: 'Nasi Krawu Gresik',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Kuliner legendaris Gresik berupa nasi pulen hangat dengan suwiran daging sapi empuk bumbu gurih manis, serundeng krawu 2 warna (kuning & merah), serta sambal petis terasi pedas mantap.',
    composition: 'Nasi pulen • Suwir daging sapi • Serundeng merah-kuning • Sambal petis',
    packaging: 'Lunch Box / Paper Bowl Rapi',
    tag: 'Khas Gresik',
  },
  {
    id: 'sarapan-nu',
    code: 'NU',
    name: 'Nasi Uduk Betawi',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Nasi uduk gurih wangi pandan dan santan alami, disajikan dengan ayam suwir kecap bumbu rempah, orek tempe manis gurih, bihun goreng kampung, emping/kerupuk, dan sambal terasi matang.',
    composition: 'Nasi uduk santan • Ayam suwir • Orek tempe • Bihun goreng • Sambal terasi',
    packaging: 'Paper Bowl Komuter Praktis',
    tag: 'Favorit Pagi',
  },
  {
    id: 'sarapan-ls',
    code: 'LS',
    name: 'Lontong Sayur Medan',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Lontong padat lembut disiram gulai labu siam dan kacang panjang santan gurih kemerahan, dilengkapi bumbu tauco Medan autentik, sambal telur/kentang balado, dan kerupuk merah.',
    composition: 'Lontong pulen • Gulai labu siam santan • Tauco Medan • Telur/kentang balado',
    packaging: 'Paper Bowl Kuah Pisah',
    tag: 'Khas Medan',
  },
  {
    id: 'sarapan-ng',
    code: 'NG',
    name: 'Nasi Gudeg Krecek Jogya',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Gudeg nangka muda manis gurih legit khas Yogyakarta, sambal goreng krecek pedas gurih, ayam suwir berbumbu areh kental gurih, dan tahu bacem lembut meresap.',
    composition: 'Nasi putih • Gudeg nangka legit • Sambal goreng krecek • Ayam areh gurih • Tahu bacem',
    packaging: 'Lunch Box Higienis Sekat',
    tag: 'Khas Jogja',
  },
  {
    id: 'sarapan-np',
    code: 'NP',
    name: 'Nasi Pecel Madiun',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan Pagi',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Aneka sayuran rebus segar (kangkung, tauge, kacang panjang, kemangi) diguyur saus kacang tanah sangrai khas Madiun yang manis pedas gurih, dilengkapi tempe/tahu goreng dan peyek renyah.',
    composition: 'Sayuran rebus segar • Bumbu pecel siram Madiun • Tempe goreng • Rempeyek gurih',
    packaging: 'Lunch Box / Paper Bowl Bumbu Pisah',
    tag: 'Khas Madiun',
  },

  // ==========================================
  // MAKAN SIANG (11:00 - 14:30) — 07 MENU
  // ==========================================
  {
    id: 'siang-sa',
    code: 'SA',
    name: 'Soto Ayam Lamongan',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Soto ayam berkuah kuning keemasan kaya rempah kaldu ayam kampung, suwiran ayam melimpah, soun, kol, seledri, dilengkapi taburan koya gurih istimewa dan perasan jeruk nipis.',
    composition: 'Nasi • Suwir ayam kampung • Soun • Kuah kuning kaldu • Serbuk koya gurih',
    packaging: 'Paper Bowl Kuah Hangat Pisah',
    tag: 'Kuah Segar Koya',
  },
  {
    id: 'siang-sm',
    code: 'SM',
    name: 'Soto Madura Premium',
    subtitle: 'Potongan Daging Sapi Pilihan & Kuah Kaldu Pekat',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 28000,
    priceDisplay: '28K',
    tier: 'premium',
    tierLabel: '28K Premium ★',
    isPremiumHighlight: true,
    stockStatus: 'TERSEDIA',
    description: 'Sajian istimewa daging sapi lokal empuk berkuah bening kekuningan kaya kaldu rempah, telur rebus utuh, taburan bawang merah goreng harum, kentang, dan sambal jeruk nipis segar.',
    composition: 'Daging sapi lokal pilihan • Telur rebus • Nasi pulen • Kuah kaldu rempah Madura • Sambal nipis',
    packaging: 'Paper Bowl Double Wall Anti Bocor + Nasi',
    badge: '★ HARGA PREMIUM',
    tag: 'Premium Highlight',
  },
  {
    id: 'siang-cm',
    code: 'CM',
    name: 'Cwie Mie Malang',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 23000,
    priceDisplay: '23K',
    tier: 'special',
    tierLabel: '23K Special',
    stockStatus: 'TERSEDIA',
    description: 'Mie pipih kenyal lembut khas kota Malang dengan cincangan daging ayam gurih menyerupai abon halus, daun selada segar, pangsit goreng kriuk, bakso sapi, dan kuah kaldu siram terpisah.',
    composition: 'Mie lembut khas Malang • Ayam cincang gurih • Pangsit goreng kriuk • Bakso sapi • Kuah siram',
    packaging: 'Paper Bowl Kuah Terpisah',
    tag: 'Favorit Malang',
  },
  {
    id: 'siang-np',
    code: 'NP',
    name: 'Nasi Padang Rendang + Sayur Nangka',
    subtitle: 'Rendang Sapi Empuk + Sayur Nangka & Daun Singkong',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 23000,
    priceDisplay: '23K',
    tier: 'special',
    tierLabel: '23K Special',
    stockStatus: 'TERSEDIA',
    description: 'Rendang daging sapi santan pekat karamelisasi khas Minangkabau empuk meresap, disajikan dengan gulai sayur nangka muda, rebusan daun singkong segar, dan sambal ijo lado mudo.',
    composition: 'Nasi hangat • Rendang daging sapi karamel • Gulai nangka muda • Daun singkong • Sambal ijo',
    packaging: 'Lunch Box Kompartemen Sekat',
    tag: 'Rendang Minang',
  },
  {
    id: 'siang-si',
    code: 'SI',
    name: 'Sop Iga',
    subtitle: 'Iga Sapi Empuk dengan Sayuran Segar & Kuah Kaldu Rempah Hangat',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Potongan iga sapi pilihan empuk bermutu tinggi dengan kuah kaldu rempah bening gurih bertabur kembang kol, wortel, tomat merah, daun bawang, dan taburan bawang goreng renyah.',
    composition: 'Iga sapi empuk • Wortel & kembang kol • Tomat segar • Kuah kaldu rempah gurih • Nasi putih',
    packaging: 'Paper Bowl Food-Grade Tahan Panas + Nasi Daun Pisang',
    tag: 'Iga Sapi Pilihan',
  },
  {
    id: 'siang-eg',
    code: 'EG',
    name: 'Empal Gentong',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Kuliner legendaris Cirebon berupa irisan daging sapi empuk yang dimasak lambat dalam kuah santan kuning beraroma kunyit, cengkeh, dan kapulaga, disajikan dengan kucai segar dan bubuk cabai kering.',
    composition: 'Daging sapi empuk • Kuah santan kuning gentong tanah liat • Daun kucai • Bubuk cabai merah',
    packaging: 'Paper Bowl Kuah Hangat Terpisah',
    tag: 'Khas Cirebon',
  },
  {
    id: 'siang-smie',
    code: 'SM',
    name: 'Soto Mie',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Soto mie khas dengan perpaduan mie kuning lembut, bihun, potongan daging/kikil sapi kenyal gurih, risol renyah berisikan bihun, potongan kol, tomat, dan kuah kaldu sapi gurih kemerahan.',
    composition: 'Mie kuning & bihun • Potongan daging sapi • Risol goreng renyah • Kol & tomat • Kuah kaldu soto',
    packaging: 'Paper Bowl Kuah Terpisah',
    tag: 'Favorit Komplit',
  },

  // ==========================================
  // MAKAN MALAM (17:00 - 21:00) — 07 MENU
  // ==========================================
  {
    id: 'malam-bj',
    code: 'BJ',
    name: 'Bakmi Jawa Ayam Kampung',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 22000,
    priceDisplay: '22K',
    tier: 'special',
    tierLabel: '22K Special',
    stockStatus: 'TERSEDIA',
    description: 'Bakmi godhog/goreng racikan bumbu khas Jawa tradisional dengan suwiran ayam kampung gurih, telur bebek/ayam orak-arik, kubis segar, tomat, dan taburan bawang goreng renyah wangi.',
    composition: 'Bakmi kuning kenyal • Ayam kampung asli • Telur orak-arik • Sawi & kubis • Bumbu kemiri bawang',
    packaging: 'Paper Bowl / Lunch Box Hangat',
    tag: 'Ayam Kampung',
  },
  {
    id: 'malam-tc',
    code: 'TC',
    name: 'Tahu Campur Surabaya',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 23000,
    priceDisplay: '23K',
    tier: 'special',
    tierLabel: '23K Special',
    stockStatus: 'TERSEDIA',
    description: 'Kudapan malam khas Jawa Timur berisikan potongan tahu goreng, perkedel singkong lentho renyah, lontong, tauge, selada, daging/urat sapi kenyal, disiram kuah petis udang wangi berkaldu pekat.',
    composition: 'Tahu goreng • Lentho singkong kriuk • Daging sapi • Lontong • Kuah petis udang gurih',
    packaging: 'Paper Bowl Kuah Petis Terpisah',
    tag: 'Khas Surabaya',
  },
  {
    id: 'malam-gk',
    code: 'GK',
    name: 'Gulai Kacang Ijo Roti Maryam',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Gulai daging sapi berpadu kacang hijau lembut dalam kuah santan kaya rempah Timur Tengah Nusantara (kapulaga, adas, kayu manis), disajikan bersama roti maryam hangat berlapis mentega gurih.',
    composition: 'Gulai daging rempah pekat • Kacang ijo lembut • Roti maryam lembut berserat • Acar timun',
    packaging: 'Lunch Box Kompartemen Roti + Kuah Gulai',
    tag: 'Spesial Maryam',
  },
  {
    id: 'malam-sb',
    code: 'SB',
    name: 'Soto Betawi Premium',
    subtitle: 'Daging Sapi Empuk dengan Kuah Santan Susu Gurih',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 28000,
    priceDisplay: '28K',
    tier: 'premium',
    tierLabel: '28K Premium ★',
    isPremiumHighlight: true,
    stockStatus: 'TERSEDIA',
    description: 'Soto Betawi otentik berbahan daging sapi sandung lamur empuk dengan kuah santan berpadu susu yang gurih creamy, potongan kentang goreng, tomat segar, emping melinjo, dan acar timun.',
    composition: 'Daging sapi pilihan • Kuah santan susu gurih creamy • Nasi pulen • Emping melinjo • Sambal rawit',
    packaging: 'Paper Bowl Double Wall Anti Bocor + Nasi',
    badge: '★ HARGA PREMIUM',
    tag: 'Premium Highlight',
  },
  {
    id: 'malam-nb',
    code: 'NB',
    name: 'Nasi Babat Madura',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 22000,
    priceDisplay: '22K',
    tier: 'special',
    tierLabel: '22K Special',
    stockStatus: 'TERSEDIA',
    description: 'Nasi pulen hangat dengan lauk babat dan paru sapi goreng berbumbu rempah ketumbar gurih tajam, serundeng kelapa kuning yang harum renyah, lalapan segar, dan sambal korek pedas menggigit.',
    composition: 'Nasi hangat • Babat & paru goreng garing • Serundeng gurih • Lalapan • Sambal korek',
    packaging: 'Lunch Box Praktis Food-Grade',
    tag: 'Babat Garing',
  },
  {
    id: 'malam-ng',
    code: 'NG',
    name: 'Nasi Goreng Kampung',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Nasi goreng racikan bumbu kampung ulek bawang merah, terasi bakar, dan cabai rawit tanpa pewarna buatan, dilengkapi suwiran ayam, irisan telur dadar gurih, kerupuk, dan acar.',
    composition: 'Nasi goreng bumbu terasi • Ayam suwir • Telur dadar • Acar mentimun • Kerupuk',
    packaging: 'Paper Bowl / Lunch Box Praktis',
    tag: 'Klasik Hangat',
  },
  {
    id: 'malam-tt',
    code: 'TT',
    name: 'Tahu Tek / Ketoprak',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Perpaduan tahu goreng telur gurih renyah, ketupat/lontong pulen, bihun, tauge, disiram bumbu petis kacang bawang putih khas yang legit pekat berpadu kerupuk bawang merah.',
    composition: 'Tahu telur goreng • Ketupat/lontong • Bihun & tauge segar • Saus petis kacang • Kerupuk',
    packaging: 'Paper Bowl / Lunch Box Bumbu Pisah',
    tag: 'Saus Kacang Petis',
  },

  // ==========================================
  // MINUMAN KHAS
  // ==========================================
  {
    id: 'teh-rempah',
    code: 'TR',
    name: "Teh Rempah Le'Paroan",
    subtitle: 'Pilihan Varian: Rasa Serai Segar / Rasa Pokak Hangat',
    mealTime: 'minuman',
    mealLabel: 'Minuman Segar & Hangat',
    price: 5000,
    priceDisplay: '5K',
    tier: 'standard',
    tierLabel: 'Minuman Khas',
    stockStatus: 'TERSEDIA',
    description: 'Minuman seduh rempah alami khas Dapur Le\'Paroan. Tersedia varian Serai yang segar relaksasi atau varian Pokak khas rempah jahe kayu manis kapulaga yang menghangatkan tubuh.',
    composition: 'Seduhan teh melati • Serai alami / Rempah jahe pokak • Gula tebu asli',
    packaging: 'Sealed Cup 400ml (Dingin / Hangat)',
    tag: 'Minuman Rempah',
  },
];

export const BRAND_NAME = "DAPUR LE'PAROAN";
export const BRAND_LOCATION = "IKET IJO BINTARO";
export const BRAND_TAGLINE = "HARGA KAKI 5 • PENYAJIAN BINTANG 5";
export const BRAND_DELIVERY_AREA = "Siap antar Bintaro & sekitarnya";

export const WHATSAPP_NUMBER = '085964245547';
export const WHATSAPP_INTL = '6285964245547';
export const QRIS_MERCHANT_NAME = "LE PAROAN, DIGITAL & KREA";
export const QRIS_NMID = "ID1025448265336";
export const QR_SUBDOMAIN = 'form.dapurleparoan.id';
