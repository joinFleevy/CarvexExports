// Algerian Customs & Import Cost Calculator Engine
// Based on Decree 23-74 & Finance Law Article 110

export interface CalculatorInput {
  fobPriceCentimes: number; // السعر الصافي واصل للميناء (سعر الشراء + الشحن البحري والتأمين)
  engineType: 'essence' | 'hybrid' | 'electric';
  displacementCc: number; // سعة المحرك (مثلاً 1498 سم3)
  regime: 'individual_under_3_years' | 'moudjahidine_own_license' | 'moudjahidine_market_license';
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
  const { fobPriceCentimes, engineType, displacementCc, regime } = input;

  // Fixed port handling (Djen Djen / Algiers) + Transitaire + Mines inspection: ~13 Million centimes
  const fixedPortAndTransit = 13;

  let customsTaxes = 0;
  let discountPercent = 0;
  let licenseCost = 0;

  if (regime === 'moudjahidine_own_license') {
    // 100% Exemption from Droits de Douane and TVA
    discountPercent = 100;
    customsTaxes = 2; // Formalités administratives / Quittance D10
    licenseCost = 0;
  } else if (regime === 'moudjahidine_market_license') {
    // 100% Exemption from DD & TVA + License market cost
    discountPercent = 100;
    customsTaxes = 2;
    licenseCost = 65; // Average market cost for 1.5L license
  } else {
    // Standard individual import under 3 years:
    // Base taxes without discount = ~57.08% of CIF
    const baseTaxes = fobPriceCentimes * 0.5708;

    if (engineType === 'electric') {
      discountPercent = 80;
      customsTaxes = baseTaxes * 0.20; // 80% reduction
    } else if (displacementCc <= 1800) {
      discountPercent = 50;
      customsTaxes = baseTaxes * 0.50; // 50% reduction (e.g. Geely Coolray 1.5T)
    } else {
      discountPercent = 20;
      customsTaxes = baseTaxes * 0.80; // 20% reduction (Large engines)
    }
  }

  const roundedTaxes = Math.round(customsTaxes);
  const totalCentimes = fobPriceCentimes + roundedTaxes + fixedPortAndTransit + licenseCost;

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
