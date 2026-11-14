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
  priceDzdCentimes: number; // in Million Centimes (e.g. 217.9 = 2,179,000 DZD)
  priceUsd: number;
  isFavoriteDefault: boolean;
  image: string;
  horsepower: number;
  engine: string;
  topSpeed: string;
  color: string;
  customsRegime: 'وكيل معتمد (رسمي)' | 'مجاهدين' | 'ملف عادي -3 سنوات';
  gallery?: VehicleGalleryItem[];
}

export const VEHICLE_INTERIOR_MAP: Record<
  string,
  {
    steering: { url: string; titleAr: string; titleFr: string };
    gearshift: { url: string; titleAr: string; titleFr: string };
    seats: { url: string; titleAr: string; titleFr: string };
    door: { url: string; titleAr: string; titleFr: string };
  }
> = {
  "fiat-500-hybrid": {
    "steering": {
      "url": "/images/cars/fiat-500-hybrid-interior.jpg",
      "titleAr": "المقود الجلدي والكوكبيت الكلاسيكي مع لوحة العدادات الرقمية الدائرية",
      "titleFr": "Poste de conduite rétro moderne avec combiné numérique circulaire"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقبض ناقل الحركة المرتفع والشاشة المركزية Uconnect قياس 7 بوصات",
      "titleFr": "Levier surélevé ergonomique et écran tactile 7 pouces avec CarPlay"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة مكسوة بنسيج Seaqual Yarn البيئي المتطور",
      "titleFr": "Sièges exclusifs en tissu écologique Seaqual Yarn et similicuir"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ألواح الأبواب الداخلية المتناسقة مع لون الهيكل الخارجي ومقابض الكروم",
      "titleFr": "Panneaux de portes intérieurs coordonnés et poignées chromées"
    }
  },
  "fiat-500x": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود متعدد الوظائف مع شاشة معلومات مركزية ملونة 3.5 بوصات",
      "titleFr": "Volant multifonction sport et combiné d’instruments couleur"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات أوتوماتيكي ثنائي التعشيق وقرص اختيار وضعيات القيادة",
      "titleFr": "Levier de boîte automatique DCT et sélecteur de conduite"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد كروس أوفر جلدية فسيحة مع مسند أسفل الظهر قابل للتعديل كهربائياً",
      "titleFr": "Sièges crossover confortables avec maintien lombaire électrique"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تشطيبات داخلية ناعمة الملمس مع مكبرات صوت عالية النقاء",
      "titleFr": "Habillage de portières rembourré et système audio haute fidélité"
    }
  },
  "fiat-tipo": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحة قيادة تيبو الأنيقة مع شاشة لمس 10.25 بوصة Uconnect",
      "titleFr": "Planche de bord Tipo moderne avec écran tactile 10.25 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة يدوي سلس بـ 6 سرعات وأزرار تحكم بمكيف الهواء",
      "titleFr": "Boîte mécanique 6 rapports et commandes de climatisation intuitives"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد عائلية رحبة تتسع لـ 5 ركاب وصندوق أمتعة سعة 520 لتراً",
      "titleFr": "Habitacle spacieux 5 places et coffre généreux de 520 litres"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "عزل صوتي متطور وجيوب تخزين فسيحة في الأبواب الجانبية",
      "titleFr": "Isolation acoustique soignée et grands bacs de portières"
    }
  },
  "fiat-doblo-panorama": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقصورة دوبلو بانوراما مع زجاج سقف واسع وإضاءة طبيعية",
      "titleFr": "Poste de conduite spacieux avec toit vitré panoramique Magic Top"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كونسول وسطي بمساحات تخزين إضافية وشاشة 8 بوصات",
      "titleFr": "Console centrale avec rangements multiples et écran 8 pouces"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "3 مقاعد خلفية منفصلة مع نظام تثبيت مقاعد الأطفال ISOFIX",
      "titleFr": "Trois sièges arrière individuels modulables avec fixations Isofix"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أبواب جانبية منزلقة تسهل الدخول في أضيق المساحات",
      "titleFr": "Portes latérales coulissantes ultra-pratiques pour la famille"
    }
  },
  "fiat-doblo-van": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "قمرة قيادة عملية مخصصة للعمل اليومي مع شاشة ذكية",
      "titleFr": "Poste de conduite utilitaire robuste et fonctionnel"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات مريح على مستوى اليد مع مقبس شحن 12V و USB",
      "titleFr": "Levier de vitesse surélevé et prises de recharge professionnelles"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقعد Magic Cargo القابل للطي للتحول إلى مكتب متنقل ونقل الحمولات الطويلة",
      "titleFr": "Siège passager Magic Cargo transformable en table de travail"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تبطين داخلي متين مقاوم للصدمات والخدوش مخصص للمهنيين",
      "titleFr": "Contre-portes renforcées en polymère haute résistance"
    }
  },
  "fiat-scudo": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كوكبيت سكودو الرقمي مع شاشة عرض رأسية Head-up Display",
      "titleFr": "Poste de conduite avec affichage tête haute et écran connecté"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة 6 سرعات سلس مع كاميرا خلفية 180 درجة",
      "titleFr": "Levier 6 vitesses et caméra de recul 180° VisioPark"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة مع مساند رأس مريحة وحجم حمولة يصل إلى 6.6 متر مكعب",
      "titleFr": "Sièges confort longue distance et volume utile de 6,6 m³"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "حاجز حماية فولاذي متين مع فتحة Moduwork لنقل الأنابيب الطويلة",
      "titleFr": "Cloison tôlée avec trappe Moduwork pour objets longs"
    }
  },
  "fiat-ducato": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود دوكاتو المريح مع تحكم كهربائي مساعد في المناورات",
      "titleFr": "Poste de conduite ergonomique avec direction assistée électrique"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "طاولة العمل المدمجة Eat & Work مع حامل للأجهزة اللوحية",
      "titleFr": "Table d’écriture Eat & Work intégrée au dossier passager"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقعد سائق بنظام تعليق هوائي هيدروليكي لتخفيف إجهاد السفر",
      "titleFr": "Siège conducteur suspendu pour les longs trajets inter-wilayas"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أبواب خلفية تفتح بزاوية 270 درجة لتسهيل التحميل بالرافعات الشوكية",
      "titleFr": "Portes arrière battantes s’ouvrant à 270° pour chargement aisé"
    }
  },
  "fiat-titano": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جلدي مدعم بأزرار تحكم بالدفع الرباعي والمثبت",
      "titleFr": "Volant multifonction cuir avec sélecteur de mode 4x4"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أزرار بيانو ومفاتيح تفعيل الدفع الرباعي 4L/4H وقفل الدفرنس",
      "titleFr": "Touches Piano élégantes et sélecteur de transmission intégrale"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد جلدية مريحة مزدوجة الكابينة تتسع لـ 5 ركاب برحابة تامة",
      "titleFr": "Sellerie cuir double cabine spacieuse pour 5 personnes"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقابض صعود متينة على القوائم وألواح أبواب مقاومة للأتربة",
      "titleFr": "Poignées de maintien sur montants et portières étanches"
    }
  },
  "chery-tiggo-2-pro": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1717222980905-7d5f116a8feb?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود رياضي D-Cut متعدد الوظائف مع شاشة ترفيه 9 بوصات",
      "titleFr": "Volant sport méplat et écran tactile haute définition 9 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات CVT ناعم مع لمسات كربون فايبر عصرية",
      "titleFr": "Console centrale avec levier CVT et inserts façon carbone"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد رياضية بلونين بتطريز ليزري فائق الدقة",
      "titleFr": "Sièges bi-ton sport avec surpiqûres orange contrastées"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحات أبواب عصرية مع مساند أذرع جلدية ناعمة",
      "titleFr": "Habillage intérieur de portière avec accoudoir cuir souple"
    }
  },
  "chery-arrizo-5": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جلدي كهربائي دقيق مع شاشة عرض العدادات الرقمية",
      "titleFr": "Volant cuir multifonction avec combiné d’instruments lisible"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كونسول وسطي منظم مع مكبح يد كهربائي ومفتاح زر التشغيل",
      "titleFr": "Console épurée avec frein de stationnement électrique EPB"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة مكسوة بالجلد الفاخر تتسع لـ 5 ركاب بامتياز",
      "titleFr": "Sièges en cuir confortables offrant un excellent maintien"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أقفال أوتوماتيكية وزجاج كهربائي متكامل لجميع الأبواب",
      "titleFr": "Commandes de vitres électriques et verrouillage centralisé"
    }
  },
  "chery-tiggo-4-pro": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحة قيادة تيجو 4 بشاشتين رقميتين متطورتين 10.25 بوصات",
      "titleFr": "Cockpit digital double écran 10.25 pouces avec connectivité sans fil"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقبض ناقل حركة إلكتروني Shift-by-Wire وشاحن هاتف لاسلكي",
      "titleFr": "Sélecteur de vitesse électronique et chargeur smartphone à induction"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد رياضية جلدية بتحكم كهربائي وفتحة سقف بانورامية",
      "titleFr": "Sellerie en similicuir perforé et toit ouvrant panoramique"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "إضاءة محيطية تفاعلية تتغير مع نغمات الموسيقى داخل الأبواب",
      "titleFr": "Éclairage d’ambiance dynamique rythmé dans les panneaux de portes"
    }
  },
  "chery-tiggo-7-pro": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود ثلاثي الأذرع مع شاشة تحكم مستقلة بمكيف الهواء باللمس",
      "titleFr": "Volant ergonomique et écran tactile dédié à la climatisation bi-zone"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات مستوحى من اليخوت الفارهة مع مسند ذراع مبرد",
      "titleFr": "Levier de vitesse style yacht et compartiment central réfrigéré"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة بخاصية التدفئة والتحكم الكهربائي في 6 اتجاهات",
      "titleFr": "Sièges chauffants à réglage électrique 6 directions à mémoire"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "نظام صوتي فاخر من سوني Sony بـ 8 مكبرات مع تطعيمات كرومية",
      "titleFr": "Système audio Sony 8 haut-parleurs et inserts métalliques satinés"
    }
  },
  "chery-arrizo-8": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشتان منحنيتان عملاقتان قياس 24.6 بوصة بدقة فائقة الوضوح",
      "titleFr": "Double écran incurvé panoramique 24.6 pouces ultra-haute résolution"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كونسول وسطي خشبي فاخر مع قرص تحكم لمسي ومقبض بلوري",
      "titleFr": "Console plaquée bois précieux avec commande rotative en cristal"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد جلد نابا Nappa أصلية مع وسائد رأس طيران وتبريد وتدليك",
      "titleFr": "Sièges en cuir Nappa véritable avec appuie-tête aviation ventilés"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أزرار تعديل المقاعد مدمجة في الأبواب على غرار سيارات مرسيدس الفاخرة",
      "titleFr": "Commandes de réglage des sièges sur portières style limousine"
    }
  },
  "chery-tiggo-8-pro": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقصورة الدرجة الأولى بشاشات ثلاثية ذكية ومساعد صوتي متقدم",
      "titleFr": "Poste de commande première classe avec triple affichage numérique"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات كريستالي مضيء مع شاشة تحكم مستقلة بالتكييف الخلفي",
      "titleFr": "Sélecteur de vitesse en cristal rétroéclairé et climatisation tri-zone"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "3 صفوف من المقاعد لـ 7 ركاب مع إمكانية طي المقاعد بالكامل",
      "titleFr": "Configuration 7 places modulable avec sièges grand confort chauffants"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "إضاءة ليد محيطية بـ 64 لوناً وزجاج مزدوج عازل للحرارة والضجيج",
      "titleFr": "Ambiance lumineuse 64 couleurs et double vitrage acoustique"
    }
  },
  "geely-gx3-pro": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1717222980905-7d5f116a8feb?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جيلي المريح بتطريزات رياضية وشاشة لمس 8 بوصات",
      "titleFr": "Volant sport et écran multimédia tactile 8 pouces intuitif"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة CVT اقتصادي مع وضعيات القيادة الرياضية Sport والبيئية Eco",
      "titleFr": "Boîte CVT réactive avec modes de conduite Sport et Eco"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة بخياطة متباينة ولمسات جلدية ناعمة",
      "titleFr": "Sièges enveloppants avec sellerie similicuir et surpiqûres"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تشطيبات متينة للأبواب مع تطعيمات فضية أنيقة",
      "titleFr": "Contre-portes bien finies avec inserts argent satiné"
    }
  },
  "geely-emgrand": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحة قيادة فاخرة بلونين مع شاشة عدادات رقمية 12.3 بوصة",
      "titleFr": "Combiné d’instruments entièrement digital 12.3 pouces HD"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كونسول وسطي بملمس الشامواه وناقل حركة إلكتروني سلس",
      "titleFr": "Console centrale gainée avec commandes tactiles et levier cuir"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد جلدية مريحة وفلتر هواء للمقصورة معتمد طبياً CN95",
      "titleFr": "Sellerie grand confort et système de filtration d’air habitacle CN95"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "عزل صوتي فائق للمقصورة يضمن هدوءاً تاماً أثناء السفر",
      "titleFr": "Insonorisation poussée garantissant un silence de roulement exceptionnel"
    }
  },
  "geely-coolray": {
    "steering": {
      "url": "/images/cars/geely-coolray-interior.jpg",
      "titleAr": "مقود كولراي الرياضي مع الشاشة البانورامية المزدوجة المتصلة",
      "titleFr": "Cockpit Coolray Sport avec double écran panoramique incurvé"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات إلكتروني مستوحى من الطائرات النفاثة وكاميرا 540 درجة",
      "titleFr": "Sélecteur de vitesse façon joystick d’aviation et caméra 540°"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد باكت رياضية بلونين أسود وأحمر مع تطريز Coolray الحصري",
      "titleFr": "Sièges baquets sport cuir et suédine avec logo Coolray brodé"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "إضاءة محيطية تفاعلية بـ 72 لوناً ومقابض أبواب معدنية رياضية",
      "titleFr": "Éclairage d’ambiance 72 couleurs et poignées métallisées"
    }
  },
  "geely-starray": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشة عمودية عملاقة 13.2 بوصة بمعالج كوالكوم سنابدراجون 8155",
      "titleFr": "Écran vertical géant 13.2 pouces animé par Qualcomm Snapdragon 8155"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات بلوري ماسي شفاف وإضاءة سيمفونية تفاعلية",
      "titleFr": "Levier de vitesse en cristal taillé diamant et ambiance symphonique"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "نظام صوتي Infinity مع مكبرات صوت مدمجة في مساند رأس المقاعد",
      "titleFr": "Système audio Infinity haut de gamme avec haut-parleurs dans les appuie-tête"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تبطين داخلي عالي الفخامة بمواد صديقة للبيئة ولمسات بيانو بلاك",
      "titleFr": "Matériaux moussés haut de gamme et finitions laquées Piano Black"
    }
  },
  "opel-mokka": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحة قيادة Opel Pure Panel الزجاجية المتصلة بدون انعكاسات",
      "titleFr": "Poste de conduite tout-en-un Opel Pure Panel haute définition"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مفتاح تبديل السرعات الإلكتروني e-Toggle المدمج بالكونسول",
      "titleFr": "Sélecteur de vitesse affleurant e-Toggle et recharge smartphone"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد رياضية طبية معتمدة من منظمة الظهر الألمانية AGR",
      "titleFr": "Sièges sport ergonomiques certifiés AGR pour la santé du dos"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تطعيمات من ألياف الكربون وأشرطة ألمنيوم مصقول على الأبواب",
      "titleFr": "Inserts aspect fibre de carbone et baguettes décoratives en aluminium"
    }
  },
  "opel-astra": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود أسترا الرياضي مع شاشتي Pure Panel Pro قياس 10 بوصات",
      "titleFr": "Volant cuir chauffant et double dalle Pure Panel Pro 10 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة أوتوماتيكي بـ 8 سرعات مع بدالات خلف المقود Paddle Shifters",
      "titleFr": "Boîte automatique 8 rapports avec palettes au volant"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد ألكانتارا وجلد فاخرة بخاصية التدفئة والذاكرة لموضع القيادة",
      "titleFr": "Sièges Alcantara/cuir ventilés avec fonction mémoire et massage"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "إضاءة محيطية خطية ممتدة مع أزرار لمسية ناعمة",
      "titleFr": "Lignes lumineuses d’ambiance intégrées aux panneaux de portes"
    }
  },
  "opel-grandland": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كوكبيت جراندلاند برؤية ليلية بالأشعة تحت الحمراء Night Vision",
      "titleFr": "Cockpit avec système de vision nocturne infrarouge Night Vision"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كونسول عريض بمسند ذراع مزدوج ومبدل سرعات أوتوماتيكي متطور",
      "titleFr": "Large console centrale avec double accoudoir et commande de boîte"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد جلدية مريحة جداً للمسافات الطويلة مع باب خلفي كهربائي ذكي",
      "titleFr": "Sellerie cuir haut de gamme et hayon motorisé mains libres"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "زجاج أمامي وجانبي معزول حرارياً ضد شمس الصحراء الحارقة",
      "titleFr": "Vitrage thermo-isolant et acoustique haute performance"
    }
  },
  "jetour-x70": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جيتور الجلدي مع شاشة مركزية كبيرة 10.1 بوصات تدعم الهواتف",
      "titleFr": "Volant multifonction et grand écran tactile 10.1 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات مريح محاط بأزرار التحكم بأنماط القيادة والكاميرات",
      "titleFr": "Levier ergonomique et commandes de caméra panoramique 360°"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقصورة تتسع لـ 7 ركاب في 3 صفوف مع فتحات تكييف مستقلة لكل صف",
      "titleFr": "Habitacle 7 places spacieux avec aérateurs dédiés aux 3 rangées"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مساند أبواب مكسوة بالجلد المبطن وعتبات صعود مضيئة",
      "titleFr": "Accoudoirs en cuir rembourré et seuils de portes protégés"
    }
  },
  "jetour-x70-plus": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشة مزدوجة مدمجة 10.25 بوصات مع لوحة تحكم تكييف لمسية ثالثة",
      "titleFr": "Double écran panoramique et dalle tactile dédiée à la climatisation"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات إلكتروني مع مكبح يد كهربائي ونظام Auto-Hold",
      "titleFr": "Sélecteur de boîte électronique et frein de stationnement Auto-Hold"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد جلدية بيج فاخرة مع سقف بانورامي عملاق يمتد لكافة الصفوف",
      "titleFr": "Sellerie cuir beige grand luxe et immense toit ouvrant panoramique"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "نظام صوتي محيطي مع عزل صوتي متقدم لكامل المقصورة",
      "titleFr": "Sonorisation surround haute fidélité et insonorisation renforcée"
    }
  },
  "jetour-dashing": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود الخيال العلمي ثنائي الأذرع مع شاشة ترفيه ضخمة 15.6 بوصة",
      "titleFr": "Volant futuriste deux branches et écran flottant géant de 15.6 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات مقودي Stalk Shifter يمنح كونسول وسطي معلق رحب",
      "titleFr": "Levier de vitesse au volant dégageant une console centrale suspendue"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد انعدام الجاذبية Zero Gravity مع مساند أرجل كهربائية ومكبرات صوت",
      "titleFr": "Sièges Zéro Gravité avec repose-jambes électrique et haut-parleurs intégrés"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشات لمس صغيرة مدمجة في الأبواب لعرض درجة حرارة المقصورة",
      "titleFr": "Mini-écrans digitaux sur les portières affichant la température"
    }
  },
  "jetour-x90-plus": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحة قيادة فاخرة متكاملة مع نظام مساعدة القيادة الذاتية Level 2",
      "titleFr": "Cockpit exécutif avec aides à la conduite autonome de niveau 2"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقبض تحكم دائري كريستالي مع لوحة شحن سريع للهواتف الذكية",
      "titleFr": "Molette en cristal pour l’infotainment et chargeur sans fil 50W"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد درجة أولى مكسوة بالجلد الطبيعي الفاخر مع تبريد وتدفئة وتدليك",
      "titleFr": "Fauteuils première classe en cuir véritable chauffants et massants"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ستائر خصوصية خلفية مدمجة في الأبواب وإضاءة ترحيبية خارجية",
      "titleFr": "Stores pare-soleil intégrés aux portières arrière et projecteurs de sol"
    }
  },
  "jetour-t2": {
    "steering": {
      "url": "/images/cars/jetour-t2-interior.jpg",
      "titleAr": "مقود T2 الثماني الصلب مع شاشة عملاقة 15.6 بوصة ومقابض متينة",
      "titleFr": "Volant tout-terrain octogonal et écran central 15.6 pouces ultra-robuste"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "قرص أوضاع القيادة في الصحراء والرمال والصخور مع قفل الدفرنس XWD",
      "titleFr": "Sélecteur de modes tout-terrain (Sable, Roche, Boue) et blocage XWD"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مكسوة بجلد الشامواه المقاوم للأوساخ والمياه مع تهوية كاملة",
      "titleFr": "Sièges en suédine et cuir imperméabilisés avec ventilation active"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقابض صعود فولاذية صلبة ومسامير ديكور ظاهرة بطابع المغامرة",
      "titleFr": "Poignées de maintien renforcées et inserts vissés baroudeur"
    }
  },
  "baic-u5-plus": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشة مزدوجة متصلة 7 بوصات و 12.3 بوصة مع مقود جلدي مريح",
      "titleFr": "Cockpit double écran moderne avec volant multifonction ergonomique"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات CVT ناعم مع مكبح يد كهربائي ونظام تثبيت السرعة",
      "titleFr": "Commande de boîte CVT et frein de stationnement électrique"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة مكسوة بالجلد البيئي عالي الجودة",
      "titleFr": "Sellerie en cuir écologique résistant et facile d’entretien"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "عوازل صوتية محكمة وجيوب تخزين رحبة في الأبواب",
      "titleFr": "Habillage de portières soigné et rangements pratiques"
    }
  },
  "baic-x35": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1717222980905-7d5f116a8feb?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود متعدد الوظائف مع شاشة عائمة 8 بوصات وأزرار بيانو",
      "titleFr": "Volant multifonction sport et écran flottant 8 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة أوتوماتيكي مع مفاتيح بيانو للتحكم بمكيف الهواء",
      "titleFr": "Levier de vitesse gainé et touches de climatisation style piano"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد رياضية بلونين أسود وأحمر مع فتحة سقف بانورامية كهربائية",
      "titleFr": "Sièges sport bicolores et toit ouvrant panoramique électrique"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تشطيبات داخلية بلون متباين ومقابض أبواب أنيقة",
      "titleFr": "Garnitures de portières soignées avec surpiqûres rouges"
    }
  },
  "baic-x55": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كوكبيت فضائي مع لوحة عدادات رقمية 10.25 بوصة وشاشة ملاحة 10.1 بوصة",
      "titleFr": "Poste de conduite futuriste avec combiné digital et grand écran tactile"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات مدمج ومقابض أبواب كهربائية مخفية تفتح تلقائياً",
      "titleFr": "Console centrale épurée et poignées affleurantes automatisées"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد رياضية متكاملة الرأس مستوحاة من سيارات السباق الخارقة",
      "titleFr": "Sièges baquets sport monoblocs chauffants et ventilés"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "إضاءة ليد تفاعلية تمتد على كامل الأبواب والتابلوه",
      "titleFr": "Lignes d’ambiance LED dynamiques traversant les portières"
    }
  },
  "baic-x7": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ثلاث شاشات رقمية تفاعلية للعدادات والترفيه ومكيف الهواء اللمسي",
      "titleFr": "Triple écran numérique haute définition pour conduite et climatisation"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات كريستالي وشاحن لاسلكي مع مساحة تخزين سفلية معلقة",
      "titleFr": "Sélecteur de vitesse luxueux et vaste rangement inférieur suspendu"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقعد الراكب الأمامي الفاخر مع مسند قدم كهربائي Ottoman وتدليك",
      "titleFr": "Siège passager grand confort avec repose-mollets électrique Ottoman"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "نظام مراقبة السائق بالتعرف على الوجه وكاميرات محيطية 360",
      "titleFr": "Reconnaissance faciale du conducteur et caméras 360° panoramiques"
    }
  },
  "baic-bj40-plus": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كوكبيت BJ40 مع بوصلة ومقياس ميلان التضاريس وشاشة 12.3 بوصة",
      "titleFr": "Poste tout-terrain avec inclinomètre, boussole et écran digital 12.3 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة ZF ألماني بـ 8 سرعات مع محول الدفع الرباعي الثقيل 4L",
      "titleFr": "Boîte automatique ZF 8 rapports et boîte de transfert courte 4L"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "سقف صلب modular قابل للنزول بالكامل لرحلات السفاري المفتوحة",
      "titleFr": "Toit rigide démontable en plusieurs sections pour rouler à ciel ouvert"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "قفص حماية فولاذي متكامل مدمج داخل أعمدة الهيكل ومقابض صلبة",
      "titleFr": "Arceau de sécurité intégré haute résistance et poignées de franchissement"
    }
  },
  "dongfeng-aeolus-shine": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1717222980905-7d5f116a8feb?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشة تحكم عمودية عملاقة قياس 13 بوصة مع مقود سباقات D-cut",
      "titleFr": "Écran vertical géant 13 pouces haute définition et volant sport méplat"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1741311914557-1ca2e9594afd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات إلكتروني مع أوضاع قيادة رياضية متغيرة",
      "titleFr": "Sélecteur de vitesse électronique et modes de conduite dynamiques"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد باكت رياضية بخياطة صفراء متوهجة وشعار Mach Power",
      "titleFr": "Sièges baquets sport avec surpiqûres jaune fluo et broderies"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "تطعيمات داخلية كربونية مع مكبرات صوت رياضية ناصعة",
      "titleFr": "Inserts aspect carbone sur les portières et son puissant"
    }
  },
  "dongfeng-forthing-sx5": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جلدي مريح وشاشة لمسية 8 بوصات مع فتحات تكييف توربينية حمراء",
      "titleFr": "Volant multifonction et aérateurs rouges style turbine aéronautique"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات ميكانيكي بـ 5 سرعات موثوق واقتصادي في الوقود",
      "titleFr": "Levier de vitesse 5 rapports robuste et boîte mécanique fiable"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد قماشية وجلدية مريحة مع مساحة رأس وأرجل رحبة جداً",
      "titleFr": "Habitacle très spacieux avec banquette arrière rabattable 60/40"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أبواب متينة بعزل مطاطي مزدوج لمنع تسرب الغبار والأتربة",
      "titleFr": "Portières avec double joint d’étanchéité anti-poussière"
    }
  },
  "dongfeng-rich-6": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جلدي مع شاشة لمس ملونة 9 بوصات بنظام ملاحة",
      "titleFr": "Volant cuir trois branches et écran tactile multimédia 9 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة ZF أوتوماتيكي بـ 8 سرعات مع قرص الدفع الرباعي 4WD",
      "titleFr": "Boîte automatique ZF 8 vitesses et molette de sélection 4x4"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كابينة مزدوجة فسيحة مع مقاعد جلدية عالية التحمل",
      "titleFr": "Double cabine confortable avec sellerie cuir renforcée"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "صندوق خلفي مصفح ضد الصدأ وحلقات ربط فولاذية قوية",
      "titleFr": "Benne protégée par un revêtement haute résistance et crochets d’arrimage"
    }
  },
  "joyear-s50": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود متعدد الوظائف مع شاشة لمسية 8 بوصات تدعم البلوتوث",
      "titleFr": "Volant multifonction et écran tactile 8 pouces avec connectivité Bluetooth"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات مريح مع حاملات أكواب مزدوجة ومساحة تخزين",
      "titleFr": "Levier de vitesse souple et console pratique avec porte-gobelets"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة مع صندوق أمتعة خلفي عملاق سعة 500 لتر",
      "titleFr": "Sièges confortables et coffre à bagages spacieux de 500 litres"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "أبواب واسعة الزوايا تضمن سهولة ركوب كبار السن والأطفال",
      "titleFr": "Large angle d’ouverture des portières pour un accès facile"
    }
  },
  "joyear-t5-evo": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1710546249825-6ba8beca60f6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "شاشتان متصلتان 10.25 بوصات مع فتحات تكييف توربينية بأسلوب مرسيدس",
      "titleFr": "Double écran panoramique incurvé et aérateurs ronds style turbine luxe"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مبدل سرعات إلكتروني مع فرامل يد كهربائية وزر تشغيل أحمر رياضي",
      "titleFr": "Sélecteur de vitesse électronique et bouton de démarrage sport rouge"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد جلد نابا Nappa مع تدفئة وتدليك وذاكرة لمقعد السائق",
      "titleFr": "Sellerie en cuir Nappa avec massage et mémoire pour le conducteur"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "إضاءة محيطية تفاعلية بـ 64 لوناً وتطعيمات فضية مصقولة",
      "titleFr": "Éclairage d’ambiance personnalisable 64 teintes sur portières"
    }
  },
  "dfsk-glory-500": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1717222980905-7d5f116a8feb?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود جلدي مسطح القاع مع شاشة معلومات لمسية 7 بوصات",
      "titleFr": "Volant cuir méplat avec commandes au volant et écran 7 pouces"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة CVT ناعم ومفتاح مكبح اليد الإلكتروني EPB",
      "titleFr": "Levier de boîte CVT et frein de stationnement électrique"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة بلونين مع فتحة سقف بانورامية كهربائية",
      "titleFr": "Sièges confort bicolores et toit ouvrant panoramique"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ألواح أبواب عازلة ومقابض داخلية مطلية بالكروم",
      "titleFr": "Contre-portes bien ajustées et poignées chromées"
    }
  },
  "dfsk-k01s": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "قمرة قيادة عملية مجهزة بمكيف هواء ومقود كهربائي مساعد EPS",
      "titleFr": "Cabine utilitaire équipée de climatisation et direction assistée"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة يدوي 5 سرعات موفر للوقود مع راديو FM ومنفذ USB",
      "titleFr": "Boîte mécanique 5 vitesses économique avec radio et prise USB"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد فينيل متينة وسهلة التنظيف مخصصة للأعمال الشاقة",
      "titleFr": "Sièges en vinyle haute résistance lavables pour usage intensif"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "صندوق تحميل خلفي بطول 2.7 متر مع جوانب قابلة للفتح من 3 جهات",
      "titleFr": "Plateau ridelles rabattables sur 3 côtés de 2.7 mètres de long"
    }
  },
  "sokon-c01": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "لوحة قيادة بسيطة وعملية مع رؤية أمامية بانورامية واسعة",
      "titleFr": "Poste de conduite avec excellente visibilité panoramique"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة يدوي خفيف ومكيف هواء قوي ملائم للمناخ الصحراوي",
      "titleFr": "Levier mécanique robuste et climatisation tropicalisée"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "كابينة مريحة للراكب والسائق مع مساحات تخزين متعددة",
      "titleFr": "Cabine spacieuse 2 places avec rangements sous planche de bord"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "هيكل صندوق خلفي معالج ضد التآكل والصدأ مخصص للأوزان الثقيلة",
      "titleFr": "Plateau cargo traité anticorrosion avec ridelles amovibles"
    }
  },
  "jmc-vigus": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1633078674059-35d72a5bd19a?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقود متعدد الوظائف مع شاشة لمس مركزية 8 بوصات تدعم الكاميرا",
      "titleFr": "Volant cuir multifonction et écran tactile 8 pouces avec caméra"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة يدوي 5 سرعات مصفح مع ذراع تحويل الدفع الرباعي 4x4",
      "titleFr": "Boîte mécanique renforcée et commande de transmission 4WD"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد مريحة كابينة مزدوجة تتسع لـ 5 ركاب بفرش جلدي سميك",
      "titleFr": "Habitacle double cabine 5 places avec sellerie cuir résistante"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ارتفاع خلوص أرضي 225 مم ودواسات جانبية صلبة للصعود",
      "titleFr": "Garde au sol de 225 mm et marchepieds latéraux en acier tubulaire"
    }
  },
  "jmc-carrying-plus": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "قمرة شاحنة عريضة تتسع لـ 3 مقاعد مع كابينة قابلة للإمالة للصيانة",
      "titleFr": "Large cabine avancée 3 places basculante pour entretien moteur aisé"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة 5 سرعات ثقيل مع فرامل عادم إضافية Exhaust Brake",
      "titleFr": "Boîte mécanique 5 rapports renforcée avec ralentisseur sur échappement"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد قماشية متينة مع مسند ظهر قابل للطي لاستخدامه كطاولة",
      "titleFr": "Banquette 3 places avec dossier central rabattable en tablette"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "نوافذ كهربائية ومرايا رؤية واسعة مزدوجة لتغطية الزوايا الميتة",
      "titleFr": "Vitres électriques et double rétroviseurs grand angle anti-angle mort"
    }
  },
  "tirsam-mini-truck": {
    "steering": {
      "url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "قمرة عملية بسيطة وموثوقة مع مقود معزز ومكيف هواء اختياري",
      "titleFr": "Poste de conduite simple et fonctionnel adapté aux chantiers"
    },
    "gearshift": {
      "url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "ناقل حركة يدوي 5 سرعات موفر في استهلاك الوقود وسهل الصيانة",
      "titleFr": "Boîte manuelle 5 vitesses économique et maintenance aisée"
    },
    "seats": {
      "url": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "مقاعد متينة مغلفة بالفينيل القوي المقاوم للماء والغبار",
      "titleFr": "Sellerie vinyle robuste et étanche pour environnement difficile"
    },
    "door": {
      "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
      "titleAr": "صندوق تحميل من الفولاذ المجلفن المقوى مع حلقات تثبيت جانبية",
      "titleFr": "Plateau benne en acier galvanisé avec crochets d’arrimage soudés"
    }
  }
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
      title: custom?.steering.titleAr || 'المقود واللوحة الرقمية — Steering Wheel & Cockpit',
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

