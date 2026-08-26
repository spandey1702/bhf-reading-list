import { books } from "@/data/books";
import type { Book, ReadStatus } from "@/lib/types";

// In-memory store for the demo. Resets on server restart; no DB needed for this scope.
const store: Book[] = books;

export function getBooks(): Book[] {
  return store;
}

export function getBook(id: string): Book | undefined {
  return store.find((b) => b.id === id);
}

export function toggleReadStatus(id: string): ReadStatus | undefined {
  const book = store.find((b) => b.id === id);
  if (!book) return undefined;
  book.status = book.status === "Read" ? "Want to Read" : "Read";
  return book.status;
}
