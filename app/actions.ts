"use server";

import { revalidatePath } from "next/cache";
import { toggleReadStatus } from "@/lib/store";

export async function toggleRead(id: string) {
  const newStatus = toggleReadStatus(id);
  if (!newStatus) return;

  revalidatePath("/");
  revalidatePath(`/books/${id}`);
}
