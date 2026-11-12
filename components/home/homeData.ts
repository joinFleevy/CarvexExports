export type HomeLang = 'en' | 'fr' | 'ar';

export const FORGE_MEDIA = {
  heroSilk:
    'https://cdn.forgeautomotive.media/images/ed72g2cx/production/9abc90c4afdf0c7421b6f70fb1cdc40b77a98960-2880x1802.jpg?auto=format&fit=max&w=1920',
  craftGlove:
    'https://cdn.forgeautomotive.media/images/ed72g2cx/production/4897086a30f50cb937f2c67d70e2f5648a903aed-2976x2236.jpg?auto=format&fit=max&w=1920',
  fleetStudio:
    'https://cdn.forgeautomotive.media/images/ed72g2cx/production/35c93330a1cd16aa426b7bded4ad225113f7b6db-3840x2160.png?auto=format&fit=max&w=1920',
  fleetWet:
    'https://cdn.forgeautomotive.media/images/ed72g2cx/production/2bd7f1455a34d387b7cab13cfe092e2bd89f49fb-2880x1868.jpg?auto=format&fit=max&w=1920',
  footerTrio:
    'https://cdn.forgeautomotive.media/images/ed72g2cx/production/8234f422e53117f9ee574a826d50902f5e4272b5-2880x1800.jpg?auto=format&fit=max&w=1920&q=85',
} as const;

export const MARQUEE_LOGOS: { src: string; alt: string; width: number; height: number }[] = [
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/f8d59368625dc7aff0ad2e12090b4d21de46a6db-120x28.svg',
    alt: 'Aston Martin Logo',
    width: 120,
    height: 28,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/ee044cb181426da11c16900ce4913af0f62d75be-120x42.svg',
    alt: 'Audi Logo',
    width: 120,
    height: 42,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/1bbcee87beeb24ad727d42d93b98c616db92f466-120x38.svg',
    alt: 'Bentley Logo',
    width: 120,
    height: 38,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/38ec1f867d581d9d61ddb5eab753ba8c1c5389f6-120x10.svg',
    alt: 'Jaguar Logo',
    width: 120,
    height: 10,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/761e4964ae0fe091a0b91929b167daf8feea9d43-52x60.svg',
    alt: 'Lamborghini Logo',
    width: 52,
    height: 60,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/904b299c410141aa875f4f014aeb013989ecc835-115x60.svg',
    alt: 'Land Rover Logo',
    width: 115,
    height: 60,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/bda8edd2202c68fcd1843e37e49ff9a5a3a9051d-60x60.svg',
    alt: 'Lotus Logo',
    width: 60,
    height: 60,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/961ebcaf23926504a5912fd0c14e20ebf2956433-120x8.svg',
    alt: 'Lucid Logo',
    width: 120,
    height: 8,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/3ac4c0976fcecfca013643bceb42a8d5a734818c-120x60.svg',
    alt: 'Maserati Logo',
    width: 120,
    height: 60,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/a0a838a315f5e6927b402fa8d468c5d75b539239-120x18.svg',
    alt: 'McLaren Logo',
    width: 120,
    height: 18,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/42baba0d1be5d9f4e6be490dbc40638566c91808-60x60.svg',
    alt: 'Mercedes Logo',
    width: 60,
    height: 60,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/d72b08898e5351c0fb83bb1ffd677159ab18cf3b-120x27.svg',
    alt: 'Polestar Logo',
    width: 120,
    height: 27,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/6fdc1f00f6829b92a2c42d3f5af89f314b95fea9-120x8.svg',
    alt: 'Porsche Logo',
    width: 120,
    height: 8,
  },
  {
    src: 'https://cdn.forgeautomotive.media/images/ed72g2cx/production/546ecc843c42f8ec4eacc9d941b45cc774f4a8a7-49x60.svg',
    alt: 'Rolls Royce Logo',
    width: 49,
    height: 60,
  },
];

export interface ShowroomBranch {
  id: 'alger' | 'jijel' | 'ouargla';
  code: string;
  city: { en: string; fr: string; ar: string };
  district: { en: string; fr: string; ar: string };
  role: { en: string; fr: string; ar: string };
  hours: { en: string; fr: string; ar: string };
  phones: string[];
  whatsapp: string;
  apiValue: string;
}

