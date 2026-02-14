import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sku: text("sku").notNull().unique(),
  barcode: text("barcode"),
  brand: text("brand").default("MENZERNA"),
  product_name: text("product_name").notNull(),
  price: integer("price").default(0),
  image_url: text("image_url"),
  source_file: text("source_file"),
  template_group: text("template_group"),
  template_sub_type: text("template_sub_type"),
  category: jsonb("category").$type<{
    main_cat: string;
    sub_cat: string;
    sub_cat2?: string;
    sub_cat_2?: string;
  }>().notNull(),
  content: jsonb("content").$type<{
    short_description?: string;
    full_description?: string;
    how_to_use?: string;
    when_to_use?: string;
    target_surface?: string;
    why_this_product?: string;
  }>(),
  template_fields: jsonb("template_fields").$type<{
    cut_level?: number;
    finish_level?: number;
    volume_ml?: number;
    machine_compatibility?: string[] | string;
    recommended_pad_types?: string[];
    silicone_free?: boolean;
    voc_free?: boolean;
    filler_free?: boolean;
    [key: string]: any;
  }>(),
  relations: jsonb("relations").$type<{
    use_before?: string[];
    use_after?: string[];
    use_with?: string[];
    accessories?: string[];
    alternatives?: string[];
  }>(),
  faq: jsonb("faq").$type<{
    question: string;
    answer: string;
  }[]>(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
