'use client';

import React from 'react';
import { MapPin, Phone, MessageSquare, Building2, Clock, ShieldCheck, Navigation } from 'lucide-react';
import { BRANCHES } from '@/components/BranchModal';

export default function ShowroomsPage() {
  const showrooms = [
    {
      id: 'alger',
      name: 'صالة الجزائر العاصمة (المحمدية)',
      role: 'الصالة المركزية واستقبال زبائن الوسط والغرب',
      address: 'شارع نسيب عبود، بلدية المحمدية (قرب الصنوبر البحري وقصر المعارض SAFEX)، الجزائر العاصمة',
      phones: ['0779055489', '0557053814', '0770727007'],
      whatsapp: '213779055489',
      hours: 'السبت – الخميس: 08:30 – 17:30',
      mapsQuery: 'Rue+Nacib+Abboud+Mohammadia+Alger',
    },
    {
      id: 'jijel',
      name: 'صالة ولاية جيجل (بوالرمل)',
      role: 'صالة الشرق ومركز استقبال الشحنات البحرية بميناء جن جن',
      address: 'المنطقة التجارية بوالرمل، بلدية الطاهير (قرب ميناء جن جن Djen Djen Port)، ولاية جيجل',
      phones: ['0660656274', '0554154163'],
      whatsapp: '213660656274',
      hours: 'السبت – الخميس: 08:30 – 17:30',
      mapsQuery: 'Boulrimal+Taher+Jijel',
    },
    {
      id: 'ouergla',
      name: 'صالة ولاية ورقلة (وسط المدينة)',
      role: 'صالة تلبية طلبات زبائن الجنوب ورجال الأعمال وقطاع الطاقة',
      address: 'حي النصر / وسط المدينة، ولاية ورقلة',
      phones: ['0660414034', '0661466727'],
      whatsapp: '213660414034',
      hours: 'السبت – الخميس: 08:30 – 17:30',
      mapsQuery: 'Cite+En+Nasr+Ouargla',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carvex-cyan/15 text-carvex-cyan text-xs font-bold">
          <Building2 className="w-4 h-4" />
          <span>صالات عرض واستقبال في 3 ولايات بالجزائر</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-white">
          صالات وفروع <bdi dir="ltr">CARVEX EXPORT</bdi>
        </h1>
        <p className="text-base text-carvex-muted max-w-prose leading-relaxed">
          يسعدنا استقبالكم في صالاتنا للمعاينة الميدانية للسيارات المتوفرة، توقيع عقود الاستيراد، واستلام المفاتيح والوثائق الرسمية.
        </p>
      </div>

      {/* Showrooms Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {showrooms.map((s) => (
          <div
            key={s.id}
            className="p-6 sm:p-8 rounded-2xl bg-carvex-card border border-carvex-border hover:border-carvex-cyan/60 transition-all shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-carvex-border/60">
                <span className="p-2.5 rounded-xl bg-carvex-cyan/15 text-carvex-cyan">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-carvex-cyan">{s.role}</span>
              </div>

              <h2 className="text-xl font-bold tracking-[-0.015em] text-white">{s.name}</h2>

              {/* Address */}
              <div className="space-y-1 text-xs">
                <span className="text-carvex-muted font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-carvex-cyan shrink-0" />
                  <span>العنوان الميداني:</span>
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">{s.address}</p>
              </div>

              {/* Phones */}
              <div className="space-y-1 text-xs">
                <span className="text-carvex-muted font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-carvex-cyan shrink-0" />
                  <span>أرقام الهواتف:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {s.phones.map((p, i) => (
                    <a
                      key={i}
                      href={`tel:${p}`}
                      className="px-2.5 py-1 rounded-md bg-carvex-surface border border-carvex-border hover:border-carvex-cyan text-white tabular-nums font-bold"
                    >
                      <bdi dir="ltr">{p}</bdi>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2 text-xs text-carvex-muted">
                <Clock className="w-3.5 h-3.5 text-carvex-muted shrink-0" />
                <span className="tabular-nums">{s.hours}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-carvex-border/60">
              <a
                href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`السلام عليكم CARVEX، أتواصل معكم بخصوص الاستفسار عن سيارات صالة [${s.name}].`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-carvex-cyan/15"
              >
                <MessageSquare className="w-4 h-4" />
                <span>محادثة واتساب مباشرة مع الصالة</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${s.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-white text-xs font-bold border border-carvex-border transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-carvex-cyan" />
                <span>الموقع عبر خرائط <bdi dir="ltr">Google</bdi></span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
