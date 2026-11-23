import type { ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * TODO(design-system v0.3.0): EntityHeader
 * Artist and venue pages need a display header with a follow action.
 * Proposed API: <EntityHeader name eyebrow meta action />
 */

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function EntityHeader({
  name,
  eyebrow,
  meta,
  action,
}: {
  name: string;
  eyebrow: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-sm text-muted-foreground">{eyebrow}</p>
          <h1 className="font-heading text-4xl leading-none font-bold tracking-tight md:text-6xl">
            {name}
          </h1>
          {meta ? <p className="text-sm text-muted-foreground md:text-base">{meta}</p> : null}
        </div>
      </div>
      {action}
    </header>
  );
}
