import { db } from "../src/db/index";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  // 1. Update Sealing Wax from YENİ Sealing Wax Excel images
  const sealingWaxFixes: Record<string, { image_url: string; gallery: string[] }> = {
    "22.870.261.001": {
      image_url: "https://mtskimya.com//Resim/22080261001.jpg",
      gallery: [
        "https://mtskimya.com//Resim/22080261001_1.jpg",
        "https://mtskimya.com//Resim/22080261001_2.jpg",
        "https://mtskimya.com//Resim/22080261001_3.jpg",
        "https://mtskimya.com//Resim/22080261001_4.jpg",
      ],
    },
    "22.870.281.001": {
      image_url: "https://mtskimya.com//Resim/22080281001.jpg",
      gallery: [
        "https://mtskimya.com//Resim/22080281001_1.jpg",
        "https://mtskimya.com//Resim/22080281001_2.jpg",
        "https://mtskimya.com//Resim/22080281001_3.jpg",
        "https://mtskimya.com//Resim/22080281001_4.jpg",
      ],
    },
  };

  console.log("=== Fixing Sealing Wax images ===");
  for (const [sku, data] of Object.entries(sealingWaxFixes)) {
    const [existing] = await db.select().from(products).where(eq(products.sku, sku));
    if (!existing) { console.log(`  SKIP: ${sku} not found`); continue; }
    const content = { ...((existing.content || {}) as Record<string, any>), gallery: data.gallery };
    await db.update(products).set({ image_url: data.image_url, content: content as any }).where(eq(products.sku, sku));
    console.log(`  Updated ${sku}: main + ${data.gallery.length} gallery`);
  }

  // 2. Fix DB-only products (no Excel) — copy images from their size siblings
  const siblingFixes: { sku: string; siblingSku: string }[] = [
    // 2500 5lt → copy from 2500 1lt
    { sku: "22.828.251.001", siblingSku: "22.828.261.001" },
    // 300 250ml → copy from Cut Force Pro 250ml (same Heavy Cut line)
    { sku: "22.746.281.001", siblingSku: "22.203.281.001" },
    // Endless Shine 5lt → copy from Ceramic Spray (similar protection product)
    { sku: "22.747.251.001", siblingSku: "26.919.271.001" },
    // YENİ 400 5lt → copy from YENİ 400 1kg
    { sku: "22.202.251.001", siblingSku: "22.202.260.001" },
  ];

  console.log("\n=== Fixing sibling images ===");
  for (const fix of siblingFixes) {
    const [existing] = await db.select().from(products).where(eq(products.sku, fix.sku));
    const [sibling] = await db.select().from(products).where(eq(products.sku, fix.siblingSku));

    if (!existing) { console.log(`  SKIP: ${fix.sku} not found`); continue; }
    if (!sibling) { console.log(`  SKIP: sibling ${fix.siblingSku} not found`); continue; }

    const sibContent = (sibling.content || {}) as Record<string, any>;
    const sibGallery: string[] = sibContent.gallery || [];

    // Only update if the product currently has no/weak images
    const currentGallery = ((existing.content || {}) as any).gallery || [];
    const needsUpdate = !existing.image_url || currentGallery.length === 0;

    if (needsUpdate) {
      const content = { ...((existing.content || {}) as Record<string, any>), gallery: sibGallery };
      await db.update(products).set({ image_url: sibling.image_url, content: content as any }).where(eq(products.sku, fix.sku));
      console.log(`  Updated ${fix.sku} from sibling ${fix.siblingSku}: main + ${sibGallery.length} gallery`);
    } else {
      console.log(`  SKIP ${fix.sku}: already has images (main: ${existing.image_url?.slice(-30)}, gallery: ${currentGallery.length})`);
    }
  }

  // 3. Final verification
  console.log("\n=== FINAL VERIFICATION ===");
  const all = await db.select().from(products);
  let withImages = 0;
  let noImages = 0;
  let totalGallery = 0;

  for (const p of all) {
    const g = ((p.content as any)?.gallery as string[]) || [];
    totalGallery += g.length;
    if (p.image_url) withImages++;
    else {
      noImages++;
      console.log(`  NO IMAGE: ${p.sku} — ${p.product_name.slice(0, 50)}`);
    }
  }

  console.log(`\nProducts with images: ${withImages}/${all.length}`);
  console.log(`Products without images: ${noImages}`);
  console.log(`Total gallery images: ${totalGallery}`);

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
