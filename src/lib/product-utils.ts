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

// ---------------------------------------------------------------------------
// Badge system
// ---------------------------------------------------------------------------

export type BadgeType =
  | "Heavy Cut"
  | "Medium Cut"
  | "Finish"
  | "3in1"
  | "Marin 3in1"
  | "Protection"
  | "Matte"
  | "";

export interface BadgeInfo {
  label: string;
  color: string;
  bg: string;
}

const BADGE_MAP: Record<string, BadgeInfo> = {
  "Heavy Cut":  { label: "Heavy Cut",  color: "#fff", bg: "#B6352E" },
  "Medium Cut": { label: "Medium Cut", color: "#1d1d1d", bg: "#F3EE50" },
  "Finish":     { label: "Finish",     color: "#1d1d1d", bg: "#CDDB3B" },
  "3in1":       { label: "3in1",       color: "#fff", bg: "#622B86" },
  "Marin 3in1": { label: "3in1",       color: "#fff", bg: "#393156" },
  "Protection": { label: "Protection", color: "#1d1d1d", bg: "#87B6E6" },
  "Matte":      { label: "Matte",      color: "#1d1d1d", bg: "#EACC3E" },
};

export function getBadgeInfo(badge: BadgeType): BadgeInfo | null {
  if (!badge) return null;
  return BADGE_MAP[badge] || null;
}

export function getProductBadge(product: Product): BadgeType {
  const tst = (product as any).template_sub_type as string | undefined;
  const scrape = product.content?.menzerna_scrape;
  const steps = scrape?.steps;
  const mainCat = product.category?.main_cat;

  // Endüstriyel ürünlerde badge gösterme
  if (mainCat === "ENDÜSTRİYEL") return "";

  // Matte — sanding_paste / liquid mat
  if (tst === "sanding_paste") return "Matte";

  // 3in1 — differentiate Marin vs regular
  if (tst === "one_step_polish") {
    return mainCat === "MARİN" ? "Marin 3in1" : "3in1";
  }

  // Protection types
  if (tst === "liquid_sealant" || tst === "spray_sealant" || tst === "spray_wipe_sealant") return "Protection";

  // If steps data available, use first active step
  if (steps && steps.length > 0) {
    const activeSteps = steps.filter(s => s.isActive).map(s => s.number);
    if (activeSteps.length > 0) {
      const first = Math.min(...activeSteps);
      if (first === 1) return "Heavy Cut";
      if (first === 2) return "Medium Cut";
      if (first === 3) return "Finish";
      if (first === 4) return "Protection";
    }
  }

  // Fallback to template_sub_type
  if (tst === "heavy_cut_compound") return "Heavy Cut";
  if (tst === "finish") return "Finish";
  if (tst === "polish") return "Medium Cut";

  return "";
}

// ---------------------------------------------------------------------------
// Size extraction
// ---------------------------------------------------------------------------

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

