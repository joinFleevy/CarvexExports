'use client';

import React from 'react';
import { X, MapPin, Phone } from 'lucide-react';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  carTitle?: string;
  sourceContext?: string;
}

export const BRANCHES = [
  {
    id: 'alger',
    name: 'صالة الجزائر العاصمة (المحمدية)',
    location: 'المحمدية / الصنوبر البحري',
    phones: ['0779055489', '0557053814'],
    whatsapp: '213779055489',
    badge: 'الوسط والغرب',
  },
  {
    id: 'jijel',
    name: 'صالة جيجل (بوالرمل)',
    location: 'المنطقة التجارية بوالرمل (قرب ميناء جن جن)',
    phones: ['0660656274', '0554154163'],
    whatsapp: '213660656274',
    badge: 'الشرق وميناء جن جن',
  },
  {
    id: 'ouergla',
    name: 'صالة ورقلة (وسط المدينة)',
    location: 'حي النصر / وسط المدينة، ورقلة',
    phones: ['0660414034', '0661466727'],
    whatsapp: '213660414034',
    badge: 'زبائن الجنوب',
  },
  {
    id: 'admin',
    name: 'الإدارة العامة والمبيعات الكبرى',
    location: 'الجزائر العاصمة',
    phones: ['0770727007'],
    whatsapp: '213770727007',
    badge: 'الإدارة المركزية',
  },
];

export default function BranchModal({ isOpen, onClose, carTitle, sourceContext }: BranchModalProps) {
  if (!isOpen) return null;

  const handleWhatsApp = (whatsappNumber: string, branchName: string) => {
    let message = 'السلام عليكم CARVEX EXPORT، أود الاستفسار بخصوص خدماتكم';
    if (carTitle) {
      message = `السلام عليكم CARVEX EXPORT، أنا مهتم بسيارة [${carTitle}] المعروضة في موقعكم عبر فرع [${branchName}]. هل يمكن تزويدي بالتفاصيل؟`;
    } else if (sourceContext) {
      message = `السلام عليكم CARVEX EXPORT، أتواصل معكم بخصوص [${sourceContext}] عبر [${branchName}].`;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-right">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-1">
            اختر صالة العرض أو الإدارة
          </h3>
          <p className="text-xs text-neutral-400">
            {carTitle
              ? `طلب استفسار عن: ${carTitle}`
              : 'اختر الصالة الأقرب لبدء محادثة واتساب مباشرة'}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="space-y-2">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              onClick={() => handleWhatsApp(b.whatsapp, b.name)}
              className="p-3.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-600 rounded-lg cursor-pointer transition-colors flex items-center justify-between"
            >
              <div className="text-xs text-neutral-400">
                <span>تواصل عبر واتساب &larr;</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    {b.badge}
                  </span>
                  <h4 className="text-sm font-semibold text-white">
                    {b.name}
                  </h4>
                </div>
                <p className="text-xs text-neutral-400 flex items-center gap-1 justify-end">
                  {b.location}
                  <MapPin className="w-3 h-3" />
                </p>
                <p className="text-xs text-neutral-400 flex items-center gap-1 justify-end mt-0.5 font-mono">
                  {b.phones.join(' / ')}
                  <Phone className="w-3 h-3" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
