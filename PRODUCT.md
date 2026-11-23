# Jazzfolio

A live-jazz discovery app for San Francisco and the Bay Area. Launch area: San Francisco, Oakland, Berkeley, Stanford. It should feel inspirational — a reason to go out — rather than a utility listing.

## Problem

Jazz in the Bay is happening, but it is scattered across room calendars, ticketing sites, and word of mouth. A new listener does not know which room fits a first night out. Someone who already lives in the music still misses a late set, a residency night, or a hall date because no single place watches the rooms they care about.

## Who it's for

**New listener.** Wants a first night that will not feel like homework. Needs a room with a point of view, a plain answer to "what's on tonight," and a little context (two sets, no cover, listening room versus supper club).

**Knowledgeable listener.** Already has rooms and players. Wants to follow them, catch added sets and low-ticket warnings, and plan the next three weeks without checking five calendars.

## Core flows

1. **Plan ahead.** Look across the next few weeks, pick a night, open a show, see sets, price, and status.
2. **Tonight.** Open the app day-of and see what is live now, what starts next, and what still has a seat.
3. **Follow an artist or a venue.** One follow. Their shows and notes start showing up.
4. **Feed.** A live stream of posts from rooms and players you follow: a late set added, a new date, few tickets left, a cancellation.

## Screens and actions

| Screen | What you can do |
| --- | --- |
| Home / feed | Switch For you and Following. Scan posts. Jump to a show, artist, or venue. See live and upcoming without leaving the feed. |
| Tonight / plan | Move between today, tomorrow, this weekend, and a later date. Read a night as sets on a clock, grouped by neighborhood. |
| Event detail | Read the sets and times, ticket status, price, room, and players. Open the artist or the venue. |
| Artist profile | Follow or unfollow. Read who they are (mock players are labeled). See their upcoming nights. |
| Venue profile | Follow or unfollow. Read the room. See what is booked there. |

Directions `/v1`, `/v2`, and `/v3` are different compositions of these same screens.

## Data model

Clock for this exploration is fixed at **Sunday, Nov 22, 2026, 4:20 PM Pacific**, so "tonight" stays stable. Shows run from that afternoon through Dec 13, plus the Castro date named in the venue notes (Dec 18).

**Venue.** A real room from `data/venues.csv`: city, neighborhood, jazz focus, priority (Launch / Next / Consider), open status, vibe, site, calendar, ticketing, notes. Launch-priority rooms carry most of the mock calendar.

**Artist.** A player or band. Invented artists are `mock: true`. The one non-mock booking is Venna at the Castro Theatre, Fri Dec 18, 2026, 8 PM, taken from that venue's notes. Nothing else is claimed as a real booking.

**Event / Show.** A night at a venue with one or more artists, a ticket status, a price label, and **sets** (label, start, end). Clubs like Black Cat and Mr. Tipple's are usually two sets. Residencies repeat. Jam sessions are a single long set. Hall shows (SFJAZZ, Davies) are one billed concert that may still be played in two sets.

**Post / feed item.** A note from an artist or a venue: late set added, new show announced, few tickets left, a residency note, or a cancellation. Optional link to a show.

**Follow.** A person follows artists and venues. The feed's Following view is that set. Defaults are seeded so the first open is not empty. There is no account.

### Ticket status

| Status | Meaning |
| --- | --- |
| `on_sale` | Seats available |
| `few_left` | Almost gone |
| `sold_out` | No seats |
| `free` | Free or no cover |
| `cancelled` | Not happening |

## Out of scope

- Scraping live calendars or ticketing APIs
- Auth, accounts, and real follow sync
- Payments, holds, or ticket checkout
- Reviews, photos of real rooms, and copyrighted artwork
- Push notifications and email

A later Supabase backend should be able to replace `lib/data` one function at a time (`getFeed`, `getTonight`, `getEvent`, `getArtist`, `getVenue`) without rewriting the screens.
