// Mock data until the venue scrapers land. Dates use YYYY-MM-DD strings.

export type City = "San Francisco" | "Oakland" | "Berkeley" | "Stanford"

export const CITIES: City[] = ["San Francisco", "Oakland", "Berkeley", "Stanford"]

export type Venue = {
  id: string
  name: string
  short: string
  initials: string
  neighborhood: string
  city: City
  tags: string[]
  url: string
}

export type Show = {
  id: string
  venueId: string
  artist: string
  start: string
  end?: string
  times?: string
  price?: string
  /** true when the venue sells tickets for this show */
  tickets: boolean
  soldOut?: boolean
  note?: string
}

export type PostTag = { label: string; variant: "success" | "info" | "neutral" | "outline" }

export type Post = {
  id: string
  venueId: string
  ago: string
  tag: PostTag
  text: string
  showIds: string[]
}

/** The mock data is pinned to this day so "tonight" always lines up with the shows below. */
export const TODAY = "2026-11-22"

export const VENUES: Venue[] = [
  {
    id: "sfjazz",
    name: "SFJAZZ Center",
    short: "SFJAZZ",
    initials: "SC",
    neighborhood: "Hayes Valley",
    city: "San Francisco",
    tags: ["Jazz room", "Tickets"],
    url: "https://www.sfjazz.org",
  },
  {
    id: "yoshis",
    name: "Yoshi’s",
    short: "Yoshi’s",
    initials: "Y",
    neighborhood: "Jack London Square",
    city: "Oakland",
    tags: ["Mixed bill", "Tickets"],
    url: "https://yoshis.com",
  },
  {
    id: "blackcat",
    name: "Black Cat",
    short: "Black Cat",
    initials: "BC",
    neighborhood: "Tenderloin",
    city: "San Francisco",
    tags: ["Jazz room", "Supper club"],
    url: "https://blackcatsf.com",
  },
  {
    id: "tipples",
    name: "Mr. Tipple’s",
    short: "Mr. Tipple’s",
    initials: "MT",
    neighborhood: "Hayes Valley",
    city: "San Francisco",
    tags: ["Jazz room", "Reservations"],
    url: "https://mrtipplessf.com",
  },
  {
    id: "castro",
    name: "Castro Theatre",
    short: "Castro",
    initials: "CT",
    neighborhood: "Castro",
    city: "San Francisco",
    tags: ["Mixed bill", "Theater"],
    url: "https://www.castrotheatre.com",
  },
  {
    id: "calperf",
    name: "Cal Performances",
    short: "Cal Performances",
    initials: "CP",
    neighborhood: "UC Berkeley",
    city: "Berkeley",
    tags: ["Mixed bill", "Concert hall"],
    url: "https://calperformances.org",
  },
  {
    id: "stanford",
    name: "Stanford Live",
    short: "Stanford Live",
    initials: "SL",
    neighborhood: "Bing Concert Hall",
    city: "Stanford",
    tags: ["Mixed bill", "Concert hall"],
    url: "https://live.stanford.edu",
  },
]

