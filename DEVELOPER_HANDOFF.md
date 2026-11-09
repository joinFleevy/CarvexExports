# 🚀 ملف تسليم المشروع للشريك والمطور (Developer Handoff Dossier)
### CARVEX EXPORT — الدليل التقني الشامل لإكمال برمجة المنصة الرقمية

---

## 📌 إلى الزميل المطور (Quick Start Summary)
هذا الملف يحتوي على **كل ما تحتاجه للبدء فوراً في إكمال وبرمجة المشروع**:
* سيرفر **PocketBase شغال ومعد بالكامل** بقواعد البيانات والصور والأسعار الحقيقية.
* مستودع **GitHub مربوط ومجهز**.
* خوارزميات **حساب الجمارك والدفعات المالية** مكتوبة بكود جاهز للنسخ.
* بنية الصفحات، روابط الـ API، أرقام الفروع، وروابط خرائط غوغل.

---

## 1. الروابط الأساسية وحسابات الوصول (Credentials & Access)

| الخدمة / المورد | الرابط أو المسار | بيانات الدخول / الملاحظات |
| :--- | :--- | :--- |
| **مستودع GitHub** | `https://github.com/joinFleevy/CarvexExports.git` | الفرع الرئيسي: `main` (تم عمل commit تأسيسي). |
| **سيرفر PocketBase Live** | `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io` | شغال ومفعل عليه الـ API العام. |
| **لوحة تحكم PocketBase (Admin)** | `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/_/` | **الإيميل:** `namaagrowthagency@gmail.com`<br>**كلمة المرور:** `fDTHzV3HhhiaTFy@` |
| **مستودع الصور R2 (Dev URL)** | `https://pub-36fd74211d094e5b8986e7abc18d714c.r2.dev` | متصل بسيرفر التخزين. |
| **مجلد الأصول المحلية واللوغو** | `./assets/` | يضم اللوغو الرسمي عالي الدقة: `assets/carvex_logo_official.jpg` وصور البوسترات. |
| **بوت تيليغرام للمبيعات** | `@CarvexExports_bot` | **Token:** `9106570417:AAFZJAYjg-O4FQdCOfdm6loLwUsQSFjFDt0`<br>**Admin ID:** `8209658134` (Hichem Djouadi) |
| **خريطة الموقع التفاعلية (Archify)** | `./carvex-sitemap.html` | ملف HTML تفاعلي يفتح بالمتصفح يوضح معمارية النظام ومسار الزوار. |

---

## 2. الواجهة البرمجية وقاعدة البيانات (PocketBase API Endpoints)

تم إنشاء وتعبئة قاعدة البيانات بالكامل. يمكنك طلب البيانات في الواجهة الأمامية دون الحاجة لأي مفاتيح سرية (Public Read):

### أ. رابط جلب السيارات مع بيانات الصالة التابعة لها:
```http
GET http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/api/collections/vehicles/records?expand=branch
```

### ب. رابط جلب الفروع وأرقام هواتفها وعناوينها:
```http
GET http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/api/collections/branches/records
```

### ج. رابط استعراض صور السيارات المرفوعة:
```http
http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/api/files/vehicles/<RECORD_ID>/<IMAGE_FILENAME>
```

### د. كيفية الربط في كود Next.js / React:
```typescript
// lib/pocketbase.ts
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io');

// جلب السيارات المتوفرة بالمعرض فوراً:
export async function getInStockVehicles() {
  return await pb.collection('vehicles').getFullList({
    filter: 'status = "in_stock"',
    expand: 'branch',
    sort: '-created',
  });
}
```

---

## 3. السيارات والأسعار المعبأة حالياً في السيرفر (Seed Data)

