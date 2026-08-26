const GENRE_SPINES: Record<string, string> = {
  Fantasy: "border-l-violet-400",
  "Science Fiction": "border-l-sky-400",
  "Literary Fiction": "border-l-rose-400",
};

const DEFAULT_SPINE = "border-l-neutral-300";

export function genreSpine(genre: string): string {
  return GENRE_SPINES[genre] ?? DEFAULT_SPINE;
}
