import Link from "next/link";
import { getBooks } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function Home() {
  const books = getBooks();
  const readCount = books.filter((b) => b.status === "Read").length;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Reading List
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {readCount} of {books.length} read
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/books/${book.id}`}
              className="group flex h-full flex-col justify-between rounded-lg border border-neutral-200 p-5 transition-colors hover:border-neutral-400"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-medium text-neutral-900 group-hover:underline underline-offset-2">
                    {book.title}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      book.status === "Read"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  {book.author} · {book.year}
                </p>
                <p className="mt-3 text-sm text-neutral-600 line-clamp-2">{book.blurb}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <span>{book.genre}</span>
                <span>★ {book.rating.toFixed(1)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
