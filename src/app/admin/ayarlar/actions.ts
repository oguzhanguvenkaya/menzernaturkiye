"use server";

import { revalidatePath } from "next/cache";
import { upsertSetting } from "@/db/queries";

const SETTING_KEYS = [
  "phone",
  "email",
  "address",
  "working_hours",
  "facebook_url",
  "instagram_url",
  "linkedin_url",
  "youtube_url",
] as const;

export async function saveSettingsAction(formData: FormData) {
  for (const key of SETTING_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string") {
      await upsertSetting(key, value);
    }
  }

  revalidatePath("/admin/ayarlar");
  revalidatePath("/");
}
