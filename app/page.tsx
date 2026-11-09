import React from 'react';
import Link from 'next/link';
import CarCard from '@/components/CarCard';
import { pb, Vehicle } from '@/lib/pocketbase';

export const revalidate = 60;

const FALLBACK_VEHICLES: Vehicle[] = [
  {
    id: 'coolray-battle-2026',
    title: 'Geely Coolray Battle 2026',
    brand: 'Geely',
    model: 'Coolray Battle',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 399,
    price_fob_dzd_centimes: 280,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'أبيض لؤلؤي',
    images: ['carvexexport_DfXYcp-HC7n.jpg'],
    is_featured: true,
    created: '',
  },
  {
    id: 'coolray-full-2026',
    title: 'Geely Coolray Full 2026',
    brand: 'Geely',
    model: 'Coolray Full Option',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 388,
    price_fob_dzd_centimes: 270,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'رمادي تيتانيوم',
    images: ['carvexexport_DfXfUMajy_9.jpg'],
    is_featured: true,
    created: '',
  },
  {
    id: 'coolray-manuelle-2026',
    title: 'Geely Coolray Manuelle 2026',
    brand: 'Geely',
    model: 'Coolray Manuelle',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_transit',
    price_total_dzd_centimes: 307,
    price_fob_dzd_centimes: 215,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'manuelle',
    color: 'رمادي تيتانيوم',
    images: ['carvexexport_DfXfUMajy_9.jpg'],
    is_featured: true,
    created: '',
  },
];

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const records = await pb.collection('vehicles').getFullList<Vehicle>({
      filter: 'is_deleted != true',
      sort: '-created',
    });
    return records.length > 0 ? records : FALLBACK_VEHICLES;
  } catch (error) {
    return FALLBACK_VEHICLES;
  }
}

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen text-right">
      {/* Editorial Minimal Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
            CARVEX EXPORT &bull; الجزائر
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            استيراد مباشر للسيارات الجديدة كلياً
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-8">
            تسليم فوري في صالاتنا في الجزائر العاصمة، جيجل، وورقلة. نوفر أسعاراً شفافة وعقوداً رسمية موثقة لحماية حقوق الزبون في كل خطوة.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-medium">
            <Link
              href="/inventory"
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
            >
              استعراض السيارات المتوفرة &larr;
            </Link>
            <Link
              href="/showrooms"
              className="px-6 py-3 border border-neutral-800 text-neutral-300 rounded-lg hover:border-neutral-600 transition-colors"
            >
              صالات العرض والفروع
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-900">
          <div>
            <h2 className="text-xl font-bold text-white">السيارات المتوفرة في الصالات</h2>
            <p className="text-xs text-neutral-500 mt-1">موديلات 2026 جديدة كلياً (0 كم)</p>
          </div>
          <Link
            href="/inventory"
            className="text-xs text-neutral-400 hover:text-white"
          >
            عرض الكل &larr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((car) => (
            <CarCard key={car.id} vehicle={car} />
          ))}
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">3 صالات عرض رسمية</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              صالات فعلية في الجزائر العاصمة (المحمدية)، جيجل (بوالرمل)، وورقلة (وسط المدينة) مع مستشارين تجاريين مختصين.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">تسعير واضح وعقود رسمية</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              إمكانية الشراء برخصة مجاهد أو تسليم المفتاح (كل الرسوم مدفوعة)، مع وصولات دفع وعقود حجز موثقة.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">شحن وتأمين دولي</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              شحن مباشر من المصانع عبر بواخر متخصصة مع بوليصة شحن بحرية (B/L) وتغطية تأمينية حتى الوصول لميناء جن جن أو العاصمة.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
