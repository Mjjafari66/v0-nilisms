# وب‌سایت بازاریابی پیامکی

*همگام‌سازی خودکار با استقرارهای شما در [v0.app](https://v0.app)*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mj-jafariis-projects/v0-sms-marketing-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/lwGLXXI4GQv)

## مرور کلی

این مخزن با چت‌های منتشرشدهٔ شما در [v0.app](https://v0.app) همگام می‌ماند. هر تغییری که در اپ منتشرشده انجام دهید به‌صورت خودکار از طریق v0 به این مخزن ارسال می‌شود.

## استقرار

پروژه شما در آدرس زیر قابل مشاهده است:

**[https://vercel.com/mj-jafariis-projects/v0-sms-marketing-website](https://vercel.com/mj-jafariis-projects/v0-sms-marketing-website)**

## ادامهٔ توسعه

برای ادامهٔ توسعه از رابط v0 استفاده کنید:

**[https://v0.app/chat/projects/lwGLXXI4GQv](https://v0.app/chat/projects/lwGLXXI4GQv)**

## نحوهٔ کار

1. پروژه را در [v0.app](https://v0.app) ایجاد و تغییر دهید
2. چت‌ها را از طریق رابط v0 منتشر کنید
3. تغییرات به‌صورت خودکار به این مخزن ارسال می‌شوند
4. Vercel جدیدترین نسخه را از این مخزن استقرار می‌دهد

## راه‌اندازی Supabase (برای ذخیره‌سازی فرم شروع رایگان)

1. یک پروژه در Supabase بسازید: `https://app.supabase.com`
2. در قسمت SQL Editor یا Table Editor از Supabase، یک جدول به‌نام `free_trial_submissions` بسازید با ستون‌های زیر:
   - `id` (نوع: bigint یا bigserial، کلید اصلی)
   - `name` (نوع: text)
   - `mobile` (نوع: text)
   - `created_at` (نوع: timestamp یا timestamptz)

3. آدرس پروژه و کلید عمومی (anon) را از تنظیمات پروژه Supabase بردارید.
4. این متغیرهای محیطی را در بخش تنظیمات استقرار (Vercel/GitHub) قرار دهید یا به‌صورت محلی در فایل `.env.local` تنظیم کنید:
   - `NEXT_PUBLIC_SUPABASE_URL` — آدرس پروژه Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — کلید عمومی (anon)

مثال فایل `.env.local` (این فایل را در گیت کامیت نکنید):

```
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. پس از تنظیم متغیرها، فرم «شروع رایگان» در سایت به‌صورت خودکار داده‌ها را به Supabase ارسال خواهد کرد. می‌توانید نتایج را در Table Editor پنل Supabase ببینید.

6. چند نکته مهم:
   - برای قوانین خواندن/نوشتن در محیط تولید، Row Level Security (RLS) و سیاست‌های مناسب را در Supabase تنظیم کنید.
   - برای مشاهدهٔ نتایج به‌صورت امن، از داشبورد Supabase یا صفحات سرور-ساید محافظت‌شده استفاده کنید.