import { getArtist, listArtists } from "./artists";
import { listPosts } from "./posts";
import { listShows } from "./shows";
import { EDITION_NOW, EDITION_TODAY, TIME_ZONE, dayKey } from "./time";
import type { FeedMode, Follows, Post, Show } from "./types";
import { getVenue, listVenues } from "./venues";

export type { Artist, FeedMode, Follows, Post, SetSlot, Show, TicketStatus, Venue } from "./types";
export { EDITION_NOW, EDITION_TODAY, TIME_ZONE };

const defaultFollows: Follows = {
  artists: ["marlowe-quartet", "lena-cho", "amara-voss", "june-harada"],
  venues: [
    "black-cat",
    "mr-tipples",
    "sfjazz",
    "yoshis",
    "bird-beckett",
    "the-deluxe",
    "the-independent",
  ],
};

export type FeedItem = Post & {
  authorName: string;
  show: Show | null;
};

let checked = false;

function assertCatalog() {
  if (checked) return;
  const venueIds = new Set(listVenues().map((venue) => venue.id));
  const artistIds = new Set(listArtists().map((artist) => artist.id));
  const showIds = new Set(listShows().map((show) => show.id));

  for (const show of listShows()) {
    if (!venueIds.has(show.venueId)) {
      throw new Error(`Show ${show.id} points at unknown venue ${show.venueId}`);
    }
    for (const artistId of show.artistIds) {
      if (!artistIds.has(artistId)) {
        throw new Error(`Show ${show.id} points at unknown artist ${artistId}`);
      }
    }
    if (show.sets.length === 0) {
      throw new Error(`Show ${show.id} has no sets`);
    }
  }

  for (const post of listPosts()) {
    const known =
      post.authorType === "artist"
        ? artistIds.has(post.authorId)
        : venueIds.has(post.authorId);
    if (!known) {
      throw new Error(`Post ${post.id} points at unknown ${post.authorType} ${post.authorId}`);
    }
    if (post.showId && !showIds.has(post.showId)) {
      throw new Error(`Post ${post.id} points at unknown show ${post.showId}`);
    }
  }

  if (!listVenues().some((venue) => venue.priority === "Launch")) {
    throw new Error("venues.csv did not load any Launch venues");
  }

  checked = true;
}

function startsAt(show: Show) {
  return show.sets[0]?.startsAt ?? "";
}

function hydrate(post: Post): FeedItem {
  const authorName =
    post.authorType === "artist"
      ? getArtist(post.authorId)?.name
      : getVenue(post.authorId)?.name;
  return {
    ...post,
    authorName: authorName ?? post.authorId,
    show: post.showId ? getEvent(post.showId) ?? null : null,
  };
}

export function getDefaultFollows(): Follows {
  return {
    artists: [...defaultFollows.artists],
    venues: [...defaultFollows.venues],
  };
}

export function getFeed(options?: {
  mode?: FeedMode;
  follows?: Follows;
}): FeedItem[] {
  assertCatalog();
  const mode = options?.mode ?? "for-you";
  const follows = options?.follows ?? defaultFollows;
  const followed = new Set(
    mode === "following" ? [...follows.artists, ...follows.venues] : [],
  );

  return listPosts()
    .filter((post) => mode === "for-you" || followed.has(post.authorId))
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map(hydrate);
}

export function getTonight(): Show[] {
  assertCatalog();
  return listShows()
    .filter((show) => dayKey(startsAt(show)) === EDITION_TODAY)
    .sort((a, b) => (startsAt(a) < startsAt(b) ? -1 : 1));
}

export function getEvent(id: string) {
  assertCatalog();
  return listShows().find((show) => show.id === id);
}

export { getArtist, getVenue };

export function listLaunchVenues() {
  assertCatalog();
  return listVenues().filter((venue) => venue.priority === "Launch");
}

export function getShowsForArtist(id: string) {
  assertCatalog();
  return listShows()
    .filter((show) => show.artistIds.includes(id))
    .sort((a, b) => (startsAt(a) < startsAt(b) ? -1 : 1));
}

export function getShowsForVenue(id: string) {
  assertCatalog();
  return listShows()
    .filter((show) => show.venueId === id)
    .sort((a, b) => (startsAt(a) < startsAt(b) ? -1 : 1));
}

export function listEvents() {
  assertCatalog();
  return listShows();
}

export function listPeople() {
  assertCatalog();
  return listArtists();
}

export function listRooms() {
  assertCatalog();
  return listVenues();
}
