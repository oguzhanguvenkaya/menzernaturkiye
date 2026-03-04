import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/db/queries";
import { ProductCard, type ProductCardData } from "@/components/product-card";
import { CategorySidebar } from "@/components/category-sidebar";
import { CATEGORY_SLUG_MAP } from "@/lib/categories";
import type { Product } from "@/lib/types";
import {
  groupProductsBySize,
  getProductBadge,
  getDefaultVariantSku,
  getCardVariants,
  getGroupGalleryImages,
  extractSizeLabel,
  type ProductGroup,
} from "@/lib/product-utils";
import { Search } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Menzerna'nın profesyonel polisaj ürünleri katalogu. Araç bakım, endüstriyel ve marin polisaj ürünleri.",
};

// ---------------------------------------------------------------------------
// Category ordering — products follow this order when no filter selected
// ---------------------------------------------------------------------------

const CATEGORY_ORDER: string[] = [
  "Kalın Pastalar",
  "İnce Pastalar",
  "Hare Gidericiler",
  "Boya Korumalar",
  "Metal ve Krom Parlatıcılar",
  "Keçeler",
  "Rotary Süngerler",
  "Orbital Süngerler",
  "Ped Destek Diskleri Tabanlıklar",
  "Kesici Cilalar",
  "Parlatıcı Cilalar",
  "MARİN",
  "MAKİNE-EKİPMAN",
];

function getCategoryOrderIndex(product: Product): number {
  const cat = product.category as unknown as Record<string, string | undefined>;
  if (!cat) return 999;

  // Check sub_cat2 first, then sub_cat, then main_cat
  for (const field of ["sub_cat2", "sub_cat_2", "sub_cat", "main_cat"]) {
    const val = cat[field];
    if (val) {
      const idx = CATEGORY_ORDER.indexOf(val);
      if (idx >= 0) return idx;
    }
  }
  return 999;
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

function slugToLabel(slug: string): string {
  const filter = CATEGORY_SLUG_MAP[slug];
  if (filter) return filter.value;
  return slug.replace(/-/g, " ");
}

function filterGroups(
  groups: ProductGroup[],
  categorySlug: string,
  query: string,
): ProductGroup[] {
  let result = groups;

  if (categorySlug) {
    const filter = CATEGORY_SLUG_MAP[categorySlug];
    if (filter) {
      result = result.filter((g) => {
        // Check if ANY variant matches
        return g.variants.some((v) => {
          const cat = v.product.category as unknown as Record<string, string | undefined>;
          if (!cat) return false;
          if (filter.field === "sub_cat2") {
            return cat.sub_cat2 === filter.value || cat.sub_cat_2 === filter.value;
          }
          return cat[filter.field] === filter.value;
        });
      });
    }
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter((g) =>
      g.variants.some(
        (v) =>
          v.product.product_name?.toLowerCase().includes(q) ||
          v.product.sku?.toLowerCase().includes(q) ||
          (v.product.category as any)?.sub_cat?.toLowerCase().includes(q) ||
          (v.product.category as any)?.main_cat?.toLowerCase().includes(q),
      ),
    );
  }

  return result;
}

// ---------------------------------------------------------------------------
// Build card data from a product group
// ---------------------------------------------------------------------------

function buildCardData(group: ProductGroup): ProductCardData {
  const primary = group.primary;
  const cat = primary.category as unknown as Record<string, string | undefined>;
  const subCat = cat?.sub_cat2 || cat?.sub_cat_2 || cat?.sub_cat || "";

  return {
    sku: primary.sku,
    productName: group.baseName || primary.product_name,
    imageUrl: primary.image_url || null,
    subCat,
    badge: getProductBadge(primary),
    cutLevel: primary.template_fields?.cut_level ?? null,
    finishLevel: primary.template_fields?.finish_level ?? null,
    variants: getCardVariants(group),
    defaultSku: getDefaultVariantSku(group),
    gallery: getGroupGalleryImages(group),
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function UrunlerPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category ?? "";
  const query = params.q ?? "";

  const allProducts = (await getAllProducts()) as unknown as Product[];

  // Group products by base name (size variants)
  const groups = groupProductsBySize(allProducts);

  // Sort groups by category order
  groups.sort((a, b) => {
    const orderA = getCategoryOrderIndex(a.primary);
    const orderB = getCategoryOrderIndex(b.primary);
    return orderA - orderB;
  });

  // Filter
  const filtered = filterGroups(groups, category, query);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Sayfa başlığı */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black uppercase tracking-widest mb-1 text-[#1d1d1d]">
            Ürünlerimiz
          </h1>
          <p className="text-sm text-gray-500">
            Menzerna&apos;nın profesyonel polisaj çözümlerini keşfedin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Arama çubuğu */}
        <div className="mb-6">
          <form method="GET" action="/urunler" className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Ürün ara..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#af1d1f] transition-colors"
            />
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol: Kategori sidebar (desktop) + trigger buton (mobil) */}
          <Suspense fallback={null}>
            <CategorySidebar />
          </Suspense>

          {/* Sağ: Ürün grid */}
          <div className="flex-1 min-w-0">
            {/* Sonuç sayısı */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-[#1d1d1d]">
                  {filtered.length}
                </span>{" "}
                ürün bulundu
                {category && (
                  <span className="ml-1">
                    &mdash; filtre:{" "}
                    <span className="font-bold capitalize">
                      {slugToLabel(category)}
                    </span>
                  </span>
                )}
              </p>
              {(category || query) && (
                <a
                  href="/urunler"
                  className="text-xs font-bold uppercase tracking-wider text-[#af1d1f] hover:underline"
                >
                  Filtreleri temizle
                </a>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <p className="text-2xl font-black uppercase text-gray-200 tracking-widest mb-3">
                  Ürün bulunamadı
                </p>
                <p className="text-sm text-gray-400">
                  Farklı bir kategori seçin veya arama terimini değiştirin.
                </p>
                <a
                  href="/urunler"
                  className="mt-6 text-sm font-bold text-[#af1d1f] hover:underline uppercase tracking-wider"
                >
                  Tüm ürünleri göster
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((group) => (
                  <ProductCard
                    key={group.primary.sku}
                    data={buildCardData(group)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
