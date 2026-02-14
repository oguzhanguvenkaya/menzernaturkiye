import { useQuery } from "@tanstack/react-query";
import { ProductData, Product } from "./types";

const DATA_URL = "/data/menzerna_urunler_raw_1771051977447.json";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch product data");
  }
  const data: ProductData = await response.json();
  return data.products;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(sku: string) {
  return useQuery({
    queryKey: ["product", sku],
    queryFn: async () => {
      const products = await fetchProducts();
      return products.find((p) => p.sku === sku);
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const products = await fetchProducts();
      const categories = new Set<string>();
      products.forEach(p => {
        if (p.category.main_cat) categories.add(p.category.main_cat);
      });
      return Array.from(categories);
    }
  });
}
