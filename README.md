# Reading List

A small Next.js app that lists books, lets you toggle a book's read status,
and shows a detail view per book.

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's here

- **`/` — list page.** Server component (`app/page.tsx`) reads all books
  from `lib/store.ts` and renders them server-side — no client fetch, no
  loading state.
- **`/books/[id]` — detail route.** Dynamic route (`app/books/[id]/page.tsx`)
  looks up one book by its `id` param and renders its full blurb. An unknown
  id calls `notFound()` and renders the Next.js 404 page.
- **Server action.** `toggleRead` in `app/actions.ts` flips a book between
  `Want to Read` and `Read`. It's wired directly to a `<form action={...}>`
  on the detail page (no client JS needed for the mutation itself), and
  calls `revalidatePath` on both `/` and the book's detail route so the
  change shows up everywhere immediately.

## Data

`data/books.ts` is a small hand-written list of books. `lib/store.ts` holds
it in memory and exposes read/write helpers — no database, since state only
needs to survive for the life of the dev server.

## Assumptions

- No persistence: the read/unread state resets on server restart, since
  there's no database in scope for this exercise.
- No auth/multi-user concerns — this is a single-viewer list.
- Data set is static and hand-authored rather than pulled from a public API,
  to keep the demo self-contained and avoid a network dependency.
