"use client"

import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ContentCard } from "@/components/app-shell"
import { Icon, Icons } from "@/components/icons"
import { SuggestButton } from "@/components/suggest-dialog"
import { VenueAvatar } from "@/components/venue-avatar"
import { CITIES, VENUES, nextShowLabel, upcoming, type City } from "@/lib/data"

type Filter = "All" | City

export function VenuesView() {
  const [city, setCity] = React.useState<Filter>("All")
  const list = city === "All" ? VENUES : VENUES.filter((v) => v.city === city)

  return (
    <ContentCard>
      <main className="px-4 py-5 md:px-10 md:py-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Venues</p>
            <h1 className="mt-1 text-[26px] font-semibold md:text-3xl">{VENUES.length} rooms we watch</h1>
          </div>
          <ToggleGroup
            aria-label="City"
            variant="outline"
            size="lg"
            value={[city]}
            onValueChange={(v: string[]) => setCity((v[0] as Filter | undefined) ?? "All")}
            className="-mx-4 w-auto max-w-[100vw] overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0"
          >
            {(["All", ...CITIES] as Filter[]).map((c) => (
              <ToggleGroupItem
                key={c}
                value={c}
                className="shrink-0 px-3.5 data-pressed:bg-foreground data-pressed:text-background data-pressed:hover:bg-foreground/90"
              >
                {c}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((v) => {
            const shows = upcoming(v.id)
            const empty = shows.length === 0
            return (
              <article
                key={v.id}
                className="flex flex-col items-center gap-3.5 rounded-3xl px-5 pt-6 pb-5 text-center ring-1 ring-border"
              >
                <VenueAvatar venue={v} size="lg" />
                <div>
                  <h2 className="text-lg font-semibold">{v.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {v.neighborhood} · {v.city}
                  </p>
                </div>
                <dl className="flex gap-6">
                  <div className="flex min-w-18 flex-col-reverse gap-0.5">
                    <dt className="text-xs text-muted-foreground">Upcoming</dt>
                    <dd className="font-heading text-xl font-semibold tabular-nums">{empty ? "—" : shows.length}</dd>
                  </div>
                  <div className="flex min-w-18 flex-col-reverse gap-0.5">
                    <dt className="text-xs text-muted-foreground">Next show</dt>
                    <dd className="font-heading text-xl font-semibold">{nextShowLabel(v.id)}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {v.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="h-7 px-3 text-[13px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {empty ? (
                    <SuggestButton kind="show">Missing a show?</SuggestButton>
                  ) : (
                    <Button variant="outline" size="lg" nativeButton={false} render={<Link href={`/calendar?venue=${v.id}`} />}>
                      View lineup
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-muted-foreground"
                    nativeButton={false}
                    render={<a href={v.url} target="_blank" rel="noreferrer" />}
                  >
                    Website
                    <Icon icon={Icons.external} size={14} />
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
        {list.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">No rooms in {city} yet.</p>
        ) : null}
      </main>
    </ContentCard>
  )
}
