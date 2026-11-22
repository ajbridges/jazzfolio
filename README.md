# Jazzfolio

Bay Area jazz in one place: what's happening at the venues, a calendar of shows, and the rooms we watch in San Francisco, Oakland, Berkeley and Stanford.

Built with Next.js on [Fluid Functionalism](https://github.com/ajbridges/design-system) (Base UI, DM Sans headings, Inter body, accent `#0054FE`) plus **Fluid Touch**, the phone layer.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run check:ds   # design-system color check
```

## Screens

- **Feed** (`/`): read-only updates from the venues, with a right rail for tonight, busiest rooms and "missing something?".
- **Calendar** (`/calendar`): month grid with venue toggles and a day panel. `?venue=yoshis` opens it filtered to one room. Tickets only show when the venue sells them.
- **Venues** (`/venues`): the seven rooms, filterable by city.

## Fluid Touch (below 768px or on touch screens)

- Side menu becomes a top bar and a bottom tab bar.
- The right rail folds under the feed; the content card goes edge to edge.
- Every button, toggle and tab is at least 44px; controls are pills.
- The calendar's month grid becomes a day-by-day list.

The rules live in `app/fluid-touch.css` and `components/app-shell.tsx`, ready to move into the design-system repo.

## Where things live

```
lib/data.ts              mock venues, shows and feed posts (pinned to Nov 22, 2026)
components/ui/           design-system components, copied from ajbridges/design-system v0.1.0
app/theme.css            design-system tokens (generated there, copied here)
app/globals.css          Jazzfolio brand layer: #0054FE primary, Inter + DM Sans
app/fluid-touch.css      the phone layer
```
