import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-carvex-border bg-carvex-dark text-carvex-muted text-right">
      {/* Top Banner: Trust badges */}
      <div className="border-b border-carvex-border/50 py-8 bg-carvex-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          <div className="flex items-center gap-3 justify-end">
            <div>
              <h4 className="text-sm font-bold text-white">شحن مؤمّن وموثق</h4>
              <p className="text-xs text-carvex-muted">بوليصة شحن بحرية رسمية B/L</p>
            </div>
            <div className="p-3 rounded-xl bg-carvex-cyan/10 text-carvex-cyan">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <div>
              <h4 className="text-sm font-bold text-white">3 صالات عرض فعلية</h4>
              <p className="text-xs text-carvex-muted">العاصمة · جيجل · ورقلة</p>
            </div>
            <div className="p-3 rounded-xl bg-carvex-cyan/10 text-carvex-cyan">
              <MapPin className="w-6 h-6" />
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <div>
              <h4 className="text-sm font-bold text-white">أسعار شفافة بالدينار</h4>
              <p className="text-xs text-carvex-muted">واصل للميناء أو شامل كل المصاريف</p>
            </div>
            <div className="p-3 rounded-xl bg-carvex-cyan/10 text-carvex-cyan">
              <span className="text-lg font-black text-carvex-cyan font-mono">DZD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <div>
              <h4 className="text-sm font-bold text-white">مطابقة قانونية كاملة</h4>
              <p className="text-xs text-carvex-muted">المرسوم 23-74 ورخص المجاهدين</p>
            </div>
            <div className="p-3 rounded-xl bg-carvex-cyan/10 text-carvex-cyan">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-carvex-cyan/30 bg-black">
              <Image src="/images/logo.jpg" alt="CARVEX EXPORT" fill className="object-contain p-1" />
            </div>
            <div>
              <span className="text-xl font-black text-white block">CARVEX EXPORT</span>
              <span className="text-xs text-carvex-cyan font-semibold block">YOUR GLOBAL AUTO PARTNER</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-carvex-muted">
            المؤسسة المتخصصة في استيراد وبيع السيارات الأصلية الجديدة والأقل من 3 سنوات من كبرى المصانع العالمية في الصين وأوروبا مباشرة إلى السوق الجزائري.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/Carvexexport/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-carvex-card border border-carvex-border hover:border-carvex-cyan text-carvex-muted hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <span className="text-xs font-bold font-mono">FB</span>
            </a>
            <a
              href="https://www.instagram.com/carvexexport/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-carvex-card border border-carvex-border hover:border-carvex-cyan text-carvex-muted hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <span className="text-xs font-bold font-mono">IG</span>
            </a>
            <a
              href="https://www.tiktok.com/@carvex.export"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-carvex-card border border-carvex-border hover:border-carvex-cyan text-carvex-muted hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <span className="text-xs font-bold font-mono">TT</span>
            </a>
            <a
              href="https://www.youtube.com/@Carvex.export"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-carvex-card border border-carvex-border hover:border-carvex-cyan text-carvex-muted hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <span className="text-xs font-bold font-mono">YT</span>
            </a>
          </div>
        </div>

        {/* Col 2: Showroom Algiers & Jijel */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white border-b border-carvex-border pb-2">
            صالات الوسط والشرق
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-carvex-cyan">صالة الجزائر العاصمة (المحمدية):</p>
              <p className="text-carvex-muted">شارع نسيب عبود، المحمدية (قرب SAFEX)</p>
              <p className="font-mono text-white mt-0.5">0779055489 / 0557053814</p>
            </div>
            <div>
              <p className="font-bold text-carvex-cyan">صالة جيجل (بوالرمل):</p>
              <p className="text-carvex-muted">المنطقة التجارية بوالرمل، الطاهير (قرب ميناء جن جن)</p>
              <p className="font-mono text-white mt-0.5">0660656274 / 0554154163</p>
            </div>
          </div>
        </div>

        {/* Col 3: Showroom Ouargla & Admin */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white border-b border-carvex-border pb-2">
            صالة الجنوب والإدارة
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-carvex-cyan">صالة ورقلة (وسط المدينة):</p>
              <p className="text-carvex-muted">حي النصر / وسط المدينة، ولاية ورقلة</p>
              <p className="font-mono text-white mt-0.5">0660414034 / 0661466727</p>
            </div>
            <div>
              <p className="font-bold text-carvex-cyan">الإدارة العامة والمبيعات المركزية:</p>
              <p className="font-mono text-white mt-0.5">0770727007</p>
              <p className="text-[11px] text-carvex-muted">أوقات العمل: السبت - الخميس (08:30 إلى 17:30)</p>
            </div>
          </div>
        </div>

        {/* Col 4: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white border-b border-carvex-border pb-2">
            روابط سريعة
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/inventory" className="hover:text-carvex-cyan transition-colors">
                • السيارات المتوفرة للتسليم الفوري
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="hover:text-carvex-cyan transition-colors">
                • حاسبة الرسوم الجمركية التقديرية
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-carvex-cyan transition-colors">
                • تتبع مسار الحاوية والباخرة (PIN)
              </Link>
            </li>
            <li>
              <Link href="/showrooms" className="hover:text-carvex-cyan transition-colors">
                • عناوين الفروع على خرائط غوغل
              </Link>
            </li>
            <li>
              <Link href="/documents" className="hover:text-carvex-cyan transition-colors">
                • إصدار وصولات العربون وعقود البيع
              </Link>
            </li>
            <li>
              <a
                href="http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/_/"
                target="_blank"
                rel="noreferrer"
                className="text-carvex-muted/60 hover:text-carvex-cyan flex items-center gap-1 mt-2 text-[11px]"
              >
                بوابة المشرفين والمبيعات (Staff Login)
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-carvex-border/40 py-6 text-center text-xs text-carvex-muted">
        <p>© {new Date().getFullYear()} CARVEX EXPORT. جميع الحقوق محفوظة لشركة كاركس إكسبورت لاستيراد السيارات.</p>
      </div>
    </footer>
  );
}
