# Reading List

A small Next.js app that lists books, lets you toggle a book's read status,
and shows a detail view per book.

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run build` runs a
production build with no errors.

## How this fulfills each requirement

1. **Project setup — Next.js (App Router, v15), TypeScript, Tailwind, runs
   without errors.**
   Scaffolded with `create-next-app`, pinned to Next `15.5.24` (the
   scaffolder defaults to v16 — downgraded to match the v15 requirement).
   `npm run build` completes clean: type checks, lints, and generates all
   routes.

2. **A page with dynamic data, rendered on the server.**
   `/` (`app/page.tsx`) is a server component — no `"use client"`, no
   `useEffect`/fetch on the client. It reads all books from `lib/store.ts`
   at request time and renders the full grid server-side.

3. **Server action that changes something meaningful.**
   `toggleRead` in `app/actions.ts` (`"use server"`) flips a book between
   `Want to Read` and `Read`. It's wired straight to a `<form action={...}>`
   on the detail page — the mutation needs no client-side JavaScript — and
   calls `revalidatePath` on both `/` and the book's own detail route, so
   the status updates everywhere the moment you click, no manual refresh.

4. **Dynamic route showing a detail view for one item.**
   `/books/[id]` (`app/books/[id]/page.tsx`) reads the `id` route param,
   looks up that one book, and renders its full detail (blurb, rating,
   status, toggle button). An unknown id calls `notFound()` and renders a
   real Next.js 404 — verified by hitting `/books/does-not-exist`.

5. **README.**
   This file — run instructions, what each piece does, and assumptions
   below.

## What's in the codebase

| Path | Purpose |
|---|---|
| `data/books.ts` | Hand-written data set — 6 books with title, author, genre, year, rating, blurb, status |
| `lib/types.ts` | `Book` and `ReadStatus` types |
| `lib/store.ts` | In-memory store: `getBooks`, `getBook`, `toggleReadStatus` |
| `app/actions.ts` | The `toggleRead` server action |
| `app/page.tsx` | List page (server-rendered) |
| `app/books/[id]/page.tsx` | Detail page (dynamic route) |

## What I updated along the way

- Downgraded `next` / `eslint-config-next` from the scaffolder's default
  (v16) to `15.5.24` to match the stated v15 requirement.
- Fixed `eslint.config.mjs`: the pinned `eslint-config-next` version ships
  legacy (`.eslintrc`-style) exports, not flat-config exports, so
  `next build`'s lint step failed until the config was rewritten to bridge
  through `FlatCompat` (`@eslint/eslintrc`), the standard pattern Next.js
  itself recommends for this case.
- Removed the unused default `create-next-app` SVG placeholder icons
  (`public/*.svg`) — nothing in the app references them.
- Started with a purchase-order tracker as the dataset, then rebuilt around
  a simpler reading-list dataset instead — same architecture (server list
  page, server action, dynamic detail route), simpler domain.

## Assumptions

- **No persistence.** Status changes live in memory and reset on server
  restart — no database is in scope for an exercise this size.
- **Single viewer, no auth.** There's no login or per-user state; every
  visitor sees and can edit the same shared list.
- **Hand-written data, not a public API.** Keeps the demo self-contained
  with no network dependency or rate limits to worry about during review.
- **Every page is forced dynamic** (`export const dynamic = "force-dynamic"`)
  rather than statically generated, since the whole point is to show the
  server action's effect on freshly server-rendered data.
