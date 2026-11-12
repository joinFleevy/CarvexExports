import React from 'react';
import type { Metadata } from 'next';
import { Geist, Newsreader } from 'next/font/google';
import MainShowcase from '@/components/home/MainShowcase';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const editorial = Newsreader({
  subsets: ['latin'],
  variable: '--font-editorial',
  weight: ['200', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CARVEX EXPORT | Your Global Auto Partner — Algeria',
  description:
    'Direct maritime importation of zero-kilometre and under-3-year vehicles to Algeria. Official showrooms in Algiers (Mohammadia), Jijel (Boulrimal), and Ouargla.',
};

export default function HomePage() {
  return (
    <div className={`${geistSans.variable} ${editorial.variable}`}>
      <MainShowcase />
    </div>
  );
}
