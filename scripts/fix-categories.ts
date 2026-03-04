import { db } from "../src/db/index";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

// Endüstriyel: Kesici Cilalar = 439T, GW18, 113GZ, GW16
const KESICI_SKUS = [
  "6.008.056.001",   // 113GZ
  "7.001.056.001",   // 439T
  "12.001.056.001",  // GW18
];

// Boya Koruma ürünleri — sub_cat'i "Pasta Cila Ürünleri" altına taşı, sub_cat2="Boya Korumalar" yap
// Wax ve Sprey Cilalar da aynı şekilde Boya Korumalar altında kalacak

async function main() {
  const all = await db.select().from(products);

  let updated = 0;

  for (const p of all) {
    const cat = p.category as any;
    if (!cat) continue;

    let needsUpdate = false;
    const newCat = { ...cat };

    // 1. Endüstriyel → sub_cat assign
    if (cat.main_cat === "ENDÜSTRİYEL") {
      if (KESICI_SKUS.includes(p.sku)) {
        if (cat.sub_cat !== "Kesici Cilalar") {
          newCat.sub_cat = "Kesici Cilalar";
          newCat.sub_cat2 = "";
          needsUpdate = true;
        }
      } else {
        if (cat.sub_cat !== "Parlatıcı Cilalar") {
          newCat.sub_cat = "Parlatıcı Cilalar";
          newCat.sub_cat2 = "";
          needsUpdate = true;
        }
      }
    }

    // 2. Boya Koruma Ürünleri → move under Pasta Cila Ürünleri as sub_cat2
    if (cat.sub_cat === "Boya Koruma Ürünleri") {
      newCat.sub_cat = "Pasta Cila Ürünleri";
      newCat.sub_cat2 = "Boya Korumalar";
      needsUpdate = true;
    }

    if (needsUpdate) {
      await db
        .update(products)
        .set({ category: newCat })
        .where(eq(products.sku, p.sku));
      console.log(`  Updated ${p.sku}: ${JSON.stringify(newCat)}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} products.`);

  // Verify
  console.log("\n=== VERIFICATION ===");
  const verify = await db.select().from(products);
  const catCounts: Record<string, number> = {};
  for (const p of verify) {
    const c = p.category as any;
    const key = `${c.main_cat} > ${c.sub_cat || "(none)"} > ${c.sub_cat2 || "(none)"}`;
    catCounts[key] = (catCounts[key] || 0) + 1;
  }
  for (const [k, v] of Object.entries(catCounts).sort()) {
    console.log(`  ${k}: ${v}`);
  }

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
