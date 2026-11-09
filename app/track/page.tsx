'use client';

import React, { useState } from 'react';
import { Compass, Search, Ship, CheckCircle2, Clock, MapPin, AlertCircle, FileCheck, Key } from 'lucide-react';
import { pb, Order } from '@/lib/pocketbase';

export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Demo simulation order for test
  const demoOrder: Order = {
    id: 'demo-1',
    order_number: 'CRX-26-089',
    client_name: 'أحمد بن علي',
    client_phone: '0661000000',
    client_pin: '1234',
    vehicle: 'coolray-battle',
    customs_regime: 'licence_moudjahidine',
    agreed_price_centimes: 399,
    deposit_paid_centimes: 100,
    current_step: 2,
    expand: {
      vehicle: {
        id: 'v1',
        title: 'Geely Coolray Battle 2026',
        brand: 'Geely',
        model: 'Coolray',
        year: 2026,
        mileage_status: 'zero_km',
        origin_country: 'الصين',
        status: 'in_transit',
        price_total_dzd_centimes: 399,
        engine_type: 'essence',
        engine_displacement_cc: 1498,
        transmission: 'automatique',
        color: 'أبيض لؤلؤي',
        images: [],
        is_featured: true,
        created: '',
        updated: '',
      },
      shipment: {
        id: 's1',
        container_number: 'MSKU-8923412',
        shipping_company: 'COSCO Shipping Lines',
        vessel_name: 'COSCO SHIPPING SCORPIO',
        departure_port: 'ميناء شنغهاي، الصين (Shanghai Port)',
        arrival_port: 'ميناء جن جن، جيجل (Port de Djen Djen)',
        departure_date: '2026-10-15',
        estimated_arrival: '2026-11-28',
        current_status: 'sailing',
      },
      selected_branch: {
        id: 'jijel',
        code: 'jijel',
        name_ar: 'صالة جيجل (بوالرمل)',
        name_fr: 'Jijel - Boulrimal',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'المنطقة التجارية بوالرمل، الطاهير (قرب ميناء جن جن)',
        is_active: true,
      },
    },
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !pin) {
      setError('يرجى إدخال رقم الهاتف والرمز السري PIN');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Query PocketBase with custom client headers for security
      const res = await pb.collection('orders').getList<Order>(1, 1, {
        filter: `client_phone = "${phone.trim()}" && client_pin = "${pin.trim()}"`,
        expand: 'vehicle,shipment,selected_branch',
        headers: {
          x_client_phone: phone.trim(),
          x_client_pin: pin.trim(),
        },
      });

      if (res.items && res.items.length > 0) {
        setOrder(res.items[0]);
      } else if (phone === '0661000000' && pin === '1234') {
        setOrder(demoOrder);
      } else {
        setError('لم نتمكن من العثور على طلب مطابق لرقم الهاتف والرمز المدخل. يرجى التأكد من بياناتك أو التواصل مع صالة العرض.');
        setOrder(null);
      }
    } catch (err: any) {
      // Allow demo if test credentials
      if (phone === '0661000000' && pin === '1234') {
        setOrder(demoOrder);
      } else {
        setError('حدث خطأ أثناء البحث، يرجى المحاولة لاحقاً أو مراسلتنا على واتساب.');
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      num: 1,
      title: 'تأكيد الطلب والعقد',
      desc: 'تم تسجيل العقد ودفع العربون وتخصيص رقم الشاسيه',
      icon: FileCheck,
    },
    {
      num: 2,
      title: 'الشحن البحري في الحاوية',
      desc: 'السيارة على متن الباخرة في طريقها إلى الجزائر',
      icon: Ship,
    },
    {
      num: 3,
      title: 'وصول الميناء والجمركة',
      desc: 'رسو السفينة وبدء التخليص الجمركي واستخراج D10',
      icon: MapPin,
    },
    {
      num: 4,
      title: 'التسليم في صالة العرض',
      desc: 'الفحص النهائي واستلام المفاتيح والملف القاعدي',
      icon: Key,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-right">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-carvex-cyan/15 text-carvex-cyan text-xs font-bold">
          <Compass className="w-4 h-4" />
          <span>تتبع مسار شحنتك المباشر في البحر والميناء</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          بوابة تتبع طلبات استيراد السيارات
        </h1>
        <p className="text-sm text-carvex-muted max-w-2xl leading-relaxed">
          أدخل رقم هاتفك المسجل بالعقد ورمز الأمان السري (PIN) لمتابعة مكان سيارتك في البحر، تاريخ الوصول المتوقع، وحالة التخليص الجمركي.
        </p>
      </div>

      {/* Lookup Card Form */}
      <div className="bg-carvex-surface border border-carvex-border rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6 space-y-1">
            <label className="text-xs font-bold text-white block">رقم الهاتف المسجل بالعقد:</label>
            <input
              type="text"
              placeholder="مثلاً: 0661XXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-carvex-card border border-carvex-border focus:border-carvex-cyan text-white text-sm outline-none transition-colors font-mono"
            />
          </div>

          <div className="sm:col-span-4 space-y-1">
            <label className="text-xs font-bold text-white block">رمز التتبع السري (PIN):</label>
            <input
              type="password"
              placeholder="رمز من 4 أرقام"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-carvex-card border border-carvex-border focus:border-carvex-cyan text-white text-sm outline-none transition-colors font-mono text-center tracking-widest"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm transition-all shadow-lg shadow-carvex-cyan/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>بحث</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-carvex-muted mt-3">
          * تجربة سريعة للبيانات التجريبية: استخدم الهاتف <code className="text-carvex-cyan font-mono">0661000000</code> والرمز <code className="text-carvex-cyan font-mono">1234</code>
        </p>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-carvex-red/15 border border-carvex-red/40 text-xs text-carvex-red flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Order Tracking Result View */}
      {order && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Order Snapshot Card */}
          <div className="bg-carvex-card border border-carvex-cyan/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-carvex-border gap-3">
              <div>
                <span className="text-xs text-carvex-cyan font-mono font-bold block">
                  طلب رقم: {order.order_number}
                </span>
                <h2 className="text-xl font-black text-white">
                  {order.expand?.vehicle?.title || 'طلب سيارة مستوردة'}
                </h2>
              </div>
              <div className="text-left">
                <span className="text-xs text-carvex-muted block">صالة الاستلام</span>
                <span className="text-sm font-bold text-slate-200">
                  {order.expand?.selected_branch?.name_ar || 'صالة جيجل (بوالرمل)'}
                </span>
              </div>
            </div>

            {/* Stepper (4 stages) */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {steps.map((st) => {
                const isCompleted = order.current_step > st.num;
                const isCurrent = order.current_step === st.num;
                const StepIcon = st.icon;

                return (
                  <div
                    key={st.num}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-carvex-cyan/15 border-carvex-cyan shadow-lg shadow-carvex-cyan/10'
                        : isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-carvex-surface/50 border-carvex-border/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-black text-carvex-muted">
                        المحطة 0{st.num}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-carvex-cyan animate-ping" />
                      ) : (
                        <Clock className="w-4 h-4 text-carvex-muted" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                      <StepIcon className="w-4 h-4 text-carvex-cyan" />
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-carvex-muted leading-relaxed">{st.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Shipping & Voyage Details Box */}
            {order.expand?.shipment && (
              <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border space-y-3">
                <h4 className="text-xs font-black text-carvex-cyan uppercase tracking-wider flex items-center gap-1.5">
                  <Ship className="w-4 h-4" />
                  بيانات الحاوية والباخرة في البحر
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-carvex-muted block text-[11px]">رقم الحاوية البحري:</span>
                    <span className="text-white font-mono font-bold">{order.expand.shipment.container_number}</span>
                  </div>
                  <div>
                    <span className="text-carvex-muted block text-[11px]">اسم السفينة والناقل:</span>
                    <span className="text-white font-bold">{order.expand.shipment.vessel_name}</span>
                  </div>
                  <div>
                    <span className="text-carvex-muted block text-[11px]">تاريخ الوصول المتوقع للميناء:</span>
                    <span className="text-carvex-cyan font-mono font-bold">
                      {order.expand.shipment.estimated_arrival}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
