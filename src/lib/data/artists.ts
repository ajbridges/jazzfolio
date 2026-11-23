import type { Artist } from "./types";

/**
 * Invented players, except Venna, who is named in the Castro Theatre
 * notes in data/venues.csv and is not given a made-up biography.
 */
export const artists: Artist[] = [
  {
    id: "marlowe-quartet",
    name: "The Marlowe Quartet",
    instrument: "Tenor, piano, bass, drums",
    based: "San Francisco",
    blurb:
      "Mock residency band. A working quartet written for Black Cat: two sets, low light, no patter between tunes.",
    mock: true,
  },
  {
    id: "lena-cho",
    name: "Lena Cho",
    instrument: "Trumpet",
    based: "Oakland",
    blurb:
      "Mock residency. Lena holds the weeknight chair at Mr. Tipple's, two sets, and writes like she is talking to the room.",
    mock: true,
  },
  {
    id: "june-harada",
    name: "June Harada",
    instrument: "Piano",
    based: "Berkeley",
    blurb:
      "Mock pianist. Trio and quartet dates in the catalog are invented, including the SFJAZZ night under her name.",
    mock: true,
  },
  {
    id: "nia-okonkwo",
    name: "Nia Okonkwo",
    instrument: "Voice",
    based: "San Francisco",
    blurb:
      "Mock singer. Booked in this dataset at The DeLuxe and The Independent. Not a real gig sheet.",
    mock: true,
  },
  {
    id: "rafi-mendes",
    name: "Rafael Mendes",
    instrument: "Guitar",
    based: "Oakland",
    blurb:
      "Mock guitarist. The Yoshi's date under his name is an invented weeknight, not a published booking.",
    mock: true,
  },
  {
    id: "ada-lin",
    name: "Ada Lin & The Night Bus",
    instrument: "Alto saxophone, quartet",
    based: "San Francisco",
    blurb:
      "Mock band. Their Independent date exists in this dataset so a cancellation has somewhere to land.",
    mock: true,
  },
  {
    id: "colette-march",
    name: "Colette March",
    instrument: "Voice and piano",
    based: "San Francisco",
    blurb:
      "Mock artist. The December SFJAZZ date is the 'new show announced' post, written for the feed.",
    mock: true,
  },
  {
    id: "hayes-organ",
    name: "Hayes Valley Organ Trio",
    instrument: "Organ, guitar, drums",
    based: "San Francisco",
    blurb:
      "Mock organ trio. Named for the neighborhood, not for a real working band.",
    mock: true,
  },
  {
    id: "amara-voss",
    name: "Amara Voss Sextet",
    instrument: "Tenor saxophone",
    based: "Los Angeles",
    blurb:
      "Mock touring sextet. Hall dates at SFJAZZ and Cal Performances are invented for the big-room end of the catalog.",
    mock: true,
  },
  {
    id: "pacific-standard",
    name: "Pacific Standard Big Band",
    instrument: "Big band",
    based: "San Francisco",
    blurb:
      "Mock big band. The Davies Symphony Hall concert is an invented Saturday, not an SF Symphony listing.",
    mock: true,
  },
  {
    id: "stacks-collective",
    name: "The Stacks Collective",
    instrument: "Rotating quartet",
    based: "Glen Park",
    blurb:
      "Mock community band for the Sunday session at Bird & Beckett. The room is real. The band name is not.",
    mock: true,
  },
  {
    id: "deluxe-jam",
    name: "The DeLuxe Jam",
    instrument: "Jam session",
    based: "San Francisco",
    blurb:
      "Mock session host. Stands in for the Haight jam night the venue notes describe, without naming a real host.",
    mock: true,
  },
  {
    id: "keys-house",
    name: "North Beach Two",
    instrument: "Piano and bass",
    based: "San Francisco",
    blurb:
      "Mock house duo for Keys Jazz Bistro. Two sets, early and late, on the nights this catalog gives them.",
    mock: true,
  },
  {
    id: "jack-london-revue",
    name: "Jack London Revue",
    instrument: "Septet",
    based: "Oakland",
    blurb:
      "Mock supper-club band for Yoshi's. Not a claim about who is actually on the Yoshi's calendar.",
    mock: true,
  },
  {
    id: "peninsula-four",
    name: "The Peninsula Four",
    instrument: "Quartet",
    based: "Stanford",
    blurb:
      "Mock quartet for a Stanford Live date, so the launch area includes the Peninsula without inventing a real series.",
    mock: true,
  },
  {
    id: "venna",
    name: "Venna",
    instrument: "Named in the venue notes",
    based: "Listed at the Castro Theatre",
    blurb:
      "Named in data/venues.csv: Venna plays the Castro Theatre on Fri Dec 18, 2026, at 8 PM. No other biography or discography is claimed here.",
    mock: false,
    sourceNote:
      "Castro Theatre notes in data/venues.csv: Venna plays Fri Dec 18, 2026, 8 PM.",
  },
];

export function listArtists() {
  return artists;
}

export function getArtist(id: string) {
  return artists.find((artist) => artist.id === id);
}