السيارات التالية مدخلة بالفعل في قاعدة البيانات ومرفوعة صورها الرسمية:
1. **Geely Coolray Battle 2026** — السعر: **399 مليون سنتيم** (أوتوماتيك / صالة العاصمة).
2. **Geely Coolray Full 2026** — السعر: **388 مليون سنتيم** (أوتوماتيك / صالة جيجل).
3. **Geely Coolray Manuelle 2026** — السعر: **307 مليون سنتيم** (مانويل / صالة جيجل).
4. **MG5 Global (MX) 2026** — السعر: **268 مليون سنتيم** (أوتوماتيك / صالة ورقلة).
5. **Jetour Dashing Luxury 2026** — السعر: **415 مليون سنتيم** (أوتوماتيك / بالطلب من الصين).

---

## 4. فروع الصالات، أرقام الهواتف، وروابط خرائط غوغل

| الفرع | العنوان الميداني | أرقام الهواتف الرسمية | رابط خرائط غوغل (Google Maps Link) |
| :--- | :--- | :--- | :--- |
| **الجزائر العاصمة (المحمدية)** | شارع نسيب عبود، المحمدية (قرب الصنوبر البحري وSAFEX) | `0779055489`<br>`0557053814` | [عرض الخريطة](https://www.google.com/maps/search/?api=1&query=Rue+Nacib+Abboud+Mohammadia+Alger) |
| **جيجل (بوالرمل)** | المنطقة التجارية بوالرمل، بلدية الطاهير (محاذاة ميناء جن جن) | `0660656274`<br>`0554154163` | [عرض الخريطة](https://www.google.com/maps/search/?api=1&query=Boulrimal+Taher+Jijel) |
| **ورقلة (وسط المدينة)** | حي النصر / وسط المدينة، ولاية ورقلة | `0660414034`<br>`0661466727` | [عرض الخريطة](https://www.google.com/maps/search/?api=1&query=Cite+En+Nasr+Ouargla) |
| **الإدارة المركزية** | الجزائر العاصمة | `0770727007` | [واتساب الإدارة المباشر](https://wa.me/213770727007) |

---

## 5. الصفحات المطلوبة وهندسة الواجهات (Pages & Architecture)

المشروع يعتمد على **Next.js 15 (App Router)** مع **Tailwind CSS**:

```
app/
├── layout.tsx                # الهيكل العام الداكن + خطوط Readex Pro و Outfit
├── page.tsx                  # الرئيسية: الهيرو، شريط الماركات، فلتر سريع، عروض مميزة
├── inventory/
│   ├── page.tsx              # صفحة الكتالوج مع فلاتر (الماركة، الحالة، الصالة)
│   └── [id]/page.tsx         # صفحة تفاصيل السيارة: صور، مواصفات، زر PDF، وزر واتساب الصالة
├── calculator/page.tsx       # حاسبة الجمارك التفاعلية بنسب القانون الجزائري
├── track/page.tsx            # بوابة تتبع الطلب بالهاتف + رمز الـ PIN
└── showrooms/page.tsx        # صالات العاصمة وجيجل وورقلة مع أزرار الاتصال والخرائط
```

### الطابع البصري المعتمد (Design Tokens):
* **الخلفية الأساسية:** أسود داكن فخم (`#0A0D14` / `#0F131C`) مع كروت زجاجية.
* **اللون التفاعلي (Primary):** أزرق فيروزي كهربائي (`#00A2E8`) مطابق للوغو.
* **لون الأسعار والأزرار الثانوية (Accent):** أحمر ناري (`#E50914`).
* **النصوص:** أبيض ناصع (`#FFFFFF`) ورمادي فاتح (`#94A3B8`).

---

## 6. الكود الجاهز لحاسبة الجمارك الجزائرية (Customs Calculator Code)

وفق نصوص **المرسوم التنفيذي رقم 23-74** وقانون المالية الجزائري (المادة 110)، استخدم هذه الدالة الرياضية الجاهزة في صفحة `/calculator`:

```typescript
// lib/customsCalculator.ts

export interface CalculatorInput {
  carFobPriceCentimes: number; // السعر واصل للميناء بالسنتيم (مثلاً: 280)
  engineDisplacementCc: number; // سعة المحرك بالـ cc (مثلاً: 1498)
  fuelType: 'essence' | 'hybrid' | 'electric';
  regime: 'individual_under_3_years' | 'moudjahidine_has_license' | 'moudjahidine_need_license';
}

export function calculateCustomsCost(input: CalculatorInput) {
  const { carFobPriceCentimes, engineDisplacementCc, fuelType, regime } = input;
  
  // مصاريف ثابتة: الميناء والإنزال بميناء جن جن/الجزائر + وكيل العبور + فحص المناجم
  const fixedPortAndTransitCentimes = 13; // 13 مليون سنتيم
  let customsTaxCentimes = 0;
  let licenseCostCentimes = 0;

  if (regime === 'moudjahidine_has_license') {
    // إعفاء 100% من الجمركة و TVA
    customsTaxCentimes = carFobPriceCentimes * 0.01; // رسوم إدارية رمزية
  } else if (regime === 'moudjahidine_need_license') {
    // إعفاء جمركي + تكلفة كراء/شراء الرخصة من السوق
    customsTaxCentimes = carFobPriceCentimes * 0.01;
    licenseCostCentimes = 65; // متوسط سعر الرخصة (65 مليون سنتيم)
  } else {
    // جمركة عادية للمواطنين (قانون أقل من 3 سنوات)
    // النسبة الكاملة قبل التخفيض = ~57.08%
    if (fuelType === 'electric') {
      // تخفيض 80% من الرسوم
      customsTaxCentimes = carFobPriceCentimes * (0.5708 * 0.20);
    } else if (engineDisplacementCc <= 1800) {
      // تخفيض 50% من الرسوم (الفئة الأكثر مبيعاً 1.5L)
      customsTaxCentimes = carFobPriceCentimes * (0.5708 * 0.50);
    } else {
      // تخفيض 20% فقط
      customsTaxCentimes = carFobPriceCentimes * (0.5708 * 0.80);
    }
  }

  const totalEstimatedCentimes = carFobPriceCentimes + customsTaxCentimes + fixedPortAndTransitCentimes + licenseCostCentimes;

  return {
    fobPrice: Math.round(carFobPriceCentimes),
    customsTaxes: Math.round(customsTaxCentimes),
    portAndTransit: fixedPortAndTransitCentimes,
    licenseCost: licenseCostCentimes,
    totalPrice: Math.round(totalEstimatedCentimes),
  };
}
```

---

## 7. هندسة اختيار جهة التواصل (Branch WhatsApp Routing)

عندما يضغط الزبون على **[طلب حجز أو استفسار]** داخل صفحة السيارة، تفتح له نافذة منبثقة (Drawer أو Modal) تحتوي على الخيارات التالية بروابط مباشرة:

```typescript
// مصفوفة الصالات لربط أزرار الواتساب
export const SHOWROOMS = [
  {
    city: 'الجزائر العاصمة',
    location: 'المحمدية / الصنوبر البحري',
    phone: '213779055489',
    displayPhone: '0779055489',
  },
  {
    city: 'جيجل',
    location: 'بوالرمل (قرب ميناء جن جن)',
    phone: '213660656274',
    displayPhone: '0660656274',
  },
  {
    city: 'ورقلة',
    location: 'وسط المدينة / حي النصر',
    phone: '213660414034',
    displayPhone: '0660414034',
  },
  {
    city: 'الإدارة العامة',
    location: 'المركز الرئيسي',
    phone: '213770727007',
    displayPhone: '0770727007',
  },
];

// دالة توليد رابط الواتساب الجاهز
export function getWhatsAppLink(phone: string, carTitle: string, priceCentimes: number) {
  const text = encodeURIComponent(
    `السلام عليكم، أنا مهتم بسيارة [${carTitle}] المعروضة في موقع Carvex بسعر [${priceCentimes} مليون سنتيم]. أود الاستفسار عن تفاصيل الحجز وموعد التسليم.`
  );
  return `https://wa.me/${phone}?text=${text}`;
}
```

---

## 8. نظام تتبع الطلبات بالـ PIN (Zero-Friction Order Tracking)

في صفحة `/track`:
1. يدخل الزبون: **رقم الهاتف** + **رمز الـ PIN المكون من 4 أرقام** (المسجلين في جدول `orders`).
2. يقوم النظام بجلب السجل وعرض المراحل الأربعة:
   * **المرحلة 1:** تم توقيع العقد واستلام العربون 📝
   * **المرحلة 2:** الحاوية على متن الباخرة (عرض رقم الحاوية واسم السفينة ورابط تتبع الملاحة) 🚢
   * **المرحلة 3:** وصول السفينة لميناء جن جن أو العاصمة والبدء في إجراءات الجمركة ⚓
   * **المرحلة 4:** السيارة جاهزة للاستلام في صالة العرض مع المفاتيح والملف القاعدي 🔑

---

## 9. محرك الوثائق وتوليد الـ PDF (`Reçu d'Arbon`)

* في لوحة تحكم المعرض، يمكن توليد وطباعة وصل استلام العربون (`Reçu d'Arbon`) بصيغة PDF.
* يجب أن يحمل الوصل:
  * شعار Carvex الرسمي ورقم السجل التجاري والتعريف الجبائي.
  * اسم الصالة (العاصمة، جيجل، ورقلة).
  * رقم الشاسيه (Châssis / VIN) والموديل.
  * **المبلغ بالأرقام وبالحروف (Montant en toutes lettres):** (مثال: `500,000 دج` ➔ *"خمسمائة ألف دينار جزائري"*).

---

## 10. خطوات البدء الفوري للمطور (Commands to Run)

```bash
# 1. استنساخ المستودع
git clone https://github.com/joinFleevy/CarvexExports.git
cd CarvexExports

# 2. بدء مشروع Next.js إذا لم يكن موجوداً
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 3. تثبيت مكتبة PocketBase و Lucide Icons
npm install pocketbase lucide-react clsx tailwind-merge

# 4. تشغيل السيرفر المحلي
npm run dev
```

كل الملفات المرجعية الأخرى موجودة في جذر المشروع:
* `CARVEX_PRD.md` — وثيقة متطلبات المنتج الكاملة.
* `CARVEX_CUSTOMS_AND_FINANCE.md` — الدليل التفصيلي لقوانين الجمارك والنسب.
* `carvex-sitemap.html` — خريطة النظام البصرية.
* `assets/` — جميع صور اللوغو والسيارات الأصلية.


---

## 11. نظام إدارة معرفات تيليغرام والتوجيه للفروع (Telegram User IDs & Role Routing)

تم إنشاء جدول `telegram_users` داخل قاعدة بيانات PocketBase لتمكين الإدارة من إضافة وحذف معرفات مستخدمي تيليغرام (User IDs) لكل من مسؤولي الفروع والمبيعات:
* **حقول الجدول:**
  * `user_id`: معرف تيليغرام الرقمي للمسؤول (مثل: `8209658134`).
  * `name`: اسم المسؤول وصفته (مثل: `Hichem Djouadi - الإدارة العامة`).
  * `role`: الرتبة (`admin`, `manager_alger`, `manager_jijel`, `manager_ouergla`, `sales_agent`).
  * `branch`: الفرع المخصص (`all`, `alger`, `jijel`, `ouergla`).
  * `is_active`: حالة الحساب.
  * `receive_alerts`: تفعيل استلام تنبيهات الزبائن الفورية.

* **آلية التوجيه الذكي (`app/api/lead/route.ts`):**
  * عند قيام زبون بطلب حجز أو استخدام الحاسبة، يقرأ النظام المستخدمين النشطين من جدول `telegram_users`.
  * يتم توجيه التنبيه لمدير الصالة المختارة (مثلاً صالة جيجل) + الإدارة العامة دفعة واحدة.
  * يدعم النظام أيضاً قراءة عدة معرفات مباشرة من متغير البيئة `TELEGRAM_CHAT_ID` مفصولة بفواصل.
