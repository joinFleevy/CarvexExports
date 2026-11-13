export interface VehicleGalleryItem {
  id: number | string;
  url: string;
  title: string;
  category: 'exterior' | 'steering' | 'gearshift' | 'seats' | 'door';
  categoryLabelAr: string;
  categoryLabelFr: string;
}

export interface VehicleItem {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  model: string;
  year: number;
  bodyType: 'Sedan' | 'Coupe' | 'Hatchback' | 'Crossover' | 'Van' | 'Pickup' | 'Wagon' | 'Sport coupe';
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Flex Fuel (E85)' | 'Electric' | 'Diesel' | 'Hybrid' | 'Hydrogen' | 'Other';
  status: 'in_stock' | 'on_order';
  statusLabelAr: string;
  statusLabelFr: string;
  showroom: 'Alger' | 'Jijel' | 'Ouargla';
  showroomNameAr: string;
  availableNow: boolean;
  priceDzdCentimes: number; // in Million Centimes (e.g. 388 = 388,000,000 DZD)
  priceUsd: number;
  isFavoriteDefault: boolean;
  image: string;
  horsepower: number;
  engine: string;
  topSpeed: string;
  color: string;
  customsRegime: 'مجاهدين' | 'ملف عادي -3 سنوات';
  gallery?: VehicleGalleryItem[];
}

