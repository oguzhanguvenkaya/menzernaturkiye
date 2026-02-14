import pg from "pg";
import { getUrlKeyForProduct, menzernaUrlMap } from "./menzerna-url-map";
import scrapedData from "./scraped-menzerna-data.json";

const { Pool } = pg;

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const { rows: products } = await pool.query(
    "SELECT id, sku, product_name, content, template_fields FROM products"
  );

  console.log(`Found ${products.length} products in database`);

  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const urlKey = getUrlKeyForProduct(product.product_name || "", product.sku || "");
    if (!urlKey) {
      console.log(`  SKIP: No URL key for ${product.product_name}`);
      skipped++;
      continue;
    }

    const data = (scrapedData as any)[urlKey];
    if (!data) {
      console.log(`  SKIP: No scraped data for key=${urlKey} (${product.product_name})`);
      skipped++;
      continue;
    }

    const content = product.content || {};
    const templateFields = product.template_fields || {};

    const menzernaScrape: any = {};

    if (data.description_subtitle) {
      menzernaScrape.subtitle = data.description_subtitle;
    }
    if (data.description_subtitle_en) {
      menzernaScrape.subtitle_en = data.description_subtitle_en;
    }
    if (data.description_text) {
      menzernaScrape.description = data.description_text;
    }
    if (data.description_text_en) {
      menzernaScrape.description_en = data.description_text_en;
    }
    if (data.processing) {
      menzernaScrape.processing = data.processing;
    }
    if (data.steps && data.steps.length > 0) {
      menzernaScrape.steps = data.steps;
    }
    if (data.optimised_for && data.optimised_for.length > 0) {
      menzernaScrape.optimised_for = data.optimised_for;
    }
    if (data.benefits && data.benefits.length > 0) {
      menzernaScrape.benefits = data.benefits;
    }
    if (data.benefits_en && data.benefits_en.length > 0) {
      menzernaScrape.benefits_en = data.benefits_en;
    }
    if (data.recommended_usage && data.recommended_usage.length > 0) {
      menzernaScrape.recommended_usage = data.recommended_usage;
    }
    if (data.recommended_usage_en && data.recommended_usage_en.length > 0) {
      menzernaScrape.recommended_usage_en = data.recommended_usage_en;
    }

    const updatedContent = {
      ...content,
      menzerna_scrape: menzernaScrape,
    };

    if (data.url) {
      (updatedContent as any).menzerna_url = data.url;
    }

    await pool.query(
      "UPDATE products SET content = $1 WHERE id = $2",
      [JSON.stringify(updatedContent), product.id]
    );

    updated++;
    console.log(`  OK: ${product.product_name} -> ${urlKey}`);
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
  await pool.end();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
