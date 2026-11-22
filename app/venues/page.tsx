import type { Metadata } from "next"
import { VenuesView } from "@/components/venues-view"

export const metadata: Metadata = { title: "Venues" }

export default function VenuesPage() {
  return <VenuesView />
}
