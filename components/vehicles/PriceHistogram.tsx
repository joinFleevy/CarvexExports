'use client';

import React from 'react';

interface PriceHistogramProps {
  minPrice: number;
  maxPrice: number;
  currentRange: [number, number];
  onChange: (range: [number, number]) => void;
  currencySymbol?: string;
}

// 28 distribution bars matching the visual density in the screenshot
const HISTOGRAM_DATA = [
  8, 12, 16, 22, 28, 35, 42, 55, 68, 76, 85, 92, 88, 80, 72, 60, 50, 42, 38, 32, 25, 20, 26, 38, 48, 62, 70, 78
];

export default function PriceHistogram({
  minPrice,
  maxPrice,
  currentRange,
  onChange,
  currencySymbol = '$',
}: PriceHistogramProps) {
  const [from, to] = currentRange;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    const val = parseFloat(e.target.value);
    if (isMin) {
      const newMin = Math.min(val, to - 2);
      onChange([newMin, to]);
    } else {
      const newMax = Math.max(val, from + 2);
      onChange([from, newMax]);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Bars Chart */}
      <div className="h-14 flex items-end justify-between gap-[2px] pt-2 px-1">
        {HISTOGRAM_DATA.map((heightPercent, idx) => {
          // Calculate the price point of this bar
          const barPrice = minPrice + (idx / (HISTOGRAM_DATA.length - 1)) * (maxPrice - minPrice);
          const isInRange = barPrice >= from && barPrice <= to;

          return (
            <div
              key={idx}
              style={{ height: `${heightPercent}%` }}
              className={`flex-1 rounded-t-[1px] transition-all duration-150 cursor-pointer hover:opacity-80 ${
                isInRange ? 'bg-neutral-900' : 'bg-neutral-200'
              }`}
              onClick={() => {
                // If user clicks a bar, adjust nearest bound
                if (Math.abs(barPrice - from) < Math.abs(barPrice - to)) {
                  onChange([Math.round(barPrice), to]);
                } else {
                  onChange([from, Math.round(barPrice)]);
                }
              }}
              title={`${currencySymbol}${barPrice.toFixed(1)}`}
            />
          );
        })}
      </div>

      {/* Dual Slider Overlay */}
      <div className="relative h-2 flex items-center">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={0.5}
          value={from}
          onChange={(e) => handleSliderChange(e, true)}
          className="absolute w-full h-1 bg-transparent appearance-none pointer-events-auto accent-neutral-900 cursor-pointer z-10"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={0.5}
          value={to}
          onChange={(e) => handleSliderChange(e, false)}
          className="absolute w-full h-1 bg-transparent appearance-none pointer-events-auto accent-neutral-900 cursor-pointer z-10"
        />
      </div>

      {/* Inputs / Value displays exactly matching the screenshot */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 flex items-center justify-between">
          <span className="text-xs uppercase font-semibold tracking-[0.05em] text-neutral-500">FROM</span>
          <span className="text-xs font-bold text-neutral-900 tabular-nums">
            {currencySymbol}{from.toFixed(2)}
          </span>
        </div>
        <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 flex items-center justify-between">
          <span className="text-xs uppercase font-semibold tracking-[0.05em] text-neutral-500">TO</span>
          <span className="text-xs font-bold text-neutral-900 tabular-nums">
            {currencySymbol}{to.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