export const SHOWS: Show[] = [
  // November
  { id: "elysium", venueId: "blackcat", artist: "Herak/Bulatkin ‘Elysium’ ft. David Binney", start: "2026-11-20", end: "2026-11-22", times: "7:00 & 9:30 PM", price: "$20–$60", tickets: true },
  { id: "wolff", venueId: "tipples", artist: "Patrick Wolff Quartet ft. Matt Wilson", start: "2026-11-22", times: "7:00 & 8:45 PM", tickets: false, note: "Reservations" },
  { id: "sunday-jam", venueId: "yoshis", artist: "Sunday Night Jam Session", start: "2026-11-22", times: "8:00 PM", price: "$15", tickets: true },
  { id: "big-band", venueId: "blackcat", artist: "Tuesday Night Big Band", start: "2026-11-24", times: "7:30 PM", price: "$25", tickets: true },
  { id: "culbertson", venueId: "yoshis", artist: "Brian Culbertson", start: "2026-11-27", end: "2026-11-28", tickets: false, soldOut: true },
  { id: "paul-taylor", venueId: "yoshis", artist: "Paul Taylor", start: "2026-11-29", times: "7:00 PM", tickets: true },
  { id: "swing-holidays", venueId: "sfjazz", artist: "Swing Into the Holidays", start: "2026-11-29", tickets: true },
  // December
  { id: "bad-plus", venueId: "sfjazz", artist: "The Bad Plus", start: "2026-12-02", tickets: true },
  { id: "sharkey", venueId: "yoshis", artist: "Isaiah Sharkey", start: "2026-12-02", times: "7:30 PM", tickets: true },
  { id: "shimabukuro", venueId: "sfjazz", artist: "Jake Shimabukuro", start: "2026-12-03", end: "2026-12-06", tickets: true },
  { id: "tipples-trio", venueId: "tipples", artist: "Late Night Trio", start: "2026-12-05", times: "9:15 PM · 11:00 PM", tickets: false, note: "Reservations" },
  { id: "sho", venueId: "yoshis", artist: "Spanish Harlem Orchestra", start: "2026-12-08", end: "2026-12-09", tickets: true },
  { id: "benoit", venueId: "yoshis", artist: "David Benoit with Courtney Fortune", start: "2026-12-10", times: "7:30 PM", tickets: true },
  { id: "garrett", venueId: "sfjazz", artist: "Kenny Garrett", start: "2026-12-11", times: "7:30 PM", price: "$35–$95", tickets: true, note: "Miner Auditorium" },
  { id: "sands", venueId: "sfjazz", artist: "Christian Sands Trio", start: "2026-12-11", end: "2026-12-12", tickets: true },
  { id: "blackcat-dec", venueId: "blackcat", artist: "Holiday Organ Trio", start: "2026-12-12", times: "7:00 & 9:30 PM", price: "$20–$45", tickets: true },
  { id: "stern", venueId: "yoshis", artist: "Mike Stern Band", start: "2026-12-14", end: "2026-12-15", tickets: true },
  { id: "cole", venueId: "sfjazz", artist: "Stella Cole with Del Sol Quartet", start: "2026-12-16", tickets: true },
  { id: "glasper", venueId: "yoshis", artist: "Robert Glasper", start: "2026-12-17", end: "2026-12-20", tickets: true },
  { id: "venna", venueId: "castro", artist: "Venna", start: "2026-12-18", times: "8:00 PM", price: "From $45", tickets: false },
  { id: "chestnut", venueId: "sfjazz", artist: "Cyrus Chestnut Quartet: A Charlie Brown Christmas", start: "2026-12-18", tickets: true },
  { id: "basie", venueId: "sfjazz", artist: "Christmas with the Count Basie Orchestra", start: "2026-12-19", end: "2026-12-20", price: "$50–$145", tickets: true },
  { id: "holiday-jam", venueId: "sfjazz", artist: "Holiday Jam ft. Maurice “Mobetta” Brown", start: "2026-12-22", tickets: true },
  { id: "vuckovich", venueId: "yoshis", artist: "Larry Vuckovich All-Stars", start: "2026-12-28", times: "7:30 PM", tickets: true },
  { id: "boney", venueId: "yoshis", artist: "Boney James", start: "2026-12-29", end: "2026-12-31", tickets: true },
  { id: "cimafunk", venueId: "sfjazz", artist: "New Year’s Eve with Cimafunk", start: "2026-12-31", tickets: true },
  { id: "americano", venueId: "tipples", artist: "Americano Social Club", start: "2026-12-31", times: "5:45 PM · 7:30 PM", tickets: false, note: "Reservations" },
  { id: "lindsay", venueId: "tipples", artist: "Tony Lindsay NYE", start: "2026-12-31", times: "9:15 PM · 11:00 PM", tickets: false, note: "Reservations" },
  // January
  { id: "pmo", venueId: "yoshis", artist: "Pacific Mambo Orchestra", start: "2027-01-02", end: "2027-01-03", tickets: true },
]

