import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "./ClientLayout"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
})

export const metadata: Metadata = {
  title: "نیلی اس ام اس | خدمات پیامک تبلیغاتی حرفه‌ای",
  description:
    "ارائه خدمات پیامک تبلیغاتی با بانک اطلاعاتی هدفمند و تخصصی. شهرهای ایران به تفکیک کد پستی و بانک مشاغل تخصصی با ۵ میلیون شماره موبایل.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout fontVariable={vazirmatn.variable}>{children}</ClientLayout>
}
