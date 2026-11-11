'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import PriceHistogram from './PriceHistogram';

export interface FilterState {
  rentalType: 'any' | 'day' | 'hour';
  availableNowOnly: boolean;
  priceRange: [number, number];
  brands: string[];
  bodyTypes: string[];
  transmission: 'any' | 'automatic' | 'manual';
  fuelTypes: string[];
}

interface VehiclesFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetAll: () => void;
  currencySymbol?: string;
  brandsList: string[];
}

export default function VehiclesFilterSidebar({
  filters,
  onFilterChange,
  onResetAll,
  currencySymbol = '$',
  brandsList,
}: VehiclesFilterSidebarProps) {
  // Accordion open/close states
  const [priceOpen, setPriceOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelYearOpen, setModelYearOpen] = useState(false);
  const [bodyTypeOpen, setBodyTypeOpen] = useState(true);
  const [transmissionOpen, setTransmissionOpen] = useState(true);
  const [fuelTypeOpen, setFuelTypeOpen] = useState(true);

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

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-neutral-100 p-5 overflow-y-auto select-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
        <h3 className="text-sm font-bold text-neutral-900 tracking-tight font-sans">
          Filter by
        </h3>
        <button
          type="button"
          onClick={onResetAll}
          className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-medium"
        >
          Reset all ✕
        </button>
      </div>

      {/* RENTAL TYPE */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-sans">
          RENTAL TYPE
        </span>
        <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-neutral-100 rounded-lg">
          {(['any', 'day', 'hour'] as const).map((type) => {
            const labels: Record<string, string> = {
              any: 'Any',
              day: 'Per day',
              hour: 'Per hour',
            };
            const isSelected = filters.rentalType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onFilterChange({ ...filters, rentalType: type })}
                className={`py-1.5 text-xs rounded-md transition-all font-medium ${
                  isSelected
                    ? 'bg-white text-neutral-900 font-bold shadow-sm border border-neutral-200/80'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* AVAILABLE NOW ONLY Switch */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
          AVAILABLE NOW ONLY
        </span>
        <button
          type="button"
          onClick={() =>
            onFilterChange({
              ...filters,
              availableNowOnly: !filters.availableNowOnly,
            })
          }
          className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
            filters.availableNowOnly ? 'bg-neutral-900' : 'bg-neutral-200'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              filters.availableNowOnly ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* PRICE RANGE / HOUR Accordion */}
      <div className="border-t border-neutral-100 pt-4 space-y-3">
        <button
          type="button"
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
            PRICE RANGE / HOUR
          </span>
          {priceOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          )}
        </button>

        {priceOpen && (
          <PriceHistogram
            minPrice={10}
            maxPrice={100}
            currentRange={filters.priceRange}
            onChange={(range) => onFilterChange({ ...filters, priceRange: range })}
            currencySymbol={currencySymbol}
          />
        )}
      </div>

      {/* CAR BRAND Accordion */}
      <div className="border-t border-neutral-100 pt-4 space-y-2">
        <button
          type="button"
          onClick={() => setBrandOpen(!brandOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
            CAR BRAND
          </span>
          {brandOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          )}
        </button>

        {brandOpen && (
          <div className="space-y-1.5 pt-1 max-h-36 overflow-y-auto">
            {brandsList.map((brand) => {
              const isChecked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(brand)}
                    className="w-3.5 h-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer accent-neutral-900"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* CAR MODEL & YEAR Accordion */}
      <div className="border-t border-neutral-100 pt-4 space-y-2">
        <button
          type="button"
          onClick={() => setModelYearOpen(!modelYearOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
            CAR MODEL & YEAR
          </span>
          {modelYearOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          )}
        </button>

        {modelYearOpen && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {['2026', '2025', '2024', '2023'].map((yr) => (
              <span
                key={yr}
                className="text-xs bg-neutral-50 border border-neutral-200 rounded px-2 py-1 text-center font-medium text-neutral-700"
              >
                {yr}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BODY TYPE Checkboxes Accordion */}
      <div className="border-t border-neutral-100 pt-4 space-y-3">
        <button
          type="button"
          onClick={() => setBodyTypeOpen(!bodyTypeOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
            BODY TYPE
          </span>
          {bodyTypeOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          )}
        </button>

        {bodyTypeOpen && (
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs font-medium text-neutral-700 pt-1">
            {/* Column 1 */}
            <div className="space-y-2">
              {[
                { id: 'Sedan', label: 'Sedan' },
                { id: 'Coupe', label: 'Coupe' },
                { id: 'Pickup', label: 'Pickup' },
                { id: 'Crossover', label: 'Crossover' },
              ].map((item) => {
                const isChecked = filters.bodyTypes.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              {[
                { id: 'Wagon', label: 'Wagon' },
                { id: 'Hatchback', label: 'Hatchback' },
                { id: 'Sport coupe', label: 'Sport coupe' },
                { id: 'Van', label: 'Van' },
              ].map((item) => {
                const isChecked = filters.bodyTypes.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* TRANSMISSION Segmented */}
      <div className="border-t border-neutral-100 pt-4 space-y-3">
        <button
          type="button"
          onClick={() => setTransmissionOpen(!transmissionOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
            TRANSMISSION
          </span>
          {transmissionOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          )}
        </button>

        {transmissionOpen && (
          <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-neutral-100 rounded-lg">
            {(['any', 'automatic', 'manual'] as const).map((trans) => {
              const labels: Record<string, string> = {
                any: 'Any',
                automatic: 'Automatic',
                manual: 'Manual',
              };
              const isSelected = filters.transmission === trans;
              return (
                <button
                  key={trans}
                  type="button"
                  onClick={() => onFilterChange({ ...filters, transmission: trans })}
                  className={`py-1.5 text-xs rounded-md transition-all font-medium ${
                    isSelected
                      ? 'bg-white text-neutral-900 font-bold shadow-sm border border-neutral-200/80'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {labels[trans]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* FUEL TYPE Checkboxes */}
      <div className="border-t border-neutral-100 pt-4 space-y-3">
        <button
          type="button"
          onClick={() => setFuelTypeOpen(!fuelTypeOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">
            FUEL TYPE
          </span>
          {fuelTypeOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
          )}
        </button>

        {fuelTypeOpen && (
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs font-medium text-neutral-700 pt-1">
            {/* Column 1 */}
            <div className="space-y-2">
              {[
                { id: 'Gasoline', label: 'Gasoline' },
                { id: 'Diesel', label: 'Diesel' },
                { id: 'Electric', label: 'Electric' },
                { id: 'Other', label: 'Other' },
              ].map((item) => {
                const isChecked = filters.fuelTypes.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              {[
                { id: 'Flex Fuel (E85)', label: 'Flex Fuel (E85)' },
                { id: 'Hybrid', label: 'Hybrid' },
                { id: 'Hydrogen', label: 'Hydrogen' },
              ].map((item) => {
                const isChecked = filters.fuelTypes.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
