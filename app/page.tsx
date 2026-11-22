import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ContentCard } from "@/components/app-shell"
import { ShowRow } from "@/components/show-row"
import { SuggestButton } from "@/components/suggest-dialog"
import { VenueAvatar } from "@/components/venue-avatar"
import { POSTS, TODAY, busiestRooms, showById, showsOn, venueById } from "@/lib/data"

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{children}</p>
}

export default function FeedPage() {
  const tonight = showsOn(TODAY)
  const busiest = busiestRooms()

  return (
    <ContentCard className="lg:flex">
      <main className="min-w-0 flex-1 px-4 py-5 md:px-10 md:py-8">
        <header className="flex flex-col gap-1.5 border-b pb-6">
          <Label>San Francisco · Oakland · Berkeley · Stanford</Label>
          <h1 className="text-[26px] leading-tight font-semibold md:text-3xl">What’s happening in Bay Area jazz</h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Live updates from the venues: tonight’s sets, new lineups, tickets on sale.
          </p>
        </header>

        <div className="flex flex-col">
          {POSTS.map((post, i) => {
            const venue = venueById(post.venueId)
            const shows = post.showIds.map(showById)
            return (
              <article key={post.id} className={`flex gap-3.5 py-6 ${i > 0 ? "border-t" : ""}`}>
                <VenueAvatar venue={venue} />
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">{venue.name}</span>
                    <span className="text-muted-foreground">{post.ago}</span>
                    <Badge variant={post.tag.variant} className="ml-auto">
                      {post.tag.label}
                    </Badge>
                  </div>
                  <p className="text-base leading-relaxed text-foreground/90">{post.text}</p>
                  <div className="divide-y overflow-hidden rounded-2xl ring-1 ring-border">
                    {shows.map((s) => (
                      <ShowRow key={s.id} show={s} />
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </main>

      {/* Right rail. Fluid Touch: below 1024px it folds under the feed. */}
      <aside className="flex flex-col gap-7 border-t px-4 py-6 text-center md:px-10 lg:w-80 lg:shrink-0 lg:border-t-0 lg:border-l lg:px-7 lg:py-8">
        <section className="flex flex-col gap-3.5">
          <Label>Tonight</Label>
          <p className="font-heading text-3xl font-semibold">
            {tonight.length} {tonight.length === 1 ? "show" : "shows"}
          </p>
          <Button variant="outline" size="lg" className="h-12 text-[15px]" nativeButton={false} render={<Link href="/calendar" />}>
            Open the calendar
          </Button>
          <ul className="mt-1 flex flex-col gap-2.5 text-left">
            {tonight.map((s) => {
              const v = venueById(s.venueId)
              return (
                <li key={s.id} className="flex items-center gap-2.5">
                  <VenueAvatar venue={v} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.artist}</p>
                    <p className="text-xs text-muted-foreground">
                      {v.short} · {s.soldOut ? "Sold out" : (s.times?.split(" ")[0] ?? "Tonight")}
                      {s.times ? " PM" : ""}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <Separator />

        <section className="flex flex-col gap-3.5">
          <Label>Busiest rooms</Label>
          <div className="flex flex-wrap justify-center gap-2">
            {busiest.map(({ venue, nights }, i) => (
              <Button
                key={venue.id}
                variant="secondary"
                size="lg"
                nativeButton={false}
                render={<Link href={`/calendar?venue=${venue.id}`} />}
              >
                {venue.short} · {nights}
                {i === 0 ? " nights" : ""}
              </Button>
            ))}
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-3">
          <Label>Missing something?</Label>
          <p className="text-sm leading-relaxed text-muted-foreground">
            If a show, venue or artist isn’t here, tell us and we’ll start tracking it.
          </p>
          <SuggestButton kind="show" className="h-12 w-full text-[15px]">
            Report a missing show
          </SuggestButton>
          <SuggestButton kind="venue" className="h-12 w-full text-[15px]">
            Suggest a venue
          </SuggestButton>
        </section>
      </aside>
    </ContentCard>
  )
}
