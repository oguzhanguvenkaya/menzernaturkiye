import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

// Load env
const envFile = readFileSync(".env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL must be set");
const client = neon(DATABASE_URL);
const db = drizzle(client);

// Translation map: base SKU prefix -> { subtitle_tr, description_tr }
// Variant products (same base with .261/.281/.251) share the same translation
const translations: Record<string, { subtitle_tr: string; description_tr?: string }> = {
  // 22.029 — Classic high-gloss polish
  "22.029": {
    subtitle_tr: "Mükemmel parlaklık için klasik yüksek parlaklıklı cila",
    description_tr:
      "Bu standart yüksek parlaklıklı cila, benzersiz nano bileşikleri sayesinde dairesel çizikleri ve oto yıkama çiziklerini giderir. Tüm renklerde üstün parlaklık sağlar ve kolay uygulanabilir yapısıyla profesyonel sonuçlar sunar.",
  },
  // 22.070 — Polymer sealant
  "22.070": {
    subtitle_tr: "Tüm otomotiv vernikleri için polimer koruyucu",
    description_tr:
      "Tüm otomotiv verniklerine uygun, uzun süreli koruma sağlayan polimer bazlı koruyucu. Boyayı dış etkenlere karşı korurken derin bir parlaklık katmanı oluşturur. Kolay uygulama ve uzun ömürlü koruma sunar.",
  },
  // 22.200 — Innovative polish (scratch removal + gloss without silicone)
  "22.200": {
    subtitle_tr: "Silikon içermeden çizik giderme ve parlaklık sağlayan yenilikçi oto cilası",
    description_tr:
      "Çizikleri giderirken aynı anda yüksek parlaklık oluşturan yenilikçi formüle sahip oto cilası. Silikon içermeyen yapısıyla güvenle uygulanabilir. Orta seviye çiziklerde etkili sonuç sağlar ve profesyonel kullanım için idealdir.",
  },
  // 22.203 — The Gold Standard in Paint Repair
  "22.203": {
    subtitle_tr: "Boya onarımında altın standart",
    description_tr:
      "Boya onarımında altın standart olarak kabul edilen profesyonel pasta. Derin çizikleri ve kusurları etkili bir şekilde gidererek mükemmel bir yüzey kalitesi sağlar. Profesyonel detaycıların ilk tercihi olan bu ürün, üstün kesme gücü ve parlaklık performansı sunar.",
  },
  // 22.746 — Ultimate abrasive polish for maximum sanding removal
  "22.746": {
    subtitle_tr: "Maksimum zımpara izi giderme için geliştirilmiş üstün aşındırıcı pasta",
    description_tr:
      "Zımpara izlerini maksimum verimlilikle gidermek için daha da geliştirilmiş üstün aşındırıcı pasta. Yüksek kesme gücüyle derin zımpara izlerini hızla ortadan kaldırır. Gelişmiş formülü sayesinde daha az çalışma süresiyle profesyonel sonuçlar elde edilir.",
  },
  // 22.748 — Medium Cut polish – high-gloss finish and seal in one
  "22.748": {
    subtitle_tr: "Orta kesme cilası — tek adımda yüksek parlaklık ve koruma",
    description_tr:
      "Orta kesme gücüne sahip bu cila, tek adımda yüksek parlaklık ve koruma sağlar. Çizik giderme ve koruyucu katman oluşturma işlemlerini tek üründe birleştirir. Zaman tasarrufu sağlarken profesyonel düzeyde sonuçlar sunar.",
  },
  // 22.771 — Liquid fine abrasive polish for moderately deep scratches
  "22.771": {
    subtitle_tr: "Orta derinlikteki çiziklerin giderilmesi için sıvı ince aşındırıcı cila",
    description_tr:
      "Orta derinlikteki çizikleri gidermek için tasarlanmış sıvı formda ince aşındırıcı cila. Hassas aşındırıcı yapısıyla yüzeyde minimum iz bırakarak çizikleri etkili bir şekilde ortadan kaldırır. Sonraki polisaj adımlarına mükemmel bir temel hazırlar.",
  },
  // 22.828 — Glossy fine abrasive polish for moderately deep scratches
  "22.828": {
    subtitle_tr: "Orta derinlikteki çiziklerin giderilmesi için parlak ince aşındırıcı cila",
    description_tr:
      "Orta derinlikteki çiziklerin giderilmesi için geliştirilmiş parlak ince aşındırıcı cila. Çizik giderirken aynı anda parlak bir yüzey oluşturur. Gelişmiş aşındırıcı teknolojisi sayesinde verimli çalışır ve profesyonel sonuçlar sağlar.",
  },
  // 22.870 — Standard coat sealant
  "22.870": {
    subtitle_tr: "Standart vernik koruyucu",
    description_tr:
      "Standart vernik yüzeyler için geliştirilmiş koruyucu. Boya yüzeyinde uzun süreli bir koruma katmanı oluşturarak dış etkenlere karşı dayanıklılık sağlar. Kolay uygulanabilir yapısıyla profesyonel ve amatör kullanıma uygundur.",
  },
  // 22.911 — High-gloss polish for a perfect mirror finish
  "22.911": {
    subtitle_tr: "Mükemmel ayna parlaklığı için yüksek parlaklıklı cila",
    description_tr:
      "Mükemmel bir ayna parlaklığı elde etmek için tasarlanmış yüksek parlaklıklı cila. Ultra ince aşındırıcı partikülleri sayesinde kusursuz bir yüzey oluşturur. Son polisaj adımı olarak uygulandığında olağanüstü derin parlaklık sağlar.",
  },
  // 22.930 — Speedy removal of deep scratches using lambswool polishing pads
  "22.930": {
    subtitle_tr: "Kuzu yünü polisaj pedleriyle derin çiziklerin hızlı giderilmesi için oto cilası",
    description_tr:
      "Kuzu yünü polisaj pedleriyle birlikte kullanılarak derin çiziklerin hızlı bir şekilde giderilmesini sağlayan oto cilası. Yüksek kesme gücüyle derin çizikleri ve zımpara izlerini etkili bir şekilde ortadan kaldırır. Kuzu yünü pedlerle optimum performans için özel olarak formüle edilmiştir.",
  },
  // 22.984 — Speedy removal of deep scratches using foam polishing pads
  "22.984": {
    subtitle_tr: "Sünger polisaj pedleriyle derin çiziklerin hızlı giderilmesi için oto cilası",
    description_tr:
      "Sünger polisaj pedleriyle birlikte kullanılarak derin çiziklerin hızlı bir şekilde giderilmesini sağlayan oto cilası. Yüksek kesme gücü sayesinde derin çizikleri ve zımpara izlerini verimli bir şekilde giderir. Sünger pedlerle optimum performans için özel olarak formüle edilmiştir.",
  },
  // 22.992 — High-gloss polish for maximum deep shine
  "22.992": {
    subtitle_tr: "Maksimum derin parlaklık için yüksek parlaklıklı cila",
    description_tr:
      "Maksimum derin parlaklık elde etmek için geliştirilmiş yüksek parlaklıklı cila. Ultra ince aşındırıcı teknolojisi sayesinde benzersiz bir derinlik ve parlaklık sağlar. Tüm renklerde mükemmel sonuçlar verir ve profesyonel detaylama çalışmalarının vazgeçilmez son adımıdır.",
  },
  // 23.003 — Versatile Metal Polish
  "23.003": {
    subtitle_tr: "Çok yönlü metal cilası: metal yüzeyler için parlaklık",
    description_tr:
      "Metal yüzeylerde üstün parlaklık sağlayan çok yönlü metal cilası. Krom, alüminyum, paslanmaz çelik ve diğer metal yüzeylerde etkili temizlik ve parlatma performansı sunar. Oksidasyonu giderir ve uzun süreli parlak bir yüzey oluşturur.",
  },
  // 24.011 — Medium Cut polish – high-gloss finish and seal in one (same as 22.748 concept)
  "24.011": {
    subtitle_tr: "Orta kesme cilası — tek adımda yüksek parlaklık ve koruma",
    description_tr:
      "Orta kesme gücüne sahip bu cila, tek adımda yüksek parlaklık ve koruyucu katman sağlar. Çizik giderme ve koruma işlemlerini tek üründe birleştirerek zaman ve işçilik tasarrufu sunar. Profesyonel düzeyde sonuçlar için idealdir.",
  },
  // 26.919 — Universal spray sealant
  "26.919": {
    subtitle_tr: "Tüm araçlar için evrensel sprey koruyucu",
    description_tr:
      "Tüm araç tipleri için uygun evrensel sprey koruyucu. Hızlı ve kolay uygulama ile boya yüzeyinde etkili bir koruma katmanı oluşturur. Sprey formülü sayesinde pratik kullanım sunar ve parlak, kaygan bir yüzey bırakır.",
  },
};

