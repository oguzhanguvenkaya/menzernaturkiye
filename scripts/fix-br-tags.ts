/**
 * fix-br-tags.ts
 *
 * full_description alanlarindaki <br>, <br/>, <br />, <b>, </b>, <strong>, </strong>,
 * &nbsp; etiketlerini temizler ve \n karakterlerine donusturur.
 *
 * Calistirmak icin: npx tsx scripts/fix-br-tags.ts
 */

import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "../src/db/schema";
import { eq, sql } from "drizzle-orm";

// .env.local dosyasini oku
const envFile = readFileSync(".env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL must be set");

const client = neon(DATABASE_URL);
const db = drizzle(client);

function cleanHtmlTags(text: string): string {
  let cleaned = text;

  // Triple <br> variants -> paragraph break
  cleaned = cleaned.replace(/(<br\s*\/?>[\s]*){3,}/gi, "\n\n");

  // Double <br> variants -> paragraph break
  cleaned = cleaned.replace(/(<br\s*\/?>[\s]*){2}/gi, "\n\n");

  // Single <br> variants -> line break
  cleaned = cleaned.replace(/<br\s*\/?>/gi, "\n");

  // Remove <b>, </b>, <strong>, </strong> tags
  cleaned = cleaned.replace(/<\/?b>/gi, "");
  cleaned = cleaned.replace(/<\/?strong>/gi, "");

  // &nbsp; -> space
  cleaned = cleaned.replace(/&nbsp;/gi, " ");

  // "o " at start of lines -> "- " (sub-bullet from copy-paste)
  cleaned = cleaned.replace(/^o /gm, "- ");

  // Clean up excessive whitespace on lines (but preserve newlines)
  cleaned = cleaned.replace(/[ \t]+$/gm, ""); // trailing whitespace per line
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n"); // max 2 consecutive newlines

  return cleaned.trim();
}

async function main() {
  console.log("full_description alanlarindaki <br> etiketleri temizleniyor...\n");

  // <br> iceren tum urunleri bul
  const allProducts = await (db.select({
    id: products.id,
    sku: products.sku,
    product_name: products.product_name,
    content: products.content,
  }).from(products) as any);

  const productsWithBr = allProducts.filter((p: any) => {
    const desc = p.content?.full_description;
    return desc && (/<br/i.test(desc) || /&nbsp;/i.test(desc) || /<\/?b>/i.test(desc) || /<\/?strong>/i.test(desc));
  });

  console.log(`Toplam ${allProducts.length} urun bulundu.`);
  console.log(`${productsWithBr.length} urunde <br> / &nbsp; / <b> etiketi tespit edildi.\n`);

  if (productsWithBr.length === 0) {
    console.log("Temizlenecek urun yok. Cikiliyor.");
    return;
  }

  let updated = 0;
  for (const product of productsWithBr) {
    const oldDesc = product.content.full_description;
    const newDesc = cleanHtmlTags(oldDesc);

    if (oldDesc === newDesc) {
      console.log(`  [SKIP] ${product.sku} - degisiklik yok`);
      continue;
    }

    // Mevcut content'i koru, sadece full_description'i guncelle
    const updatedContent = {
      ...product.content,
      full_description: newDesc,
    };

    await (db.update(products)
      .set({ content: updatedContent } as any)
      .where(eq(products.sku, product.sku)) as any);

    console.log(`  [OK] ${product.sku} - ${product.product_name}`);

    // Degisikligi goster (ilk 120 karakter)
    const preview = newDesc.substring(0, 120).replace(/\n/g, "\\n");
    console.log(`        Onizleme: ${preview}...`);
    updated++;
  }

  console.log(`\nTamamlandi! ${updated} urun guncellendi.`);
}

main().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
