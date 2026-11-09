import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Compass,
  Calculator,
  ArrowLeft,
  Ship,
  FileCheck2,
  KeyRound,
  CheckCircle2,
  MapPin,
  Phone,
  Sparkles,
  Search,
} from 'lucide-react';
import BrandMarquee from '@/components/BrandMarquee';
import CarCard from '@/components/CarCard';
import { pb, Vehicle } from '@/lib/pocketbase';

// Fallback seed vehicles in case network fails
const FALLBACK_VEHICLES: Vehicle[] = [
  {
    id: 'coolray-battle-2026',
    title: 'Geely Coolray Battle 2026',
    brand: 'Geely',
    model: 'Coolray Battle',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 399,
    price_fob_dzd_centimes: 280,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'أبيض لؤلؤي / سقف أسود',
    images: ['carvexexport_DfXYcp-HC7n.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'alger',
        code: 'alger',
        name_ar: 'الجزائر العاصمة (المحمدية)',
        name_fr: 'Alger',
        phone_commercial_1: '0779055489',
        phone_commercial_2: '0557053814',
        phone_whatsapp: '213779055489',
        address_text: 'المحمدية / الصنوبر البحري',
        is_active: true,
      },
    },
  },
  {
    id: 'coolray-full-2026',
    title: 'Geely Coolray Full 2026',
    brand: 'Geely',
    model: 'Coolray Full Option',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 388,
    price_fob_dzd_centimes: 270,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'رمادي تيتانيوم',
    images: ['carvexexport_DfXfUMajy_9.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'jijel',
        code: 'jijel',
        name_ar: 'جيجل (بوالرمل)',
        name_fr: 'Jijel',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'بوالرمل قرب ميناء جن جن',
        is_active: true,
      },
    },
  },
  {
    id: 'coolray-manuelle-2026',
    title: 'Geely Coolray Manuelle 2026',
    brand: 'Geely',
    model: 'Coolray Manuelle',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_transit',
    price_total_dzd_centimes: 307,
    price_fob_dzd_centimes: 215,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'manuelle',
    color: 'رمادي معدني',
    images: ['carvexexport_DfXhJrrAXBX.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'jijel',
        code: 'jijel',
        name_ar: 'جيجل (بوالرمل)',
        name_fr: 'Jijel',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'بوالرمل قرب ميناء جن جن',
        is_active: true,
      },
    },
  },
  {
    id: 'mg5-global-2026',
    title: 'MG5 Global (MX) 2026',
    brand: 'MG',
    model: 'MG5 Global',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 268,
    price_fob_dzd_centimes: 185,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'أبيض ناصع',
    images: ['carvexexport_De94opYjmAi.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'ouergla',
        code: 'ouergla',
        name_ar: 'ورقلة (وسط المدينة)',
        name_fr: 'Ouargla',
        phone_commercial_1: '0660414034',
        phone_commercial_2: '0661466727',
        phone_whatsapp: '213660414034',
        address_text: 'حي النصر / وسط المدينة',
        is_active: true,
      },
    },
  },
];

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  try {
    const res = await pb.collection('vehicles').getList<Vehicle>(1, 6, {
      filter: 'is_featured = true',
      expand: 'branch',
      sort: '-year',
      requestKey: null,
    });
    if (res.items && res.items.length > 0) {
      return res.items;
    }
    return FALLBACK_VEHICLES;
  } catch (error) {
    console.error('PocketBase fetch fallback:', error);
    return FALLBACK_VEHICLES;
  }
}

