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
} from 'lucide-react';
import { Vehicle, getVehicleImageUrl } from '@/lib/pocketbase';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';
import BranchModal from '@/components/BranchModal';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
  tranche1: number;
  tranche2: number;
  tranche3: number;
}

export default function VehicleDetailClient({
  vehicle,
  tranche1,
  tranche2,
  tranche3,
}: VehicleDetailClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
            <span className="text-white font-medium">{vehicle.title}</span>
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
              <span className="px-3 py-1 rounded-full text-xs font-black bg-carvex-surface border border-carvex-border text-white font-mono">
                موديل {vehicle.year}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-carvex-red/20 text-carvex-red border border-carvex-red/30">
                0 كلم (جديدة كلياً)
              </span>
              {vehicle.expand?.branch && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs text-slate-300 bg-carvex-surface border border-carvex-border">
                  <MapPin className="w-3.5 h-3.5 text-carvex-cyan" />
                  {vehicle.expand.branch.name_ar}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {vehicle.title}
            </h1>
            <p className="text-carvex-muted text-sm sm:text-base">
              استيراد أصلي من المصنع المباشر — كاملة الوثائق والملف القاعدي مع ضمان المصدر والشهادة الدولية.
            </p>
          </div>

          {/* Price Header Box */}
          <div className="bg-carvex-surface border-2 border-carvex-cyan/40 p-5 rounded-2xl md:min-w-[320px] text-right shadow-xl shadow-carvex-cyan/5">
            <span className="text-xs text-carvex-muted block mb-1">السعر الإجمالي الصافي (Clé en main)</span>
            <div className="text-3xl sm:text-4xl font-black text-carvex-cyan font-mono tracking-tight">
              {formatPriceCentimes(vehicle.price_total_dzd_centimes)}
            </div>
            <div className="text-xs text-slate-300 font-mono mt-1">
              ما يعادل {formatDinar(vehicle.price_total_dzd_centimes)} دج
            </div>
            <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
              <span>يشمل الشحن البحري، التأمين، والتسليم في صالة العرض</span>
            </div>
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
                <span className="text-sm font-bold text-white font-mono">
                  {vehicle.engine_displacement_cc ? `${(vehicle.engine_displacement_cc / 1000).toFixed(1)}L Turbo` : '1.5L'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-carvex-card border border-carvex-border text-center">
                <Settings className="w-5 h-5 text-carvex-cyan mx-auto mb-1.5" />
                <span className="text-xs text-carvex-muted block">ناقل الحركة</span>
                <span className="text-sm font-bold text-white capitalize">
                  {vehicle.transmission === 'automatique' ? 'أوتوماتيك DCT' : 'يدوي 6 سرعات'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-carvex-card border border-carvex-border text-center">
                <Fuel className="w-5 h-5 text-carvex-cyan mx-auto mb-1.5" />
                <span className="text-xs text-carvex-muted block">نوع الوقود</span>
                <span className="text-sm font-bold text-white capitalize">
                  {vehicle.engine_type === 'essence' ? 'بنزين اقتصادي' : vehicle.engine_type}
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
                <span className="text-xs font-bold text-carvex-cyan uppercase tracking-wider block">
                  احجز سيارتك الآن
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  تواصل مباشر مع مدير الصالة
                </h3>
                <p className="text-xs text-carvex-muted mt-1 leading-relaxed">
                  اختر الصالة الأقرب إليك (العاصمة، جيجل، أو ورقلة) للتفاوض، الاستفسار، أو تحديد موعد المعاينة.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-4 px-5 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm transition-all shadow-lg shadow-carvex-cyan/20 flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>طلب حجز وتواصل عبر واتساب</span>
                </button>

                <Link
                  href={`/calculator?car=${vehicle.id}&price=${vehicle.price_fob_dzd_centimes || 270}`}
                  className="w-full py-3 px-4 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-white text-xs font-bold border border-carvex-border flex items-center justify-center gap-2 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-carvex-cyan" />
                  <span>حاسبة الجمارك التقديرية لهذه السيارة</span>
                </Link>

                <Link
                  href={`/documents?carTitle=${encodeURIComponent(vehicle.title)}&price=${vehicle.price_total_dzd_centimes}&brand=${encodeURIComponent(vehicle.brand)}&branch=${encodeURIComponent(vehicle.expand?.branch?.name_ar || 'الجزائر العاصمة')}`}
                  className="w-full py-3 px-4 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-slate-300 text-xs font-medium border border-carvex-border flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-carvex-muted" />
                  <span>توليد البطاقة التقنية / وصل العربون</span>
                </Link>
              </div>

              <div className="pt-2 text-[11px] text-carvex-muted space-y-2 border-t border-carvex-border/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>عقد بيع وتوثيق رسمي مختوم من شركة CARVEX EXPORT</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>تتبع حاوية الشحن البحري عبر رمز PIN الخاص بك</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>استلام السيارة جاهزة للسير مع الملف القاعدي (Carte Grise)</span>
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
                    className="flex-1 py-2 px-3 rounded-lg bg-black/60 hover:bg-black text-xs font-bold text-white border border-white/10 text-center transition-colors"
                  >
                    📞 {vehicle.expand.branch.phone_commercial_1}
                  </a>
                  {vehicle.expand.branch.google_maps_url && (
                    <a
                      href={vehicle.expand.branch.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-carvex-cyan/10 hover:bg-carvex-cyan/20 text-xs font-bold text-carvex-cyan border border-carvex-cyan/30 text-center transition-colors"
                    >
                      خريطة GPS
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Tranches & Payment Breakdown (User explicit request) */}
        <div className="rounded-2xl bg-carvex-card border border-carvex-border p-6 sm:p-8 space-y-6">
          <div className="border-b border-carvex-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-carvex-cyan uppercase tracking-wider">
                الشفافية المالية التامة
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                جدول الدفعات المالية الثلاث (Modalités de Paiement)
              </h2>
            </div>
            <div className="text-xs text-carvex-muted">
              حماية لحقوق المشتري وفق عقود الاستيراد الرسمية
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tranche 1 */}
            <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border/80 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-carvex-cyan/20 text-carvex-cyan font-black flex items-center justify-center font-mono">
                    01
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    عند توقيع العقد
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  دفعة العربون الأولي (Acompte)
                </h3>
                <p className="text-xs text-carvex-muted mb-4 leading-relaxed">
                  تُسدد عند إبرام اتفاقية الطلب في صالة العرض لحجز الشاسيه وتأكيد رقم الهيكل من المصنع.
                </p>
              </div>
              <div className="pt-3 border-t border-carvex-border/60">
                <span className="text-[10px] text-carvex-muted block">المبلغ المقدر (~28%):</span>
                <span className="text-xl font-black text-carvex-cyan font-mono">
                  {formatPriceCentimes(tranche1)}
                </span>
                <span className="text-xs text-slate-400 font-mono block">
                  ({formatDinar(tranche1)} دج)
                </span>
              </div>
            </div>

            {/* Tranche 2 */}
            <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border/80 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-carvex-cyan/20 text-carvex-cyan font-black flex items-center justify-center font-mono">
                    02
                  </span>
                  <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2.5 py-0.5 rounded-full border border-blue-400/20">
                    عند شحن الباخرة (Au BL)
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  دفعة الشحن والملاحة البحرية
                </h3>
                <p className="text-xs text-carvex-muted mb-4 leading-relaxed">
                  تُسدد عند إصدار بوليصة الشحن البحرية الرسمية (Bill of Lading) وتسليم رقم تتبع الحاوية للزبون.
                </p>
              </div>
              <div className="pt-3 border-t border-carvex-border/60">
                <span className="text-[10px] text-carvex-muted block">المبلغ المقدر (~42%):</span>
                <span className="text-xl font-black text-carvex-cyan font-mono">
                  {formatPriceCentimes(tranche2)}
                </span>
                <span className="text-xs text-slate-400 font-mono block">
                  ({formatDinar(tranche2)} دج)
                </span>
              </div>
            </div>

            {/* Tranche 3 */}
            <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border/80 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-carvex-cyan/20 text-carvex-cyan font-black flex items-center justify-center font-mono">
                    03
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                    عند استلام المفاتيح
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  الرصيد المتبقي عند المعاينة النهائية
                </h3>
                <p className="text-xs text-carvex-muted mb-4 leading-relaxed">
                  يُدفع في صالة العرض بعد إتمام الجمركة وفحص السيارة واستلام المفتاحين والملف القاعدي الأصلي.
                </p>
              </div>
              <div className="pt-3 border-t border-carvex-border/60">
                <span className="text-[10px] text-carvex-muted block">المبلغ المقدر (~30%):</span>
                <span className="text-xl font-black text-carvex-cyan font-mono">
                  {formatPriceCentimes(tranche3)}
                </span>
                <span className="text-xs text-slate-400 font-mono block">
                  ({formatDinar(tranche3)} دج)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specs Matrix */}
        <div className="rounded-2xl bg-carvex-card border border-carvex-border p-6 sm:p-8 space-y-6">
          <div className="border-b border-carvex-border pb-4">
            <span className="text-xs font-bold text-carvex-cyan uppercase tracking-wider">
              المواصفات والتجهيزات
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              البطاقة التقنية الشاملة (Fiche Technique Complète)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Engine & Dynamics */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <Gauge className="w-4 h-4 text-carvex-cyan" />
                <span>المحرك والأداء الميكانيكي</span>
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">نوع المحرك:</span>
                  <span className="font-bold text-white">4 أسطوانات بنزين توربو (Direct Injection)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">السعة اللترية:</span>
                  <span className="font-bold text-white font-mono">
                    {vehicle.engine_displacement_cc ? `${vehicle.engine_displacement_cc} cc` : '1498 cc'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">القوة الحصانية:</span>
                  <span className="font-bold text-white font-mono">177 حصان بخاري (ch)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">عزم الدوران الأقصى:</span>
                  <span className="font-bold text-white font-mono">255 ن.م (Nm)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">علبة السرعات:</span>
                  <span className="font-bold text-white">
                    {vehicle.transmission === 'automatique' ? 'أوتوماتيكية 7 سرعات ثنائية التعشيق (DCT)' : 'يدوية 6 سرعات'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">معدل استهلاك الوقود:</span>
                  <span className="font-bold text-white font-mono">5.8 لتر / 100 كم (مختلط)</span>
                </div>
              </div>
            </div>

            {/* Safety & Driver Assist */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <ShieldCheck className="w-4 h-4 text-carvex-cyan" />
                <span>أنظمة الأمان والسلامة</span>
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الوسائد الهوائية (Airbags):</span>
                  <span className="font-bold text-white">6 وسائد (أمامية، جانبية، وستائر حماية)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">أنظمة الفرملة:</span>
                  <span className="font-bold text-white font-mono">ABS + EBD + ESP + TCS + Hill Assist</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">كاميرات المراقبة والرؤية:</span>
                  <span className="font-bold text-white">كاميرا رؤية محيطية 360° بانورامية فائقة الدقة</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">مساعد الركن والحساسات:</span>
                  <span className="font-bold text-white">حساسات أمامية وخلفية مع رادار كشف العوائق</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">تثبيت السرعة:</span>
                  <span className="font-bold text-white">مثبت سرعة تفاعلي ذكي (Adaptive Cruise Control)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">هيكل السيارة:</span>
                  <span className="font-bold text-white">فولاذ عالي الصلابة حاصل على 5 نجوم C-NCAP</span>
                </div>
              </div>
            </div>

            {/* Comfort & Luxury Features */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <Sparkles className="w-4 h-4 text-carvex-cyan" />
                <span>الراحة والمقصورة الداخلية</span>
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">فتحة السقف:</span>
                  <span className="font-bold text-white">بانورامية كهربائية قابلة للفتح مع عازل حراري</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">المقاعد والفرش:</span>
                  <span className="font-bold text-white">جلد فاخر مريح مع تحكم كهربائي وتدفئة أمامية</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الشاشة المركزية:</span>
                  <span className="font-bold text-white font-mono">12.3 بوصة تعمل باللمس بدقة HD</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الاتصال الذكي:</span>
                  <span className="font-bold text-white font-mono">Apple CarPlay & Android Auto لاسلكي</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">مكيف الهواء:</span>
                  <span className="font-bold text-white">أوتوماتيكي ثنائي المناطق مع فلتر تنقية الهواء CN95</span>
                </div>
              </div>
            </div>

            {/* Official Registration & Guarantees */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-2">
                <Award className="w-4 h-4 text-carvex-cyan" />
                <span>الوثائق والضمان المرفق</span>
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الشهادة الجمركية:</span>
                  <span className="font-bold text-emerald-400">شهادة مطابقة رسمية + D10 للجمارك الجزائرية</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">الملف القاعدي:</span>
                  <span className="font-bold text-white">تسليم ملف الترقيم الكامل لاستخراج البطاقة الرمادية</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">رقم الشاسيه (VIN):</span>
                  <span className="font-bold text-white font-mono">مطابق 100% ومثبت في بوليصة الشحن الأصلية</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">المفاتيح:</span>
                  <span className="font-bold text-white">مفتاحان ذكيان أصليان مع نظام التشغيل عن بعد</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-carvex-border/40">
                  <span className="text-carvex-muted">حالة العداد:</span>
                  <span className="font-bold text-white font-mono">000,000 كم (عداد مصفر لم يستعمل)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-2xl bg-gradient-to-l from-carvex-cyan/20 via-carvex-card to-carvex-card border border-carvex-cyan/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              جاهز لحجز {vehicle.title}؟
            </h3>
            <p className="text-xs sm:text-sm text-carvex-muted max-w-xl">
              تواصل مع فريق مبيعات CARVEX الآن للاطلاع على العقود المتوفرة أو حجز مكان في الحاوية القادمة.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="py-3.5 px-6 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm transition-all shadow-lg shadow-carvex-cyan/20 flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل مع الصالة الآن</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <BranchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        carTitle={vehicle.title}
      />
    </>
  );
}
