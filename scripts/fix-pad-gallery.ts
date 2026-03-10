import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

const envFile = readFileSync(".env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL must be set");

const client = neon(DATABASE_URL);
const db = drizzle(client);

const galleries: Record<string, string[]> = {
  "26.900.223.010": [
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010_1.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010_2.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010_3.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010_4.jpg?v=1",
  ],
  "26.900.223.011": [
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011_1.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011_2.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011_3.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011_4.jpg?v=1",
  ],
  "26.900.223.012": [
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_1.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_2.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_3.jpg?v=1",
    "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_4.jpg?v=1",
  ],
};

async function fix() {
  for (const [sku, gallery] of Object.entries(galleries)) {
    const [existing] = await db.select().from(products).where(eq(products.sku, sku));
    if (!existing) {
      console.log(`⚠ ${sku} bulunamadı`);
      continue;
    }

    const currentContent = (existing.content as Record<string, unknown>) || {};
    const updatedContent = {
      ...currentContent,
      gallery,
    };

    await db
      .update(products)
      .set({
        image_url: gallery[0],
        content: updatedContent as any,
      })
      .where(eq(products.sku, sku));

    console.log(`✓ ${sku}: ${gallery.length} görsel eklendi`);
  }
  console.log("\nTamamlandı!");
}

fix().catch(console.error);
