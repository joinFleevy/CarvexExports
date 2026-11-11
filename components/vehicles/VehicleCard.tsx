'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, MapPin, Ship } from 'lucide-react';
import { VehicleItem } from '@/lib/vehiclesData';

interface VehicleCardProps {
  vehicle: VehicleItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectVehicle: (vehicle: VehicleItem) => void;
  onSelectShowroomFilter?: (showroom: 'Alger' | 'Jijel' | 'Ouargla', e: React.MouseEvent) => void;
  currency?: 'USD' | 'DZD';
}

export default function VehicleCard({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelectVehicle,
  onSelectShowroomFilter,
  currency = 'DZD',
}: VehicleCardProps) {
  const formattedPrice = `${vehicle.priceDzdCentimes} M`;
  const priceSubtitle = 'سنتيم شاملة كل الرسوم';

  return (
    <div
      onClick={() => onSelectVehicle(vehicle)}
      className="bg-white border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg cursor-pointer group relative"
    >
      {/* Top Functional Meta Row */}
      <div className="flex items-center justify-between text-xs font-sans gap-2">
        {/* Availability Status Badge & Showroom Pill */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {vehicle.status === 'in_stock' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>متوفرة بالمعرض</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
              <Ship className="w-3 h-3 text-blue-500" />
              <span>استيراد بالطلب</span>
            </span>
          )}

          {/* Showroom Pill (clickable to filter by branch) */}
          <button
            type="button"
            onClick={(e) => {
              if (onSelectShowroomFilter) {
                e.stopPropagation();
                onSelectShowroomFilter(vehicle.showroom, e);
              }
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            title={`Filtrer par showroom: ${vehicle.showroom}`}
          >
            <MapPin className="w-2.5 h-2.5 text-neutral-500" />
            <span>{vehicle.showroom}</span>
          </button>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(vehicle.id, e)}
          className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors shrink-0"
          title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          aria-label="Toggle favorite"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'text-rose-500 fill-rose-500'
                : 'text-neutral-400 hover:text-rose-500'
            }`}
          />
        </button>
      </div>

      {/* Center: High-Resolution Car Studio Photo */}
      <div className="my-3 sm:my-4 h-36 sm:h-40 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        <div className="relative w-full h-full">
          <Image
            src={vehicle.image}
            alt={vehicle.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Bottom Meta Row */}
      <div className="pt-3 border-t border-neutral-100 flex items-end justify-between gap-3 font-sans">
        {/* Car Name & Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-black truncate">
              {vehicle.title}
            </h4>
          </div>
          <p className="text-[11px] text-neutral-500 truncate mt-0.5">
            {vehicle.subtitle}
          </p>

          {/* Functional Tag Pills */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
              {vehicle.year}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
              {vehicle.transmission}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/50">
              {vehicle.customsRegime}
            </span>
          </div>
        </div>

        {/* Real Price in Million Centimes */}
        <div className="text-right shrink-0">
          <span className="text-base sm:text-lg font-black text-neutral-950 block leading-tight">
            {formattedPrice}
          </span>
          <span className="text-[10px] text-neutral-400 block font-medium mt-0.5">
            {priceSubtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
