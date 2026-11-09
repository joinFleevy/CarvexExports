# 🚀 CARVEX EXPORT — Developer Handover & Implementation Guide
### دليل تسليم المشروع للمطور (كل ما يحتاجه شريكك لمتابعة وبرمجة الموقع)

---

## 📌 1. نظرة عامة سريعة وروابط الوصول المباشر (Quick Start)

* **مستودع الكود (GitHub Repo):**
  👉 `https://github.com/joinFleevy/CarvexExports.git` (الفرع الرئيسي: `main`)
* **سيرفر الباك إند المباشر (PocketBase URL):**
  👉 `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io`
* **لوحة تحكم المشرف (Admin UI):**
  👉 `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/_/`
* **بيانات حساب المشرف (Superuser Credentials):**
  * **Email:** `namaagrowthagency@gmail.com`
  * **Password:** `fDTHzV3HhhiaTFy@`
* **مستودع التخزين السحابي (Cloudflare R2 Dev Bucket):**
  👉 `https://pub-36fd74211d094e5b8986e7abc18d714c.r2.dev`
* **خريطة الموقع والمعمارية التفاعلية (Interactive Sitemap HTML):**
  👉 ملف `carvex-sitemap.html` (افتحه في المتصفح لرؤية الربط البصري الكامل).

---

## 🛠️ 2. البنية التقنية المطلوبة (Tech Stack)

* **Frontend Framework:** `Next.js 15` (App Router) مع TypeScript.
* **Styling & Components:** `Tailwind CSS` + `shadcn/ui` + `Lucide Icons`.
* **Backend SDK:** المكتبة الرسمية `pocketbase` (`npm install pocketbase`).
* **Animations:** `framer-motion` للتنقلات وسلايدر الماركات.
* **PDF Engine:** `@react-pdf/renderer` أو `html2pdf.js` لتوليد وصولات العربون والبطاقات التقنية.

---

## 🗄️ 3. جداول قاعدة البيانات والـ APIs الجاهزة (PocketBase Database)

قاعدة البيانات **منشأة ومزودة بالبيانات والصور مسبقاً**. لا داعي لإنشاء أي جدول يدوي؛ كل شيء جاهز للاستهلاك فوراً:

### أ. كيفية استدعاء البيانات في Next.js:
```typescript
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io');

// للحصول على رابط الصورة من PocketBase:
export function getCarImageUrl(record: any, fileName: string) {
  return `${pb.baseUrl}/api/files/vehicles/${record.id}/${fileName}`;
}
```

### ب. تفاصيل الجداول المنشأة والقواعد الأمنية:

| الجدول (Collection) | نوع الوصول والـ API Rules | الحقول الأساسية (Fields) |
| :--- | :--- | :--- |
| **`vehicles`** | **عام (Public Read)** — لا يتطلب أي توكن لقراءة السيارات. | `title`, `brand`, `model`, `year`, `mileage_status` (zero_km / under_3_years), `status` (in_stock, in_transit, on_order), `price_total_dzd_centimes`, `price_fob_dzd_centimes`, `engine_type`, `engine_displacement_cc`, `transmission`, `color`, `images` (مصفوفة صور), `branch` (علاقة مع الصالة). |
| **`branches`** | **عام (Public Read)** | `code` (alger, jijel, ouergla), `name_ar`, `name_fr`, `phone_commercial_1`, `phone_commercial_2`, `phone_whatsapp`, `address_text`, `is_active`. |
| **`shipments`** | **عام (Public Read)** | `container_number`, `shipping_company`, `vessel_name`, `departure_port`, `arrival_port`, `departure_date`, `estimated_arrival`, `current_status`. |
| **`orders`** | **محمي (Protected Read)** — يُقرأ فقط بالهاتف والـ PIN الخاص بالزبون. | `order_number`, `client_name`, `client_phone`, `client_pin`, `vehicle`, `shipment`, `selected_branch`, `customs_regime`, `agreed_price_centimes`, `deposit_paid_centimes`, `current_step` (1 إلى 4). |
| **`documents`** | **محمي ومقفل (Staff / PIN only)** | `order`, `doc_type` (recu_arbon, bon_commande), `doc_number`, `amount_numeric`, `amount_in_words`, `pdf_file`. |

---

## 🗺️ 4. صفحات الموقع ومواصفات كل صفحة (Pages & Routing Specs)

