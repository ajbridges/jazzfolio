import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Venue } from "./types";

const IDS: Record<string, string> = {
  "SFJAZZ Center": "sfjazz",
  "Yoshi's": "yoshis",
  "Black Cat": "black-cat",
  "Mr. Tipple's Recording Studio": "mr-tipples",
  "Keys Jazz Bistro": "keys",
  "The DeLuxe (formerly Club Deluxe)": "the-deluxe",
  "Bird & Beckett Books & Records": "bird-beckett",
  "Sheba Piano Lounge": "sheba",
  Bix: "bix",
  "The Sound Room": "the-sound-room",
  "Geoffrey's Inner Circle": "geoffreys",
  "Piedmont Piano Company": "piedmont-piano",
  "The Independent": "the-independent",
  "Castro Theatre": "castro-theatre",
  "Davies Symphony Hall (SF Symphony)": "davies",
  "Cal Performances (Zellerbach Hall)": "cal-performances",
  "Freight & Salvage": "freight-salvage",
  "Stanford Live (Bing Concert Hall)": "stanford-live",
  "Paramount Theatre": "paramount",
  "Fox Theater": "fox-theater",
  "The Fillmore": "the-fillmore",
  "Great American Music Hall": "great-american",
  "The UC Theatre": "uc-theatre",
  "Greek Theatre": "greek-theatre",
  "Bill Graham Civic Auditorium": "bill-graham",
  "The Warfield": "the-warfield",
  "Chase Center": "chase-center",
};

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(cell);
      cell = "";
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some((value) => value.length > 0)) rows.push(row);
  }

  return rows;
}

function slug(name: string) {
  return name
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadVenues(): Venue[] {
  const raw = readFileSync(join(process.cwd(), "data/venues.csv"), "utf8").replace(
    /^\uFEFF/,
    "",
  );
  const [header, ...records] = parseCsv(raw);
  if (!header || header[0] !== "Venue") {
    throw new Error("data/venues.csv is missing the expected header row.");
  }

  return records.map((columns) => {
    const [
      name = "",
      city = "",
      jazzFocus = "",
      neighborhood = "",
      priority = "",
      status = "",
      vibe = "",
      website = "",
      calendarUrl = "",
      ticketing = "",
      notes = "",
    ] = columns;
    const id = IDS[name] ?? slug(name);
    return {
      id,
      name,
      city,
      jazzFocus,
      neighborhood,
      priority,
      status,
      vibe,
      website,
      calendarUrl,
      ticketing,
      notes,
    };
  });
}

let venues: Venue[] | null = null;

export function listVenues() {
  if (!venues) venues = loadVenues();
  return venues;
}

export function getVenue(id: string) {
  return listVenues().find((venue) => venue.id === id);
}