// Map SKU to base key
function getBaseKey(sku: string): string | null {
  // SKU format: 22.029.261.001 -> base = "22.029"
  const parts = sku.split(".");
  if (parts.length >= 2) {
    return `${parts[0]}.${parts[1]}`;
  }
  return null;
}

// Target SKUs
const targetSkus = [
  "22.029.261.001",
  "22.029.281.001",
  "22.070.261.001",
  "22.070.281.001",
  "22.200.261.001",
  "22.200.281.001",
  "22.203.261.001",
  "22.203.281.001",
  "22.746.281.001",
  "22.748.261.001",
  "22.748.281.001",
  "22.771.261.001",
  "22.828.251.001",
  "22.828.261.001",
  "22.828.281.001",
  "22.870.261.001",
  "22.870.281.001",
  "22.911.261.001",
  "22.930.261.001",
  "22.984.260.001",
  "22.984.281.001",
  "22.992.251.001",
  "22.992.261.001",
  "22.992.281.001",
  "23.003.391.001",
  "24.011.261.080",
  "26.919.271.001",
];

async function main() {
  console.log("Starting translation of menzerna_scrape subtitle & description...\n");

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const sku of targetSkus) {
    const baseKey = getBaseKey(sku);
    if (!baseKey || !translations[baseKey]) {
      console.log(`  SKIP: No translation for ${sku} (base: ${baseKey})`);
      skipped++;
      continue;
    }

    const translation = translations[baseKey];

    // Fetch the product
    const rows = await (db.select().from(products).where(eq(products.sku, sku)) as any);
    if (!rows || rows.length === 0) {
      console.log(`  ERROR: Product not found: ${sku}`);
      errors++;
      continue;
    }

    const product = rows[0];
    const content = product.content || {};
    const scrape = content.menzerna_scrape || {};

    // Show current values
    console.log(`  ${sku}: "${scrape.subtitle?.substring(0, 60)}..."`);

    // Update subtitle and description with Turkish translations
    // Keep subtitle_en and description_en as-is
    scrape.subtitle = translation.subtitle_tr;
    if (translation.description_tr) {
      scrape.description = translation.description_tr;
    }

    const updatedContent = {
      ...content,
      menzerna_scrape: scrape,
    };

    await (db
      .update(products)
      .set({ content: updatedContent } as any)
      .where(eq(products.sku, sku)) as any);

    console.log(`    -> TR subtitle: "${translation.subtitle_tr.substring(0, 60)}..."`);
    updated++;
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
