"use client";

import { EventCard } from "@/components/ui/event-card";
import type { CardModel } from "@/lib/discover";
import { useLibrary } from "@/lib/library";
import { likeBase, tintFor, toPillStatus } from "@/lib/status";
import { pacificWallClock } from "@/lib/wall-clock";

export function WiredCard({
  show,
  variant = "poster",
}: {
  show: CardModel;
  variant?: "poster" | "compact";
}) {
  const { library, setShowLiked, setShowSaved } = useLibrary();
  const liked = library.likedShows.includes(show.id);
  const saved = library.savedShows.includes(show.id);

  return (
    <EventCard
      title={show.title}
      date={pacificWallClock(show.startsAt)}
      venue={`${show.venue} · ${show.neighborhood}`}
      price={show.price}
      status={toPillStatus(show.status)}
      tint={tintFor(show.id)}
      href={`/events/${show.id}`}
      variant={variant}
      liked={liked}
      onLikedChange={(next) => setShowLiked(show.id, next)}
      likeCount={likeBase(show.id) + (liked ? 1 : 0)}
      saved={saved}
      onSavedChange={(next) => setShowSaved(show.id, next)}
    />
  );
}
