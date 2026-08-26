import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "@/lib/store";
import { toggleRead } from "@/app/actions";
import { genreSpine } from "@/lib/genre-colors";

export default async function BookDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBook(id);

  if (!book) notFound();

  const boundToggle = toggleRead.bind(null, book.id);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800">
        ← Back to reading list
      </Link>

      <div
        className={`mt-6 rounded-lg border border-neutral-200 border-l-4 p-6 ${genreSpine(
          book.genre
        )}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              {book.title}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              {book.author} · {book.year} · {book.genre}
            </p>
          </div>
          <span className="shrink-0 text-sm text-neutral-500">★ {book.rating.toFixed(1)}</span>
        </div>

        <p className="mt-5 text-neutral-700 leading-relaxed">{book.blurb}</p>

        <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              book.status === "Read"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {book.status}
          </span>

          <form action={boundToggle}>
            <button
              type="submit"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                book.status === "Read"
                  ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  : "bg-neutral-900 text-white hover:bg-neutral-700"
              }`}
            >
              {book.status === "Read" ? "Mark as Want to Read" : "Mark as Read"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
