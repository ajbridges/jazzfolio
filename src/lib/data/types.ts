export type TicketStatus =
  | "on_sale"
  | "few_left"
  | "sold_out"
  | "free"
  | "cancelled";

export type Venue = {
  id: string;
  name: string;
  city: string;
  jazzFocus: string;
  neighborhood: string;
  priority: string;
  status: string;
  vibe: string;
  website: string;
  calendarUrl: string;
  ticketing: string;
  notes: string;
};

export type Artist = {
  id: string;
  name: string;
  instrument: string;
  based: string;
  blurb: string;
  /** Invented for this exploration. Never a claimed real booking. */
  mock: boolean;
  sourceNote?: string;
};

export type SetSlot = {
  id: string;
  label: string;
  startsAt: string;
  endsAt: string;
};

export type Show = {
  id: string;
  title: string;
  artistIds: string[];
  venueId: string;
  sets: SetSlot[];
  status: TicketStatus;
  priceLabel: string;
  summary: string;
  /** False only when the booking is copied from venues.csv notes. */
  mock: boolean;
  sourceNote?: string;
};

export type PostKind =
  | "late-set"
  | "announcement"
  | "few-left"
  | "note"
  | "cancelled";

export type Post = {
  id: string;
  authorType: "artist" | "venue";
  authorId: string;
  createdAt: string;
  kind: PostKind;
  text: string;
  showId?: string;
};

export type Follows = {
  artists: string[];
  venues: string[];
};

export type FeedMode = "for-you" | "following";
