'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, PhoneCall, Calculator, Compass, Car, Building, ShieldCheck, FileText } from 'lucide-react';
import BranchModal from './BranchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/inventory', label: 'السيارات المتوفرة', badge: '2026' },
    { href: '/calculator', label: 'حاسبة الجمارك', icon: Calculator },
    { href: '/track', label: 'تتبع شحنتك', icon: Compass },
    { href: '/showrooms', label: 'صالاتنا وفروعنا', icon: Building },
    { href: '/documents', label: 'الوصولات والعقود', icon: FileText },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-carvex-border/80 bg-carvex-dark/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-carvex-cyan/30 group-hover:border-carvex-cyan transition-colors bg-black shadow-lg shadow-carvex-cyan/5">
              <Image
                src="/images/logo.jpg"
                alt="CARVEX EXPORT"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold tracking-wider text-white block group-hover:text-carvex-cyan transition-colors">
                CARVEX <span className="text-carvex-cyan font-black">EXPORT</span>
              </span>
              <span className="text-[10px] text-carvex-muted block tracking-tight font-medium -mt-1">
                استيراد وبيع سيارات أصلية بجودة عالية
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-carvex-cyan bg-carvex-cyan/10 font-bold'
                      : 'text-carvex-muted hover:text-white hover:bg-carvex-surface'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-carvex-red text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA: Branch Selector Drawer */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setBranchModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-carvex-cyan to-carvex-cyan-hover text-black font-extrabold text-sm shadow-lg shadow-carvex-cyan/20 hover:shadow-carvex-cyan/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4" />
              تواصل مع الصالات
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setBranchModalOpen(true)}
              className="p-2 rounded-lg bg-carvex-cyan/10 text-carvex-cyan"
              aria-label="Contact Branches"
            >
              <PhoneCall className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-carvex-muted hover:text-white hover:bg-carvex-surface"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-carvex-border bg-carvex-surface px-4 pt-2 pb-6 space-y-2 animate-fade-in text-right">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-carvex-cyan/15 text-carvex-cyan'
                      : 'text-carvex-muted hover:text-white hover:bg-carvex-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-carvex-red text-white">
                        {link.badge}
                      </span>
                    )}
                    <span>{link.label}</span>
                  </div>
                </Link>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBranchModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-carvex-cyan text-black font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                تواصل مع الصالات والمبيعات
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Branch Modal */}
      <BranchModal isOpen={branchModalOpen} onClose={() => setBranchModalOpen(false)} />
    </>
  );
}
