"use client";

import { Badge } from "@/components/ui/badge";
import { FollowButton } from "@/components/ui/follow-button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { EntityHeader } from "@/components/ds-pending/entity-header";
import { PageFrame } from "@/components/page-frame";
import { WiredCard } from "@/components/wired-card";
import type { CardModel } from "@/lib/discover";
import { useLibrary } from "@/lib/library";

export function EntityView({
  kind,
  id,
  name,
  eyebrow,
  meta,
  blurb,
  mock,
  shows,
}: {
  kind: "artist" | "venue";
  id: string;
  name: string;
  eyebrow: string;
  meta: string;
  blurb: string;
  mock?: boolean;
  shows: CardModel[];
}) {
  const { library, setArtistFollowed, setVenueFollowed } = useLibrary();
  const following =
    kind === "artist"
      ? library.followedArtists.includes(id)
      : library.followedVenues.includes(id);

  return (
    <PageFrame>
      <EntityHeader
        name={name}
        eyebrow={eyebrow}
        meta={meta}
        action={
          <FollowButton
            name={name}
            following={following}
            onFollowingChange={(next) =>
              kind === "artist" ? setArtistFollowed(id, next) : setVenueFollowed(id, next)
            }
          />
        }
      />
      <p className="max-w-2xl text-base leading-relaxed md:text-lg">{blurb}</p>
      {kind === "artist" ? (
        mock === false ? (
          <Badge variant="info">From venue notes</Badge>
        ) : (
          <Badge variant="neutral">Mock lineup</Badge>
        )
      ) : null}
      <section className="flex flex-col gap-3" aria-label="Upcoming shows">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          Upcoming
        </h2>
        {shows.length === 0 ? (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>No upcoming shows</EmptyTitle>
              <EmptyDescription>Nothing in this catalog for the next few weeks.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-3">
            {shows.map((show) => (
              <WiredCard key={show.id} show={show} variant="compact" />
            ))}
          </div>
        )}
      </section>
    </PageFrame>
  );
}
