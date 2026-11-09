# 🚗 CARVEX EXPORT — Automotive Digital Dealership Platform

منصة رقمية متكاملة لشركة **Carvex Export** المتخصصة في استيراد وبيع السيارات الجديدة والمستعملة (أقل من 3 سنوات) من الصين وأوروبا إلى السوق الجزائري، مع فروع في **الجزائر العاصمة، جيجل، وورقلة**.

---

## ⚡ البداية السريعة للمطور (Developer Quickstart)

> 📘 **دليل التسليم الكامل للمطور:**  
> تم إعداد دليل شامل ومفصل يحتوي على كل بيانات السيرفرات، الـ APIs، الحسابات، وهندسة الكود:  
> 👉 راجع الملف: **[`DEVELOPER_HANDOFF.md`](./DEVELOPER_HANDOFF.md)**

---

## 🛠️ البنية التقنية (Tech Stack)

* **الواجهة الأمامية (Frontend):** Next.js 15 (App Router) + Tailwind CSS + shadcn/ui.
* **الواجهة الخلفية وقاعدة البيانات (Backend & DB):** PocketBase (Go/SQLite) متاح مباشرة على:  
  `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io`
* **لوحة تحكم السيرفر (PocketBase Admin):** `http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io/_/`
* **تخزين الوسائط (Object Storage):** Cloudflare R2 (`pub-36fd74211d094e5b8986e7abc18d714c.r2.dev`).
* **خريطة النظام التفاعلية (Archify Sitemap):** افتح الملف محلياً في المتصفح: [`carvex-sitemap.html`](./carvex-sitemap.html).

---

## 📁 ملفات التوثيق والمرجعيات في المشروع

| الملف | الوصف والمحتوى |
| :--- | :--- |
| **[`DEVELOPER_HANDOFF.md`](./DEVELOPER_HANDOFF.md)** | **الدليل الشامل للمطور:** بيانات الدخول، هيكل الصفحات، كود الاتصال بـ PocketBase، ومعادلات الجمارك. |
| **[`CARVEX_PRD.md`](./CARVEX_PRD.md)** | وثيقة متطلبات المنتج الكاملة (Master PRD) بجميع تفاصيلها الفنية والتشغيلية. |
| **[`PRODUCT.md`](./PRODUCT.md)** | وثيقة المنتج الاستراتيجية المعتمدة وفق معيار `/init` (Users, Positioning, Constraints). |
| **[`CARVEX_CUSTOMS_AND_FINANCE.md`](./CARVEX_CUSTOMS_AND_FINANCE.md)** | القوانين الجمركية (المرسوم 23-74 ورخص المجاهدين) وهندسة الدفعات المالية الثلاث. |
| **[`carvex-sitemap.html`](./carvex-sitemap.html)** | المعمارية البصرية التفاعلية لمسار الزبائن والـ Sitemap تم إنشاؤها عبر `/archify`. |
| **[`assets/`](./assets/)** | الأصول الرسمية، اللوغو عالي الدقة، وبوسترات سيارات 2026 الحقيقية. |

---

## 🚀 تشغيل واستدعاء البيانات في الواجهة

```typescript
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io');

// جلب السيارات الجاهزة بالمعرض:
export async function getInStockCars() {
  return await pb.collection('vehicles').getFullList({
    filter: 'status = "in_stock"',
    expand: 'branch',
    sort: '-created',
  });
}
```

---

## 📞 بيانات الاتصال الرسمية بالفروع المعتمدة

* 🏢 **الإدارة العامة:** `0770727007`
* 📍 **صالة الجزائر العاصمة (المحمدية):** `0779055489` / `0557053814`
* 📍 **صالة جيجل (بوالرمل قرب ميناء جن جن):** `0660656274` / `0554154163`
* 📍 **صالة ورقلة (وسط المدينة):** `0660414034` / `0661466727`
