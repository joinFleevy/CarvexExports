'use client';

import React, { useState } from 'react';
import { Calculator, ShieldCheck, CheckCircle2, MessageCircle, Info, Sparkles, Building2 } from 'lucide-react';
import { calculateAlgerianCustoms, CalculatorInput } from '@/lib/customs';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';
import BranchModal from '@/components/BranchModal';

const PRESET_MODELS = [
  { name: 'Geely Coolray (1.5L Turbo)', fobCentimes: 270, engineType: 'essence', cc: 1498 },
  { name: 'MG5 Global (1.5L)', fobCentimes: 185, engineType: 'essence', cc: 1498 },
  { name: 'Jetour Dashing (1.5L Turbo)', fobCentimes: 295, engineType: 'essence', cc: 1498 },
  { name: 'Chery Tiggo 4 Pro (1.5L)', fobCentimes: 210, engineType: 'essence', cc: 1498 },
];

export default function CalculatorPage() {
  const [fobPrice, setFobPrice] = useState<number>(270);
  const [engineType, setEngineType] = useState<'essence' | 'hybrid' | 'electric'>('essence');
  const [displacementCc, setDisplacementCc] = useState<number>(1498);
  const [regime, setRegime] = useState<
    'individual_under_3_years' | 'moudjahidine_own_license' | 'moudjahidine_market_license'
  >('individual_under_3_years');
  const [branchModalOpen, setBranchModalOpen] = useState(false);

  const result = calculateAlgerianCustoms({
    fobPriceCentimes: fobPrice,
    engineType,
    displacementCc,
    regime,
  });

  const handleApplyPreset = (preset: typeof PRESET_MODELS[0]) => {
    setFobPrice(preset.fobCentimes);
    setEngineType(preset.engineType as any);
    setDisplacementCc(preset.cc);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carvex-cyan/15 text-carvex-cyan text-xs font-bold">
          <Calculator className="w-4 h-4" />
          <span>مطابقة للمرسوم التنفيذي 23-74 والمادة 110 من قانون المالية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          حاسبة الرسوم الجمركية وتكاليف الاستيراد التقديرية
        </h1>
        <p className="text-sm text-carvex-muted leading-relaxed max-w-3xl">
          أداة ذكية تمكنك من تقدير التكلفة الإجمالية لسيارتك بالدينار الجزائري وفق القوانين الرسمية: احتساب تخفيض 50% للسيارات الأقل من 1.8 لتر، أو إعفاء رخص المجاهدين، مع مصاريف الميناء والوكيل الجمركي.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-carvex-surface border border-carvex-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* Quick Presets */}
          <div>
            <label className="text-xs font-bold text-carvex-muted block mb-2">
              نماذج جاهزة سريعة للاختيار:
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_MODELS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    fobPrice === p.fobCentimes
                      ? 'bg-carvex-cyan text-black border-carvex-cyan font-black'
                      : 'bg-carvex-card text-carvex-muted border-carvex-border hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* 1. FOB Price Slider & Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">
                سعر السيارة واصل للميناء (FOB + الشحن البحري):
              </span>
              <span className="text-lg font-black text-carvex-cyan font-mono">
                {fobPrice} مليون سنتيم
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="700"
              step="5"
              value={fobPrice}
              onChange={(e) => setFobPrice(Number(e.target.value))}
              className="w-full accent-carvex-cyan h-2 bg-carvex-card rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-carvex-muted mt-1 font-mono">
              <span>100M</span>
              <span>400M</span>
              <span>700M</span>
            </div>
          </div>

          {/* 2. Customs Regime */}
          <div>
            <label className="text-sm font-bold text-white block mb-2">
              نظام الجمركة المعتمد:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRegime('individual_under_3_years')}
                className={`p-3 rounded-xl border text-xs font-bold text-right transition-all ${
                  regime === 'individual_under_3_years'
                    ? 'border-carvex-cyan bg-carvex-cyan/15 text-white'
                    : 'border-carvex-border bg-carvex-card text-carvex-muted hover:text-white'
                }`}
              >
                <span className="block font-black mb-1">استيراد عادي</span>
                <span className="text-[10px] text-carvex-muted block">
                  قانون أقل من 3 سنوات (تخفيض 50%)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRegime('moudjahidine_own_license')}
                className={`p-3 rounded-xl border text-xs font-bold text-right transition-all ${
                  regime === 'moudjahidine_own_license'
                    ? 'border-carvex-cyan bg-carvex-cyan/15 text-white'
                    : 'border-carvex-border bg-carvex-card text-carvex-muted hover:text-white'
                }`}
              >
                <span className="block font-black mb-1">أملك رخصة مجاهدين</span>
                <span className="text-[10px] text-carvex-muted block">
                  إعفاء كامل 100% من الجمركة
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRegime('moudjahidine_market_license')}
                className={`p-3 rounded-xl border text-xs font-bold text-right transition-all ${
                  regime === 'moudjahidine_market_license'
                    ? 'border-carvex-cyan bg-carvex-cyan/15 text-white'
                    : 'border-carvex-border bg-carvex-card text-carvex-muted hover:text-white'
                }`}
              >
                <span className="block font-black mb-1">شراء رخصة مجاهدين</span>
                <span className="text-[10px] text-carvex-muted block">
                  إعفاء + سعر الرخصة بالسوق (~65M)
                </span>
              </button>
            </div>
          </div>

          {/* 3. Engine Displacement */}
          {regime === 'individual_under_3_years' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">سعة المحرك (Cylindrée):</span>
                <span className="text-xs font-bold text-carvex-cyan font-mono">
                  {displacementCc <= 1800 ? '≤ 1.8L (تخفيض 50%)' : '> 1.8L (تخفيض 20%)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDisplacementCc(1498)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    displacementCc <= 1800
                      ? 'border-carvex-cyan bg-carvex-cyan/15 text-white font-black'
                      : 'border-carvex-border bg-carvex-card text-carvex-muted hover:text-white'
                  }`}
                >
                  محرك اقتصادي ≤ 1800 سم³ (1.5L / 1.8L)
                </button>
                <button
                  type="button"
                  onClick={() => setDisplacementCc(2000)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    displacementCc > 1800
                      ? 'border-carvex-cyan bg-carvex-cyan/15 text-white font-black'
                      : 'border-carvex-border bg-carvex-card text-carvex-muted hover:text-white'
                  }`}
                >
                  محرك كبير &gt; 1800 سم³ (2.0L فما فوق)
                </button>
              </div>
            </div>
          )}

          {/* 4. Fuel Type */}
          <div>
            <label className="text-sm font-bold text-white block mb-2">نوع الوقود:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setEngineType('essence')}
                className={`py-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                  engineType === 'essence'
                    ? 'border-carvex-cyan bg-carvex-cyan/15 text-white'
                    : 'border-carvex-border bg-carvex-card text-carvex-muted'
                }`}
              >
                بنزين (Essence)
              </button>
              <button
                type="button"
                onClick={() => setEngineType('hybrid')}
                className={`py-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                  engineType === 'hybrid'
                    ? 'border-carvex-cyan bg-carvex-cyan/15 text-white'
                    : 'border-carvex-border bg-carvex-card text-carvex-muted'
                }`}
              >
                هجين (Hybride)
              </button>
              <button
                type="button"
                onClick={() => setEngineType('electric')}
                className={`py-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                  engineType === 'electric'
                    ? 'border-carvex-cyan bg-carvex-cyan/15 text-white'
                    : 'border-carvex-border bg-carvex-card text-carvex-muted'
                }`}
              >
                كهربائية (تخفيض 80%)
              </button>
            </div>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-carvex-card to-carvex-surface border border-carvex-cyan/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          
          <div className="border-b border-carvex-border pb-4">
            <span className="text-xs font-bold text-carvex-muted uppercase tracking-wider block mb-1">
              التكلفة الإجمالية التقديرية
            </span>
            <div className="text-3xl sm:text-4xl font-black text-carvex-cyan font-mono tracking-tight">
              {formatPriceCentimes(result.totalEstimatedCentimes)}
            </div>
            <div className="text-xs font-bold text-slate-300 font-mono mt-1">
              ما يعادل تقريباً: {formatDinar(result.totalEstimatedCentimes)}
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 text-xs">
            {result.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-carvex-border/40">
                <span className="text-carvex-muted">{item.label}</span>
                <span className="font-bold text-white font-mono">{item.amountCentimes} مليون</span>
              </div>
            ))}
          </div>

          {/* Legal Note */}
          <div className="p-3.5 rounded-xl bg-carvex-dark/80 border border-carvex-border/80 text-[11px] text-carvex-muted flex items-start gap-2">
            <Info className="w-4 h-4 text-carvex-cyan shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              هذه الحسابات مبنية على القوانين الرسمية السارية لعام 2026. الأسعار النهائية بالدينار تخضع لتحديثات سعر الصرف الرسمي في يوم الدخول الجمركي.
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              onClick={() => setBranchModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm transition-all shadow-xl shadow-carvex-cyan/20 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب جدول التكاليف وعقد الحجز عبر واتساب</span>
            </button>
          </div>
        </div>

      </div>

      {/* Global Branch Modal */}
      <BranchModal
        isOpen={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
        sourceContext={`حساب جمركي بقيمة ${result.totalEstimatedCentimes} مليون سنتيم`}
      />
    </div>
  );
}
