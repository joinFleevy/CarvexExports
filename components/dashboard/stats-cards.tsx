"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Car01Icon,
  Store01Icon,
  Globe02Icon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";

interface StatsCardsProps {
  totalCount: number;
  inStockCount: number;
  inTransitCount: number;
  totalValueCentimes: number;
}

export function StatsCards({
  totalCount,
  inStockCount,
  inTransitCount,
  totalValueCentimes,
}: StatsCardsProps) {
  const stats = [
    {
      title: "إجمالي أسطول السيارات",
      value: totalCount,
      unit: "سيارة مسجلة",
      subtitle: "المسجلة في المنظومة",
      icon: Car01Icon,
      color: "text-blue-500",
    },
    {
      title: "جاهزة في الصالات",
      value: inStockCount,
      unit: "سيارة متوفرة",
      subtitle: "تسليم فوري للزبون",
      icon: Store01Icon,
      color: "text-emerald-500",
    },
    {
      title: "في الحاويات بالبحر",
      value: inTransitCount,
      unit: "سيارة مشحونة",
      subtitle: "في الملاحة البحرية",
      icon: Globe02Icon,
      color: "text-sky-500",
    },
    {
      title: "القيمة التقديرية للأسطول",
      value: totalValueCentimes.toLocaleString(),
      unit: "مليون سنتيم",
      subtitle: "قيمة المخزون الإجمالي",
      icon: Coins01Icon,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="bg-card text-card-foreground rounded-xl border shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 lg:divide-x sm:divide-y-0 divide-border">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <HugeiconsIcon icon={stat.icon} className={`size-4 sm:size-5 ${stat.color}`} />
              <span className="text-xs sm:text-sm font-medium">{stat.title}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-[26px] font-bold tracking-tight font-mono">
                {stat.value}
              </p>
              <span className="text-xs text-muted-foreground">{stat.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
