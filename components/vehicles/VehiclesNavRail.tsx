'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Car,
  FileText,
  Heart,
  Clock,
  Bell,
  MessageSquare,
  CreditCard,
  LifeBuoy,
  LogOut,
} from 'lucide-react';

interface VehiclesNavRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount: number;
  unreadNotifications?: number;
}

export default function VehiclesNavRail({
  activeTab,
  onTabChange,
  favoritesCount,
  unreadNotifications = 3,
}: VehiclesNavRailProps) {
  const mainNav = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'vehicles', label: 'Vehicles', icon: Car, href: '/vehicles' },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'favourites', label: 'Favourites', icon: Heart, badge: favoritesCount },
    { id: 'recents', label: 'Recents', icon: Clock },
  ];

  const secondaryNav = [
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifications },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  const bottomNav = [
    { id: 'license', label: 'License', icon: CreditCard, href: '/track' },
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <aside className="w-44 shrink-0 bg-white border-r border-neutral-100 flex flex-col justify-between py-6 px-3 select-none">
      <div className="space-y-6">
        {/* Top Navigation Items */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            const content = (
              <button
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );

            return item.href ? (
              <Link key={item.id} href={item.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-neutral-100 mx-2" />

        {/* Secondary Nav */}
        <nav className="space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned Items */}
      <div className="pt-4 border-t border-neutral-100 space-y-1">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const content = (
            <button
              type="button"
              onClick={() => onTabChange(item.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <Icon className="w-4 h-4 text-neutral-400" />
              <span>{item.label}</span>
            </button>
          );

          return item.href ? (
            <Link key={item.id} href={item.href} className="block">
              {content}
            </Link>
          ) : (
            <div key={item.id}>{content}</div>
          );
        })}
      </div>
    </aside>
  );
}
