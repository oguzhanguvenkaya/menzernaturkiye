/**
 * Update product images from Excel data.
 *
 * Usage:
 *   npx tsx scripts/update-images.ts --dry-run   (preview changes)
 *   npx tsx scripts/update-images.ts              (apply changes)
 */

import { db } from "../src/db/index";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

interface ImageUpdate {
  image_url: string;
  gallery: string[];
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  console.log(isDryRun ? "=== DRY RUN ===" : "=== APPLYING UPDATES ===");
  console.log();

  // Load update map
  const updatesPath = path.join(process.cwd(), "image-updates.json");
  const updates: Record<string, ImageUpdate> = JSON.parse(
    fs.readFileSync(updatesPath, "utf-8")
  );

  console.log(`Loaded ${Object.keys(updates).length} image updates\n`);

  // Backup current state
  const allProducts = await db.select().from(products);
  const backup: Record<string, { image_url: string | null; gallery: string[] }> = {};

  for (const p of allProducts) {
    const content = p.content as any;
    backup[p.sku] = {
      image_url: p.image_url,
      gallery: content?.gallery || [],
    };
  }

  if (!isDryRun) {
    fs.writeFileSync(
      path.join(process.cwd(), "image-backup.json"),
      JSON.stringify(backup, null, 2)
    );
    console.log("Backup saved to image-backup.json\n");
  }

  // Apply updates
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const [sku, data] of Object.entries(updates)) {
    const existing = allProducts.find((p) => p.sku === sku);
    if (!existing) {
      console.log(`  SKIP: ${sku} — not found in DB`);
      skipped++;
      continue;
    }

    const existingContent = (existing.content || {}) as Record<string, any>;

    // Build new content: keep ALL existing fields, only replace gallery
    const newContent = {
      ...existingContent,
      gallery: data.gallery,
    };

    if (isDryRun) {
      const oldGalleryCount = (existingContent.gallery || []).length;
      const oldMain = existing.image_url || "(none)";
      console.log(
        `  ${sku}: main ${oldMain.slice(-30)} → ${data.image_url.slice(-30)} | gallery ${oldGalleryCount} → ${data.gallery.length}`
      );
    } else {
      try {
        await db
          .update(products)
          .set({
            image_url: data.image_url,
            content: newContent as any,
          })
          .where(eq(products.sku, sku));
        updated++;
      } catch (e: any) {
        console.error(`  ERROR: ${sku} — ${e.message}`);
        errors++;
      }
    }
  }

  console.log();
  if (isDryRun) {
    console.log(`DRY RUN complete. ${Object.keys(updates).length} products would be updated.`);
  } else {
    console.log(`Done! Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`);
  }

  process.exit(0);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
