"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  RefreshIcon,
  Car01Icon,
  Coins01Icon,
  Invoice01Icon,
} from "@hugeicons/core-free-icons";
import { AdminTab } from "./sidebar";

interface DashboardHeaderProps {
  activeTab: AdminTab;
  onOpenCreate: () => void;
  onRefresh: () => void;
  loading: boolean;
}

export function DashboardHeader({
  activeTab,
  onOpenCreate,
  onRefresh,
  loading,
}: DashboardHeaderProps) {
  const titles: Record<AdminTab, { title: string; subtitle: string; icon: any }> = {
    products: {
      title: "إدارة أسطول السيارات والمنتجات",
      subtitle: "استعراض، تعديل فوري، ونشر سيارات جديدة في المعرض",
      icon: Car01Icon,
    },
    taxes: {
      title: "حاسبة الضرائب والتخليص الجمركي",
      subtitle: "حساب تكاليف الاستيراد ونسب التخفيض وفق المرسوم 23-74",
      icon: Coins01Icon,
    },
    documents: {
      title: "مولد الوصولات والعقود الرسمية",
      subtitle: "إصدار وصل استلام العربون (Reçu d'Arbon) مع تفقيط المبالغ",
      icon: Invoice01Icon,
    },
  };

  const current = titles[activeTab];

  return (
    <header className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b bg-card sticky top-0 z-10 w-full">
      <SidebarTrigger className="-ml-1 sm:-ml-2" />

      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <HugeiconsIcon
          icon={current.icon}
          className="size-5 sm:size-6 text-muted-foreground hidden sm:block shrink-0"
        />
        <div className="truncate">
          <h1 className="text-sm sm:text-base font-semibold truncate leading-none">
            {current.title}
          </h1>
          <p className="text-[11px] text-muted-foreground hidden md:block mt-1">
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={onRefresh}
          title="تحديث البيانات من السيرفر"
          className="cursor-pointer"
        >
          <HugeiconsIcon
            icon={RefreshIcon}
            className={`size-4 ${loading ? "animate-spin text-primary" : ""}`}
          />
        </Button>

        {activeTab === "products" && (
          <Button
            onClick={onOpenCreate}
            size="sm"
            className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold cursor-pointer shadow-xs"
          >
            <HugeiconsIcon icon={Add01Icon} className="size-4" />
            <span className="hidden sm:inline">نشر سيارة جديدة</span>
            <span className="sm:hidden">إضافة</span>
          </Button>
        )}
      </div>
    </header>
  );
}
