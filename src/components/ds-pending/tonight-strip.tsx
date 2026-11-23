import type { ReactNode } from "react";

/**

 * TODO(design-system v0.3.0): TonightStrip
 * No horizontal "on now / next" shelf. Event-card is the tile; this is the shelf.
 * Proposed API: <TonightStrip title>{cards}</TonightStrip>
 */

export function TonightStrip({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3" aria-label={title}>
      <h2 className="font-heading text-2xl leading-none font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {children}
      </div>
    </section>
  );
}
