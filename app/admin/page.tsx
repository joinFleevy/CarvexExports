"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar, AdminTab } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardContent } from "@/components/dashboard/content";
import { ProductSheet } from "@/components/dashboard/product-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  LockIcon,
  Delete02Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { Vehicle } from "@/lib/pocketbase";
import {
  getStoredAdminToken,
  getStoredAdminProfile,
  setStoredAdminSession,
  clearAdminSession,
  AdminProfile,
} from "@/lib/adminAuth";

export default function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("namaagrowthagency@gmail.com");
  const [loginPassword, setLoginPassword] = useState<string>("fDTHzV3HhhiaTFy@");
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Sheet (Create / Edit) state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Delete modal state
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const token = getStoredAdminToken();
    const profile = getStoredAdminProfile();
    if (token) {
      setIsAuthenticated(true);
      setAdminProfile(profile || { email: "namaagrowthagency@gmail.com" });
    }
    setAuthChecked(true);
  }, []);

  // Fetch vehicles from API
  const fetchVehicles = async () => {
    setLoadingVehicles(true);
    try {
      const res = await fetch("/api/admin/vehicles");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setVehicles(data.items);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchVehicles();
    }
  }, [isAuthenticated]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  // Auth login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "بيانات الدخول غير صحيحة");
      }
      setStoredAdminSession(data.token, data.admin);
      setAdminProfile(data.admin);
      setIsAuthenticated(true);
      showToast("مرحباً بك! تم تسجيل الدخول بنجاح", "success");
    } catch (err: any) {
      setAuthError(err.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setAdminProfile(null);
  };

  // Inline Status Change
  const handleInlineStatusChange = async (vehicleId: string, newStatus: Vehicle["status"]) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status: newStatus } : v))
    );

    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);
      showToast("تم تحديث حالة السيارة بنجاح", "success");
    } catch (err: any) {
      fetchVehicles();
      showToast(err.message || "فشل تحديث الحالة", "error");
    }
  };

  // Toggle Property (is_featured / hide_price)
  const handleToggleProperty = async (
    vehicleId: string,
    prop: "is_featured" | "hide_price",
    currentVal: boolean
  ) => {
    const nextVal = !currentVal;
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, [prop]: nextVal } : v))
    );

    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [prop]: nextVal }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);
      showToast(
        prop === "is_featured"
          ? nextVal
            ? "تم تمييز السيارة كعرض خاص"
            : "تم إلغاء تمييز السيارة"
          : nextVal
          ? "تم إخفاء السعر الرقمي (طلب السعر عبر واتساب)"
          : "تم إظهار السعر الرقمي للزبائن",
        "success"
      );
    } catch {
      fetchVehicles();
      showToast("فشل تحديث الخاصية", "error");
    }
  };

  // Delete vehicle
  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleToDelete.id}&permanent=false`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);
      showToast("تم أرشفة ونقل السيارة للمهملات", "success");
      setVehicleToDelete(null);
      fetchVehicles();
    } catch (err: any) {
      showToast(err.message || "فشل الحذف", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-xl space-y-5 text-right">
          <div className="flex flex-col items-center text-center">
            <div className="relative size-12 rounded-xl overflow-hidden border border-border bg-black mb-3">
              <Image src="/images/logo.jpg" alt="CARVEX" fill className="object-contain p-1" priority />
            </div>
            <h1 className="text-lg font-bold text-foreground">CARVEX EXPORT</h1>
            <p className="text-xs text-muted-foreground mt-0.5">لوحة تحكم المشرف المركزي</p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <HugeiconsIcon icon={AlertCircleIcon} className="size-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="text-xs mb-1 block">البريد الإلكتروني</Label>
              <Input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                dir="ltr"
                className="h-9"
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">كلمة المرور</Label>
              <div className="relative">
                <Input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  dir="ltr"
                  className="h-9 pr-8"
                />
                <HugeiconsIcon
                  icon={LockIcon}
                  className="size-4 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={authLoading}
              className="w-full bg-primary text-primary-foreground font-semibold cursor-pointer"
            >
              {authLoading ? "جارٍ التحقق..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="pt-2 text-center border-t">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
              <span>العودة للموقع الرئيسي</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- SQUARE UI MAIN DASHBOARD LAYOUT ---
  return (
    <SidebarProvider className="bg-sidebar">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border shadow-lg text-xs font-medium text-foreground">
          {toast.type === "success" ? (
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-emerald-500" />
          ) : (
            <HugeiconsIcon icon={AlertCircleIcon} className="size-4 text-destructive" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Cloned Square UI Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        productsCount={vehicles.length}
        adminEmail={adminProfile?.email}
        onLogout={handleLogout}
      />

      {/* Cloned Square UI Main Shell */}
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <DashboardHeader
            activeTab={activeTab}
            onOpenCreate={() => {
              setSelectedVehicle(null);
              setSheetOpen(true);
            }}
            onRefresh={fetchVehicles}
            loading={loadingVehicles}
          />
          <DashboardContent
            activeTab={activeTab}
            vehicles={vehicles}
            loadingVehicles={loadingVehicles}
            onEditVehicle={(v) => {
              setSelectedVehicle(v);
              setSheetOpen(true);
            }}
            onDeleteVehicle={(v) => setVehicleToDelete(v)}
            onStatusChange={handleInlineStatusChange}
            onToggleProperty={handleToggleProperty}
            onShowToast={showToast}
          />
        </div>
      </div>

      {/* Product Creator & Editor Sheet */}
      <ProductSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        vehicle={selectedVehicle}
        onSaved={() => {
          showToast(
            selectedVehicle ? "تم تحديث بيانات السيارة بنجاح" : "تم نشر السيارة بالمعرض بنجاح",
            "success"
          );
          fetchVehicles();
        }}
        onError={(msg) => showToast(msg, "error")}
      />

      {/* Delete Confirmation Dialog */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setVehicleToDelete(null)} />
          <div className="relative w-full max-w-sm rounded-xl border bg-card p-6 shadow-xl text-right z-10 space-y-4">
            <div className="flex items-center gap-3 text-destructive">
              <HugeiconsIcon icon={Delete02Icon} className="size-5" />
              <h3 className="text-sm font-bold">تأكيد أرشفة السيارة</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              هل أنت متأكد من نقل سيارة <strong>«{vehicleToDelete.title}»</strong> إلى سلة المهملات
              وأرشفتها من المعرض النشط؟
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setVehicleToDelete(null)}>
                إلغاء
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleting}
                onClick={handleConfirmDelete}
              >
                {deleting ? "جارٍ الحذف..." : "أرشفة السيارة"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
