// Number to Words converter for Algerian Dinar and Centimes in Arabic and French
// Specifically engineered for Algerian automotive contracts, receipts and Arbon documents

const AR_ONES = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
const AR_TEENS = [
  'عشرة',
  'أحد عشر',
  'اثنا عشر',
  'ثلاثة عشر',
  'أربعة عشر',
  'خمسة عشر',
  'ستة عشر',
  'سبعة عشر',
  'ثمانية عشر',
  'تسعة عشر',
];
const AR_TENS = ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
const AR_HUNDREDS = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];

function convertUnderThousandAr(n: number): string {
  if (n === 0) return '';
  const h = Math.floor(n / 100);
  const rem = n % 100;
  const parts: string[] = [];

  if (h > 0) parts.push(AR_HUNDREDS[h]);

  if (rem > 0) {
    if (rem < 10) {
      parts.push(AR_ONES[rem]);
    } else if (rem < 20) {
      parts.push(AR_TEENS[rem - 10]);
    } else {
      const u = rem % 10;
      const t = Math.floor(rem / 10);
      if (u > 0) {
        parts.push(`${AR_ONES[u]} و${AR_TENS[t]}`);
      } else {
        parts.push(AR_TENS[t]);
      }
    }
  }

  return parts.join(' و');
}

export function numberToArabicWordsDinar(amountDzd: number): string {
  if (amountDzd === 0) return 'صفر دينار جزائري';
  const n = Math.floor(Math.abs(amountDzd));

  const billions = Math.floor(n / 1000000000);
  const millions = Math.floor((n % 1000000000) / 1000000);
  const thousands = Math.floor((n % 1000000) / 1000);
  const units = n % 1000;

  const result: string[] = [];

  if (billions > 0) {
    if (billions === 1) result.push('مليار');
    else if (billions === 2) result.push('ملياران');
    else if (billions >= 3 && billions <= 10) result.push(`${convertUnderThousandAr(billions)} ملايير`);
    else result.push(`${convertUnderThousandAr(billions)} مليار`);
  }

  if (millions > 0) {
    if (millions === 1) result.push('مليون');
    else if (millions === 2) result.push('مليونان');
    else if (millions >= 3 && millions <= 10) result.push(`${convertUnderThousandAr(millions)} ملايين`);
    else result.push(`${convertUnderThousandAr(millions)} مليون`);
  }

  if (thousands > 0) {
    if (thousands === 1) result.push('ألف');
    else if (thousands === 2) result.push('ألفان');
    else if (thousands >= 3 && thousands <= 10) result.push(`${convertUnderThousandAr(thousands)} آلاف`);
    else result.push(`${convertUnderThousandAr(thousands)} ألف`);
  }

  if (units > 0) {
    result.push(convertUnderThousandAr(units));
  }

  return `${result.join(' و ')} دينار جزائري لا غير`;
}

export function centimesToArabicWords(centimesMillions: number): string {
  if (centimesMillions === 0) return 'صفر سنتيم';
  const n = Math.floor(centimesMillions);
  const words = convertUnderThousandAr(n);
  return `${words} مليون سنتيم جزائري لا غير`;
}

// French conversion for official SARL Algerian invoices and receipts
const FR_ONES = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
const FR_TEENS = [
  'dix',
  'onze',
  'douze',
  'treize',
  'quatorze',
  'quinze',
  'seize',
  'dix-sept',
  'dix-huit',
  'dix-neuf',
];
const FR_TENS = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];

function convertUnderThousandFr(n: number): string {
  if (n === 0) return '';
  let res = '';
  const h = Math.floor(n / 100);
  const rem = n % 100;

  if (h === 1) res += 'cent ';
  else if (h > 1) res += `${FR_ONES[h]} cent `;

  if (rem > 0) {
    if (rem < 10) res += FR_ONES[rem];
    else if (rem < 20) res += FR_TEENS[rem - 10];
    else if (rem < 70) {
      const u = rem % 10;
      const t = Math.floor(rem / 10);
      if (u === 1 && t !== 8) res += `${FR_TENS[t]} et un`;
      else if (u > 0) res += `${FR_TENS[t]}-${FR_ONES[u]}`;
      else res += FR_TENS[t];
    } else if (rem < 80) {
      const u = rem - 60;
      if (u === 11) res += 'soixante et onze';
      else res += `soixante-${FR_TEENS[u - 10]}`;
    } else if (rem < 90) {
      const u = rem % 10;
      if (u > 0) res += `quatre-vingt-${FR_ONES[u]}`;
      else res += 'quatre-vingts';
    } else {
      const u = rem - 80;
      res += `quatre-vingt-${FR_TEENS[u - 10]}`;
    }
  }

  return res.trim();
}

export function numberToFrenchWordsDinar(amountDzd: number): string {
  if (amountDzd === 0) return 'Zéro dinar algérien';
  const n = Math.floor(Math.abs(amountDzd));

  const millions = Math.floor(n / 1000000);
  const thousands = Math.floor((n % 1000000) / 1000);
  const units = n % 1000;

  const parts: string[] = [];

  if (millions > 0) {
    if (millions === 1) parts.push('un million');
    else parts.push(`${convertUnderThousandFr(millions)} millions`);
  }

  if (thousands > 0) {
    if (thousands === 1) parts.push('mille');
    else parts.push(`${convertUnderThousandFr(thousands)} mille`);
  }

  if (units > 0) {
    parts.push(convertUnderThousandFr(units));
  }

  const result = parts.join(' ');
  return `${result.charAt(0).toUpperCase() + result.slice(1)} dinars algériens`;
}
