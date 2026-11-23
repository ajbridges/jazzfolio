import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityView } from "@/components/entity-view";
import { toCard } from "@/lib/discover";
import { getShowsForVenue, getVenue, listRooms } from "@/lib/data";

export function generateStaticParams() {
  return listRooms().map((venue) => ({ id: venue.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const venue = getVenue(id);
  return { title: venue ? `${venue.name} · Jazzfolio` : "Venue · Jazzfolio" };
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = getVenue(id);
  if (!venue) notFound();
  const venues = new Map(listRooms().map((room) => [room.id, room]));
  const shows = getShowsForVenue(id).flatMap((show) => {
    const card = toCard(show, venues);
    return card ? [card] : [];
  });

  return (
    <EntityView
      kind="venue"
      id={venue.id}
      name={venue.name}
      eyebrow={`${venue.neighborhood}, ${venue.city}`}
      meta={venue.jazzFocus}
      blurb={venue.vibe}
      shows={shows}
    />
  );
}
