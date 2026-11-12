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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-carvex-cyan/15 text-carvex-cyan text-xs font-bold">
          <Compass className="w-4 h-4" />
          <span>تتبع مسار شحنتك المباشر في البحر والميناء</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] leading-[1.2]">
          بوابة تتبع طلبات استيراد السيارات
        </h1>
        <p className="text-base text-carvex-muted max-w-prose leading-relaxed">
          أدخل رقم هاتفك المسجل بالعقد ورمز الأمان السري <bdi dir="ltr">(PIN)</bdi> لمتابعة مكان سيارتك في البحر، تاريخ الوصول المتوقع، وحالة التخليص الجمركي.
        </p>
      </div>

      {/* Lookup Card Form */}
      <div className="bg-carvex-surface border border-carvex-border rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6 space-y-1">
            <label className="text-xs font-bold text-white block">رقم الهاتف المسجل بالعقد:</label>
            <input
              type="text"
              dir="ltr"
              placeholder="مثلاً: 0661XXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-carvex-card border border-carvex-border focus:border-carvex-cyan text-white text-base sm:text-sm tabular-nums text-end outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-4 space-y-1">
            <label className="text-xs font-bold text-white block">
              رمز التتبع السري <bdi dir="ltr">(PIN)</bdi>:
            </label>
            <input
              type="password"
              dir="ltr"
              placeholder="رمز من 4 أرقام"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-carvex-card border border-carvex-border focus:border-carvex-cyan text-white text-base sm:text-sm font-mono tabular-nums outline-none transition-colors text-center tracking-[0.25em]"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-bold text-sm transition-all shadow-lg shadow-carvex-cyan/20 flex items-center justify-center gap-2 disabled:opacity-50"
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

        <p className="text-xs text-carvex-muted mt-3 leading-relaxed">
          * تجربة سريعة للبيانات التجريبية: استخدم الهاتف{' '}
          <code dir="ltr" className="text-carvex-cyan font-mono tabular-nums">0661000000</code> والرمز{' '}
          <code dir="ltr" className="text-carvex-cyan font-mono tabular-nums">1234</code>
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
                <span className="text-xs text-carvex-cyan font-bold block">
                  طلب رقم: <bdi dir="ltr" className="font-mono tabular-nums">{order.order_number}</bdi>
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.015em]">
                  <bdi>{order.expand?.vehicle?.title || 'طلب سيارة مستوردة'}</bdi>
                </h2>
              </div>
              <div className="text-end">
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
                      <span className="text-xs font-bold text-carvex-muted tabular-nums">
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
                    <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1.5 leading-snug">
                      <StepIcon className="w-4 h-4 text-carvex-cyan shrink-0" />
                      <span>{st.title}</span>
                    </h3>
                    <p className="text-xs text-carvex-muted leading-relaxed">{st.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Shipping & Voyage Details Box */}
            {order.expand?.shipment && (
              <div className="p-5 rounded-xl bg-carvex-surface border border-carvex-border space-y-3">
                <h3 className="text-base font-bold text-carvex-cyan flex items-center gap-1.5">
                  <Ship className="w-4 h-4" />
                  <span>بيانات الحاوية والباخرة في البحر</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-carvex-muted block text-xs">رقم الحاوية البحري:</span>
                    <bdi dir="ltr" className="text-white font-mono tabular-nums font-bold">
                      {order.expand.shipment.container_number}
                    </bdi>
                  </div>
                  <div>
                    <span className="text-carvex-muted block text-xs">اسم السفينة والناقل:</span>
                    <bdi dir="ltr" className="text-white font-bold">
                      {order.expand.shipment.vessel_name}
                    </bdi>
                  </div>
                  <div>
                    <span className="text-carvex-muted block text-xs">تاريخ الوصول المتوقع للميناء:</span>
                    <bdi dir="ltr" className="text-carvex-cyan tabular-nums font-bold">
                      {order.expand.shipment.estimated_arrival}
                    </bdi>
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
