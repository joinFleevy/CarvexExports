import React from 'react';
import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import MainShowcase from '@/components/home/MainShowcase';

const loraEditorial = Lora({
  subsets: ['latin'],
  variable: '--font-heading-serif',
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
    <div className={loraEditorial.variable}>
      <MainShowcase />
    </div>
  );
}
