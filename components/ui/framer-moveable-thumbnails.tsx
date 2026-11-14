'use client';

import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShieldCheck } from 'lucide-react';

export interface ThumbnailItem {
  id: number | string;
  url: string;
  title: string;
  category?: 'exterior' | 'steering' | 'gearshift' | 'seats' | 'door' | string;
  categoryLabelAr?: string;
  categoryLabelFr?: string;
}

export const DEFAULT_CAR_THUMBNAILS: ThumbnailItem[] = [
  {
    id: 1,
    url: '/images/cars/tesla-model-s-hd.jpg',
    title: 'Tesla Model S — الهيكل الخارجي',
    category: 'exterior',
    categoryLabelAr: 'الهيكل الخارجي',
    categoryLabelFr: 'Vue Extérieure',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
    title: 'المقود واللوحة الرقمية — Steering Wheel',
    category: 'steering',
    categoryLabelAr: 'المقود والكوكبيت',
    categoryLabelFr: 'Volant & Cockpit',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80',
    title: 'مبدل السرعات والكونسول — Gearshift & Console',
    category: 'gearshift',
    categoryLabelAr: 'الكونسول ومبدل السرعات',
    categoryLabelFr: 'Levier & Console',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
    title: 'المقاعد الجلدية الفاخرة — Car Seats',
    category: 'seats',
    categoryLabelAr: 'المقاعد الفاخرة',
    categoryLabelFr: 'Sièges en cuir',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
    title: 'باب السيارة الداخلي — Car Door from Inside',
    category: 'door',
    categoryLabelAr: 'باب السيارة الداخلي',
    categoryLabelFr: 'Portière intérieure',
  },
];

export interface FramerMoveableThumbnailsProps {
  items?: ThumbnailItem[];
  className?: string;
  heightClass?: string;
  showOverlayBadges?: boolean;
  activeBadgeTitle?: string;
  onIndexChange?: (index: number) => void;
}

const FULL_ASPECT_RATIO = 16 / 9;
const COLLAPSED_ASPECT_RATIO = 1 / 3;
const MARGIN = 1.5;
const GAP = 2;

export function FramerMoveableThumbnails({
  items = DEFAULT_CAR_THUMBNAILS,
  className = '',
  heightClass = 'h-[280px] sm:h-[340px] md:h-[390px]',
  showOverlayBadges = true,
  activeBadgeTitle,
  onIndexChange,
}: FramerMoveableThumbnailsProps) {
  const [index, setIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);

  // Sync index clamping if items change
  const currentItems = items.length > 0 ? items : DEFAULT_CAR_THUMBNAILS;
  const safeIndex = Math.min(Math.max(0, index), currentItems.length - 1);
  const activeItem = currentItems[safeIndex];

  const handleSetIndex = (newIdx: number) => {
    const clamped = Math.max(0, Math.min(currentItems.length - 1, newIdx));
    setIndex(clamped);
    if (onIndexChange) {
      onIndexChange(clamped);
    }
  };

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -safeIndex * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 280,
        damping: 28,
      });
    }
  }, [safeIndex, x, isDragging]);

  return (
    <div className={`w-full flex flex-col gap-3 select-none ${className}`}>
      {/* Main Draggable Carousel Stage */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl ${heightClass}`}
        ref={containerRef}
      >
        <motion.div
          className="flex h-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            const containerWidth = containerRef.current?.offsetWidth || 1;
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            let newIdx = safeIndex;

            // Velocity threshold (quick swipe)
            if (Math.abs(velocity) > 400) {
              newIdx = velocity > 0 ? safeIndex - 1 : safeIndex + 1;
            }
            // Offset threshold (dragged more than 25% of container)
            else if (Math.abs(offset) > containerWidth * 0.25) {
              newIdx = offset > 0 ? safeIndex - 1 : safeIndex + 1;
            }

            handleSetIndex(newIdx);
          }}
          style={{ x }}
        >
          {currentItems.map((item, idx) => (
            <div
              key={item.id ?? idx}
              className={`shrink-0 w-full h-full relative flex items-center justify-center overflow-hidden ${
                item.category === 'exterior' ? 'bg-white' : 'bg-neutral-950'
              }`}
            >
              {/* Background Glow / Ambiance */}
              {item.category !== 'exterior' && (
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${item.url})` }}
                />
              )}

              {/* Main Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.title}
                className={`w-full h-full relative z-1 pointer-events-none select-none transition-transform duration-500 ${
                  item.category === 'exterior' ? 'object-contain p-2' : 'object-cover'
                }`}
                draggable={false}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Subtle Bottom Scrim for Title Legibility */}
              <div className={`absolute inset-x-0 bottom-0 h-28 pointer-events-none z-2 ${
                item.category === 'exterior'
                  ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
                  : 'bg-gradient-to-t from-black/85 via-black/40 to-transparent'
              }`} />
            </div>
          ))}
        </motion.div>

        {/* Dynamic Category Tag & Counter */}
        {showOverlayBadges && activeItem && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{activeItem.categoryLabelAr || activeItem.title}</span>
              </span>
              {activeBadgeTitle && (
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/10 text-neutral-300 backdrop-blur-sm border border-white/10">
                  {activeBadgeTitle}
                </span>
              )}
            </div>

            <div className="px-2 py-1 rounded-full text-xs font-semibold tabular-nums text-white/90 bg-black/60 backdrop-blur-md border border-white/10 shadow-md">
              {safeIndex + 1} / {currentItems.length}
            </div>
          </div>
        )}

        {/* Navigation Arrow: Previous */}
        <button
          type="button"
          disabled={safeIndex === 0}
          onClick={(e) => {
            e.stopPropagation();
            handleSetIndex(safeIndex - 1);
          }}
          aria-label="Previous photo"
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all z-10 border ${
            safeIndex === 0
              ? 'opacity-20 cursor-not-allowed border-white/5 bg-black/30 text-white/40'
              : 'opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 bg-black/60 hover:bg-neutral-900 border-white/20 text-white'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Navigation Arrow: Next */}
        <button
          type="button"
          disabled={safeIndex === currentItems.length - 1}
          onClick={(e) => {
            e.stopPropagation();
            handleSetIndex(safeIndex + 1);
          }}
          aria-label="Next photo"
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all z-10 border ${
            safeIndex === currentItems.length - 1
              ? 'opacity-20 cursor-not-allowed border-white/5 bg-black/30 text-white/40'
              : 'opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 bg-black/60 hover:bg-neutral-900 border-white/20 text-white'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Animated Moveable Filmstrip Thumbnails */}
      <ThumbnailsStrip
        items={currentItems}
        index={safeIndex}
        setIndex={handleSetIndex}
      />
    </div>
  );
}

