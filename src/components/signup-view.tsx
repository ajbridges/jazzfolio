"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PageFrame } from "@/components/page-frame";
import { useLibrary } from "@/lib/library";

type Choice = { id: string; name: string; meta: string };

export function SignupView({
  artists,
  venues,
}: {
  artists: Choice[];
  venues: Choice[];
}) {
  const router = useRouter();
  const { signIn } = useLibrary();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [artistIds, setArtistIds] = useState<string[]>([]);
  const [venueIds, setVenueIds] = useState<string[]>([]);
  const [error, setError] = useState("");

  function toggle(list: string[], id: string, setList: (next: string[]) => void) {
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail.includes("@")) {
      setError("Add your name and a real email. Nothing here leaves this browser.");
      return;
    }
    signIn(
      { name: trimmedName, email: trimmedEmail },
      { artists: artistIds, venues: venueIds },
    );
    router.push("/profile");
  }

  return (
    <PageFrame>
      <header className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Mock account, stored on this device</p>
        <h1 className="font-heading text-5xl leading-none font-bold tracking-tight md:text-7xl">
          Create an account
        </h1>
        <p className="max-w-xl text-base text-muted-foreground md:text-lg">
          A name, an email, and the rooms you already care about. No password, no server.
        </p>
      </header>
      <form onSubmit={submit} className="flex max-w-2xl flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {error ? <FieldError>{error}</FieldError> : null}
          </Field>
        </FieldGroup>

        <FieldSet>
          <FieldLegend>Favorite venues</FieldLegend>
          <div className="flex flex-wrap gap-2">
            {venues.map((venue) => {
              const selected = venueIds.includes(venue.id);
              return (
                <Button
                  key={venue.id}
                  type="button"
                  size="touch"
                  variant={selected ? "default" : "outline"}
                  aria-pressed={selected}
                  onClick={() => toggle(venueIds, venue.id, setVenueIds)}
                >
                  {venue.name}
                </Button>
              );
            })}
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Favorite artists</FieldLegend>
          <div className="flex flex-wrap gap-2">
            {artists.map((artist) => {
              const selected = artistIds.includes(artist.id);
              return (
                <Button
                  key={artist.id}
                  type="button"
                  size="touch"
                  variant={selected ? "default" : "outline"}
                  aria-pressed={selected}
                  onClick={() => toggle(artistIds, artist.id, setArtistIds)}
                >
                  {artist.name}
                </Button>
              );
            })}
          </div>
        </FieldSet>

        <Button type="submit" size="touch">
          Create account
        </Button>
      </form>
    </PageFrame>
  );
}
