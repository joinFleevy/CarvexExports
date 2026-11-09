import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  Fuel,
  Gauge,
  Settings,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Calculator,
  ArrowRight,
  Sparkles,
  Award,
  Truck,
  Eye,
  Download,
} from 'lucide-react';
import { pb, Vehicle, getVehicleImageUrl } from '@/lib/pocketbase';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';
import VehicleDetailClient from './VehicleDetailClient';

// Fallback seed vehicles if PocketBase lookup fails
const ALL_SEED_VEHICLES: Vehicle[] = [
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
    color: 'أبيض لؤلؤي / سقف أسود',
    images: ['carvexexport_DfXYcp-HC7n.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'alger',
        code: 'alger',
        name_ar: 'الجزائر العاصمة (المحمدية)',
        name_fr: 'Alger (Pins Maritimes)',
        phone_commercial_1: '0779055489',
        phone_commercial_2: '0557053814',
        phone_whatsapp: '213779055489',
        address_text: 'شارع نصيب عبود، المحمدية (قرب صافكس المعارض)، الجزائر العاصمة',
        google_maps_url: 'https://maps.google.com/?q=Mohammadia+Pins+Maritimes+Algiers',
        is_active: true,
      },
    },
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
    updated: '',
    expand: {
      branch: {
        id: 'jijel',
        code: 'jijel',
        name_ar: 'جيجل (بوالرمل)',
        name_fr: 'Jijel (Boulrimal)',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'المنطقة التجارية بوالرمل، الطاهير (محاذاة ميناء جن جن)، جيجل',
        google_maps_url: 'https://maps.google.com/?q=Taher+Boulrimal+Port+Djen+Djen+Jijel',
        is_active: true,
      },
    },
  },
  {
    id: 'coolray-manuelle-2026',
    title: 'Geely Coolray Manuelle 2026',
    brand: 'Geely',
    model: 'Coolray Comfort BVM',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 307,
    price_fob_dzd_centimes: 215,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'manuelle',
    color: 'أزرق سماوي ميتاليك',
    images: ['carvexexport_DfXfUMajy_9.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'jijel',
        code: 'jijel',
        name_ar: 'جيجل (بوالرمل)',
        name_fr: 'Jijel (Boulrimal)',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'المنطقة التجارية بوالرمل، الطاهير (محاذاة ميناء جن جن)، جيجل',
        google_maps_url: 'https://maps.google.com/?q=Taher+Boulrimal+Port+Djen+Djen+Jijel',
        is_active: true,
      },
    },
  },
  {
    id: 'mg5-global-2026',
    title: 'MG5 Global (MX) 2026',
    brand: 'MG',
    model: 'MG5 Global',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'in_stock',
    price_total_dzd_centimes: 268,
    price_fob_dzd_centimes: 185,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'أبيض ناصع',
    images: ['carvexexport_De94opYjmAi.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'ouergla',
        code: 'ouergla',
        name_ar: 'ورقلة (وسط المدينة)',
        name_fr: 'Ouargla (Centre)',
        phone_commercial_1: '0660414034',
        phone_commercial_2: '0661466727',
        phone_whatsapp: '213660414034',
        address_text: 'حي النصر (وسط المدينة بجانب البنك الوطني)، ورقلة',
        google_maps_url: 'https://maps.google.com/?q=Ouargla+Cite+En-Nasr',
        is_active: true,
      },
    },
  },
  {
    id: 'jetour-dashing-2026',
    title: 'Jetour Dashing Luxury 2026',
    brand: 'Jetour',
    model: 'Dashing Luxury',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'on_order',
    price_total_dzd_centimes: 415,
    price_fob_dzd_centimes: 295,
    engine_type: 'essence',
    engine_displacement_cc: 1598,
    transmission: 'automatique',
    color: 'رمادي غرافيت',
    images: ['carvexexport_De-jW69js35.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'alger',
        code: 'alger',
        name_ar: 'الجزائر العاصمة (المحمدية)',
        name_fr: 'Alger (Pins Maritimes)',
        phone_commercial_1: '0779055489',
        phone_commercial_2: '0557053814',
        phone_whatsapp: '213779055489',
        address_text: 'شارع نصيب عبود، المحمدية (قرب صافكس المعارض)، الجزائر العاصمة',
        google_maps_url: 'https://maps.google.com/?q=Mohammadia+Pins+Maritimes+Algiers',
        is_active: true,
      },
    },
  },
];

async function getVehicleData(id: string): Promise<Vehicle | null> {
  try {
    const record = await pb.collection('vehicles').getOne<Vehicle>(id, {
      expand: 'branch',
    });
    return record;
  } catch {
    const found = ALL_SEED_VEHICLES.find((v) => v.id === id);
    return found || ALL_SEED_VEHICLES[0];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicleData(id);

  if (!vehicle) {
    notFound();
  }

  // Calculate payment tranches
  const totalPrice = vehicle.price_total_dzd_centimes;
  const tranche1 = Math.round(totalPrice * 0.28); // ~28% Acompte
  const tranche2 = Math.round(totalPrice * 0.42); // ~42% au BL
  const tranche3 = totalPrice - tranche1 - tranche2; // ~30% à la livraison

  return (
    <VehicleDetailClient
      vehicle={vehicle}
      tranche1={tranche1}
      tranche2={tranche2}
      tranche3={tranche3}
    />
  );
}
