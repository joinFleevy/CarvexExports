'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Printer,
  CheckCircle2,
  Building2,
  Calendar,
  User,
  Phone,
  CreditCard,
  Car,
  Stamp,
  Sparkles,
  Download,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  numberToArabicWordsDinar,
  centimesToArabicWords,
  numberToFrenchWordsDinar,
} from '@/lib/numberToWords';

type DocumentType = 'recu_arbon' | 'recu_paiement' | 'contrat_vente' | 'fiche_technique';

function DocumentsContent() {
  const searchParams = useSearchParams();

  // Document state
  const [docType, setDocType] = useState<DocumentType>('recu_arbon');
  const [docNumber, setDocNumber] = useState('CRV-2026-0842');
  const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);

  // Dealership branch
  const [selectedBranch, setSelectedBranch] = useState<'alger' | 'jijel' | 'ouergla'>('alger');

  // Client info
  const [clientName, setClientName] = useState('كريم بلقاسم / Belkacem Karim');
  const [clientPhone, setClientPhone] = useState('0661 23 45 67');
  const [clientCin, setClientCin] = useState('110482914839');
  const [clientAddress, setClientAddress] = useState('الجزائر العاصمة / دالي براهيم');

  // Vehicle info
  const [carTitle, setCarTitle] = useState('Geely Coolray Battle 2026');
  const [vinNumber, setVinNumber] = useState('LB375429188492019');
  const [carColor, setCarColor] = useState('أبيض لؤلؤي / سقف أسود');

  // Financial amounts
  const [amountCentimes, setAmountCentimes] = useState(50); // 50 Million centimes = 500,000 DZD
  const [paymentMode, setPaymentMode] = useState<'especes' | 'cheque' | 'virement'>('especes');
  const [chequeRef, setChequeRef] = useState('');

  // Read query params on mount
  useEffect(() => {
    const qTitle = searchParams.get('carTitle');
    const qPrice = searchParams.get('price');
    if (qTitle) setCarTitle(decodeURIComponent(qTitle));
    if (qPrice) {
      const p = parseInt(qPrice, 10);
      if (!isNaN(p)) {
        // Default Arbon ~ 10-15% or 50M
        setAmountCentimes(Math.round(p * 0.15) || 50);
      }
    }
  }, [searchParams]);

  // Branch details
  const branchConfigs = {
    alger: {
      nameAr: 'صالة الجزائر العاصمة (المحمدية)',
      nameFr: 'Showroom Alger (Pins Maritimes)',
      address: 'شارع نصيب عبود، المحمدية (محاذاة SAFEX)، الجزائر العاصمة',
      phone: '0779 05 54 89 / 0557 05 38 14',
    },
    jijel: {
      nameAr: 'صالة جيجل (بوالرمل / ميناء جن جن)',
      nameFr: 'Showroom Jijel (Boulrimal)',
      address: 'المنطقة التجارية بوالرمل، الطاهير (محاذاة ميناء جن جن)، جيجل',
      phone: '0660 65 62 74 / 0554 15 41 63',
    },
    ouergla: {
      nameAr: 'صالة ورقلة (وسط المدينة)',
      nameFr: 'Showroom Ouargla (Centre Ville)',
      address: 'حي النصر (وسط المدينة بجانب البنك الوطني الجزائري)، ورقلة',
      phone: '0660 41 40 34 / 0661 46 67 27',
    },
  };

  const branch = branchConfigs[selectedBranch];
  const amountDzd = amountCentimes * 10000;
  const arabicWords = numberToArabicWordsDinar(amountDzd);
  const frenchWords = numberToFrenchWordsDinar(amountDzd);
  const centimesWords = centimesToArabicWords(amountCentimes);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20 text-right print:space-y-0 print:p-0">
      {/* Top Header - Hidden in Print */}
      <div className="border-b border-carvex-border/60 pb-6 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-carvex-cyan uppercase tracking-wider block">
              نظام إدارة وثائق الصالة الرسمي
            </span>
            <h1 className="text-3xl font-black text-white mt-1">
              مولد وصولات العربون وعقود السيارات (Documents du Showroom)
            </h1>
            <p className="text-xs sm:text-sm text-carvex-muted mt-1">
              طباعة فورية لوصولات العربون، إيصالات الدفع، البطاقات التقنية، وعقود البيع مطابقة للشروط القانونية لشركة CARVEX EXPORT.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="py-3 px-6 rounded-xl bg-carvex-cyan hover:bg-carvex-cyan-hover text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-carvex-cyan/20 transition-all self-start md:self-auto"
          >
            <Printer className="w-5 h-5" />
            <span>طباعة الوثيقة الرسمية / PDF</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 overflow-x-auto pt-6">
          <button
            onClick={() => setDocType('recu_arbon')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              docType === 'recu_arbon'
                ? 'bg-carvex-cyan text-black shadow-md'
                : 'bg-carvex-card text-slate-300 hover:bg-carvex-surface border border-carvex-border'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>وصل استلام عربون (Reçu d&apos;arbon)</span>
          </button>

          <button
            onClick={() => setDocType('recu_paiement')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              docType === 'recu_paiement'
                ? 'bg-carvex-cyan text-black shadow-md'
                : 'bg-carvex-card text-slate-300 hover:bg-carvex-surface border border-carvex-border'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>وصل استلام دفعة مالية (Reçu de paiement)</span>
          </button>

          <button
            onClick={() => setDocType('contrat_vente')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              docType === 'contrat_vente'
                ? 'bg-carvex-cyan text-black shadow-md'
                : 'bg-carvex-card text-slate-300 hover:bg-carvex-surface border border-carvex-border'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>عقد بيع وحجز سيارة (Contrat de vente)</span>
          </button>

          <button
            onClick={() => setDocType('fiche_technique')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              docType === 'fiche_technique'
                ? 'bg-carvex-cyan text-black shadow-md'
                : 'bg-carvex-card text-slate-300 hover:bg-carvex-surface border border-carvex-border'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>البطاقة التقنية (Fiche technique)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Editor (Left) & Live A4 Document (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Controls Sidebar - Hidden in Print */}
        <div className="lg:col-span-5 bg-carvex-card border border-carvex-border p-6 rounded-2xl space-y-5 print:hidden">
          <div className="flex items-center justify-between border-b border-carvex-border pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-carvex-cyan" />
              <span>بيانات المعاملة والزبون</span>
            </h3>
            <span className="text-[11px] text-carvex-muted">تحديث حي في المعاينة</span>
          </div>

          {/* Branch Picker */}
          <div>
            <label className="text-xs text-carvex-muted block mb-1 font-medium">فرع الصالة المُصدر للوثيقة:</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value as any)}
              className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
            >
              <option value="alger">الجزائر العاصمة (المحمدية / صافكس)</option>
              <option value="jijel">جيجل (بوالرمل / ميناء جن جن)</option>
              <option value="ouergla">ورقلة (حي النصر / وسط المدينة)</option>
            </select>
          </div>

          {/* Doc Number & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-carvex-muted block mb-1 font-medium">رقم الوصل المرجعي:</label>
              <input
                type="text"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
              />
            </div>
            <div>
              <label className="text-xs text-carvex-muted block mb-1 font-medium">التاريخ:</label>
              <input
                type="date"
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
              />
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3 pt-2 border-t border-carvex-border/60">
            <span className="text-xs font-bold text-carvex-cyan block">بيانات المشتري (Client):</span>
            <div>
              <label className="text-xs text-carvex-muted block mb-1">الاسم واللقب (Nom & Prénom):</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-carvex-muted block mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
              </div>
              <div>
                <label className="text-xs text-carvex-muted block mb-1">رقم ب.ت.و / CNI:</label>
                <input
                  type="text"
                  value={clientCin}
                  onChange={(e) => setClientCin(e.target.value)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-carvex-muted block mb-1">العنوان والولاية:</label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-3 pt-2 border-t border-carvex-border/60">
            <span className="text-xs font-bold text-carvex-cyan block">بيانات المركبة المحجوزة:</span>
            <div>
              <label className="text-xs text-carvex-muted block mb-1">طراز وموديل السيارة:</label>
              <input
                type="text"
                value={carTitle}
                onChange={(e) => setCarTitle(e.target.value)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-carvex-muted block mb-1">رقم الشاسيه (Châssis / VIN):</label>
                <input
                  type="text"
                  value={vinNumber}
                  onChange={(e) => setVinNumber(e.target.value)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-carvex-cyan"
                />
              </div>
              <div>
                <label className="text-xs text-carvex-muted block mb-1">اللون المختار:</label>
                <input
                  type="text"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
                />
              </div>
            </div>
          </div>

          {/* Amount & Payment Mode */}
          <div className="space-y-3 pt-2 border-t border-carvex-border/60">
            <span className="text-xs font-bold text-carvex-cyan block">المبلغ وطريقة التسديد:</span>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-carvex-muted">المبلغ المسلم (بالملايين سنتيم):</label>
                <span className="text-xs font-black text-carvex-cyan font-mono">{amountCentimes} مليون سنتيم</span>
              </div>
              <input
                type="number"
                min="1"
                step="1"
                value={amountCentimes}
                onChange={(e) => setAmountCentimes(Number(e.target.value) || 0)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-carvex-cyan"
              />
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                يعادل: {amountDzd.toLocaleString('fr-FR')} دينار جزائري (DA)
              </span>
            </div>

            <div>
              <label className="text-xs text-carvex-muted block mb-1">طريقة الدفع (Mode de paiement):</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as any)}
                className="w-full bg-carvex-surface border border-carvex-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-carvex-cyan"
              >
                <option value="especes">نقداً في الصندوق (Espèces)</option>
                <option value="cheque">شيك بنكي معتمد (Chèque de banque)</option>
                <option value="virement">تحويل بنكي رسمي (Virement bancaire)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live A4 Document Preview (Right) - Exactly formatted for High-Res Print */}
        <div className="lg:col-span-7 print:col-span-12">
          {/* Printable Container: Standard white paper document for official legal output */}
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-8 sm:p-12 border border-slate-300 font-sans print:border-none print:shadow-none print:p-0 print:rounded-none min-h-[850px] flex flex-col justify-between">
            {/* Document Header */}
            <div>
              <div className="flex items-start justify-between border-b-2 border-slate-800 pb-6 gap-6">
                {/* Logo & Slogan */}
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-20 bg-black rounded-xl p-1.5 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/logo.png"
                      alt="CARVEX EXPORT"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                      CARVEX EXPORT
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      SARL AU CAPITAL DE 10 000 000 DA
                    </p>
                    <p className="text-[10px] text-slate-500">
                      استيراد وتوزيع وتجارة السيارات الجديدة
                    </p>
                  </div>
                </div>

                {/* Dealership Legal Coordinates */}
                <div className="text-left text-[10px] text-slate-600 leading-tight space-y-0.5">
                  <p className="font-bold text-slate-800">SARL CARVEX EXPORT</p>
                  <p>RC: 16/00-0123456B24</p>
                  <p>NIF: 002416012345678</p>
                  <p>NIS: 002416012345678</p>
                  <p>Art. Imposition: 16041234567</p>
                  <p className="font-bold text-slate-900 pt-1">{branch.phone}</p>
                </div>
              </div>

              {/* Title & Metadata Banner */}
              <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {docType === 'recu_arbon' && "REÇU D'ARBON / وصل استلام عربون"}
                    {docType === 'recu_paiement' && 'REÇU DE PAIEMENT / وصل استلام دفعة'}
                    {docType === 'contrat_vente' && 'BON DE COMMANDE / عقد طلب وحجز سيارة'}
                    {docType === 'fiche_technique' && 'FICHE TECHNIQUE / البطاقة التقنية للمركبة'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {branch.nameFr} — {branch.nameAr}
                  </p>
                </div>

                <div className="text-left text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">N° Réf:</span>
                    <span className="font-bold font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {docNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-bold font-mono text-slate-900">{docDate}</span>
                  </div>
                </div>
              </div>

              {/* Client & Transaction Details Table */}
              <div className="py-6 space-y-6">
                {/* 2-column details block */}
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      بيانات المشتري (Client)
                    </p>
                    <p>
                      <strong className="text-slate-800">الاسم واللقب:</strong> {clientName}
                    </p>
                    <p>
                      <strong className="text-slate-800">الهاتف:</strong>{' '}
                      <span className="font-mono">{clientPhone}</span>
                    </p>
                    <p>
                      <strong className="text-slate-800">رقم CNI:</strong>{' '}
                      <span className="font-mono">{clientCin}</span>
                    </p>
                    <p>
                      <strong className="text-slate-800">العنوان:</strong> {clientAddress}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      بيانات المركبة (Véhicule)
                    </p>
                    <p>
                      <strong className="text-slate-800">الموديل:</strong> {carTitle}
                    </p>
                    <p>
                      <strong className="text-slate-800">رقم الهيكل (VIN):</strong>{' '}
                      <span className="font-mono">{vinNumber}</span>
                    </p>
                    <p>
                      <strong className="text-slate-800">اللون:</strong> {carColor}
                    </p>
                    <p>
                      <strong className="text-slate-800">حالة العداد:</strong> 000,000 كلم (جديدة 2026)
                    </p>
                  </div>
                </div>

                {/* Amount Highlight Box */}
                <div className="p-5 rounded-xl border-2 border-slate-900 bg-slate-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-600 block">
                      المبلغ المستلم (Montant Perçu)
                    </span>
                    <div className="text-3xl font-black text-slate-950 font-mono tracking-tight mt-0.5">
                      {amountCentimes} مليون سنتيم
                    </div>
                    <div className="text-xs font-mono text-slate-700 mt-0.5">
                      ({amountDzd.toLocaleString('fr-FR')} DZD)
                    </div>
                  </div>

                  <div className="text-left text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      طريقة التسديد (Mode de règlement)
                    </span>
                    <span className="font-bold text-slate-900 inline-block bg-white px-2.5 py-1 rounded border border-slate-300">
                      {paymentMode === 'especes' && 'نقداً في الصندوق (Espèces)'}
                      {paymentMode === 'cheque' && 'شيك بنكي معتمد (Chèque)'}
                      {paymentMode === 'virement' && 'تحويل بنكي (Virement)'}
                    </span>
                  </div>
                </div>

                {/* Montant en toutes lettres (Arabic & French) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">
                      المبلغ بالأحرف باللغة العربية (Montant en toutes lettres - Arabe):
                    </span>
                    <p className="font-bold text-slate-900 font-sans mt-0.5 text-sm">
                      {arabicWords}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      أي ما قيمته: <strong className="text-slate-900">{centimesWords}</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">
                      Montant en toutes lettres (Français):
                    </span>
                    <p className="font-medium text-slate-800 italic mt-0.5 font-sans">
                      Arrêté le présent reçu à la somme de: {frenchWords}.
                    </p>
                  </div>
                </div>

                {/* Legal notes */}
                <div className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
                  <p>
                    * يُعتبر هذا الوصل إثباتاً رسمياً لعملية الحجز أو استلام الدفعة المحددة أعلاه، وهو خاضع لبنود العقد المبرم بين الطرفين وتعهّد شركة CARVEX EXPORT باستيراد وتخليص وتسليم المركبة المعنية جاهزة للسير مع كامل وثائقها القانونية.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Footer: Signatures & Stamp */}
            <div className="pt-8 border-t-2 border-slate-800 mt-6">
              <div className="grid grid-cols-2 gap-8 text-xs text-center">
                <div className="space-y-16">
                  <p className="font-bold text-slate-800">
                    توقيع المشتري (Signature du Client)
                  </p>
                  <p className="text-[10px] text-slate-400">« قرئ وصودق عليه »</p>
                </div>

                <div className="space-y-8">
                  <p className="font-bold text-slate-800">
                    ختم وإمضاء شركة CARVEX EXPORT
                  </p>
                  <div className="inline-block p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-[10px]">
                    ختم الصالة الرسمي (Cachet & Signature)
                  </div>
                </div>
              </div>

              <div className="text-center text-[9px] text-slate-400 pt-8 border-t border-slate-200 mt-6">
                SARL CARVEX EXPORT — {branch.address} — هاتف: {branch.phone} — www.carvexexport.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-white">جاري تحميل نظام الوثائق...</div>}>
      <DocumentsContent />
    </Suspense>
  );
}
