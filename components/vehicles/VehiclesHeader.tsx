'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Navigation, ChevronDown, Check, Menu, SlidersHorizontal, Phone, MessageCircle } from 'lucide-react';

interface VehiclesHeaderProps {
  currentShowroom: 'all' | 'Alger' | 'Jijel' | 'Ouargla';
  onShowroomChange: (showroom: 'all' | 'Alger' | 'Jijel' | 'Ouargla') => void;
  activeFiltersCount?: number;
  onOpenMobileNav?: () => void;
  onOpenMobileFilters?: () => void;
}

export default function VehiclesHeader({
  currentShowroom,
  onShowroomChange,
  activeFiltersCount = 0,
  onOpenMobileNav,
  onOpenMobileFilters,
}: VehiclesHeaderProps) {
  const [timeStr, setTimeStr] = useState('01:48 PM');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      setTimeStr(`${formattedHours}:${minutes} ${ampm} (Algérie UTC+1)`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const showrooms: { id: 'all' | 'Alger' | 'Jijel' | 'Ouargla'; label: string; city: string }[] = [
    { id: 'all', label: 'Toutes les salles d\'exposition', city: 'Algérie (Alger, Jijel, Ouargla)' },
    { id: 'Alger', label: 'Showroom Alger (Mohammadia)', city: 'Alger, DZ' },
    { id: 'Jijel', label: 'Showroom Jijel (Boulrimal)', city: 'Jijel, DZ' },
    { id: 'Ouargla', label: 'Showroom Ouargla (Centre-ville)', city: 'Ouargla, DZ' },
  ];

  const currentLabel =
    showrooms.find((s) => s.id === currentShowroom)?.city || 'Tous les showrooms (DZ)';

  return (
    <header className="h-16 shrink-0 bg-white border-b border-neutral-100 px-4 sm:px-6 flex items-center justify-between select-none z-30 relative">
      {/* Left: Brand Logo & Showroom Location */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Mobile Nav Hamburger Menu */}
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="md:hidden p-2 -ml-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo matching reference */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="leading-none">
            <span className="text-xs font-black tracking-tight text-neutral-900 block font-sans">
              AUTO
            </span>
            <span className="text-[10px] font-extrabold tracking-widest text-neutral-900 block font-sans">
              ULTIMATE
            </span>
          </div>
        </Link>

        {/* Separator */}
        <div className="hidden lg:block h-4 w-[1px] bg-neutral-200" />

        {/* Time Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-neutral-500 font-medium font-sans">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <span>{timeStr}</span>
        </div>

        {/* Functional Showroom Location Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Changer de salle d'exposition"
          >
            <Navigation className="w-3.5 h-3.5 text-neutral-500 rotate-45" />
            <span className="max-w-[140px] sm:max-w-[220px] truncate">{currentLabel}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
          </button>

          {locationDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-neutral-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
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
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                    currentShowroom === s.id ? 'bg-neutral-50 font-bold text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  <div>
                    <div className="text-neutral-900 font-medium">{s.label}</div>
                    <div className="text-[10px] text-neutral-400">{s.city}</div>
                  </div>
                  {currentShowroom === s.id && <Check className="w-4 h-4 text-neutral-900 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Hotline contact & Mobile filter toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dealership Hotline / WhatsApp */}
        <a
          href="https://wa.me/213770727007?text=Bonjour%20Carvex%2C%20je%20souhaite%20des%20informations%20sur%20vos%20v%C3%A9hicules"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
          title="Contact WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>0770 72 70 07</span>
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
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
