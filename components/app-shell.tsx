"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { VENUES } from "@/lib/data"
import { Icon, Icons } from "@/components/icons"
import { SuggestButton } from "@/components/suggest-dialog"
import { VenueAvatar } from "@/components/venue-avatar"

const NAV = [
  { href: "/", label: "Feed", icon: Icons.feed },
  { href: "/calendar", label: "Calendar", icon: Icons.calendar },
  { href: "/venues", label: "Venues", icon: Icons.venues },
]

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

function Wordmark({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2 text-foreground" aria-label="Jazzfolio home">
      <Icon icon={Icons.logo} size={size === "lg" ? 24 : 22} />
      <span
        className={cn(
          "font-heading font-bold tracking-tight",
          size === "lg" ? "text-2xl" : "text-xl"
        )}
      >
        jazzfolio
      </span>
    </Link>
  )
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main" className="sticky top-4 hidden w-64 shrink-0 flex-col gap-5 px-1 py-2 md:flex">
      <div className="px-2.5">
        <Wordmark />
      </div>

      <Link
        href="/venues"
        className="flex items-center gap-3 rounded-2xl bg-background px-3.5 py-3 ring-1 ring-border transition-colors hover:bg-muted"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon icon={Icons.venues} size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium">Bay Area</span>
          <span className="block truncate text-sm text-muted-foreground">SF · Oakland · Berkeley · Stanford</span>
        </span>
        <Icon icon={Icons.next} size={16} className="text-muted-foreground" />
      </Link>

      <SuggestButton kind="venue-or-artist" className="h-11 w-full text-[15px]">
        <Icon icon={Icons.plus} size={16} />
        Suggest a venue or artist
      </SuggestButton>

      <div className="flex flex-col gap-1">
        {NAV.map((item) => {
          const on = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex h-11 items-center gap-3.5 rounded-2xl px-3.5 text-base text-foreground/80 transition-colors hover:bg-background",
                on && "bg-background font-medium text-foreground ring-1 ring-border"
              )}
            >
              <Icon icon={item.icon} className={on ? "text-primary" : "text-muted-foreground"} />
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 px-3.5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Rooms</p>
          <span className="h-px flex-1 bg-border" />
        </div>
        {VENUES.slice(0, 4).map((v) => (
          <Link
            key={v.id}
            href={`/calendar?venue=${v.id}`}
            className="flex h-11 items-center gap-3 rounded-2xl px-3.5 text-[15px] text-foreground/80 transition-colors hover:bg-background"
          >
            <VenueAvatar venue={v} size="sm" />
            {v.name}
          </Link>
        ))}
        <Link
          href="/venues"
          className="flex h-11 items-center rounded-2xl px-3.5 text-[15px] text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          See all {VENUES.length}
        </Link>
      </div>
    </nav>
  )
}

function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-background/95 py-1.5 pr-2 pl-4 backdrop-blur md:hidden">
      <Wordmark size="sm" />
      <SuggestButton kind="venue-or-artist" variant="outline" size="icon-lg" aria-label="Suggest a venue or artist">
        <Icon icon={Icons.plus} size={18} />
      </SuggestButton>
    </header>
  )
}

function TabBar({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Main"
      className="ft-safe-bottom fixed inset-x-0 bottom-0 z-20 flex justify-around border-t bg-background/95 px-2 pt-1 backdrop-blur md:hidden"
    >
      {NAV.map((item) => {
        const on = isActive(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={on ? "page" : undefined}
            className={cn(
              "flex min-h-13 min-w-18 flex-col items-center justify-center gap-0.5 text-xs font-medium text-muted-foreground",
              on && "font-semibold text-primary"
            )}
          >
            <Icon icon={item.icon} size={22} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="ft-tabbar-space min-h-dvh bg-sidebar md:p-4">
      <TopBar />
      <div className="mx-auto flex max-w-7xl items-start gap-4">
        <Sidebar pathname={pathname} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <TabBar pathname={pathname} />
    </div>
  )
}

/** The white content card. Edge to edge on phones (Fluid Touch), rounded on larger screens. */
export function ContentCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-background md:rounded-3xl md:ring-1 md:ring-border",
        className
      )}
    >
      {children}
    </div>
  )
}
