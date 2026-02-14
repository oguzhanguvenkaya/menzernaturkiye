import { useQuery } from "@tanstack/react-query";
import { ProductData, Product } from "./types";

const DATA_URL = "/data/menzerna_urunler_raw_1771053380132.json";

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
        const main = p.category.main_cat;
        const sub = p.category.sub_cat || "Diğer";
        // Handle both possible keys for sub-category 2
        const sub2 = p.category.sub_cat2 || p.category.sub_cat_2 || "";

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

      // Convert to array structure
      const result: CategoryNode[] = [];
      
      // Sort main categories alphabetically
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
