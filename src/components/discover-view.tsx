"use client";

import { FeedPost } from "@/components/ui/feed-post";
import { PageFrame } from "@/components/page-frame";
import { TonightStrip } from "@/components/ds-pending/tonight-strip";
import { WiredCard } from "@/components/wired-card";
import type { FeedEntry } from "@/lib/discover";
import type { CardModel } from "@/lib/discover";
import { useLibrary } from "@/lib/library";
import { likeBase, tintFor, toPillStatus } from "@/lib/status";
import { pacificWallClock } from "@/lib/wall-clock";

export function DiscoverView({
  tonight,
  feed,
}: {
  tonight: CardModel[];
  feed: FeedEntry[];
}) {
  const { library, setPostLiked, setPostSaved, setShowLiked, setShowSaved } = useLibrary();

  return (
    <PageFrame>
      <header className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">San Francisco, Oakland, Berkeley, Stanford</p>
        <h1 className="font-heading text-5xl leading-none font-bold tracking-tight md:text-7xl">
          Discover
        </h1>
        <p className="max-w-xl text-base text-muted-foreground md:text-lg">
          Sunday night in the Bay, and the rooms worth leaving the house for.
        </p>
      </header>

      <TonightStrip title="Tonight">
        {tonight.map((show) => (
          <div key={show.id} className="w-72 shrink-0 md:w-[32rem]">
            <WiredCard show={show} variant="compact" />
          </div>
        ))}
      </TonightStrip>

      <section className="flex flex-col gap-4" aria-label="Feed">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          From the rooms
        </h2>
        {feed.map((entry) => {
          if (entry.kind === "show") {
            return <WiredCard key={`show-${entry.show.id}`} show={entry.show} />;
          }
          const post = entry.post;
          const postLiked = library.likedPosts.includes(post.id);
          const postSaved = library.savedPosts.includes(post.id);
          const show = post.show;
          const showLiked = show ? library.likedShows.includes(show.id) : false;
          const showSaved = show ? library.savedShows.includes(show.id) : false;
          return (
            <FeedPost
              key={post.id}
              author={{ name: post.authorName, kind: post.authorKind }}
              text={post.text}
              timestamp={pacificWallClock(post.timestamp)}
              liked={postLiked}
              onLikedChange={(liked) => setPostLiked(post.id, liked)}
              likeCount={likeBase(post.id) + (postLiked ? 1 : 0)}
              saved={postSaved}
              onSavedChange={(saved) => setPostSaved(post.id, saved)}
              onShare={() => {
                const path = show ? `/events/${show.id}` : "/";
                const url = `${window.location.origin}${path}`;
                if (navigator.share) {
                  void navigator.share({ title: post.authorName, url }).catch(() => undefined);
                } else {
                  void navigator.clipboard?.writeText(url);
                }
              }}
              event={
                show
                  ? {
                      title: show.title,
                      date: pacificWallClock(show.startsAt),
                      venue: `${show.venue} · ${show.neighborhood}`,
                      price: show.price,
                      status: toPillStatus(show.status),
                      tint: tintFor(show.id),
                      href: `/events/${show.id}`,
                      variant: "compact",
                      liked: showLiked,
                      onLikedChange: (liked) => setShowLiked(show.id, liked),
                      likeCount: likeBase(show.id) + (showLiked ? 1 : 0),
                      saved: showSaved,
                      onSavedChange: (saved) => setShowSaved(show.id, saved),
                    }
                  : undefined
              }
            />
          );
        })}
      </section>
    </PageFrame>
  );
}
