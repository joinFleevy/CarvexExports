'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Car,
  Calculator,
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  Edit3,
  Trash2,
  ExternalLink,
  ChevronDown,
  X,
  Upload,
  RefreshCw,
  LogOut,
  Sliders,
  DollarSign,
  Ship,
  Building2,
  Lock,
  ArrowRight,
  TrendingUp,
  Percent,
  Sparkles,
  Printer,
  ChevronRight,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { pb, Vehicle, Branch, getVehicleImageUrl } from '@/lib/pocketbase';
import { formatPriceCentimes, formatDinar } from '@/lib/utils';
import {
  CustomsConfig,
  DEFAULT_CUSTOMS_CONFIG,
  calculateAdminPricing,
} from '@/lib/customs';
import {
  numberToArabicWordsDinar,
  centimesToArabicWords,
  numberToFrenchWordsDinar,
} from '@/lib/numberToWords';
import {
  getStoredAdminToken,
  getStoredAdminProfile,
  setStoredAdminSession,
  clearAdminSession,
  AdminProfile,
} from '@/lib/adminAuth';

type ActiveTab = 'products' | 'taxes' | 'documents';

interface VehicleFormData {
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

const INITIAL_FORM_DATA: VehicleFormData = {
  title: '',
  brand: 'Geely',
  model: '',
  year: 2026,
  mileage_status: 'zero_km',
  origin_country: 'الصين',
  status: 'in_stock',
  branch: 'qqxggp603ha2d0j', // Default to Alger
  price_total_dzd_centimes: 380,
  price_fob_dzd_centimes: 270,
  engine_type: 'essence',
  engine_displacement_cc: 1498,
  transmission: 'automatique',
  color: 'رمادي فضي',
  is_featured: false,
  hide_price: false,
  existingImages: [],
  newFiles: [],
  deletedImages: [],
};

const BRANCHES_MAP: Record<string, { nameAr: string; code: string; color: string }> = {
  qqxggp603ha2d0j: { nameAr: 'صالة العاصمة (المحمدية)', code: 'alger', color: 'border-blue-500/30 text-blue-400 bg-blue-500/10' },
  v8wpji0y4kcr1lw: { nameAr: 'صالة جيجل (بوالرمل)', code: 'jijel', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
  '9itkocw911rrx3t': { nameAr: 'صالة ورقلة (الوسط)', code: 'ouergla', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
};

const STATUS_OPTIONS: { id: Vehicle['status']; labelAr: string; color: string }[] = [
  { id: 'in_stock', labelAr: 'متوفرة بالمعرض', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  { id: 'in_transit', labelAr: 'في الحاوية بالبحر', color: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  { id: 'on_order', labelAr: 'قيد الطلب والتصنيع', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  { id: 'reserved', labelAr: 'محجوزة بعربون', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  { id: 'sold', labelAr: 'تم البيع والتسليم', color: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
];

export default function AdminDashboardPage() {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('namaagrowthagency@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('fDTHzV3HhhiaTFy@');
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);

  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  // --- VEHICLES DATA STATE ---
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // --- SLIDE-OVER DRAWER (CREATE & EDIT) ---
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<VehicleFormData>(INITIAL_FORM_DATA);
  const [formSaving, setFormSaving] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- DELETE CONFIRMATION MODAL ---
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // --- TAXES & PRICING CALCULATOR STATE ---
  const [calcSelectedVehicleId, setCalcSelectedVehicleId] = useState<string>('custom');
  const [calcCarTitle, setCalcCarTitle] = useState<string>('Geely Coolray 2026');
  const [calcFactoryPriceUsd, setCalcFactoryPriceUsd] = useState<number>(11500);
  const [calcDisplacementCc, setCalcDisplacementCc] = useState<number>(1498);
  const [calcEngineType, setCalcEngineType] = useState<'essence' | 'hybrid' | 'electric'>('essence');
  const [calcMarginPercent, setCalcMarginPercent] = useState<number>(10);
  const [calcMarginCentimes, setCalcMarginCentimes] = useState<number>(35);
  const [calcUsePercentMargin, setCalcUsePercentMargin] = useState<boolean>(true);
  const [customsConfig, setCustomsConfig] = useState<CustomsConfig>({ ...DEFAULT_CUSTOMS_CONFIG });
  const [customsSavedToast, setCustomsSavedToast] = useState<boolean>(false);

  // --- DOCUMENTS GENERATOR STATE ---
  const [docType, setDocType] = useState<'recu_arbon' | 'recu_paiement' | 'contrat_vente'>('recu_arbon');
  const [docNumber, setDocNumber] = useState<string>(`CRV-${new Date().getFullYear()}-0914`);
  const [docClientName, setDocClientName] = useState<string>('كريم بلقاسم / Belkacem Karim');
  const [docClientPhone, setDocClientPhone] = useState<string>('0661 23 45 67');
  const [docClientCin, setDocClientCin] = useState<string>('110482914839');
  const [docCarTitle, setDocCarTitle] = useState<string>('Geely Coolray Battle 2026');
  const [docVin, setDocVin] = useState<string>('LB37542981X09421');
  const [docDepositCentimes, setDocDepositCentimes] = useState<number>(50); // 50 Million Centimes
  const [docBranch, setDocBranch] = useState<'alger' | 'jijel' | 'ouergla'>('alger');

  // 1. Initial Auth Check
  useEffect(() => {
    const token = getStoredAdminToken();
    const profile = getStoredAdminProfile();
    if (token) {
      setIsAuthenticated(true);
      setAdminProfile(profile || { email: 'namaagrowthagency@gmail.com' });
    }
    setAuthChecked(true);
  }, []);

  // 2. Fetch Vehicles List
  const fetchVehicles = async () => {
    setLoadingVehicles(true);
    try {
      const res = await fetch('/api/admin/vehicles');
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setVehicles(data.items);
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchVehicles();
    }
  }, [isAuthenticated]);

  // Toast auto-dismiss
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // --- AUTH ACTIONS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل تسجيل الدخول');
      }

      setStoredAdminSession(data.token, data.admin);
      setAdminProfile(data.admin);
      setIsAuthenticated(true);
      setNotification({ message: 'مرحباً بك! تم تسجيل الدخول بنجاح', type: 'success' });
    } catch (err: any) {
      setAuthError(err.message || 'بيانات الدخول غير صحيحة');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setAdminProfile(null);
  };

  // --- VEHICLE STATUS INLINE UPDATE ---
  const handleInlineStatusChange = async (vehicleId: string, newStatus: Vehicle['status']) => {
    // Optimistic UI update
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status: newStatus } : v))
    );

    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل تحديث الحالة');
      }
      setNotification({ message: 'تم تحديث حالة السيارة بنجاح', type: 'success' });
    } catch (err: any) {
      fetchVehicles(); // revert on error
      setNotification({ message: err.message || 'حدث خطأ أثناء التحديث', type: 'error' });
    }
  };

  // --- VEHICLE FEATURED & HIDE PRICE TOGGLE ---
  const handleToggleProperty = async (
    vehicleId: string,
    property: 'is_featured' | 'hide_price',
    currentValue: boolean
  ) => {
    const nextVal = !currentValue;
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, [property]: nextVal } : v))
    );

    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [property]: nextVal }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);
      setNotification({
        message: property === 'is_featured'
          ? (nextVal ? 'تم تمييز السيارة كعرض خاص' : 'تم إلغاء التمييز')
          : (nextVal ? 'تم إخفاء السعر الرقمي (طلب السعر عبر واتساب)' : 'تم إظهار السعر الرقمي للزبائن'),
        type: 'success',
      });
    } catch {
      fetchVehicles();
      setNotification({ message: 'فشل تغيير الإعداد', type: 'error' });
    }
  };

  // --- OPEN DRAWER FOR CREATE ---
  const handleOpenCreateDrawer = () => {
    setIsEditing(false);
    setFormData(INITIAL_FORM_DATA);
    setDrawerOpen(true);
  };

  // --- OPEN DRAWER FOR EDIT ---
  const handleOpenEditDrawer = (v: Vehicle) => {
    setIsEditing(true);
    setFormData({
      id: v.id,
      title: v.title || '',
      brand: v.brand || 'Geely',
      model: v.model || '',
      year: v.year || 2026,
      mileage_status: v.mileage_status || 'zero_km',
      origin_country: v.origin_country || 'الصين',
      status: v.status || 'in_stock',
      branch: v.branch || 'qqxggp603ha2d0j',
      price_total_dzd_centimes: v.price_total_dzd_centimes || 0,
      price_fob_dzd_centimes: v.price_fob_dzd_centimes || 0,
      engine_type: v.engine_type || 'essence',
      engine_displacement_cc: v.engine_displacement_cc || 1498,
      transmission: v.transmission || 'automatique',
      color: v.color || '',
      is_featured: !!v.is_featured,
      hide_price: !!v.hide_price,
      existingImages: Array.isArray(v.images) ? v.images : [],
      newFiles: [],
      deletedImages: [],
    });
    setDrawerOpen(true);
  };

  // --- PHOTO MANAGEMENT IN DRAWER ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const addedFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        newFiles: [...prev.newFiles, ...addedFiles],
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

  const handleRemoveNewFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      newFiles: prev.newFiles.filter((_, idx) => idx !== index),
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
    setNotification({ message: 'تم تعيين هذه الصورة كصورة غلاف رئيسية', type: 'success' });
  };

  // --- SAVE PRODUCT (CREATE OR EDIT) ---
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);

    try {
      const bodyFormData = new FormData();
      bodyFormData.append('title', formData.title.trim());
      bodyFormData.append('brand', formData.brand.trim());
      bodyFormData.append('model', formData.model.trim());
      bodyFormData.append('year', String(formData.year));
      bodyFormData.append('mileage_status', formData.mileage_status);
      bodyFormData.append('origin_country', formData.origin_country.trim());
      bodyFormData.append('status', formData.status);
      bodyFormData.append('branch', formData.branch);
      bodyFormData.append('price_total_dzd_centimes', String(formData.price_total_dzd_centimes));
      bodyFormData.append('price_fob_dzd_centimes', String(formData.price_fob_dzd_centimes));
      bodyFormData.append('engine_type', formData.engine_type);
      bodyFormData.append('engine_displacement_cc', String(formData.engine_displacement_cc));
      bodyFormData.append('transmission', formData.transmission);
      bodyFormData.append('color', formData.color.trim());
      bodyFormData.append('is_featured', String(formData.is_featured));
      bodyFormData.append('hide_price', String(formData.hide_price));

      // Append new files
      for (const file of formData.newFiles) {
        bodyFormData.append('images', file);
      }

      // If editing and some existing images were deleted
      for (const delImg of formData.deletedImages) {
        bodyFormData.append('images-', delImg);
      }

      let res;
      if (isEditing && formData.id) {
        res = await fetch(`/api/admin/vehicles?id=${formData.id}`, {
          method: 'PUT',
          body: bodyFormData,
        });
      } else {
        res = await fetch('/api/admin/vehicles', {
          method: 'POST',
          body: bodyFormData,
        });
      }

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'فشل حفظ بيانات السيارة');
      }

      setNotification({
        message: isEditing ? 'تم تحديث بيانات السيارة بنجاح' : 'تم نشر السيارة الجديدة بالمعرض بنجاح',
        type: 'success',
      });
      setDrawerOpen(false);
      fetchVehicles();
    } catch (err: any) {
      setNotification({ message: err.message || 'حدث خطأ أثناء الحفظ', type: 'error' });
    } finally {
      setFormSaving(false);
    }
  };

  // --- DELETE VEHICLE ---
  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleToDelete.id}&permanent=false`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setNotification({ message: 'تم أرشفة ونقل السيارة للمهملات بنجاح', type: 'success' });
      setVehicleToDelete(null);
      fetchVehicles();
    } catch (err: any) {
      setNotification({ message: err.message || 'فشل الحذف', type: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  // --- CALCULATOR COMPUTATION ---
  const pricingOutput = useMemo(() => {
    return calculateAdminPricing({
      factoryPriceUsd: calcFactoryPriceUsd,
      displacementCc: calcDisplacementCc,
      engineType: calcEngineType,
      usePercentageMargin: calcUsePercentMargin,
      customMarginPercent: calcMarginPercent,
      customMarginCentimes: calcMarginCentimes,
      config: customsConfig,
    });
  }, [
    calcFactoryPriceUsd,
    calcDisplacementCc,
    calcEngineType,
    calcUsePercentMargin,
    calcMarginPercent,
    calcMarginCentimes,
    customsConfig,
  ]);

  // When selecting a car in calculator view
  const handleSelectCarInCalc = (id: string) => {
    setCalcSelectedVehicleId(id);
    if (id === 'custom') {
      setCalcCarTitle('سيارة جديدة للاستيراد 2026');
      setCalcFactoryPriceUsd(11500);
      setCalcDisplacementCc(1498);
      setCalcEngineType('essence');
      return;
    }
    const found = vehicles.find((v) => v.id === id);
    if (found) {
      setCalcCarTitle(found.title);
      setCalcDisplacementCc(found.engine_displacement_cc || 1498);
      setCalcEngineType(found.engine_type || 'essence');
      const fob = found.price_fob_dzd_centimes || Math.round(found.price_total_dzd_centimes * 0.7);
      const estUsd = Math.round(((fob - customsConfig.fretShippingCostCentimes) * 10000) / customsConfig.usdToDzdRate);
      setCalcFactoryPriceUsd(estUsd > 0 ? estUsd : 11500);
    }
  };

  // --- FILTERED VEHICLES LIST ---
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.title?.toLowerCase().includes(q) ||
        v.brand?.toLowerCase().includes(q) ||
        v.model?.toLowerCase().includes(q) ||
        v.color?.toLowerCase().includes(q);

      // Branch filter
      const matchesBranch = selectedBranchFilter === 'all' || v.branch === selectedBranchFilter;

      // Status filter
      const matchesStatus = selectedStatusFilter === 'all' || v.status === selectedStatusFilter;

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [vehicles, searchQuery, selectedBranchFilter, selectedStatusFilter]);

  // Fleet Statistics
  const fleetStats = useMemo(() => {
    const totalCount = vehicles.length;
    const inStock = vehicles.filter((v) => v.status === 'in_stock').length;
    const inTransit = vehicles.filter((v) => v.status === 'in_transit').length;
    const reservedOrSold = vehicles.filter((v) => v.status === 'reserved' || v.status === 'sold').length;
    const totalValueCentimes = vehicles.reduce((acc, v) => acc + (v.price_total_dzd_centimes || 0), 0);

    return { totalCount, inStock, inTransit, reservedOrSold, totalValueCentimes };
  }, [vehicles]);

  // If auth is still checking
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00A2E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- LOGIN GATE SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#00A2E8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#0D111A]/95 border border-white/10 rounded-2xl p-8 backdrop-blur-2xl shadow-2xl relative z-10 text-right">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/15 bg-black p-2 mb-4 shadow-lg shadow-[#00A2E8]/10">
              <Image src="/images/logo.jpg" alt="CARVEX" fill className="object-contain p-1" priority />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wide">CARVEX EXPORT</h1>
            <p className="text-sm text-slate-400 mt-1">بوابة الدخول للمشرف المركزي ولوحة التحكم</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">البريد الإلكتروني للمشرف</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="namaagrowthagency@gmail.com"
                dir="ltr"
                className="w-full px-4 py-3 bg-[#141923] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00A2E8] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">كلمة المرور المشفرة</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  dir="ltr"
                  className="w-full px-4 py-3 bg-[#141923] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00A2E8] transition-colors text-sm"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#00A2E8] to-[#0081BA] hover:from-[#0092D2] hover:to-[#0070A3] text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#00A2E8]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>جارٍ التحقق من الصلاحيات...</span>
                </>
              ) : (
                <>
                  <span>دخول لوحة التحكم</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-[#00A2E8] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للموقع الرئيسي للزوار</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN SQUARE UI DASHBOARD SHELL ---
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-[#00A2E8] selection:text-black [cursor:default]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#141923] border border-white/20 text-white shadow-2xl backdrop-blur-xl animate-fade-in text-sm">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. SQUARE UI SIDEBAR NAVIGATION                         */}
      {/* ======================================================== */}
      <aside className="w-full md:w-64 bg-[#0A0D14] border-b md:border-b-0 md:border-l border-white/10 flex flex-col flex-shrink-0 z-20">
        {/* Brand & Showroom Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/15 bg-black">
              <Image src="/images/logo.jpg" alt="CARVEX" fill className="object-contain p-1" priority />
            </div>
            <div>
              <span className="text-sm font-black text-white tracking-wide block">CARVEX EXPORT</span>
              <span className="text-[10px] text-slate-400 block font-medium">لوحة الإدارة المركزية</span>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="متصل بالنظام المباشر" />
        </div>

        {/* Navigation Items (Square UI style) */}
        <div className="p-3 space-y-1.5 flex-1">
          <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            الوحدات التشغيلية
          </div>

          {/* Tab 1: Products Manager */}
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#141923] text-white border border-[#00A2E8]/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Car className={`w-4 h-4 ${activeTab === 'products' ? 'text-[#00A2E8]' : 'text-slate-400'}`} />
              <span>إدارة المنتجات والسيارات</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
              {vehicles.length}
            </span>
          </button>

          {/* Tab 2: Taxes & Customs Calculator */}
          <button
            onClick={() => setActiveTab('taxes')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'taxes'
                ? 'bg-[#141923] text-white border border-[#00A2E8]/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calculator className={`w-4 h-4 ${activeTab === 'taxes' ? 'text-[#00A2E8]' : 'text-slate-400'}`} />
              <span>حاسبة الضرائب والجمارك</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              23-74
            </span>
          </button>

          {/* Tab 3: Official Receipts & Contracts */}
          <button
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-[#141923] text-white border border-[#00A2E8]/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${activeTab === 'documents' ? 'text-[#00A2E8]' : 'text-slate-400'}`} />
              <span>مولد الوصولات والعقود</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
              PDF
            </span>
          </button>
        </div>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            href="/inventory"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-[#00A2E8] hover:bg-white/5 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>معاينة الموقع للجمهور</span>
            </div>
            <span className="text-[10px] text-slate-400">فتح</span>
          </Link>

          <div className="p-2.5 rounded-xl bg-[#141923] border border-white/5 flex items-center justify-between">
            <div className="truncate">
              <span className="text-[11px] text-white font-medium block truncate">
                {adminProfile?.email || 'المشرف العام'}
              </span>
              <span className="text-[10px] text-emerald-400 block">جلسة نشطة ومؤمنة</span>
            </div>
            <button
              onClick={handleLogout}
              title="تسجيل الخروج"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE AREA                                  */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between gap-4 bg-[#0A0D14]/80 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              {activeTab === 'products' && 'إدارة أسطول السيارات والمنتجات'}
              {activeTab === 'taxes' && 'حاسبة الضرائب والتخليص الجمركي (Dédouanement)'}
              {activeTab === 'documents' && 'مولد الوصولات والعقود الرسمية (Reçu d\'Arbon)'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {activeTab === 'products' && 'استعراض، فلترة، تعديل فوري، ونشر سيارات جديدة في المعرض'}
              {activeTab === 'taxes' && 'محاكي تكاليف المرسوم 23-74 وضبط هوامش الربح وأسعار الصرف'}
              {activeTab === 'documents' && 'إصدار وصل استلام العربون وطباعته مع تفقيط الأرقام بالحروف'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={handleOpenCreateDrawer}
                className="px-4 py-2 bg-gradient-to-r from-[#00A2E8] to-[#0081BA] hover:from-[#0092D2] hover:to-[#0070A3] text-black font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shadow-[#00A2E8]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>نشر سيارة جديدة</span>
              </button>
            )}
            <button
              onClick={fetchVehicles}
              title="تحديث البيانات"
              className="p-2 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loadingVehicles ? 'animate-spin text-[#00A2E8]' : ''}`} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 space-y-6">

          {/* ======================================================== */}
          {/* TAB 1: PRODUCTS & INVENTORY MANAGER                     */}
          {/* ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              {/* Fleet Summary KPIs Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#0D111A] border border-white/10">
                  <span className="text-xs text-slate-400 block mb-1">إجمالي الأسطول</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-mono">{fleetStats.totalCount}</span>
                    <span className="text-[11px] text-slate-400">سيارة مسجلة</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D111A] border border-white/10">
                  <span className="text-xs text-emerald-400 block mb-1">جاهزة في الصالات</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-400 font-mono">{fleetStats.inStock}</span>
                    <span className="text-[11px] text-slate-400">تسليم فوري</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D111A] border border-white/10">
                  <span className="text-xs text-sky-400 block mb-1">في الحاويات بالبحر</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-sky-400 font-mono">{fleetStats.inTransit}</span>
                    <span className="text-[11px] text-slate-400">شحن دولي</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D111A] border border-white/10">
                  <span className="text-xs text-[#00A2E8] block mb-1">القيمة التقديرية للأسطول</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#00A2E8] font-mono">
                      {fleetStats.totalValueCentimes.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-400">مليون سنتيم</span>
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar (Square UI Style) */}
              <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="بحث عن سيارة بالموديل، الماركة، أو اللون..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 bg-[#141923] border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00A2E8] transition-colors"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Branch Filter */}
                  <select
                    value={selectedBranchFilter}
                    onChange={(e) => setSelectedBranchFilter(e.target.value)}
                    className="px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#00A2E8] transition-colors cursor-pointer"
                  >
                    <option value="all">كافة الصالات والفروع</option>
                    <option value="qqxggp603ha2d0j">الجزائر العاصمة (المحمدية)</option>
                    <option value="v8wpji0y4kcr1lw">جيجل (بوالرمل)</option>
                    <option value="9itkocw911rrx3t">ورقلة (الوسط)</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#00A2E8] transition-colors cursor-pointer"
                  >
                    <option value="all">كافة الحالات</option>
                    <option value="in_stock">متوفرة بالمعرض</option>
                    <option value="in_transit">في الحاوية بالبحر</option>
                    <option value="on_order">قيد الطلب</option>
                    <option value="reserved">محجوزة بعربون</option>
                    <option value="sold">تم البيع</option>
                  </select>
                </div>
              </div>

              {/* High-Density Square UI Data Table */}
              <div className="rounded-2xl border border-white/10 bg-[#0D111A] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#121622] text-slate-400 font-semibold">
                        <th className="py-3 px-4">الصورة</th>
                        <th className="py-3 px-4">الموديل والماركة</th>
                        <th className="py-3 px-4">الصالة المعينة</th>
                        <th className="py-3 px-4">السعر (سنتيم / دج)</th>
                        <th className="py-3 px-4">الحالة الميدانية (تعديل فوري)</th>
                        <th className="py-3 px-4 text-center">الرؤية والتمييز</th>
                        <th className="py-3 px-4 text-left">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loadingVehicles ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400">
                            <div className="w-6 h-6 border-2 border-[#00A2E8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                            <span>جارٍ جلب أسطول السيارات من السيرفر...</span>
                          </td>
                        </tr>
                      ) : filteredVehicles.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400">
                            <Car className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                            <span>لا توجد سيارات تطابق الفلتر الحالي</span>
                          </td>
                        </tr>
                      ) : (
                        filteredVehicles.map((vehicle) => {
                          const branchInfo = vehicle.branch ? BRANCHES_MAP[vehicle.branch] : null;
                          const coverImage = vehicle.images?.[0];
                          const imageUrl = coverImage
                            ? getVehicleImageUrl(vehicle, coverImage)
                            : '/images/car-placeholder.jpg';

                          return (
                            <tr key={vehicle.id} className="hover:bg-white/[0.02] transition-colors group">
                              {/* Photo thumbnail */}
                              <td className="py-3 px-4">
                                <div className="relative w-16 h-11 rounded-lg overflow-hidden border border-white/10 bg-black flex-shrink-0">
                                  <Image
                                    src={imageUrl}
                                    alt={vehicle.title}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                </div>
                              </td>

                              {/* Title, Year, Engine */}
                              <td className="py-3 px-4">
                                <div className="font-bold text-white text-sm">{vehicle.title}</div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                  <span>{vehicle.year}</span>
                                  <span>•</span>
                                  <span>{vehicle.engine_type} ({vehicle.engine_displacement_cc || 1500} cc)</span>
                                  <span>•</span>
                                  <span>{vehicle.transmission}</span>
                                </div>
                              </td>

                              {/* Branch Badge */}
                              <td className="py-3 px-4">
                                {branchInfo ? (
                                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${branchInfo.color}`}>
                                    {branchInfo.nameAr}
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-slate-500">غير محدد</span>
                                )}
                              </td>

                              {/* Price Centimes & DZD */}
                              <td className="py-3 px-4 font-mono">
                                {vehicle.hide_price ? (
                                  <div>
                                    <span className="text-amber-400 text-xs font-bold block">السعر عند الطلب</span>
                                    <span className="text-[10px] text-slate-500 line-through">
                                      {vehicle.price_total_dzd_centimes} مليون
                                    </span>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="text-white font-bold text-sm block">
                                      {vehicle.price_total_dzd_centimes} مليون
                                    </span>
                                    <span className="text-[10px] text-slate-400 block">
                                      {formatDinar((vehicle.price_total_dzd_centimes || 0) * 10000)}
                                    </span>
                                  </div>
                                )}
                              </td>

                              {/* Inline Status Dropdown */}
                              <td className="py-3 px-4">
                                <select
                                  value={vehicle.status}
                                  onChange={(e) =>
                                    handleInlineStatusChange(vehicle.id, e.target.value as Vehicle['status'])
                                  }
                                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer focus:outline-none ${
                                    STATUS_OPTIONS.find((s) => s.id === vehicle.status)?.color ||
                                    'bg-zinc-800 text-zinc-300 border-zinc-700'
                                  }`}
                                >
                                  {STATUS_OPTIONS.map((opt) => (
                                    <option key={opt.id} value={opt.id} className="bg-[#141923] text-white">
                                      {opt.labelAr}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              {/* Visibility Toggles (Featured & Hide Price) */}
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  {/* Featured Toggle */}
                                  <button
                                    onClick={() => handleToggleProperty(vehicle.id, 'is_featured', !!vehicle.is_featured)}
                                    title={vehicle.is_featured ? 'معروضة كعرض مميز' : 'اضغط للتمييز'}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                      vehicle.is_featured
                                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                        : 'text-slate-500 border-transparent hover:border-white/10 hover:text-slate-300'
                                    }`}
                                  >
                                    <Star className="w-4 h-4 fill-current" />
                                  </button>

                                  {/* Hide Price Toggle */}
                                  <button
                                    onClick={() => handleToggleProperty(vehicle.id, 'hide_price', !!vehicle.hide_price)}
                                    title={vehicle.hide_price ? 'السعر مخفي (طلب عبر واتساب)' : 'السعر ظاهر'}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                      vehicle.hide_price
                                        ? 'bg-red-500/15 text-red-400 border-red-500/30'
                                        : 'text-slate-500 border-transparent hover:border-white/10 hover:text-slate-300'
                                    }`}
                                  >
                                    {vehicle.hide_price ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </td>

                              {/* Action Buttons */}
                              <td className="py-3 px-4 text-left">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Link
                                    href={`/inventory/${vehicle.id}`}
                                    target="_blank"
                                    title="معاينة في الموقع"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#00A2E8] hover:bg-white/5 transition-colors cursor-pointer"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </Link>

                                  <button
                                    onClick={() => handleOpenEditDrawer(vehicle)}
                                    title="تعديل كامل في الدرج الجانبي"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => setVehicleToDelete(vehicle)}
                                    title="حذف / أرشفة"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: CALCULATOR OF TAXES & CUSTOMS                    */}
          {/* ======================================================== */}
          {activeTab === 'taxes' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Simulator & Vehicle Selector (8 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#00A2E8]" />
                      <span>محاكي التسعير الفوري للمركبة</span>
                    </h3>
                    <span className="text-[10px] text-slate-400">مرسوم تنفيذي 23-74</span>
                  </div>

                  {/* Choose from inventory */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      اختر سيارة من أسطول المعرض أو قم بحساب تسعيرة جديدة:
                    </label>
                    <select
                      value={calcSelectedVehicleId}
                      onChange={(e) => handleSelectCarInCalc(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141923] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A2E8] transition-colors cursor-pointer"
                    >
                      <option value="custom">⚡ سيارة جديدة للاستيراد (إدخال يدوي)</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.title} ({v.year}) — سعر المعرض الحالي: {v.price_total_dzd_centimes} مليون سنتيم
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">اسم الموديل التجاري</label>
                      <input
                        type="text"
                        value={calcCarTitle}
                        onChange={(e) => setCalcCarTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">سعر المصنع بالدولار (FOB USD)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={calcFactoryPriceUsd}
                          onChange={(e) => setCalcFactoryPriceUsd(Number(e.target.value))}
                          className="w-full pl-3 pr-8 py-2 bg-[#141923] border border-white/10 rounded-xl text-xs text-white font-mono"
                        />
                        <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">سعة المحرك (Cylinder cc)</label>
                      <input
                        type="number"
                        value={calcDisplacementCc}
                        onChange={(e) => setCalcDisplacementCc(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">نوع الوقود والمحرك</label>
                      <select
                        value={calcEngineType}
                        onChange={(e) => setCalcEngineType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-xs text-white"
                      >
                        <option value="essence">بنزين (Essence)</option>
                        <option value="hybrid">هجين (Hybride)</option>
                        <option value="electric">كهربائي بالكامل (100% Electric)</option>
                      </select>
                    </div>
                  </div>

                  {/* Margin calculation */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">هامش ربح الوكالة (Carvex Margin)</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="marginType"
                          checked={calcUsePercentMargin}
                          onChange={() => setCalcUsePercentMargin(true)}
                          className="accent-[#00A2E8]"
                        />
                        <span>نسبة مئوية من التكلفة الصافية (%)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="marginType"
                          checked={!calcUsePercentMargin}
                          onChange={() => setCalcUsePercentMargin(false)}
                          className="accent-[#00A2E8]"
                        />
                        <span>مبلغ ثابت بالمليون سنتيم</span>
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
                          className="flex-1 accent-[#00A2E8]"
                        />
                        <span className="font-mono text-sm font-bold text-[#00A2E8] w-12 text-left">
                          {calcMarginPercent}%
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={calcMarginCentimes}
                          onChange={(e) => setCalcMarginCentimes(Number(e.target.value))}
                          className="w-32 px-3 py-1.5 bg-[#141923] border border-white/10 rounded-xl text-xs text-white font-mono"
                        />
                        <span className="text-xs text-slate-400">مليون سنتيم</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Cost Breakdown Card */}
                <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    تفاصيل الرسوم الجمركية والتكاليف (Breakdown)
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">سعر السيارة واصل للميناء (FOB + Fret):</span>
                      <span className="font-mono text-white font-bold">{pricingOutput.fobPriceCentimes} مليون</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">
                        الرسوم والضرائب الجمركية (تخفيض {calcDisplacementCc <= 1800 ? '50%' : '20%'} قانوني):
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {Math.max(0, pricingOutput.costTurnkeyCentimes - pricingOutput.fobPriceCentimes - customsConfig.portAndTransitCentimes)} مليون
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">رسوم العبور والإفراغ بميناء جن جن / العاصمة + المناجم:</span>
                      <span className="font-mono text-white font-bold">{customsConfig.portAndTransitCentimes} مليون</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">صافي تكلفة الوكالة (Prix de revient net):</span>
                      <span className="font-mono text-white font-bold">{pricingOutput.costTurnkeyCentimes} مليون</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#00A2E8]">هامش ربح الوكالة الصافي المحتسب:</span>
                      <span className="font-mono text-[#00A2E8] font-bold">+{pricingOutput.marginCentimes} مليون</span>
                    </div>

                    <div className="flex justify-between py-3 pt-4 border-t border-white/10 text-sm">
                      <span className="font-bold text-white">السعر النهائي المقترح للبيع في الصالة:</span>
                      <div className="text-left font-mono">
                        <span className="font-black text-xl text-[#00A2E8] block">
                          {pricingOutput.suggestedTurnkeyPriceCentimes} مليون سنتيم
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {formatDinar(pricingOutput.suggestedTurnkeyPriceCentimes * 10000)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Customs Rules & Rates Editor (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      <span>إعدادات الرسوم وأسعار الصرف</span>
                    </h3>
                    {customsSavedToast && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        تم الحفظ!
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    هذه القيم تُطبق كمعايير مرجعية لحساب تكلفة الشحنات وتحديد أسعار المعارض:
                  </p>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        سعر صرف الدولار المعتمد بالجمارك (USD ➔ DZD)
                      </label>
                      <input
                        type="number"
                        value={customsConfig.usdToDzdRate}
                        onChange={(e) =>
                          setCustomsConfig((prev) => ({ ...prev, usdToDzdRate: Number(e.target.value) }))
                        }
                        className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        تكلفة الشحن البحري للحاوية (بالسنتيم الجزائري)
                      </label>
                      <input
                        type="number"
                        value={customsConfig.fretShippingCostCentimes}
                        onChange={(e) =>
                          setCustomsConfig((prev) => ({ ...prev, fretShippingCostCentimes: Number(e.target.value) }))
                        }
                        className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        رسوم المناولة والعبور بالميناء + فحص المناجم
                      </label>
                      <input
                        type="number"
                        value={customsConfig.portAndTransitCentimes}
                        onChange={(e) =>
                          setCustomsConfig((prev) => ({ ...prev, portAndTransitCentimes: Number(e.target.value) }))
                        }
                        className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        النسبة الجمركية الأساسية قبل التخفيض (القانون الجزائري)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={customsConfig.baseDutyPercent}
                          onChange={(e) =>
                            setCustomsConfig((prev) => ({ ...prev, baseDutyPercent: Number(e.target.value) }))
                          }
                          className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                        />
                        <span className="text-slate-400 font-mono">30% الأساسية</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCustomsSavedToast(true);
                      setTimeout(() => setCustomsSavedToast(false), 3000);
                      setNotification({ message: 'تم حفظ وتحديث إعدادات الرسوم الجمركية بالنظام', type: 'success' });
                    }}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>حفظ وتثبيت الإعدادات</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: OFFICIAL DOCUMENTS & RECEIPTS GENERATOR           */}
          {/* ======================================================== */}
          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Controls & Inputs (5 Cols) */}
              <div className="lg:col-span-5 space-y-5 p-6 rounded-2xl bg-[#0D111A] border border-white/10 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>إعدادات الوثيقة الرسمية</span>
                  </h3>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-black font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة</span>
                  </button>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">نوع الوثيقة</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                  >
                    <option value="recu_arbon">وصل استلام عربون (Reçu d'Acompte / Arbon)</option>
                    <option value="recu_paiement">وصل دفع نهائي (Reçu de Paiement)</option>
                    <option value="contrat_vente">عقد حجز وتوكيل استيراد (Bon de Commande)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">رقم الوثيقة المرجعي</label>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">صالة الإصدار</label>
                  <select
                    value={docBranch}
                    onChange={(e) => setDocBranch(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                  >
                    <option value="alger">الجزائر العاصمة (المحمدية)</option>
                    <option value="jijel">جيجل (بوالرمل / ميناء جن جن)</option>
                    <option value="ouergla">ورقلة (وسط المدينة)</option>
                  </select>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <span className="font-semibold text-slate-300 block">بيانات المشتري (الزبون)</span>
                  <div>
                    <label className="block text-slate-400 mb-1">الاسم واللقب</label>
                    <input
                      type="text"
                      value={docClientName}
                      onChange={(e) => setDocClientName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم الهاتف</label>
                    <input
                      type="text"
                      value={docClientPhone}
                      onChange={(e) => setDocClientPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم بطاقة التعريف / NIN</label>
                    <input
                      type="text"
                      value={docClientCin}
                      onChange={(e) => setDocClientCin(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <span className="font-semibold text-slate-300 block">بيانات المركبة والمبلغ</span>
                  <div>
                    <label className="block text-slate-400 mb-1">موديل السيارة</label>
                    <input
                      type="text"
                      value={docCarTitle}
                      onChange={(e) => setDocCarTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم الشاسيه (Châssis / VIN)</label>
                    <input
                      type="text"
                      value={docVin}
                      onChange={(e) => setDocVin(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">مبلغ العربون المستلم (بالمليون سنتيم)</label>
                    <input
                      type="number"
                      value={docDepositCentimes}
                      onChange={(e) => setDocDepositCentimes(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Live Document Preview A4 Paper (7 Cols) */}
              <div className="lg:col-span-7 flex justify-center">
                <div
                  id="print-document"
                  className="w-full max-w-xl bg-white text-black p-8 rounded-2xl shadow-2xl space-y-6 text-right border border-neutral-300"
                >
                  {/* Doc Header */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-300">
                        <Image src="/images/logo.jpg" alt="CARVEX" fill className="object-contain p-0.5" />
                      </div>
                      <div>
                        <span className="text-base font-black tracking-wider block">CARVEX EXPORT</span>
                        <span className="text-[10px] text-neutral-600 block">شركة استيراد وتوزيع السيارات</span>
                        <span className="text-[9px] text-neutral-500 block">فرع: {docBranch === 'alger' ? 'الجزائر العاصمة' : docBranch === 'jijel' ? 'جيجل' : 'ورقلة'}</span>
                      </div>
                    </div>
                    <div className="text-left font-mono">
                      <span className="text-sm font-bold block">{docNumber}</span>
                      <span className="text-[10px] text-neutral-500 block">
                        التاريخ: {new Date().toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>

                  {/* Doc Title */}
                  <div className="text-center py-2 bg-neutral-100 rounded-lg">
                    <h3 className="text-base font-black text-neutral-900">
                      {docType === 'recu_arbon' && 'وصل استلام عربون حجز سيارة (Reçu d\'Acompte)'}
                      {docType === 'recu_paiement' && 'وصل دفع نهائي (Reçu de Paiement Définitif)'}
                      {docType === 'contrat_vente' && 'وثيقة حجز وتوكيل استيراد (Bon de Commande)'}
                    </h3>
                  </div>

                  {/* Body Paragraph */}
                  <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
                    <p>
                      يشهد وكيل صالة <strong>CARVEX EXPORT</strong> باستلام مبلغ العربون من السيد(ة):
                    </p>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">اسم المشتري:</span>
                        <span className="font-bold">{docClientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">الهاتف:</span>
                        <span className="font-mono">{docClientPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">بطاقة التعريف (CIN / NIN):</span>
                        <span className="font-mono">{docClientCin}</span>
                      </div>
                    </div>

                    <p>وذلك قصد حجز واستيراد المركبة ذات المواصفات التالية:</p>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">الموديل والماركة:</span>
                        <span className="font-bold">{docCarTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">رقم الهيكل (Châssis / VIN):</span>
                        <span className="font-mono">{docVin}</span>
                      </div>
                    </div>

                    {/* Amount in Numbers and Words */}
                    <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-300 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-semibold">المبلغ المستلم بالأرقام:</span>
                        <span className="text-base font-black font-mono">
                          {formatDinar(docDepositCentimes * 10000)} ({docDepositCentimes} مليون سنتيم)
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-700">
                        <span className="font-semibold">المبلغ بالأحرف (بالدينار الجزائري): </span>
                        <span className="font-bold">{numberToArabicWordsDinar(docDepositCentimes * 10000)}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 italic" dir="ltr">
                        En toutes lettres: {numberToFrenchWordsDinar(docDepositCentimes * 10000)}
                      </div>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-200 text-xs">
                    <div className="text-center">
                      <span className="font-bold block mb-8">توقيع المشتري</span>
                      <span className="text-[10px] text-neutral-400">«قرأت ووافقت على الشروط»</span>
                    </div>
                    <div className="text-center">
                      <span className="font-bold block mb-8">ختم وتوقيع إدارة المعرض</span>
                      <div className="w-16 h-16 border-2 border-dashed border-neutral-300 rounded-full mx-auto flex items-center justify-center text-[9px] text-neutral-400">
                        ختم CARVEX
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================== */}
      {/* 3. SLIDE-OVER DRAWER (CREATE & EDIT PRODUCT)            */}
      {/* ======================================================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xl bg-[#0D111A] border-r border-white/10 h-full flex flex-col z-10 shadow-2xl text-right animate-slide-left">
            
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#10141F]">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isEditing ? `تعديل بيانات: ${formData.title}` : 'نشر سيارة جديدة في المعرض'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isEditing ? 'تعديل الصور والمواصفات والأسعار' : 'إضافة سيارة جديدة لأسطول الصالات والموقع'}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Form */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              
              {/* PHOTO MANAGER SECTION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-200 block">معرض صور السيارة (Photo Gallery)</label>
                  <span className="text-[10px] text-slate-400">الصورة الأولى هي صورة الغلاف</span>
                </div>

                {/* Existing Images */}
                {formData.existingImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5">
                    {formData.existingImages.map((img, idx) => (
                      <div
                        key={img}
                        className={`relative h-24 rounded-xl overflow-hidden border group bg-black ${
                          idx === 0 ? 'border-[#00A2E8] ring-1 ring-[#00A2E8]' : 'border-white/10'
                        }`}
                      >
                        <Image
                          src={formData.id ? `${pb.baseUrl}/api/files/vehicles/${formData.id}/${img}` : `/images/${img}`}
                          alt="Car Photo"
                          fill
                          className="object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#00A2E8] text-black font-bold text-[9px]">
                            غلاف
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverPhoto(img)}
                              title="تعيين كغلاف"
                              className="p-1 rounded bg-[#00A2E8] text-black text-[9px] font-bold cursor-pointer"
                            >
                              غلاف
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(img)}
                            title="حذف الصورة"
                            className="p-1 rounded bg-red-500 text-white cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Staged New Files Previews */}
                {formData.newFiles.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-emerald-400 font-semibold block">صور جديدة جاهزة للرفع:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.newFiles.map((file, idx) => (
                        <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-emerald-500/30 bg-[#141923] p-1 text-[10px] flex flex-col justify-between">
                          <span className="truncate text-slate-300">{file.name}</span>
                          <div className="flex justify-between items-center text-slate-500">
                            <span>{(file.size / 1024).toFixed(0)} KB</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveNewFile(idx)}
                              className="text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              إلغاء
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 border-2 border-dashed border-white/15 hover:border-[#00A2E8]/60 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-white transition-all bg-white/[0.01] cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-[#00A2E8]" />
                  <span className="font-semibold">انقر لاختيار أو سحب صور جديدة من جهازك</span>
                  <span className="text-[10px] text-slate-500">JPG, PNG, WebP (بحد أقصى 10 صور)</span>
                </button>
              </div>

              {/* CORE VEHICLE DETAILS */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <span className="font-bold text-slate-200 block">المواصفات الأساسية والتعريف</span>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-slate-400 mb-1">عنوان السيارة التجاري</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="مثال: Geely Coolray Battle 2026"
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">الماركة (Brand)</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">الموديل (Model)</label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">سنة الصنع (Year)</label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">اللون الخارجي</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="مثال: رمادي بركاني"
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* BRANCH & STATUS */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <span className="font-bold text-slate-200 block">الصالة الميدانية والحالة</span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">الصالة المخصصة</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    >
                      <option value="qqxggp603ha2d0j">الجزائر العاصمة (المحمدية)</option>
                      <option value="v8wpji0y4kcr1lw">جيجل (بوالرمل / ميناء جن جن)</option>
                      <option value="9itkocw911rrx3t">ورقلة (وسط المدينة)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">الحالة الميدانية</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.labelAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">حالة العداد</label>
                    <select
                      value={formData.mileage_status}
                      onChange={(e) => setFormData({ ...formData, mileage_status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    >
                      <option value="zero_km">0 كم جديدة تماماً (Neuf)</option>
                      <option value="under_3_years">أقل من 3 سنوات (-3 Ans)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">بلد المنشأ</label>
                    <input
                      type="text"
                      value={formData.origin_country}
                      onChange={(e) => setFormData({ ...formData, origin_country: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* ENGINE & TRANSMISSION */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <span className="font-bold text-slate-200 block">المحرك وناقل الحركة</span>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">نوع الوقود</label>
                    <select
                      value={formData.engine_type}
                      onChange={(e) => setFormData({ ...formData, engine_type: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    >
                      <option value="essence">بنزين (Essence)</option>
                      <option value="hybrid">هجين (Hybride)</option>
                      <option value="electric">كهربائي (Electric)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">سعة المحرك (cc)</label>
                    <input
                      type="number"
                      value={formData.engine_displacement_cc}
                      onChange={(e) => setFormData({ ...formData, engine_displacement_cc: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">علبة السرعة</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({ ...formData, transmission: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white"
                    >
                      <option value="automatique">أوتوماتيك</option>
                      <option value="manuelle">مانويل (يدوي)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PRICING & VISIBILITY */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <span className="font-bold text-slate-200 block">الأسعار وخيارات العرض للزبون</span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">السعر النهائي بالمعرض (مليون سنتيم)</label>
                    <input
                      type="number"
                      required
                      value={formData.price_total_dzd_centimes}
                      onChange={(e) =>
                        setFormData({ ...formData, price_total_dzd_centimes: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">سعر الاستيراد واصل للميناء FOB (مليون)</label>
                    <input
                      type="number"
                      value={formData.price_fob_dzd_centimes}
                      onChange={(e) =>
                        setFormData({ ...formData, price_fob_dzd_centimes: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-[#141923] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#141923] border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 accent-[#00A2E8]"
                    />
                    <div>
                      <span className="font-bold text-white block">تثبيت كعرض خاص ومميز في الرئيسية (Featured)</span>
                      <span className="text-[10px] text-slate-400 block">تظهر في صدارة الموقع وقسم العروض الأسبوعية</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#141923] border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hide_price}
                      onChange={(e) => setFormData({ ...formData, hide_price: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <div>
                      <span className="font-bold text-amber-400 block">إخفاء السعر الرقمي (إظهار "السعر عند الطلب")</span>
                      <span className="text-[10px] text-slate-400 block">
                        يُجبر الزبون على التواصل عبر واتساب للحصول على عرض السعر
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#0D111A] pb-2">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00A2E8] to-[#0081BA] hover:from-[#0092D2] hover:to-[#0070A3] text-black font-bold rounded-xl transition-all shadow-lg shadow-[#00A2E8]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {formSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>جارٍ الحفظ والرفع...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>{isEditing ? 'حفظ التعديلات' : 'نشر السيارة الآن'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. DELETE CONFIRMATION MODAL                             */}
      {/* ======================================================== */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setVehicleToDelete(null)} />
          <div className="relative w-full max-w-md bg-[#0D111A] border border-white/15 rounded-2xl p-6 shadow-2xl text-right z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-2">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-white">تأكيد أرشفة ونقل السيارة للمهملات</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                هل أنت متأكد من حذف سيارة <strong>«{vehicleToDelete.title}»</strong> من قائمة المعرض النشطة؟
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => setVehicleToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors text-xs font-semibold cursor-pointer"
              >
                تراجع
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? 'جارٍ الحذف...' : 'نعم، أرشفة السيارة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