export const SHOWROOMS: ShowroomBranch[] = [
  {
    id: 'alger',
    code: '01',
    city: { en: 'Algiers', fr: 'Alger', ar: 'الجزائر' },
    district: {
      en: 'Mohammadia · Pins Maritimes',
      fr: 'Mohammadia · Pins Maritimes',
      ar: 'المحمدية · الصنوبر البحري',
    },
    role: {
      en: 'Central Showroom & Contracts HQ',
      fr: 'Showroom Central & Direction Contrats',
      ar: 'صالة الواجهة والعقود المركزية',
    },
    hours: {
      en: 'Saturday to Thursday, 9am – 6pm',
      fr: 'Samedi à Jeudi, 9h – 18h',
      ar: 'السبت إلى الخميس، 09:00 – 18:00',
    },
    phones: ['0779 05 54 89', '0557 05 38 14'],
    whatsapp: '213779055489',
    apiValue: 'الجزائر العاصمة (المحمدية)',
  },
  {
    id: 'jijel',
    code: '02',
    city: { en: 'Jijel', fr: 'Jijel', ar: 'جيجل' },
    district: {
      en: 'Boulrimal · Port Djen Djen Hub',
      fr: 'Boulrimal · Axe Port Djen Djen',
      ar: 'بوالرمل · محور ميناء جن جن',
    },
    role: {
      en: 'Maritime Reception & Port Clearance',
      fr: 'Réception Maritime & Dédouanement',
      ar: 'مركز الاستقبال والتخليص الجمركي',
    },
    hours: {
      en: 'Saturday to Thursday, 9am – 6pm',
      fr: 'Samedi à Jeudi, 9h – 18h',
      ar: 'السبت إلى الخميس، 09:00 – 18:00',
    },
    phones: ['0660 65 62 74', '0554 15 41 63'],
    whatsapp: '213660656274',
    apiValue: 'جيجل (بوالرمل)',
  },
  {
    id: 'ouargla',
    code: '03',
    city: { en: 'Ouargla', fr: 'Ouargla', ar: 'ورقلة' },
    district: {
      en: 'Centre-ville · Hai Ennasr',
      fr: 'Centre-ville · Hai Ennasr',
      ar: 'وسط المدينة · حي النصر',
    },
    role: {
      en: 'Southern Region & Energy Sector Desk',
      fr: 'Pôle Sud & Secteur Énergie',
      ar: 'صالة الجنوب وقطاع الطاقة',
    },
    hours: {
      en: 'Saturday to Thursday, 9am – 6pm',
      fr: 'Samedi à Jeudi, 9h – 18h',
      ar: 'السبت إلى الخميس، 09:00 – 18:00',
    },
    phones: ['0660 41 40 34', '0661 46 67 27'],
    whatsapp: '213660414034',
    apiValue: 'ورقلة (حي النصر)',
  },
];

export interface ConditionStage {
  step: string;
  title: { en: string; fr: string; ar: string };
  badge: { en: string; fr: string; ar: string };
  summary: { en: string; fr: string; ar: string };
  details: { en: string[]; fr: string[]; ar: string[] };
}

