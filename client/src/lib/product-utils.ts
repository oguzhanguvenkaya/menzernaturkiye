import { Product } from "./types";

export interface ProductVariant {
  product: Product;
  sizeLabel: string;
}

export interface ProductGroup {
  baseName: string;
  primary: Product;
  variants: ProductVariant[];
}

const sizePattern = /\s*[-–—]\s*([\d.,]+\s*(?:ml|lt|litre|liter|kg|gr|g|l|cc)\b)/i;

function extractBaseName(name: string): string {
  return name.replace(sizePattern, "").trim();
}

function extractSizeLabel(name: string): string {
  const match = name.match(sizePattern);
  if (!match) return "";
  let label = match[1].trim();
  label = label.replace(/\blitre\b|\bliter\b/i, "lt");
  label = label.replace(/\b(\d+)\s*l\b/i, "$1 lt");
  return label;
}

function sizeToMl(label: string): number {
  if (!label) return 0;
  const lower = label.toLowerCase().trim();
  const numMatch = lower.match(/([\d.,]+)/);
  if (!numMatch) return 0;
  const num = parseFloat(numMatch[1].replace(",", "."));
  if (isNaN(num)) return 0;
  if (lower.includes("lt") || lower.includes("litre") || lower.includes("liter")) return num * 1000;
  if (lower.includes("kg")) return num * 1000;
  if (lower.includes("gr") || lower.includes("g")) return num;
  if (lower.includes("cc")) return num;
  if (lower.includes("ml")) return num;
  if (lower.includes("l")) return num * 1000;
  return num;
}

export function groupProductsBySize(products: Product[]): ProductGroup[] {
  const groupMap: Record<string, ProductVariant[]> = {};

  for (const product of products) {
    const name = product.product_name || "";
    const baseName = extractBaseName(name);
    const sizeLabel = extractSizeLabel(name);

    if (!groupMap[baseName]) {
      groupMap[baseName] = [];
    }
    groupMap[baseName].push({ product, sizeLabel });
  }

  const result: ProductGroup[] = [];
  const keys = Object.keys(groupMap);

  for (const baseName of keys) {
    const variants = groupMap[baseName];

    if (variants.length > 1) {
      variants.sort((a: ProductVariant, b: ProductVariant) => {
        const aml = sizeToMl(a.sizeLabel);
        const bml = sizeToMl(b.sizeLabel);
        return aml - bml;
      });
    }

    let primary = variants[0].product;
    if (variants.length > 1) {
      const preferred = variants.find((v: ProductVariant) => {
        const ml = sizeToMl(v.sizeLabel);
        return ml >= 200 && ml <= 300;
      });
      if (preferred) primary = preferred.product;
    }

    result.push({ baseName, primary, variants });
  }

  return result;
}