function ThumbnailsStrip({
  items,
  index,
  setIndex,
}: {
  items: ThumbnailItem[];
  index: number;
  setIndex: (i: number) => void;
}) {
  const x = index * 100 * (COLLAPSED_ASPECT_RATIO / FULL_ASPECT_RATIO) + MARGIN + index * GAP;
  const xSpring = useSpring(x, { bounce: 0, stiffness: 320, damping: 32 });
  const xPercentage = useMotionTemplate`-${xSpring}%`;

  useEffect(() => {
    xSpring.set(x);
  }, [x, xSpring]);

  return (
    <div className="flex h-16 sm:h-20 justify-center overflow-hidden py-1 px-1 rounded-xl bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-md shadow-inner">
      <motion.div
        style={{
          aspectRatio: FULL_ASPECT_RATIO,
          gap: `${GAP}%`,
          x: xPercentage,
        }}
        className="flex min-w-0 h-full items-center"
      >
        {items.map((item, i) => {
          const isActive = i === index;
          return (
            <motion.button
              key={item.id ?? i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              initial={false}
              animate={isActive ? 'active' : 'inactive'}
              variants={{
                active: {
                  aspectRatio: FULL_ASPECT_RATIO,
                  marginLeft: `${MARGIN}%`,
                  marginRight: `${MARGIN}%`,
                },
                inactive: {
                  aspectRatio: COLLAPSED_ASPECT_RATIO,
                  marginLeft: 0,
                  marginRight: 0,
                },
              }}
              className={`h-full shrink-0 relative rounded-lg overflow-hidden border-2 transition-all duration-300 group cursor-pointer ${
                isActive
                  ? 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20 z-10'
                  : 'border-neutral-800 hover:border-neutral-600 opacity-60 hover:opacity-90'
              }`}
              title={item.title}
              aria-label={`Select photo ${i + 1}: ${item.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover pointer-events-none select-none"
                draggable={false}
              />

              {/* Active Indicator & Category Pill overlay */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-1">
                  <span className="text-[10px] font-bold text-cyan-300 truncate px-1">
                    {item.categoryLabelAr || item.category || `صورة ${i + 1}`}
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

export function Default() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <FramerMoveableThumbnails />
    </div>
  );
}

export default FramerMoveableThumbnails;
