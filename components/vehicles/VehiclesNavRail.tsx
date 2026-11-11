'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Car,
  Heart,
  Clock,
  LifeBuoy,
  X,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface VehiclesNavRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount: number;
  onCloseMobile?: () => void;
  isMobileDrawer?: boolean;
}

export default function VehiclesNavRail({
  activeTab,
  onTabChange,
  favoritesCount,
  onCloseMobile,
  isMobileDrawer = false,
}: VehiclesNavRailProps) {
  const mainNav = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'vehicles', label: 'Vehicles', icon: Car, href: '/vehicles' },
    { id: 'favourites', label: 'Favourites', icon: Heart, badge: favoritesCount },
    { id: 'recents', label: 'Recents', icon: Clock },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`shrink-0 bg-white border-r border-neutral-100 flex flex-col justify-between py-6 px-3 select-none ${
        isMobileDrawer ? 'w-64 h-full' : 'w-48 hidden md:flex'
      }`}
    >
      <div className="space-y-6">
        {/* Mobile Header if inside Drawer */}
        {isMobileDrawer && (
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 px-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center text-white text-[10px] font-black">
                AU
              </div>
              <span className="text-xs font-bold text-neutral-900 tracking-tight">Navigation</span>
            </div>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Primary Navigation Items */}
        <nav className="space-y-1.5">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            const buttonContent = (
              <button
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white font-semibold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-neutral-900' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );

            return item.href ? (
              <Link key={item.id} href={item.href} className="block">
                {buttonContent}
              </Link>
            ) : (
              <div key={item.id}>{buttonContent}</div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned: Support & Dealership Info */}
      <div className="pt-4 border-t border-neutral-100 space-y-2">
        {/* Support Button */}
        <a
          href="https://wa.me/213770727007?text=Bonjour%2C%20j%27ai%20besoin%20d%27assistance%20Carvex"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          <LifeBuoy className="w-4 h-4 text-neutral-400" />
          <span>Support & Aide</span>
        </a>

        {/* Showroom Direct Call */}
        <a
          href="tel:+213770727007"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-emerald-600" />
          <span>Service Client</span>
        </a>

        {/* Small Tagline */}
        <div className="px-3 pt-2 text-[10px] text-neutral-400">
          <span>CARVEX EXPORT DZ</span>
          <span className="block text-[9px] text-neutral-300">Alger • Jijel • Ouargla</span>
        </div>
      </div>
    </aside>
  );
}
