'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Heart,
  Gauge,
  Fuel,
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Calendar,
  Send,
} from 'lucide-react';
import { VehicleItem } from '@/lib/vehiclesData';

interface VehicleDetailModalProps {
  vehicle: VehicleItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
  isFavorite,
  onToggleFavorite,
}: VehicleDetailModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientWilaya, setClientWilaya] = useState('');

  if (!vehicle) return null;

  const whatsappMessage = encodeURIComponent(
    `Bonjour Carvex Export DZ, je suis intéressé par la ${vehicle.title} (${vehicle.year}) au prix de ${vehicle.priceDzdCentimes}M Centimes (Showroom: ${vehicle.showroom}). Pouvez-vous me donner plus de détails ?`
  );

  const handleDevisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.05em] px-2.5 py-0.5 rounded-full bg-neutral-900 text-white">
                {vehicle.brand}
              </span>
              <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                {vehicle.year} • {vehicle.bodyType}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/50">
                <bdi dir="rtl" lang="ar">{vehicle.customsRegime}</bdi>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-[-0.015em] text-neutral-900 mt-1">{vehicle.title}</h2>
            <p className="text-xs sm:text-sm text-neutral-500">{vehicle.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => onToggleFavorite(vehicle.id, e)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-rose-500 transition-colors"
              title={isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris'}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? 'text-rose-500 fill-rose-500' : ''
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Car Photo with clean studio cyclorama background */}
          <div className="h-44 sm:h-52 bg-neutral-50/70 rounded-2xl flex items-center justify-center relative p-4 border border-neutral-100 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={vehicle.image}
                alt={vehicle.title}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-contain filter drop-shadow-md"
                priority
              />
            </div>
            {/* Showroom badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/60 shadow-2xs flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-500" />
              <bdi dir="rtl" lang="ar">{vehicle.showroomNameAr}</bdi>
            </div>
            {/* Stock status badge */}
            <div className="absolute top-3 right-3">
              {vehicle.status === 'in_stock' ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span><bdi dir="rtl" lang="ar">متوفرة بالمعرض</bdi> — En Stock</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
                  <span><bdi dir="rtl" lang="ar">استيراد بالطلب</bdi> — Sur Commande</span>
                </span>
              )}
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-neutral-900 text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-neutral-300 block">
                <span className="uppercase tracking-[0.06em]">PRIX TOTAL</span> / <bdi dir="rtl" lang="ar">السعر الإجمالي</bdi>
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white tabular-nums">
                  {vehicle.priceDzdCentimes}{"\u00A0"}M
                </span>
                <span className="text-xs text-neutral-300 font-medium tabular-nums">
                  <bdi dir="rtl" lang="ar">سنتيم</bdi> ({((vehicle.priceDzdCentimes * 10000000) / 1000).toLocaleString('fr-DZ')}{"\u00A0"}<bdi dir="rtl" lang="ar">دج</bdi>)
                </span>
              </div>
              <span className="text-xs text-neutral-400 block mt-1">
                <bdi dir="rtl" lang="ar">شاملة لجميع مصاريف الشحن والجمركة والتسليم ({vehicle.customsRegime})</bdi>
              </span>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Moteur</span>
              <span title={vehicle.engine} className="font-bold text-neutral-900 mt-0.5 block truncate">{vehicle.engine}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Puissance</span>
              <span className="font-bold text-neutral-900 mt-0.5 block tabular-nums">{vehicle.horsepower}{"\u00A0"}HP</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Boîte Vitesse</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{vehicle.transmission}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Carburant</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{vehicle.fuelType}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Vitesse Max</span>
              <span className="font-bold text-neutral-900 mt-0.5 block tabular-nums">{vehicle.topSpeed}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Couleur</span>
              <span title={vehicle.color} className="font-bold text-neutral-900 mt-0.5 block truncate">{vehicle.color}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Année Modèle</span>
              <span className="font-bold text-neutral-900 mt-0.5 block tabular-nums">{vehicle.year}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-500 block text-xs uppercase font-semibold tracking-[0.05em]">Disponibilité</span>
              <span title={vehicle.statusLabelAr} className="font-bold text-emerald-700 mt-0.5 block truncate">
                <bdi dir="rtl" lang="ar">{vehicle.statusLabelAr}</bdi>
              </span>
            </div>
          </div>

          {/* Quotation Request & Direct Contact */}
          <div className="border border-neutral-200/80 rounded-2xl p-4 sm:p-5 bg-neutral-50/50 space-y-3">
            <h3 className="text-sm font-bold text-neutral-900">
              Commander ou demander un devis / <bdi dir="rtl" lang="ar">طلب استفسار</bdi>
            </h3>

            {formSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <bdi dir="rtl" lang="ar">شكراً لك! تم استلام طلبك بنجاح. سيتصل بك مستشار مبيعات Carvex لفرع {vehicle.showroomNameAr} خلال لحظات.</bdi>
                </span>
              </div>
            ) : (
              <form onSubmit={handleDevisSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="الاسم الكامل / Nom"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-3 py-2 text-base sm:text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="رقم الهاتف (ضروري)"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="px-3 py-2 text-base sm:text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums"
                  />
                  <input
                    type="text"
                    placeholder="الولاية / Wilaya"
                    value={clientWilaya}
                    onChange={(e) => setClientWilaya(e.target.value)}
                    className="px-3 py-2 text-base sm:text-sm rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>تأكيد طلب الفاتورة الشكلية (Devis)</span>
                  </button>

                  <a
                    href={`https://wa.me/213770727007?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>تواصل عبر واتساب فوراً</span>
                  </a>

                  <a
                    href="tel:+213770727007"
                    className="py-2.5 px-4 bg-white border border-neutral-200 text-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    <Phone className="w-4 h-4 text-neutral-500" />
                    <span>اتصال</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