export const POSTS: Post[] = [
  {
    id: "p1",
    venueId: "sfjazz",
    ago: "45m",
    tag: { label: "On sale", variant: "success" },
    text: "Kenny Garrett is at SFJAZZ Friday, Dec 11 in Miner Auditorium. One night only.",
    showIds: ["garrett"],
  },
  {
    id: "p2",
    venueId: "tipples",
    ago: "4h",
    tag: { label: "Tonight", variant: "info" },
    text: "Tonight at Mr. Tipple’s: Patrick Wolff Quartet with drummer Matt Wilson.",
    showIds: ["wolff"],
  },
  {
    id: "p3",
    venueId: "yoshis",
    ago: "8h",
    tag: { label: "Sold out", variant: "neutral" },
    text: "Brian Culbertson is sold out both nights. Paul Taylor follows on Sunday, and tickets are still open.",
    showIds: ["culbertson", "paul-taylor"],
  },
  {
    id: "p4",
    venueId: "blackcat",
    ago: "10h",
    tag: { label: "Residency", variant: "outline" },
    text: "Herak/Bulatkin’s ‘Elysium’ with sax visionary David Binney takes over Black Cat Friday through Sunday. Two sets a night.",
    showIds: ["elysium"],
  },
]

// ---------- helpers ----------

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
export const WEEKDAYS = DOW

export function venueById(id: string): Venue {
  const v = VENUES.find((x) => x.id === id)
  if (!v) throw new Error(`Unknown venue ${id}`)
  return v
}

export function showById(id: string): Show {
  const s = SHOWS.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown show ${id}`)
  return s
}

export function parseDay(key: string) {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function dayKey(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${m}-${d}`
}

export function isOn(show: Show, key: string) {
  return show.start <= key && key <= (show.end ?? show.start)
}

export function showsOn(key: string, hidden: Set<string> = new Set()) {
  return SHOWS.filter((s) => !hidden.has(s.venueId) && isOn(s, key))
}

export function upcoming(venueId: string) {
  return SHOWS.filter((s) => s.venueId === venueId && (s.end ?? s.start) >= TODAY).sort((a, b) =>
    a.start.localeCompare(b.start)
  )
}

/** "Fri, Dec 11" */
export function dayLabel(key: string) {
  const d = parseDay(key)
  return `${DOW[d.getDay()]}, ${MON[d.getMonth()]} ${d.getDate()}`
}

export function monthShort(key: string) {
  return MON[parseDay(key).getMonth()].toUpperCase()
}

export function dayNum(key: string) {
  return parseDay(key).getDate()
}

export function weekdayShort(key: string) {
  return DOW[parseDay(key).getDay()]
}

/** "Nov 20–22" or "Fri" for one-night shows */
export function dateRange(show: Show) {
  if (!show.end) return weekdayShort(show.start)
  const s = parseDay(show.start)
  const e = parseDay(show.end)
  const sameMonth = s.getMonth() === e.getMonth()
  return `${MON[s.getMonth()]} ${s.getDate()}–${sameMonth ? "" : MON[e.getMonth()] + " "}${e.getDate()}`
}

/** The secondary line under an artist: "Fri · 7:30 PM · $35–$95" */
export function showMeta(show: Show) {
  const parts = [dateRange(show), show.times, show.soldOut ? "Sold out" : show.price, show.note]
  return parts.filter(Boolean).join(" · ")
}

export function nextShowLabel(venueId: string) {
  const next = upcoming(venueId)[0]
  if (!next) return "—"
  if (next.start <= TODAY) return "Tonight"
  const d = parseDay(next.start)
  return `${MON[d.getMonth()]} ${d.getDate()}`
}

/** Rooms with the most show nights in the next 30 days */
export function busiestRooms(limit = 3) {
  const start = parseDay(TODAY)
  const counts = new Map<string, number>()
  for (let i = 0; i < 30; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = dayKey(d)
    for (const s of showsOn(key)) counts.set(s.venueId, (counts.get(s.venueId) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, nights]) => ({ venue: venueById(id), nights }))
}
