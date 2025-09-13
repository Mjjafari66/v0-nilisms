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
  // Move any usage of client-only hooks into an inner component that is
  // rendered inside the Suspense boundary. Calling hooks before Suspense
  // can cause Next.js prerender/CSR bailout errors.
  function InnerClient({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    // (we don't use searchParams here now, but keeping the hook call
    // inside Suspense avoids prerender errors if other code relies on it)
    return <>{children}</>
  }

  return (
    <html lang="fa" dir="rtl">
      <body className={`font-sans antialiased ${fontVariable || ""}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <InnerClient>{children}</InnerClient>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
