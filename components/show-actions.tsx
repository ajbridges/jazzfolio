"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Icon, Icons } from "@/components/icons"
import { VenueAvatar } from "@/components/venue-avatar"
import { dateRange, dayLabel, venueById, type Show } from "@/lib/data"

/** Tickets only when the venue sells them, plus Details. */
export function ShowActions({
  show,
  detailsVariant = "ghost",
  className,
}: {
  show: Show
  detailsVariant?: "ghost" | "outline"
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const venue = venueById(show.venueId)
  const canBuy = show.tickets && !show.soldOut

  return (
    <div className={className ?? "flex items-center gap-1"}>
      {canBuy ? (
        <Button size="lg" nativeButton={false} render={<a href={venue.url} target="_blank" rel="noreferrer" />}>
          Tickets
        </Button>
      ) : null}
      <Button
        size="lg"
        variant={canBuy ? "ghost" : detailsVariant}
        className={canBuy ? "text-muted-foreground" : undefined}
        onClick={() => setOpen(true)}
      >
        Details
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <VenueAvatar venue={venue} />
              <div className="min-w-0">
                <DialogTitle className="font-heading text-lg">{show.artist}</DialogTitle>
                <DialogDescription>
                  {venue.name} · {venue.neighborhood}, {venue.city}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
            <dt className="text-muted-foreground">When</dt>
            <dd className="col-span-2">{show.end ? dateRange(show) : dayLabel(show.start)}</dd>
            {show.times ? (
              <>
                <dt className="text-muted-foreground">Sets</dt>
                <dd className="col-span-2">{show.times}</dd>
              </>
            ) : null}
            <dt className="text-muted-foreground">Price</dt>
            <dd className="col-span-2">{show.price ?? "On the venue’s site"}</dd>
            <dt className="text-muted-foreground">Entry</dt>
            <dd className="col-span-2">
              {show.soldOut ? (
                <Badge variant="neutral">Sold out</Badge>
              ) : show.tickets ? (
                <Badge variant="success">Tickets on sale</Badge>
              ) : (
                <Badge variant="info">{show.note ?? "At the door"}</Badge>
              )}
            </dd>
          </dl>
          <DialogFooter>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={venue.url} target="_blank" rel="noreferrer" />}
            >
              <Icon icon={Icons.external} size={16} />
              Venue site
            </Button>
            {canBuy ? (
              <Button nativeButton={false} render={<a href={venue.url} target="_blank" rel="noreferrer" />}>
                <Icon icon={Icons.ticket} size={16} />
                Tickets
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