export function extractSizeLabel(name: string): string {
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

export function sizeToMl(label: string): number {
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

// ---------------------------------------------------------------------------
// Manual grouping overrides — SKUs that should be treated as size variants
// ---------------------------------------------------------------------------

const MANUAL_GROUPS: Record<string, { groupName: string }> = {
  "26.931.099.001": { groupName: "MENZERNA Ped Destek Disk Tabanlık" },
  "26.934.099.001": { groupName: "MENZERNA Ped Destek Disk Tabanlık" },
  "26.935.099.001": { groupName: "MENZERNA Ped Destek Disk Tabanlık" },
};

// ---------------------------------------------------------------------------
// Group products by size
// ---------------------------------------------------------------------------

export function groupProductsBySize(products: Product[]): ProductGroup[] {
  const groupMap: Record<string, ProductVariant[]> = {};

  for (const product of products) {
    const name = product.product_name || "";
    const manual = MANUAL_GROUPS[product.sku];

    const baseName = manual ? manual.groupName : extractBaseName(name);
    const sizeLabel = extractSizeLabel(name);

    if (!groupMap[baseName]) {
      groupMap[baseName] = [];
    }
    groupMap[baseName].push({ product, sizeLabel });
  }

  const result: ProductGroup[] = [];

  for (const baseName of Object.keys(groupMap)) {
    const variants = groupMap[baseName];

    if (variants.length > 1) {
      variants.sort((a, b) => {
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

// ---------------------------------------------------------------------------
// Card helpers
// ---------------------------------------------------------------------------

/** Find the default variant SKU — prefer 1L, fallback to primary */
export function getDefaultVariantSku(group: ProductGroup): string {
  if (group.variants.length <= 1) return group.variants[0]?.product.sku || group.primary.sku;

  // Look for ~1000ml (1 lt / 1 litre / 1 kg)
  for (const v of group.variants) {
    const ml = sizeToMl(v.sizeLabel);
    if (ml >= 900 && ml <= 1100) return v.product.sku;
  }

  return group.primary.sku;
}

/** Serializable variant info for client components */
export interface CardVariant {
  sku: string;
  sizeLabel: string;
  imageUrl: string | null;
}

export function getCardVariants(group: ProductGroup): CardVariant[] {
  return group.variants.map(v => ({
    sku: v.product.sku,
    sizeLabel: v.sizeLabel || extractSizeLabel(v.product.product_name),
    imageUrl: v.product.image_url || null,
  }));
}

/** Collect all gallery images from a product group (for hover slide) */
export function getGroupGalleryImages(group: ProductGroup): string[] {
  const images: string[] = [];
  const seen = new Set<string>();

  // Primary product image + gallery
  const primary = group.primary;
  if (primary.image_url && !seen.has(primary.image_url)) {
    images.push(primary.image_url);
    seen.add(primary.image_url);
  }
  const gallery = primary.content?.gallery;
  if (gallery) {
    for (const url of gallery) {
      if (url && !seen.has(url)) {
        images.push(url);
        seen.add(url);
      }
    }
  }

  // Also add variant images not yet included
  for (const v of group.variants) {
    const url = v.product.image_url;
    if (url && !seen.has(url)) {
      images.push(url);
      seen.add(url);
    }
  }

  return images;
}

/** Build card data from a product group, with option to hide bars */
export function buildGroupCardData(
  group: ProductGroup,
  options?: { showBars?: boolean }
): import("@/components/product-card").ProductCardData {
  const primary = group.primary;
  const cat = primary.category as unknown as Record<string, string | undefined>;
  const subCat = cat?.sub_cat2 || cat?.sub_cat_2 || cat?.sub_cat || "";
  const showBars = options?.showBars ?? true;

  return {
    sku: primary.sku,
    productName: group.baseName || primary.product_name,
    imageUrl: primary.image_url || null,
    subCat,
    badge: getProductBadge(primary),
    cutLevel: showBars ? (primary.template_fields?.cut_level ?? null) : null,
    finishLevel: showBars ? (primary.template_fields?.finish_level ?? null) : null,
    variants: getCardVariants(group),
    defaultSku: getDefaultVariantSku(group),
    gallery: getGroupGalleryImages(group),
  };
}

/** Convert a single product (no grouping) into ProductCardData for compact cards */
export function productToCardData(product: Product): import("@/components/product-card").ProductCardData {
  const cat = product.category as unknown as Record<string, string | undefined>;
  const subCat = cat?.sub_cat2 || cat?.sub_cat_2 || cat?.sub_cat || "";
  const gallery: string[] = [];
  if (product.image_url) gallery.push(product.image_url);
  const g = product.content?.gallery;
  if (g) {
    for (const url of g) {
      if (url && !gallery.includes(url)) gallery.push(url);
    }
  }

  return {
    sku: product.sku,
    productName: product.product_name,
    imageUrl: product.image_url || null,
    subCat,
    badge: getProductBadge(product),
    cutLevel: product.template_fields?.cut_level ?? null,
    finishLevel: product.template_fields?.finish_level ?? null,
    variants: [{
      sku: product.sku,
      sizeLabel: extractSizeLabel(product.product_name),
      imageUrl: product.image_url || null,
    }],
    defaultSku: product.sku,
    gallery,
  };
}
