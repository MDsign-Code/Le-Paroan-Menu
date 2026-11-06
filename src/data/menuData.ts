export type MealTime = 'sarapan' | 'siang' | 'malam' | 'minuman';
export type PriceTier = 'standard' | 'special' | 'iga' | 'premium';
export type DayKey = 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu' | 'minggu' | 'semua';

export interface MenuItem {
  id: string;
  code: string;
  name: string;
  subtitle?: string;
  mealTime: MealTime;
  mealLabel: string;
  dayKey: DayKey;
  dayName: string;
  deliverySlot: string;
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

export interface DayScheduleMeal {
  mealTime: MealTime;
  mealLabel: string;
  deliveryTime: string;
  headerLabel: string;
  itemId: string;
}

export interface DaySchedule {
  key: DayKey;
  name: string;
  tagline: string;
  meals: DayScheduleMeal[];
}

export const DAYS_SCHEDULE: DaySchedule[] = [
  {
    key: 'senin',
    name: 'Senin',
    tagline: 'Jadwal Hari Senin',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-nj' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-sa' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-bj' },
    ],
  },
  {
    key: 'selasa',
    name: 'Selasa',
    tagline: 'Jadwal Hari Selasa',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-ba' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-sm' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-tc' },
    ],
  },
  {
    key: 'rabu',
    name: 'Rabu',
    tagline: 'Jadwal Hari Rabu',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-nk' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-cm' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-gk' },
    ],
  },
  {
    key: 'kamis',
    name: 'Kamis',
    tagline: 'Jadwal Hari Kamis',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-nu' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-np' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-sb' },
    ],
  },
  {
    key: 'jumat',
    name: 'Jumat',
    tagline: 'Jadwal Hari Jumat',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-ls' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-aa' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-nb' },
    ],
  },
  {
    key: 'sabtu',
    name: 'Sabtu',
    tagline: 'Jadwal Hari Sabtu',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-ng' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-eg' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-ng' },
    ],
  },
  {
    key: 'minggu',
    name: 'Minggu',
    tagline: 'Jadwal Hari Minggu',
    meals: [
      { mealTime: 'sarapan', mealLabel: 'Sarapan', deliveryTime: '(5-7) terkirim', headerLabel: 'Sarapan (5-7) terkirim', itemId: 'sarapan-np' },
      { mealTime: 'siang', mealLabel: 'Makan Siang', deliveryTime: '(11-13) terkirim', headerLabel: 'Makan Siang (11-13) terkirim', itemId: 'siang-smie' },
      { mealTime: 'malam', mealLabel: 'Makan Malam', deliveryTime: '(17-19) terkirim', headerLabel: 'Makan Malam (17-19) terkirim', itemId: 'malam-tt' },
    ],
  },
];

