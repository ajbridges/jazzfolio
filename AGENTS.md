<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Building with this design system

Rules for anyone — human or AI — writing UI in a project that uses this system.

## Tokens
- Use semantic utilities only: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, `text-success`, etc.
- Never hardcode colors (`#fff`, `bg-blue-500`, `text-gray-600`), and never use arbitrary values like `rounded-[7px]`.
- Need a color that doesn't exist? Add it to `tokens/tokens.json` in the design-system repo and release. Don't invent it locally.

## Components
- Import from `@/components/ui/*`. Don't re-create a component that already lives there (button, badge, input, table, dropdown menu, dialog, select, and the rest of the registry).
- Adjust layout with `className` (spacing, width). Don't override color or typography with `className`.
- Missing a variant? Add it to the component in the design-system repo, not in the app.

## Status → Badge mapping
| Meaning                          | Variant       |
| -------------------------------- | ------------- |
| Done, active, paid, healthy      | `success`     |
| Pending, at risk, needs review   | `warning`     |
| In progress, new, informational  | `info`        |
| Failed, blocked, overdue         | `destructive` |
| Draft, archived, unknown         | `neutral`     |

Use `dot` on badges in dense tables.

## Tables
- Build with `Table` + `TableHeader/Body/Row/Head/Cell`.
- Status columns use `Badge`. Row actions use `DropdownMenu` with a ghost icon `Button` trigger, aligned right.
- Right-align numbers and use `tabular-nums`.
- Every table needs an empty state.

## Before finishing any UI work
Run `node scripts/check-design-system.mjs` and fix everything it reports. It flags Tailwind palette colors (`bg-blue-500`, `text-gray-600`, `bg-white`), arbitrary colors (`bg-[#ff0000]`) and hardcoded hex, rgb or oklch values. Add `ds-ignore` to a line only for a deliberate, explained exception.
