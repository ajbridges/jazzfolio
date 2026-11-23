export const TIME_ZONE = "America/Los_Angeles";

/** Fixed clock for this exploration: Sunday, Nov 22, 2026, 4:20 PM Pacific. */
export const EDITION_NOW = "2026-11-22T16:20:00-08:00";

export function dayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export const EDITION_TODAY = dayKey(EDITION_NOW);

export function addDays(day: string, amount: number) {
  const date = new Date(`${day}T12:00:00-08:00`);
  date.setUTCDate(date.getUTCDate() + amount);
  return dayKey(date.toISOString());
}

export function eachDay(start: string, end: string) {
  const days: string[] = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

export function weekday(day: string) {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
  }).format(new Date(`${day}T12:00:00-08:00`));
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(label);
}

export function at(day: string, time: string) {
  return `${day}T${time}:00-08:00`;
}
