import { db } from "./index";
import {
  products,
  contactMessages,
  pageContents,
  siteSettings,
  type InsertProduct,
} from "./schema";
import { eq, ilike, or, desc, sql } from "drizzle-orm";

// --- Product queries ---

export async function getAllProducts() {
  return db.select().from(products);
}

export async function getProductById(id: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id));
  return product;
}

export async function getProductBySku(sku: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.sku, sku));
  return product;
}

export async function searchProducts(query: string) {
  return db
    .select()
    .from(products)
    .where(
      or(
        ilike(products.product_name, `%${query}%`),
        ilike(products.sku, `%${query}%`)
      )
    );
}

export async function getProductsByCategory(mainCat: string) {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => {
    const cat = p.category as any;
    return (
      cat?.main_cat === mainCat ||
      cat?.sub_cat === mainCat ||
      cat?.sub_cat2 === mainCat
    );
  });
}

export async function createProduct(data: InsertProduct) {
  const [inserted] = await db.insert(products).values(data).returning();
  return inserted;
}

export async function updateProduct(
  id: string,
  data: Partial<InsertProduct>
) {
  const [updated] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return updated;
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
}

// --- Contact queries ---

export async function createContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const [inserted] = await db
    .insert(contactMessages)
    .values(data)
    .returning();
  return inserted;
}

export async function getAllContactMessages() {
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
}

export async function deleteContactMessage(id: string) {
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}

// --- Page content queries ---

export async function getPageContents(slug: string) {
  return db.select().from(pageContents).where(eq(pageContents.slug, slug));
}

export async function getAllPageContents() {
  return db.select().from(pageContents).orderBy(pageContents.slug);
}

export async function upsertPageContent(data: {
  id?: string;
  slug: string;
  section: string;
  title?: string;
  body?: string;
  image_url?: string;
  order_index?: number;
}) {
  if (data.id) {
    const [updated] = await db
      .update(pageContents)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pageContents.id, data.id))
      .returning();
    return updated;
  }
  const [inserted] = await db.insert(pageContents).values(data).returning();
  return inserted;
}

export async function deletePageContent(id: string) {
  await db.delete(pageContents).where(eq(pageContents.id, id));
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

export async function getAllSettingsRows() {
  return db.select().from(siteSettings);
}

export async function getSetting(key: string) {
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key));
  return row?.value;
}

export async function upsertSetting(key: string, value: string) {
  const existing = await getSetting(key);
  if (existing !== undefined) {
    await db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }
}

// --- Stats ---

export async function getAdminStats() {
  const [productCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products);
  const [messageCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactMessages);
  const [pageCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(pageContents);
  return {
    products: Number(productCount.count),
    messages: Number(messageCount.count),
    pages: Number(pageCount.count),
  };
}
