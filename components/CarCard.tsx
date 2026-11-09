'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fuel, Gauge, Settings, MapPin, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Vehicle, getVehicleImageUrl } from '@/lib/pocketbase';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';
import BranchModal from './BranchModal';

interface CarCardProps {
  vehicle: Vehicle;
}

export default function CarCard({ vehicle }: CarCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Status mapping
  const statusConfig = {
    in_stock: { label: 'حاضرة بالمعرض للتسليم الفوري', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    in_transit: { label: 'في الباخرة / قادمة في الحاوية', bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    on_order: { label: 'استيراد بالطلب من المصنع', bg: 'bg-carvex-cyan/15 text-carvex-cyan border-carvex-cyan/30' },
    reserved: { label: 'محجوزة (تم دفع العربون)', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    sold: { label: 'تم تسليمها للزبون', bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
  };

  const status = statusConfig[vehicle.status] || statusConfig.in_stock;
  const imageSrc =
    vehicle.images && vehicle.images.length > 0
      ? getVehicleImageUrl(vehicle, vehicle.images[0])
      : '/images/carvexexport_DfXYcp-HC7n.jpg';

  return (
    <>
      <div className="group relative bg-carvex-card border border-carvex-border hover:border-carvex-cyan/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-carvex-cyan/5 flex flex-col text-right">
        
        {/* Top Image & Badge */}
        <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
          <Image
            src={imageSrc}
            alt={vehicle.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carvex-card via-transparent to-black/30" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${status.bg}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {status.label}
            </span>
          </div>

          {/* Year & Mileage Badge */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-black/70 text-white border border-white/10 backdrop-blur-md font-mono">
              {vehicle.year}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-carvex-red text-white shadow-md">
              صفر كلم
            </span>
          </div>

          {/* Showroom location tag if available */}
          {vehicle.expand?.branch && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-slate-200 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-carvex-cyan" />
              <span>{vehicle.expand.branch.name_ar}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-carvex-muted font-mono uppercase tracking-wider">
                {vehicle.brand}
              </span>
              <span className="text-xs text-carvex-muted">{vehicle.color}</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-carvex-cyan transition-colors">
              {vehicle.title}
            </h3>
          </div>

          {/* Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-carvex-border/60 text-center">
            <div className="p-2 rounded-lg bg-carvex-surface/50 border border-carvex-border/40">
              <div className="flex items-center justify-center text-carvex-cyan mb-1">
                <Gauge className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-carvex-muted">المحرك</p>
              <p className="text-xs font-bold text-white font-mono">
                {vehicle.engine_displacement_cc ? `${(vehicle.engine_displacement_cc / 1000).toFixed(1)}L` : '1.5L'}
              </p>
            </div>

            <div className="p-2 rounded-lg bg-carvex-surface/50 border border-carvex-border/40">
              <div className="flex items-center justify-center text-carvex-cyan mb-1">
                <Settings className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-carvex-muted">علبة السرعة</p>
              <p className="text-xs font-bold text-white capitalize">
                {vehicle.transmission === 'automatique' ? 'أوتوماتيك' : 'يدوي'}
              </p>
            </div>

            <div className="p-2 rounded-lg bg-carvex-surface/50 border border-carvex-border/40">
              <div className="flex items-center justify-center text-carvex-cyan mb-1">
                <Fuel className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-carvex-muted">الوقود</p>
              <p className="text-xs font-bold text-white">
                {vehicle.engine_type === 'essence' ? 'بنزين' : vehicle.engine_type}
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          {vehicle.hide_price ? (
            <div className="bg-carvex-surface p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-carvex-muted block">التسعير والتفاوض</span>
                <span className="text-base font-black text-amber-400 tracking-tight">
                  السعر عند الطلب
                </span>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-emerald-400 block font-bold">تواصل للمناقشة</span>
                <span className="text-xs text-slate-400 font-sans">عبر واتساب الصالة</span>
              </div>
            </div>
          ) : (
            <div className="bg-carvex-surface p-3.5 rounded-xl border border-carvex-border/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-carvex-muted block">السعر الإجمالي شامل كل المصاريف</span>
                <span className="text-xl font-black text-carvex-cyan font-mono tracking-tight">
                  {formatPriceCentimes(vehicle.price_total_dzd_centimes)}
                </span>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-carvex-muted block">بالدينار الجزائري</span>
                <span className="text-xs font-bold text-slate-300 font-mono">
                  {formatDinar(vehicle.price_total_dzd_centimes)}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/inventory/${vehicle.id}`}
              className="py-2.5 px-3 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-white text-xs font-bold border border-carvex-border text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-carvex-muted" />
              التفاصيل والبطاقة
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black text-xs font-black text-center transition-all shadow-md shadow-carvex-cyan/20 flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              طلب حجز / استفسار
            </button>
          </div>
        </div>
      </div>

      {/* Direct Branch Contact Modal */}
      <BranchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        carTitle={vehicle.title}
      />
    </>
  );
}
