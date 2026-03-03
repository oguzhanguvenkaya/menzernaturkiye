"use server";

import { revalidatePath } from "next/cache";
import { upsertPageContent, deletePageContent } from "@/db/queries";

export async function savePageContentAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const slug = formData.get("slug") as string;
  const section = formData.get("section") as string;
  const title = (formData.get("title") as string) || undefined;
  const body = (formData.get("body") as string) || undefined;
  const image_url = (formData.get("image_url") as string) || undefined;
  const order_index = Number(formData.get("order_index")) || 0;

  await upsertPageContent({
    ...(id ? { id } : {}),
    slug,
    section,
    title,
    body,
    image_url,
    order_index,
  });

  revalidatePath("/admin/sayfalar");
}

export async function deletePageContentAction(id: string) {
  await deletePageContent(id);
  revalidatePath("/admin/sayfalar");
}
