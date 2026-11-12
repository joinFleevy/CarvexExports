"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
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
import { Checkbox } from "@/components/ui/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Upload01Icon,
  Delete02Icon,
  CheckmarkCircle02Icon,
  StarIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { Vehicle, pb } from "@/lib/pocketbase";

export interface ProductFormData {
  id?: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage_status: 'zero_km' | 'under_3_years';
  origin_country: string;
  status: 'in_stock' | 'in_transit' | 'on_order' | 'reserved' | 'sold';
  branch: string;
  price_total_dzd_centimes: number;
  price_fob_dzd_centimes: number;
  engine_type: 'essence' | 'hybrid' | 'electric';
  engine_displacement_cc: number;
  transmission: 'automatique' | 'manuelle';
  color: string;
  is_featured: boolean;
  hide_price: boolean;
  existingImages: string[];
  newFiles: File[];
  deletedImages: string[];
}

const DEFAULT_FORM: ProductFormData = {
  title: "",
  brand: "Geely",
  model: "",
  year: 2026,
  mileage_status: "zero_km",
  origin_country: "الصين",
  status: "in_stock",
  branch: "qqxggp603ha2d0j", // Alger
  price_total_dzd_centimes: 380,
  price_fob_dzd_centimes: 270,
  engine_type: "essence",
  engine_displacement_cc: 1498,
  transmission: "automatique",
  color: "رمادي فضي",
  is_featured: false,
  hide_price: false,
  existingImages: [],
  newFiles: [],
  deletedImages: [],
};

interface ProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle | null;
  onSaved: () => void;
  onError: (msg: string) => void;
}

