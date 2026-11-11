'use client';

import React, { useState, useMemo } from 'react';
import VehiclesHeader from '@/components/vehicles/VehiclesHeader';
import VehiclesNavRail from '@/components/vehicles/VehiclesNavRail';
import VehiclesFilterSidebar, { FilterState } from '@/components/vehicles/VehiclesFilterSidebar';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleDetailModal from '@/components/vehicles/VehicleDetailModal';
import { VEHICLES_DATA, VehicleItem } from '@/lib/vehiclesData';
import { ChevronDown, Sparkles, Heart, Car, SlidersHorizontal, X } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  showroom: 'all',
  availableNowOnly: false,
  priceRange: [200, 900], // in Million Centimes (e.g. 200M to 900M DZD)
  brands: [],
  bodyTypes: ['Sedan', 'Coupe', 'Hatchback', 'Crossover', 'Van'],
  transmission: 'any',
  fuelTypes: [],
  customsRegime: 'all',
};

export default function VehiclesPage() {
  const [activeNavTab, setActiveNavTab] = useState<'vehicles' | 'home' | 'favourites' | 'recents'>('vehicles');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(['mazda-6', 'mazda-3-hatchback'])
  );
  const [recents, setRecents] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'power_desc' | 'year_desc' | 'brand_asc'>('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);

  // Mobile Drawers
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  // Open detail and track in recents
  const handleSelectVehicle = (vehicle: VehicleItem) => {
    setSelectedVehicle(vehicle);
    setRecents((prev) => new Set([vehicle.id, ...Array.from(prev)]));
  };

  // Reset filters
  const handleResetAll = () => {
    setFilters({
      showroom: 'all',
      availableNowOnly: false,
      priceRange: [200, 900],
      brands: [],
      bodyTypes: [],
      transmission: 'any',
      fuelTypes: [],
      customsRegime: 'all',
    });
  };

  // Unique brands
  const brandsList = useMemo(() => {
    return Array.from(new Set(VEHICLES_DATA.map((v) => v.brand))).sort();
  }, []);

  // Filtered & Sorted Vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter((v) => {
      // Nav tab filtering
      if (activeNavTab === 'favourites' && !favorites.has(v.id)) {
        return false;
      }
      if (activeNavTab === 'recents' && !recents.has(v.id)) {
        return false;
      }

      // Showroom
      if (filters.showroom !== 'all' && v.showroom !== filters.showroom) {
        return false;
      }

      // Available now only
      if (filters.availableNowOnly && !v.availableNow) {
        return false;
      }

      // Price range (in Million Centimes)
      if (v.priceDzdCentimes < filters.priceRange[0] || v.priceDzdCentimes > filters.priceRange[1]) {
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

      // Customs Regime
      if (filters.customsRegime !== 'all' && v.customsRegime !== filters.customsRegime) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return 0;
        case 'price_asc':
          return a.priceDzdCentimes - b.priceDzdCentimes;
        case 'price_desc':
          return b.priceDzdCentimes - a.priceDzdCentimes;
        case 'power_desc':
          return b.horsepower - a.horsepower;
        case 'year_desc':
          return b.year - a.year;
        case 'brand_asc':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filters, sortBy, activeNavTab, favorites, recents]);

  const sortLabels: Record<string, string> = {
    featured: 'Recommandé (Featured)',
    price_asc: 'Prix: Croissant',
    price_desc: 'Prix: Décroissant',
    power_desc: 'Puissance (HP)',
    year_desc: 'Année: Plus récente',
    brand_asc: 'Marque & Modèle (A-Z)',
  };

  // Active filters count for mobile badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.showroom !== 'all') count++;
    if (filters.availableNowOnly) count++;
    if (filters.priceRange[0] > 200 || filters.priceRange[1] < 900) count++;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.bodyTypes.length > 0 && filters.bodyTypes.length < 5) count += filters.bodyTypes.length;
    if (filters.transmission !== 'any') count++;
    if (filters.fuelTypes.length > 0) count += filters.fuelTypes.length;
    if (filters.customsRegime !== 'all') count++;
    return count;
  }, [filters]);

  return (
    <div
      dir="ltr"
      className="w-full min-h-screen h-screen bg-white text-left font-sans flex flex-col overflow-hidden p-0 m-0"
    >
      {/* 1. Top Header */}
      <VehiclesHeader
        currentShowroom={filters.showroom}
        onShowroomChange={(sr) => setFilters((prev) => ({ ...prev, showroom: sr }))}
        activeFiltersCount={activeFiltersCount}
        onOpenMobileNav={() => setMobileNavOpen(true)}
        onOpenMobileFilters={() => setMobileFiltersOpen(true)}
      />

      {/* 2. Main Body: 3-column Layout (Full Screen Edge-to-Edge) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Column 1: Left Navigation Rail (Desktop) */}
        <VehiclesNavRail
          activeTab={activeNavTab}
          onTabChange={(t: any) => setActiveNavTab(t)}
          favoritesCount={favorites.size}
        />

        {/* Column 2: Filter by Sidebar (Desktop) */}
        <VehiclesFilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onResetAll={handleResetAll}
          brandsList={brandsList}
          totalResultsCount={filteredVehicles.length}
        />

        {/* Column 3: Main Showcase Vehicle Grid */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/60 p-4 sm:p-6 lg:p-7 flex flex-col">
          {/* Header row above cards */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 select-none border-b border-neutral-200/60 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  {filteredVehicles.length} vehicles available
                </h1>
                {filters.showroom !== 'all' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                    {filters.showroom}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {activeNavTab === 'favourites'
                  ? 'Vos véhicules enregistrés en favoris'
                  : activeNavTab === 'recents'
                  ? 'Vos véhicules récemment consultés'
                  : 'Véhicules neufs et 00 km disponibles en stock et sur commande en Algérie'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 px-3 py-2 rounded-xl shadow-2xs transition-colors"
                >
                  <span className="text-neutral-400 text-[11px]">Trier:</span>
                  <span>{sortLabels[sortBy]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {sortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-neutral-100 rounded-xl shadow-xl py-1 z-40 animate-in fade-in zoom-in-95 duration-100">
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
            </div>
          </div>

          {/* Vehicle Cards Grid (1 col on mobile, 2 cols on tablet, 3 cols on desktop) */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVehicles.map((car) => (
                <VehicleCard
                  key={car.id}
                  vehicle={car}
                  isFavorite={favorites.has(car.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectVehicle={handleSelectVehicle}
                  onSelectShowroomFilter={(sr) => setFilters((prev) => ({ ...prev, showroom: sr }))}
                />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center my-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900">
                {activeNavTab === 'favourites'
                  ? 'Aucun véhicule dans vos favoris'
                  : activeNavTab === 'recents'
                  ? 'Aucun véhicule consulté récemment'
                  : 'Aucun véhicule ne correspond à vos filtres'}
              </h4>
              <p className="text-xs text-neutral-400 max-w-sm mt-1">
                {activeNavTab === 'favourites'
                  ? 'Cliquez sur l\'icône de cœur sur les cartes des voitures pour les retrouver facilement ici.'
                  : 'Essayez d\'élargir votre plage de prix ou de réinitialiser les filtres pour découvrir nos autres modèles.'}
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative z-10 w-72 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <VehiclesNavRail
              activeTab={activeNavTab}
              onTabChange={(t: any) => {
                setActiveNavTab(t);
                setMobileNavOpen(false);
              }}
              favoritesCount={favorites.size}
              isMobileDrawer={true}
              onCloseMobile={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 4. Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <VehiclesFilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onResetAll={handleResetAll}
              brandsList={brandsList}
              isMobileDrawer={true}
              onCloseMobile={() => setMobileFiltersOpen(false)}
              totalResultsCount={filteredVehicles.length}
            />
          </div>
        </div>
      )}

      {/* 5. Rich Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        isFavorite={selectedVehicle ? favorites.has(selectedVehicle.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
