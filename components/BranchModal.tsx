'use client';

import React from 'react';
import { X, MapPin, Phone, MessageSquare, Building2, CheckCircle2 } from 'lucide-react';

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
    location: 'المحمدية / الصنوبر البحري (قرب SAFEX)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-carvex-surface border border-carvex-border rounded-2xl p-6 shadow-2xl text-right">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-carvex-muted hover:text-white rounded-lg hover:bg-carvex-card transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carvex-cyan/10 text-carvex-cyan text-xs font-medium mb-2">
            <Building2 className="w-3.5 h-3.5" />
            تواصل مباشر وفوري
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            اختر صالة العرض أو الإدارة للتواصل
          </h3>
          <p className="text-sm text-carvex-muted">
            {carTitle
              ? `طلب استفسار أو حجز للسيارة: ${carTitle}`
              : 'حدد الصالة الأقرب إليك لبدء محادثة واتساب مع المستشار التجاري'}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="space-y-3">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              onClick={() => handleWhatsApp(b.whatsapp, b.name)}
              className="group p-4 bg-carvex-card border border-carvex-border hover:border-carvex-cyan rounded-xl cursor-pointer transition-all hover:shadow-lg hover:shadow-carvex-cyan/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-carvex-cyan">
                <span className="p-2.5 rounded-lg bg-carvex-cyan/10 group-hover:bg-carvex-cyan group-hover:text-black transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </span>
              </div>
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-carvex-border text-carvex-muted">
                    {b.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-carvex-cyan transition-colors">
                    {b.name}
                  </h4>
                </div>
                <p className="text-xs text-carvex-muted flex items-center gap-1 justify-end">
                  {b.location}
                  <MapPin className="w-3 h-3 text-carvex-muted" />
                </p>
                <p className="text-xs text-carvex-muted flex items-center gap-1 justify-end mt-0.5 font-mono">
                  {b.phones.join(' / ')}
                  <Phone className="w-3 h-3 text-carvex-muted" />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-5 pt-4 border-t border-carvex-border text-center">
          <p className="text-xs text-carvex-muted">
            أو اتصل بالإدارة المركزية مباشرة على الرقم:{' '}
            <a href="tel:0770727007" className="text-carvex-cyan font-bold hover:underline font-mono">
              0770727007
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
