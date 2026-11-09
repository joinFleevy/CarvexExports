import React from 'react';

const BRANDS = [
  { name: 'GEELY', country: 'الصين', logoText: 'GEELY' },
  { name: 'JETOUR', country: 'الصين', logoText: 'JETOUR' },
  { name: 'CHERY', country: 'الصين', logoText: 'CHERY' },
  { name: 'MG', country: 'بريطانيا / الصين', logoText: 'MG' },
  { name: 'GAC MOTOR', country: 'الصين', logoText: 'GAC' },
  { name: 'CHANGAN', country: 'الصين', logoText: 'CHANGAN' },
  { name: 'LIVAN', country: 'الصين', logoText: 'LIVAN' },
  { name: 'KIA', country: 'كوريا الجنوبية', logoText: 'KIA' },
  { name: 'AUDI', country: 'ألمانيا', logoText: 'AUDI' },
  { name: 'VOLKSWAGEN', country: 'ألمانيا', logoText: 'VW' },
];

export default function BrandMarquee() {
  return (
    <div className="w-full py-8 border-y border-carvex-border/60 bg-carvex-surface/40 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-carvex-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-carvex-dark to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase tracking-widest text-carvex-muted font-bold">
          ماركات عالمية أصلية مستوردة مباشرة من المصدر
        </p>
      </div>

      <div className="flex w-max animate-marquee space-x-12 space-x-reverse items-center">
        {[...BRANDS, ...BRANDS].map((brand, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-carvex-card/50 border border-carvex-border/40 hover:border-carvex-cyan/40 transition-colors"
          >
            <span className="text-base font-black tracking-widest text-white/90 font-mono">
              {brand.logoText}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-carvex-dark text-carvex-muted border border-carvex-border/60">
              {brand.country}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
