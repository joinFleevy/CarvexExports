'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, Heart, Calendar, Fuel, Gauge, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { VehicleItem } from '@/lib/vehiclesData';

interface VehicleDetailModalProps {
  vehicle: VehicleItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  currency: 'USD' | 'DZD';
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
  isFavorite,
  onToggleFavorite,
  currency,
}: VehicleDetailModalProps) {
  const [durationHours, setDurationHours] = useState(4);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!vehicle) return null;

  const priceFormatted =
    currency === 'USD'
      ? `$${vehicle.pricePerHour.toFixed(2)} / hour`
      : `${vehicle.priceDzdCentimes || Math.round(vehicle.pricePerHour * 10)} M Centimes`;

  const totalPrice =
    currency === 'USD'
      ? `$${(vehicle.pricePerHour * durationHours).toFixed(2)}`
      : `${((vehicle.priceDzdCentimes || 300) * 0.05 * durationHours).toFixed(1)} M`;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                {vehicle.brand}
              </span>
              <span className="text-[10px] font-semibold text-neutral-400">
                {vehicle.year} • {vehicle.bodyType}
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mt-1">{vehicle.title}</h3>
            <p className="text-xs text-neutral-400">{vehicle.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => onToggleFavorite(vehicle.id, e)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-rose-500 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'text-rose-500 fill-rose-500' : ''
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Car Photo with clean shadow */}
          <div className="h-44 bg-neutral-50/50 rounded-xl flex items-center justify-center relative p-4">
            <div className="relative w-full h-full">
              <Image
                src={vehicle.image}
                alt={vehicle.title}
                fill
                className="object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Transmission</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{vehicle.transmission}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Fuel Type</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{vehicle.fuelType}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Horsepower</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{vehicle.horsepower} HP</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Location</span>
              <span className="font-bold text-neutral-900 mt-0.5 block truncate">{vehicle.location}</span>
            </div>
          </div>

          {/* Booking / Duration Simulator */}
          <div className="border border-neutral-200/80 rounded-xl p-4 bg-neutral-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Select Rental Duration</span>
                <span className="text-[11px] text-neutral-400">Rate: {priceFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 4, 8, 24].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setDurationHours(hrs)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      durationHours === hrs
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {hrs === 24 ? '1 Day' : `${hrs}h`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 text-xs">
              <span className="text-neutral-500 font-medium">Estimated Total Price:</span>
              <span className="text-base font-extrabold text-neutral-900">{totalPrice}</span>
            </div>
          </div>

          {bookingConfirmed && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Request received! Our team will contact you promptly to finalize pickup.</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-neutral-100 bg-white flex items-center justify-between gap-3">
          <a
            href={`https://wa.me/213770727007?text=${encodeURIComponent(
              `Hello CARVEX! I am interested in ${vehicle.title} (${vehicle.year})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Showroom</span>
          </a>

          <button
            type="button"
            onClick={() => setBookingConfirmed(true)}
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Instant Reservation ({totalPrice})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
