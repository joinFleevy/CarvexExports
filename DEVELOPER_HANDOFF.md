# 🚀 دليل تسليم المشروع للمطور (Developer Handoff Dossier)
### كل ما يحتاجه المطور والشريك للبدء الفوري وإكمال البرمجة بدون أي نواقص

> **مرحباً بك في مشروع CARVEX EXPORT!**  
> هذا الدليل يختصر عليك كل ساعات البحث والاجتماعات؛ قاعدة البيانات جاهزة وشغالة على السيرفر، الجداول معبأة بالسيارات الحقيقية والصالات، والأصول واللوغو والمعادلات الرياضية موثقة بالكامل هنا.

---

## 📌 الفهرس السريع
1. **روابط السيرفرات وبيانات الدخول الحساسة (Credentials & URLs)**
2. **مستودع الكود وبدء العمل (Git & Setup)**
3. **قاعدة البيانات ومجموعات PocketBase الجاهزة (Live Database)**
4. **الصفحات والميزات المطلوب برمجتها في الواجهة (Frontend Roadmap)**
5. **معادلات حاسبة الجمارك الجزائرية الجاهزة للكود (Customs Engine)**
6. **الهوية البصرية والألوان والأصول (Design Tokens & Assets)**
7. **ملف المتغيرات البيئية المقترح (`.env.local`)**

---

## 1. روابط السيرفرات وبيانات الدخول الحساسة (Credentials & URLs)

| الخدمة | الرابط (URL) | بيانات الدخول / الصلاحيات |
| :--- | :--- | :--- |
| **سيرفر PocketBase المباشر** | `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io` | متاح للاستعلامات العامة فوراً |
| **لوحة تحكم السيرفر (Admin UI)** | `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/_/` | **الإيميل:** `namaagrowthagency@gmail.com`<br>**كلمة المرور:** `fDTHzV3HhhiaTFy@` |
| **مستودع الكود (GitHub)** | `https://github.com/joinFleevy/CarvexExports.git` | الفرع الرئيسي: `main` |
| **تخزين الوسائط (Cloudflare R2)** | `https://pub-36fd74211d094e5b8986e7abc18d714c.r2.dev` | سعة تخزين الصور العامة |
| **الخريطة التفاعلية المعمارية** | افتح الملف محلياً: `carvex-sitemap.html` | رسم معماري تفاعلي لكامل النظام |

---

## 2. مستودع الكود وبدء العمل (Git & Scaffolding)

تم ربط المشروع وتهيئة Git محلياً؛ للبدء في بناء تطبيق **Next.js 15 (App Router)** في نفس المجلد:

```bash
# 1. سحب المشروع
git clone https://github.com/joinFleevy/CarvexExports.git
cd CarvexExports

# 2. تثبيت Next.js 15 مع Tailwind CSS ومكتبة PocketBase
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 3. تثبيت حزمة PocketBase و Lucide Icons
npm install pocketbase lucide-react clsx tailwind-merge
```

---

## 3. قاعدة البيانات ومجموعات PocketBase الجاهزة (Live Database)

قاعدة البيانات **ليست فارغة**؛ تم إنشاؤها وشحنها ببيانات حقيقية عبر سكربت `setup_pocketbase.mjs`، وكل الجداول التالية جاهزة مع صلاحيات القراءة العامة (`Public Read`):

### أ. كيفية استدعاء البيانات في الكود (TypeScript):
```typescript
import PocketBase from 'pocketbase';

export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io'
);

// مثال: جلب كل السيارات مع الصالة التابعة لها وصورها:
export async function getVehicles() {
  return await pb.collection('vehicles').getFullList({
    expand: 'branch',
    sort: '-created',
  });
}

// بناء رابط الصورة الكامل:
export function getCarImageUrl(record: any, fileName: string) {
  return `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${fileName}`;
}
```