### 1. الصفحة الرئيسية (`app/page.tsx`):
* **الهيدر واللوغو:** شعار Carvex الرسمي (الملف: `assets/carvex_logo_official.jpg`).
* **الـ Hero Section:** عنوان تسويقي قوي: *"استيراد وبيع سيارات أصلية بجودة عالية مباشرة من المصدر إلى الجزائر"*.
* **شريط الماركات المتحرك (Brand Carousel):** شعارات الماركات المستوردة: `Geely`, `Jetour`, `Chery`, `MG`, `Kia`, `Changan`.
* **الفلتر السريع (Quick Filter):** اختيار الماركة + الحالة (متوفرة بالصالة 🟢 / في البحر 🚢 / بالطلب 🇨🇳) + الصالة (العاصمة، جيجل، ورقلة).
* **قسم السيارات المميزة (Featured Vehicles):** عرض الكروت الحاضرة بالمعرض مع بادج "شاملة كل المصاريف".
* **مخطط الخطوات الأربعة للشراء (How It Works):** 1. الطلب والعقد ➔ 2. الشحن بالباخرة ➔ 3. الجمركة بالميناء ➔ 4. التسليم بالصالة.

### 2. كتالوج السيارات (`app/inventory/page.tsx`):
* شبكة كروت سيارات متجاوبة (Responsive Grid).
* فلاتر جانبية: الميزانية، نوع ناقل الحركة، سعة المحرك، وحالة التوفر.
* جلب مباشر من PocketBase:
  ```typescript
  const vehicles = await pb.collection('vehicles').getFullList({
    filter: 'status != "sold"',
    expand: 'branch',
    sort: '-created'
  });
  ```

### 3. صفحة تفاصيل السيارة (`app/inventory/[id]/page.tsx`):
* **معرض صور كلاسيكي متعدد الزوايا:** صور حقيقية (خارجي، داخلي، مقصورة القيادة، المحرك).
* **جدول المواصفات التقنية:** المحرك، سنة الصنع، الوقود، واللون.
* **السعر المرجعي الشفاف:** إظهار السعر بالمليون سنتيم (مثال: `388M` = 388 مليون سنتيم).
* **زر تحميل البطاقة التقنية:** زر فوري لتحميل مواصفات السيارة في ملف PDF رسمي.
* **نافذة اختيار الصالة وواتساب (Branch WhatsApp Drawer):**
  عند الضغط على "طلب استفسار / حجز"، يفتح Drawer لاختيار الفرع المفضل للتواصل:
  * 📍 *صالة العاصمة (المحمدية):* واتساب `+213779055489`
  * 📍 *صالة جيجل (بوالرمل):* واتساب `+213660656274`
  * 📍 *صالة ورقلة (وسط المدينة):* واتساب `+213660414034`
  * 🏢 *الإدارة العامة:* واتساب `+213770727007`

### 4. حاسبة الجمارك التفاعلية (`app/calculator/page.tsx`):
* أداة تفاعلية بحسابات آنية بالدينار والسنتيم (الكود الرياضي مفصل في القسم التالي).
* تمكن المشتري من المقارنة الفورية بين: **الشراء برخصة المجاهدين** وبين **الاستيراد العادي للأفراد (قانون أقل من 3 سنوات)**.
* زر في نهاية الحاسبة: *"احصل على عرض سعر رسمي عبر واتساب"*.

### 5. بوابة تتبع الشحنة والطلب (`app/track/page.tsx`):
* **بدون تسجيل حساب (No Passwords):** حقلان فقط: **رقم الهاتف + رقم الطلب / رمز الـ PIN السري**.
* التحقق من الطلب وعرض Stepper لمراحل السيارة الأربعة مع رقم الحاوية واسم الباخرة ورابط تتبع الملاحة البحرية.

### 6. صفحة الصالات والفروع (`app/showrooms/page.tsx`):
* بطاقات الفروع الثلاثة متضمنة أرقام الهواتف، ومواعيد العمل، وروابط خرائط غوغل المباشرة:
  * **العاصمة:** `https://www.google.com/maps/search/?api=1&query=Rue+Nacib+Abboud+Mohammadia+Alger`
  * **جيجل:** `https://www.google.com/maps/search/?api=1&query=Boulrimal+Taher+Jijel`
  * **ورقلة:** `https://www.google.com/maps/search/?api=1&query=Cite+En+Nasr+Ouargla`

---

## 🧮 5. خوارزمية حساب الجمارك الجزائرية (Customs Calculator Code)

جاهزة للنسخ المباشر في ملف مكون الحاسبة:

