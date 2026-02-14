import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/products", async (_req, res) => {
    try {
      const allProducts = await storage.getAllProducts();
      res.json(allProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:sku", async (req, res) => {
    try {
      const product = await storage.getProductBySku(req.params.sku);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/products/search/:query", async (req, res) => {
    try {
      const results = await storage.searchProducts(req.params.query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.get("/api/categories/:category", async (req, res) => {
    try {
      const results = await storage.getProductsByCategory(req.params.category);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(parsed);
      res.status(201).json(message);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return httpServer;
}
