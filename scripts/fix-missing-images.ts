import { db } from "../src/db/index";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

// Map old 1000 SKUs to YENİ 1000 images from Excel
const fixes: Record<string, { image_url: string; gallery: string[] }> = {
  "22.984.260.001": {
    image_url: "https://mtskimya.com//Resim/22210260001.jpg",
    gallery: [
      "https://mtskimya.com//Resim/22210260001_1.jpg",
      "https://mtskimya.com//Resim/22210260001_2.jpg",
      "https://mtskimya.com//Resim/22210260001_3.jpg",
      "https://mtskimya.com//Resim/22210260001_4.jpg",
      "https://mtskimya.com//Resim/22210260001_5.jpg",
    ],
  },
  "22.984.281.001": {
    image_url: "https://mtskimya.com//Resim/22210281001.jpg",
    gallery: [
      "https://mtskimya.com//Resim/22210281001_1.jpg",
      "https://mtskimya.com//Resim/22210281001_2.jpg",
      "https://mtskimya.com//Resim/22210281001_3.jpg",
      "https://mtskimya.com//Resim/22210281001_4.jpg",
      "https://mtskimya.com//Resim/22210281001_5.jpg",
    ],
  },
};

async function main() {
  for (const [sku, data] of Object.entries(fixes)) {
    const [existing] = await db.select().from(products).where(eq(products.sku, sku));
    if (!existing) {
      console.log(`SKIP: ${sku} not found`);
      continue;
    }

    const existingContent = (existing.content || {}) as Record<string, any>;
    const newContent = { ...existingContent, gallery: data.gallery };

    await db
      .update(products)
      .set({ image_url: data.image_url, content: newContent as any })
      .where(eq(products.sku, sku));

    console.log(`Updated ${sku}: main + ${data.gallery.length} gallery`);
  }

  console.log("Done!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