export const IMPORT_CONDITIONS: ConditionStage[] = [
  {
    step: '01',
    title: {
      en: "Reservation & L'Arbon",
      fr: "Réservation & Reçu d'Arbon",
      ar: 'الحجز وتوثيق العربون',
    },
    badge: {
      en: '20M – 50M Centimes',
      fr: '20M – 50M Centimes',
      ar: '20 إلى 50 مليون سنتيم',
    },
    summary: {
      en: 'Our branch advisor prepares your stamped Bon de Commande and Reçu d’Arbon locking your VIN, trim, and delivery timeline.',
      fr: 'Notre conseiller établit le Bon de Commande cacheté et le Reçu d’Arbon figeant votre VIN, finition et délai.',
      ar: 'توثيق عقد الطلب ووصول العربون المختوم لتثبيت رقم الهيكل، الطراز، وأجل التسليم في الصالة.',
    },
    details: {
      en: [
        '20M – 50M Centimes deposit in showroom cash or certified bank cheque',
        'Official stamped Reçu d’Arbon with vehicle VIN and maximum delivery deadline',
        'Zero hidden middlemen — fixed DZD pricing from day one',
      ],
      fr: [
        'Acompte de 20M à 50M Centimes en espèces ou chèque de banque certifié',
        'Reçu d’Arbon officiel cacheté mentionnant VIN et délai maximum',
        'Zéro intermédiaire caché — tarification claire en Dinars dès le premier jour',
      ],
      ar: [
        'دفع عربون بين 20 و50 مليون سنتيم نقداً بالصالة أو بشيك بنكي معتمد',
        'وصل عربون رسمي مختوم يحمل رقم الهيكل وأقصى مدة للتسليم',
        'أسعار شفافة بالدينار الجزائري دون أي رسوم خفية',
      ],
    },
  },
  {
    step: '02',
    title: {
      en: 'Maritime Freight & Bill of Lading',
      fr: 'Expédition & Connaissement B/L',
      ar: 'الشحن البحري وبوليصة B/L',
    },
    badge: {
      en: '40% – 45% Tranche',
      fr: 'Tranche 40% – 45%',
      ar: 'دفعة 40% – 45%',
    },
    summary: {
      en: 'Insured 40HQ container loading via COSCO, CMA CGM, or Maersk — unlocking real-time vessel & PIN tracking on our portal.',
      fr: 'Chargement assuré en conteneur 40HQ via COSCO, CMA CGM ou Maersk — activant le suivi en temps réel par code PIN.',
      ar: 'شحن مؤمن داخل حاويات COSCO وCMA CGM مع استلام رقم الحاوية ورمز PIN للمتابعة الحية.',
    },
    details: {
      en: [
        '40% – 45% CIF freight tranche settled upon official Bill of Lading issuance',
        'Container number, vessel name & 4-digit PIN unlocked on /track',
        'Full marine insurance coverage until arrival at Port Djen Djen or Algiers',
      ],
      fr: [
        'Tranche CIF de 40% à 45% réglée à l’émission du connaissement B/L',
        'Numéro de conteneur, nom du navire et code PIN à 4 chiffres sur /track',
        'Assurance maritime intégrale jusqu’au port de Djen Djen ou Alger',
      ],
      ar: [
        'تسديد دفعة الشحن (40% – 45%) عند صدور بوليصة الشحن البحرية الرسمية',
        'متابعة فورية لمسار السفينة والحاوية عبر بوابة التتبع برمز PIN',
        'تأمين بحري شامل حتى ميناء جن جن أو ميناء الجزائر',
      ],
    },
  },
  {
    step: '03',
    title: {
      en: 'Port Clearance & Decree 23-74',
      fr: 'Dédouanement & Décret 23-74',
      ar: 'التخليص الجمركي والمرسوم 23-74',
    },
    badge: {
      en: '50% Off / Moudjahidine',
      fr: '-50% / Moudjahidine',
      ar: 'تخفيض 50% / مجاهدين',
    },
    summary: {
      en: 'Our licensed customs broker handles port discharge, Mines conformity inspection, and Quittance D10 clearance.',
      fr: 'Notre transitaire agréé gère le débarquement, le contrôle des Mines et la Quittance D10.',
      ar: 'يتكفل وكيل العبور المعتمد بإنزال الحاوية، فحص مهندس المناجم، واستخراج الوصل الجمركي D10.',
    },
    details: {
      en: [
        '≤ 1,800 cc petrol & hybrid vehicles qualify for the 50% customs reduction',
        '100% customs & VAT exemption under valid Licence Moudjahidine',
        'Strict compliance with Algerian Executive Decree 23-74 (0 km & < 3 years)',
      ],
      fr: [
        'Moteurs ≤ 1 800 cc éligibles à l’abattement douanier de 50%',
        'Exonération totale douane & TVA sous Licence Moudjahidine valide',
        'Conformité stricte au Décret Exécutif 23-74 (0 km & moins de 3 ans)',
      ],
      ar: [
        'تخفيض 50% من الحقوق الجمركية لمحركات ≤ 1800 سم³',
        'إعفاء كلي 100% لحاملي رخصة المجاهدين الصالحة',
        'مطابقة تامة لأحكام المرسوم التنفيذي 23-74 للسيارات الجديدة وأقل من 3 سنوات',
      ],
    },
  },
  {
    step: '04',
    title: {
      en: 'Inspection, Balance & Carte Grise',
      fr: 'Inspection, Solde & Carte Grise',
      ar: 'المعاينة والملف القاعدي',
    },
    badge: {
      en: '25% – 30% Balance',
      fr: 'Solde 25% – 30%',
      ar: 'الرصيد المتبقي 25% – 30%',
    },
    summary: {
      en: 'Final showroom walkthrough, paint & odometer check, key handover, and complete Dossier de Base for your Carte Grise.',
      fr: 'Vérification physique au showroom, remise des deux clés et Dossier de Base complet pour votre Carte Grise.',
      ar: 'معاينة ميدانية للسيارة في الصالة وتسديد الرصيد مع تسليم المفاتيح والملف القاعدي الكامل.',
    },
    details: {
      en: [
        'Physical paintwork & 000 km inspection before settling the final 25% – 30%',
        'Dual original smart keys + official stamped Reçu de Solde',
        'Full Dossier de Base (Conformity, Yellow Card, D10, Invoice) ready for Carte Grise',
      ],
      fr: [
        'Contrôle carrosserie & compteur (000 km) avant règlement du solde final',
        'Deux clés intelligentes d’origine et Reçu de Solde officiel',
        'Dossier de Base complet prêt pour immatriculation Carte Grise immédiate',
      ],
      ar: [
        'فحص الطلاء والعداد قبل تسديد الرصيد المتبقي (25% – 30%)',
        'استلام مفتاحي السيارة الأصليين ووصل المخالصة التامة',
        'الملف القاعدي الأصلي جاهز لاستخراج البطاقة الرمادية باسم المشتري فوراً',
      ],
    },
  },
];

