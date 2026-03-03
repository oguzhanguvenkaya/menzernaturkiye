import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySku } from "@/db/queries";
import { ProductCard } from "@/components/product-card";
import { ProductTabs } from "@/components/product-tabs";
import type { Product } from "@/lib/types";
import { CheckCircle2, ChevronRight } from "lucide-react";

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
    `${product.product_name} — Menzerna profesyonel polisaj ürünü.`;

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

// --- Level Bar ---

function LevelBar({
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
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;
  const barColor = color === "red" ? "bg-[#e3000f]" : "bg-[#009b77]";
  const trackColor = color === "red" ? "bg-red-100" : "bg-green-100";
  const textColor = color === "red" ? "text-[#e3000f]" : "text-[#009b77]";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-black uppercase tracking-wider text-gray-500 w-24 shrink-0">
        {label}
      </span>
      <div
        className={`flex-1 h-2.5 ${trackColor} rounded-none overflow-hidden`}
      >
        <div
          className={`h-full ${barColor} rounded-none transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-sm font-black ${textColor} w-8 text-right shrink-0`}>
        {clampedValue}
        <span className="text-gray-300 text-xs font-medium">/{max}</span>
      </span>
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

  const results = await Promise.all(
    skus.map((s) => getProductBySku(s))
  );
  return results.filter(Boolean) as unknown as Product[];
}

// --- Page ---

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = (await getProductBySku(sku)) as unknown as Product | undefined;

  if (!product) {
    notFound();
  }

  const {
    product_name,
    image_url,
    category,
    content,
    template_fields,
    relations,
    faq,
  } = product;

  const cutLevel = template_fields?.cut_level;
  const finishLevel = template_fields?.finish_level;
  const silFree = template_fields?.silicone_free;
  const filFree = template_fields?.filler_free;
  const showSilFillBadge = silFree || filFree;
  const machines = getMachines(template_fields?.machine_compatibility);
  const subCat =
    (category as any)?.sub_cat2 ||
    (category as any)?.sub_cat_2 ||
    category?.sub_cat ||
    "";

  const relatedProducts = await getRelatedProducts(relations, sku);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav
            className="flex items-center gap-1.5 text-xs text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#e3000f] transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link
              href="/urunler"
              className="hover:text-[#e3000f] transition-colors"
            >
              Ürünler
            </Link>
            {subCat && (
              <>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="text-gray-400">{subCat}</span>
              </>
            )}
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#002b3d] font-bold truncate max-w-[200px]">
              {product_name}
            </span>
          </nav>
        </div>
      </div>

      {/* Ana ürün bölümü */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sol: Görsel */}
          <div className="relative aspect-square bg-[#f8f9fa] flex items-center justify-center overflow-hidden">
            {image_url ? (
              <Image
                src={image_url}
                alt={product_name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-contain p-10"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={0.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs uppercase tracking-widest">
                  Görsel Mevcut Değil
                </span>
              </div>
            )}
          </div>

          {/* Sağ: Bilgiler */}
          <div className="flex flex-col gap-5">
            {/* Kategori etiketi */}
            {subCat && (
              <span className="text-xs font-black uppercase tracking-widest text-[#e3000f]">
                {subCat}
              </span>
            )}

            {/* Ürün adı */}
            <h1 className="text-3xl font-black uppercase text-[#002b3d] leading-tight tracking-tight">
              {product_name}
            </h1>

            {/* Kısa açıklama */}
            {content?.short_description && (
              <p className="text-gray-600 leading-relaxed text-sm border-l-2 border-[#e3000f] pl-4">
                {content.short_description}
              </p>
            )}

            {/* Cut / Finish barları */}
            {((cutLevel != null && cutLevel > 0) ||
              (finishLevel != null && finishLevel > 0)) && (
              <div className="border border-gray-100 bg-[#f8f9fa] p-5 flex flex-col gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#002b3d]">
                  Performans Seviyeleri
                </span>
                {cutLevel != null && cutLevel > 0 && (
                  <LevelBar
                    value={cutLevel}
                    color="red"
                    label="Kesme Gücü"
                  />
                )}
                {finishLevel != null && finishLevel > 0 && (
                  <LevelBar
                    value={finishLevel}
                    color="green"
                    label="Parlama"
                  />
                )}
              </div>
            )}

            {/* Özellik rozetleri */}
            {showSilFillBadge && (
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-black uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Silikon &amp; Dolgu İçermez
                </span>
              </div>
            )}

            {/* Uygun Makineler */}
            {machines.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-[#002b3d] mb-3">
                  Uygun Makineler
                </h2>
                <div className="flex flex-wrap gap-2">
                  {machines.map((machine, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 border border-[#002b3d]/20 text-xs font-bold text-[#002b3d] uppercase tracking-wide bg-white hover:border-[#002b3d]/40 transition-colors"
                    >
                      {machine}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SKU */}
            <p className="text-xs text-gray-400 font-medium">
              SKU:{" "}
              <span className="font-bold text-gray-500 tracking-wider">
                {sku}
              </span>
            </p>
          </div>
        </div>

        {/* Tabs bölümü */}
        <div className="mt-14 border-t border-gray-100 pt-8">
          <ProductTabs
            fullDescription={content?.full_description}
            whenToUse={content?.when_to_use}
            targetSurface={content?.target_surface}
            howToUse={content?.how_to_use}
            faq={faq ?? undefined}
          />
        </div>

        {/* İlgili ürünler */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-black uppercase tracking-widest text-[#002b3d] mb-6">
              İlgili Ürünler
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
