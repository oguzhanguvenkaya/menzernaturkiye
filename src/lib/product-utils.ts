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
const mmSizePattern = /\s*[-–—]?\s*([\d.,]+)\s*mm(?:\s*\/\s*[\d.,]+\s*inc\b|\s*\/\s*[\d.,]+'*"?)?/i;

function extractBaseName(name: string): string {
  let result = name.replace(sizePattern, "").trim();
  result = result.replace(mmSizePattern, "").trim();
  result = result.replace(/\s*2li\s*Paket/i, "").trim();
  result = result.replace(/\s*Kalın\s+/i, " ").trim();
  result = result.replace(/\s*Ara\s+Kat\s+/i, " ").trim();
  result = result.replace(/\s*Hologram\s+/i, " ").trim();
  result = result.replace(/\s*Orbital\s+/i, " ").trim();
  result = result.replace(/\s+/g, " ").trim();
  return result;
}

function extractSizeLabel(name: string): string {
  const volumeMatch = name.match(sizePattern);
  if (volumeMatch) {
    let label = volumeMatch[1].trim();
    label = label.replace(/\blitre\b|\bliter\b/i, "lt");
    label = label.replace(/\b(\d+)\s*l\b/i, "$1 lt");
    return label;
  }
  const mmMatch = name.match(mmSizePattern);
  if (mmMatch) {
    return mmMatch[1].trim() + "mm";
  }
  return "";
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
  if (lower.includes("mm")) return num;
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
      let bestScore = -1;
      for (const v of variants) {
        const p = v.product;
        const content = (p as any).content || {};
        const fields = (p as any).template_fields || {};
        const scrape = content.menzerna_scrape || {};
        let score = 0;
        if (fields.cut_level != null) score += 10;
        if (fields.finish_level != null) score += 10;
        if (fields.silicone_free) score += 3;
        if (fields.filler_free) score += 3;
        if (fields.voc_free) score += 3;
        if (fields.machine_compatibility) score += 3;
        if (content.full_description) score += Math.min(content.full_description.length / 100, 20);
        if (content.how_to_use) score += 5;
        if (content.why_this_product) score += 5;
        if (content.when_to_use) score += 3;
        if (content.target_surface) score += 3;
        if (scrape.subtitle || scrape.subtitle_en) score += 3;
        if (scrape.description || scrape.description_en) score += 5;
        if (Array.isArray(scrape.steps) && scrape.steps.length > 0) score += 5;
        if (Array.isArray(scrape.optimised_for) && scrape.optimised_for.length > 0) score += 5;
        if (scrape.processing) score += 5;
        if (Array.isArray((p as any).faq) && (p as any).faq.length > 0) score += 5;
        if (score > bestScore || (score === bestScore && sizeToMl(v.sizeLabel) > 0 && sizeToMl(v.sizeLabel) <= 300)) {
          bestScore = score;
          primary = p;
        }
      }
    }

    result.push({ baseName, primary, variants });
  }

  return result;
}
