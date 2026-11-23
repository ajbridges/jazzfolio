import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventView } from "@/components/event-view";
import { formatTime } from "@/lib/format";
import { getArtist, getEvent, getVenue, listEvents } from "@/lib/data";

export function generateStaticParams() {
  return listEvents().map((show) => ({ id: show.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const show = getEvent(id);
  return { title: show ? `${show.title} · Jazzfolio` : "Show · Jazzfolio" };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = getEvent(id);
  const venue = show ? getVenue(show.venueId) : undefined;
  if (!show || !venue || !show.sets[0]) notFound();

  const artists = show.artistIds.flatMap((artistId) => {
    const artist = getArtist(artistId);
    return artist ? [{ id: artist.id, name: artist.name, meta: artist.instrument }] : [];
  });

  return (
    <EventView
      id={show.id}
      title={show.title}
      startsAt={show.sets[0].startsAt}
      venueId={venue.id}
      venueName={venue.name}
      neighborhood={venue.neighborhood}
      city={venue.city}
      vibe={venue.vibe}
      price={show.priceLabel}
      status={show.status}
      summary={show.summary}
      sets={show.sets.map((set) => ({
        id: set.id,
        label: set.label,
        time: `${formatTime(set.startsAt)} – ${formatTime(set.endsAt)}`,
      }))}
      artists={artists}
      mock={show.mock}
      sourceNote={show.sourceNote}
    />
  );
}
