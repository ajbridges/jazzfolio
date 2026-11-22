"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ContentCard } from "@/components/app-shell"
import { Icon, Icons } from "@/components/icons"
import { ShowActions } from "@/components/show-actions"
import { DateBlock } from "@/components/show-row"
import { SuggestButton } from "@/components/suggest-dialog"
import { VenueAvatar } from "@/components/venue-avatar"
import {
  MONTHS_LONG,
  SHOWS,
  TODAY,
  VENUES,
  WEEKDAYS,
  dayKey,
  dayLabel,
  parseDay,
  showMeta,
  showsOn,
  venueById,
} from "@/lib/data"

type Month = { y: number; m: number }

function monthOf(key: string): Month {
  const d = parseDay(key)
  return { y: d.getFullYear(), m: d.getMonth() }
}

function shift(month: Month, by: number): Month {
  const d = new Date(month.y, month.m + by, 1)
  return { y: d.getFullYear(), m: d.getMonth() }
}

/** Every day shown in the month grid, Sunday-first, full weeks. */
function gridDays({ y, m }: Month) {
  const first = new Date(y, m, 1)
  const start = new Date(y, m, 1 - first.getDay())
  const last = new Date(y, m + 1, 0)
  const total = Math.ceil((first.getDay() + last.getDate()) / 7) * 7
  return Array.from({ length: total }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return { key: dayKey(d), num: d.getDate(), inMonth: d.getMonth() === m }
  })
}

// Rooms that have shows at all; Berkeley and Stanford are still empty in the mock data.
const CAL_VENUES = VENUES.filter((v) => SHOWS.some((s) => s.venueId === v.id))

