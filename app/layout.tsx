import type { Metadata } from 'next';
import { Readex_Pro, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  variable: '--font-readex',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CARVEX EXPORT | استيراد وبيع سيارات أصلية بجودة عالية في الجزائر',
  description:
    'المؤسسة الرائدة في استيراد وبيع السيارات الجديدة والأقل من 3 سنوات من الصين وأوروبا مباشرة إلى الجزائر. صالات عرض في العاصمة، جيجل، وورقلة. أسعار شفافة وتتبع شحن موثوق.',
  keywords: [
    'Carvex Export',
    'كاركس إكسبورت',
    'استيراد سيارات الجزائر',
    'سيارات أقل من 3 سنوات',
    'رخصة مجاهدين سيارات',
    'Geely Coolray الجزائر',
    'MG5 الجزائر',
    'Jetour Dashing الجزائر',
    'ميناء جن جن جيجل',
    'أسعار السيارات في الجزائر 2026',
  ],
  openGraph: {
    title: 'CARVEX EXPORT | استيراد وبيع سيارات أصلية بجودة عالية',
    description: 'ماركات عالمية مباشرة من المصنع إلى الجزائر. صالاتنا في العاصمة، جيجل، وورقلة.',
    url: 'https://carvexexport.com',
    siteName: 'CARVEX EXPORT',
    locale: 'ar_DZ',
    type: 'website',
    images: [
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 800,
        alt: 'CARVEX EXPORT Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${readex.variable} ${outfit.variable} dark antialiased`}>
      <head>
        <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body className="min-h-screen flex flex-col bg-carvex-dark text-slate-100 selection:bg-carvex-cyan selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
