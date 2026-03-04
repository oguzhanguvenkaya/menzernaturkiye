import { db } from "../src/db/index";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function check() {
  const skus = ["22.203.281.001", "22.828.281.001", "22.200.281.001", "22.992.261.001"];
  for (const sku of skus) {
    const [p] = await db.select().from(products).where(eq(products.sku, sku));
    if (p === undefined) continue;
    const content = p.content as any;
    const gallery: string[] = content?.gallery || [];
    console.log(sku + ": image_url=" + (p.image_url ? "YES" : "NO") + " gallery=" + gallery.length);
    console.log("  main: " + (p.image_url || "").slice(-40));
    gallery.forEach((g: string, i: number) => console.log("  g[" + i + "]: " + g.slice(-40)));
    console.log();
  }
  process.exit(0);
}
check();
