import type { Metadata } from "next";
import { ProfileView } from "@/components/profile-view";
import { buildDiscover, toCard } from "@/lib/discover";
import { getFeed, listEvents, listPeople, listRooms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profile · Jazzfolio",
};

export default function ProfilePage() {
  const venues = listRooms();
  const people = listPeople();
  const posts = getFeed();
  const { shows } = buildDiscover(posts, listEvents(), venues);
  const venueMap = new Map(venues.map((venue) => [venue.id, venue]));

  return (
    <ProfileView
      shows={shows}
      posts={posts.flatMap((post) => {
        const show = post.show ? toCard(post.show, venueMap) : null;
        return [
          {
            id: post.id,
            authorId: post.authorId,
            authorName: post.authorName,
            authorKind: post.authorType,
            text: post.text,
            timestamp: post.createdAt,
            show,
          },
        ];
      })}
      artists={people.map((artist) => ({
        id: artist.id,
        name: artist.name,
        meta: artist.instrument,
      }))}
      venues={venues.map((venue) => ({
        id: venue.id,
        name: venue.name,
        meta: `${venue.neighborhood}, ${venue.city}`,
      }))}
    />
  );
}
