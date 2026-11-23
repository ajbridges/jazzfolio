import type { SetSlot, Show, TicketStatus } from "./types";
import { at, eachDay, weekday } from "./time";

type Slot = [label: string, start: string, end: string];

type Night = {
  id: string;
  day: string;
  title: string;
  artistIds: string[];
  venueId: string;
  slots: Slot[];
  status: TicketStatus;
  priceLabel: string;
  summary: string;
  mock?: boolean;
  sourceNote?: string;
};

function toShow(night: Night): Show {
  const sets: SetSlot[] = night.slots.map(([label, start, end], index) => ({
    id: `${night.id}-set-${index + 1}`,
    label,
    startsAt: at(night.day, start),
    endsAt: end === "24:20" ? at(addOne(night.day), "00:20") : at(night.day, end),
  }));
  return {
    id: night.id,
    title: night.title,
    artistIds: night.artistIds,
    venueId: night.venueId,
    sets,
    status: night.status,
    priceLabel: night.priceLabel,
    summary: night.summary,
    mock: night.mock ?? true,
    sourceNote: night.sourceNote,
  };
}

function addOne(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, date + 1));
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, "0");
  const d = String(utc.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const windowDays = eachDay("2026-11-22", "2026-12-13");

const blackCat: Night[] = windowDays.map((day) => {
  const guest = day === "2026-12-08";
  const few = ["2026-11-22", "2026-11-25", "2026-12-12"].includes(day);
  const slots: Slot[] = [
    ["First set", "19:00", "20:15"],
    ["Second set", "21:30", "22:45"],
  ];
  if (day === "2026-11-22") slots.push(["Late set", "23:15", "24:20"]);
  return {
    id: `black-cat-${day}`,
    day,
    title: guest
      ? "The Marlowe Quartet with Nia Okonkwo"
      : "The Marlowe Quartet",
    artistIds: guest
      ? ["marlowe-quartet", "nia-okonkwo"]
      : ["marlowe-quartet"],
    venueId: "black-cat",
    slots,
    status: few ? "few_left" : "on_sale",
    priceLabel: "$30",
    summary: guest
      ? "Mock residency night. Nia sits in for both sets. Still two sets, still the Tenderloin room."
      : day === "2026-11-22"
        ? "Mock residency. Two sets, plus a late set added this afternoon. Same room, no second cover if you stayed."
        : "Mock Black Cat residency. Two sets, the way the room usually runs.",
  };
});

const tipples: Night[] = windowDays
  .filter((day) => weekday(day) !== 1)
  .map((day) => ({
    id: `mr-tipples-${day}`,
    day,
    title: "Lena Cho",
    artistIds: ["lena-cho"],
    venueId: "mr-tipples",
    slots: [
      ["First set", "20:00", "21:10"],
      ["Second set", "22:30", "23:40"],
    ] as Slot[],
    status: "on_sale" as const,
    priceLabel: "$20",
    summary:
      "Mock residency. Two sets in the Hayes Valley lounge. Mondays are dark in this catalog.",
  }));

const sundays = windowDays.filter((day) => weekday(day) === 0);

const stacks: Night[] = sundays.map((day) => ({
  id: `bird-beckett-${day}`,
  day,
  title: "Sunday in the stacks",
  artistIds: ["stacks-collective"],
  venueId: "bird-beckett",
  slots: [["Session", "15:00", "17:30"]],
  status: "free",
  priceLabel: "No cover",
  summary:
    "Mock Sunday session in a real bookstore room. One long set between the shelves. Doors at 2:30 in this catalog.",
}));

const deluxeJams: Night[] = sundays.map((day) => ({
  id: `the-deluxe-jam-${day}`,
  day,
  title: "Sunday jam",
  artistIds: ["deluxe-jam"],
  venueId: "the-deluxe",
  slots: [["Jam", "18:00", "21:00"]],
  status: "free",
  priceLabel: "No cover",
  summary:
    "Mock jam on the night the venue notes say the room is built for. Bring a horn. No cover in this catalog.",
}));

const keysNights: Night[] = [
  "2026-11-22",
  "2026-11-25",
  "2026-11-27",
  "2026-11-28",
  "2026-11-29",
  "2026-12-04",
  "2026-12-05",
  "2026-12-06",
  "2026-12-11",
  "2026-12-12",
  "2026-12-13",
].map((day) => ({
  id: `keys-${day}`,
  day,
  title: "North Beach Two",
  artistIds: ["keys-house"],
  venueId: "keys",
  slots: [
    ["First set", "16:00", "17:15"],
    ["Second set", "19:30", "20:45"],
  ] as Slot[],
  status: "on_sale" as const,
  priceLabel: "$20",
  summary:
    "Mock house duo at Keys. An early set and a later one, North Beach, two shows the way the room is described.",
}));

const specials: Night[] = [
  {
    id: "yoshis-2026-11-22",
    day: "2026-11-22",
    title: "Jack London Revue",
    artistIds: ["jack-london-revue"],
    venueId: "yoshis",
    slots: [
      ["First set", "19:30", "21:00"],
      ["Second set", "22:00", "23:30"],
    ],
    status: "on_sale",
    priceLabel: "$48",
    summary:
      "Mock supper-club bill at the real Yoshi's room. Two sets, Jack London Square. Not taken from their calendar.",
  },
  {
    id: "yoshis-2026-11-25",
    day: "2026-11-25",
    title: "Rafael Mendes Quartet",
    artistIds: ["rafi-mendes"],
    venueId: "yoshis",
    slots: [
      ["First set", "19:30", "21:00"],
      ["Second set", "22:00", "23:15"],
    ],
    status: "on_sale",
    priceLabel: "$36",
    summary: "Mock weeknight at Yoshi's. Guitar quartet, two sets, invented lineup.",
  },
  {
    id: "yoshis-2026-11-27-early",
    day: "2026-11-27",
    title: "Jack London Revue — early show",
    artistIds: ["jack-london-revue"],
    venueId: "yoshis",
    slots: [["Early show", "19:00", "20:30"]],
    status: "sold_out",
    priceLabel: "$48",
    summary: "Mock early show. Sold out in this catalog so the late show can be the one with seats left.",
  },
  {
    id: "yoshis-2026-11-27-late",
    day: "2026-11-27",
    title: "Jack London Revue — late show",
    artistIds: ["jack-london-revue"],
    venueId: "yoshis",
    slots: [["Late show", "22:00", "23:30"]],
    status: "few_left",
    priceLabel: "$40",
    summary: "Mock late show. Few tickets left. This is the night the feed is warning about.",
  },
  {
    id: "yoshis-2026-12-04",
    day: "2026-12-04",
    title: "June Harada Trio",
    artistIds: ["june-harada"],
    venueId: "yoshis",
    slots: [
      ["First set", "19:30", "21:00"],
      ["Second set", "22:00", "23:15"],
    ],
    status: "few_left",
    priceLabel: "$38",
    summary: "Mock Friday at Yoshi's. Piano trio, two sets, a short remaining count.",
  },
  {
    id: "yoshis-2026-12-11",
    day: "2026-12-11",
    title: "Jack London Revue",
    artistIds: ["jack-london-revue"],
    venueId: "yoshis",
    slots: [
      ["First set", "19:30", "21:00"],
      ["Second set", "22:00", "23:30"],
    ],
    status: "on_sale",
    priceLabel: "$48",
    summary: "Mock Friday return at Yoshi's. Two sets, still invented.",
  },
  {
    id: "sfjazz-2026-11-23",
    day: "2026-11-23",
    title: "Amara Voss Sextet",
    artistIds: ["amara-voss"],
    venueId: "sfjazz",
    slots: [
      ["First set", "19:30", "20:20"],
      ["Second set", "20:40", "21:40"],
    ],
    status: "on_sale",
    priceLabel: "From $55",
    summary:
      "Mock hall night in Miner Auditorium. One ticket, two sets, a visiting sextet that does not exist.",
  },
  {
    id: "sfjazz-2026-11-27",
    day: "2026-11-27",
    title: "June Harada Quartet",
    artistIds: ["june-harada", "nia-okonkwo"],
    venueId: "sfjazz",
    slots: [["Concert", "19:30", "21:15"]],
    status: "on_sale",
    priceLabel: "From $45",
    summary:
      "Mock SFJAZZ date. June's quartet with Nia on three tunes. Invented bill, real room.",
  },
  {
    id: "sfjazz-2026-12-06",
    day: "2026-12-06",
    title: "Hayes Valley Organ Trio",
    artistIds: ["hayes-organ"],
    venueId: "sfjazz",
    slots: [["Concert", "19:00", "20:45"]],
    status: "on_sale",
    priceLabel: "From $35",
    summary: "Mock smaller-room night at SFJAZZ. Organ trio, one set, invented.",
  },
  {
    id: "sfjazz-2026-12-12",
    day: "2026-12-12",
    title: "Colette March",
    artistIds: ["colette-march"],
    venueId: "sfjazz",
    slots: [["Concert", "20:00", "21:40"]],
    status: "on_sale",
    priceLabel: "From $40",
    summary:
      "Mock date posted as a new announcement. Colette at SFJAZZ, one concert set. Not a real listing.",
  },
  {
    id: "davies-2026-11-28",
    day: "2026-11-28",
    title: "Pacific Standard Big Band",
    artistIds: ["pacific-standard"],
    venueId: "davies",
    slots: [
      ["First set", "20:00", "20:50"],
      ["Second set", "21:10", "22:10"],
    ],
    status: "on_sale",
    priceLabel: "From $42",
    summary:
      "Mock big-hall night at Davies Symphony Hall. Two sets, a band that does not exist, a room that does.",
  },
  {
    id: "cal-performances-2026-12-04",
    day: "2026-12-04",
    title: "Amara Voss Sextet",
    artistIds: ["amara-voss"],
    venueId: "cal-performances",
    slots: [["Concert", "20:00", "21:45"]],
    status: "on_sale",
    priceLabel: "From $48",
    summary:
      "Mock Zellerbach date. The sextet after the SFJAZZ stop. Invented, so Berkeley is on the calendar.",
  },
  {
    id: "stanford-live-2026-12-05",
    day: "2026-12-05",
    title: "The Peninsula Four with June Harada",
    artistIds: ["peninsula-four", "june-harada"],
    venueId: "stanford-live",
    slots: [["Concert", "19:30", "21:15"]],
    status: "on_sale",
    priceLabel: "From $35",
    summary:
      "Mock Bing Concert Hall date. Keeps Stanford inside the launch area without claiming a real Stanford Live booking.",
  },
  {
    id: "the-independent-2026-11-24",
    day: "2026-11-24",
    title: "Ada Lin & The Night Bus",
    artistIds: ["ada-lin"],
    venueId: "the-independent",
    slots: [["Show", "20:00", "21:30"]],
    status: "cancelled",
    priceLabel: "Was $25",
    summary:
      "Mock jazz-adjacent date at The Independent, cancelled in this catalog. The room only counts when the bill passes a jazz check.",
  },
  {
    id: "the-independent-2026-12-12",
    day: "2026-12-12",
    title: "Nia Okonkwo",
    artistIds: ["nia-okonkwo"],
    venueId: "the-independent",
    slots: [["Show", "20:00", "21:30"]],
    status: "on_sale",
    priceLabel: "$28",
    summary:
      "Mock late date at The Independent. A jazz bill in a room that is not a jazz club.",
  },
  {
    id: "the-deluxe-2026-11-24",
    day: "2026-11-24",
    title: "Nia Okonkwo",
    artistIds: ["nia-okonkwo"],
    venueId: "the-deluxe",
    slots: [["Set", "20:00", "22:30"]],
    status: "free",
    priceLabel: "No cover",
    summary: "Mock weeknight at The DeLuxe. One long set, no cover, invented singer.",
  },
  {
    id: "the-deluxe-2026-11-26",
    day: "2026-11-26",
    title: "Thanksgiving early jam",
    artistIds: ["deluxe-jam"],
    venueId: "the-deluxe",
    slots: [["Jam", "16:00", "19:00"]],
    status: "free",
    priceLabel: "No cover",
    summary: "Mock holiday jam. Early, short, no cover. The room is real.",
  },
  {
    id: "bird-beckett-2026-11-25",
    day: "2026-11-25",
    title: "June Harada",
    artistIds: ["june-harada"],
    venueId: "bird-beckett",
    slots: [["Set", "19:30", "21:15"]],
    status: "free",
    priceLabel: "No cover",
    summary: "Mock Wednesday solo night in the stacks. No cover.",
  },
  {
    id: "castro-theatre-2026-12-18",
    day: "2026-12-18",
    title: "Venna",
    artistIds: ["venna"],
    venueId: "castro-theatre",
    slots: [["Show", "20:00", "22:00"]],
    status: "on_sale",
    priceLabel: "Price not in the venue notes",
    summary:
      "The one non-mock booking. Venna at the Castro Theatre, Friday, Dec 18, 2026, 8 PM, copied from the venue notes. Ticket status and price are not in that note.",
    mock: false,
    sourceNote:
      "Castro Theatre notes in data/venues.csv: Venna plays Fri Dec 18, 2026, 8 PM.",
  },
];

export const shows: Show[] = [
  ...blackCat,
  ...tipples,
  ...stacks,
  ...deluxeJams,
  ...keysNights,
  ...specials,
].map(toShow);

export function listShows() {
  return shows;
}
