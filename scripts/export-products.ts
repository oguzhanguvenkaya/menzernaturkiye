import { writeFileSync } from "fs";
import { resolve } from "path";
import { db } from "../src/db";
import { products } from "../src/db/schema";

async function main() {
  const rows = await db.select().from(products);
  const outPath = resolve(process.cwd(), "products-export.json");
  writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf-8");
  console.log(`Exported ${rows.length} products -> ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
