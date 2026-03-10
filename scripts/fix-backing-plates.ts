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

// Doğru tabanlık eşleştirmesi:
// 95mm pad → Max 95mm
// 150mm pad (base 130) → Max 150mm
// 130/150mm yeni pedler (26.900.223.0xx) → Max 130mm
// Diğerleri → Max <diameter>mm
function getCorrectBacking(
  diameter_mm: number | undefined,
  base_diameter_mm: number | undefined,
  sku: string
): string | null {
  if (!diameter_mm) return null;
  // Yeni 130/150mm pedler — tabanlık taban çapıyla sınırlı
  if (sku.startsWith("26.900.223.0") && diameter_mm === 150 && base_diameter_mm === 130) {
    return "Max 130mm";
  }
  // Diğer tüm pedler — tabanlık = sünger çapı
  return `Max ${diameter_mm}mm`;
}

async function fix() {
  console.log("Tabanlık bilgilerini düzeltiyorum...\n");

  const allPads = await db
    .select()
    .from(products)
    .where(eq(products.template_group, "polishing_pad"));

  for (const pad of allPads) {
    const tf = (pad.template_fields as Record<string, unknown>) || {};
    const correct = getCorrectBacking(
      tf.diameter_mm as number | undefined,
      tf.base_diameter_mm as number | undefined,
      pad.sku
    );
    if (correct && tf.suitable_backing_plate !== correct) {
      await db
        .update(products)
        .set({ template_fields: { ...tf, suitable_backing_plate: correct } as any })
        .where(eq(products.sku, pad.sku));
      console.log(`✓ ${pad.sku}: ${tf.suitable_backing_plate} → ${correct}`);
    } else {
      console.log(`- ${pad.sku}: OK (${tf.suitable_backing_plate})`);
    }
  }
  console.log("\nTamamlandı!");
}

fix().catch(console.error);
