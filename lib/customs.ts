// Algerian Customs & Import Cost Calculator Engine
// Based on Decree 23-74 & Finance Law Article 110

export interface CustomsConfig {
  usdToDzdRate: number; // سعر الصرف للدولار (مثلاً 200 دج أو الصرف المعتمد)
  fretShippingCostCentimes: number; // تكلفة الشحن البحري والتأمين للحاوية بالسنتيم (مثلاً 40 مليون ~ 2000$)
  baseDutyPercent: number; // نسبة الحقوق الجمركية الأساسية DD (30%)
  dutyDiscountPercentUnder1800: number; // نسبة التخفيض القانوني لأقل من 1.8L (50%)
  dutyDiscountPercentElectric: number; // نسبة التخفيض للسيارات الكهربائية (80%)
  tcsPercent: number; // رسم التضامن الإضافي TCS (2%)
  tvaPercent: number; // الرسم على القيمة المضافة TVA (19%)
  portAndTransitCentimes: number; // مصاريف الميناء والإنزال والوكيل وفحص المناجم (13.5 مليون سنتيم)
  licenseMarketCostCentimes: number; // متوسط تكلفة شراء رخصة المجاهدين بالسوق (65 مليون سنتيم)
  targetProfitMarginPercent: number; // هامش الربح المستهدف بالنسبة المئوية (10%)
  fixedProfitMarginCentimes: number; // هامش الربح المقطوع الاختياري بالسنتيم (35 مليون)
}

// 🏛️ الإعدادات الافتراضية القياسية المطابقة للقوانين الجزائرية والسوقية (Default Baseline)
export const DEFAULT_CUSTOMS_CONFIG: CustomsConfig = {
  usdToDzdRate: 200,
  fretShippingCostCentimes: 40,
  baseDutyPercent: 30,
  dutyDiscountPercentUnder1800: 50,
  dutyDiscountPercentElectric: 80,
  tcsPercent: 2,
  tvaPercent: 19,
  portAndTransitCentimes: 13.5,
  licenseMarketCostCentimes: 65,
  targetProfitMarginPercent: 10,
  fixedProfitMarginCentimes: 35,
};

export interface CalculatorInput {
  fobPriceCentimes: number; // السعر الصافي واصل للميناء (سعر الشراء + الشحن البحري والتأمين)
  engineType: 'essence' | 'hybrid' | 'electric';
  displacementCc: number; // سعة المحرك (مثلاً 1498 سم3)
  regime: 'individual_under_3_years' | 'moudjahidine_own_license' | 'moudjahidine_market_license';
  config?: Partial<CustomsConfig>;
}

export interface CalculatorResult {
  fobPriceCentimes: number;
  customsTaxesCentimes: number;
  customsDiscountPercent: number; // 50% or 80% or 20% or 100%
  portAndTransitCentimes: number; // مصاريف الميناء والوكيل الجمركي
  licenseCostCentimes: number; // تكلفة شراء رخصة المجاهدين من السوق
  totalEstimatedCentimes: number;
  totalEstimatedDinar: number;
  breakdown: {
    label: string;
    amountCentimes: number;
  }[];
}

export function calculateAlgerianCustoms(input: CalculatorInput): CalculatorResult {
  const { fobPriceCentimes, engineType, displacementCc, regime, config: customConfig } = input;
  const cfg = { ...DEFAULT_CUSTOMS_CONFIG, ...customConfig };

  const fixedPortAndTransit = cfg.portAndTransitCentimes;

  let customsTaxes = 0;
  let discountPercent = 0;
  let licenseCost = 0;

  if (regime === 'moudjahidine_own_license') {
    discountPercent = 100;
    customsTaxes = 2; // Formalités administratives / Quittance D10
    licenseCost = 0;
  } else if (regime === 'moudjahidine_market_license') {
    discountPercent = 100;
    customsTaxes = 2;
    licenseCost = cfg.licenseMarketCostCentimes;
  } else {
    // Equation: DD + TCS + TVA
    // Base DD = 30%, TCS = 2%, TVA = 19% on (CIF + DD + TCS)
    // Net effective without discount: ~57.08%
    let effectiveDD = cfg.baseDutyPercent;
    if (engineType === 'electric') {
      discountPercent = cfg.dutyDiscountPercentElectric;
      effectiveDD = cfg.baseDutyPercent * (1 - cfg.dutyDiscountPercentElectric / 100);
    } else if (displacementCc <= 1800) {
      discountPercent = cfg.dutyDiscountPercentUnder1800;
      effectiveDD = cfg.baseDutyPercent * (1 - cfg.dutyDiscountPercentUnder1800 / 100);
    } else {
      discountPercent = 20;
      effectiveDD = cfg.baseDutyPercent * 0.8;
    }

    const ddAmount = (fobPriceCentimes * effectiveDD) / 100;
    const tcsAmount = (fobPriceCentimes * cfg.tcsPercent) / 100;
    const tvaBase = fobPriceCentimes + ddAmount + tcsAmount;
    const tvaAmount = (tvaBase * cfg.tvaPercent) / 100;

    customsTaxes = ddAmount + tcsAmount + tvaAmount;
  }

  const roundedTaxes = Math.round(customsTaxes);
  const totalCentimes = Math.round(fobPriceCentimes + roundedTaxes + fixedPortAndTransit + licenseCost);

  return {
    fobPriceCentimes,
    customsTaxesCentimes: roundedTaxes,
    customsDiscountPercent: discountPercent,
    portAndTransitCentimes: fixedPortAndTransit,
    licenseCostCentimes: licenseCost,
    totalEstimatedCentimes: totalCentimes,
    totalEstimatedDinar: totalCentimes * 10000,
    breakdown: [
      { label: 'سعر السيارة واصل للميناء (FOB + Fret)', amountCentimes: fobPriceCentimes },
      { label: `الرسوم الجمركية الصافية (تخفيض ${discountPercent}%)`, amountCentimes: roundedTaxes },
      { label: 'مصاريف إنزال الحاوية بالميناء والوكيل الجمركي', amountCentimes: fixedPortAndTransit },
      ...(licenseCost > 0 ? [{ label: 'تكلفة رخصة المجاهدين التوثيقية', amountCentimes: licenseCost }] : []),
    ],
  };
}

