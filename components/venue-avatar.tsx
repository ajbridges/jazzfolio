import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Venue } from "@/lib/data"

const SIZES = {
  sm: { root: "size-7", text: "text-[10px]" },
  md: { root: "size-11", text: "text-[13px]" },
  lg: { root: "size-16", text: "text-lg" },
}

export function VenueAvatar({ venue, size = "md" }: { venue: Venue; size?: keyof typeof SIZES }) {
  return (
    <Avatar className={SIZES[size].root} aria-hidden="true">
      <AvatarFallback className={cn("bg-background font-semibold text-foreground/70", SIZES[size].text)}>
        {venue.initials}
      </AvatarFallback>
    </Avatar>
  )
}
