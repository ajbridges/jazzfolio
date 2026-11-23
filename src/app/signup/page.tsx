import type { Metadata } from "next";
import { SignupView } from "@/components/signup-view";
import { listLaunchVenues, listPeople } from "@/lib/data";

export const metadata: Metadata = {
  title: "Create an account · Jazzfolio",
};

export default function SignupPage() {
  return (
    <SignupView
      venues={listLaunchVenues().map((venue) => ({
        id: venue.id,
        name: venue.name,
        meta: venue.neighborhood,
      }))}
      artists={listPeople().map((artist) => ({
        id: artist.id,
        name: artist.name,
        meta: artist.instrument,
      }))}
    />
  );
}
