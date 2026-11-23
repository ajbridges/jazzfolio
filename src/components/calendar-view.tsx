"use client";

import { useState } from "react";
import { CalendarMonth } from "@/components/ui/calendar-month";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { PageFrame } from "@/components/page-frame";
import { WiredCard } from "@/components/wired-card";
import { EDITION_NOW } from "@/lib/data/time";
import type { CardModel } from "@/lib/discover";
import { toPillStatus } from "@/lib/status";
import { pacificWallClock, sameLocalDay } from "@/lib/wall-clock";

export function CalendarView({ shows }: { shows: CardModel[] }) {
  const [selected, setSelected] = useState(() => pacificWallClock(EDITION_NOW));
  const events = shows.map((show) => ({
    id: show.id,
    title: show.title,
    date: pacificWallClock(show.startsAt),
    venue: show.venue,
    status: toPillStatus(show.status),
  }));
  const dayShows = shows.filter((show) =>
    sameLocalDay(pacificWallClock(show.startsAt), selected),
  );
  const heading = selected.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <PageFrame>
      <header className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Plan the next few weeks</p>
        <h1 className="font-heading text-5xl leading-none font-bold tracking-tight md:text-7xl">
          Calendar
        </h1>
      </header>
      <CalendarMonth
        defaultMonth={pacificWallClock(EDITION_NOW)}
        events={events}
        onSelectDate={setSelected}
      />
      <section className="flex flex-col gap-4" aria-label={`Shows on ${heading}`}>
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          {heading}
        </h2>
        {dayShows.length === 0 ? (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>Nothing on this day</EmptyTitle>
              <EmptyDescription>Pick another date. The month is full of other nights.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-3">
            {dayShows.map((show) => (
              <WiredCard key={show.id} show={show} variant="compact" />
            ))}
          </div>
        )}
      </section>
    </PageFrame>
  );
}