export const HOME_COPY = {
  en: {
    navLabel: 'Navigate',
    closeLabel: 'Close',
    skipToContent: 'Skip to content',
    heroTitleLines: ['Every Vehicle', 'Starts With', 'Direct Trust'],
    heroCta: 'Start The Conversation',
    cardPhoneLabel: 'PHONE',
    cardCatalogLabel: 'INVENTORY',
    cardCatalogTitle: 'Explore Live Stock',
    cardCatalogSub: '0 km & < 3 years vehicles across 3 Algerian showrooms',
    cardTrackLabel: 'TRACKING',
    cardTrackTitle: 'Track Your Container',
    cardTrackSub: 'Follow your Bill of Lading & Djen Djen clearance by PIN',
    cardVisitLabel: 'VISIT US',
    cardVisitTitle: 'Viewings By Appointment',
    formHeadingTop: 'Define Your',
    formHeadingAccent: 'Specification',
    formDesc:
      'Share your vehicle criteria and preferred Algerian showroom so our advisors can prepare exact landed DZD pricing and contract terms.',
    formNameLabel: 'FULL NAME',
    formNamePlaceholder: 'Karim Benali',
    formPhoneLabel: 'PHONE NUMBER',
    formPhonePlaceholder: '0550 12 34 56',
    formShowroomLabel: 'PREFERRED SHOWROOM',
    formRegimeLabel: 'IMPORT & CUSTOMS REGIME',
    formRegimeOptions: [
      { id: 'Sur Stock (0 km)', label: 'Sur Stock (0 km)' },
      { id: 'Sur Commande (Factory Order)', label: 'Sur Commande' },
      { id: 'Licence Moudjahidine', label: 'Licence Moudjahidine' },
    ],
    formMessageLabel: 'VEHICLE & SPECIFICATION',
    formMessageOptional: 'OPTIONAL',
    formMessagePlaceholder: 'Tell us which model, trim or budget you are looking for…',
    formSubmit: 'Submit Enquiry',
    formSending: 'Submitting…',
    formError: 'Please enter your full name and valid phone number.',
    formSuccessTitle: 'Specification Received',
    formSuccessBody:
      'Your request has been dispatched directly to the selected Carvex showroom director.',
    formWhatsapp: 'Continue on WhatsApp',
    processLine1: 'A Considered Process',
    processLine2: 'Built Around Trust',
    processCalcLink: 'Customs Calculator',
    showcase1Title: 'Available Stock',
    showcase1Body:
      'Vehicles available for immediate delivery or factory commission — transparent Million Centimes pricing across Algiers, Jijel, and Ouargla.',
    showcase1Cta: 'Browse Stock',
    showcase2Title: 'Live Tracking',
    showcase2Body:
      'Follow your container number, Bill of Lading, vessel arrival, and port clearance directly with your phone number and 4-digit PIN.',
    showcase2Cta: 'Track Shipment',
    footerEyebrow: 'ARE YOU READY TO',
    footerLine1: 'Refuse',
    footerLine2: 'Ordinary',
    footerCta: 'Explore Vehicles',
    footerBackTop: 'Back To Top',
    menuItems: [
      { label: 'Home', href: '/', idx: '01', preview: 'heroSilk' as const },
      { label: 'Vehicles', href: '/vehicles', idx: '02', preview: 'fleetStudio' as const },
      { label: 'Tracking', href: '/track', idx: '03', preview: 'fleetWet' as const },
      { label: 'Calculator', href: '/calculator', idx: '04', preview: 'craftGlove' as const },
      { label: 'Showrooms', href: '/showrooms', idx: '05', preview: 'footerTrio' as const },
    ],
    menuSecondary: [
      { label: 'Specification', href: '#commission' },
      { label: 'Process', href: '#process' },
      { label: 'Documents', href: '/documents' },
    ],
  },
  fr: {
    navLabel: 'Menu',
    closeLabel: 'Fermer',
    skipToContent: 'Aller au contenu',
    heroTitleLines: ['Chaque Projet', 'Commence Par', 'La Confiance'],
    heroCta: 'Demander Un Devis',
    cardPhoneLabel: 'TÉLÉPHONE',
    cardCatalogLabel: 'CATALOGUE',
    cardCatalogTitle: 'Explorer Le Stock',
    cardCatalogSub: 'Véhicules 0 km & -3 ans dans nos 3 showrooms',
    cardTrackLabel: 'SUIVI B/L',
    cardTrackTitle: 'Suivre Votre Conteneur',
    cardTrackSub: 'Suivi maritime & dédouanement Djen Djen par code PIN',
    cardVisitLabel: 'SHOWROOMS',
    cardVisitTitle: 'Visites Sur Rendez-Vous',
    formHeadingTop: 'Définissez Votre',
    formHeadingAccent: 'Spécification',
    formDesc:
      'Partagez le modèle souhaité et votre showroom préféré pour recevoir un devis complet en Dinars et nos conditions officielles.',
    formNameLabel: 'NOM COMPLET',
    formNamePlaceholder: 'Karim Benali',
    formPhoneLabel: 'NUMÉRO DE TÉLÉPHONE',
    formPhonePlaceholder: '0550 12 34 56',
    formShowroomLabel: 'SHOWROOM SOUHAITÉ',
    formRegimeLabel: 'FORMULE & RÉGIME DOUANIER',
    formRegimeOptions: [
      { id: 'Sur Stock (0 km)', label: 'Sur Stock (0 km)' },
      { id: 'Sur Commande (Factory Order)', label: 'Sur Commande' },
      { id: 'Licence Moudjahidine', label: 'Licence Moudjahidine' },
    ],
    formMessageLabel: 'MODÈLE & PRÉCISIONS',
    formMessageOptional: 'OPTIONNEL',
    formMessagePlaceholder: 'Modèle, finition ou budget estimé…',
    formSubmit: 'Envoyer La Demande',
    formSending: 'Envoi…',
    formError: 'Veuillez saisir votre nom complet et votre numéro de téléphone.',
    formSuccessTitle: 'Demande Enregistrée',
    formSuccessBody:
      'Votre demande a été transmise instantanément au responsable du showroom sélectionné.',
    formWhatsapp: 'Ouvrir WhatsApp Direct',
    processLine1: 'Un Processus Maîtrisé',
    processLine2: 'Construit Pour Vous',
    processCalcLink: 'Calculateur Douane',
    showcase1Title: 'Stock Disponible',
    showcase1Body:
      'Véhicules prêts pour livraison immédiate ou sur commande — tarifs transparents en Millions de Centimes à Alger, Jijel et Ouargla.',
    showcase1Cta: 'Voir Le Stock',
    showcase2Title: 'Suivi Maritime',
    showcase2Body:
      'Suivez votre conteneur, connaissement B/L et dédouanement en temps réel avec votre téléphone et code PIN à 4 chiffres.',
    showcase2Cta: 'Suivre Ma Commande',
    footerEyebrow: 'PRÊT À PASSER AU NIVEAU SUPÉRIEUR',
    footerLine1: 'Refusez',
    footerLine2: "L'Ordinaire",
    footerCta: 'Voir Les Véhicules',
    footerBackTop: 'Haut De Page',
    menuItems: [
      { label: 'Accueil', href: '/', idx: '01', preview: 'heroSilk' as const },
      { label: 'Véhicules', href: '/vehicles', idx: '02', preview: 'fleetStudio' as const },
      { label: 'Suivi B/L', href: '/track', idx: '03', preview: 'fleetWet' as const },
      { label: 'Calculateur', href: '/calculator', idx: '04', preview: 'craftGlove' as const },
      { label: 'Showrooms', href: '/showrooms', idx: '05', preview: 'footerTrio' as const },
    ],
    menuSecondary: [
      { label: 'Devis', href: '#commission' },
      { label: 'Conditions', href: '#process' },
      { label: 'Documents', href: '/documents' },
    ],
  },
  ar: {
    navLabel: 'القائمة',
    closeLabel: 'إغلاق',
    skipToContent: 'تخطي إلى المحتوى',
    heroTitleLines: ['كل سيارة', 'تبدأ بشراكة', 'وثقة مباشرة'],
    heroCta: 'ابدأ طلبك الآن',
    cardPhoneLabel: 'الهاتف المباشر',
    cardCatalogLabel: 'الكتالوج',
    cardCatalogTitle: 'استعراض المخزون المتوفر',
    cardCatalogSub: 'سيارات 0 كم وأقل من 3 سنوات في 3 صالات عرض',
    cardTrackLabel: 'تتبع الشحنة',
    cardTrackTitle: 'تتبع مسار حاويتك',
    cardTrackSub: 'متابعة الباخرة والتخليص الجمركي برمز PIN السري',
    cardVisitLabel: 'زيارة الصالات',
    cardVisitTitle: 'استقبال ومعاينة ميدانية',
    formHeadingTop: 'حدد مواصفات',
    formHeadingAccent: 'سيارتك',
    formDesc:
      'شاركنا الطراز المطلوب والصالة الأقرب إليك لنرسل لك التسعيرة الكاملة بالدينار الجزائري وشروط التعاقد.',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'كريم بن علي',
    formPhoneLabel: 'رقم الهاتف',
    formPhonePlaceholder: '0550 12 34 56',
    formShowroomLabel: 'اختر صالة العرض',
    formRegimeLabel: 'نظام الاستيراد والجمركة',
    formRegimeOptions: [
      { id: 'Sur Stock (0 km)', label: 'متوفرة بالصالة (0 كم)' },
      { id: 'Sur Commande (Factory Order)', label: 'استيراد بالطلب' },
      { id: 'Licence Moudjahidine', label: 'رخصة مجاهدين' },
    ],
    formMessageLabel: 'الطراز والميزانية',
    formMessageOptional: 'اختياري',
    formMessagePlaceholder: 'اذكر الموديل أو الميزانية المطلوبة…',
    formSubmit: 'إرسال الطلب',
    formSending: 'جاري الإرسال…',
    formError: 'يرجى إدخال الاسم ورقم الهاتف الصحيح.',
    formSuccessTitle: 'تم تسجيل طلبك بنجاح',
    formSuccessBody: 'وصل طلبك فوراً إلى مدير الصالة المختارة وسيتواصل معك مستشارنا قريباً.',
    formWhatsapp: 'المتابعة عبر واتساب',
    processLine1: 'مسار مدروس بدقة',
    processLine2: 'مبني لحماية حقك',
    processCalcLink: 'حاسبة الجمارك',
    showcase1Title: 'المخزون المتوفر',
    showcase1Body:
      'سيارات جاهزة للتسليم الفوري أو بالطلب من المصنع — أسعار واضحة بالمليون سنتيم في العاصمة وجيجل وورقلة.',
    showcase1Cta: 'تصفح السيارات',
    showcase2Title: 'التتبع البحري',
    showcase2Body:
      'راقب رقم الحاوية وبوليصة الشحن ووصول السفينة لميناء جن جن برقم هاتفك ورمز PIN المكون من 4 أرقام.',
    showcase2Cta: 'تتبع شحنتك',
    footerEyebrow: 'هل أنت مستعد لقيادة استثنائية',
    footerLine1: 'تجاوز',
    footerLine2: 'المألوف',
    footerCta: 'استعراض السيارات',
    footerBackTop: 'العودة للأعلى',
    menuItems: [
      { label: 'الرئيسية', href: '/', idx: '01', preview: 'heroSilk' as const },
      { label: 'السيارات', href: '/vehicles', idx: '02', preview: 'fleetStudio' as const },
      { label: 'تتبع الشحنة', href: '/track', idx: '03', preview: 'fleetWet' as const },
      { label: 'الحاسبة', href: '/calculator', idx: '04', preview: 'craftGlove' as const },
      { label: 'الصالات', href: '/showrooms', idx: '05', preview: 'footerTrio' as const },
    ],
    menuSecondary: [
      { label: 'المواصفات', href: '#commission' },
      { label: 'الشروط', href: '#process' },
      { label: 'الوثائق', href: '/documents' },
    ],
  },
} as const;
