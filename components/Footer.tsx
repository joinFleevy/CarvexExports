'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // If on the full-screen homepage or vehicle catalogue app page, do not render the public footer
  if (pathname === '/' || pathname === '/vehicles' || pathname === '/inventory' || pathname === '/products') {
    return null;
  }

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-md overflow-hidden border border-neutral-800 bg-black">
              <Image
                src="/images/logo.jpg"
                alt="CARVEX EXPORT"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">CARVEX EXPORT</span>
              <span className="text-xs text-neutral-500 block">شركة استيراد وتوزيع السيارات</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            استيراد مباشر من المصانع العالمية مع التسليم في صالاتنا في الجزائر العاصمة، جيجل، وورقلة.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">روابط سريعة</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/inventory" className="hover:text-white transition-colors">المخزون والسيارات</Link></li>
            <li><Link href="/calculator" className="hover:text-white transition-colors">حاسبة التكلفة والجمارك</Link></li>
            <li><Link href="/track" className="hover:text-white transition-colors">تتبع مسار الشحنة</Link></li>
            <li><Link href="/showrooms" className="hover:text-white transition-colors">صالات العرض والفروع</Link></li>
          </ul>
        </div>

        {/* Col 3: Showroom Contacts */}
        <div className="space-y-2 text-xs">
          <h4 className="text-xs font-semibold text-white uppercase tracking-[0.06em]">فروعنا الرسمية</h4>
          <p className="text-neutral-300">
            الجزائر العاصمة: <bdi dir="ltr" className="tabular-nums text-neutral-400">0779 05 54 89</bdi>
          </p>
          <p className="text-neutral-300">
            جيجل (بوالرمل): <bdi dir="ltr" className="tabular-nums text-neutral-400">0660 65 62 74</bdi>
          </p>
          <p className="text-neutral-300">
            ورقلة (حي النصر): <bdi dir="ltr" className="tabular-nums text-neutral-400">0660 41 40 34</bdi>
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-600">
        &copy; <span className="tabular-nums">{new Date().getFullYear()}</span>{' '}
        <bdi dir="ltr">CARVEX EXPORT</bdi>. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