// 🏢 حاسبة التسعير واقتراح الأسعار الخاصة بإدارة المعرض (Admin Pricing Simulator)
export interface AdminPricingInput {
  factoryPriceUsd: number; // سعر السيارة في المصنع بالصين بالدولار
  engineType: 'essence' | 'hybrid' | 'electric';
  displacementCc: number;
  usePercentageMargin: boolean; // استخدام نسبة مئوية أم مبلغ مقطوع
  customMarginPercent?: number;
  customMarginCentimes?: number;
  config?: Partial<CustomsConfig>;
}

export interface AdminPricingOutput {
  fobPriceCentimes: number; // سعر الميناء (FOB + Fret)
  costTurnkeyCentimes: number; // سعر التكلفة الإجمالية للجمركة العادية
  costMoudjahidineOwnCentimes: number; // سعر التكلفة برخصة الزبون
  costMoudjahidineMarketCentimes: number; // سعر التكلفة مع شراء الرخصة
  marginCentimes: number; // هامش الربح المحسوب
  suggestedTurnkeyPriceCentimes: number; // السعر المقترح للبيع Clé en main
  suggestedMoudjahidinePriceCentimes: number; // السعر المقترح للبيع برخصة
  suggestedFobPriceCentimes: number; // السعر المقترح للبيع واصل للميناء
}

export function calculateAdminPricing(input: AdminPricingInput): AdminPricingOutput {
  const cfg = { ...DEFAULT_CUSTOMS_CONFIG, ...input.config };

  // 1. Convert factory USD to Centimes: USD * ExchangeRate / 10,000
  const factoryPriceCentimes = (input.factoryPriceUsd * cfg.usdToDzdRate) / 10000;
  const fobPriceCentimes = Math.round(factoryPriceCentimes + cfg.fretShippingCostCentimes);

  // 2. Compute Costs for regimes
  const calcTurnkey = calculateAlgerianCustoms({
    fobPriceCentimes,
    engineType: input.engineType,
    displacementCc: input.displacementCc,
    regime: 'individual_under_3_years',
    config: cfg,
  });

  const calcMoudjahidineOwn = calculateAlgerianCustoms({
    fobPriceCentimes,
    engineType: input.engineType,
    displacementCc: input.displacementCc,
    regime: 'moudjahidine_own_license',
    config: cfg,
  });

  const calcMoudjahidineMarket = calculateAlgerianCustoms({
    fobPriceCentimes,
    engineType: input.engineType,
    displacementCc: input.displacementCc,
    regime: 'moudjahidine_market_license',
    config: cfg,
  });

  // 3. Profit Margin Calculation
  let marginCentimes = 0;
  if (input.usePercentageMargin) {
    const marginPct = input.customMarginPercent ?? cfg.targetProfitMarginPercent;
    marginCentimes = Math.round((calcTurnkey.totalEstimatedCentimes * marginPct) / 100);
  } else {
    marginCentimes = input.customMarginCentimes ?? cfg.fixedProfitMarginCentimes;
  }

  // 4. Suggested retail prices (Rounded to clean dealership numbers)
  const suggestedTurnkey = calcTurnkey.totalEstimatedCentimes + marginCentimes;
  const suggestedMoudjahidine = calcMoudjahidineMarket.totalEstimatedCentimes + marginCentimes;
  const suggestedFob = fobPriceCentimes + Math.round(marginCentimes * 0.6); // Lower margin for FOB only

  return {
    fobPriceCentimes,
    costTurnkeyCentimes: calcTurnkey.totalEstimatedCentimes,
    costMoudjahidineOwnCentimes: calcMoudjahidineOwn.totalEstimatedCentimes,
    costMoudjahidineMarketCentimes: calcMoudjahidineMarket.totalEstimatedCentimes,
    marginCentimes,
    suggestedTurnkeyPriceCentimes: suggestedTurnkey,
    suggestedMoudjahidinePriceCentimes: suggestedMoudjahidine,
    suggestedFobPriceCentimes: suggestedFob,
  };
}