### ب. الجداول الموجودة في PocketBase حالياً:
1. **`branches` (الفروع):** 
   * يحتوي على 3 صالات فعلية:
     * **الجزائر العاصمة (المحمدية):** الهواتف `0779055489` / `0557053814`
     * **جيجل (بوالرمل قرب ميناء جن جن):** الهواتف `0660656274` / `0554154163`
     * **ورقلة (وسط المدينة):** الهواتف `0660414034` / `0661466727`
     * **الإدارة العامة:** `0770727007`
2. **`vehicles` (السيارات):**
   * يحتوي على 5 سيارات حقيقية لعام 2026 محملة بأسعارها وصورها وبوستراتها:
     * `Geely Coolray Battle 2026` (399M سنتيم)
     * `Geely Coolray Full 2026` (388M سنتيم)
     * `Geely Coolray Manuelle 2026` (307M سنتيم)
     * `MG5 Global (MX) 2026` (268M سنتيم)
     * `Jetour Dashing Luxury 2026` (415M سنتيم)
3. **`shipments` (الشحنات والحاويات):** لتسجيل أرقام الحاويات، بواخر الملاحة (COSCO, CMA CGM)، وموانئ الوصول.
4. **`orders` (طلبات وتتبع الزبائن):**
   * مربوط برقم هاتف العميل ورمز الـ PIN السري.
   * **الأمان:** محمي بقاعدة `@request.auth.id != "" || (client_phone = @request.headers.x_client_phone && client_pin = @request.headers.x_client_pin)` حتى لا يرى أي شخص غريب بيانات الزبائن.
5. **`documents` (الوثائق الرسمية):**
   * يحتوي على نوع الوثيقة (`recu_arbon`, `recu_paiement`, `bon_commande`) وملف الـ PDF المحمي.

---

## 4. الصفحات والميزات المطلوب برمجتها في الواجهة (Frontend Roadmap)

الموقع يجب أن يكون **ثنائي اللغة (عربي / فرنسي)** مع دعم **RTL** الافتراضي، ويركز على تجربة الهاتف المحمول (Mobile-First):

### 1. الصفحة الرئيسية (`app/page.tsx`):
* **Hero Section:** خلفية داكنة فخمة للسيارات مع الشعار الرسمي CARVEX وسلوجان: *"شريكك العالمي للسيارات"*.
* **شريط الماركات العالمية (Brand Logos):** شريط متحرك يحمل شعارات (*Geely, Jetour, Chery, MG, Changan, Kia, Audi*).
* **أداة البحث والفلترة السريعة:** اختيار الماركة + الحالة (حاضرة بالمعرض / في البحر / بالطلب) + الصالة (العاصمة / جيجل / ورقلة).
* **عرض سيارات 2026 المميزة (Featured Stock).**
* **خطوات الاستيراد الأربعة الشفافة (How It Works):**
  1. *العقد والعربون* ➔ 2. *شحن الحاوية وإصدار بوليصة الباخرة (BL)* ➔ 3. *الوصول لميناء جن جن أو العاصمة والتخليص* ➔ 4. *استلام المفاتيح والملف الكامل*.
* **معاينة الصالات الثلاث مع روابط خرائط غوغل وأزرار الاتصال المباشر.**

### 2. كتالوج المعرض المتكامل (`app/inventory/page.tsx`):
* شبكة كروت سيارات متجاوبة (Responsive Grid).
* فلاتر جانبية / علوية: تصفية حسب السعر، ناقل الحركة (أوتوماتيك / يدوي)، والصالة المتواجدة بها.
* بادجات حالة السيارة:
  * 🟢 `متوفرة للتسليم الفوري`
  * 🚢 `في البحر قادمة`
  * 🇨🇳 `استيراد بالطلب`

