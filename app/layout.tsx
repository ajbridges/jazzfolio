import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import "@fontsource-variable/inter"
import "@fontsource-variable/dm-sans"
import "./globals.css"
import { AppShell } from "@/components/app-shell"
import { SuggestProvider } from "@/components/suggest-dialog"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: { default: "Jazzfolio", template: "%s · Jazzfolio" },
  description: "Bay Area jazz in one place: SF, Oakland, Berkeley and Stanford.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SuggestProvider>
            <AppShell>{children}</AppShell>
          </SuggestProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
