"use client";

import Link from "next/link";
import { CalendarDaysIcon, CompassIcon, UserRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TODO(design-system v0.3.0): AppNav
 * The registry has no app rail or bottom tab bar.
 * Proposed API: <AppNav items={[{ href, label, icon }]} pathname={string} />
 * Desktop: fixed left rail. Below 768px: fixed bottom bar with 44px targets.
 */

const items = [
  { href: "/", label: "Discover", icon: CompassIcon },
  { href: "/calendar", label: "Calendar", icon: CalendarDaysIcon },
  { href: "/profile", label: "Profile", icon: UserRoundIcon },
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === "/") {
    return (
      pathname === "/" ||
      pathname.startsWith("/events") ||
      pathname.startsWith("/artists") ||
      pathname.startsWith("/venues")
    );
  }
  if (href === "/profile") return pathname === "/profile" || pathname.startsWith("/signup");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppNav({ pathname }: { pathname: string }) {
  return (
    <>
      <nav
        aria-label="Jazzfolio"
        className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-6 border-r border-border bg-sidebar p-5 md:flex"
      >
        <Link href="/" className="font-heading text-3xl leading-none font-bold tracking-tight">
          Jazzfolio
        </Link>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-full px-3 text-sm",
                    current ? "bg-muted text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav
        aria-label="Jazzfolio"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background md:hidden"
      >
        <ul className="grid grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 text-xs",
                    current ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
