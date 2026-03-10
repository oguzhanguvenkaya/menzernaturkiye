import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySku } from "@/db/queries";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SizeSelector } from "@/components/size-selector";
import { ProductTabs } from "@/components/product-tabs";
import type { Product } from "@/lib/types";
import {
  groupProductsBySize,
  extractSizeLabel,
  productToCardData,
} from "@/lib/product-utils";
import {
  ChevronRight,
  Shield,
  Settings as SettingsIcon,
  Beaker,
  Crosshair,
} from "lucide-react";

export const revalidate = 3600;

// --- Static params ---

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ sku: p.sku }));
}

// --- Metadata ---

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>;
}): Promise<Metadata> {
  const { sku } = await params;
  const product = (await getProductBySku(sku)) as unknown as Product | undefined;

  if (!product) {
    return { title: "Ürün Bulunamadı" };
  }

  const description =
    product.content?.short_description ??
    `${product.product_name} - Menzerna profesyonel polisaj ürünü.`;

  return {
    title: product.product_name,
    description,
    openGraph: {
      title: product.product_name,
      description,
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  };
}

// --- Segmented Bar ---

function SegmentedBar({
  value,
  max = 10,
  color,
  label,
}: {
  value: number;
  max?: number;
  color: "red" | "green";
  label: string;
}) {
  const clamped = Math.min(Math.max(value, 0), max);
  const filledColor = color === "red" ? "bg-[#af1d1f]" : "bg-[#006b52]";
  const textColor = color === "red" ? "text-[#af1d1f]" : "text-[#006b52]";

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-black uppercase tracking-widest">
          {label}
        </span>
        <span className={`text-lg font-black ${textColor}`}>
          {clamped}
          <span className="text-xs text-gray-400 font-normal">/{max}</span>
        </span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`h-3 flex-1 ${i < clamped ? filledColor : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Helpers ---

function getMachines(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(/[,;\/]+/).map((s) => s.trim()).filter(Boolean);
}

async function getRelatedProducts(
  relations: Product["relations"],
  currentSku: string
): Promise<Product[]> {
  const skus = [
    ...(relations?.use_with ?? []),
    ...(relations?.use_before ?? []),
    ...(relations?.use_after ?? []),
    ...(relations?.accessories ?? []),
    ...(relations?.alternatives ?? []),
  ]
    .filter((s) => s && s !== currentSku)
    .slice(0, 4);
  if (skus.length === 0) return [];
  const results = await Promise.all(skus.map((s) => getProductBySku(s)));
  return results.filter(Boolean) as unknown as Product[];
}

function buildGalleryImages(
  product: Product,
  primaryProduct: Product | undefined,
  allVariants: { product: Product }[],
): string[] {
  const images: string[] = [];
  const seen = new Set<string>();

  function add(url: string | undefined | null) {
    if (url && !seen.has(url)) {
      seen.add(url);
      images.push(url);
    }
  }

  // 1. Current product main image first
  add(product.image_url);

  // 2. Current product's own gallery
  const ownGallery = product.content?.gallery;
  if (ownGallery) ownGallery.forEach(add);

  // 3. Primary product (richest content) — main + gallery
  if (primaryProduct && primaryProduct.sku !== product.sku) {
    add(primaryProduct.image_url);
    const primaryGallery = primaryProduct.content?.gallery;
    if (primaryGallery) primaryGallery.forEach(add);
  }

  // 4. Other variants' main images
  for (const v of allVariants) {
    if (v.product.sku !== product.sku) {
      add(v.product.image_url);
    }
  }

  return images;
}

function getSiliconFillerStatus(silFree?: boolean, filFree?: boolean): string {
  if (silFree && filFree) return "İçermez";
  if (silFree) return "Silikon İçermez";
  if (filFree) return "Dolgu İçermez";
  return "";
}

function translateDustingLevel(level?: string): string {
  if (!level) return "";
  const map: Record<string, string> = {
    Low: "Düşük", "Very Low": "Çok Düşük", Medium: "Orta",
    High: "Yüksek", "Very High": "Çok Yüksek",
  };
  return map[level] || level;
}

// --- Short product name for display ---

function shortenProductName(name: string): string {
  return name
    .replace(/^MENZERNA\s+/i, "")
    .replace(/\s*[-–—]\s*[\d.,]+\s*(ml|lt|litre|kg|gr|g|l)\b.*$/i, "")
    .replace(/\s*[-–—]\s*\d+\s*mm.*$/i, "")
    .trim();
}

// --- Optimised For / Accessories matching ---

interface OptimisedItem {
  name: string;
  name_tr?: string;
  sku?: string;
  url?: string;
}

function findMatchingProduct(
  item: OptimisedItem,
  allProducts: Product[]
): Product | null {
  // Try matching by SKU first (from admin panel)
  if (item.sku) {
    const bySku = allProducts.find((p) => p.sku === item.sku);
    if (bySku) return bySku;
  }
  // Fallback to name matching
  const nameLower = (item.name_tr || item.name).toLowerCase();
  return allProducts.find((p) =>
    p.product_name.toLowerCase().includes(nameLower)
  ) || null;
}

// --- Page ---

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const allProducts = (await getAllProducts()) as unknown as Product[];
  const product = allProducts.find((p) => p.sku === sku);

  if (!product) {
    notFound();
  }

  // Find size variants
  const groups = groupProductsBySize(allProducts);
  const currentGroup = groups.find((g) =>
    g.variants.some((v) => v.product.sku === sku)
  );
  const sizeVariants = currentGroup
    ? currentGroup.variants.map((v) => ({
        sku: v.product.sku,
        sizeLabel: v.sizeLabel || extractSizeLabel(v.product.product_name),
      }))
    : [];
  const primaryProduct = currentGroup?.primary;
  const dataSource = primaryProduct || product;

  const { product_name, category, content, template_fields, relations } = dataSource;

  // Ürüne özel fiziksel özellikler: mevcut ürünün kendi template_fields'ından al
  // (boyut değişince tabanlık, makine uyumluluğu gibi alanlar doğru gösterilsin)
  const ownFields = product.template_fields;

  const scrape = content?.menzerna_scrape;
  const cutLevel = template_fields?.cut_level;
  const finishLevel = template_fields?.finish_level;
  const silFree = template_fields?.silicone_free;
  const filFree = template_fields?.filler_free;
  const machines = getMachines(ownFields?.machine_compatibility || template_fields?.machine_compatibility);
  const subCat =
    (category as any)?.sub_cat2 || (category as any)?.sub_cat_2 || category?.sub_cat || "";

  const groupVariants = currentGroup?.variants || [{ product, sizeLabel: "" }];
  const galleryImages = buildGalleryImages(product, primaryProduct, groupVariants);
  const relatedProducts = await getRelatedProducts(relations, sku);

  const subtitle = scrape?.subtitle || scrape?.subtitle_en || content?.short_description || "";
  const shortDesc = scrape?.description || scrape?.description_en || "";

  // Feature cards
  const featureCards: { icon: React.ReactNode; label: string; value: string }[] = [];
  const silFillerStatus = getSiliconFillerStatus(silFree, filFree);
  if (silFillerStatus) featureCards.push({ icon: <Shield className="w-5 h-5" />, label: "Silikon & Dolgu", value: silFillerStatus });
  if (template_fields?.grit_removal) featureCards.push({ icon: <Crosshair className="w-5 h-5" />, label: "Zımpara İzi Giderme", value: template_fields.grit_removal });
  if (template_fields?.dusting_level) featureCards.push({ icon: <Beaker className="w-5 h-5" />, label: "Tozuma Seviyesi", value: translateDustingLevel(template_fields.dusting_level) });
  if (machines.length > 0) featureCards.push({ icon: <SettingsIcon className="w-5 h-5" />, label: "Uygun Makina", value: machines.join(" / ") });
  const backingPlate = (ownFields?.suitable_backing_plate || template_fields?.suitable_backing_plate) as string | undefined;
  if (backingPlate) featureCards.push({ icon: <Crosshair className="w-5 h-5" />, label: "Uygun Tabanlık", value: backingPlate });

  const downloads = content?.downloads as { label: string; url: string; size: string }[] | undefined;

  // Optimised for / recommended accessories
  // Önce mevcut ürünün kendi optimised_for'unu kontrol et, yoksa primary'den al
  const ownScrape = product.content?.menzerna_scrape as Record<string, unknown> | undefined;
  const ownOptimisedFor = ownScrape?.optimised_for as OptimisedItem[] | undefined;
  const optimisedFor = (ownOptimisedFor && ownOptimisedFor.length > 0 ? ownOptimisedFor : scrape?.optimised_for) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500" aria-label="Breadcrumb">
            <Link href="/urunler" className="hover:text-[#af1d1f] transition-colors">Ürünler</Link>
            {subCat && (
              <>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="text-gray-400">{subCat}</span>
              </>
            )}
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1d1d1d] font-bold truncate max-w-[200px]">{product_name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
          {/* LEFT COLUMN - Gallery (smaller) */}
          <div>
            <ProductGallery images={galleryImages} productName={product_name} />
          </div>

          {/* RIGHT COLUMN - Product info */}
          <div className="flex flex-col gap-5">
            {/* Category + SKU (no badge) */}
            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em]">
              {subCat && <span>{subCat}</span>}
              {subCat && <span className="mx-2">&bull;</span>}
              <span>SKU: {sku}</span>
            </div>

            {/* Product name + red underline */}
            <h1 className="text-2xl font-black uppercase text-[#1d1d1d] leading-tight tracking-tight">
              {product_name}
            </h1>
            <div className="w-16 h-1 bg-[#af1d1f]" />

            {/* Subtitle */}
            {subtitle && (
              <p className="text-gray-700 leading-relaxed text-base font-semibold">{subtitle}</p>
            )}

            {/* Short description */}
            {shortDesc && (
              <div
                className="text-gray-600 leading-relaxed text-base"
                dangerouslySetInnerHTML={{ __html: shortDesc.replace(/\n/g, "<br>") }}
              />
            )}

            {/* Size selector */}
            {sizeVariants.length >= 1 && (
              <SizeSelector variants={sizeVariants} currentSku={sku} />
            )}

            {/* Segmented Cut/Gloss bars */}
            {((cutLevel != null && cutLevel > 0) || (finishLevel != null && finishLevel > 0)) && (
              <div className="flex flex-col gap-4 p-5 bg-[#f8f9fa] border border-gray-200">
                {cutLevel != null && cutLevel > 0 && (
                  <SegmentedBar value={cutLevel} color="red" label="Kesicilik (Cut)" />
                )}
                {finishLevel != null && finishLevel > 0 && (
                  <SegmentedBar value={finishLevel} color="green" label="Parlaklık (Gloss)" />
                )}
              </div>
            )}

            {/* Application Steps (compact inline) */}
            {scrape?.steps && scrape.steps.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {scrape.steps.map((step) => {
                  const stepColors: Record<number, string> = { 1: "#af1d1f", 2: "#d97706", 3: "#006b52", 4: "#2563eb" };
                  const color = stepColors[step.number] || "#6b7280";
                  const isActive = step.isActive;
                  const isHalf = step.isHalfActive;
                  return (
                    <div key={step.number} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-16 h-8 flex items-center justify-center text-[10px] font-black uppercase tracking-wider border-2 ${
                          isActive ? "text-white" : isHalf ? "bg-white" : "bg-gray-100 text-gray-400 border-gray-300"
                        }`}
                        style={isActive ? { backgroundColor: color, borderColor: color } : isHalf ? { borderColor: color, color } : {}}
                      >
                        Adım {step.number}
                      </div>
                      <span className="text-[9px] text-gray-500 font-bold text-center leading-tight">
                        {step.label_tr || step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Feature cards grid */}
            {featureCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featureCards.map((card, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-3 flex flex-col items-center text-center">
                    <div className="text-[#af1d1f] mb-1">{card.icon}</div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{card.label}</span>
                    <span className="text-sm font-black text-[#1d1d1d]">{card.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Önerilen Aksesuarlar */}
        {optimisedFor.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#1d1d1d] uppercase tracking-widest mb-8">
              Önerilen Aksesuarlar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {optimisedFor.map((item, idx) => {
                const matched = findMatchingProduct(item, allProducts);
                const displayName = shortenProductName(item.name_tr || item.name);

                const cardImage = matched?.image_url ? (
                  <Image
                    src={matched.image_url}
                    alt={displayName}
                    width={64}
                    height={64}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <SettingsIcon className="w-8 h-8 text-gray-400" />
                );

                const card = (
                  <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col items-center text-center hover:border-[#af1d1f] transition-colors h-full">
                    <div className="w-16 h-16 flex items-center justify-center mb-3">
                      {cardImage}
                    </div>
                    <span className="text-xs font-bold text-[#1d1d1d] leading-tight line-clamp-2">{displayName}</span>
                  </div>
                );

                if (matched) {
                  return (
                    <Link key={idx} href={`/urunler/${matched.sku}`}>
                      {card}
                    </Link>
                  );
                }

                return <div key={idx}>{card}</div>;
              })}
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <ProductTabs
            fullDescription={content?.full_description}
            whenToUse={content?.when_to_use}
            targetSurface={content?.target_surface}
            whyThisProduct={content?.why_this_product}
            howToUse={content?.how_to_use}
            faq={dataSource.faq}
            downloads={downloads}
          />
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-black uppercase tracking-widest text-[#1d1d1d] mb-6">
              İlgili Ürünler
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.sku} data={productToCardData(rp)} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