export function CalendarView({ onlyVenue }: { onlyVenue?: string }) {
  const [month, setMonth] = React.useState<Month>(monthOf(TODAY))
  const [selected, setSelected] = React.useState(TODAY)
  const [hidden, setHidden] = React.useState<Set<string>>(
    () => new Set(onlyVenue ? CAL_VENUES.filter((v) => v.id !== onlyVenue).map((v) => v.id) : [])
  )

  const days = React.useMemo(() => gridDays(month), [month])
  const monthDays = days.filter((d) => d.inMonth)
  const agenda = monthDays
    .map((d) => ({ key: d.key, shows: showsOn(d.key, hidden) }))
    .filter((d) => d.shows.length > 0)
  const selectedShows = showsOn(selected, hidden)

  function toggleVenue(id: string, on: boolean) {
    setHidden((prev) => {
      const next = new Set(prev)
      if (on) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function goMonth(by: number) {
    const next = shift(month, by)
    setMonth(next)
    setSelected(dayKey(new Date(next.y, next.m, 1)))
  }

  function goToday() {
    setMonth(monthOf(TODAY))
    setSelected(TODAY)
  }

  return (
    <ContentCard className="lg:flex">
      <main className="min-w-0 flex-1 px-4 py-5 md:px-8 md:py-7">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Calendar</p>
            <h1 className="mt-1 text-[26px] font-semibold md:text-3xl" aria-live="polite">
              {MONTHS_LONG[month.m]} {month.y}
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon-lg" aria-label="Previous month" onClick={() => goMonth(-1)}>
              <Icon icon={Icons.prev} size={18} />
            </Button>
            <Button variant="outline" size="lg" onClick={goToday}>
              Today
            </Button>
            <Button variant="outline" size="icon-lg" aria-label="Next month" onClick={() => goMonth(1)}>
              <Icon icon={Icons.next} size={18} />
            </Button>
          </div>
        </header>

        {/* Venue toggles */}
        <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Venues">
          {CAL_VENUES.map((v) => {
            const on = !hidden.has(v.id)
            return (
              <Toggle
                key={v.id}
                variant="outline"
                size="lg"
                pressed={on}
                onPressedChange={(p) => toggleVenue(v.id, p)}
                className={cn("shrink-0 gap-2 pr-3.5 pl-1", !on && "text-muted-foreground opacity-70")}
              >
                <VenueAvatar venue={v} size="sm" />
                {v.name}
              </Toggle>
            )
          })}
        </div>

        {/* Month grid: tablet and up */}
        <div className="mt-5 hidden md:block">
          <div className="grid grid-cols-7 gap-1 pb-2 text-center text-xs font-medium text-muted-foreground">
            {WEEKDAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const list = showsOn(d.key, hidden)
              const isSel = d.key === selected
              const isToday = d.key === TODAY
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setSelected(d.key)}
                  aria-pressed={isSel}
                  aria-label={`${dayLabel(d.key)}, ${list.length} ${list.length === 1 ? "show" : "shows"}`}
                  className={cn(
                    "flex min-h-24 flex-col gap-1 rounded-2xl p-2 text-left ring-1 ring-transparent transition-colors outline-none hover:bg-muted focus-visible:ring-ring",
                    !d.inMonth && "opacity-40",
                    isSel && "bg-muted ring-2 ring-primary"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full text-sm font-medium",
                      isToday && "bg-primary text-primary-foreground"
                    )}
                  >
                    {d.num}
                  </span>
                  {list.slice(0, 2).map((s) => (
                    <span
                      key={s.id}
                      className="block truncate rounded-md bg-secondary px-1.5 text-[11px] leading-5 text-secondary-foreground"
                    >
                      {s.artist}
                    </span>
                  ))}
                  {list.length > 2 ? (
                    <span className="px-1.5 text-[11px] text-muted-foreground">+{list.length - 2} more</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        {/* Fluid Touch: day-by-day list on phones */}
        <div className="mt-5 flex flex-col md:hidden">
          {agenda.length === 0 ? (
            <p className="py-8 text-center text-[15px] text-muted-foreground">
              No shows this month at the rooms you picked.
            </p>
          ) : null}
          {agenda.map((day) => (
            <section
              key={day.key}
              aria-label={dayLabel(day.key)}
              className="flex gap-3.5 border-t py-4 first:border-t-0"
            >
              <DateBlock
                top={WEEKDAYS[parseDay(day.key).getDay()].toUpperCase()}
                num={parseDay(day.key).getDate()}
                className={cn("self-start", day.key === TODAY && "bg-primary text-primary-foreground [&>span]:text-primary-foreground")}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                {day.shows.map((s) => (
                  <div key={s.id} className="flex flex-col gap-1">
                    <p className="text-[15px] font-medium">{s.artist}</p>
                    <p className="text-sm text-muted-foreground">
                      {venueById(s.venueId).name} · {showMeta(s)}
                    </p>
                    <ShowActions show={s} className="mt-1 flex items-center gap-1" />
                  </div>
                ))}
              </div>
            </section>
          ))}
          <SuggestButton kind="show" className="mt-4 h-12 w-full">
            Missing a show?
          </SuggestButton>
        </div>
      </main>

      {/* Day detail panel: tablet and up */}
      <aside className="hidden flex-col gap-5 border-t px-8 py-7 md:flex lg:w-80 lg:shrink-0 lg:border-t-0 lg:border-l lg:px-7">
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {selected === TODAY ? "Today · " : ""}
            {dayLabel(selected)}
          </p>
          <p className="mt-1 font-heading text-3xl font-semibold">
            {selectedShows.length
              ? `${selectedShows.length} ${selectedShows.length === 1 ? "show" : "shows"}`
              : "No shows"}
          </p>
        </div>
        {selectedShows.map((s) => {
          const v = venueById(s.venueId)
          return (
            <article key={s.id} className="flex flex-col gap-3 rounded-2xl p-4 ring-1 ring-border">
              <div className="flex items-center gap-3">
                <VenueAvatar venue={v} />
                <div className="min-w-0">
                  <p className="font-medium">{s.artist}</p>
                  <p className="text-sm text-muted-foreground">
                    {v.name} · {v.city}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{showMeta(s)}</p>
              <ShowActions show={s} detailsVariant="outline" />
            </article>
          )
        })}
        <SuggestButton kind="show" className="h-12 w-full">
          Missing a show on this day?
        </SuggestButton>
      </aside>
    </ContentCard>
  )
}
