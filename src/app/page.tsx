import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <Badge variant="info">Bay Area</Badge>
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-medium tracking-tight">
          Jazzfolio
        </h1>
        <p className="text-lg text-muted-foreground">
          Live jazz in San Francisco, Oakland, Berkeley, and Stanford. Design
          explorations live on this branch.
        </p>
      </div>
      <a
        className={buttonVariants({ variant: "default", size: "lg" })}
        href="https://github.com/ajbridges/design-system"
      >
        Design system v0.1.0
      </a>
    </main>
  );
}
