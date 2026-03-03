import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { readFileSync } from "fs";
import { products, siteSettings } from "../src/db/schema";
import { sql } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const client = neon(DATABASE_URL);
const db = drizzle(client);

async function seed() {
  console.log("Seeding database...");

  // Tabloları temizle (fresh seed)
  await db.delete(products);
  await db.delete(siteSettings);
  console.log("✓ Tablolar temizlendi");

  // 1. Ürünleri yükle
  const productsData = JSON.parse(readFileSync("products.json", "utf-8"));
  console.log(`${productsData.length} ürün yüklenecek...`);

  // Batch insert (10'arlı gruplar — Neon HTTP sınırı)
  const batchSize = 10;
  for (let i = 0; i < productsData.length; i += batchSize) {
    const batch = productsData.slice(i, i + batchSize);
    const values = batch.map((p: any) => ({
      id: p.id,
      sku: p.sku,
      barcode: p.barcode,
      brand: p.brand,
      product_name: p.product_name,
      price: p.price,
      image_url: p.image_url,
      source_file: p.source_file,
      template_group: p.template_group,
      template_sub_type: p.template_sub_type,
      category: p.category,
      content: p.content,
      template_fields: p.template_fields,
      relations: p.relations,
      faq: p.faq,
    }));
    await db.insert(products).values(values);
    console.log(`  ${Math.min(i + batchSize, productsData.length)}/${productsData.length} ürün yüklendi`);
  }
  console.log("✓ Tüm ürünler yüklendi");

  // 2. Site ayarlarını yükle
  const defaultSettings = [
    { key: "phone", value: "+90 (312) 000 00 00" },
    { key: "email", value: "info@mgpolisaj.com" },
    { key: "address", value: "Ankara, Türkiye" },
    { key: "working_hours", value: "Pazartesi - Cuma: 09:00 - 18:00" },
    { key: "facebook", value: "https://facebook.com/mgpolisaj" },
    { key: "instagram", value: "https://instagram.com/mgpolisaj" },
    { key: "linkedin", value: "" },
    { key: "youtube", value: "" },
  ];
  await db.insert(siteSettings).values(defaultSettings);
  console.log("✓ Site ayarları yüklendi");

  console.log("\nSeed tamamlandı!");
}

seed().catch(console.error);
