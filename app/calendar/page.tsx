import type { Metadata } from "next"
import { CalendarView } from "@/components/calendar-view"
import { VENUES } from "@/lib/data"

export const metadata: Metadata = { title: "Calendar" }

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string }>
}) {
  const { venue } = await searchParams
  const only = VENUES.some((v) => v.id === venue) ? venue : undefined
  return <CalendarView key={only ?? "all"} onlyVenue={only} />
}
