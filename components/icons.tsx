import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar03Icon,
  Home01Icon,
  LinkSquare02Icon,
  Location01Icon,
  MusicNote01Icon,
  PlusSignIcon,
  Ticket01Icon,
} from "@hugeicons/core-free-icons"

export const Icons = {
  feed: Home01Icon,
  calendar: Calendar03Icon,
  venues: Location01Icon,
  logo: MusicNote01Icon,
  plus: PlusSignIcon,
  prev: ArrowLeft01Icon,
  next: ArrowRight01Icon,
  ticket: Ticket01Icon,
  external: LinkSquare02Icon,
} satisfies Record<string, IconSvgElement>

export function Icon({
  icon,
  size = 20,
  className,
}: {
  icon: IconSvgElement
  size?: number
  className?: string
}) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.8} className={className} aria-hidden="true" />
}