### 3. صفحة تفاصيل السيارة (`app/inventory/[id]/page.tsx`):
* معرض صور كلاسيكي متعدد الزوايا (عالي الدقة وسريع).
* المواصفات التقنية: سنة الصنع 2026، المحرك (1.5L Turbo)، القوة، الوقود، واللون.
* السعر الصافي واصل للميناء + السعر الإجمالي شامل كل المصاريف.
* **زر تحميل البطاقة التقنية (Fiche Technique PDF).**
* **زر [طلب حجز أو استفسار] ➔ يفتح نافذة لاختيار الفرع (Modal):**
  * ينقل الزبون مباشرة لواتساب الفرع المختار برسالة جاهزة:
    `https://wa.me/213779055489?text=السلام عليكم، أنا مهتم بسيارة Geely Coolray Full 2026 المعروضة في موقعكم`

### 4. حاسبة الجمارك التفاعلية (`app/calculator/page.tsx`):
* أداة تفاعلية يدخل فيها الزبون:
  1. سعر السيارة بالدينار (أو يختار سيارة من الكتالوج).
  2. نوع المحرك (بنزين $\le 1.8L$، أو كهربائي، أو هجين).
  3. نوع الملف: *(رخصة مجاهدين معفاة)* أو *(استيراد عادي للمواطنين قانون أقل من 3 سنوات)*.
* تُظهر الحاسبة جدول التكاليف التقديري فوراً + زر: **[طلب عرض سعر رسمي عبر واتساب]**.

### 5. بوابة تتبع الشحنة والطلب (`app/track/page.tsx`):
* يدخل الزبون: **رقم الهاتف + رقم الطلب / رمز الـ PIN**.
* يظهر له شريط تقدم مسار سيارته في المراحل الأربعة + رقم الحاوية واسم الباخرة مع رابط تتبع السفينة المباشر.

### 6. صفحة الصالات والفروع (`app/showrooms/page.tsx`):
* 3 كروت صالات تتضمن:
  * العنوان الدقيق.
  * أرقام المصلحة التجارية والإدارة.
  * زر **[فتح في خرائط غوغل]**.
  * زر **[محادثة واتساب مباشرة]**.

---

## 5. معادلات حاسبة الجمارك الجزائرية (Customs Engine Math)

هذه هي المعادلة البرمجية المعتمدة قانونياً وفق **المرسوم التنفيذي رقم 23-74** و **المادة 110 من قانون المالية**:

```typescript
// utils/customsCalculator.ts

export interface CalculationInput {
  fobPriceCentimes: number; // السعر الصافي واصل للميناء بالسنتيم (مثلاً 280)
  engineType: 'essence' | 'hybrid' | 'electric';
  displacementCc: number;   // سعة المحرك (مثلاً 1498)
  regime: 'licence_moudjahidine' | 'individual_less_3_years';
  needBuyLicence?: boolean; // هل يحتاج شراء رخصة مجاهدين من السوق؟
}

export function calculateCustomsCost(input: CalculationInput) {
  const { fobPriceCentimes, engineType, displacementCc, regime, needBuyLicence } = input;
  
  // مصاريف ثابتة في الميناء الجزائري (إنزال + عبور transitaire + فحص المناجم)
  const fixedPortAndTransitCentimes = 13; // 13 مليون سنتيم
  let customsTaxPercentage = 0;
  let licenceMarketCostCentimes = 0;

  if (regime === 'licence_moudjahidine') {
    // إعفاء 100% من الرسم الجمركي ورسم TVA لمحركات البنزين حتى 2000cc
    customsTaxPercentage = 0.01; // رسوم إدارية وشكليات طوابع D10 فقط (~1%)
    if (needBuyLicence) {
      licenceMarketCostCentimes = 65; // متوسط سعر كراء/شراء الرخصة بالسوق (65 مليون)
    }
  } else {
    // استيراد عادي للمواطنين (قانون أقل من 3 سنوات)
    // الضريبة الكاملة قبل التخفيض = DD(30%) + TCS(2%) + TVA(19% x 1.32) = 57.08%
    const baseStandardRate = 0.5708;

    if (engineType === 'electric') {
      // تخفيض 80% من إجمالي الضرائب
      customsTaxPercentage = baseStandardRate * 0.20; // 11.4%
    } else if (displacementCc <= 1800) {
      // تخفيض 50% لمحركات البنزين والهجين <= 1.8L (الفئة الأكثر شيوعاً)
      customsTaxPercentage = baseStandardRate * 0.50; // 28.54%
    } else {
      // تخفيض 20% فقط للمحركات الكبيرة > 1.8L
      customsTaxPercentage = baseStandardRate * 0.80; // 45.66%
    }
  }

  const estimatedCustomsTaxes = Math.round(fobPriceCentimes * customsTaxPercentage);
  const totalEstimatedCost = fobPriceCentimes + estimatedCustomsTaxes + fixedPortAndTransitCentimes + licenceMarketCostCentimes;

  return {
    fobPriceCentimes,
    estimatedCustomsTaxes,
    fixedPortAndTransitCentimes,
    licenceMarketCostCentimes,
    totalEstimatedCost,
  };
}
```

