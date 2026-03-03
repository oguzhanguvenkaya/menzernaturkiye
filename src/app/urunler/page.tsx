import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/db/queries";
import { ProductCard } from "@/components/product-card";
import { CategorySidebar, CATEGORY_SLUG_MAP } from "@/components/category-sidebar";
import type { Product } from "@/lib/types";
import { Search } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Menzerna'nın profesyonel polisaj ürünleri katalogu. Araç bakım, endüstriyel ve marin polisaj ürünleri.",
};

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/**
 * Resolve a category slug into a label for display.
 * Falls back to humanizing the slug itself.
 */
function slugToLabel(slug: string): string {
  const filter = CATEGORY_SLUG_MAP[slug];
  if (filter) return filter.value;
  return slug.replace(/-/g, " ");
}

/**
 * Filter products by a category slug and/or a free-text query.
 *
 * The slug is resolved via CATEGORY_SLUG_MAP which provides the exact
 * DB field (main_cat | sub_cat | sub_cat2) and value to match against.
 */
function filterProducts(
  products: Product[],
  categorySlug: string,
  query: string,
): Product[] {
  let result = products;

  if (categorySlug) {
    const filter = CATEGORY_SLUG_MAP[categorySlug];
    if (filter) {
      result = result.filter((p) => {
        const cat = p.category as unknown as Record<string, string | undefined>;
        if (!cat) return false;

        // For sub_cat2 we also check the alternative key sub_cat_2
        if (filter.field === "sub_cat2") {
          return cat.sub_cat2 === filter.value || cat.sub_cat_2 === filter.value;
        }

        return cat[filter.field] === filter.value;
      });
    }
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.product_name?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        (p.category as any)?.sub_cat?.toLowerCase().includes(q) ||
        (p.category as any)?.main_cat?.toLowerCase().includes(q),
    );
  }

  return result;
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
  const filtered = filterProducts(allProducts, category, query);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Sayfa başlığı */}
      <div className="bg-[#1d1d1d] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black uppercase tracking-widest mb-1">
            Ürünler
          </h1>
          <p className="text-sm text-gray-400">
            Profesyonel polisaj ve araç bakım ürünleri katalogu
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
          {/* Sol Sidebar */}
          <Suspense fallback={<div className="w-full lg:w-60 shrink-0" />}>
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
                {filtered.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
