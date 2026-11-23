import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
