import { EDITION_TODAY, dayKey } from "@/lib/data/time";
import type { Show, Venue } from "@/lib/data/types";

type FeedSource = {
  id: string;
  authorType: "artist" | "venue";
  authorId: string;
  authorName: string;
  createdAt: string;
  text: string;
  show: Show | null;
};

export type CardModel = {
  id: string;
  title: string;
  startsAt: string;
  venue: string;
  venueId: string;
  neighborhood: string;
  price: string;
  status: Show["status"];
  summary: string;
  artistIds: string[];
};

export type PostModel = {
  id: string;
  authorId: string;
  authorName: string;
  authorKind: "artist" | "venue";
  text: string;
  timestamp: string;
  show: CardModel | null;
};

export type FeedEntry =
  | { kind: "post"; at: string; post: PostModel }
  | { kind: "show"; at: string; show: CardModel };

const featuredIds = [
  "black-cat-2026-11-22",
  "sfjazz-2026-11-23",
  "yoshis-2026-11-27-early",
  "yoshis-2026-11-27-late",
  "the-independent-2026-11-24",
  "bird-beckett-2026-11-22",
  "the-deluxe-jam-2026-11-22",
  "davies-2026-11-28",
  "cal-performances-2026-12-04",
  "stanford-live-2026-12-05",
  "castro-theatre-2026-12-18",
];

export function toCard(show: Show, venues: Map<string, Venue>): CardModel | null {
  const venue = venues.get(show.venueId);
  const startsAt = show.sets[0]?.startsAt;
  if (!venue || !startsAt) return null;
  return {
    id: show.id,
    title: show.title,
    startsAt,
    venue: venue.name,
    venueId: venue.id,
    neighborhood: venue.neighborhood,
    price: show.priceLabel === "No cover" ? "" : show.priceLabel,
    status: show.status,
    summary: show.summary,
    artistIds: show.artistIds,
  };
}

export function buildDiscover(posts: FeedSource[], shows: Show[], venues: Venue[]) {
  const byId = new Map(venues.map((venue) => [venue.id, venue]));
  const cards = new Map<string, CardModel>();
  for (const show of shows) {
    const card = toCard(show, byId);
    if (card) cards.set(card.id, card);
  }

  const tonight = shows
    .filter((show) => dayKey(show.sets[0]?.startsAt ?? "") === EDITION_TODAY)
    .map((show) => cards.get(show.id))
    .filter((card): card is CardModel => Boolean(card));

  const feedPosts: FeedEntry[] = posts.map((post) => ({
    kind: "post",
    at: post.createdAt,
    post: {
      id: post.id,
      authorId: post.authorId,
      authorName: post.authorName,
      authorKind: post.authorType,
      text: post.text,
      timestamp: post.createdAt,
      show: post.show ? cards.get(post.show.id) ?? null : null,
    },
  }));

  const feedShows: FeedEntry[] = featuredIds.flatMap((id) => {
    const show = cards.get(id);
    if (!show) return [];
    return [{ kind: "show" as const, at: show.startsAt, show }];
  });

  const feed = [
    ...feedPosts.sort((a, b) => (a.at < b.at ? 1 : -1)),
    ...feedShows.sort((a, b) => (a.at < b.at ? -1 : 1)),
  ];

  return { tonight, feed, shows: [...cards.values()] };
}