export const VEHICLES_DATA: VehicleItem[] = [
  {
    id: 'audi-a4',
    title: 'Audi A4',
    subtitle: '2.0 TFSI Sport (249 hp, Quattro)',
    brand: 'Audi',
    model: 'A4',
    year: 2024,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Alger',
    showroomNameAr: 'صالة العاصمة (المحمدية)',
    availableNow: true,
    priceDzdCentimes: 385,
    priceUsd: 24.59,
    isFavoriteDefault: false,
    image: '/images/cars/audi-a4-hd.jpg',
    horsepower: 249,
    engine: '2.0L TFSI Turbo 4-Cyl',
    topSpeed: '250 km/h',
    color: 'Navarra Blue Metallic',
    customsRegime: 'ملف عادي -3 سنوات',
  },
  {
    id: 'opel-insignia',
    title: 'Opel Insignia',
    subtitle: '2.0 Turbo Grand Sport (230 hp, AWD)',
    brand: 'Opel',
    model: 'Insignia',
    year: 2024,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Jijel',
    showroomNameAr: 'صالة جيجل (بوالرمل)',
    availableNow: true,
    priceDzdCentimes: 295,
    priceUsd: 19.99,
    isFavoriteDefault: false,
    image: '/images/cars/opel-insignia-hd.jpg',
    horsepower: 230,
    engine: '2.0L Turbo EcoTec',
    topSpeed: '240 km/h',
    color: 'Glacier White',
    customsRegime: 'ملف عادي -3 سنوات',
  },
  {
    id: 'mini-countryman',
    title: 'Mini Countryman',
    subtitle: 'Cooper S ALL4 (189 hp, AWD)',
    brand: 'Mini',
    model: 'Countryman',
    year: 2024,
    bodyType: 'Crossover',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Ouargla',
    showroomNameAr: 'صالة ورقلة (وسط المدينة)',
    availableNow: true,
    priceDzdCentimes: 340,
    priceUsd: 28.50,
    isFavoriteDefault: false,
    image: '/images/cars/mini-countryman-hd.jpg',
    horsepower: 189,
    engine: '2.0L TwinPower Turbo',
    topSpeed: '225 km/h',
    color: 'British Racing Green',
    customsRegime: 'مجاهدين',
  },
  {
    id: 'mazda-6',
    title: 'Mazda 6',
    subtitle: '2.5 Turbo Premium (250 hp, AWD)',
    brand: 'Mazda',
    model: '6',
    year: 2024,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Alger',
    showroomNameAr: 'صالة العاصمة (المحمدية)',
    availableNow: true,
    priceDzdCentimes: 320,
    priceUsd: 22.99,
    isFavoriteDefault: true, // Marked red heart in reference
    image: '/images/cars/mazda-6-hd.jpg',
    horsepower: 250,
    engine: '2.5L Skyactiv-G Turbo',
    topSpeed: '240 km/h',
    color: 'Soul Red Crystal',
    customsRegime: 'مجاهدين',
  },
  {
    id: 'cadillac-escalade',
    title: 'Cadillac Escalade',
    subtitle: '6.2L V8 Platinum (420 hp, 4WD)',
    brand: 'Cadillac',
    model: 'Escalade',
    year: 2024,
    bodyType: 'Crossover',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'on_order',
    statusLabelAr: 'استيراد بالطلب',
    statusLabelFr: 'Sur Commande',
    showroom: 'Alger',
    showroomNameAr: 'الإدارة المركزية (الجزائر)',
    availableNow: false,
    priceDzdCentimes: 780,
    priceUsd: 24.00,
    isFavoriteDefault: false,
    image: '/images/cars/cadillac-escalade-hd.jpg',
    horsepower: 420,
    engine: '6.2L EcoTec3 V8',
    topSpeed: '210 km/h',
    color: 'Obsidian Black',
    customsRegime: 'مجاهدين',
  },
  {
    id: 'ford-focus-st',
    title: 'Ford Focus ST',
    subtitle: '2.3 EcoBoost (280 hp, FWD)',
    brand: 'Ford',
    model: 'Focus ST',
    year: 2024,
    bodyType: 'Hatchback',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Jijel',
    showroomNameAr: 'صالة جيجل (بوالرمل)',
    availableNow: true,
    priceDzdCentimes: 290,
    priceUsd: 26.75,
    isFavoriteDefault: false,
    image: '/images/cars/ford-focus-st-hd.jpg',
    horsepower: 280,
    engine: '2.3L EcoBoost Turbo',
    topSpeed: '250 km/h',
    color: 'Performance Blue',
    customsRegime: 'ملف عادي -3 سنوات',
  },
  {
    id: 'tesla-model-s',
    title: 'Tesla Model S',
    subtitle: 'Long Range (670 hp, AWD)',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Electric',
    status: 'on_order',
    statusLabelAr: 'استيراد بالطلب (إعفاء 80%)',
    statusLabelFr: 'Sur Commande (Exonéré 80%)',
    showroom: 'Alger',
    showroomNameAr: 'صالة العاصمة (المحمدية)',
    availableNow: false,
    priceDzdCentimes: 850,
    priceUsd: 45.00,
    isFavoriteDefault: false,
    image: '/images/cars/tesla-model-s-hd.jpg',
    horsepower: 670,
    engine: 'Dual Motor All-Wheel Drive EV',
    topSpeed: '250 km/h',
    color: 'Pearl White Multi-Coat',
    customsRegime: 'ملف عادي -3 سنوات',
  },
  {
    id: 'mazda-3-hatchback',
    title: 'Mazda 3 Hatchback',
    subtitle: '2.5 Skyactiv-G Select (186 hp, FWD)',
    brand: 'Mazda',
    model: '3 Hatchback',
    year: 2024,
    bodyType: 'Hatchback',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Ouargla',
    showroomNameAr: 'صالة ورقلة (وسط المدينة)',
    availableNow: true,
    priceDzdCentimes: 280,
    priceUsd: 21.99,
    isFavoriteDefault: true, // Marked red heart in reference
    image: '/images/cars/mazda-3-hatchback-hd.jpg',
    horsepower: 186,
    engine: '2.5L Skyactiv-G DOHC',
    topSpeed: '215 km/h',
    color: 'Deep Crystal Blue',
    customsRegime: 'مجاهدين',
  },
  {
    id: 'vw-tiguan',
    title: 'VW Tiguan',
    subtitle: '2.0 TSI R-Line (184 hp, 4Motion)',
    brand: 'Volkswagen',
    model: 'Tiguan',
    year: 2024,
    bodyType: 'Crossover',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض',
    statusLabelFr: 'En Stock',
    showroom: 'Jijel',
    showroomNameAr: 'صالة جيجل (بوالرمل)',
    availableNow: true,
    priceDzdCentimes: 450,
    priceUsd: 31.50,
    isFavoriteDefault: false,
    image: '/images/cars/vw-tiguan-hd.jpg',
    horsepower: 184,
    engine: '2.0L Turbocharged TSI 4-Cyl',
    topSpeed: '215 km/h',
    color: 'Pure White R-Line',
    customsRegime: 'ملف عادي -3 سنوات',
  },
  {
    id: 'geely-coolray-battle',
    title: 'Geely Coolray Battle 2026',
    subtitle: '1.5 Turbo DCT Sport (177 hp, FWD)',
    brand: 'Geely',
    model: 'Coolray Battle',
    year: 2026,
    bodyType: 'Crossover',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض — تسليم فوري',
    statusLabelFr: 'En Stock — Livraison Immédiate',
    showroom: 'Alger',
    showroomNameAr: 'صالة العاصمة (المحمدية)',
    availableNow: true,
    priceDzdCentimes: 399,
    priceUsd: 34.00,
    isFavoriteDefault: false,
    image: '/images/carvexexport_DfXYcp-HC7n.jpg',
    horsepower: 177,
    engine: '1.5L Turbo 3-Cyl BHE15',
    topSpeed: '200 km/h',
    color: 'Blanc Nacré / Toit Noir',
    customsRegime: 'مجاهدين',
  },
  {
    id: 'mg5-global-mx',
    title: 'MG5 Global (MX) 2026',
    subtitle: '1.5L VTi-tech CVT (114 hp, FWD)',
    brand: 'MG',
    model: 'MG5',
    year: 2026,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'in_stock',
    statusLabelAr: 'متوفرة بالمعرض — تسليم فوري',
    statusLabelFr: 'En Stock — Livraison Immédiate',
    showroom: 'Ouargla',
    showroomNameAr: 'صالة ورقلة (حي النصر)',
    availableNow: true,
    priceDzdCentimes: 268,
    priceUsd: 18.50,
    isFavoriteDefault: false,
    image: '/images/carvexexport_DfW9Syzjkqr.jpg',
    horsepower: 114,
    engine: '1.5L 4-Cyl VTi Atmospheric',
    topSpeed: '185 km/h',
    color: 'Blanc Glacier',
    customsRegime: 'مجاهدين',
  },
  {
    id: 'jetour-dashing-luxury',
    title: 'Jetour Dashing Luxury 2026',
    subtitle: '1.6 TGDI 7DCT (197 hp, FWD)',
    brand: 'Jetour',
    model: 'Dashing',
    year: 2026,
    bodyType: 'Crossover',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'on_order',
    statusLabelAr: 'في الحاوية — قادمة لميناء جن جن',
    statusLabelFr: 'En Mer — Arrivée Djen Djen',
    showroom: 'Jijel',
    showroomNameAr: 'صالة جيجل (بوالرمل)',
    availableNow: false,
    priceDzdCentimes: 415,
    priceUsd: 36.50,
    isFavoriteDefault: false,
    image: '/images/carvexexport_DfXu4jdgBcc.jpg',
    horsepower: 197,
    engine: '1.6L TGDI Kunpeng Power',
    topSpeed: '210 km/h',
    color: 'Gris Titanium',
    customsRegime: 'مجاهدين',
  },
];

