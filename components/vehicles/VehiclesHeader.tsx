'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Navigation, Sparkles, ChevronDown, Check } from 'lucide-react';

interface VehiclesHeaderProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  currency: 'USD' | 'DZD';
  onCurrencyToggle: () => void;
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
}

export default function VehiclesHeader({
  currentLocation,
  onLocationChange,
  currency,
  onCurrencyToggle,
  language,
  onLanguageToggle,
}: VehiclesHeaderProps) {
  const [timeStr, setTimeStr] = useState('01:48 PM (UTC -7)');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  useEffect(() => {
    // Update live formatted time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      setTimeStr(`${formattedHours}:${minutes} ${ampm} (UTC -7)`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const locations = [
    'San Francisco, US',
    'Mohammadia, Alger (DZ)',
    'Boulrimal, Jijel (DZ)',
    'Cite En Nasr, Ouargla (DZ)',
  ];

  return (
    <header className="h-16 shrink-0 bg-white border-b border-neutral-100 px-6 flex items-center justify-between select-none z-30">
      {/* Left: Brand & Meta Indicators */}
      <div className="flex items-center gap-8">
        {/* Brand Logo exactly like screenshot */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            {/* Custom geometric ribbon/shield icon */}
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
        <div className="hidden sm:block h-4 w-[1px] bg-neutral-200" />

        {/* Time Indicator */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-neutral-500 font-medium font-sans">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <span>{timeStr}</span>
        </div>

        {/* Location Dropdown Indicator */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium hover:text-neutral-900 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-neutral-400 rotate-45" />
            <span>{currentLocation}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {locationDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-neutral-100 rounded-xl shadow-lg py-1 z-50">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Select Showroom / Hub
              </div>
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    onLocationChange(loc);
                    setLocationDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 text-neutral-700"
                >
                  <span>{loc}</span>
                  {currentLocation === loc && <Check className="w-3.5 h-3.5 text-neutral-900" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions, Currency, and Profile */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher */}
        <button
          type="button"
          onClick={onCurrencyToggle}
          title="Toggle Currency"
          className="text-xs font-semibold px-2.5 py-1 rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          {currency === 'USD' ? '$ USD' : 'دج DZD'}
        </button>

        {/* PRO features pill button */}
        <button
          type="button"
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:shadow"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>PRO features</span>
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-200 relative cursor-pointer hover:ring-2 hover:ring-neutral-200 transition-all">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
