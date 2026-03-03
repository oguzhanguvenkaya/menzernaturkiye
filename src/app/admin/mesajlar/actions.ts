"use server";

import { revalidatePath } from "next/cache";
import { deleteContactMessage } from "@/db/queries";

export async function deleteMessageAction(id: string) {
  await deleteContactMessage(id);
  revalidatePath("/admin/mesajlar");
}