```typescript
// utils/customsCalculator.ts
export interface CalculationInput {
  carFobPriceCentimes: number; // السعر واصل للميناء بالسنتيم (مثلاً: 280)
  engineDisplacementCc: number; // سعة المحرك (مثلاً: 1498)
  fuelType: 'essence' | 'hybrid' | 'electric';
  regime: 'licence_moudjahidine' | 'individual_under_3_years';
  needsLicensePurchase?: boolean; // هل يحتاج لشراء رخصة مجاهدين من السوق
}

export function calculateCarCost(input: CalculationInput) {
  const { carFobPriceCentimes, engineDisplacementCc, fuelType, regime, needsLicensePurchase } = input;
  
  // المصاريف الثابتة للميناء والعبور والإنزال في ميناء جن جن أو العاصمة: ~13 مليون سنتيم
  const fixedPortAndTransit = 13;
  let customsTaxPercentage = 0;
  let licenseCost = 0;

  if (regime === 'licence_moudjahidine') {
    // إعفاء 100% من الرسم الجمركي و TVA
    customsTaxPercentage = 0.01; // رسوم إدارية وشكليات فقط
    if (needsLicensePurchase) {
      licenseCost = 65; // متوسط سعر كراء رخصة المجاهدين بالسوق الجزائري
    }
  } else {
    // جمركة عادية وفق المرسوم 23-74 وقانون المالية المادة 110:
    const baseTotalTax = 0.5708; // 30% DD + 2% TCS + 25.08% TVA

    if (fuelType === 'electric') {
      customsTaxPercentage = baseTotalTax * 0.20; // تخفيض 80%
    } else if (engineDisplacementCc <= 1800) {
      customsTaxPercentage = baseTotalTax * 0.50; // تخفيض 50% (فئة معظم سيارات الصين)
    } else {
      customsTaxPercentage = baseTotalTax * 0.80; // تخفيض 20%
    }
  }

  const estimatedCustoms = Math.round(carFobPriceCentimes * customsTaxPercentage);
  const totalCost = carFobPriceCentimes + estimatedCustoms + fixedPortAndTransit + licenseCost;

  return {
    fobPrice: carFobPriceCentimes,
    customsDuty: estimatedCustoms,
    portAndTransitFees: fixedPortAndTransit,
    licenseCost: licenseCost,
    totalEstimatedCost: totalCost,
  };
}
```

---

## 🎨 6. نظام الهوية البصرية والألوان (Design System Tokens)

* **الوضع الداكن الفخم (Dark Luxury Automotive):**
  * `Background Primary:` `#0A0D14` (Dark Onyx)
  * `Surface Card:` `#121622` (مع حواف `border-white/10`)
  * `Primary Accent (Cyan):` `#00A2E8` (مطابق للون لوغو Carvex)
  * `Secondary Accent (Crimson):` `#E50914` (للأسعار الحصرية وبادجات الخصم)
  * `Text Main:` `#FFFFFF`
  * `Text Muted:` `#94A3B8`
* **الخطوط (Fonts):**
  * **العربية:** `Readex Pro` أو `Cairo` (من Google Fonts).
  * **الإنجليزية:** `Outfit` أو `Plus Jakarta Sans`.

---

## 💬 7. دالة توليد روابط واتساب المباشرة (WhatsApp Deep Link Helper)

```typescript
// utils/whatsapp.ts
export function generateWhatsAppLink(branchPhone: string, carTitle?: string) {
  const cleanPhone = branchPhone.replace(/[^0-9]/g, '');
  const message = carTitle 
    ? `السلام عليكم، أنا مهتم بسيارة [${carTitle}] المعروضة في موقع Carvex Export وأرغب في معرفة تفاصيل الحجز.`
    : `السلام عليكم، أرغب في الاستفسار عن استيراد السيارات المتوفرة لدى Carvex Export.`;
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
```

---

## 📋 8. قائمة المهام القادمة للمطور (Developer Next TODOs)

- [ ] استنساخ المستودع: `git clone https://github.com/joinFleevy/CarvexExports.git`
- [ ] تهيئة مشروع Next.js: `npx create-next-app@latest . --typescript --tailwind --app --eslint`
- [ ] تثبيت حزم: `npm install pocketbase lucide-react clsx tailwind-merge`
- [ ] بناء مكونات الـ Layout والهيدر المتجاوب بشعار Carvex.
- [ ] بناء صفحة الكتالوج وربطها مع `pb.collection('vehicles').getFullList()`.
- [ ] بناء صفحة الحاسبة الجمركية باستخدام دالة `calculateCarCost`.
- [ ] بناء واجهة تتبع الطلبات بالـ PIN.
- [ ] رفع التعديلات بـ Git وتفعيل النشر.
