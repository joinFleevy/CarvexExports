import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceCentimes(centimes: number): string {
  // e.g. 388 -> "388 مليون سنتيم"
  // or formatted as DZD: 388 * 10,000 = 3,880,000 DA
  return `${centimes} مليون سنتيم`;
}

export function formatDinar(centimes: number): string {
  const da = centimes * 10000;
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(da);
}
