"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export function ClientLayout({
  children,
  fontVariable,
}: Readonly<{
  children: React.ReactNode
  fontVariable?: string
}>) {
  const searchParams = useSearchParams()

  return (
    <html lang="fa" dir="rtl">
      <body className={`font-sans antialiased ${fontVariable || ""}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