export function ProductSheet({
  open,
  onOpenChange,
  vehicle,
  onSaved,
  onError,
}: ProductSheetProps) {
  const isEditing = !!vehicle;
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        id: vehicle.id,
        title: vehicle.title || "",
        brand: vehicle.brand || "Geely",
        model: vehicle.model || "",
        year: vehicle.year || 2026,
        mileage_status: vehicle.mileage_status || "zero_km",
        origin_country: vehicle.origin_country || "الصين",
        status: vehicle.status || "in_stock",
        branch: vehicle.branch || "qqxggp603ha2d0j",
        price_total_dzd_centimes: vehicle.price_total_dzd_centimes || 0,
        price_fob_dzd_centimes: vehicle.price_fob_dzd_centimes || 0,
        engine_type: vehicle.engine_type || "essence",
        engine_displacement_cc: vehicle.engine_displacement_cc || 1498,
        transmission: vehicle.transmission || "automatique",
        color: vehicle.color || "",
        is_featured: !!vehicle.is_featured,
        hide_price: !!vehicle.hide_price,
        existingImages: Array.isArray(vehicle.images) ? vehicle.images : [],
        newFiles: [],
        deletedImages: [],
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [vehicle, open]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const added = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        newFiles: [...prev.newFiles, ...added],
      }));
    }
  };

  const handleRemoveExistingImage = (filename: string) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== filename),
      deletedImages: [...prev.deletedImages, filename],
    }));
  };

  const handleRemoveNewFile = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      newFiles: prev.newFiles.filter((_, i) => i !== idx),
    }));
  };

  const handleSetCoverPhoto = (filename: string) => {
    setFormData((prev) => {
      const rest = prev.existingImages.filter((img) => img !== filename);
      return {
        ...prev,
        existingImages: [filename, ...rest],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const bodyFormData = new FormData();
      bodyFormData.append("title", formData.title.trim());
      bodyFormData.append("brand", formData.brand.trim());
      bodyFormData.append("model", formData.model.trim());
      bodyFormData.append("year", String(formData.year));
      bodyFormData.append("mileage_status", formData.mileage_status);
      bodyFormData.append("origin_country", formData.origin_country.trim());
      bodyFormData.append("status", formData.status);
      bodyFormData.append("branch", formData.branch);
      bodyFormData.append("price_total_dzd_centimes", String(formData.price_total_dzd_centimes));
      bodyFormData.append("price_fob_dzd_centimes", String(formData.price_fob_dzd_centimes));
      bodyFormData.append("engine_type", formData.engine_type);
      bodyFormData.append("engine_displacement_cc", String(formData.engine_displacement_cc));
      bodyFormData.append("transmission", formData.transmission);
      bodyFormData.append("color", formData.color.trim());
      bodyFormData.append("is_featured", String(formData.is_featured));
      bodyFormData.append("hide_price", String(formData.hide_price));

      for (const file of formData.newFiles) {
        bodyFormData.append("images", file);
      }

      for (const delImg of formData.deletedImages) {
        bodyFormData.append("images-", delImg);
      }

      let res;
      if (isEditing && formData.id) {
        res = await fetch(`/api/admin/vehicles?id=${formData.id}`, {
          method: "PUT",
          body: bodyFormData,
        });
      } else {
        res = await fetch("/api/admin/vehicles", {
          method: "POST",
          body: bodyFormData,
        });
      }

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "فشل حفظ بيانات السيارة");
      }

      onSaved();
      onOpenChange(false);
    } catch (err: any) {
      onError(err.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto p-0 flex flex-col"
      >
        <SheetHeader className="p-6 border-b bg-card sticky top-0 z-10">
          <SheetTitle>
            {isEditing ? `تعديل بيانات: ${formData.title}` : "نشر سيارة جديدة في المعرض"}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? "تعديل الصور والمواصفات والأسعار للسيارة الحالية"
              : "أدخل مواصفات وأسعار وصور السيارة لنشرها بالمعرض والموقع"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 text-xs">
          {/* PHOTO UPLOADER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-semibold text-foreground">
                معرض صور السيارة (Photo Gallery)
              </Label>
              <span className="text-[10px] text-muted-foreground">
                الصورة الأولى تظهر كغلاف رئيسي
              </span>
            </div>

            {/* Existing Images */}
            {formData.existingImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {formData.existingImages.map((img, idx) => (
                  <div
                    key={img}
                    className={`relative h-20 rounded-lg overflow-hidden border group bg-black ${
                      idx === 0 ? "border-primary ring-1 ring-primary" : "border-border"
                    }`}
                  >
                    <Image
                      src={
                        formData.id
                          ? `${pb.baseUrl}/api/files/vehicles/${formData.id}/${img}`
                          : `/images/${img}`
                      }
                      alt="Car Photo"
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                    {idx === 0 && (
                      <span className="absolute top-1 right-1 px-1 py-0.5 rounded bg-primary text-primary-foreground font-bold text-[8px]">
                        غلاف
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleSetCoverPhoto(img)}
                          className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-bold cursor-pointer"
                        >
                          غلاف
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(img)}
                        className="p-1 rounded bg-destructive text-white cursor-pointer"
                      >
                        <HugeiconsIcon icon={Delete02Icon} className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Staged New Files */}
            {formData.newFiles.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-500 font-semibold block">
                  صور جديدة جاهزة للرفع:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {formData.newFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative h-16 rounded-lg border border-emerald-500/30 bg-muted/40 p-1.5 text-[10px] flex flex-col justify-between"
                    >
                      <span className="truncate text-foreground">{file.name}</span>
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>{(file.size / 1024).toFixed(0)} KB</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveNewFile(idx)}
                          className="text-destructive hover:underline cursor-pointer"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-16 border-dashed flex flex-col gap-1 items-center justify-center cursor-pointer"
            >
              <HugeiconsIcon icon={Upload01Icon} className="size-4 text-primary" />
              <span className="text-xs font-semibold">انقر لاختيار أو سحب صور جديدة من جهازك</span>
            </Button>
          </div>

          {/* BASIC INFO */}
          <div className="space-y-3 pt-3 border-t">
            <span className="font-semibold text-foreground block">البيانات التعريفية</span>
            <div>
              <Label className="text-xs mb-1 block">عنوان السيارة التجاري</Label>
              <Input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: Geely Coolray Battle 2026"
                className="h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">الماركة (Brand)</Label>
                <Input
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="h-9"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">الموديل (Model)</Label>
                <Input
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">سنة الصنع (Year)</Label>
                <Input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="h-9 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">اللون الخارجي</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="مثال: رمادي بركاني"
                  className="h-9"
                />
              </div>
            </div>
          </div>

          {/* BRANCH & STATUS */}
          <div className="space-y-3 pt-3 border-t">
            <span className="font-semibold text-foreground block">الصالة الميدانية والحالة</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">الصالة المعينة</Label>
                <Select
                  value={formData.branch}
                  onValueChange={(val) => setFormData({ ...formData, branch: val || "" })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qqxggp603ha2d0j">الجزائر العاصمة (المحمدية)</SelectItem>
                    <SelectItem value="v8wpji0y4kcr1lw">جيجل (بوالرمل / الميناء)</SelectItem>
                    <SelectItem value="9itkocw911rrx3t">ورقلة (وسط المدينة)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs mb-1 block">الحالة الميدانية</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => val && setFormData({ ...formData, status: val as any })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">متوفرة بالمعرض</SelectItem>
                    <SelectItem value="in_transit">في الحاوية بالبحر</SelectItem>
                    <SelectItem value="on_order">قيد الطلب</SelectItem>
                    <SelectItem value="reserved">محجوزة بعربون</SelectItem>
                    <SelectItem value="sold">تم البيع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">حالة العداد</Label>
                <Select
                  value={formData.mileage_status}
                  onValueChange={(val) => val && setFormData({ ...formData, mileage_status: val as any })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zero_km">0 كم جديدة تماماً (Neuf)</SelectItem>
                    <SelectItem value="under_3_years">أقل من 3 سنوات (-3 Ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs mb-1 block">بلد المنشأ</Label>
                <Input
                  value={formData.origin_country}
                  onChange={(e) => setFormData({ ...formData, origin_country: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>
          </div>

          {/* ENGINE & TRANSMISSION */}
          <div className="space-y-3 pt-3 border-t">
            <span className="font-semibold text-foreground block">المحرك وناقل الحركة</span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs mb-1 block">نوع الوقود</Label>
                <Select
                  value={formData.engine_type}
                  onValueChange={(val) => val && setFormData({ ...formData, engine_type: val as any })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essence">بنزين</SelectItem>
                    <SelectItem value="hybrid">هجين</SelectItem>
                    <SelectItem value="electric">كهربائي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs mb-1 block">السعة (cc)</Label>
                <Input
                  type="number"
                  value={formData.engine_displacement_cc}
                  onChange={(e) =>
                    setFormData({ ...formData, engine_displacement_cc: Number(e.target.value) })
                  }
                  className="h-9 font-mono"
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block">علبة السرعة</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(val) => val && setFormData({ ...formData, transmission: val as any })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatique">أوتوماتيك</SelectItem>
                    <SelectItem value="manuelle">يدوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* PRICING & VISIBILITY */}
          <div className="space-y-3 pt-3 border-t">
            <span className="font-semibold text-foreground block">الأسعار والرؤية</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">سعر المعرض (مليون سنتيم)</Label>
                <Input
                  type="number"
                  required
                  value={formData.price_total_dzd_centimes}
                  onChange={(e) =>
                    setFormData({ ...formData, price_total_dzd_centimes: Number(e.target.value) })
                  }
                  className="h-9 font-mono font-bold"
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block">سعر الميناء FOB (مليون)</Label>
                <Input
                  type="number"
                  value={formData.price_fob_dzd_centimes}
                  onChange={(e) =>
                    setFormData({ ...formData, price_fob_dzd_centimes: Number(e.target.value) })
                  }
                  className="h-9 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-lg border bg-card">
                <Checkbox
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_featured: !!checked })
                  }
                  id="featured-check"
                />
                <Label htmlFor="featured-check" className="cursor-pointer">
                  <span className="font-semibold text-foreground block">
                    تثبيت كعرض خاص في الرئيسية (Featured)
                  </span>
                </Label>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg border bg-card">
                <Checkbox
                  checked={formData.hide_price}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, hide_price: !!checked })
                  }
                  id="hide-price-check"
                />
                <Label htmlFor="hide-price-check" className="cursor-pointer">
                  <span className="font-semibold text-amber-500 block">
                    إخفاء السعر الرقمي (إظهار "السعر عند الطلب")
                  </span>
                </Label>
              </div>
            </div>
          </div>

          {/* SHEET FOOTER ACTIONS */}
          <SheetFooter className="p-4 border-t sticky bottom-0 bg-background flex flex-row items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-primary text-primary-foreground font-semibold"
            >
              {saving ? (
                <span>جارٍ الحفظ...</span>
              ) : (
                <span>{isEditing ? "حفظ التعديلات" : "نشر السيارة"}</span>
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
