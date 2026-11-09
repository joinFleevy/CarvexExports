'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  Save,
  CheckCircle2,
  DollarSign,
  Ship,
  FileText,
  TrendingUp,
  Percent,
  Sliders,
  Settings2,
  Car,
  ArrowRight,
  Info,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  CustomsConfig,
  DEFAULT_CUSTOMS_CONFIG,
  calculateAdminPricing,
  AdminPricingOutput,
} from '@/lib/customs';
import { pb, Vehicle } from '@/lib/pocketbase';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';

export default function AdminPricingPage() {
  // 1. Vehicle and Basic Parameters
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('custom');
  const [carTitle, setCarTitle] = useState('Geely Coolray 2026');
  const [factoryPriceUsd, setFactoryPriceUsd] = useState<number>(11500); // 11,500$
  const [displacementCc, setDisplacementCc] = useState<number>(1498);
  const [engineType, setEngineType] = useState<'essence' | 'hybrid' | 'electric'>('essence');

  // Profit Margin
  const [usePercentageMargin, setUsePercentageMargin] = useState<boolean>(true);
  const [marginPercent, setMarginPercent] = useState<number>(10); // 10%
  const [marginCentimes, setMarginCentimes] = useState<number>(35); // 35 Million DZD centimes

  // 2. Fully Configurable & Editable Customs/Fees Settings
  const [config, setConfig] = useState<CustomsConfig>({ ...DEFAULT_CUSTOMS_CONFIG });
  const [hasCustomChanges, setHasCustomChanges] = useState<boolean>(false);

  // Status and save notifications
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load vehicles from PocketBase
  useEffect(() => {
    async function loadVehicles() {
      try {
        const res = await pb.collection('vehicles').getFullList<Vehicle>({
          filter: 'is_deleted != true',
          sort: '-year',
        });
        setVehicles(res);
      } catch (err) {
        console.error('Failed to load vehicles:', err);
      }
    }
    loadVehicles();
  }, []);

  // Update fields when selecting a car
  const handleVehicleSelect = (id: string) => {
    setSelectedVehicleId(id);
    if (id === 'custom') {
      setCarTitle('موديل جديد للاستيراد 2026');
      setFactoryPriceUsd(11500);
      setDisplacementCc(1498);
      return;
    }
    const car = vehicles.find((v) => v.id === id);
    if (car) {
      setCarTitle(car.title);
      setDisplacementCc(car.engine_displacement_cc || 1498);
      setEngineType(car.engine_type || 'essence');
      // Approximate factory USD from FOB price if available
      const fob = car.price_fob_dzd_centimes || Math.round(car.price_total_dzd_centimes * 0.7);
      const estUsd = Math.round(((fob - config.fretShippingCostCentimes) * 10000) / config.usdToDzdRate);
      setFactoryPriceUsd(estUsd > 0 ? estUsd : 11500);
    }
  };

  // Modify any fee setting
  const updateConfigField = <K extends keyof CustomsConfig>(key: K, value: CustomsConfig[K]) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasCustomChanges(true);
  };

  // 🔄 Reset to Standard Default Settings
  const resetToDefaults = () => {
    setConfig({ ...DEFAULT_CUSTOMS_CONFIG });
    setMarginPercent(DEFAULT_CUSTOMS_CONFIG.targetProfitMarginPercent);
    setMarginCentimes(DEFAULT_CUSTOMS_CONFIG.fixedProfitMarginCentimes);
    setHasCustomChanges(false);
  };

  // Run Real-time Pricing Calculation
  const result: AdminPricingOutput = calculateAdminPricing({
    factoryPriceUsd,
    engineType,
    displacementCc,
    usePercentageMargin,
    customMarginPercent: marginPercent,
    customMarginCentimes: marginCentimes,
    config,
  });

  // Editable final rounded prices that the admin can fine-tune before publishing
  const [customFinalTurnkey, setCustomFinalTurnkey] = useState<number>(0);
  const [customFinalMoudjahidine, setCustomFinalMoudjahidine] = useState<number>(0);
  const [customFinalFob, setCustomFinalFob] = useState<number>(0);

  // Sync rounded prices with calculation results
  useEffect(() => {
    setCustomFinalTurnkey(result.suggestedTurnkeyPriceCentimes);
    setCustomFinalMoudjahidine(result.suggestedMoudjahidinePriceCentimes);
    setCustomFinalFob(result.suggestedFobPriceCentimes);
  }, [result.suggestedTurnkeyPriceCentimes, result.suggestedMoudjahidinePriceCentimes, result.suggestedFobPriceCentimes]);

  // Apply to PocketBase record
  const handleApplyToVehicle = async () => {
    if (selectedVehicleId === 'custom') {
      setSaveStatus('يرجى اختيار سيارة مسجلة في المخزون لتحديثها');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    try {
      await pb.collection('vehicles').update(selectedVehicleId, {
        price_total_dzd_centimes: customFinalTurnkey,
        price_fob_dzd_centimes: customFinalFob,
      });
      setSaveStatus('✅ تم تطبيق الأسعار ونشرها بنجاح على واجهة الموقع!');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err) {
      console.error('Failed to update vehicle prices:', err);
      setSaveStatus('حدث خطأ أثناء التحديث');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-24 text-right">
      {/* Top Header */}
      <div className="border-b border-carvex-border/60 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-carvex-cyan font-bold uppercase tracking-wider mb-1">
            <Settings2 className="w-4 h-4" />
            <span>لوحة تحكم الإدارة والمشرفين (Espace Direction)</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            حاسبة التكاليف والتسعير الذكي للسيارات (Simulateur de Tarification Pro)
          </h1>
          <p className="text-xs sm:text-sm text-carvex-muted mt-1 max-w-3xl">
            أداة داخلية لأصحاب الشركة لحساب تكلفة استيراد السيارات واقتراح أسعار البيع الثابتة الثلاثة مع إمكانية تعديل كافة الرسوم والرجوع للإعدادات الافتراضية بنقرة زر.
          </p>
        </div>

        {/* Reset to Defaults Button */}
        <button
          onClick={resetToDefaults}
          className="py-2.5 px-4 rounded-xl bg-carvex-surface hover:bg-carvex-hover text-slate-200 text-xs font-bold border border-carvex-border flex items-center justify-center gap-2 transition-all self-start md:self-auto shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-carvex-cyan" />
          <span>إعادة ضبط المصنع (Valeurs par défaut)</span>
        </button>
      </div>

      {hasCustomChanges && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>تنبيه: أنت تستخدم حالياً قيماً مخصصة معدلة تختلف عن الإعدادات القانونية الافتراضية.</span>
          </div>
          <button onClick={resetToDefaults} className="underline font-bold hover:text-white">
            استعادة الافتراضيات
          </button>
        </div>
      )}

      {/* Main Grid: Inputs (Left 7 cols) & Outputs (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Config (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Vehicle Selection */}
          <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-3">
              <Car className="w-4 h-4 text-carvex-cyan" />
              <span>1. اختيار السيارة ومواصفات المصنع</span>
            </h3>

            <div>
              <label className="text-xs text-carvex-muted block mb-1">حدد السيارة من المخزون الحالي (أو موديل جديد):</label>
              <select
                value={selectedVehicleId}
                onChange={(e) => handleVehicleSelect(e.target.value)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
              >
                <option value="custom">➕ حساب موديل جديد غير مسجل في المخزون</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title} — ({v.year})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-xs text-carvex-muted block mb-1">سعر المصنع بالصين (USD $):</label>
                <div className="relative">
                  <input
                    type="number"
                    step="100"
                    value={factoryPriceUsd}
                    onChange={(e) => setFactoryPriceUsd(Number(e.target.value) || 0)}
                    className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                  />
                  <span className="absolute left-3 top-2 text-xs text-carvex-muted font-mono">$</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-carvex-muted block mb-1">سعة المحرك (cc):</label>
                <input
                  type="number"
                  value={displacementCc}
                  onChange={(e) => setDisplacementCc(Number(e.target.value) || 1498)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
              </div>

              <div>
                <label className="text-xs text-carvex-muted block mb-1">نوع المحرك:</label>
                <select
                  value={engineType}
                  onChange={(e) => setEngineType(e.target.value as any)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
                >
                  <option value="essence">بنزين توربو (Essence)</option>
                  <option value="hybrid">هجين (Hybride)</option>
                  <option value="electric">كهربائي 100% (Électrique)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Fully Editable Fees & Customs Parameters */}
          <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border space-y-5">
            <div className="flex items-center justify-between border-b border-carvex-border pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-carvex-cyan" />
                <span>2. الرسوم والمصاريف القابلة للتعديل (Paramètres Modifiables)</span>
              </h3>
              <span className="text-[10px] text-carvex-cyan bg-carvex-cyan/10 px-2 py-0.5 rounded">
                قابلة للتخصيص
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* USD Rate */}
              <div className="p-3 bg-carvex-surface rounded-xl border border-carvex-border/60">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-carvex-muted">سعر صرف الدولار (Dinar/USD):</label>
                  <span className="font-mono text-white font-bold">{config.usdToDzdRate} دج</span>
                </div>
                <input
                  type="number"
                  value={config.usdToDzdRate}
                  onChange={(e) => updateConfigField('usdToDzdRate', Number(e.target.value) || 200)}
                  className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">افتراضي: 200 دج (أو حسب سعر السوق)</span>
              </div>

              {/* Maritime Freight */}
              <div className="p-3 bg-carvex-surface rounded-xl border border-carvex-border/60">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-carvex-muted">تكلفة الشحن البحري والتأمين:</label>
                  <span className="font-mono text-white font-bold">{config.fretShippingCostCentimes} مليون</span>
                </div>
                <input
                  type="number"
                  value={config.fretShippingCostCentimes}
                  onChange={(e) => updateConfigField('fretShippingCostCentimes', Number(e.target.value) || 0)}
                  className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">افتراضي: 40 مليون (~2000$ للحاوية)</span>
              </div>

              {/* Port & Transitaire */}
              <div className="p-3 bg-carvex-surface rounded-xl border border-carvex-border/60">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-carvex-muted">مصاريف الميناء والوكيل وفحص المناجم:</label>
                  <span className="font-mono text-white font-bold">{config.portAndTransitCentimes} مليون</span>
                </div>
                <input
                  type="number"
                  step="0.5"
                  value={config.portAndTransitCentimes}
                  onChange={(e) => updateConfigField('portAndTransitCentimes', Number(e.target.value) || 0)}
                  className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">افتراضي: 13.5 مليون (جن جن / الجزائر)</span>
              </div>

              {/* Moudjahidine License Market Cost */}
              <div className="p-3 bg-carvex-surface rounded-xl border border-carvex-border/60">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-carvex-muted">تكلفة شراء رخصة المجاهدين بالسوق:</label>
                  <span className="font-mono text-white font-bold">{config.licenseMarketCostCentimes} مليون</span>
                </div>
                <input
                  type="number"
                  value={config.licenseMarketCostCentimes}
                  onChange={(e) => updateConfigField('licenseMarketCostCentimes', Number(e.target.value) || 0)}
                  className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">افتراضي: 65 مليون سنتيم</span>
              </div>
            </div>

            {/* Legal Discount Rates Toggle */}
            <div className="p-4 bg-carvex-surface/60 rounded-xl border border-carvex-border/60 space-y-3">
              <span className="text-xs font-bold text-white block">نسب الضرائب الجمركية المعتمدة (المرسوم 23-74):</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-carvex-dark rounded-lg border border-carvex-border/40">
                  <span className="text-[10px] text-carvex-muted block">حقوق الجمرك DD</span>
                  <span className="font-mono font-bold text-white">{config.baseDutyPercent}%</span>
                </div>
                <div className="p-2 bg-carvex-dark rounded-lg border border-carvex-border/40">
                  <span className="text-[10px] text-carvex-muted block">تخفيض $\le 1.8L$</span>
                  <span className="font-mono font-bold text-emerald-400">-{config.dutyDiscountPercentUnder1800}%</span>
                </div>
                <div className="p-2 bg-carvex-dark rounded-lg border border-carvex-border/40">
                  <span className="text-[10px] text-carvex-muted block">الرسم TVA + TCS</span>
                  <span className="font-mono font-bold text-white">{config.tvaPercent + config.tcsPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Profit Margin Configuration */}
          <div className="p-6 rounded-2xl bg-carvex-card border border-carvex-border space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-carvex-border pb-3">
              <TrendingUp className="w-4 h-4 text-carvex-cyan" />
              <span>3. هامش ربح الشركة المستهدف (Marge Bénéficiaire)</span>
            </h3>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                <input
                  type="radio"
                  checked={usePercentageMargin}
                  onChange={() => setUsePercentageMargin(true)}
                  className="text-carvex-cyan"
                />
                <span>نسبة مئوية من التكلفة (%)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                <input
                  type="radio"
                  checked={!usePercentageMargin}
                  onChange={() => setUsePercentageMargin(false)}
                  className="text-carvex-cyan"
                />
                <span>مبلغ مقطوع ثابت (مليون سنتيم)</span>
              </label>
            </div>

            {usePercentageMargin ? (
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-carvex-muted">نسبة الربح المستهدفة:</span>
                  <span className="font-bold text-carvex-cyan font-mono">{marginPercent}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  step="0.5"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(Number(e.target.value))}
                  className="w-full accent-carvex-cyan cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-carvex-muted font-mono mt-1">
                  <span>3% (سعر تنافسي)</span>
                  <span>10% (قياسي)</span>
                  <span>25% (فئة حصرية)</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs text-carvex-muted block mb-1">المبلغ المقطوع لكل سيارة (مليون سنتيم):</label>
                <input
                  type="number"
                  value={marginCentimes}
                  onChange={(e) => setMarginCentimes(Number(e.target.value) || 0)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Output & Pricing Decision (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-carvex-card border-2 border-carvex-cyan/40 shadow-2xl space-y-6">
            <div className="border-b border-carvex-border pb-4">
              <span className="text-xs font-bold text-carvex-cyan uppercase tracking-wider block">
                ملخص التكلفة والأسعار المقترحة
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {carTitle}
              </h3>
              <p className="text-xs text-carvex-muted mt-0.5">
                محسوبة آلياً وفق المعايير المحددة وهامش الربح: <strong className="text-carvex-cyan font-mono">{result.marginCentimes} مليون سنتيم</strong>
              </p>
            </div>

            {/* Suggested Price 1: Turnkey Clé en main */}
            <div className="p-4 rounded-xl bg-carvex-surface border border-carvex-cyan/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">1. سعر التسليم في الصالة (Clé en main)</span>
                <span className="text-[10px] text-carvex-cyan bg-carvex-cyan/10 px-2 py-0.5 rounded font-bold">
                  جمركة عادية (50%)
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex-1">
                  <span className="text-[10px] text-carvex-muted block">السعر المقترح:</span>
                  <input
                    type="number"
                    value={customFinalTurnkey}
                    onChange={(e) => setCustomFinalTurnkey(Number(e.target.value) || 0)}
                    className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1 text-base font-black text-carvex-cyan font-mono focus:outline-none focus:border-carvex-cyan"
                  />
                </div>
                <div className="text-left text-[11px] text-slate-400 font-mono pt-3">
                  التكلفة: {result.costTurnkeyCentimes}M
                </div>
              </div>
            </div>

            {/* Suggested Price 2: Moudjahidine */}
            <div className="p-4 rounded-xl bg-carvex-surface border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">2. السعر مع توفير رخصة مجاهدين</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                  إعفاء 100%
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex-1">
                  <span className="text-[10px] text-carvex-muted block">السعر المقترح:</span>
                  <input
                    type="number"
                    value={customFinalMoudjahidine}
                    onChange={(e) => setCustomFinalMoudjahidine(Number(e.target.value) || 0)}
                    className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1 text-base font-black text-emerald-400 font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="text-left text-[11px] text-slate-400 font-mono pt-3">
                  التكلفة: {result.costMoudjahidineMarketCentimes}M
                </div>
              </div>
            </div>

            {/* Suggested Price 3: FOB Port Only */}
            <div className="p-4 rounded-xl bg-carvex-surface border border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">3. السعر واصل للميناء فقط (FOB)</span>
                <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold">
                  بدون جمركة
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex-1">
                  <span className="text-[10px] text-carvex-muted block">السعر المقترح:</span>
                  <input
                    type="number"
                    value={customFinalFob}
                    onChange={(e) => setCustomFinalFob(Number(e.target.value) || 0)}
                    className="w-full bg-carvex-dark border border-carvex-border rounded-lg px-2.5 py-1 text-base font-black text-blue-400 font-mono focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div className="text-left text-[11px] text-slate-400 font-mono pt-3">
                  التكلفة: {result.fobPriceCentimes}M
                </div>
              </div>
            </div>

            {/* Apply & Save Action */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleApplyToVehicle}
                className="w-full py-3.5 px-4 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-carvex-cyan/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>نشر وتطبيق الأسعار على السيارة بالموقع</span>
              </button>

              {saveStatus && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-400 font-bold">
                  {saveStatus}
                </div>
              )}
            </div>

            {/* Cost Breakdown Details */}
            <div className="pt-4 border-t border-carvex-border/60 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-carvex-muted block">تفصيل التكلفة الصافية للسيارة (Coût de revient):</span>
              <div className="flex justify-between text-slate-300">
                <span>سعر المصنع + الشحن (FOB):</span>
                <span className="font-mono">{result.fobPriceCentimes} مليون</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>الرسوم الجمركية الصافية:</span>
                <span className="font-mono">{result.costTurnkeyCentimes - result.fobPriceCentimes - config.portAndTransitCentimes} مليون</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>الميناء والتفتيش والوكيل:</span>
                <span className="font-mono">{config.portAndTransitCentimes} مليون</span>
              </div>
              <div className="flex justify-between font-bold text-carvex-cyan border-t border-carvex-border/40 pt-1.5">
                <span>هامش ربح الوكالة الصافي:</span>
                <span className="font-mono">+{result.marginCentimes} مليون سنتيم</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
