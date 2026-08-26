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

## Flow

1. **Request `/`.** `app/page.tsx` runs on the server, calls
   `getBooks()` (`lib/store.ts`), and renders the full card grid as HTML.
   No client fetch, no loading state — the browser receives the finished
   page. This route is statically prerendered and only re-rendered when
   something explicitly invalidates it (step 4).
2. **Click a book.** Navigates to `/books/[id]`. The server reads the `id`
   param, calls `getBook(id)`, and renders that one book's detail — or
   calls `notFound()` if the id doesn't match anything, producing a real
   404.
3. **Click "Mark as Read" / "Mark as Want to Read."** The button is inside
   a `<form action={toggleRead.bind(null, book.id)}>`. Submitting it invokes
   the `toggleRead` server action (`app/actions.ts`) directly on the
   server — no client-side fetch or API route involved.
4. **The action mutates and revalidates.** `toggleRead` calls
   `toggleReadStatus(id)` in the store, which flips the book's status in
   the in-memory array, then calls `revalidatePath("/")` and
   `revalidatePath("/books/[id]")`. That purges the cached render for both
   routes.
5. **Everything reflects the change immediately.** The next request to
   either route (including the one Next.js triggers automatically to
   refresh the page you're on) re-runs step 1 or 2 with the updated store,
   so the badge and read count are correct with no manual reload and no
   client state to keep in sync by hand.

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
| `app/page.tsx` | List page |
| `app/books/[id]/page.tsx` | Detail page (dynamic route) |

## Design decisions

- For "pick your own data," I went with a reading list — small enough to
  stay reviewable in a few minutes, but with enough real fields (genre,
  rating, status, blurb) to make the list and detail views feel like an
  actual product rather than a placeholder.
- I split the app the way I'd want to hand it off: `data/` for the raw
  content, `lib/types.ts` for the shape of it, `lib/store.ts` for the one
  place that reads and mutates it, `app/actions.ts` for the single server
  action, and the two route files for presentation only. Nothing reaches
  into the data layer except through `lib/store.ts`.
- The server action is wired straight to a `<form action={...}>` rather
  than a client `onClick` handler, since the mutation itself doesn't need
  any client-side JavaScript — keeping it a server action end-to-end felt
  truer to what the exercise is asking for than adding a client component
  just to call it.
- For the UI bonus, I picked one idea and committed to it — a genre-colored
  spine accent that carries from the list cards into the detail view —
  instead of scattering a handful of smaller, unrelated visual tweaks.
- I committed in small, reviewable steps per feature/decision rather than
  one large commit, so the history itself shows how the app was built up.
- Before calling it done, I verified the exact pushed state, not just my
  local copy — cloned the repo fresh, ran `npm ci` and a production build,
  and clicked through the real flow in a browser.

## Assumptions

- **No persistence.** Status changes live in memory and reset on server
  restart, no database is in scope for an exercise this size.
- **Single viewer, no auth.** There's no login or per-user state as of now
- **Hand-written data, not a public API.** Keeps the demo self-contained
  with no network dependency or rate limits to worry about during review.
