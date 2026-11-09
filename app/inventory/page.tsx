'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, Car, CheckCircle2 } from 'lucide-react';
import { pb, Vehicle } from '@/lib/pocketbase';
import CarCard from '@/components/CarCard';

const FALLBACK_CARS: Vehicle[] = [
  {
    id: 'coolray-battle',
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
        name_fr: 'Alger',
        phone_commercial_1: '0779055489',
        phone_commercial_2: '0557053814',
        phone_whatsapp: '213779055489',
        address_text: 'المحمدية / الصنوبر البحري',
        is_active: true,
      },
    },
  },
  {
    id: 'coolray-full',
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
        name_fr: 'Jijel',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'بوالرمل قرب ميناء جن جن',
        is_active: true,
      },
    },
  },
  {
    id: 'coolray-manuelle',
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
    color: 'رمادي معدني',
    images: ['carvexexport_DfXhJrrAXBX.jpg'],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'jijel',
        code: 'jijel',
        name_ar: 'جيجل (بوالرمل)',
        name_fr: 'Jijel',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'بوالرمل قرب ميناء جن جن',
        is_active: true,
      },
    },
  },
  {
    id: 'mg5-global',
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
        name_fr: 'Ouargla',
        phone_commercial_1: '0660414034',
        phone_commercial_2: '0661466727',
        phone_whatsapp: '213660414034',
        address_text: 'حي النصر / وسط المدينة',
        is_active: true,
      },
    },
  },
  {
    id: 'jetour-dashing',
    title: 'Jetour Dashing Luxury 2026',
    brand: 'Jetour',
    model: 'Dashing',
    year: 2026,
    mileage_status: 'zero_km',
    origin_country: 'China',
    status: 'on_order',
    price_total_dzd_centimes: 415,
    price_fob_dzd_centimes: 295,
    engine_type: 'essence',
    engine_displacement_cc: 1498,
    transmission: 'automatique',
    color: 'أسود ملكي',
    images: [],
    is_featured: true,
    created: '',
    updated: '',
    expand: {
      branch: {
        id: 'alger',
        code: 'alger',
        name_ar: 'الجزائر العاصمة (المحمدية)',
        name_fr: 'Alger',
        phone_commercial_1: '0779055489',
        phone_commercial_2: '0557053814',
        phone_whatsapp: '213779055489',
        address_text: 'المحمدية / الصنوبر البحري',
        is_active: true,
      },
    },
  },
];

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(FALLBACK_CARS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  useEffect(() => {
    async function loadCars() {
      try {
        const res = await pb.collection('vehicles').getFullList<Vehicle>({
          filter: 'is_deleted != true',
          expand: 'branch',
          sort: '-year',
        });
        if (res && res.length > 0) {
          setVehicles(res);
        }
      } catch (err) {
        console.error('Failed to fetch from PocketBase, using initial list:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  // Filtering Logic
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand === 'ALL' || v.brand.toUpperCase() === selectedBrand;
    const matchesStatus = selectedStatus === 'ALL' || v.status === selectedStatus;
    const matchesBranch =
      selectedBranch === 'ALL' || (v.expand?.branch && v.expand.branch.code === selectedBranch);

    return matchesSearch && matchesBrand && matchesStatus && matchesBranch;
  });

  const brands = ['ALL', 'GEELY', 'MG', 'JETOUR', 'CHERY'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right space-y-8">
      
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          كتالوج السيارات المعروضة للاستيراد والبيع المباشر
        </h1>
        <p className="text-sm text-carvex-muted">
          استعرض السيارات المتوفرة في صالاتنا بالجزائر العاصمة، جيجل، وورقلة، أو احجز شحنتك القادمة من الصين.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-6 rounded-2xl bg-carvex-surface border border-carvex-border space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث بالاسم، الموديل أو الماركة (مثلاً: Geely Coolray, MG5...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3 rounded-xl bg-carvex-card border border-carvex-border focus:border-carvex-cyan text-white text-sm outline-none transition-colors"
          />
          <Search className="w-5 h-5 text-carvex-muted absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Brand Filter */}
          <div>
            <label className="text-xs font-bold text-carvex-muted block mb-1.5">الماركة:</label>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    selectedBrand === b
                      ? 'bg-carvex-cyan text-black border-carvex-cyan'
                      : 'bg-carvex-card text-carvex-muted border-carvex-border hover:text-white'
                  }`}
                >
                  {b === 'ALL' ? 'الكل' : b}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-xs font-bold text-carvex-muted block mb-1.5">حالة التوفر:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-carvex-card border border-carvex-border text-white text-xs outline-none focus:border-carvex-cyan"
            >
              <option value="ALL">جميع الحالات</option>
              <option value="in_stock">حاضرة بالمعرض للتسليم الفوري 🟢</option>
              <option value="in_transit">في الباخرة / قادمة بالحاوية 🚢</option>
              <option value="on_order">استيراد بالطلب من المصنع 🇨🇳</option>
            </select>
          </div>

          {/* Showroom / Branch Filter */}
          <div>
            <label className="text-xs font-bold text-carvex-muted block mb-1.5">صالة العرض:</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-carvex-card border border-carvex-border text-white text-xs outline-none focus:border-carvex-cyan"
            >
              <option value="ALL">جميع الصالات</option>
              <option value="alger">الجزائر العاصمة (المحمدية)</option>
              <option value="jijel">جيجل (بوالرمل قرب ميناء جن جن)</option>
              <option value="ouergla">ورقلة (وسط المدينة)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between text-xs text-carvex-muted">
        <div>
          تم العثور على{' '}
          <strong className="text-carvex-cyan font-mono text-sm">{filteredVehicles.length}</strong> سيارة معروضة
        </div>
        {(searchTerm || selectedBrand !== 'ALL' || selectedStatus !== 'ALL' || selectedBranch !== 'ALL') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedBrand('ALL');
              setSelectedStatus('ALL');
              setSelectedBranch('ALL');
            }}
            className="text-carvex-cyan hover:underline flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>

      {/* Grid of Cars */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((v) => (
            <CarCard key={v.id} vehicle={v} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-carvex-surface border border-carvex-border rounded-2xl space-y-3">
          <Car className="w-12 h-12 text-carvex-muted mx-auto" />
          <h3 className="text-lg font-bold text-white">لا توجد سيارات مطابقة لخيارات البحث</h3>
          <p className="text-xs text-carvex-muted max-w-sm mx-auto">
            يمكنك إعادة تعيين الفلاتر أو التواصل مع الإدارة لطلب سيارتك المفضلة بالطلب الخاص.
          </p>
        </div>
      )}

    </div>
  );
}
