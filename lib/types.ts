export type ReadStatus = "Want to Read" | "Read";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  blurb: string;
  status: ReadStatus;
};
