'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle, getVehicleImageUrl } from '@/lib/pocketbase';
import { formatPriceCentimes } from '@/lib/utils';

interface CarCardProps {
  vehicle: Vehicle;
}

export default function CarCard({ vehicle }: CarCardProps) {
  const imageSrc =
    vehicle.images && vehicle.images.length > 0
      ? getVehicleImageUrl(vehicle, vehicle.images[0])
      : '/images/carvexexport_DfXYcp-HC7n.jpg';

  return (
    <div className="border border-neutral-800 bg-neutral-900/40 rounded-lg overflow-hidden flex flex-col text-right">
      <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden">
        <Image
          src={imageSrc}
          alt={vehicle.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>{vehicle.year}</span>
            <span>{vehicle.brand}</span>
          </div>
          <h3 className="text-base font-semibold text-white">
            {vehicle.title}
          </h3>
        </div>

        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
          <div>
            {vehicle.hide_price ? (
              <span className="text-xs text-neutral-400 font-medium">
                السعر عند الطلب
              </span>
            ) : (
              <span className="text-base font-bold text-white font-mono">
                {formatPriceCentimes(vehicle.price_total_dzd_centimes)}
              </span>
            )}
          </div>
          <Link
            href={`/inventory/${vehicle.id}`}
            className="text-xs text-neutral-300 hover:text-white underline underline-offset-4"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}
