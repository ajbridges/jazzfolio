import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityView } from "@/components/entity-view";
import { toCard } from "@/lib/discover";
import { getArtist, getShowsForArtist, listPeople, listRooms } from "@/lib/data";

export function generateStaticParams() {
  return listPeople().map((artist) => ({ id: artist.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artist = getArtist(id);
  return { title: artist ? `${artist.name} · Jazzfolio` : "Artist · Jazzfolio" };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = getArtist(id);
  if (!artist) notFound();
  const venues = new Map(listRooms().map((venue) => [venue.id, venue]));
  const shows = getShowsForArtist(id).flatMap((show) => {
    const card = toCard(show, venues);
    return card ? [card] : [];
  });

  return (
    <EntityView
      kind="artist"
      id={artist.id}
      name={artist.name}
      eyebrow={artist.based}
      meta={artist.instrument}
      blurb={artist.blurb}
      mock={artist.mock}
      shows={shows}
    />
  );
}
