import { Button } from "@/components/ui/button";

/**
 * TODO(design-system v0.3.0): ProfileHeader
 * No profile identity block in the registry.
 * Proposed API: <ProfileHeader name email onSignOut />
 */

export function ProfileHeader({
  name,
  email,
  onSignOut,
}: {
  name: string;
  email: string;
  onSignOut: () => void;
}) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Your jazzfolio</p>
        <h1 className="font-heading text-4xl leading-none font-bold tracking-tight md:text-6xl">
          {name}
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">{email}</p>
      </div>
      <Button type="button" variant="outline" size="touch" onClick={onSignOut}>
        Sign out
      </Button>
    </header>
  );
}
