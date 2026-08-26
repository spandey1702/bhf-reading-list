"use server";

import { revalidatePath } from "next/cache";
import { toggleStatus } from "@/lib/store";

export async function toggleApproval(id: string) {
  const newStatus = toggleStatus(id);
  if (!newStatus) return;

  revalidatePath("/");
  revalidatePath(`/po/${id}`);
}
