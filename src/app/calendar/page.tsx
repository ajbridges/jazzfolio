import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarView } from "@/components/calendar-view";
import { PageFrame } from "@/components/page-frame";
import { buildDiscover } from "@/lib/discover";
import { getFeed, listEvents, listRooms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Calendar · Jazzfolio",
};

export default function CalendarPage() {
  const { shows } = buildDiscover(getFeed(), listEvents(), listRooms());
  return (
    <Suspense
      fallback={
        <PageFrame>
          <h1 className="font-heading text-5xl leading-none font-bold tracking-tight md:text-7xl">
            Calendar
          </h1>
        </PageFrame>
      }
    >
      <CalendarView shows={shows} />
    </Suspense>
  );
}
