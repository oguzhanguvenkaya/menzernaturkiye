import { db } from "../src/db/index";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function verify() {
  const skus = ["22.203.261.001", "7.006.056.001", "26.906.099.001", "22.992.261.001", "22.828.281.001"];

  for (const sku of skus) {
    const [p] = await db.select().from(products).where(eq(products.sku, sku));
    if (p === undefined) {
      console.log(sku + ": NOT FOUND");
      continue;
    }

    const content = p.content as any;
    const gallery: string[] = content?.gallery || [];
    console.log(sku + ":");
    console.log("  image_url: " + (p.image_url || "NULL"));
    console.log("  gallery: " + gallery.length + " images");
    for (const g of gallery.slice(0, 2)) {
      console.log("    - " + g);
    }
    console.log();
  }

  // Summary
  const all = await db.select().from(products);
  let withImages = 0;
  let totalGallery = 0;
  let noImages = 0;
  for (const p of all) {
    const g = ((p.content as any)?.gallery as string[]) || [];
    if (p.image_url) withImages++;
    else noImages++;
    totalGallery += g.length;
  }

  console.log("=== SUMMARY ===");
  console.log("Products with main image: " + withImages + "/" + all.length);
  console.log("Products without image: " + noImages);
  console.log("Total gallery images: " + totalGallery);

  process.exit(0);
}
verify();
