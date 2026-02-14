import fs from "fs";
import { db } from "../server/db";
import { products } from "../shared/schema";
import { eq, sql } from "drizzle-orm";

function parseMtsProductsCsv(filePath: string): Record<string, string[]> {
  const csv = fs.readFileSync(filePath, "utf-8");
  const lines = csv.split("\n");
  const result: Record<string, string[]> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(";");
    const sku = (parts[4] || "").trim();
    const imagesRaw = parts[6] || "";
    if (!sku || !imagesRaw) continue;

    const imgEntries = imagesRaw.split(" | ");
    const urls: string[] = [];
    for (const entry of imgEntries) {
      const urlMatch = entry.trim().match(/^(https?:\/\/[^\s!]+)/);
      if (urlMatch) urls.push(urlMatch[1].trim());
    }
    if (urls.length > 0) {
      result[sku] = urls;
    }
  }
  return result;
}

function parseBarcodeCsv(filePath: string): Record<string, string[]> {
  const csv = fs.readFileSync(filePath, "utf-8");
  const lines = csv.split("\n");
  const result: Record<string, string[]> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(";");
    const skuRaw = (parts[3] || "").trim();
    const img1 = (parts[10] || "").trim();
    const img2 = (parts[11] || "").trim();
    if (!skuRaw) continue;

    const sku = skuRaw.replace(/(\d{2})(\d{3})\.(\d{3})\.(\d{3})/, "$1.$2.$3.$4");

    const urls: string[] = [];
    if (img1 && img1.startsWith("http")) urls.push(img1);
    if (img2 && img2.startsWith("http")) urls.push(img2);
    
    if (urls.length > 0) {
      result[sku] = urls;
    }
  }
  return result;
}

function normalizeDbSku(csvSku: string): string {
  const cleaned = csvSku.replace(/\s/g, "");
  if (/^\d{5}\.\d{3}\.\d{3}$/.test(cleaned)) {
    return cleaned.replace(/^(\d{2})(\d{3})\.(\d{3})\.(\d{3})$/, "$1.$2.$3.$4");
  }
  return cleaned;
}

async function main() {
  console.log("Parsing mtsproducts CSV...");
  const mtsImages = parseMtsProductsCsv("attached_assets/mtsproducts_1771100340104.csv");
  console.log(`Found ${Object.keys(mtsImages).length} products with images in mtsproducts CSV`);

  console.log("Parsing barcode CSV...");
  const barcodeImages = parseBarcodeCsv("attached_assets/Products_with_barcode_1771100340105.csv");
  console.log(`Found ${Object.keys(barcodeImages).length} products with images in barcode CSV`);

  const allDbProducts = await db.select().from(products);
  console.log(`Found ${allDbProducts.length} products in database`);

  let matched = 0;
  let updated = 0;

  for (const product of allDbProducts) {
    const sku = product.sku;
    
    let galleryUrls: string[] = [];

    if (mtsImages[sku]) {
      galleryUrls = [...mtsImages[sku]];
    }

    const barcodeSkuVariants = [
      sku,
      sku.replace(/\./g, "").replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "$1$2.$3.$4"),
    ];

    for (const bSku of Object.keys(barcodeImages)) {
      const normalizedBSku = normalizeDbSku(bSku);
      if (normalizedBSku === sku) {
        const bUrls = barcodeImages[bSku];
        for (const url of bUrls) {
          if (!galleryUrls.includes(url)) {
            galleryUrls.push(url);
          }
        }
        break;
      }
    }

    if (galleryUrls.length > 1) {
      matched++;
      const content = (product.content as any) || {};
      content.gallery = galleryUrls;

      await db.update(products)
        .set({ content })
        .where(eq(products.sku, sku));
      updated++;
      console.log(`  ${sku}: ${galleryUrls.length} images stored`);
    }
  }

  console.log(`\nDone! Matched ${matched} products, updated ${updated} with gallery images.`);
  process.exit(0);
}

main().catch(console.error);
