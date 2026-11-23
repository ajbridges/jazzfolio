import type { Metadata } from "next";
import { Suspense } from "react";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { LibraryProvider } from "@/lib/library";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const barlowCondensedHeading = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Jazzfolio",
  description:
    "Live jazz in San Francisco and the Bay Area. Shows, venues, and a feed of what the rooms you follow are doing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full font-sans antialiased",
        inter.variable,
        barlowCondensedHeading.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <LibraryProvider>
          <Suspense fallback={<div className="min-h-full flex-1 pb-20 md:pl-64">{children}</div>}>
            <AppShell>{children}</AppShell>
          </Suspense>
        </LibraryProvider>
      </body>
    </html>
  );
}
