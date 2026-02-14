import { useQuery, useMutation } from "@tanstack/react-query";
import { Product } from "./types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch product data");
  }
  return response.json();
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
      const response = await fetch(`/api/products/${encodeURIComponent(sku)}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      return response.json() as Promise<Product>;
    },
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return [];
      const response = await fetch(`/api/products/search/${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Search failed");
      return response.json() as Promise<Product[]>;
    },
    enabled: !!query,
  });
}

export function useContactForm() {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; subject: string; message: string }) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to send message");
      }
      return response.json();
    },
  });
}

export interface CategoryNode {
  name: string;
  subCategories: {
    name: string;
    subSubCategories: string[];
  }[];
}

export function useHierarchicalCategories() {
  return useQuery({
    queryKey: ["hierarchical-categories"],
    queryFn: async () => {
      const products = await fetchProducts();
      const categoryMap = new Map<string, Map<string, Set<string>>>();

      products.forEach((p) => {
        const main = p.category?.main_cat;
        const sub = p.category?.sub_cat || "Diğer";
        const sub2 = p.category?.sub_cat2 || p.category?.sub_cat_2 || "";

        if (!main) return;

        if (!categoryMap.has(main)) {
          categoryMap.set(main, new Map());
        }

        const subMap = categoryMap.get(main)!;
        if (!subMap.has(sub)) {
          subMap.set(sub, new Set());
        }

        if (sub2) {
          subMap.get(sub)!.add(sub2);
        }
      });

      const result: CategoryNode[] = [];
      const sortedMainCats = Array.from(categoryMap.keys()).sort();

      sortedMainCats.forEach(mainCat => {
        const subMap = categoryMap.get(mainCat)!;
        const subCategories: { name: string; subSubCategories: string[] }[] = [];
        const sortedSubCats = Array.from(subMap.keys()).sort();

        sortedSubCats.forEach(subCat => {
          const subSubSet = subMap.get(subCat)!;
          const subSubCategories = Array.from(subSubSet).sort();
          subCategories.push({ name: subCat, subSubCategories });
        });

        result.push({ name: mainCat, subCategories });
      });

      return result;
    }
  });
}
