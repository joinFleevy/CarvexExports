"use client";

import { useMemo, useState } from "react";
import { StatsCards } from "./stats-cards";
import { ProductsTable } from "./products-table";
import { AdminTab } from "./sidebar";
import { Vehicle } from "@/lib/pocketbase";
import {
  CustomsConfig,
  DEFAULT_CUSTOMS_CONFIG,
  calculateAdminPricing,
} from "@/lib/customs";
import {
  numberToArabicWordsDinar,
  numberToFrenchWordsDinar,
} from "@/lib/numberToWords";
import { formatDinar } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PrinterIcon,
  CheckmarkCircle02Icon,
  Coins01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

interface DashboardContentProps {
  activeTab: AdminTab;
  vehicles: Vehicle[];
  loadingVehicles: boolean;
  onEditVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (vehicle: Vehicle) => void;
  onStatusChange: (vehicleId: string, status: Vehicle["status"]) => void;
  onToggleProperty: (vehicleId: string, prop: "is_featured" | "hide_price", val: boolean) => void;
  onShowToast: (msg: string, type: "success" | "error") => void;
}

export function DashboardContent({
  activeTab,
  vehicles,
  loadingVehicles,
  onEditVehicle,
  onDeleteVehicle,
  onStatusChange,
  onToggleProperty,
  onShowToast,
}: DashboardContentProps) {
  // Fleet Stats Calculation
  const stats = useMemo(() => {
    const totalCount = vehicles.length;
    const inStockCount = vehicles.filter((v) => v.status === "in_stock").length;
    const inTransitCount = vehicles.filter((v) => v.status === "in_transit").length;
    const totalValueCentimes = vehicles.reduce(
      (acc, v) => acc + (v.price_total_dzd_centimes || 0),
      0
    );
    return { totalCount, inStockCount, inTransitCount, totalValueCentimes };
  }, [vehicles]);

  // --- TAXES CALCULATOR STATE ---
  const [calcSelectedId, setCalcSelectedId] = useState<string>("custom");
  const [calcTitle, setCalcTitle] = useState("Geely Coolray 2026");
  const [calcFactoryUsd, setCalcFactoryUsd] = useState<number>(11500);
  const [calcDisplacementCc, setCalcDisplacementCc] = useState<number>(1498);
  const [calcEngineType, setCalcEngineType] = useState<"essence" | "hybrid" | "electric">("essence");
  const [calcUsePercentMargin, setCalcUsePercentMargin] = useState(true);
  const [calcMarginPercent, setCalcMarginPercent] = useState(10);
  const [calcMarginCentimes, setCalcMarginCentimes] = useState(35);
  const [customsConfig, setCustomsConfig] = useState<CustomsConfig>({ ...DEFAULT_CUSTOMS_CONFIG });
  const [savedSettings, setSavedSettings] = useState(false);

  // Pricing calculation
  const pricingOutput = useMemo(() => {
    return calculateAdminPricing({
      factoryPriceUsd: calcFactoryUsd,
      displacementCc: calcDisplacementCc,
      engineType: calcEngineType,
      usePercentageMargin: calcUsePercentMargin,
      customMarginPercent: calcMarginPercent,
      customMarginCentimes: calcMarginCentimes,
      config: customsConfig,
    });
  }, [
    calcFactoryUsd,
    calcDisplacementCc,
    calcEngineType,
    calcUsePercentMargin,
    calcMarginPercent,
    calcMarginCentimes,
    customsConfig,
  ]);

  const handleSelectCarInCalc = (id: string) => {
    setCalcSelectedId(id);
    if (id === "custom") {
      setCalcTitle("سيارة جديدة للاستيراد 2026");
      setCalcFactoryUsd(11500);
      setCalcDisplacementCc(1498);
      setCalcEngineType("essence");
      return;
    }
    const found = vehicles.find((v) => v.id === id);
    if (found) {
      setCalcTitle(found.title);
      setCalcDisplacementCc(found.engine_displacement_cc || 1498);
      setCalcEngineType(found.engine_type || "essence");
      const fob = found.price_fob_dzd_centimes || Math.round(found.price_total_dzd_centimes * 0.7);
      const estUsd = Math.round(
        ((fob - customsConfig.fretShippingCostCentimes) * 10000) / customsConfig.usdToDzdRate
      );
      setCalcFactoryUsd(estUsd > 0 ? estUsd : 11500);
    }
  };

  // --- DOCUMENTS GENERATOR STATE ---
  const [docType, setDocType] = useState<"recu_arbon" | "recu_paiement" | "contrat_vente">("recu_arbon");
  const [docNumber, setDocNumber] = useState(`CRV-${new Date().getFullYear()}-0914`);
  const [docClientName, setDocClientName] = useState("كريم بلقاسم / Belkacem Karim");
  const [docClientPhone, setDocClientPhone] = useState("0661 23 45 67");
  const [docClientCin, setDocClientCin] = useState("110482914839");
  const [docCarTitle, setDocCarTitle] = useState("Geely Coolray Battle 2026");
  const [docVin, setDocVin] = useState("LB37542981X09421");
  const [docDepositCentimes, setDocDepositCentimes] = useState<number>(50);
  const [docBranch, setDocBranch] = useState<"alger" | "jijel" | "ouergla">("alger");

  return (
    <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-background w-full">
      {/* ======================================================== */}
      {/* 1. PRODUCTS MANAGER VIEW                                 */}
      {/* ======================================================== */}
      {activeTab === "products" && (
        <div className="space-y-6 w-full">
          <StatsCards
            totalCount={stats.totalCount}
            inStockCount={stats.inStockCount}
            inTransitCount={stats.inTransitCount}
            totalValueCentimes={stats.totalValueCentimes}
          />
          <ProductsTable
            vehicles={vehicles}
            loading={loadingVehicles}
            onEdit={onEditVehicle}
            onDelete={onDeleteVehicle}
            onStatusChange={onStatusChange}
            onToggleProperty={onToggleProperty}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TAXES & CUSTOMS CALCULATOR VIEW                      */}
      {/* ======================================================== */}
      {activeTab === "taxes" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-xs">
          {/* Simulator Panel (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 sm:p-6 rounded-xl border bg-card text-card-foreground space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <HugeiconsIcon icon={Coins01Icon} className="size-4 text-primary" />
                  <span>محاكي التسعير الفوري للمركبة</span>
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">مرسوم 23-74</span>
              </div>

              <div>
                <Label className="text-xs mb-1 block">
                  اختر سيارة من الأسطول الحالي أو أدخل معطيات جديدة:
                </Label>
                <Select value={calcSelectedId} onValueChange={(val) => handleSelectCarInCalc(val || "custom")}>
                  <SelectTrigger className="w-full h-9 bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">⚡ سيارة جديدة للاستيراد (إدخال يدوي)</SelectItem>
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.title} ({v.year}) — سعر المعرض: {v.price_total_dzd_centimes} مليون
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs mb-1 block">اسم الموديل التجاري</Label>
                  <Input
                    value={calcTitle}
                    onChange={(e) => setCalcTitle(e.target.value)}
                    className="h-9"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-1 block">سعر المصنع بالدولار (FOB USD)</Label>
                  <Input
                    type="number"
                    value={calcFactoryUsd}
                    onChange={(e) => setCalcFactoryUsd(Number(e.target.value))}
                    className="h-9 font-mono"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-1 block">سعة المحرك (cc)</Label>
                  <Input
                    type="number"
                    value={calcDisplacementCc}
                    onChange={(e) => setCalcDisplacementCc(Number(e.target.value))}
                    className="h-9 font-mono"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-1 block">نوع الوقود والمحرك</Label>
                  <Select
                    value={calcEngineType}
                    onValueChange={(val) => setCalcEngineType(val as any)}
                  >
                    <SelectTrigger className="h-9 bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="essence">بنزين (Essence)</SelectItem>
                      <SelectItem value="hybrid">هجين (Hybride)</SelectItem>
                      <SelectItem value="electric">كهربائي بالكامل (100% Electric)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Margin Selector */}
              <div className="pt-3 border-t space-y-2">
                <Label className="text-xs font-semibold block">هامش ربح الوكالة (Carvex Margin)</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mType"
                      checked={calcUsePercentMargin}
                      onChange={() => setCalcUsePercentMargin(true)}
                      className="accent-primary"
                    />
                    <span>نسبة مئوية من التكلفة الصافية (%)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mType"
                      checked={!calcUsePercentMargin}
                      onChange={() => setCalcUsePercentMargin(false)}
                      className="accent-primary"
                    />
                    <span>مبلغ مقطوع بالمليون سنتيم</span>
                  </label>
                </div>

                {calcUsePercentMargin ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={5}
                      max={25}
                      step={1}
                      value={calcMarginPercent}
                      onChange={(e) => setCalcMarginPercent(Number(e.target.value))}
                      className="flex-1 accent-primary"
                    />
                    <span className="font-mono text-sm font-bold text-primary w-12 text-left">
                      {calcMarginPercent}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={calcMarginCentimes}
                      onChange={(e) => setCalcMarginCentimes(Number(e.target.value))}
                      className="w-32 h-8 font-mono"
                    />
                    <span className="text-muted-foreground">مليون سنتيم</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cost Breakdown Card */}
            <div className="p-5 sm:p-6 rounded-xl border bg-card text-card-foreground space-y-3 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                تفاصيل الرسوم الجمركية وتكلفة الوكالة
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">سعر السيارة واصل للميناء (FOB + Fret):</span>
                  <span className="font-mono font-bold">{pricingOutput.fobPriceCentimes} مليون</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">
                    الرسوم والضرائب الجمركية (تخفيض {calcDisplacementCc <= 1800 ? "50%" : "20%"} قانوني):
                  </span>
                  <span className="font-mono text-emerald-500 font-bold">
                    {Math.max(
                      0,
                      pricingOutput.costTurnkeyCentimes -
                        pricingOutput.fobPriceCentimes -
                        customsConfig.portAndTransitCentimes
                    )}{" "}
                    مليون
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">
                    رسوم الميناء والإنزال بميناء جن جن / العاصمة + فحص المناجم:
                  </span>
                  <span className="font-mono font-bold">{customsConfig.portAndTransitCentimes} مليون</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">صافي تكلفة الوكالة (Prix de revient net):</span>
                  <span className="font-mono font-bold">{pricingOutput.costTurnkeyCentimes} مليون</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-primary font-semibold">هامش ربح الوكالة الصافي:</span>
                  <span className="font-mono text-primary font-bold">
                    +{pricingOutput.marginCentimes} مليون
                  </span>
                </div>

                <div className="flex justify-between py-3 pt-4 border-t text-sm">
                  <span className="font-bold text-foreground">السعر المقترح للبيع في الصالة:</span>
                  <div className="text-left font-mono">
                    <span className="font-black text-xl text-primary block">
                      {pricingOutput.suggestedTurnkeyPriceCentimes} مليون سنتيم
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      {formatDinar(pricingOutput.suggestedTurnkeyPriceCentimes * 10000)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rules & Rates Editor (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-6 rounded-xl border bg-card text-card-foreground space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <HugeiconsIcon icon={Settings01Icon} className="size-4 text-emerald-500" />
                  <span>إعدادات الرسوم وأسعار الصرف</span>
                </h3>
                {savedSettings && (
                  <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    تم الحفظ!
                  </span>
                )}
              </div>

              <div className="space-y-3.5">
                <div>
                  <Label className="text-xs mb-1 block">
                    سعر صرف الدولار الجمركي (USD ➔ DZD)
                  </Label>
                  <Input
                    type="number"
                    value={customsConfig.usdToDzdRate}
                    onChange={(e) =>
                      setCustomsConfig({ ...customsConfig, usdToDzdRate: Number(e.target.value) })
                    }
                    className="h-9 font-mono"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-1 block">
                    تكلفة الشحن البحري للحاوية (سنتيم جزائري)
                  </Label>
                  <Input
                    type="number"
                    value={customsConfig.fretShippingCostCentimes}
                    onChange={(e) =>
                      setCustomsConfig({
                        ...customsConfig,
                        fretShippingCostCentimes: Number(e.target.value),
                      })
                    }
                    className="h-9 font-mono"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-1 block">
                    رسوم المناولة والعبور بالميناء + المناجم
                  </Label>
                  <Input
                    type="number"
                    value={customsConfig.portAndTransitCentimes}
                    onChange={(e) =>
                      setCustomsConfig({
                        ...customsConfig,
                        portAndTransitCentimes: Number(e.target.value),
                      })
                    }
                    className="h-9 font-mono"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-1 block">
                    النسبة الجمركية الأساسية قبل التخفيض (القانون)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={customsConfig.baseDutyPercent}
                      onChange={(e) =>
                        setCustomsConfig({
                          ...customsConfig,
                          baseDutyPercent: Number(e.target.value),
                        })
                      }
                      className="h-9 font-mono"
                    />
                    <span className="text-muted-foreground font-mono">30% الأساسية</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSavedSettings(true);
                  setTimeout(() => setSavedSettings(false), 3000);
                  onShowToast("تم حفظ إعدادات الرسوم الجمركية بالنظام بنجاح", "success");
                }}
                className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
              >
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" />
                <span>حفظ وتثبيت الإعدادات</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. DOCUMENTS & RECEIPTS GENERATOR                       */}
      {/* ======================================================== */}
      {activeTab === "documents" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-xs">
          {/* Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 p-5 sm:p-6 rounded-xl border bg-card text-card-foreground shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-sm font-bold">إعدادات الوثيقة الرسمية</h3>
              <Button
                onClick={() => window.print()}
                size="sm"
                className="gap-1.5 cursor-pointer bg-primary text-primary-foreground font-semibold"
              >
                <HugeiconsIcon icon={PrinterIcon} className="size-4" />
                <span>طباعة الوثيقة</span>
              </Button>
            </div>

            <div>
              <Label className="text-xs mb-1 block">نوع الوثيقة</Label>
              <Select value={docType} onValueChange={(val) => val && setDocType(val as any)}>
                <SelectTrigger className="h-9 bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recu_arbon">وصل استلام عربون (Reçu d'Acompte / Arbon)</SelectItem>
                  <SelectItem value="recu_paiement">وصل دفع نهائي (Reçu de Paiement)</SelectItem>
                  <SelectItem value="contrat_vente">عقد حجز وتوكيل استيراد (Bon de Commande)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">رقم الوثيقة</Label>
                <Input
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="h-9 font-mono"
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block">صالة الإصدار</Label>
                <Select value={docBranch} onValueChange={(val) => val && setDocBranch(val as any)}>
                  <SelectTrigger className="h-9 bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alger">الجزائر العاصمة</SelectItem>
                    <SelectItem value="jijel">جيجل (الميناء)</SelectItem>
                    <SelectItem value="ouergla">ورقلة (الوسط)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t">
              <span className="font-semibold block">بيانات المشتري (الزبون)</span>
              <div>
                <Label className="text-xs mb-1 block">الاسم واللقب</Label>
                <Input
                  value={docClientName}
                  onChange={(e) => setDocClientName(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">الهاتف</Label>
                  <Input
                    value={docClientPhone}
                    onChange={(e) => setDocClientPhone(e.target.value)}
                    className="h-9 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">بطاقة التعريف (CIN)</Label>
                  <Input
                    value={docClientCin}
                    onChange={(e) => setDocClientCin(e.target.value)}
                    className="h-9 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t">
              <span className="font-semibold block">بيانات المركبة والمبلغ</span>
              <div>
                <Label className="text-xs mb-1 block">موديل السيارة</Label>
                <Input
                  value={docCarTitle}
                  onChange={(e) => setDocCarTitle(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">رقم الشاسيه (VIN)</Label>
                  <Input
                    value={docVin}
                    onChange={(e) => setDocVin(e.target.value)}
                    className="h-9 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">العربون المستلم (مليون)</Label>
                  <Input
                    type="number"
                    value={docDepositCentimes}
                    onChange={(e) => setDocDepositCentimes(Number(e.target.value))}
                    className="h-9 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Printable A4 Preview (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              id="print-document"
              className="w-full max-w-xl bg-white text-black p-8 rounded-xl shadow-xl space-y-6 text-right border"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-lg overflow-hidden border border-neutral-300">
                    <img src="/images/logo.jpg" alt="CARVEX" className="object-contain p-0.5" />
                  </div>
                  <div>
                    <span className="text-base font-black tracking-wider block">CARVEX EXPORT</span>
                    <span className="text-[10px] text-neutral-600 block">شركة استيراد وتوزيع السيارات</span>
                    <span className="text-[9px] text-neutral-500 block">
                      فرع: {docBranch === "alger" ? "الجزائر العاصمة" : docBranch === "jijel" ? "جيجل" : "ورقلة"}
                    </span>
                  </div>
                </div>
                <div className="text-left font-mono">
                  <span className="text-sm font-bold block">{docNumber}</span>
                  <span className="text-[10px] text-neutral-500 block">
                    {new Date().toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="text-center py-2 bg-neutral-100 rounded-lg">
                <h3 className="text-base font-black text-neutral-900">
                  {docType === "recu_arbon" && "وصل استلام عربون حجز سيارة (Reçu d'Acompte)"}
                  {docType === "recu_paiement" && "وصل دفع نهائي (Reçu de Paiement)"}
                  {docType === "contrat_vente" && "وثيقة حجز وتوكيل استيراد (Bon de Commande)"}
                </h3>
              </div>

              {/* Details */}
              <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
                <p>
                  يشهد وكيل صالة <strong>CARVEX EXPORT</strong> باستلام مبلغ العربون من السيد(ة):
                </p>
                <div className="p-3 bg-neutral-50 rounded-lg border space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">اسم المشتري:</span>
                    <span className="font-bold">{docClientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">الهاتف:</span>
                    <span className="font-mono">{docClientPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">بطاقة التعريف (CIN):</span>
                    <span className="font-mono">{docClientCin}</span>
                  </div>
                </div>

                <p>وذلك قصد حجز واستيراد المركبة ذات المواصفات التالية:</p>
                <div className="p-3 bg-neutral-50 rounded-lg border space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">الموديل والماركة:</span>
                    <span className="font-bold">{docCarTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">رقم الهيكل (VIN):</span>
                    <span className="font-mono">{docVin}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="p-4 bg-neutral-100 rounded-xl border space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold">المبلغ المستلم بالأرقام:</span>
                    <span className="text-base font-black font-mono">
                      {formatDinar(docDepositCentimes * 10000)} ({docDepositCentimes} مليون سنتيم)
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-700">
                    <span className="font-semibold">المبلغ بالأحرف: </span>
                    <span className="font-bold">{numberToArabicWordsDinar(docDepositCentimes * 10000)}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 italic" dir="ltr">
                    En toutes lettres: {numberToFrenchWordsDinar(docDepositCentimes * 10000)}
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t text-xs">
                <div className="text-center">
                  <span className="font-bold block mb-8">توقيع المشتري</span>
                  <span className="text-[10px] text-neutral-400">«قرأت ووافقت»</span>
                </div>
                <div className="text-center">
                  <span className="font-bold block mb-8">ختم وتوقيع إدارة المعرض</span>
                  <div className="size-16 border-2 border-dashed border-neutral-300 rounded-full mx-auto flex items-center justify-center text-[9px] text-neutral-400">
                    ختم CARVEX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