export const VEHICLES_DATA: VehicleItem[] = [
  {
    "id": "fiat-500-hybrid",
    "title": "Fiat 500 Hybrid",
    "subtitle": "1.0 FireFly Hybrid (70 HP) • وكيل فيات الجزائر",
    "brand": "Fiat",
    "model": "500 Hybrid",
    "year": 2024,
    "bodyType": "Hatchback",
    "transmission": "Manual",
    "fuelType": "Hybrid",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 217.9,
    "priceUsd": 16.2,
    "isFavoriteDefault": true,
    "image": "/images/cars/fiat-500-hybrid.jpg",
    "horsepower": 70,
    "engine": "1.0L FireFly 3-Cyl Hybrid",
    "topSpeed": "167 km/h",
    "color": "Rugiada Green Metallic (أخضر ندي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-500x",
    "title": "Fiat 500X",
    "subtitle": "1.4 MultiAir Turbo (140 HP, DCT) • فيات الجزائر",
    "brand": "Fiat",
    "model": "500X",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 343.5,
    "priceUsd": 25.6,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 140,
    "engine": "1.4L MultiAir Turbo 4-Cyl",
    "topSpeed": "190 km/h",
    "color": "Cinema Black (أسود سينما)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-tipo",
    "title": "Fiat Tipo",
    "subtitle": "1.4 Fire (95 HP) / 1.6 E-TorQ • سيدان عائلية",
    "brand": "Fiat",
    "model": "Tipo",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Manual",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 299.5,
    "priceUsd": 22.3,
    "isFavoriteDefault": true,
    "image": "/images/cars/fiat-tipo.jpg",
    "horsepower": 95,
    "engine": "1.4L 16V Fire 4-Cyl",
    "topSpeed": "185 km/h",
    "color": "Colosseo Grey Metallic (رمادي ميتاليك)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-doblo-panorama",
    "title": "Fiat Doblò Panorama",
    "subtitle": "1.6 MultiJet (120 HP) • عائلية وسياحية متعددة الاستخدامات",
    "brand": "Fiat",
    "model": "Doblò Panorama",
    "year": 2024,
    "bodyType": "Van",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 334.9,
    "priceUsd": 24.9,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 120,
    "engine": "1.6L MultiJet Turbo Diesel",
    "topSpeed": "175 km/h",
    "color": "Gelato White (أبيض جيلاتو)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-doblo-van",
    "title": "Fiat Doblò Van",
    "subtitle": "1.6 MultiJet Diesel (90/105 HP) • فوريغون تجاري نفعي",
    "brand": "Fiat",
    "model": "Doblò Van",
    "year": 2024,
    "bodyType": "Van",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 274,
    "priceUsd": 20.4,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 105,
    "engine": "1.6L MultiJet Turbo Diesel",
    "topSpeed": "165 km/h",
    "color": "Bright White (أبيض ناصع)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-scudo",
    "title": "Fiat Scudo",
    "subtitle": "2.0 MultiJet (145 HP) • فوريغون متوسط للأعمال",
    "brand": "Fiat",
    "model": "Scudo",
    "year": 2024,
    "bodyType": "Van",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 397,
    "priceUsd": 29.6,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 145,
    "engine": "2.0L MultiJet Turbo Diesel",
    "topSpeed": "180 km/h",
    "color": "Silver Grey (فضي لامع)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-ducato",
    "title": "Fiat Ducato",
    "subtitle": "2.2 MultiJet 3 (140 HP) • فوريغون كبير للحمولات الثقيلة",
    "brand": "Fiat",
    "model": "Ducato",
    "year": 2024,
    "bodyType": "Van",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 412,
    "priceUsd": 30.7,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 140,
    "engine": "2.2L MultiJet 3 Heavy-Duty Diesel",
    "topSpeed": "160 km/h",
    "color": "Commercial White (أبيض تجاري)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "fiat-titano",
    "title": "Fiat Titano",
    "subtitle": "1.9 Turbo Diesel (150 HP, 4x4) • بيك أب نفعي للطرق الوعرة",
    "brand": "Fiat",
    "model": "Titano",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 429,
    "priceUsd": 32,
    "isFavoriteDefault": true,
    "image": "/images/cars/fiat-titano.jpg",
    "horsepower": 150,
    "engine": "1.9L Turbo Diesel (350 Nm)",
    "topSpeed": "175 km/h",
    "color": "Titanium Metallic Grey (رمادي تيتانيوم)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "chery-tiggo-2-pro",
    "title": "Chery Tiggo 2 Pro",
    "subtitle": "1.5L (107 HP, CVT) • شيري الجزائر",
    "brand": "Chery",
    "model": "Tiggo 2 Pro",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 199,
    "priceUsd": 14.8,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 107,
    "engine": "1.5L DVVT 4-Cyl",
    "topSpeed": "170 km/h",
    "color": "Flame Orange (برتقالي ناري)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "chery-arrizo-5",
    "title": "Chery Arrizo 5",
    "subtitle": "1.5L DVVT (116 HP) • سيدان اقتصادية رحبة",
    "brand": "Chery",
    "model": "Arrizo 5",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 249.9,
    "priceUsd": 18.6,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 116,
    "engine": "1.5L DVVT 16V",
    "topSpeed": "185 km/h",
    "color": "Titanium Silver (فضي تيتانيوم)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "chery-tiggo-4-pro",
    "title": "Chery Tiggo 4 Pro",
    "subtitle": "1.5 Turbo (147 HP, CVT) • كروس أوفر ذكية",
    "brand": "Chery",
    "model": "Tiggo 4 Pro",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 299,
    "priceUsd": 22.3,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 147,
    "engine": "1.5L Turbocharged (210 Nm)",
    "topSpeed": "190 km/h",
    "color": "Carbon Crystal Black (أسود كريستال)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "chery-tiggo-7-pro",
    "title": "Chery Tiggo 7 Pro",
    "subtitle": "1.5 Turbo (156 HP, CVT) • SUV متوسطة فخمة",
    "brand": "Chery",
    "model": "Tiggo 7 Pro",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 459.9,
    "priceUsd": 34.3,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 156,
    "engine": "1.5L Turbo (230 Nm)",
    "topSpeed": "195 km/h",
    "color": "Bordeaux Red (أحمر نبيذي ملوكي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "chery-arrizo-8",
    "title": "Chery Arrizo 8",
    "subtitle": "1.6 TGDI (197 HP, 7DCT) • سيدان فاخرة فلاجشيب",
    "brand": "Chery",
    "model": "Arrizo 8",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 484.9,
    "priceUsd": 36.1,
    "isFavoriteDefault": true,
    "image": "/images/cars/chery-arrizo-8.jpg",
    "horsepower": 197,
    "engine": "1.6L TGDI Kunpeng (290 Nm)",
    "topSpeed": "210 km/h",
    "color": "Emerald Green (أخضر زمردي فاخر)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "chery-tiggo-8-pro",
    "title": "Chery Tiggo 8 Pro",
    "subtitle": "1.6 TGDI (197 HP) / 2.0 TGDI • 7 مقاعد عائلية فاخرة",
    "brand": "Chery",
    "model": "Tiggo 8 Pro",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 539.9,
    "priceUsd": 40.2,
    "isFavoriteDefault": true,
    "image": "/images/cars/chery-tiggo-8-pro.jpg",
    "horsepower": 197,
    "engine": "1.6L TGDI (290 Nm, 7-Speed DCT)",
    "topSpeed": "205 km/h",
    "color": "Sapphire Blue Metallic (أزرق ياقوتي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "geely-gx3-pro",
    "title": "Geely GX3 Pro",
    "subtitle": "1.5L (102 HP, CVT) • جيلي الجزائر (Sodivem)",
    "brand": "Geely",
    "model": "GX3 Pro",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 197,
    "priceUsd": 14.7,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 102,
    "engine": "1.5L DVVT 4-Cylinder",
    "topSpeed": "170 km/h",
    "color": "Amber Gold (ذهبي عنبري)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "geely-emgrand",
    "title": "Geely Emgrand",
    "subtitle": "1.5L BMA (102 HP, CVT) • سيدان راقية هادئة",
    "brand": "Geely",
    "model": "Emgrand",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 289.5,
    "priceUsd": 21.6,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 102,
    "engine": "1.5L 4-Cylinder BMA Architecture",
    "topSpeed": "180 km/h",
    "color": "Sky Blue (أزرق سماوي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "geely-coolray",
    "title": "Geely Coolray Sport",
    "subtitle": "1.5 Turbo (174 HP, 7DCT) • الرياضية الأوسع انتشاراً",
    "brand": "Geely",
    "model": "Coolray",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 336.2,
    "priceUsd": 25.1,
    "isFavoriteDefault": true,
    "image": "/images/cars/geely-coolray.jpg",
    "horsepower": 174,
    "engine": "1.5L Turbo 4-Cylinder BHE15 (290 Nm)",
    "topSpeed": "200 km/h",
    "color": "Blazing Orange (برتقالي سباق متوهج)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "geely-starray",
    "title": "Geely Starray",
    "subtitle": "2.0 Turbo (218 HP, 7DCT) • منصة فولفو CMA الفاخرة",
    "brand": "Geely",
    "model": "Starray",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 495,
    "priceUsd": 36.9,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 218,
    "engine": "2.0L Drive-E Turbo (325 Nm, CMA Platform)",
    "topSpeed": "215 km/h",
    "color": "Interstellar Silver (فضي كوني)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "opel-mokka",
    "title": "Opel Mokka",
    "subtitle": "1.2 Turbo (130 HP, 8AT) • أوبل الجزائر (Groupe Halil)",
    "brand": "Opel",
    "model": "Mokka",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 381.9,
    "priceUsd": 28.5,
    "isFavoriteDefault": true,
    "image": "/images/cars/opel-mokka.jpg",
    "horsepower": 130,
    "engine": "1.2L PureTech Turbo (230 Nm)",
    "topSpeed": "200 km/h",
    "color": "Mamba Green (أخضر مامبا المميز)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "opel-astra",
    "title": "Opel Astra",
    "subtitle": "1.2 Turbo (130 HP, 8AT) • هاتشباك ألمانية ديناميكية",
    "brand": "Opel",
    "model": "Astra",
    "year": 2024,
    "bodyType": "Hatchback",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 431.9,
    "priceUsd": 32.2,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 130,
    "engine": "1.2L Direct Injection Turbo (8-Speed Automatic)",
    "topSpeed": "210 km/h",
    "color": "Kult Yellow (أصفر كولت متألق)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "opel-grandland",
    "title": "Opel Grandland",
    "subtitle": "1.6 Turbo (165 HP, AT) • SUV عائلية ألمانية متكاملة",
    "brand": "Opel",
    "model": "Grandland",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 467.9,
    "priceUsd": 34.9,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 165,
    "engine": "1.6L Turbocharged EcoTec",
    "topSpeed": "215 km/h",
    "color": "Diamond Black (أسود ماسي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jetour-x70",
    "title": "Jetour X70",
    "subtitle": "1.5 Turbo (156 HP, DCT) • جيتور 7 مقاعد العائلية",
    "brand": "Jetour",
    "model": "X70",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 299,
    "priceUsd": 22.3,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 156,
    "engine": "1.5L Turbo 4-Cyl (230 Nm)",
    "topSpeed": "185 km/h",
    "color": "Polar White (أبيض قطبي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jetour-x70-plus",
    "title": "Jetour X70 Plus",
    "subtitle": "1.6 TGDI (197 HP, 7DCT) • نسخة مطورة 7 مقاعد",
    "brand": "Jetour",
    "model": "X70 Plus",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 425,
    "priceUsd": 31.7,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 197,
    "engine": "1.6L TGDI (290 Nm, 7-Speed DCT)",
    "topSpeed": "195 km/h",
    "color": "Space Silver (فضي فضائي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jetour-dashing",
    "title": "Jetour Dashing",
    "subtitle": "1.6 TGDI (197 HP, 7DCT) • التصميم المستقبلي الرياضي",
    "brand": "Jetour",
    "model": "Dashing",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 495,
    "priceUsd": 36.9,
    "isFavoriteDefault": true,
    "image": "/images/cars/jetour-dashing.jpg",
    "horsepower": 197,
    "engine": "1.6L TGDI Kunpeng (290 Nm)",
    "topSpeed": "205 km/h",
    "color": "Satin Pearl White (أبيض لؤلؤي ساتان)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jetour-x90-plus",
    "title": "Jetour X90 Plus",
    "subtitle": "2.0 TGDI (254 HP, 390 Nm) • الفخامة العائلية الكبرى",
    "brand": "Jetour",
    "model": "X90 Plus",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 530,
    "priceUsd": 39.5,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 254,
    "engine": "2.0L TGDI Turbo (390 Nm Torque)",
    "topSpeed": "210 km/h",
    "color": "Midnight Blue (أزرق منتصف الليل)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jetour-t2",
    "title": "Jetour T2 (Traveler)",
    "subtitle": "2.0T 4x4 (254 HP, 390 Nm) • وحش الطرق الوعرة والرمال",
    "brand": "Jetour",
    "model": "T2",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 970,
    "priceUsd": 72.3,
    "isFavoriteDefault": true,
    "image": "/images/cars/jetour-t2.jpg",
    "horsepower": 254,
    "engine": "2.0L Turbo Kunpeng (390 Nm, BorgWarner XWD 4x4)",
    "topSpeed": "197 km/h",
    "color": "Desert Sand Matte (بيج رملي صحراوي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "baic-u5-plus",
    "title": "BAIC U5 Plus",
    "subtitle": "1.5L (113 HP, CVT) • بايك الجزائر",
    "brand": "BAIC",
    "model": "U5 Plus",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 269.9,
    "priceUsd": 20.1,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 113,
    "engine": "1.5L 4-Cylinder naturally aspirated",
    "topSpeed": "180 km/h",
    "color": "Glacier Silver (فضي جليدي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "baic-x35",
    "title": "BAIC X35",
    "subtitle": "1.5 Turbo (150 HP) • كروس أوفر مدمجة وعملية",
    "brand": "BAIC",
    "model": "X35",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 275,
    "priceUsd": 20.5,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 150,
    "engine": "1.5L Turbo (210 Nm)",
    "topSpeed": "180 km/h",
    "color": "Imperial Blue (أزرق إمبراطوري)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "baic-x55",
    "title": "BAIC X55 (Beijing)",
    "subtitle": "1.5 Turbo Magic Core (188 HP, 7DCT) • الجيل المستقبلي",
    "brand": "BAIC",
    "model": "X55",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 419.9,
    "priceUsd": 31.3,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 188,
    "engine": "1.5L Turbo Magic Core (305 Nm)",
    "topSpeed": "200 km/h",
    "color": "Cyber Yellow (أصفر سايبر متألق)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "baic-x7",
    "title": "BAIC X7",
    "subtitle": "1.5 Turbo (188 HP, 7DCT) • SUV فخمة رحبة",
    "brand": "BAIC",
    "model": "X7",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 499.9,
    "priceUsd": 37.3,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 188,
    "engine": "1.5L Turbo (275 Nm, 7-Speed DCT)",
    "topSpeed": "205 km/h",
    "color": "Basalt Black (أسود بازلتي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "baic-bj40-plus",
    "title": "BAIC BJ40 Plus",
    "subtitle": "2.0 Turbo 4x4 (225 HP, 8AT) • أسطورة الكثبان والصحراء",
    "brand": "BAIC",
    "model": "BJ40 Plus",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 1050,
    "priceUsd": 78.3,
    "isFavoriteDefault": true,
    "image": "/images/cars/baic-bj40-plus.jpg",
    "horsepower": 225,
    "engine": "2.0L Turbocharged (380 Nm, ZF 8-Speed 4x4)",
    "topSpeed": "180 km/h",
    "color": "Flame Red (أحمر ناري مع سقف أسود قابل للإزالة)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "dongfeng-aeolus-shine",
    "title": "Dongfeng Aeolus Shine",
    "subtitle": "1.5 Mach Power (190 HP, DCT) • سيدان رياضية شرسة",
    "brand": "Dongfeng",
    "model": "Aeolus Shine",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 258.5,
    "priceUsd": 19.3,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 190,
    "engine": "1.5L Mach Power Turbo (300 Nm)",
    "topSpeed": "210 km/h",
    "color": "Gunmetal Grey (رمادي حديدي مع حواف صفراء)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "dongfeng-forthing-sx5",
    "title": "Dongfeng Forthing SX5",
    "subtitle": "1.6L Mitsubishi (122 HP) • كروس أوفر عائلية متينة",
    "brand": "Dongfeng",
    "model": "Forthing SX5",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Manual",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 290,
    "priceUsd": 21.6,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 122,
    "engine": "1.6L Mitsubishi 4A92 MIVEC",
    "topSpeed": "175 km/h",
    "color": "Graphite Grey (رمادي جرافيت)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "dongfeng-rich-6",
    "title": "Dongfeng Rich 6",
    "subtitle": "2.3 Turbo Diesel (163 HP, 4x4) • منصة نيسان نافارا اليابانية",
    "brand": "Dongfeng",
    "model": "Rich 6",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Automatic",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 375,
    "priceUsd": 28,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 163,
    "engine": "2.3L M9T Turbo Diesel (Renault-Nissan alliance 380 Nm)",
    "topSpeed": "175 km/h",
    "color": "Desert Sand (بيج رملي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "joyear-s50",
    "title": "Joyear S50 (DF Joyear)",
    "subtitle": "1.6L Mitsubishi (122 HP) • سيدان اقتصادية واسعة",
    "brand": "Joyear",
    "model": "S50",
    "year": 2024,
    "bodyType": "Sedan",
    "transmission": "Manual",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 209,
    "priceUsd": 15.6,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 122,
    "engine": "1.6L Mitsubishi MIVEC 4-Cylinder",
    "topSpeed": "180 km/h",
    "color": "Pure White (أبيض ناصع)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "joyear-t5-evo",
    "title": "Joyear T5 Evo",
    "subtitle": "1.5 Turbo Mitsubishi (197 HP, 7DCT) • طابع البورش ماكان الفاخر",
    "brand": "Joyear",
    "model": "T5 Evo",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 375,
    "priceUsd": 28,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 197,
    "engine": "1.5L Turbo Mitsubishi 4A95TD (285 Nm, Magna 7DCT)",
    "topSpeed": "205 km/h",
    "color": "Agate Green (أخضر عقيقي فخم)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "dfsk-glory-500",
    "title": "DFSK Glory 500",
    "subtitle": "1.5L (115 HP, CVT) • دي إف إس كي كروس أوفر العائلية",
    "brand": "DFSK",
    "model": "Glory 500",
    "year": 2024,
    "bodyType": "Crossover",
    "transmission": "Automatic",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 288,
    "priceUsd": 21.5,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 115,
    "engine": "1.5L SFG15A 4-Cylinder",
    "topSpeed": "175 km/h",
    "color": "Candy White (أبيض ناصع)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "dfsk-k01s",
    "title": "DFSK K01S Mini Truck",
    "subtitle": "1.2L (88 HP) • شاحنة نفعية خفيفة حمولة 1 طن",
    "brand": "DFSK",
    "model": "K01S",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Manual",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 162,
    "priceUsd": 12.1,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 88,
    "engine": "1.2L 4-Cylinder Gasoline (115 Nm)",
    "topSpeed": "130 km/h",
    "color": "Work White (أبيض تجاري)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "sokon-c01",
    "title": "Sokon C01 / C02 Mini Truck",
    "subtitle": "1.2L (88 HP) • شاحنة نفعية للمدن والمناطق الضيقة",
    "brand": "Sokon",
    "model": "C01",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Manual",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 162,
    "priceUsd": 12.1,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 88,
    "engine": "1.2L Gasoline Engine (Euro 5)",
    "topSpeed": "125 km/h",
    "color": "Solid White (أبيض متين)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jmc-vigus",
    "title": "JMC Vigus",
    "subtitle": "2.5 Turbo Diesel Isuzu (140 HP, 4x4) • بيك أب مهام شاقة",
    "brand": "JMC",
    "model": "Vigus",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Ouargla",
    "showroomNameAr": "صالة ورقلة",
    "availableNow": true,
    "priceDzdCentimes": 329,
    "priceUsd": 24.5,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 140,
    "engine": "2.5L Turbo Diesel Isuzu Tech (315 Nm)",
    "topSpeed": "170 km/h",
    "color": "Desert Sand Khaki (رملي صحراوي كَاكي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "jmc-carrying-plus",
    "title": "JMC Carrying Plus",
    "subtitle": "2.8 Turbo Diesel Isuzu (115 HP) • شاحنة نقل بضائع 3.5 إلى 5 طن",
    "brand": "JMC",
    "model": "Carrying Plus",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Manual",
    "fuelType": "Diesel",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Alger",
    "showroomNameAr": "صالة العاصمة (المحمدية)",
    "availableNow": true,
    "priceDzdCentimes": 389,
    "priceUsd": 29,
    "isFavoriteDefault": false,
    "image": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 115,
    "engine": "2.8L Turbo Diesel Isuzu 4JB1 Tech (280 Nm)",
    "topSpeed": "120 km/h",
    "color": "Industrial White (أبيض صناعي)",
    "customsRegime": "وكيل معتمد (رسمي)"
  },
  {
    "id": "tirsam-mini-truck",
    "title": "Tirsam Mini Truck",
    "subtitle": "1.2L (85 HP) • شاحنة نفعية تيرصام الجزائرية",
    "brand": "Tirsam",
    "model": "Mini Truck SC/DC",
    "year": 2024,
    "bodyType": "Pickup",
    "transmission": "Manual",
    "fuelType": "Gasoline",
    "status": "in_stock",
    "statusLabelAr": "متوفرة بالمعرض",
    "statusLabelFr": "En Stock",
    "showroom": "Jijel",
    "showroomNameAr": "صالة جيجل (بوالرمل)",
    "availableNow": true,
    "priceDzdCentimes": 155,
    "priceUsd": 11.5,
    "isFavoriteDefault": true,
    "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    "horsepower": 85,
    "engine": "1.2L 4-Cylinder Gasoline",
    "topSpeed": "120 km/h",
    "color": "White (أبيض جزائري معتمد)",
    "customsRegime": "وكيل معتمد (رسمي)"
  }
];

// Automatically populate the 5 gallery views on all vehicles
VEHICLES_DATA.forEach((v) => {
  v.gallery = getVehicleGallery(v);
});