export const VEHICLE_INTERIOR_MAP: Record<string, {
  steering: { url: string; titleAr: string; titleFr: string };
  gearshift: { url: string; titleAr: string; titleFr: string };
  seats: { url: string; titleAr: string; titleFr: string };
  door: { url: string; titleAr: string; titleFr: string };
}> = {
  'audi-a4': {
    steering: {
      url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود Audi Sport مع لوحة العدادات الرقمية Virtual Cockpit',
      titleFr: 'Volant sport Audi et combiné Virtual Cockpit',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مبدل السرعات S-Tronic وقرص التحكم المركزي MMI',
      titleFr: 'Sélecteur de vitesse S-Tronic et console MMI',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد رياضية جلدية بضبط كهربائي ودعم قطني',
      titleFr: 'Sièges sport en cuir avec réglages électriques',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'باب السيارة الداخلي مع تطعيمات الألومنيوم وإضاءة محيطية',
      titleFr: 'Portière intérieure avec inserts aluminium et éclairage d’ambiance',
    },
  },
  'opel-insignia': {
    steering: {
      url: 'https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'المقود الجلدي متعدد الوظائف مع مثبت السرعة التكيفي',
      titleFr: 'Volant cuir multifonctions et régulateur adaptatif',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'ناقل الحركة الأوتوماتيكي وكونسول القيادة المتطور',
      titleFr: 'Levier de vitesse automatique et console de bord',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد مريحة معتمدة طبياً AGR بكسوة جلدية فاخرة',
      titleFr: 'Sièges ergonomiques certifiés AGR en cuir perforé',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'الباب الداخلي مع أزرار النوافذ الكهربائية ومسند الذراع',
      titleFr: 'Panneau de portière intérieur avec commandes vitres et accoudoir',
    },
  },
  'mini-countryman': {
    steering: {
      url: 'https://images.unsplash.com/photo-1641427917368-a7760ee0849a?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود John Cooper Works الرياضي بتطريز أيقوني',
      titleFr: 'Volant sport John Cooper Works avec surpiqûres',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مفاتيح التبديل الكلاسيكية ومقبض السرعات الدائري المميز',
      titleFr: 'Boutons à bascule aéronautiques et levier séquentiel',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد رياضية ثنائية اللون مع تطريز العلم البريطاني',
      titleFr: 'Sièges sport bicolores et finitions exclusives MINI',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'بطانة الباب الداخلي مع حلقات الإضاءة الدائرية التفاعلية',
      titleFr: 'Garniture de portière avec cerclages lumineux interactifs',
    },
  },
  'mazda-6': {
    steering: {
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'المقود الجلدي بتصميم الحرفية اليابانية Takumi',
      titleFr: 'Volant artisanal Takumi avec surpiqûres main',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'ناقل الحركة الكلاسيكي مع مفتاح القيادة الرياضية Sport Mode',
      titleFr: 'Sélecteur de vitesse et sélecteur de mode Sport',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد جلد نابا Nappa الفاخرة بلون بني كستنائي دافئ',
      titleFr: 'Sièges en cuir Nappa véritable ventilés et chauffants',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'الباب الداخلي بحواف من خشب السين Sen Wood الياباني النادر',
      titleFr: 'Habillage de portière avec inserts en bois Sen véritable',
    },
  },
  'cadillac-escalade': {
    steering: {
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود خشبي فاخر أمام شاشة العرض المنحنية 38 بوصة OLED',
      titleFr: 'Volant chauffant gainé cuir et écran incurvé 38" OLED',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مبدل السرعات الإلكتروني وكونسول ثلاجة التبريد المركزية',
      titleFr: 'Console centrale avec sélecteur électronique et compartiment réfrigéré',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد ملوكية مزودة بـ 16 اتجاه تدليك ومكبرات صوت بالمساند',
      titleFr: 'Fauteuils massants 16 voies avec haut-parleurs AKG intégrés',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'بطانة الباب بشبكات مكبرات الصوت المعدنية AKG Studio 36 سماعة',
      titleFr: 'Portière avec grilles de haut-parleurs acoustiques gravées AKG',
    },
  },
  'ford-focus-st': {
    steering: {
      url: 'https://images.unsplash.com/photo-1680365475736-7c5f48aef3b6?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود رياضي بقاعدة مسطحة D-Cut وشعار ST بلون أحمر',
      titleFr: 'Volant sport méplat gainé de cuir perforé ST',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقبض ناقل الحركة اليدوي 6 سرعات من الألومنيوم المصقول',
      titleFr: 'Pommeau de levier de vitesse 6 rapports en aluminium brossé',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد سباق حاضنة Recaro بتثبيت جانبي فائق',
      titleFr: 'Sièges baquets Recaro à maintien latéral renforcé',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'بطانة الباب بطابع ألياف الكربون ومكبرات Bang & Olufsen',
      titleFr: 'Panneau de porte sport effet carbone et système B&O',
    },
  },
  'tesla-model-s': {
    steering: {
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود Yoke المستقبلي مع شاشة لمس سينمائية 17 بوصة',
      titleFr: 'Volant Yoke nouvelle génération et écran central 17"',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'كونسول ذكي بنظام التبديل الرقمي Smart Shift وشواحن لاسلكية',
      titleFr: 'Console centrale avec sélecteur tactile et recharge à induction',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد جلدية نباتية فائقة النعومة باللون الأبيض الثلجي',
      titleFr: 'Sièges en cuir végétal blanc haute durabilité ultra-confort',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'أزرار فتح الأبواب الإلكترونية بلمسة واحدة وزجاج مزدوج عازل',
      titleFr: 'Commandes électroniques d’ouverture affleurantes et vitrage acoustique',
    },
  },
  'mazda-3-hatchback': {
    steering: {
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'المقود المريح مع شاشة عرض المعلومات على الزجاج HUD',
      titleFr: 'Poste de conduite centré sur le conducteur et affichage tête haute',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'ناقل حركة إنسيابي محاط بأسطح البيانو بلاك اللامعة',
      titleFr: 'Console laquée Piano Black et levier cuir ergonomique',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد بلون أحمر قرمزي نبيذي تمنح المقصورة طابعاً رياضياً فريداً',
      titleFr: 'Sièges en cuir rouge bordeaux signature Mazda',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مسند الذراع المبطن بخياطة يدوية دقيقة ومقابض كرومية',
      titleFr: 'Accoudoir surpiqué main et poignées chromées épurées',
    },
  },
  'vw-tiguan': {
    steering: {
      url: 'https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود R-Line بأزرار لمسية تفاعلية ولوحة Digital Cockpit Pro',
      titleFr: 'Volant tactile R-Line capacitif et Digital Cockpit Pro',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مفتاح DSG السلكي Shift-by-Wire وقرص أنماط القيادة 4Motion',
      titleFr: 'Commande de boîte DSG compacte et sélecteur 4Motion Active Control',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد Vienna الجلدية الفاخرة مع شعار R مطرز على الظهر',
      titleFr: 'Sellerie cuir Vienna haut de gamme siglée R-Line',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'خطوط الإضاءة المحيطية Ambient Light بـ 30 لوناً في ألواح الأبواب',
      titleFr: 'Éclairage d’ambiance personnalisable 30 teintes sur portières',
    },
  },
  'geely-coolray-battle': {
    steering: {
      url: 'https://images.unsplash.com/photo-1717222980905-7d5f116a8feb?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود رياضي مع شاشتين متصلتين مزدوجتين 10.25 و 12.3 بوصة',
      titleFr: 'Volant sport et double écran panoramique numérique',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مبدل سرعات إلكتروني مستوحى من قمرة الطائرات النفاثة',
      titleFr: 'Sélecteur de vitesse électronique inspiré de l’aéronautique',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد شامواه وجلد بلونين أسود وأحمر بنمط ألعاب السباقات',
      titleFr: 'Sièges baquets sport bi-matière Alcantara et cuir noir/rouge',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'باب داخلي عصري مع إضاءة ليزرية محيطية وتطعيمات فضية',
      titleFr: 'Contre-porte au design futuriste avec éclairage dynamique',
    },
  },
  'mg5-global-mx': {
    steering: {
      url: 'https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود جلدي ثلاثي الأذرع مع تحكم بالوسائط والصوت',
      titleFr: 'Volant cuir trois branches avec commandes audio au volant',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'ناقل حركة CVT بمقبض جلدي مريح ومكبح يد كهربائي EPB',
      titleFr: 'Levier de vitesse CVT ergonomique avec frein à main électrique',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد مريحة للرحلات الطويلة قابلة للتعديل بـ 6 اتجاهات',
      titleFr: 'Sièges confort longue distance réglables 6 directions',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'باب داخلي عازل للصوت مع مساحات تخزين رحبة للأغراض الشخصية',
      titleFr: 'Portière insonorisée avec rangements profonds intégrés',
    },
  },
  'jetour-dashing-luxury': {
    steering: {
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقود الخيال العلمي ثنائي الأذرع مع شاشة عرض تفاعلية',
      titleFr: 'Volant bicolore deux branches au design futuriste avant-gardiste',
    },
    gearshift: {
      url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مبدل سرعات مقودي Stalk-shifter يوفر كونسول وسطي معلق رحب',
      titleFr: 'Levier de vitesse au volant libérant une console centrale suspendue',
    },
    seats: {
      url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'مقاعد انعدام الجاذبية Zero Gravity بمساند رأس ذكية ومكبرات مدمجة',
      titleFr: 'Sièges lounge Zéro Gravité avec haut-parleurs dans les appuie-tête',
    },
    door: {
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
      titleAr: 'شاشات لمس ذكية مدمجة في الأبواب للتحكم بدرجة الحرارة ومكيف الهواء',
      titleFr: 'Mini-écrans tactiles intégrés aux portières pour climatisation dédiée',
    },
  },
};