---

## 6. الهوية البصرية والألوان والأصول (Design Tokens & Assets)

### الألوان الأساسية (Tailwind / CSS Variables):
* **Dark Onyx (الخلفية):** `#0A0D14` أو `#0F131C`
* **Electric Cyan (اللون الأساسي المتفاعل):** `#00A2E8` (لون خط CARVEX وشعار السيارة)
* **Crimson Red (لون الأسعار والتمييز):** `#E50914` (لون الخط الفاصل في اللوغو وبادجات العروض)
* **Text Primary:** `#FFFFFF`
* **Text Muted:** `#94A3B8` (Slate-400)
* **Card Surface:** `rgba(18, 22, 34, 0.75)` مع `backdrop-blur-md` و `border border-white/10`.

### الأصول الجاهزة في المشروع:
* **الشعار الرسمي عالي الدقة:** موجود محلياً في `assets/carvex_logo_official.jpg`.
* **صور سيارات حقيقية:** موجودة في مجلد `assets/` وتم رفعها أيضاً على سيرفر PocketBase.

---

## 7. ملف المتغيرات البيئية المقترح (`.env.local`)

أنشئ ملف `.env.local` في جذر مشروع الـ Next.js وضع فيه:

```env
# PocketBase Backend
NEXT_PUBLIC_POCKETBASE_URL=http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io

# Cloudflare R2 Public CDN
NEXT_PUBLIC_R2_URL=https://pub-36fd74211d094e5b8986e7abc18d714c.r2.dev

# Official Contact Numbers
NEXT_PUBLIC_PHONE_ADMIN=0770727007
NEXT_PUBLIC_PHONE_ALGER=0779055489
NEXT_PUBLIC_PHONE_JIJEL=0660656274
NEXT_PUBLIC_PHONE_OUERGLA=0660414034

# Site URL
NEXT_PUBLIC_SITE_URL=https://carvexexport.com
```

---

## 8. عناوين الصالات وروابط خرائط غوغل الجاهزة:

* **صالة الجزائر العاصمة (المحمدية):**
  * شارع نسيب عبود، المحمدية (قرب قصر المعارض SAFEX).
  * رابط خرائط غوغل: `https://www.google.com/maps/search/?api=1&query=Rue+Nacib+Abboud+Mohammadia+Alger`
* **صالة جيجل (بوالرمل):**
  * بوالرمل، بلدية الطاهير، ولاية جيجل (بمحاذاة ميناء جن جن).
  * رابط خرائط غوغل: `https://www.google.com/maps/search/?api=1&query=Boulrimal+Taher+Jijel`
* **صالة ورقلة (وسط المدينة):**
  * حي النصر / وسط المدينة، ولاية ورقلة.
  * رابط خرائط غوغل: `https://www.google.com/maps/search/?api=1&query=Cite+En+Nasr+Ouargla`

---

> 💡 **ملاحظة ختامية للمطور:**  
> تم تسجيل كافة الوثائق والملفات في مستودع Git على فرع `main`. يمكنك البدء فوراً في إعداد الواجهة وسحب بيانات السيارات عبر `pb.collection('vehicles').getFullList({ expand: 'branch' })` وستجد كل شيء يعمل بسلاسة وسرعة فائقة!
