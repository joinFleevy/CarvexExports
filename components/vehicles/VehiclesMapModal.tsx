'use client';

import React from 'react';
import { X, MapPin } from 'lucide-react';
import { VehicleItem } from '@/lib/vehiclesData';

interface VehiclesMapModalProps {
  vehicles: VehicleItem[];
  onClose: () => void;
  onSelectVehicle: (vehicle: VehicleItem) => void;
}

export default function VehiclesMapModal({
  vehicles,
  onClose,
  onSelectVehicle,
}: VehiclesMapModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-neutral-100 flex flex-col h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-900" />
            <h2 className="text-base font-bold text-neutral-900 tracking-[-0.01em]">Carte des Showrooms et Véhicules</h2>
            <span className="text-xs text-neutral-500 tabular-nums">({vehicles.length} véhicules)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mock Interactive Map Canvas */}
        <div className="flex-1 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <svg className="absolute inset-0 w-full h-full stroke-neutral-300 stroke-[3] fill-none">
            <path d="M 0 150 Q 300 200 600 120 T 1200 250" />
            <path d="M 200 0 Q 350 300 450 600" />
            <path d="M 0 450 Q 500 400 1000 550" />
            <path d="M 700 0 Q 650 350 850 600" />
          </svg>

          {/* Vehicle Markers */}
          <div className="absolute inset-0 p-8 grid grid-cols-3 gap-8 pointer-events-none">
            {vehicles.slice(0, 9).map((car) => (
              <div
                key={car.id}
                className="pointer-events-auto cursor-pointer group flex flex-col items-center justify-center"
                onClick={() => {
                  onSelectVehicle(car);
                  onClose();
                }}
              >
                <div className="bg-white border-2 border-neutral-950 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 transform group-hover:scale-110 transition-transform">
                  <span className="text-xs font-bold text-neutral-950 tabular-nums">{car.priceDzdCentimes}{"\u00A0"}M</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="w-2 h-2 bg-neutral-950 rotate-45 -mt-1 shadow-sm" />
                <span
                  title={car.title}
                  className="text-xs font-semibold text-neutral-700 bg-white/90 px-1.5 rounded mt-1 shadow-xs truncate max-w-[140px]"
                >
                  {car.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
