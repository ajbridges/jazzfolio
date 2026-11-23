# Jazzfolio

Bay Area jazz in one place: what's happening at the venues, a calendar of shows, and the rooms we watch in San Francisco, Oakland, Berkeley and Stanford.

This repo is a design-led exploration of that product, on the [ajbridges/design-system](https://github.com/ajbridges/design-system) Jazzfolio theme (`v0.2.0`). Product notes are in `PRODUCT.md`. Venues, references, and the typed mock catalog live in `data/`, `docs/references/`, and `src/lib/data/`.

The app is one direction: Discover, Calendar, and Profile. Dev and build run in `America/Los_Angeles` so the mock clock (Sunday, Nov 22, 2026, 4:20 PM) lines up with the design-system date formatters. Missing pieces we expect to upstream are listed in `DESIGN-SYSTEM-GAPS.md`.

```bash
npm install
npm run dev
```

`npm run check:ds` fails if UI hardcodes colors outside the design-system tokens.
