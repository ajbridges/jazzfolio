const TZ = "America/Los_Angeles";

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatWeekday(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(new Date(iso));
}

export function formatMonthDay(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatLong(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatDayLabel(day: string) {
  return formatLong(`${day}T12:00:00-08:00`);
}

export function formatWhen(iso: string) {
  return `${formatWeekday(iso)} ${formatMonthDay(iso)} · ${formatTime(iso)}`;
}

export function formatRelativePost(iso: string, nowIso: string) {
  const delta = new Date(nowIso).getTime() - new Date(iso).getTime();
  const minutes = Math.round(delta / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 36) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
}
