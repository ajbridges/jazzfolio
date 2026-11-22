"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type SuggestKind = "venue-or-artist" | "venue" | "show"

const COPY: Record<SuggestKind, { title: string; description: string; nameLabel: string; placeholder: string }> = {
  "venue-or-artist": {
    title: "Suggest a venue or artist",
    description: "Tell us who or where to follow and we’ll start tracking it.",
    nameLabel: "Venue or artist",
    placeholder: "e.g. Keys Jazz Bistro",
  },
  venue: {
    title: "Suggest a venue",
    description: "A room in SF, Oakland, Berkeley or Stanford we should be watching.",
    nameLabel: "Venue",
    placeholder: "e.g. The Back Room, Berkeley",
  },
  show: {
    title: "Report a missing show",
    description: "If a show isn’t on the calendar, tell us what and where.",
    nameLabel: "Show",
    placeholder: "e.g. Kenny Barron Trio at Yoshi’s, Dec 4",
  },
}

const SuggestContext = React.createContext<(kind: SuggestKind) => void>(() => {})

export function useSuggest() {
  return React.useContext(SuggestContext)
}

export function SuggestProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = React.useState<SuggestKind>("venue-or-artist")
  const [open, setOpen] = React.useState(false)
  const copy = COPY[kind]

  const openWith = React.useCallback((k: SuggestKind) => {
    setKind(k)
    setOpen(true)
  }, [])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
    toast.success("Thanks! This preview doesn’t save suggestions yet.")
  }

  return (
    <SuggestContext.Provider value={openWith}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={submit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription>{copy.description}</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="suggest-name">{copy.nameLabel}</FieldLabel>
                <Input id="suggest-name" name="name" required placeholder={copy.placeholder} />
              </Field>
              <Field>
                <FieldLabel htmlFor="suggest-notes">Anything else? (optional)</FieldLabel>
                <Textarea id="suggest-notes" name="notes" placeholder="A link, a date, a set time" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SuggestContext.Provider>
  )
}

export function SuggestButton({
  kind,
  children,
  className,
  variant = "outline",
  size = "lg",
  ...rest
}: {
  kind: SuggestKind
  children: React.ReactNode
  className?: string
  variant?: "outline" | "ghost" | "secondary" | "default"
  size?: "default" | "lg" | "icon-lg"
  "aria-label"?: string
}) {
  const open = useSuggest()
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={() => open(kind)} {...rest}>
      {children}
    </Button>
  )
}
