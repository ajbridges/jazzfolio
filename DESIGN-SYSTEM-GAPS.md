# Design system gaps

Built for Jazzfolio v1 and meant to move into `ajbridges/design-system` as v0.3.0. App copies live in `src/components/ds-pending/` with a TODO on each file. They use existing tokens and are not restyles of registry components.

| Gap | Where it shows up | Proposed API |
| --- | --- | --- |
| App nav | Desktop left rail and mobile bottom bar for Discover, Calendar, Profile | `<AppNav items={[{ href, label, icon }]} pathname />`. Rail from `md`, bottom bar below 768px, 44px targets. |
| Profile header | Signed-in profile | `<ProfileHeader name email onSignOut />` |
| Entity header | Artist and venue pages | `<EntityHeader name eyebrow meta action />` |
| Show hero | Event detail | `<ShowHero title date venue neighborhood price status tint actions />` using `bg-hero-fade` and `font-heading` in sentence case. |
| Tonight strip | Discover, above the feed | `<TonightStrip title>{compact event cards}</TonightStrip>` |

Also missing on components we did install, left unchanged:

- `calendar-month` has no controlled `selected` date, day rows are not links, and the desktop grid does not list the selected day under the month. The app keeps its own linked list and listens to `onSelectDate`.
- `feed-post` has no `authorHref`, so the author name is not a link. Artist and venue pages are reached from the event.
- `input` has no 44px touch size. Signup uses the default field.
