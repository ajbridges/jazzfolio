import type { TicketStatus as PillStatus } from "@/components/ui/ticket-status-pill";
import type { TicketStatus } from "@/lib/data/types";

const pillStatus: Record<TicketStatus, PillStatus> = {
  on_sale: "on-sale",
  few_left: "few-left",
  sold_out: "sold-out",
  free: "free",
  cancelled: "cancelled",
};

export function toPillStatus(status: TicketStatus): PillStatus {
  return pillStatus[status];
}

const tints = [
  "var(--primary)",
  "var(--chart-2)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-1)",
] as const;

export function tintFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash + char.charCodeAt(0)) % tints.length;
  return tints[hash] ?? tints[0];
}

export function likeBase(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 33 + char.charCodeAt(0)) % 80;
  return 6 + hash;
}
