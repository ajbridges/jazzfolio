"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "jazzfolio.library";

export type Session = {
  name: string;
  email: string;
};

export type Library = {
  session: Session | null;
  likedShows: string[];
  likedPosts: string[];
  savedShows: string[];
  savedPosts: string[];
  followedArtists: string[];
  followedVenues: string[];
};

const empty: Library = {
  session: null,
  likedShows: [],
  likedPosts: [],
  savedShows: [],
  savedPosts: [],
  followedArtists: [],
  followedVenues: [],
};

function parse(raw: string | null): Library {
  if (!raw) return empty;
  try {
    const value = JSON.parse(raw) as Partial<Library>;
    return {
      session: value.session ?? null,
      likedShows: value.likedShows ?? [],
      likedPosts: value.likedPosts ?? [],
      savedShows: value.savedShows ?? [],
      savedPosts: value.savedPosts ?? [],
      followedArtists: value.followedArtists ?? [],
      followedVenues: value.followedVenues ?? [],
    };
  } catch {
    return empty;
  }
}

type LibraryContextValue = {
  ready: boolean;
  library: Library;
  signIn: (session: Session, follows: { artists: string[]; venues: string[] }) => void;
  signOut: () => void;
  setShowLiked: (id: string, liked: boolean) => void;
  setShowSaved: (id: string, saved: boolean) => void;
  setPostLiked: (id: string, liked: boolean) => void;
  setPostSaved: (id: string, saved: boolean) => void;
  setArtistFollowed: (id: string, following: boolean) => void;
  setVenueFollowed: (id: string, following: boolean) => void;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

function withId(ids: string[], id: string, on: boolean) {
  const next = ids.filter((item) => item !== id);
  if (on) next.push(id);
  return next;
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<Library>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLibrary(parse(window.localStorage.getItem(STORAGE_KEY)));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const commit = useCallback((recipe: (current: Library) => Library) => {
    setLibrary((current) => {
      const next = recipe(current);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<LibraryContextValue>(
    () => ({
      ready,
      library,
      signIn: (session, follows) =>
        commit((current) => ({
          ...current,
          session,
          followedArtists: follows.artists,
          followedVenues: follows.venues,
        })),
      signOut: () => commit((current) => ({ ...current, session: null })),
      setShowLiked: (id, liked) =>
        commit((current) => ({
          ...current,
          likedShows: withId(current.likedShows, id, liked),
        })),
      setShowSaved: (id, saved) =>
        commit((current) => ({
          ...current,
          savedShows: withId(current.savedShows, id, saved),
        })),
      setPostLiked: (id, liked) =>
        commit((current) => ({
          ...current,
          likedPosts: withId(current.likedPosts, id, liked),
        })),
      setPostSaved: (id, saved) =>
        commit((current) => ({
          ...current,
          savedPosts: withId(current.savedPosts, id, saved),
        })),
      setArtistFollowed: (id, following) =>
        commit((current) => ({
          ...current,
          followedArtists: withId(current.followedArtists, id, following),
        })),
      setVenueFollowed: (id, following) =>
        commit((current) => ({
          ...current,
          followedVenues: withId(current.followedVenues, id, following),
        })),
    }),
    [commit, library, ready],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used within LibraryProvider");
  return context;
}
