"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  MoreHorizontalIcon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  Delete02Icon,
  Edit02Icon,
  ViewIcon,
  StarIcon,
  ViewOffSlashIcon,
  Car01Icon,
} from "@hugeicons/core-free-icons";
import { Vehicle, pb, getVehicleImageUrl } from "@/lib/pocketbase";
import { formatDinar } from "@/lib/utils";

interface ProductsTableProps {
  vehicles: Vehicle[];
  loading: boolean;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  onStatusChange: (vehicleId: string, status: Vehicle['status']) => void;
  onToggleProperty: (vehicleId: string, prop: 'is_featured' | 'hide_price', val: boolean) => void;
}

const statusConfig: Record<
  Vehicle['status'],
  { label: string; className: string }
> = {
  in_stock: {
    label: "متوفرة بالمعرض",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  },
  in_transit: {
    label: "في الحاوية بالبحر",
    className:
      "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-800",
  },
  on_order: {
    label: "قيد الطلب",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  },
  reserved: {
    label: "محجوزة بعربون",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  },
  sold: {
    label: "تم البيع",
    className:
      "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800",
  },
};

const BRANCHES: Record<string, { label: string; className: string }> = {
  qqxggp603ha2d0j: {
    label: "العاصمة (المحمدية)",
    className: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  v8wpji0y4kcr1lw: {
    label: "جيجل (بوالرمل)",
    className: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  "9itkocw911rrx3t": {
    label: "ورقلة (الوسط)",
    className: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
};

export function ProductsTable({
  vehicles,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
  onToggleProperty,
}: ProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter products
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.title?.toLowerCase().includes(q) ||
        v.brand?.toLowerCase().includes(q) ||
        v.model?.toLowerCase().includes(q) ||
        v.color?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" || v.status === statusFilter;
      const matchesBranch = branchFilter === "all" || v.branch === branchFilter;

      return matchesSearch && matchesStatus && matchesBranch;
    });
  }, [vehicles, searchQuery, statusFilter, branchFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage, itemsPerPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedVehicles.map((v) => v.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Square UI Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <Input
            placeholder="بحث عن سيارة بالاسم، الماركة، أو الموديل..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-9 bg-card border"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val || "all");
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px] h-9 bg-card">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كافة الحالات</SelectItem>
              <SelectItem value="in_stock">متوفرة بالمعرض</SelectItem>
              <SelectItem value="in_transit">في الحاوية بالبحر</SelectItem>
              <SelectItem value="on_order">قيد الطلب</SelectItem>
              <SelectItem value="reserved">محجوزة بعربون</SelectItem>
              <SelectItem value="sold">تم البيع</SelectItem>
            </SelectContent>
          </Select>

          {/* Branch Filter */}
          <Select
            value={branchFilter}
            onValueChange={(val) => {
              setBranchFilter(val || "all");
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[150px] h-9 bg-card">
              <SelectValue placeholder="الفرع والصالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كافة الصالات</SelectItem>
              <SelectItem value="qqxggp603ha2d0j">الجزائر العاصمة</SelectItem>
              <SelectItem value="v8wpji0y4kcr1lw">جيجل (بوالرمل)</SelectItem>
              <SelectItem value="9itkocw911rrx3t">ورقلة (الوسط)</SelectItem>
            </SelectContent>
          </Select>

          {(searchQuery || statusFilter !== "all" || branchFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setBranchFilter("all");
                setCurrentPage(1);
              }}
              className="text-xs h-9"
            >
              إلغاء الفلاتر
            </Button>
          )}
        </div>
      </div>

      {/* Square UI Table Container */}
      <div className="rounded-xl border bg-card text-card-foreground overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/40">
              <TableHead className="w-10">
                <Checkbox
                  checked={
                    paginatedVehicles.length > 0 &&
                    paginatedVehicles.every((v) => selectedIds.includes(v.id))
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-16">الصورة</TableHead>
              <TableHead>السيارة والمواصفات</TableHead>
              <TableHead>الصالة المعينة</TableHead>
              <TableHead>السعر (سنتيم / دج)</TableHead>
              <TableHead>الحالة الميدانية</TableHead>
              <TableHead className="text-center">الرؤية والتمييز</TableHead>
              <TableHead className="w-12 text-left">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">جارٍ تحميل قائمة السيارات من السيرفر...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <HugeiconsIcon icon={Car01Icon} className="size-8 text-muted-foreground/50" />
                    <span className="text-sm">لا توجد سيارات تطابق الفلتر الحالي</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedVehicles.map((vehicle) => {
                const isSelected = selectedIds.includes(vehicle.id);
                const branch = vehicle.branch ? BRANCHES[vehicle.branch] : null;
                const coverImage = vehicle.images?.[0];
                const imageUrl = coverImage
                  ? getVehicleImageUrl(vehicle, coverImage)
                  : "/images/car-placeholder.jpg";

                const status = statusConfig[vehicle.status] || {
                  label: vehicle.status,
                  className: "bg-muted text-muted-foreground",
                };

                return (
                  <TableRow
                    key={vehicle.id}
                    className={`transition-colors ${
                      isSelected ? "bg-muted/50" : "hover:bg-muted/30"
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          handleSelectOne(vehicle.id, !!checked)
                        }
                        aria-label={`Select ${vehicle.title}`}
                      />
                    </TableCell>

                    {/* Thumbnail Photo */}
                    <TableCell>
                      <div className="relative size-12 rounded-lg overflow-hidden border border-border bg-black shrink-0">
                        <Image
                          src={imageUrl}
                          alt={vehicle.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </TableCell>

                    {/* Title & Specs */}
                    <TableCell>
                      <div>
                        <span className="font-semibold text-foreground text-sm block">
                          {vehicle.title}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <span>{vehicle.year}</span>
                          <span>•</span>
                          <span>
                            {vehicle.engine_type} ({vehicle.engine_displacement_cc || 1500} cc)
                          </span>
                          <span>•</span>
                          <span>{vehicle.transmission}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Showroom Branch */}
                    <TableCell>
                      {branch ? (
                        <Badge variant="outline" className={`text-xs ${branch.className}`}>
                          {branch.label}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">غير محدد</span>
                      )}
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      {vehicle.hide_price ? (
                        <div>
                          <span className="text-xs font-semibold text-amber-500 block">
                            السعر عند الطلب
                          </span>
                          <span className="text-[10px] text-muted-foreground line-through">
                            {vehicle.price_total_dzd_centimes} مليون
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-semibold text-sm text-foreground block font-mono">
                            {vehicle.price_total_dzd_centimes} مليون سنتيم
                          </span>
                          <span className="text-[10px] text-muted-foreground block">
                            {formatDinar((vehicle.price_total_dzd_centimes || 0) * 10000)}
                          </span>
                        </div>
                      )}
                    </TableCell>

                    {/* Status Select */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Badge
                              variant="outline"
                              className={`cursor-pointer hover:opacity-80 transition-opacity gap-1 text-xs py-1 px-2.5 ${status.className}`}
                            >
                              <span>{status.label}</span>
                            </Badge>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>تغيير الحالة الميدانية</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {Object.entries(statusConfig).map(([key, cfg]) => (
                            <DropdownMenuItem
                              key={key}
                              onClick={() =>
                                onStatusChange(vehicle.id, key as Vehicle['status'])
                              }
                              className={vehicle.status === key ? "bg-accent font-semibold" : ""}
                            >
                              {cfg.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    {/* Visibility & Featured */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() =>
                            onToggleProperty(
                              vehicle.id,
                              "is_featured",
                              !!vehicle.is_featured
                            )
                          }
                          title={vehicle.is_featured ? "عرض مميز" : "تمييز"}
                          className={
                            vehicle.is_featured
                              ? "text-amber-500 bg-amber-500/10"
                              : "text-muted-foreground"
                          }
                        >
                          <HugeiconsIcon icon={StarIcon} className="size-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() =>
                            onToggleProperty(
                              vehicle.id,
                              "hide_price",
                              !!vehicle.hide_price
                            )
                          }
                          title={vehicle.hide_price ? "السعر مخفي" : "السعر ظاهر"}
                          className={
                            vehicle.hide_price
                              ? "text-rose-500 bg-rose-500/10"
                              : "text-muted-foreground"
                          }
                        >
                          <HugeiconsIcon
                            icon={vehicle.hide_price ? ViewOffSlashIcon : ViewIcon}
                            className="size-3.5"
                          />
                        </Button>
                      </div>
                    </TableCell>

                    {/* Actions Menu */}
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon-sm" className="size-8">
                              <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(vehicle)}>
                            <HugeiconsIcon icon={Edit02Icon} className="size-4 mr-2" />
                            تعديل كامل في الدرج
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            render={
                              <Link
                                href={`/inventory/${vehicle.id}`}
                                target="_blank"
                                className="flex items-center"
                              />
                            }
                          >
                            <HugeiconsIcon icon={ViewIcon} className="size-4 mr-2" />
                            معاينة في الموقع للجمهور
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDelete(vehicle)}
                            className="text-destructive"
                          >
                            <HugeiconsIcon icon={Delete02Icon} className="size-4 mr-2" />
                            حذف / أرشفة السيارة
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Square UI Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              عرض {filteredVehicles.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} إلى{" "}
              {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} من أصل{" "}
              {filteredVehicles.length} سيارة
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">صفوف لكل صفحة:</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(val) => {
                setItemsPerPage(Number(val));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16 h-7 text-xs bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 mr-2">
              <Button
                variant="outline"
                size="icon-xs"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
              </Button>
              <span className="px-2 font-mono">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon-xs"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