export const DAYS_LIST: { key: DayKey | 'all'; name: string; short: string }[] = [
  { key: 'all', name: 'Semua Hari (Senin – Minggu)', short: 'Semua' },
  { key: 'senin', name: 'Senin', short: 'Sen' },
  { key: 'selasa', name: 'Selasa', short: 'Sel' },
  { key: 'rabu', name: 'Rabu', short: 'Rab' },
  { key: 'kamis', name: 'Kamis', short: 'Kam' },
  { key: 'jumat', name: 'Jumat', short: 'Jum' },
  { key: 'sabtu', name: 'Sabtu', short: 'Sab' },
  { key: 'minggu', name: 'Minggu', short: 'Min' },
];

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
    timeWindow: '(5-7) terkirim',
    targetAudience: 'Gastronomi Pagi • 05:00-07:00',
    iconSymbol: '🍚',
    menuCount: '07 Menu',
  },
  {
    key: 'siang',
    title: 'Makan Siang',
    timeWindow: '(11-13) terkirim',
    targetAudience: 'Makan Siang • 11:00-13:00',
    iconSymbol: '🍜',
    menuCount: '07 Menu',
  },
  {
    key: 'malam',
    title: 'Makan Malam',
    timeWindow: '(17-19) terkirim',
    targetAudience: 'Makan Malam • 17:00-19:00',
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
  // SENIN
  // ==========================================
  {
    id: 'sarapan-nj',
    code: 'NJ',
    name: 'Nasi Jenggo Bali',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'senin',
    dayName: 'Senin',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
    id: 'siang-sa',
    code: 'SA',
    name: 'Soto Ayam Lamongan + Koya',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'senin',
    dayName: 'Senin',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Soto ayam berkuah kuning keemasan kaya rempah kaldu ayam kampung, suwiran ayam melimpah, soun, kol, seledri, dilengkapi sachet koya gurih istimewa dan sambal terpisah.',
    composition: 'Nasi • Suwir ayam kampung • Soun • Kol • Kuah kuning kaldu • Serbuk koya gurih terpisah • Sambal',
    packaging: 'Eco Craft Box + Kuah & Koya Pouch Terpisah',
    tag: 'Kuah Segar Koya',
  },
  {
    id: 'malam-bj',
    code: 'BJ',
    name: 'Bakmi Jawa Ayam Kampung',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'senin',
    dayName: 'Senin',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 22000,
    priceDisplay: '22K',
    tier: 'special',
    tierLabel: '22K Special',
    stockStatus: 'TERSEDIA',
    description: 'Bakmi racikan bumbu khas Jawa tradisional dengan suwiran ayam kampung gurih, telur bebek/ayam orak-arik, kubis segar, tomat, dan taburan bawang goreng renyah wangi.',
    composition: 'Bakmi kuning kenyal • Ayam kampung asli • Telur orak-arik • Sawi & kubis • Bumbu kemiri bawang',
    packaging: 'Bowl / Lunch Box Le\'Paroan Hangat',
    tag: 'Ayam Kampung',
  },

  // ==========================================
  // SELASA
  // ==========================================
  {
    id: 'sarapan-ba',
    code: 'BA',
    name: "Bubur Ayam Le'Paroan",
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'selasa',
    dayName: 'Selasa',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
    id: 'siang-sm',
    code: 'SM',
    name: 'Soto Madura Premium',
    subtitle: 'Kuah Kuning Vivid, Daging Coklat Gurih & Jeroan Komplit',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'selasa',
    dayName: 'Selasa',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 28000,
    priceDisplay: '28K',
    tier: 'premium',
    tierLabel: '28K Premium ★',
    isPremiumHighlight: true,
    stockStatus: 'TERSEDIA',
    description: 'Soto Madura otentik dengan kuah kuning vivid khas Madura, daging sapi potong coklat gurih meresap, jeroan lengkap usus sapi goreng bulat, babat honeycomb, paru crispy, dan telur rebus.',
    composition: 'Daging sapi potong coklat gurih • Usus sapi goreng bulat • Babat honeycomb • Paru crispy • Telur rebus • Kuah kuning vivid Madura',
    packaging: 'Bowl Le\'Paroan 600ml + Nasi Bungkus Daun',
    badge: '★ HARGA PREMIUM',
    tag: 'Premium Highlight',
  },
  {
    id: 'malam-tc',
    code: 'TC',
    name: 'Tahu Campur Surabaya',
    subtitle: 'Daging Koyor 25gr, Petis Hitam Kental & Lentho Singkong',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'selasa',
    dayName: 'Selasa',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Tahu Campur Surabaya dalam kemasan blow kraf 600ml dengan komposisi lengkap: daging koyor/otot sapi 25gr, petis hitam udang kental wangi, tahu goreng, lontong, mie kuning, toge segar, perkedel singkong lentho renyah, selada, dan kerupuk.',
    composition: 'Daging koyor/otot sapi 25gr • Petis hitam kental • Tahu goreng • Lontong • Mie kuning & toge • Perkedel singkong (lentho) • Selada & kerupuk',
    packaging: 'Blow Kraf 600ml Le\'Paroan',
    tag: 'Khas Surabaya',
  },

  // ==========================================
  // RABU
  // ==========================================
  {
    id: 'sarapan-nk',
    code: 'NK',
    name: 'Nasi Krawu Gresik',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'rabu',
    dayName: 'Rabu',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
    id: 'siang-cm',
    code: 'CM',
    name: 'Cwie Mie Malang',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'rabu',
    dayName: 'Rabu',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 22000,
    priceDisplay: '22K',
    tier: 'special',
    tierLabel: '22K Special',
    stockStatus: 'TERSEDIA',
    description: 'Mie pipih lembut kenyal khas kota Malang dengan cincangan daging ayam gurih menyerupai abon halus, daun selada segar, pangsit goreng kriuk mekar, dan kuah kaldu gurih terpisah.',
    composition: 'Mie lembut khas Malang • Ayam cincang gurih abon • Pangsit goreng kriuk • Selada • Kuah kaldu 300ml terpisah',
    packaging: 'Bowl Kraft Le\'Paroan + Kuah Pouch Terpisah',
    tag: 'Favorit Malang',
  },
  {
    id: 'malam-gk',
    code: 'GK',
    name: 'Gulai Kacang Ijo Roti Maryam',
    subtitle: 'Daging Sandung Lamur Berlemak Gurih & Roti Maryam Flaky',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'rabu',
    dayName: 'Rabu',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Gulai Kacang Ijo dengan daging sandung lamur / kambing slice berlemak gurih terlihat jelas di dalam kuah kuning gulai rempah pekat, kacang ijo lembut, dan lontong. Disajikan bersama sekerat Roti Maryam flaky berlapis renyah yang pas dicocol.',
    composition: 'Daging sandung lamur/kambing slice berlemak gurih • Kacang ijo lembut kuah gulai kuning • Lontong • Roti Maryam flaky berlapis',
    packaging: 'Blow Kraf 600ml Le\'Paroan + Roti Maryam Flaky',
    tag: 'Spesial Maryam',
  },

  // ==========================================
  // KAMIS
  // ==========================================
  {
    id: 'sarapan-nu',
    code: 'NU',
    name: 'Nasi Uduk Betawi',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'kamis',
    dayName: 'Kamis',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
    id: 'siang-np',
    code: 'NP',
    name: 'Nasi Padang Rendang + Sayur Nangka',
    subtitle: 'Daging Rendang 25gr Serat Tebal Bumbu Melimpah',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'kamis',
    dayName: 'Kamis',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Daging rendang 25gr potongan tebal bertekstur serat asli dengan siraman bumbu rendang melimpah berminyak coklat kehitaman di atas nasi putih, dilengkapi gulai nangka kuning, rebusan daun singkong, dan sambal ijo lado mudo.',
    composition: 'Daging rendang 25gr potongan tebal • Bumbu rendang hitam berminyak melimpah • Gulai nangka kuning • Daun singkong • Sambal ijo • Nasi putih',
    packaging: 'Dark Green Box Le\'Paroan Alas Daun Pisang',
    tag: 'Rendang Minang',
  },
  {
    id: 'malam-sb',
    code: 'SB',
    name: 'Soto Betawi Premium',
    subtitle: '2 Slice Daging Sengkel 30gr, Kuah Santan Creamy & Nasi Daun',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'kamis',
    dayName: 'Kamis',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Soto Betawi otentik dalam kemasan blow kraf 600ml dengan 2 slice daging sengkel/topside 30gr tebal empuk, kuah santan creamy putih-kuning gurih beraroma rempah, tomat segar, kentang goreng, emping melinjo, plus nasi putih terpisah beralas daun pisang.',
    composition: '2 slice daging sengkel/topside 30gr • Kuah santan creamy putih-kuning gurih • Tomat & kentang goreng • Emping melinjo • Nasi terpisah bungkum daun',
    packaging: 'Blow Kraf 600ml + Nasi Terpisah Daun Pisang',
    tag: 'Soto Betawi',
  },

  // ==========================================
  // JUMAT
  // ==========================================
  {
    id: 'sarapan-ls',
    code: 'LS',
    name: 'Lontong Sayur Medan',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'jumat',
    dayName: 'Jumat',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
    id: 'siang-aa',
    code: 'AA',
    name: 'Asem Asem Iga + Pedha',
    subtitle: 'Iga Sapi Empuk & Ikan Pedha dengan Irisan Cabai Hijau & Belimbing Wuluh',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'jumat',
    dayName: 'Jumat',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Olahan iga sapi empuk berpadu ikan pedha gurih dalam kuah asam segar dengan irisan cabai hijau keriting tipis dan belimbing wuluh bulat memanjang potong kecil-kecil, dilengkapi sambal terasi terpisah.',
    composition: 'Iga sapi empuk • Ikan pedha gurih • Irisan cabai hijau keriting • Belimbing wuluh potong • Kuah asem segar • Sambal terasi terpisah',
    packaging: 'Bowl Le\'Paroan Food-Grade + Sambal Terpisah',
    tag: 'Iga Segar',
  },
  {
    id: 'malam-nb',
    code: 'NB',
    name: 'Nasi Babat Madura / Surabaya',
    subtitle: 'Babat, Usus & Paru Juicy Basah Mengkilap + Sambal Korek Minyak Panas',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'jumat',
    dayName: 'Jumat',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Nasi Babat Surabaya dalam box dark green Le\'Paroan beralas daun pisang. Tampilan babat honeycomb, usus, dan paru sapi basah mengkilap juicy tidak kering, disajikan dengan sambal korek kasar merah segar siraman minyak jelantah panas yang berminyak glossy, serundeng gurih, dan lalapan.',
    composition: 'Babat honeycomb, usus & paru sapi basah mengkilap juicy • Sambal korek kasar siram minyak panas • Nasi pulen serundeng • Lalapan segar',
    packaging: 'Box Le\'Paroan Dark Green Alas Daun Pisang',
    tag: 'Babat Juicy',
  },

  // ==========================================
  // SABTU
  // ==========================================
  {
    id: 'sarapan-ng',
    code: 'NG',
    name: 'Nasi Gudeg Krecek Jogya',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'sabtu',
    dayName: 'Sabtu',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
    id: 'siang-eg',
    code: 'EG',
    name: 'Empal Gentong',
    subtitle: 'Daging Sengkel/Topside Empuk Berserat Kuah Santan Kuning Kental',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'sabtu',
    dayName: 'Sabtu',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 25000,
    priceDisplay: '25K',
    tier: 'iga',
    tierLabel: '25K Iga/Premium',
    stockStatus: 'TERSEDIA',
    description: 'Empal Gentong dalam tampilan daging sengkel / topside khas Cirebon yang empuk berserat dengan kuah santan kuning kental kaya rempah cengkeh kapulaga, disajikan bersama nasi/lontong pulen, emping melinjo renyah, dan sambal.',
    composition: 'Daging sengkel / topside empuk berserat • Kuah santan kuning kental rempah • Nasi/lontong pulen • Emping melinjo • Daun kucai & sambal',
    packaging: 'Bowl Le\'Paroan Food-Grade Kuah Terpisah',
    tag: 'Khas Cirebon',
  },
  {
    id: 'malam-ng',
    code: 'NG',
    name: 'Nasi Goreng Jawa Klontong',
    subtitle: 'Dark Soy Khas Jawa, Kubis & Tauge Melimpah, Telur & Ayam Kampung',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'sabtu',
    dayName: 'Sabtu',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Nasi Goreng Jawa Klontong autentik beraroma wajan dengan dominan irisan kubis dan tauge melimpah di atas nasi goreng dark soy gurih manis, dilengkapi 5-6 potong telur rebus setengah dan suwiran tipis daging ayam kampung serta kerupuk.',
    composition: 'Nasi goreng Jawa dark soy • Irisan kubis & tauge melimpah • 5-6 potong telur rebus • Suwiran ayam kampung • Kerupuk renyah',
    packaging: 'Box Le\'Paroan Eco Premium 600ml',
    tag: 'Jawa Klontong',
  },

  // ==========================================
  // MINGGU
  // ==========================================
  {
    id: 'sarapan-np',
    code: 'NP',
    name: 'Nasi Pecel Madiun',
    mealTime: 'sarapan',
    mealLabel: 'Sarapan',
    dayKey: 'minggu',
    dayName: 'Minggu',
    deliverySlot: 'Sarapan (5-7) terkirim',
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
  {
    id: 'siang-smie',
    code: 'SM',
    name: 'Soto Mie Bogor',
    subtitle: 'Daging & Otot Sapi Kenyal Kental Gurih',
    mealTime: 'siang',
    mealLabel: 'Makan Siang',
    dayKey: 'minggu',
    dayName: 'Minggu',
    deliverySlot: 'Makan Siang (11-13) terkirim',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Soto Mie Bogor khas dengan daging dan otot sapi kenyal kental, mie kuning lembut, bihun, potongan risol goreng renyah berisikan bihun, irisan kol, tomat segar, telur rebus, dan kuah kaldu soto gurih kemerahan.',
    composition: 'Daging & otot sapi kenyal kental • Mie kuning & bihun • Risol bihun renyah • Kol & tomat • Telur rebus • Kuah soto gurih',
    packaging: 'Bowl Le\'Paroan 600ml Kuah Terpisah',
    tag: 'Favorit Bogor',
  },
  {
    id: 'malam-tt',
    code: 'TT',
    name: 'Tahu Tek Komplit',
    subtitle: 'Telur Dadar Iris Tipis, Petis Hitam Kental & Lontong Komplit',
    mealTime: 'malam',
    mealLabel: 'Makan Malam',
    dayKey: 'minggu',
    dayName: 'Minggu',
    deliverySlot: 'Makan Malam (17-19) terkirim',
    price: 20000,
    priceDisplay: '20K',
    tier: 'standard',
    tierLabel: '20K Standard',
    stockStatus: 'TERSEDIA',
    description: 'Tahu Tek porsi komplit premium dengan telur dadar iris tipis memanjang di atas tahu goreng hangat, kentang goreng, tauge pendek segar, potongan dadu mentimun kecil-kecil, lontong pulen, guyuran saus bumbu petis hitam kental legit, dan kerupuk renyah.',
    composition: 'Tahu goreng & telur dadar iris memanjang • Kentang goreng • Tauge pendek segar • Dadu mentimun • Lontong • Bumbu petis hitam kental • Kerupuk',
    packaging: 'Bowl Le\'Paroan 600ml Eco Premium',
    tag: 'Saus Petis Komplit',
  },

  // ==========================================
  // MINUMAN KHAS (SETIAP HARI)
  // ==========================================
  {
    id: 'teh-rempah',
    code: 'TR',
    name: "Teh Rempah Le'Paroan",
    subtitle: 'Pilihan Varian: Rasa Serai Segar / Rasa Pokak Hangat',
    mealTime: 'minuman',
    mealLabel: 'Minuman Khas',
    dayKey: 'semua',
    dayName: 'Setiap Hari',
    deliverySlot: 'Minuman Khas (Setiap Hari)',
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
