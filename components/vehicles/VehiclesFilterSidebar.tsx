'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import PriceHistogram from './PriceHistogram';

export interface FilterState {
  showroom: 'all' | 'Alger' | 'Jijel' | 'Ouargla';
  availableNowOnly: boolean;
  priceRange: [number, number]; // in Million Centimes
  brands: string[];
  bodyTypes: string[];
  transmission: 'any' | 'automatic' | 'manual';
  fuelTypes: string[];
  customsRegime: 'all' | 'مجاهدين' | 'ملف عادي -3 سنوات' | 'وكيل معتمد (رسمي)';
}

interface VehiclesFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetAll: () => void;
  brandsList: string[];
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
  totalResultsCount?: number;
}

export default function VehiclesFilterSidebar({
  filters,
  onFilterChange,
  onResetAll,
  brandsList,
  isMobileDrawer = false,
  onCloseMobile,
  totalResultsCount,
}: VehiclesFilterSidebarProps) {
  // Accordion open/close states
  const [showroomOpen, setShowroomOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [bodyTypeOpen, setBodyTypeOpen] = useState(true);
  const [transmissionOpen, setTransmissionOpen] = useState(true);
  const [fuelTypeOpen, setFuelTypeOpen] = useState(false);
  const [customsOpen, setCustomsOpen] = useState(false);

  const toggleBodyType = (type: string) => {
    const updated = filters.bodyTypes.includes(type)
      ? filters.bodyTypes.filter((t) => t !== type)
      : [...filters.bodyTypes, type];
    onFilterChange({ ...filters, bodyTypes: updated });
  };

  const toggleFuelType = (fuel: string) => {
    const updated = filters.fuelTypes.includes(fuel)
      ? filters.fuelTypes.filter((f) => f !== fuel)
      : [...filters.fuelTypes, fuel];
    onFilterChange({ ...filters, fuelTypes: updated });
  };

  const toggleBrand = (brand: string) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: updated });
  };

  const allBodyTypes = [
    { id: 'Sedan', label: 'Sedan' },
    { id: 'Coupe', label: 'Coupe' },
    { id: 'Hatchback', label: 'Hatchback' },
    { id: 'Crossover', label: 'Crossover / SUV' },
    { id: 'Pickup', label: 'Pickup (بيك أب)' },
    { id: 'Wagon', label: 'Wagon' },
    { id: 'Van', label: 'Van' },
  ];

  const allFuelTypes = [
    { id: 'Gasoline', label: 'Essence (Gasoline)' },
    { id: 'Flex Fuel (E85)', label: 'Flex Fuel (E85)' },
    { id: 'Electric', label: 'Électrique (100% EV)' },
    { id: 'Diesel', label: 'Diesel' },
    { id: 'Hybrid', label: 'Hybride' },
  ];

  const showroomOptions: { id: 'all' | 'Alger' | 'Jijel' | 'Ouargla'; label: string }[] = [
    { id: 'all', label: 'Tous les Showrooms' },
    { id: 'Alger', label: 'Alger (المحمدية)' },
    { id: 'Jijel', label: 'Jijel (بوالرمل)' },
    { id: 'Ouargla', label: 'Ouargla (وسط المدينة)' },
  ];

  return (
    <aside
      className={`bg-white flex flex-col justify-between ${
        isMobileDrawer
          ? 'w-full max-w-sm h-full p-5 overflow-y-auto'
          : 'w-64 shrink-0 border-r border-neutral-100 p-5 overflow-y-auto hidden lg:flex'
      }`}
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-800" />
            <h2 className="text-sm font-bold text-neutral-900 tracking-[-0.01em] font-sans">
              Filter by
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetAll}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-medium"
              title="Réinitialiser tous les filtres"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
            {isMobileDrawer && onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* SHOWROOM LOCATION SELECTOR */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowroomOpen(!showroomOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.05em] font-sans group-hover:text-neutral-700">
              SHOWROOM BRANCH
            </span>
            {showroomOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {showroomOpen && (
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {showroomOptions.map((opt) => {
                const isSelected = filters.showroom === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    title={opt.label}
                    onClick={() => onFilterChange({ ...filters, showroom: opt.id })}
                    className={`py-1.5 px-2 text-xs rounded-lg transition-all font-semibold text-center border truncate ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200/80 hover:bg-neutral-100'
                    }`}
                  >
                    <bdi>{opt.label}</bdi>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* AVAILABLE NOW ONLY Switch */}
        <div className="flex items-center justify-between pt-1 pb-1 border-t border-neutral-100">
          <div>
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-[0.05em] block font-sans">
              AVAILABLE NOW ONLY
            </span>
            <span className="text-xs text-neutral-500 block">
              En stock au showroom
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                ...filters,
                availableNowOnly: !filters.availableNowOnly,
              })
            }
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
              filters.availableNowOnly ? 'bg-emerald-600' : 'bg-neutral-200'
            }`}
            aria-label="Toggle Available Now"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                filters.availableNowOnly ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* PRICE RANGE (in Million Centimes DZD) */}
        <div className="border-t border-neutral-100 pt-3 space-y-2">
          <button
            type="button"
            onClick={() => setPriceOpen(!priceOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.05em] font-sans group-hover:text-neutral-700">
              PRICE RANGE (M. CENTIMES)
            </span>
            {priceOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {priceOpen && (
            <div className="pt-1">
              <PriceHistogram
                minPrice={150}
                maxPrice={1100}
                currentRange={filters.priceRange}
                onChange={(range) => onFilterChange({ ...filters, priceRange: range })}
                currencySymbol=""
              />
              <div className="text-xs text-neutral-500 text-center mt-1.5 tabular-nums">
                {filters.priceRange[0]}{"\u00A0"}M à {filters.priceRange[1]}{"\u00A0"}M Centimes
              </div>
            </div>
          )}
        </div>

        {/* CAR BRAND Filter */}
        <div className="border-t border-neutral-100 pt-3 space-y-2">
          <button
            type="button"
            onClick={() => setBrandOpen(!brandOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.05em] font-sans group-hover:text-neutral-700 tabular-nums">
              CAR BRAND {filters.brands.length > 0 && `(${filters.brands.length})`}
            </span>
            {brandOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {brandOpen && (
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {brandsList.map((brand) => {
                const isChecked = filters.brands.includes(brand);
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className="w-full flex items-center justify-between py-1 px-1.5 rounded hover:bg-neutral-50 text-xs text-neutral-700"
                  >
                    <span>{brand}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* BODY TYPE Filter */}
        <div className="border-t border-neutral-100 pt-3 space-y-2">
          <button
            type="button"
            onClick={() => setBodyTypeOpen(!bodyTypeOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.05em] font-sans group-hover:text-neutral-700">
              BODY TYPE
            </span>
            {bodyTypeOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {bodyTypeOpen && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {allBodyTypes.map((type) => {
                const isChecked = filters.bodyTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleBodyType(type.id)}
                    className="flex items-center gap-2 text-left cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white group-hover:border-neutral-400'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      title={type.label}
                      className="text-xs text-neutral-700 group-hover:text-neutral-900 truncate"
                    >
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* TRANSMISSION */}
        <div className="border-t border-neutral-100 pt-3 space-y-2">
          <button
            type="button"
            onClick={() => setTransmissionOpen(!transmissionOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.05em] font-sans group-hover:text-neutral-700">
              TRANSMISSION
            </span>
            {transmissionOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {transmissionOpen && (
            <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-neutral-100 rounded-lg">
              {(['any', 'automatic', 'manual'] as const).map((trans) => {
                const labels: Record<string, string> = {
                  any: 'Any',
                  automatic: 'Automatique',
                  manual: 'Manuelle',
                };
                const isSelected = filters.transmission === trans;
                return (
                  <button
                    key={trans}
                    type="button"
                    onClick={() => onFilterChange({ ...filters, transmission: trans })}
                    className={`py-1.5 text-xs rounded-md transition-all font-semibold truncate px-1 ${
                      isSelected
                        ? 'bg-white text-neutral-900 shadow-2xs border border-neutral-200/80'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                    title={labels[trans]}
                  >
                    {labels[trans]}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* FUEL TYPE */}
        <div className="border-t border-neutral-100 pt-3 space-y-2">
          <button
            type="button"
            onClick={() => setFuelTypeOpen(!fuelTypeOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.05em] font-sans group-hover:text-neutral-700">
              FUEL TYPE
            </span>
            {fuelTypeOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {fuelTypeOpen && (
            <div className="space-y-1.5 pt-1">
              {allFuelTypes.map((fuel) => {
                const isChecked = filters.fuelTypes.includes(fuel.id);
                return (
                  <button
                    key={fuel.id}
                    type="button"
                    onClick={() => toggleFuelType(fuel.id)}
                    className="w-full flex items-center justify-between py-1 px-1.5 rounded hover:bg-neutral-50 text-xs text-neutral-700"
                  >
                    <span>{fuel.label}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* CUSTOMS REGIME (Algerian import specific) */}
        <div className="border-t border-neutral-100 pt-3 space-y-2">
          <button
            type="button"
            onClick={() => setCustomsOpen(!customsOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold text-neutral-500 font-sans group-hover:text-neutral-700">
              <span className="uppercase tracking-[0.05em]">RÉGIME DOUANIER</span>{' '}
              <bdi dir="rtl" lang="ar">(الجمارك)</bdi>
            </span>
            {customsOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {customsOpen && (
            <div className="space-y-1 pt-1">
              {[
                { id: 'all', label: 'Tous les régimes' },
                { id: 'وكيل معتمد (رسمي)', label: 'وكيل معتمد رسمي (0 كم)' },
                { id: 'مجاهدين', label: 'رخصة مجاهدين (Exonération)' },
                { id: 'ملف عادي -3 سنوات', label: 'ملف عادي – 3 سنوات' },
              ].map((reg) => {
                const isSelected = filters.customsRegime === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        customsRegime: reg.id as any,
                      })
                    }
                    className={`w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <bdi>{reg.label}</bdi>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Bottom Apply Button */}
      {isMobileDrawer && onCloseMobile && (
        <div className="pt-6 border-t border-neutral-100 mt-6 sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <span>Afficher les résultats</span>
            {totalResultsCount !== undefined && (
              <span className="px-2 py-0.5 bg-neutral-800 rounded-full text-xs tabular-nums">
                ({totalResultsCount})
              </span>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
