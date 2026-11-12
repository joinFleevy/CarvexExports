'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Fuel,
  Gauge,
  Settings,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Calculator,
  ArrowRight,
  Sparkles,
  Award,
  Truck,
  MessageCircle,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  Info,
  TrendingDown,
  Percent,
} from 'lucide-react';
import { Vehicle, getVehicleImageUrl } from '@/lib/pocketbase';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';
import { calculateAlgerianCustoms } from '@/lib/customs';
import BranchModal from '@/components/BranchModal';

type CustomsMode = 'turnkey' | 'moudjahidine_own' | 'moudjahidine_market' | 'fob_port';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
  tranche1: number;
  tranche2: number;
  tranche3: number;
}

export default function VehicleDetailClient({
  vehicle,
}: VehicleDetailClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [customsMode, setCustomsMode] = useState<CustomsMode>('turnkey');

  // Status mapping
  const statusConfig = {
    in_stock: { label: 'حاضرة بالمعرض للتسليم الفوري', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    in_transit: { label: 'في الباخرة / قادمة في الحاوية', bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    on_order: { label: 'استيراد بالطلب من المصنع', bg: 'bg-carvex-cyan/15 text-carvex-cyan border-carvex-cyan/30' },
    reserved: { label: 'محجوزة (تم دفع العربون)', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    sold: { label: 'تم تسليمها للزبون', bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
  };

  const status = statusConfig[vehicle.status] || statusConfig.in_stock;

  // Prepare images array
  const rawImages = vehicle.images && vehicle.images.length > 0 ? vehicle.images : ['carvexexport_DfXYcp-HC7n.jpg'];
  const galleryUrls = rawImages.map((img) => getVehicleImageUrl(vehicle, img));
  const currentImage = galleryUrls[selectedImageIndex] || galleryUrls[0];

  // Automatic In-Context Customs Calculations
  const fobPrice = vehicle.price_fob_dzd_centimes || Math.round(vehicle.price_total_dzd_centimes * 0.7);

  const customsCalcMoudjahidineOwn = calculateAlgerianCustoms({
    fobPriceCentimes: fobPrice,
    engineType: vehicle.engine_type || 'essence',
    displacementCc: vehicle.engine_displacement_cc || 1498,
    regime: 'moudjahidine_own_license',
  });

  const customsCalcMoudjahidineMarket = calculateAlgerianCustoms({
    fobPriceCentimes: fobPrice,
    engineType: vehicle.engine_type || 'essence',
    displacementCc: vehicle.engine_displacement_cc || 1498,
    regime: 'moudjahidine_market_license',
  });

  // Determine active price and description based on selected regime
  let activePriceCentimes = vehicle.price_total_dzd_centimes;
  let activeLabel = 'السعر الإجمالي الصافي (Clé en main)';
  let activeSubtext = 'يشمل الشحن البحري، التخليص الجمركي (تخفيض 50% قانوني)، والتسليم في المعرض';
  let badgeHighlight = 'جمركة عادية (مرسوم 23-74)';
  let savingsCentimes = 0;

  if (customsMode === 'moudjahidine_own') {
    activePriceCentimes = customsCalcMoudjahidineOwn.totalEstimatedCentimes;
    activeLabel = 'السعر برخصتك الخاصة (Licence Moudjahidine)';
    activeSubtext = 'معفى 100% من الجمركة و TVA — يشمل الشحن ومصاريف ميناء جن جن أو العاصمة';
    badgeHighlight = 'إعفاء جمركي 100%';
    savingsCentimes = vehicle.price_total_dzd_centimes - activePriceCentimes;
  } else if (customsMode === 'moudjahidine_market') {
    activePriceCentimes = customsCalcMoudjahidineMarket.totalEstimatedCentimes;
    activeLabel = 'السعر مع شراء رخصة مجاهدين موثقة';
    activeSubtext = 'يشمل سعر شراء الرخصة المعتمدة رسمياً + الشحن ومصاريف الوكيل الجمركي والميناء';
    badgeHighlight = 'شراء رخصة معتمدة';
    savingsCentimes = vehicle.price_total_dzd_centimes - activePriceCentimes;
  } else if (customsMode === 'fob_port') {
    activePriceCentimes = fobPrice;
    activeLabel = 'السعر واصل للميناء فقط (FOB / بدون جمارك)';
    activeSubtext = 'سعر شراء السيارة مع الشحن البحري والتأمين واصل للميناء (تتولى الجمركة بنفسك)';
    badgeHighlight = 'سعر الميناء الخام';
  }

  // Recalculate 3 tranches dynamically based on active regime price
  const activeTranche1 = Math.round(activePriceCentimes * 0.28);
  const activeTranche2 = Math.round(activePriceCentimes * 0.42);
  const activeTranche3 = activePriceCentimes - activeTranche1 - activeTranche2;

  return (
    <>
      <div className="space-y-12 pb-24 text-right">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-carvex-border/50 pb-4">
          <div className="flex items-center gap-2 text-xs text-carvex-muted">
            <Link href="/" className="hover:text-carvex-cyan transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/inventory" className="hover:text-carvex-cyan transition-colors">مخزون السيارات</Link>
            <span>/</span>
            <span className="text-white font-medium"><bdi>{vehicle.title}</bdi></span>
          </div>

          <Link
            href="/inventory"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-carvex-cyan hover:underline"
          >
            <span>العودة لكافة السيارات</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Top Vehicle Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${status.bg}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {status.label}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-carvex-surface border border-carvex-border text-white tabular-nums">
                موديل <bdi dir="ltr">{vehicle.year}</bdi>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-carvex-red/20 text-carvex-red border border-carvex-red/30 tabular-nums">
                <bdi dir="ltr">0</bdi> كلم (جديدة كلياً)
              </span>
              {vehicle.expand?.branch && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs text-slate-300 bg-carvex-surface border border-carvex-border">
                  <MapPin className="w-3.5 h-3.5 text-carvex-cyan" />
                  {vehicle.expand.branch.name_ar}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.15]">
              <bdi>{vehicle.title}</bdi>
            </h1>
            <p className="text-carvex-muted text-base max-w-prose leading-relaxed">
              استيراد أصلي من المصنع المباشر — كاملة الوثائق والملف القاعدي مع ضمان المصدر والشهادة الدولية.
            </p>
          </div>

          {/* Price Header Box (Dynamically updated or Hidden for WhatsApp discussion) */}
          {vehicle.hide_price ? (
            <div className="bg-carvex-surface border-2 border-amber-500/40 p-5 rounded-2xl md:min-w-[340px] text-start shadow-xl shadow-amber-500/5 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-carvex-muted">التسعير والمفاوضة</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  تواصل للمناقشة
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-[-0.015em]">
                السعر عند الطلب
              </div>
              <div className="text-xs text-slate-300 font-sans mt-1">
                <bdi dir="ltr">Prix sur demande</bdi> — التفاوض المباشر مع مدير الصالة
              </div>
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>تواصل عبر واتساب لمناقشة السعر حسب الصيغة والمواصفات</span>
              </div>
            </div>
          ) : (
            <div className="bg-carvex-surface border-2 border-carvex-cyan/40 p-5 rounded-2xl md:min-w-[340px] text-start shadow-xl shadow-carvex-cyan/5 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-carvex-muted">{activeLabel}</span>
                <span className="text-xs font-bold text-carvex-cyan bg-carvex-cyan/10 px-2.5 py-0.5 rounded-full border border-carvex-cyan/30">
                  {badgeHighlight}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-carvex-cyan tabular-nums tracking-[-0.02em]">
                <bdi>{formatPriceCentimes(activePriceCentimes)}</bdi>
              </div>
              <div className="text-xs text-slate-300 tabular-nums mt-1">
                ما يعادل <bdi dir="ltr">{formatDinar(activePriceCentimes)}</bdi> دج
              </div>

              {savingsCentimes > 0 && (
                <div className="mt-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    توفير مؤكد: <span className="tabular-nums">{savingsCentimes}</span> مليون سنتيم مقارنة بالجمركة العادية!
                  </span>
                </div>
              )}

              <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-carvex-cyan flex-shrink-0" />
                <span>{activeSubtext}</span>
              </div>
            </div>
          )}
        </div>

        {/* 🌟 AUTOMATIC IN-CONTEXT CUSTOMS CALCULATOR SELECTOR */}
        <div className="rounded-2xl bg-gradient-to-r from-carvex-card via-carvex-surface to-carvex-card border-2 border-carvex-border p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-carvex-border/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-carvex-cyan/15 text-carvex-cyan">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-[-0.01em]">
                  حاسبة الجمارك التلقائية الفورية لهذه السيارة <bdi dir="ltr">(Simulateur Douanier Intégré)</bdi>
                </h2>
                <p className="text-xs sm:text-sm text-carvex-muted leading-relaxed">
                  اختر النظام الجمركي لحساب السعر وجدول الدفعات بدقة وحفظ النتائج في عرض السعر
                </p>
              </div>
            </div>
            <span className="text-xs text-carvex-cyan bg-carvex-cyan/10 px-3 py-1 rounded-full border border-carvex-cyan/30 self-start sm:self-auto tabular-nums">
              سعة المحرك: <bdi dir="ltr">{vehicle.engine_displacement_cc || 1498}{"\u00A0"}cc</bdi>
            </span>
          </div>

          {/* Interactive Options Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {/* Option 1: Turnkey Standard Import */}
            <button
              onClick={() => setCustomsMode('turnkey')}
              className={`p-4 rounded-xl border-2 text-start transition-all flex flex-col justify-between ${
                customsMode === 'turnkey'
                  ? 'bg-carvex-cyan/10 border-carvex-cyan text-white shadow-lg shadow-carvex-cyan/10'
                  : 'bg-carvex-dark/60 border-carvex-border hover:border-carvex-border/80 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold">تسليم في الصالة <bdi dir="ltr">(Clé en main)</bdi></span>
                  <span className="text-xs bg-carvex-surface px-2 py-0.5 rounded text-carvex-muted">قانوني</span>
                </div>
                <p className="text-xs text-carvex-muted leading-relaxed">
                  جمركة عادية (مرسوم <span className="tabular-nums">23-74</span>) بتخفيض <span className="tabular-nums">50%</span> شاملة كل المصاريف حتى الصالة.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-carvex-border/40">
                <span className="text-base font-bold text-carvex-cyan tabular-nums block">
                  <bdi>{formatPriceCentimes(vehicle.price_total_dzd_centimes)}</bdi>
                </span>
              </div>
            </button>

            {/* Option 2: Own Moudjahidine License */}
            <button
              onClick={() => setCustomsMode('moudjahidine_own')}
              className={`p-4 rounded-xl border-2 text-start transition-all flex flex-col justify-between relative overflow-hidden ${
                customsMode === 'moudjahidine_own'
                  ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-carvex-dark/60 border-carvex-border hover:border-carvex-border/80 text-slate-300'
              }`}
            >
              <div className="absolute top-0 left-0 bg-emerald-500 text-black text-xs font-bold px-2.5 py-0.5 rounded-br-lg">
                الأوفر سعراً
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 pt-2 sm:pt-0">
                  <span className="text-xs font-bold text-emerald-400">برخصتك الخاصة (مجاهدين)</span>
                </div>
                <p className="text-xs text-carvex-muted leading-relaxed">
                  لديك رخصة مجاهدين شخصية؟ إعفاء <span className="tabular-nums">100%</span> من الجمركة و <bdi dir="ltr">TVA</bdi>، تدفع فقط مصاريف الميناء.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-carvex-border/40">
                <span className="text-base font-bold text-emerald-400 tabular-nums block">
                  <bdi>{formatPriceCentimes(customsCalcMoudjahidineOwn.totalEstimatedCentimes)}</bdi>
                </span>
              </div>
            </button>

            {/* Option 3: Market Moudjahidine License Included */}
            <button
              onClick={() => setCustomsMode('moudjahidine_market')}
              className={`p-4 rounded-xl border-2 text-start transition-all flex flex-col justify-between ${
                customsMode === 'moudjahidine_market'
                  ? 'bg-carvex-cyan/10 border-carvex-cyan text-white shadow-lg shadow-carvex-cyan/10'
                  : 'bg-carvex-dark/60 border-carvex-border hover:border-carvex-border/80 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">شراء رخصة مجاهدين عبرنا</span>
                </div>
                <p className="text-xs text-carvex-muted leading-relaxed">
                  نوفر لك رخصة معتمدة وموثقة رسمياً من السوق (<span className="tabular-nums">~65</span> مليون) مع التخليص الكامل.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-carvex-border/40">
                <span className="text-base font-bold text-white tabular-nums block">
                  <bdi>{formatPriceCentimes(customsCalcMoudjahidineMarket.totalEstimatedCentimes)}</bdi>
                </span>
              </div>
            </button>

            {/* Option 4: Port Only FOB */}
            <button
              onClick={() => setCustomsMode('fob_port')}
              className={`p-4 rounded-xl border-2 text-start transition-all flex flex-col justify-between ${
                customsMode === 'fob_port'
                  ? 'bg-blue-500/10 border-blue-400 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-carvex-dark/60 border-carvex-border hover:border-carvex-border/80 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-400">واصل للميناء فقط <bdi dir="ltr">(FOB)</bdi></span>
                </div>
                <p className="text-xs text-carvex-muted leading-relaxed">
                  شراء وشحن وتأمين حتى ميناء جن جن أو العاصمة دون جمركة (تتكفل بالجمركة بنفسك).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-carvex-border/40">
                <span className="text-base font-bold text-blue-400 tabular-nums block">
                  <bdi>{formatPriceCentimes(fobPrice)}</bdi>
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Grid: Gallery & Purchase CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-carvex-border bg-black/60 shadow-2xl">
              <Image
                src={currentImage}
                alt={vehicle.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Watermark / Badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-carvex-cyan" />
                <span className="text-xs font-bold text-white">صور أصلية ومعاينة حقيقية 100%</span>
              </div>

              {/* Navigation arrows if multiple images */}
              {galleryUrls.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryUrls.length - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-carvex-cyan hover:text-black text-white border border-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) => (prev < galleryUrls.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-carvex-cyan hover:text-black text-white border border-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {galleryUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-carvex-cyan ring-2 ring-carvex-cyan/30'
                        : 'border-carvex-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={url} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-carvex-card border border-carvex-border text-center">
                <Gauge className="w-5 h-5 text-carvex-cyan mx-auto mb-1.5" />
                <span className="text-xs text-carvex-muted block">سعة المحرك</span>
                <span className="text-sm font-bold text-white tabular-nums">
                  <bdi dir="ltr">{vehicle.engine_displacement_cc ? `${(vehicle.engine_displacement_cc / 1000).toFixed(1)}L Turbo` : '1.5L'}</bdi>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-carvex-card border border-carvex-border text-center">
                <Settings className="w-5 h-5 text-carvex-cyan mx-auto mb-1.5" />
                <span className="text-xs text-carvex-muted block">ناقل الحركة</span>
                <span className="text-sm font-bold text-white">
                  {vehicle.transmission === 'automatique' ? (
                    <>أوتوماتيك <bdi dir="ltr">DCT</bdi></>
                  ) : (
                    'يدوي 6 سرعات'
                  )}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-carvex-card border border-carvex-border text-center">
                <Fuel className="w-5 h-5 text-carvex-cyan mx-auto mb-1.5" />
                <span className="text-xs text-carvex-muted block">نوع الوقود</span>
                <span className="text-sm font-bold text-white">
                  {vehicle.engine_type === 'essence' ? 'بنزين اقتصادي' : <bdi>{vehicle.engine_type}</bdi>}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-carvex-card border border-carvex-border text-center">
                <Award className="w-5 h-5 text-carvex-cyan mx-auto mb-1.5" />
                <span className="text-xs text-carvex-muted block">بلد المنشأ</span>
                <span className="text-sm font-bold text-white">الصين (الأصلي)</span>
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Action Module (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Primary Action Card */}
            <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border shadow-xl space-y-5">
              <div className="border-b border-carvex-border pb-4">
                <span className="text-xs font-bold text-carvex-cyan block">
                  احجز سيارتك الآن
                </span>
                <h2 className="text-xl font-bold text-white tracking-[-0.015em] mt-1">
                  تواصل مباشر مع مدير الصالة
                </h2>
                <p className="text-xs sm:text-sm text-carvex-muted mt-1.5 leading-relaxed max-w-prose">
                  اختر الصالة الأقرب إليك (العاصمة، جيجل، أو ورقلة) للتفاوض، الاستفسار، أو تأكيد طلب الشراء وفق الصيغة الجمركية المختارة.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-4 px-5 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-bold text-sm transition-all shadow-lg shadow-carvex-cyan/20 flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>
                    {vehicle.hide_price ? 'تواصل للتفاوض على السعر عبر واتساب' : 'طلب حجز وتواصل عبر واتساب'}
                  </span>
                </button>

                <Link
                  href={`/documents?carTitle=${encodeURIComponent(vehicle.title)}&price=${activePriceCentimes}&brand=${encodeURIComponent(vehicle.brand)}&branch=${encodeURIComponent(vehicle.expand?.branch?.name_ar || 'الجزائر العاصمة')}`}
                  className="w-full py-3 px-4 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-slate-200 text-xs font-bold border border-carvex-border flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-carvex-cyan" />
                  <span>توليد البطاقة التقنية / وصل العربون</span>
                </Link>

                <Link
                  href="/calculator"
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-carvex-surface text-carvex-muted hover:text-white text-xs font-medium border border-carvex-border/50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-carvex-muted" />
                  <span>فتح الحاسبة الجمركية العامة</span>
                </Link>
              </div>

              <div className="pt-3 text-xs text-carvex-muted space-y-2 leading-relaxed border-t border-carvex-border/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>عقد بيع وتوثيق رسمي مختوم من شركة <bdi dir="ltr">CARVEX EXPORT</bdi></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>تتبع حاوية الشحن البحري عبر رمز <bdi dir="ltr">PIN</bdi> الخاص بك بالموقع</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>استلام السيارة جاهزة للسير مع الملف القاعدي <bdi dir="ltr">(Carte Grise)</bdi></span>
                </div>
              </div>
            </div>

            {/* Direct Branch Quick Dial */}
            {vehicle.expand?.branch && (
              <div className="p-5 rounded-2xl bg-carvex-surface/50 border border-carvex-border space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <MapPin className="w-4 h-4 text-carvex-cyan" />
                  <span>صالة العرض المتواجد بها الموديل:</span>
                </div>
                <p className="text-xs text-carvex-muted leading-relaxed">
                  {vehicle.expand.branch.address_text}
                </p>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${vehicle.expand.branch.phone_commercial_1}`}
                    className="flex-1 py-2 px-3 rounded-lg bg-black/60 hover:bg-black text-xs font-bold text-white border border-white/10 text-center transition-colors tabular-nums"
                  >
                    📞 <bdi dir="ltr">{vehicle.expand.branch.phone_commercial_1}</bdi>
                  </a>
                  {vehicle.expand.branch.google_maps_url && (
                    <a
                      href={vehicle.expand.branch.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-carvex-cyan/10 hover:bg-carvex-cyan/20 text-xs font-bold text-carvex-cyan border border-carvex-cyan/30 text-center transition-colors"
                    >
                      خريطة <bdi dir="ltr">GPS</bdi>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Tranches & Payment Breakdown (Dynamically updated with the chosen regime) */}
        <div className="rounded-2xl bg-carvex-card border border-carvex-border p-6 sm:p-8 space-y-6">
          <div className="border-b border-carvex-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-carvex-cyan">
                الشفافية المالية التامة — محسوبة تلقائياً وفق النظام المختار
              </span>
              <h2 className="text-2xl font-bold tracking-[-0.015em] text-white mt-1">
                جدول الدفعات المالية الثلاث <bdi dir="ltr">(Modalités de Paiement)</bdi>
              </h2>
            </div>
            <div className="text-xs text-slate-300 bg-carvex-surface px-3 py-1.5 rounded-lg border border-carvex-border tabular-nums">
              الإجمالي الصافي: <bdi>{formatPriceCentimes(activePriceCentimes)}</bdi>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tranche 1 */}
            <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border/80 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-carvex-cyan/20 text-carvex-cyan font-bold flex items-center justify-center tabular-nums">
                    01
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    عند توقيع العقد
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  دفعة العربون الأولي <bdi dir="ltr">(Acompte)</bdi>
                </h3>
                <p className="text-xs sm:text-sm text-carvex-muted mb-4 leading-relaxed">
                  تُسدد عند إبرام اتفاقية الطلب في صالة العرض لحجز الشاسيه وتأكيد رقم الهيكل من المصنع.
                </p>
              </div>
              <div className="pt-3 border-t border-carvex-border/60">
                <span className="text-xs text-carvex-muted block">
                  المبلغ المقدر <bdi dir="ltr" className="tabular-nums">(~28%)</bdi>:
                </span>
                <span className="text-xl font-bold text-carvex-cyan tabular-nums">
                  <bdi>{formatPriceCentimes(activeTranche1)}</bdi>
                </span>
                <span className="text-xs text-slate-400 tabular-nums block">
                  (<bdi dir="ltr">{formatDinar(activeTranche1)}</bdi> دج)
                </span>
              </div>
            </div>

            {/* Tranche 2 */}
            <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border/80 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-carvex-cyan/20 text-carvex-cyan font-bold flex items-center justify-center tabular-nums">
                    02
                  </span>
                  <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2.5 py-0.5 rounded-full border border-blue-400/20">
                    عند شحن الباخرة <bdi dir="ltr">(Au BL)</bdi>
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  دفعة الشحن والملاحة البحرية
                </h3>
                <p className="text-xs sm:text-sm text-carvex-muted mb-4 leading-relaxed">
                  تُسدد عند إصدار بوليصة الشحن البحرية الرسمية <bdi dir="ltr">(Bill of Lading)</bdi> وتسليم رقم تتبع الحاوية للزبون.
                </p>
              </div>
              <div className="pt-3 border-t border-carvex-border/60">
                <span className="text-xs text-carvex-muted block">
                  المبلغ المقدر <bdi dir="ltr" className="tabular-nums">(~42%)</bdi>:
                </span>
                <span className="text-xl font-bold text-carvex-cyan tabular-nums">
                  <bdi>{formatPriceCentimes(activeTranche2)}</bdi>
                </span>
                <span className="text-xs text-slate-400 tabular-nums block">
                  (<bdi dir="ltr">{formatDinar(activeTranche2)}</bdi> دج)
                </span>
              </div>
            </div>

            {/* Tranche 3 */}
            <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border/80 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-carvex-cyan/20 text-carvex-cyan font-bold flex items-center justify-center tabular-nums">
                    03
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                    عند استلام المفاتيح
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  الرصيد المتبقي عند المعاينة النهائية
                </h3>
                <p className="text-xs sm:text-sm text-carvex-muted mb-4 leading-relaxed">
                  يُدفع في صالة العرض بعد إتمام الجمركة وفحص السيارة واستلام المفتاحين والملف القاعدي الأصلي.
                </p>
              </div>
              <div className="pt-3 border-t border-carvex-border/60">
                <span className="text-xs text-carvex-muted block">
                  المبلغ المقدر <bdi dir="ltr" className="tabular-nums">(~30%)</bdi>:
                </span>
                <span className="text-xl font-bold text-carvex-cyan tabular-nums">
                  <bdi>{formatPriceCentimes(activeTranche3)}</bdi>
                </span>
                <span className="text-xs text-slate-400 tabular-nums block">
                  (<bdi dir="ltr">{formatDinar(activeTranche3)}</bdi> دج)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specs Matrix */}
        <div className="rounded-2xl bg-carvex-card border border-carvex-border p-6 sm:p-8 space-y-6">
          <div className="border-b border-carvex-border pb-4">
            <span className="text-xs font-bold text-carvex-cyan">
              المواصفات والتجهيزات
            </span>
            <h2 className="text-2xl font-bold tracking-[-0.015em] text-white mt-1">
              البطاقة التقنية الشاملة <bdi dir="ltr">(Fiche Technique Complète)</bdi>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Engine & Dynamics */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <Gauge className="w-4 h-4 text-carvex-cyan" />
                <span>المحرك والأداء الميكانيكي</span>
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">نوع المحرك:</span>
                  <span className="font-bold text-white text-end">4 أسطوانات بنزين توربو <bdi dir="ltr">(Direct Injection)</bdi></span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">السعة اللترية:</span>
                  <span className="font-bold text-white tabular-nums">
                    <bdi dir="ltr">{vehicle.engine_displacement_cc ? `${vehicle.engine_displacement_cc} cc` : '1498 cc'}</bdi>
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">القوة الحصانية:</span>
                  <span className="font-bold text-white tabular-nums">
                    <span className="tabular-nums">177</span> حصان بخاري <bdi dir="ltr">(ch)</bdi>
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">عزم الدوران الأقصى:</span>
                  <span className="font-bold text-white tabular-nums">
                    <span className="tabular-nums">255</span> ن.م <bdi dir="ltr">(Nm)</bdi>
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">علبة السرعات:</span>
                  <span className="font-bold text-white text-end">
                    {vehicle.transmission === 'automatique' ? (
                      <>أوتوماتيكية 7 سرعات ثنائية التعشيق <bdi dir="ltr">(DCT)</bdi></>
                    ) : (
                      'يدوية 6 سرعات'
                    )}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">معدل استهلاك الوقود:</span>
                  <span className="font-bold text-white tabular-nums">
                    <bdi dir="ltr">5.8</bdi> لتر / 100 كم (مختلط)
                  </span>
                </div>
              </div>
            </div>

            {/* Safety & Driver Assist */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <ShieldCheck className="w-4 h-4 text-carvex-cyan" />
                <span>أنظمة الأمان والسلامة</span>
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الوسائد الهوائية <bdi dir="ltr">(Airbags)</bdi>:</span>
                  <span className="font-bold text-white text-end">6 وسائد (أمامية، جانبية، وستائر حماية)</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">أنظمة الفرملة:</span>
                  <span className="font-bold text-white"><bdi dir="ltr">ABS + EBD + ESP + TCS + Hill Assist</bdi></span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">كاميرات المراقبة والرؤية:</span>
                  <span className="font-bold text-white text-end tabular-nums">كاميرا رؤية محيطية <bdi dir="ltr">360°</bdi> بانورامية فائقة الدقة</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">مساعد الركن والحساسات:</span>
                  <span className="font-bold text-white text-end">حساسات أمامية وخلفية مع رادار كشف العوائق</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">تثبيت السرعة:</span>
                  <span className="font-bold text-white text-end">مثبت سرعة تفاعلي ذكي <bdi dir="ltr">(Adaptive Cruise Control)</bdi></span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">هيكل السيارة:</span>
                  <span className="font-bold text-white text-end">فولاذ عالي الصلابة حاصل على 5 نجوم <bdi dir="ltr">C-NCAP</bdi></span>
                </div>
              </div>
            </div>

            {/* Comfort & Luxury Features */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <Sparkles className="w-4 h-4 text-carvex-cyan" />
                <span>الراحة والمقصورة الداخلية</span>
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">فتحة السقف:</span>
                  <span className="font-bold text-white text-end">بانورامية كهربائية قابلة للفتح مع عازل حراري</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">المقاعد والفرش:</span>
                  <span className="font-bold text-white text-end">جلد فاخر مريح مع تحكم كهربائي وتدفئة أمامية</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الشاشة المركزية:</span>
                  <span className="font-bold text-white tabular-nums text-end">
                    <bdi dir="ltr">12.3</bdi> بوصة تعمل باللمس بدقة <bdi dir="ltr">HD</bdi>
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الاتصال الذكي:</span>
                  <span className="font-bold text-white text-end">
                    <bdi dir="ltr">Apple CarPlay &amp; Android Auto</bdi> لاسلكي
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">مكيف الهواء:</span>
                  <span className="font-bold text-white text-end">أوتوماتيكي ثنائي المناطق مع فلتر تنقية الهواء <bdi dir="ltr">CN95</bdi></span>
                </div>
              </div>
            </div>

            {/* Official Registration & Guarantees */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <Award className="w-4 h-4 text-carvex-cyan" />
                <span>الوثائق والضمان المرفق</span>
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الشهادة الجمركية:</span>
                  <span className="font-bold text-emerald-400 text-end">شهادة مطابقة رسمية + <bdi dir="ltr">D10</bdi> للجمارك الجزائرية</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الملف القاعدي:</span>
                  <span className="font-bold text-white text-end">تسليم ملف الترقيم الكامل لاستخراج البطاقة الرمادية</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">رقم الشاسيه <bdi dir="ltr">(VIN)</bdi>:</span>
                  <span className="font-bold text-white tabular-nums text-end">مطابق <span className="tabular-nums">100%</span> ومثبت في بوليصة الشحن الأصلية</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">المفاتيح:</span>
                  <span className="font-bold text-white text-end">مفتاحان ذكيان أصليان مع نظام التشغيل عن بعد</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">حالة العداد:</span>
                  <span className="font-bold text-white tabular-nums text-end">
                    <bdi dir="ltr" className="tabular-nums">000,000</bdi> كم (عداد مصفر لم يستعمل)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-2xl bg-gradient-to-l from-carvex-cyan/20 via-carvex-card to-carvex-card border border-carvex-cyan/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-start">
            <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.015em] text-white">
              جاهز لحجز <bdi>{vehicle.title}</bdi>؟
            </h2>
            <p className="text-sm sm:text-base text-carvex-muted max-w-prose leading-relaxed">
              تواصل مع فريق مبيعات <bdi dir="ltr">CARVEX</bdi> الآن للاطلاع على العقود المتوفرة أو حجز مكان في الحاوية القادمة بالصيغة التي اخترتها ({badgeHighlight}).
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="py-3.5 px-6 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-bold text-sm transition-all shadow-lg shadow-carvex-cyan/20 flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل مع الصالة الآن</span>
          </button>
        </div>
      </div>

      {/* Modal with chosen regime details */}
      <BranchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        carTitle={
          vehicle.hide_price
            ? `${vehicle.title} (استفسار وتفاوض على السعر مع صالة ${vehicle.expand?.branch?.name_ar || 'العاصمة'})`
            : `${vehicle.title} (صيغة: ${badgeHighlight} بسعر ${formatPriceCentimes(activePriceCentimes)})`
        }
      />
    </>
  );
}
