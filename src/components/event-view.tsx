"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FollowButton } from "@/components/ui/follow-button";
import { LikeButton } from "@/components/ui/like-button";
import { SaveButton } from "@/components/ui/save-button";
import { PageFrame } from "@/components/page-frame";
import { ShowHero } from "@/components/ds-pending/show-hero";
import { likeBase, tintFor, toPillStatus } from "@/lib/status";
import { useLibrary } from "@/lib/library";
import { pacificWallClock } from "@/lib/wall-clock";

type Person = { id: string; name: string; meta: string };

export function EventView({
  id,
  title,
  startsAt,
  venueId,
  venueName,
  neighborhood,
  city,
  vibe,
  price,
  status,
  summary,
  sets,
  artists,
  mock,
  sourceNote,
}: {
  id: string;
  title: string;
  startsAt: string;
  venueId: string;
  venueName: string;
  neighborhood: string;
  city: string;
  vibe: string;
  price: string;
  status: "on_sale" | "few_left" | "sold_out" | "free" | "cancelled";
  summary: string;
  sets: { id: string; label: string; time: string }[];
  artists: Person[];
  mock: boolean;
  sourceNote?: string;
}) {
  const {
    library,
    setShowLiked,
    setShowSaved,
    setArtistFollowed,
    setVenueFollowed,
  } = useLibrary();
  const liked = library.likedShows.includes(id);
  const saved = library.savedShows.includes(id);

  return (
    <PageFrame>
      <ShowHero
        title={title}
        date={pacificWallClock(startsAt)}
        venue={venueName}
        neighborhood={neighborhood}
        price={price}
        status={toPillStatus(status)}
        tint={tintFor(id)}
        actions={
          <div className="flex items-center gap-2">
            <LikeButton
              liked={liked}
              onLikedChange={(next) => setShowLiked(id, next)}
              count={likeBase(id) + (liked ? 1 : 0)}
            />
            <SaveButton saved={saved} onSavedChange={(next) => setShowSaved(id, next)} />
          </div>
        }
      />
      <p className="max-w-2xl text-base leading-relaxed md:text-lg">{summary}</p>
      {mock ? (
        <Badge variant="neutral">Mock lineup</Badge>
      ) : (
        <Badge variant="info">From venue notes</Badge>
      )}
      {sourceNote ? <p className="text-sm text-muted-foreground">{sourceNote}</p> : null}

      <section className="flex flex-col gap-3" aria-label="Sets">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          Sets
        </h2>
        <ul className="flex flex-col gap-2">
          {sets.map((set) => (
            <li
              key={set.id}
              className="flex min-h-11 items-center justify-between gap-3 rounded-poster bg-card px-4 py-3 ring-1 ring-foreground/10"
            >
              <span className="font-medium">{set.label}</span>
              <span className="text-sm text-muted-foreground tabular-nums">{set.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3" aria-label="Artists">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          On the bill
        </h2>
        <ul className="flex flex-col gap-3">
          {artists.map((artist) => (
            <li
              key={artist.id}
              className="flex flex-col gap-3 rounded-poster bg-card p-4 ring-1 ring-foreground/10 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <Link href={`/artists/${artist.id}`} className="text-base font-medium">
                  {artist.name}
                </Link>
                <p className="text-sm text-muted-foreground">{artist.meta}</p>
              </div>
              <FollowButton
                name={artist.name}
                following={library.followedArtists.includes(artist.id)}
                onFollowingChange={(following) => setArtistFollowed(artist.id, following)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 rounded-poster bg-card p-5 ring-1 ring-foreground/10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            {city}
            <span aria-hidden> · </span>
            {neighborhood}
          </p>
          <Link
            href={`/venues/${venueId}`}
            className="font-heading text-3xl leading-none font-bold tracking-tight"
          >
            {venueName}
          </Link>
          <p className="max-w-xl text-sm text-muted-foreground">{vibe}</p>
        </div>
        <FollowButton
          name={venueName}
          following={library.followedVenues.includes(venueId)}
          onFollowingChange={(following) => setVenueFollowed(venueId, following)}
        />
      </section>
    </PageFrame>
  );
}
