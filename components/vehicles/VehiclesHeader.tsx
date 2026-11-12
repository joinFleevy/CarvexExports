'use client';

import React, { useState } from 'react';
import { Navigation, ChevronDown, Check, SlidersHorizontal, Phone, MessageCircle } from 'lucide-react';
import OsmoMenu, { VehiclesNavTab } from './OsmoMenu';

interface VehiclesHeaderProps {
  currentShowroom: 'all' | 'Alger' | 'Jijel' | 'Ouargla';
  onShowroomChange: (showroom: 'all' | 'Alger' | 'Jijel' | 'Ouargla') => void;
  activeFiltersCount?: number;
  onOpenMobileFilters?: () => void;
  activeTab: VehiclesNavTab;
  onTabChange: (tab: VehiclesNavTab) => void;
  favoritesCount: number;
  recentsCount?: number;
}

export default function VehiclesHeader({
  currentShowroom,
  onShowroomChange,
  activeFiltersCount = 0,
  onOpenMobileFilters,
  activeTab,
  onTabChange,
  favoritesCount,
  recentsCount = 0,
}: VehiclesHeaderProps) {
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const showrooms: { id: 'all' | 'Alger' | 'Jijel' | 'Ouargla'; label: string; city: string }[] = [
    { id: 'all', label: 'Toutes les salles d\'exposition', city: 'Algérie (Alger, Jijel, Ouargla)' },
    { id: 'Alger', label: 'Showroom Alger (Mohammadia)', city: 'Alger, DZ' },
    { id: 'Jijel', label: 'Showroom Jijel (Boulrimal)', city: 'Jijel, DZ' },
    { id: 'Ouargla', label: 'Showroom Ouargla (Centre-ville)', city: 'Ouargla, DZ' },
  ];

  const currentLabel =
    showrooms.find((s) => s.id === currentShowroom)?.city || 'Tous les showrooms (DZ)';

  return (
    <header className="h-16 shrink-0 bg-white border-b border-neutral-100 px-3 sm:px-6 flex items-center justify-between gap-2 relative">
      {/* Left: Osmo Top-Left Wipe Menu & Showroom Location */}
      <div className="flex items-center gap-2 sm:gap-5 min-w-0 flex-1">
        <div className="shrink-0">
          <OsmoMenu
            activeTab={activeTab}
            onTabChange={onTabChange}
            favoritesCount={favoritesCount}
            recentsCount={recentsCount}
          />
        </div>

        {/* Separator */}
        <div className="hidden sm:block h-4 w-[1px] bg-neutral-200 shrink-0" />

        {/* Functional Showroom Location Selector */}
        <div className="relative min-w-0">
          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 px-2 sm:px-2.5 py-1.5 rounded-lg transition-colors max-w-full"
            title="Changer de salle d'exposition"
          >
            <Navigation className="w-3.5 h-3.5 text-neutral-500 rotate-45 shrink-0" />
            <span className="max-w-[115px] sm:max-w-[220px] truncate" title={currentLabel}>
              <bdi>{currentLabel}</bdi>
            </span>
            <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
          </button>

          {locationDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-neutral-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-xs uppercase font-bold tracking-[0.05em] text-neutral-500">
                Choisir la salle d&apos;exposition (Showroom)
              </div>
              {showrooms.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onShowroomChange(s.id);
                    setLocationDropdownOpen(false);
                  }}
                  className={`w-full text-start px-3.5 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                    currentShowroom === s.id ? 'bg-neutral-50 font-bold text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  <div>
                    <div className="text-neutral-900 font-medium">{s.label}</div>
                    <div className="text-xs text-neutral-500">
                      <bdi>{s.city}</bdi>
                    </div>
                  </div>
                  {currentShowroom === s.id && <Check className="w-4 h-4 text-neutral-900 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Hotline contact & Mobile filter toggle */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Dealership Hotline / WhatsApp */}
        <a
          href="https://wa.me/213770727007?text=Bonjour%20Carvex%2C%20je%20souhaite%20des%20informations%20sur%20vos%20v%C3%A9hicules"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
          title="Contact WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="tabular-nums">0770 72 70 07</span>
        </a>

        {/* Call Showroom Direct */}
        <a
          href="tel:+213770727007"
          className="inline-flex sm:hidden p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
          title="Appeler le showroom"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
        </a>

        {/* Mobile Filter Button (opens filter sheet) */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-1.5 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-neutral-800 transition-colors"
          aria-label="Open Filters"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtres</span>
          {activeFiltersCount > 0 && (
            <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold tabular-nums">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
