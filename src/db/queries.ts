import { db } from "./index";
import { products, contactMessages, pageContents, siteSettings } from "./schema";
import { eq, ilike, or } from "drizzle-orm";

// --- Product queries ---

export async function getAllProducts() {
  return db.select().from(products);
}

export async function getProductBySku(sku: string) {
  const [product] = await db.select().from(products).where(eq(products.sku, sku));
  return product;
}

export async function searchProducts(query: string) {
  return db.select().from(products).where(
    or(
      ilike(products.product_name, `%${query}%`),
      ilike(products.sku, `%${query}%`)
    )
  );
}

export async function getProductsByCategory(mainCat: string) {
  const allProducts = await getAllProducts();
  return allProducts.filter(p => {
    const cat = p.category as any;
    return cat?.main_cat === mainCat || cat?.sub_cat === mainCat || cat?.sub_cat2 === mainCat;
  });
}

// --- Contact queries ---

export async function createContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const [inserted] = await db.insert(contactMessages).values(data).returning();
  return inserted;
}

// --- Page content queries ---

export async function getPageContents(slug: string) {
  return db.select().from(pageContents).where(eq(pageContents.slug, slug));
}

// --- Site settings queries ---

export async function getAllSettings() {
  const rows = await db.select().from(siteSettings);
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

export async function getSetting(key: string) {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
  return row?.value;
}
