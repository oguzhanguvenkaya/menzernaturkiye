import {
  type Product, type InsertProduct,
  type ContactMessage, type InsertContactMessage,
  products, contactMessages
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProductBySku(sku: string): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;
  getProductsByCategory(mainCat: string): Promise<Product[]>;
  insertProduct(product: InsertProduct): Promise<Product>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductBySku(sku: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.sku, sku));
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    return db.select().from(products).where(
      or(
        ilike(products.product_name, `%${query}%`),
        ilike(products.sku, `%${query}%`)
      )
    );
  }

  async getProductsByCategory(mainCat: string): Promise<Product[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(p => {
      const cat = p.category as any;
      return cat?.main_cat === mainCat || cat?.sub_cat === mainCat || cat?.sub_cat2 === mainCat;
    });
  }

  async insertProduct(product: InsertProduct): Promise<Product> {
    const [inserted] = await db.insert(products).values(product).returning();
    return inserted;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [inserted] = await db.insert(contactMessages).values(message).returning();
    return inserted;
  }
}

export const storage = new DatabaseStorage();
