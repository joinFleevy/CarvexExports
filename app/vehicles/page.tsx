'use client';

import React, { useState, useMemo } from 'react';
import VehiclesHeader from '@/components/vehicles/VehiclesHeader';
import VehiclesNavRail from '@/components/vehicles/VehiclesNavRail';
import VehiclesFilterSidebar, { FilterState } from '@/components/vehicles/VehiclesFilterSidebar';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleDetailModal from '@/components/vehicles/VehicleDetailModal';
import VehiclesMapModal from '@/components/vehicles/VehiclesMapModal';
import { VEHICLES_DATA, VehicleItem } from '@/lib/vehiclesData';
import { ChevronDown, Map } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  rentalType: 'hour', // Matches "Per hour" in the screenshot
  availableNowOnly: false,
  priceRange: [19.0, 98.5], // Matches "FROM $19.00 TO $98.50" in screenshot
  brands: [],
  bodyTypes: ['Sedan', 'Coupe', 'Hatchback', 'Crossover', 'Van'], // Matches checked items in screenshot
  transmission: 'any',
  fuelTypes: ['Gasoline', 'Flex Fuel (E85)', 'Electric'], // Matches checked items in screenshot
};

export default function VehiclesPage() {
  const [activeNavTab, setActiveNavTab] = useState('vehicles');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(['mazda-6', 'mazda-3-hatchback']) // Matches red hearts in screenshot
  );
  const [sortBy, setSortBy] = useState<'featured' | 'closest' | 'price_asc' | 'price_desc' | 'rating' | 'popular'>('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'DZD'>('USD');
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [location, setLocation] = useState('San Francisco, US');

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Reset filters
  const handleResetAll = () => {
    setFilters({
      rentalType: 'any',
      availableNowOnly: false,
      priceRange: [10, 100],
      brands: [],
      bodyTypes: [],
      transmission: 'any',
      fuelTypes: [],
    });
  };

  // Unique brands
  const brandsList = useMemo(() => {
    return Array.from(new Set(VEHICLES_DATA.map((v) => v.brand))).sort();
  }, []);

  // Filtered & Sorted Vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter((v) => {
      // Nav tab filtering (if user clicked 'favourites')
      if (activeNavTab === 'favourites' && !favorites.has(v.id)) {
        return false;
      }

      // Rental type
      if (filters.rentalType !== 'any' && !v.rentalType.includes(filters.rentalType)) {
        return false;
      }

      // Available now only
      if (filters.availableNowOnly && !v.availableNow) {
        return false;
      }

      // Price range
      if (v.pricePerHour < filters.priceRange[0] || v.pricePerHour > filters.priceRange[1]) {
        return false;
      }

      // Brand
      if (filters.brands.length > 0 && !filters.brands.includes(v.brand)) {
        return false;
      }

      // Body Type
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(v.bodyType)) {
        return false;
      }

      // Transmission
      if (filters.transmission !== 'any' && v.transmission.toLowerCase() !== filters.transmission) {
        return false;
      }

      // Fuel Type
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(v.fuelType)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return 0; // Preserves the exact sequence from the reference photo
        case 'closest':
          return a.distanceMeters - b.distanceMeters;
        case 'price_asc':
          return a.pricePerHour - b.pricePerHour;
        case 'price_desc':
          return b.pricePerHour - a.pricePerHour;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewsCount - a.reviewsCount;
        default:
          return 0;
      }
    });
  }, [filters, sortBy, activeNavTab, favorites]);

  const sortLabels: Record<string, string> = {
    featured: 'Closest to me',
    closest: 'Distance: Closest',
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
    rating: 'Top Rated',
    popular: 'Most Popular',
  };

  const isInitialFilterState =
    filters.rentalType === 'hour' &&
    filters.availableNowOnly === false &&
    filters.brands.length === 0 &&
    filters.bodyTypes.length === 5 &&
    filters.fuelTypes.length === 3;

  const displayCount = isInitialFilterState ? 48 : filteredVehicles.length;

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-[#F0F2F5] text-left font-sans flex items-center justify-center p-0 md:p-4 lg:p-6"
    >
      {/* Centered App Container matching the pristine UI in screenshot */}
      <div className="w-full max-w-[1400px] h-screen md:h-[94vh] bg-white md:rounded-2xl shadow-xl border border-neutral-200/80 flex flex-col overflow-hidden">
        {/* Top Header */}
        <VehiclesHeader
          currentLocation={location}
          onLocationChange={setLocation}
          currency={currency}
          onCurrencyToggle={() => setCurrency(currency === 'USD' ? 'DZD' : 'USD')}
          language={language}
          onLanguageToggle={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
        />

        {/* Main Body: 3-column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Column 1: Left Navigation Rail */}
          <VehiclesNavRail
            activeTab={activeNavTab}
            onTabChange={setActiveNavTab}
            favoritesCount={favorites.size}
            unreadNotifications={2}
          />

          {/* Column 2: Filter by Sidebar */}
          <VehiclesFilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onResetAll={handleResetAll}
            currencySymbol={currency === 'USD' ? '$' : 'دج '}
            brandsList={brandsList}
          />

          {/* Column 3: Main Showcase Vehicle Grid */}
          <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-6 flex flex-col">
            {/* Header row above cards */}
            <div className="flex items-center justify-between pb-5 select-none">
              <div>
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                  {displayCount} vehicles to rent
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                  >
                    <span>{sortLabels[sortBy]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  {sortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-neutral-100 rounded-xl shadow-lg py-1 z-40">
                      {Object.entries(sortLabels).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSortBy(key as any);
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-neutral-50 flex items-center justify-between ${
                            sortBy === key ? 'text-neutral-900 font-bold bg-neutral-50' : 'text-neutral-600'
                          }`}
                        >
                          <span>{label}</span>
                          {sortBy === key && <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Show Map Toggle */}
                <button
                  type="button"
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                >
                  <span>Show map</span>
                  <Map className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Vehicle Cards Grid (3 Columns) */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVehicles.map((car) => (
                  <VehicleCard
                    key={car.id}
                    vehicle={car}
                    isFavorite={favorites.has(car.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectVehicle={setSelectedVehicle}
                    currency={currency}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                  <Map className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900">No vehicles match your filters</h4>
                <p className="text-xs text-neutral-400 max-w-sm mt-1">
                  Try broadening your price range or clearing body type filters to discover more available cars.
                </p>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        isFavorite={selectedVehicle ? favorites.has(selectedVehicle.id) : false}
        onToggleFavorite={handleToggleFavorite}
        currency={currency}
      />

      {showMapModal && (
        <VehiclesMapModal
          vehicles={filteredVehicles}
          onClose={() => setShowMapModal(false)}
          onSelectVehicle={setSelectedVehicle}
        />
      )}
    </div>
  );
}
