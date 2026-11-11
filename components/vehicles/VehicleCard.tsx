'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { VehicleItem } from '@/lib/vehiclesData';

interface VehicleCardProps {
  vehicle: VehicleItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectVehicle: (vehicle: VehicleItem) => void;
  currency: 'USD' | 'DZD';
}

export default function VehicleCard({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelectVehicle,
  currency,
}: VehicleCardProps) {
  // Format price based on currency
  const formattedPrice =
    currency === 'USD'
      ? `$${vehicle.pricePerHour.toFixed(2)}`
      : `${vehicle.priceDzdCentimes || Math.round(vehicle.pricePerHour * 10)} M`;

  const unitLabel = currency === 'USD' ? '/ hour' : '/ دج';

  return (
    <div
      onClick={() => onSelectVehicle(vehicle)}
      className="bg-white border border-neutral-100 hover:border-neutral-200 rounded-xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group relative"
    >
      {/* Top Meta Row */}
      <div className="flex items-center justify-between text-xs font-sans">
        {/* Left: Walking distance & time */}
        <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
          {/* Walking icon (SVG) */}
          <svg
            className="w-3.5 h-3.5 text-neutral-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="2" />
            <path d="m9 20 3-6 3 6" />
            <path d="m6 8 6 2 6-2" />
            <path d="M12 10v4" />
          </svg>
          <span className="text-[11px] text-neutral-800">
            {vehicle.distanceMeters}m <span className="text-neutral-400">({vehicle.walkTimeMinutes} min)</span>
          </span>
        </div>

        {/* Middle: Star Rating */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-800">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>
            {vehicle.rating.toFixed(1)}{' '}
            <span className="text-neutral-400 font-normal">({vehicle.reviewsCount})</span>
          </span>
        </div>

        {/* Right: Favorite Heart Toggle */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(vehicle.id, e)}
          className="p-1 rounded-full hover:bg-neutral-50 transition-colors"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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

      {/* Center: Car Photo with contact shadow */}
      <div className="my-4 h-28 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-200">
        <div className="relative w-full h-full max-h-24">
          <Image
            src={vehicle.image}
            alt={vehicle.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain filter drop-shadow-sm"
          />
        </div>
      </div>

      {/* Bottom Meta Row */}
      <div className="flex items-end justify-between pt-1 border-t border-neutral-50 font-sans">
        {/* Car Name & Subtitle */}
        <div className="max-w-[70%]">
          <h4 className="text-sm font-bold text-neutral-900 leading-tight group-hover:text-black">
            {vehicle.title}
          </h4>
          <p className="text-[11px] text-neutral-400 truncate mt-0.5 leading-tight">
            {vehicle.subtitle}
          </p>
        </div>

        {/* Price & Unit */}
        <div className="text-right">
          <span className="text-sm font-bold text-neutral-900 block leading-none">
            {formattedPrice}
          </span>
          <span className="text-[10px] text-neutral-400 block font-normal mt-0.5">
            {unitLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
