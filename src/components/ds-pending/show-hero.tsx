import type { CSSProperties, ReactNode } from "react";
import { DateBadge } from "@/components/ui/date-badge";
import { TicketStatusPill, type TicketStatus } from "@/components/ui/ticket-status-pill";

/**
 * TODO(design-system v0.3.0): ShowHero
 * Event detail has no poster hero. Event-card is a feed tile, not a page header.
 * Proposed API: <ShowHero title date venue neighborhood price status tint actions />
 */

export function ShowHero({
  title,
  date,
  venue,
  neighborhood,
  price,
  status,
  tint,
  actions,
}: {
  title: string;
  date: Date;
  venue: string;
  neighborhood: string;
  price: string;
  status: TicketStatus;
  tint: string;
  actions?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-poster"
      style={{ "--hero": tint } as CSSProperties}
    >
      <div aria-hidden className="absolute inset-0 bg-hero-fade" />
      <div className="relative flex flex-col gap-6 p-5 md:min-h-80 md:justify-between md:p-10">
        <div className="flex items-start justify-between gap-3">
          <DateBadge date={date} />
          {actions}
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="max-w-4xl font-heading text-4xl leading-none font-bold tracking-tight md:text-7xl">
            {title}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {venue}
            <span aria-hidden> · </span>
            {neighborhood}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium tabular-nums md:text-base">{price}</span>
            <TicketStatusPill status={status} />
          </div>
        </div>
      </div>
    </section>
  );
}
