import { cn } from "@/lib/utils"
import { dayNum, monthShort, showMeta, type Show } from "@/lib/data"
import { ShowActions } from "@/components/show-actions"

export function DateBlock({ top, num, className }: { top: string; num: number; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-13 shrink-0 flex-col items-center justify-center rounded-xl bg-muted py-2",
        className
      )}
    >
      <span className="text-[11px] font-semibold tracking-wider text-muted-foreground">{top}</span>
      <span className="font-heading text-xl font-semibold">{num}</span>
    </div>
  )
}

/** A show inside a feed post: date, artist, meta line, actions. */
export function ShowRow({ show, className }: { show: Show; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3.5 p-3", className)}>
      <DateBlock top={monthShort(show.start)} num={dayNum(show.start)} />
      <div className="min-w-40 flex-1">
        <p className="text-[15px] font-medium">{show.artist}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{showMeta(show)}</p>
      </div>
      <ShowActions show={show} detailsVariant="outline" />
    </div>
  )
}
