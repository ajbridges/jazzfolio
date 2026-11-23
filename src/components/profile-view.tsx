"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { FeedPost } from "@/components/ui/feed-post";
import { FollowButton } from "@/components/ui/follow-button";
import { PageFrame } from "@/components/page-frame";
import { ProfileHeader } from "@/components/ds-pending/profile-header";
import { WiredCard } from "@/components/wired-card";
import type { PostModel, CardModel } from "@/lib/discover";
import { useLibrary } from "@/lib/library";
import { likeBase } from "@/lib/status";
import { pacificWallClock } from "@/lib/wall-clock";

type Person = { id: string; name: string; meta: string };

export function ProfileView({
  shows,
  posts,
  artists,
  venues,
}: {
  shows: CardModel[];
  posts: PostModel[];
  artists: Person[];
  venues: Person[];
}) {
  const {
    ready,
    library,
    signOut,
    setArtistFollowed,
    setVenueFollowed,
    setPostLiked,
    setPostSaved,
  } = useLibrary();

  if (!ready) {
    return (
      <PageFrame>
        <p className="text-sm text-muted-foreground">Opening your jazzfolio.</p>
      </PageFrame>
    );
  }

  if (!library.session) {
    return (
      <PageFrame>
        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-5xl leading-none font-bold tracking-tight md:text-7xl">
            Profile
          </h1>
        </header>
        <Empty className="border border-dashed border-border">
          <EmptyHeader>
            <EmptyTitle>Create an account</EmptyTitle>
            <EmptyDescription>
              Save shows, like posts, and follow the rooms and players you actually go see.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/signup" className={buttonVariants({ size: "touch" })}>
              Create an account
            </Link>
          </EmptyContent>
        </Empty>
      </PageFrame>
    );
  }

  const savedShows = shows.filter((show) => library.savedShows.includes(show.id));
  const savedPosts = posts.filter((post) => library.savedPosts.includes(post.id));
  const likedPosts = posts.filter((post) => library.likedPosts.includes(post.id));
  const likedShows = shows.filter((show) => library.likedShows.includes(show.id));
  const followedArtists = artists.filter((artist) =>
    library.followedArtists.includes(artist.id),
  );
  const followedVenues = venues.filter((venue) => library.followedVenues.includes(venue.id));

  return (
    <PageFrame>
      <ProfileHeader
        name={library.session.name}
        email={library.session.email}
        onSignOut={signOut}
      />

      <section className="flex flex-col gap-3" aria-label="Saved shows">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          Saved shows
        </h2>
        {savedShows.length === 0 ? (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>No saved shows yet</EmptyTitle>
              <EmptyDescription>Tap save on a night you want to remember.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-3">
            {savedShows.map((show) => (
              <WiredCard key={show.id} show={show} variant="compact" />
            ))}
          </div>
        )}
        {savedPosts.length > 0 ? (
          <div className="flex flex-col gap-3">
            {savedPosts.map((post) => (
              <PostRow
                key={post.id}
                post={post}
                liked={library.likedPosts.includes(post.id)}
                saved
                onLikedChange={(liked) => setPostLiked(post.id, liked)}
                onSavedChange={(saved) => setPostSaved(post.id, saved)}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-3" aria-label="Liked posts">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          Liked posts
        </h2>
        {likedPosts.length === 0 && likedShows.length === 0 ? (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>No likes yet</EmptyTitle>
              <EmptyDescription>Hearts on the feed land here.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-3">
            {likedPosts.map((post) => (
              <PostRow
                key={post.id}
                post={post}
                liked
                saved={library.savedPosts.includes(post.id)}
                onLikedChange={(liked) => setPostLiked(post.id, liked)}
                onSavedChange={(saved) => setPostSaved(post.id, saved)}
              />
            ))}
            {likedShows.map((show) => (
              <WiredCard key={show.id} show={show} variant="compact" />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4" aria-label="Following">
        <h2 className="font-heading text-3xl leading-none font-bold tracking-tight md:text-5xl">
          Following
        </h2>
        {followedArtists.length === 0 && followedVenues.length === 0 ? (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>You are not following anyone</EmptyTitle>
              <EmptyDescription>
                Follow a player or a room from their page, or pick favorites when you sign up.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-3">
            {followedArtists.map((artist) => (
              <li
                key={artist.id}
                className="flex flex-col gap-3 rounded-poster bg-card p-4 ring-1 ring-foreground/10 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <Link href={`/artists/${artist.id}`} className="text-base font-medium">
                    {artist.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{artist.meta}</p>
                </div>
                <FollowButton
                  name={artist.name}
                  following
                  onFollowingChange={(following) => setArtistFollowed(artist.id, following)}
                />
              </li>
            ))}
            {followedVenues.map((venue) => (
              <li
                key={venue.id}
                className="flex flex-col gap-3 rounded-poster bg-card p-4 ring-1 ring-foreground/10 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <Link href={`/venues/${venue.id}`} className="text-base font-medium">
                    {venue.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{venue.meta}</p>
                </div>
                <FollowButton
                  name={venue.name}
                  following
                  onFollowingChange={(following) => setVenueFollowed(venue.id, following)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageFrame>
  );
}

function PostRow({
  post,
  liked,
  saved,
  onLikedChange,
  onSavedChange,
}: {
  post: PostModel;
  liked: boolean;
  saved: boolean;
  onLikedChange: (liked: boolean) => void;
  onSavedChange: (saved: boolean) => void;
}) {
  return (
    <FeedPost
      author={{ name: post.authorName, kind: post.authorKind }}
      text={post.text}
      timestamp={pacificWallClock(post.timestamp)}
      liked={liked}
      onLikedChange={onLikedChange}
      likeCount={likeBase(post.id) + (liked ? 1 : 0)}
      saved={saved}
      onSavedChange={onSavedChange}
    />
  );
}
