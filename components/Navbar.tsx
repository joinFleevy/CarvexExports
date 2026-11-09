'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import BranchModal from './BranchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/inventory', label: 'المخزون والسيارات' },
    { href: '/calculator', label: 'حاسبة التكلفة' },
    { href: '/track', label: 'تتبع الشحنة' },
    { href: '/showrooms', label: 'الفروع والصالات' },
    { href: '/documents', label: 'الوثائق والعقود' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-800 bg-black">
              <Image
                src="/images/logo.jpg"
                alt="CARVEX EXPORT"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <span className="text-lg font-bold tracking-wide text-white block">
                CARVEX EXPORT
              </span>
              <span className="text-xs text-neutral-400 block">
                استيراد وتوزيع السيارات
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setBranchModalOpen(true)}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-neutral-700 hover:border-neutral-500 text-white transition-colors"
            >
              فروعنا (العاصمة • جيجل • ورقلة)
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-neutral-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBranchModalOpen(true);
              }}
              className="w-full mt-2 text-center px-4 py-2.5 text-xs font-medium rounded-lg border border-neutral-700 text-white"
            >
              فروعنا وصالات العرض
            </button>
          </div>
        )}
      </header>

      <BranchModal
        isOpen={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
      />
    </>
  );
}