export default async function HomePage() {
  const vehicles = await getFeaturedVehicles();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-carvex-cyan/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-carvex-red/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-carvex-surface border border-carvex-border/80 text-carvex-cyan text-xs font-bold mb-6 shadow-lg shadow-black/40">
            <Sparkles className="w-4 h-4 text-carvex-cyan animate-pulse" />
            <span>استيراد وتوزيع سيارات 2026 جديدة كلياً في الجزائر</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25] max-w-4xl mx-auto mb-6">
            سيارتك الأصلية من المصنع مباشرة إلى{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-carvex-cyan via-sky-400 to-carvex-cyan">
              المفتاح في الجزائر
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-carvex-muted max-w-2xl mx-auto leading-relaxed mb-8">
            نضع حداً لغموض الاستيراد: شحن بحري موثق ببوليصة رسمية B/L، تخليص جمركي مطابق للمرسوم 23-74، وصالات عرض ومعاينة في{' '}
            <strong className="text-white">الجزائر العاصمة، جيجل، وورقلة</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/inventory"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-carvex-cyan to-carvex-cyan-hover text-black font-black text-sm shadow-xl shadow-carvex-cyan/25 hover:shadow-carvex-cyan/40 hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>تصفح السيارات المتوفرة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/calculator"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-carvex-surface hover:bg-carvex-card text-white font-bold text-sm border border-carvex-border hover:border-carvex-cyan/50 transition-all text-center flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-carvex-cyan" />
              <span>احسب تكلفة الجمركة</span>
            </Link>
          </div>

          {/* Trust Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-carvex-border/50 max-w-4xl mx-auto text-right">
            <div className="p-4 rounded-xl bg-carvex-surface/40 border border-carvex-border/40">
              <span className="text-2xl font-black text-white font-mono block">100%</span>
              <span className="text-xs text-carvex-muted">سيارات أصلية صفر كيلومتر</span>
            </div>
            <div className="p-4 rounded-xl bg-carvex-surface/40 border border-carvex-border/40">
              <span className="text-2xl font-black text-carvex-cyan font-mono block">3 صالات</span>
              <span className="text-xs text-carvex-muted">العاصمة · جيجل · ورقلة</span>
            </div>
            <div className="p-4 rounded-xl bg-carvex-surface/40 border border-carvex-border/40">
              <span className="text-2xl font-black text-white font-mono block">45-60 يوم</span>
              <span className="text-xs text-carvex-muted">مدة الشحن والتسليم</span>
            </div>
            <div className="p-4 rounded-xl bg-carvex-surface/40 border border-carvex-border/40">
              <span className="text-2xl font-black text-carvex-red font-mono block">0 مخاوف</span>
              <span className="text-xs text-carvex-muted">بوليصة شحن وتتبع مباشر</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Brands Marquee */}
      <BrandMarquee />

      {/* 3. Featured Inventory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-carvex-cyan mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>عروض حصرية جاهزة للمعاينة والاستلام</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              أحدث السيارات المعروضة في صالاتنا
            </h2>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-sm font-bold text-carvex-cyan hover:text-white transition-colors"
          >
            <span>عرض كل المخزون المتاح</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <CarCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {/* 4. The 4-Step Shipping Roadmap (De-risking the import process) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-carvex-surface to-carvex-card border border-carvex-border relative overflow-hidden">
          
          <div className="max-w-3xl mb-10 text-right">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-carvex-cyan/15 text-carvex-cyan mb-2 inline-block">
              الشفافية الكاملة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              رحلة استيراد سيارتك في 4 محطات أمان
            </h2>
            <p className="text-sm text-carvex-muted leading-relaxed">
              عملية الاستيراد ليست صندوقاً أسود. هكذا نضمن لك استثمارك من لحظة توقيع العقد وحتى استلام المفاتيح في صالة العرض:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-carvex-dark/80 border border-carvex-border/60 relative">
              <div className="w-10 h-10 rounded-xl bg-carvex-cyan/15 text-carvex-cyan flex items-center justify-center font-black font-mono text-lg mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">توقيع العقد والعربون</h3>
              <p className="text-xs text-carvex-muted leading-relaxed">
                اختيار الموديل واللون، توقيع عقد الشراء الرسمي، وإصدار وصل استلام عربون رسمي (Reçu d'Arbon) مختوم.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-carvex-dark/80 border border-carvex-border/60 relative">
              <div className="w-10 h-10 rounded-xl bg-carvex-cyan/15 text-carvex-cyan flex items-center justify-center font-black font-mono text-lg mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">الشحن وإصدار البوليصة</h3>
              <p className="text-xs text-carvex-muted leading-relaxed">
                تحميل السيارة بالحاوية في ميناء الصين، وتزويدك برقم الحاوية وبوليصة الشحن البحري الرسمية (B/L) لتتبع السفينة.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-carvex-dark/80 border border-carvex-border/60 relative">
              <div className="w-10 h-10 rounded-xl bg-carvex-cyan/15 text-carvex-cyan flex items-center justify-center font-black font-mono text-lg mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">الوصول لميناء الجزائر / جن جن</h3>
              <p className="text-xs text-carvex-muted leading-relaxed">
                رسو الباخرة، تفريغ الحاوية، ومرافقة التخليص الجمركي واستخراج وصل إبراء الجمارك D10 وشهادة المطابقة.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-carvex-dark/80 border border-carvex-border/60 relative">
              <div className="w-10 h-10 rounded-xl bg-carvex-cyan/15 text-carvex-cyan flex items-center justify-center font-black font-mono text-lg mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">تسليم المفاتيح بالصالة</h3>
              <p className="text-xs text-carvex-muted leading-relaxed">
                فحص السيارة النهائي، غسيلها وتجهيزها، وتسليمك المفاتيح والبطاقة الرمادية المؤقتة في صالة العاصمة، جيجل، أو ورقلة.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-carvex-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-carvex-muted">
              هل قمت بطلب سيارة مسبقاً؟ يمكنك تتبع مسارها الحالي فوراً برقم هاتفك:
            </p>
            <Link
              href="/track"
              className="px-6 py-2.5 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-white text-xs font-bold border border-carvex-border hover:border-carvex-cyan transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-carvex-cyan" />
              <span>تتبع مسار شحنتك بالـ PIN</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Showrooms Locations Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-carvex-cyan uppercase tracking-wider block mb-2">
            فروعنا الميدانية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            زورونا في صالات العرض بالجزائر
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Branch 1: Algiers */}
          <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border hover:border-carvex-cyan/50 transition-all text-right space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-carvex-cyan/15 text-carvex-cyan">
                صالة الوسط
              </span>
              <h3 className="text-lg font-bold text-white">الجزائر العاصمة</h3>
            </div>
            <p className="text-xs text-carvex-muted flex items-center gap-1.5 justify-end">
              <span>شارع نسيب عبود، المحمدية (قرب SAFEX)</span>
              <MapPin className="w-4 h-4 text-carvex-cyan" />
            </p>
            <p className="text-xs text-white font-mono font-bold flex items-center gap-1.5 justify-end">
              <span>0779055489 / 0557053814</span>
              <Phone className="w-4 h-4 text-carvex-cyan" />
            </p>
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rue+Nacib+Abboud+Mohammadia+Alger"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-lg bg-carvex-surface hover:bg-carvex-hover text-carvex-cyan text-xs font-bold text-center block transition-colors border border-carvex-border"
              >
                فتح الموقع على خرائط Google
              </a>
            </div>
          </div>

          {/* Branch 2: Jijel */}
          <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border hover:border-carvex-cyan/50 transition-all text-right space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-carvex-cyan/15 text-carvex-cyan">
                صالة الشرق وميناء جن جن
              </span>
              <h3 className="text-lg font-bold text-white">ولاية جيجل</h3>
            </div>
            <p className="text-xs text-carvex-muted flex items-center gap-1.5 justify-end">
              <span>المنطقة التجارية بوالرمل، الطاهير (قرب ميناء جن جن)</span>
              <MapPin className="w-4 h-4 text-carvex-cyan" />
            </p>
            <p className="text-xs text-white font-mono font-bold flex items-center gap-1.5 justify-end">
              <span>0660656274 / 0554154163</span>
              <Phone className="w-4 h-4 text-carvex-cyan" />
            </p>
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Boulrimal+Taher+Jijel"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-lg bg-carvex-surface hover:bg-carvex-hover text-carvex-cyan text-xs font-bold text-center block transition-colors border border-carvex-border"
              >
                فتح الموقع على خرائط Google
              </a>
            </div>
          </div>

          {/* Branch 3: Ouargla */}
          <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border hover:border-carvex-cyan/50 transition-all text-right space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-carvex-cyan/15 text-carvex-cyan">
                صالة الجنوب
              </span>
              <h3 className="text-lg font-bold text-white">ولاية ورقلة</h3>
            </div>
            <p className="text-xs text-carvex-muted flex items-center gap-1.5 justify-end">
              <span>حي النصر / وسط المدينة، ولاية ورقلة</span>
              <MapPin className="w-4 h-4 text-carvex-cyan" />
            </p>
            <p className="text-xs text-white font-mono font-bold flex items-center gap-1.5 justify-end">
              <span>0660414034 / 0661466727</span>
              <Phone className="w-4 h-4 text-carvex-cyan" />
            </p>
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Cite+En+Nasr+Ouargla"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-lg bg-carvex-surface hover:bg-carvex-hover text-carvex-cyan text-xs font-bold text-center block transition-colors border border-carvex-border"
              >
                فتح الموقع على خرائط Google
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-carvex-card via-carvex-surface to-carvex-card border border-carvex-cyan/30 text-center relative overflow-hidden shadow-2xl shadow-carvex-cyan/5">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              هل تبحث عن سيارة أو مواصفات خاصة؟
            </h2>
            <p className="text-sm text-carvex-muted leading-relaxed">
              نوفر لك إمكانية استيراد أي سيارة تفضلها (Geely, Jetour, Chery, Audi, Kia) مباشرة من مصانع الصين وأوروبا مع مرافقة شاملة حتى استلام مفاتيحك.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/213770727007?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20CARVEX%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B3%D9%8A%D8%A7%D8%B1%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%A8%D8%A7%D9%84%D8%B7%D9%84%D8%A8"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm transition-all shadow-lg shadow-carvex-cyan/20"
              >
                تحدث مع الإدارة عبر واتساب
              </a>
              <Link
                href="/calculator"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-white font-bold text-sm border border-carvex-border transition-colors"
              >
                حساب التكلفة التقديرية
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