export function getVehicleGallery(vehicle: VehicleItem): VehicleGalleryItem[] {
  if (vehicle.gallery && vehicle.gallery.length > 0) {
    return vehicle.gallery;
  }

  const custom = VEHICLE_INTERIOR_MAP[vehicle.id];
  const steeringUrl = custom?.steering.url || 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80';
  const gearshiftUrl = custom?.gearshift.url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80';
  const seatsUrl = custom?.seats.url || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80';
  const doorUrl = custom?.door.url || 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80';

  return [
    {
      id: `${vehicle.id}-exterior`,
      url: vehicle.image,
      title: `${vehicle.title} — الهيكل الخارجي`,
      category: 'exterior',
      categoryLabelAr: 'الهيكل الخارجي',
      categoryLabelFr: 'Vue Extérieure',
    },
    {
      id: `${vehicle.id}-steering`,
      url: steeringUrl,
      title: custom?.steering.titleAr || 'المقود واللوحة الرقمية — Steering Wheel',
      category: 'steering',
      categoryLabelAr: 'المقود والكوكبيت',
      categoryLabelFr: 'Volant & Cockpit',
    },
    {
      id: `${vehicle.id}-gearshift`,
      url: gearshiftUrl,
      title: custom?.gearshift.titleAr || 'مبدل السرعات والكونسول — Gearshift & Console',
      category: 'gearshift',
      categoryLabelAr: 'الكونسول ومبدل السرعات',
      categoryLabelFr: 'Levier & Console',
    },
    {
      id: `${vehicle.id}-seats`,
      url: seatsUrl,
      title: custom?.seats.titleAr || 'المقاعد الجلدية الفاخرة — Car Seats',
      category: 'seats',
      categoryLabelAr: 'المقاعد الفاخرة',
      categoryLabelFr: 'Sièges en cuir',
    },
    {
      id: `${vehicle.id}-door`,
      url: doorUrl,
      title: custom?.door.titleAr || 'باب السيارة من الداخل — Car Door',
      category: 'door',
      categoryLabelAr: 'باب السيارة الداخلي',
      categoryLabelFr: 'Portière intérieure',
    },
  ];
}

// Automatically populate the 5 gallery views on all vehicles
VEHICLES_DATA.forEach((v) => {
  v.gallery = getVehicleGallery(v);
});

