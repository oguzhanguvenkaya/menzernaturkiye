import fs from "fs";
import path from "path";
import { db } from "./db";
import { products } from "@shared/schema";
import { sql } from "drizzle-orm";

async function seed() {
  const jsonPath = path.join(process.cwd(), "client/public/data/menzerna_urunler_raw_1771053380132.json");
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const items = raw.products || raw;

  console.log(`Found ${items.length} products to seed`);

  const existing = await db.select({ count: sql<number>`count(*)` }).from(products);
  if (Number(existing[0].count) > 0) {
    console.log("Database already has products, skipping seed");
    process.exit(0);
  }

  for (const item of items) {
    await db.insert(products).values({
      sku: item.sku,
      barcode: item.barcode || null,
      brand: item.brand || "MENZERNA",
      product_name: item.product_name,
      price: item.price || 0,
      image_url: item.image_url || null,
      source_file: item.source_file || null,
      template_group: item.template_group || null,
      template_sub_type: item.template_sub_type || null,
      category: item.category,
      content: item.content || null,
      template_fields: item.template_fields || null,
      relations: item.relations || null,
      faq: item.faq || null,
    }).onConflictDoNothing();
  }

  console.log(`Seeded ${items.length} products successfully`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
