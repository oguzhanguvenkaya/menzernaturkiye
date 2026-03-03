import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySku } from "@/db/queries";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SizeSelector } from "@/components/size-selector";
import { ApplicationSteps } from "@/components/application-steps";
import type { Product } from "@/lib/types";
import { groupProductsBySize, extractSizeLabel } from "@/lib/product-utils";
import {
  ChevronRight,
  Shield,
  Settings,
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
    return { title: "Urun Bulunamadi" };
  }

  const description =
    product.content?.short_description ??
    `${product.product_name} - Menzerna profesyonel polisaj urunu.`;

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
  const emptyColor = "bg-gray-200";
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
            className={`h-3 flex-1 ${i < clamped ? filledColor : emptyColor}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Helper: normalize machine_compatibility ---

function getMachines(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(/[,;\/]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// --- Helper: get related products ---

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

// --- Helper: build gallery images ---

function buildGalleryImages(product: Product, primaryProduct?: Product): string[] {
  const images: string[] = [];
  if (product.image_url) images.push(product.image_url);
  const source = primaryProduct || product;
  const gallery = source.content?.gallery;
  if (gallery) {
    for (const url of gallery) {
      if (!images.includes(url)) images.push(url);
    }
  }
  return images;
}

// --- Helper: get silicone/filler status ---

function getSiliconFillerStatus(
  silFree?: boolean,
  filFree?: boolean
): string {
  if (silFree && filFree) return "Icermez";
  if (silFree) return "Silikon Icermez";
  if (filFree) return "Dolgu Icermez";
  return "";
}

// --- Helper: translate dusting level ---

function translateDustingLevel(level?: string): string {
  if (!level) return "";
  const map: Record<string, string> = {
    Low: "Dusuk",
    "Very Low": "Cok Dusuk",
    Medium: "Orta",
    High: "Yuksek",
    "Very High": "Cok Yuksek",
  };
  return map[level] || level;
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

  // Use primary product for data when available (richer content)
  const dataSource = primaryProduct || product;

  const {
    product_name,
    category,
    content,
    template_fields,
    relations,
  } = dataSource;

  const scrape = content?.menzerna_scrape;
  const cutLevel = template_fields?.cut_level;
  const finishLevel = template_fields?.finish_level;
  const silFree = template_fields?.silicone_free;
  const filFree = template_fields?.filler_free;
  const machines = getMachines(template_fields?.machine_compatibility);
  const subCat =
    (category as any)?.sub_cat2 ||
    (category as any)?.sub_cat_2 ||
    category?.sub_cat ||
    "";

  const galleryImages = buildGalleryImages(product, primaryProduct);
  const relatedProducts = await getRelatedProducts(relations, sku);

  // Subtitle: prefer scrape data
  const subtitle =
    scrape?.subtitle_en || scrape?.subtitle || content?.short_description || "";

  // Description: prefer scrape data
  const description =
    scrape?.description_en || scrape?.description || content?.full_description || "";

  // Feature cards data
  const featureCards: { icon: React.ReactNode; label: string; value: string }[] = [];

  const silFillerStatus = getSiliconFillerStatus(silFree, filFree);
  if (silFillerStatus) {
    featureCards.push({
      icon: <Shield className="w-5 h-5" />,
      label: "Silikon & Dolgu",
      value: silFillerStatus,
    });
  }

  if (template_fields?.grit_removal) {
    featureCards.push({
      icon: <Crosshair className="w-5 h-5" />,
      label: "Zimpara Izi Giderme",
      value: template_fields.grit_removal,
    });
  }

  if (template_fields?.dusting_level) {
    featureCards.push({
      icon: <Beaker className="w-5 h-5" />,
      label: "Tozuma Seviyesi",
      value: translateDustingLevel(template_fields.dusting_level),
    });
  }

  if (machines.length > 0) {
    featureCards.push({
      icon: <Settings className="w-5 h-5" />,
      label: "Makine",
      value: machines.join(" / "),
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav
            className="flex items-center gap-1.5 text-xs text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[#af1d1f] transition-colors"
            >
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link
              href="/urunler"
              className="hover:text-[#af1d1f] transition-colors"
            >
              Urunler
            </Link>
            {subCat && (
              <>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="text-gray-400">{subCat}</span>
              </>
            )}
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1d1d1d] font-bold truncate max-w-[200px]">
              {product_name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-start">
          {/* LEFT COLUMN - Gallery */}
          <div>
            <ProductGallery
              images={galleryImages}
              productName={product_name}
            />
          </div>

          {/* RIGHT COLUMN - Product info */}
          <div className="flex flex-col gap-5">
            {/* Category + SKU label */}
            <div className="text-[11px] text-gray-400 font-black uppercase tracking-[0.15em]">
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
              <p className="text-gray-700 leading-relaxed text-base font-semibold">
                {subtitle}
              </p>
            )}

            {/* Description (HTML content) */}
            {description && (
              <div
                className="text-gray-600 leading-relaxed text-sm"
                dangerouslySetInnerHTML={{
                  __html: description.replace(/\n/g, "<br>"),
                }}
              />
            )}

            {/* Size selector */}
            {sizeVariants.length > 1 && (
              <SizeSelector variants={sizeVariants} currentSku={sku} />
            )}

            {/* Segmented Cut/Gloss bars */}
            {((cutLevel != null && cutLevel > 0) ||
              (finishLevel != null && finishLevel > 0)) && (
              <div className="flex flex-col gap-4 p-5 bg-[#f8f9fa] border border-gray-200">
                {cutLevel != null && cutLevel > 0 && (
                  <SegmentedBar
                    value={cutLevel}
                    color="red"
                    label="Kesicilik (Cut)"
                  />
                )}
                {finishLevel != null && finishLevel > 0 && (
                  <SegmentedBar
                    value={finishLevel}
                    color="green"
                    label="Parlaklik (Gloss)"
                  />
                )}
              </div>
            )}

            {/* Feature cards grid */}
            {featureCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featureCards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 p-3 flex flex-col items-center text-center"
                  >
                    <div className="text-[#af1d1f] mb-1">{card.icon}</div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {card.label}
                    </span>
                    <span className="text-sm font-black text-[#1d1d1d]">
                      {card.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Application Steps section */}
        {(scrape?.processing || scrape?.steps || content?.how_to_use) && (
          <div className="mt-14 border-t border-gray-100 pt-8">
            <ApplicationSteps
              processing={scrape?.processing}
              steps={scrape?.steps}
              howToUse={content?.how_to_use}
            />
          </div>
        )}

        {/* Full description section (if not already shown via scrape) */}
        {content?.full_description && !scrape?.description && !scrape?.description_en && (
          <div className="mt-14 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-black uppercase tracking-widest text-[#1d1d1d] mb-4">
              Urun Aciklamasi
            </h2>
            <div
              className="text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: content.full_description.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        )}

        {/* When to use / Target surface */}
        {(content?.when_to_use || content?.target_surface) && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content?.when_to_use && (
              <div className="bg-[#1d1d1d] p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-white mb-3">
                  Ne Zaman Kullanilir
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {content.when_to_use}
                </p>
              </div>
            )}
            {content?.target_surface && (
              <div className="bg-gray-50 border border-gray-200 p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#1d1d1d] mb-3">
                  Hedef Yuzey
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {content.target_surface}
                </p>
              </div>
            )}
          </div>
        )}

        {/* FAQ section */}
        {dataSource.faq && dataSource.faq.length > 0 && (
          <div className="mt-14 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-black uppercase tracking-widest text-[#1d1d1d] mb-6">
              Sikca Sorulan Sorular
            </h2>
            <div className="space-y-3">
              {dataSource.faq.map((item, idx) => (
                <div key={idx} className="border border-gray-200 p-5">
                  <h3 className="font-black text-[#1d1d1d] text-sm mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-black uppercase tracking-widest text-[#1d1d1d] mb-6">
              Ilgili Urunler
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.sku} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
