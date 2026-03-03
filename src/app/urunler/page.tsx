import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/db/queries";
import { ProductCard } from "@/components/product-card";
import { CategorySidebar } from "@/components/category-sidebar";
import type { Product } from "@/lib/types";
import { Search } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Menzerna'nın profesyonel polisaj ürünleri katalogu. Araç bakım, endüstriyel ve marin polisaj ürünleri.",
};

// Kategori slug -> DB alanlarına eşleştirme tablosu
const CATEGORY_SLUG_MAP: Record<string, (product: Product) => boolean> = {
  "polisaj-urunleri": (p) =>
    p.category?.main_cat?.toLowerCase().includes("polisaj") ||
    p.category?.sub_cat?.toLowerCase().includes("polisaj") ||
    false,
  "pasta-cila": (p) =>
    p.category?.sub_cat?.toLowerCase().includes("pasta") ||
    p.category?.sub_cat?.toLowerCase().includes("cila") ||
    p.category?.sub_cat2?.toLowerCase().includes("pasta") ||
    (p.category as any)?.sub_cat_2?.toLowerCase().includes("pasta") ||
    false,
  "heavy-cut": (p) =>
    p.category?.sub_cat2?.toLowerCase().includes("heavy") ||
    (p.category as any)?.sub_cat_2?.toLowerCase().includes("heavy") ||
    p.product_name?.toLowerCase().includes("heavy") ||
    (p.template_fields?.cut_level != null && (p.template_fields.cut_level) >= 8) ||
    false,
  "medium-cut": (p) =>
    p.category?.sub_cat2?.toLowerCase().includes("medium") ||
    (p.category as any)?.sub_cat_2?.toLowerCase().includes("medium") ||
    p.product_name?.toLowerCase().includes("medium") ||
    (p.template_fields?.cut_level != null &&
      p.template_fields.cut_level >= 4 &&
      p.template_fields.cut_level < 8) ||
    false,
  "fine-cut-finish": (p) =>
    p.category?.sub_cat2?.toLowerCase().includes("finish") ||
    (p.category as any)?.sub_cat_2?.toLowerCase().includes("finish") ||
    p.category?.sub_cat2?.toLowerCase().includes("fine") ||
    p.product_name?.toLowerCase().includes("finish") ||
    p.product_name?.toLowerCase().includes("fine") ||
    false,
  "koruma": (p) =>
    p.category?.sub_cat2?.toLowerCase().includes("koruma") ||
    (p.category as any)?.sub_cat_2?.toLowerCase().includes("koruma") ||
    p.category?.sub_cat?.toLowerCase().includes("koruma") ||
    p.product_name?.toLowerCase().includes("wax") ||
    p.product_name?.toLowerCase().includes("sealant") ||
    p.product_name?.toLowerCase().includes("protection") ||
    false,
  "metal-polish": (p) =>
    p.category?.sub_cat2?.toLowerCase().includes("metal") ||
    (p.category as any)?.sub_cat_2?.toLowerCase().includes("metal") ||
    p.product_name?.toLowerCase().includes("metal") ||
    false,
  "aksesuarlar": (p) =>
    p.category?.main_cat?.toLowerCase().includes("aksesuar") ||
    p.category?.sub_cat?.toLowerCase().includes("pad") ||
    p.category?.sub_cat?.toLowerCase().includes("sünger") ||
    p.category?.sub_cat?.toLowerCase().includes("sunger") ||
    p.category?.sub_cat?.toLowerCase().includes("yün") ||
    p.category?.sub_cat?.toLowerCase().includes("yun") ||
    false,
  "sunger-pad": (p) =>
    p.category?.sub_cat?.toLowerCase().includes("sünger") ||
    p.category?.sub_cat?.toLowerCase().includes("sunger") ||
    p.product_name?.toLowerCase().includes("sünger") ||
    p.product_name?.toLowerCase().includes("foam") ||
    false,
  "yun-pad": (p) =>
    p.category?.sub_cat?.toLowerCase().includes("yün") ||
    p.category?.sub_cat?.toLowerCase().includes("yun") ||
    p.category?.sub_cat?.toLowerCase().includes("wool") ||
    p.product_name?.toLowerCase().includes("yün") ||
    p.product_name?.toLowerCase().includes("wool") ||
    false,
  "taban": (p) =>
    p.category?.sub_cat?.toLowerCase().includes("taban") ||
    p.product_name?.toLowerCase().includes("taban") ||
    p.product_name?.toLowerCase().includes("backing") ||
    false,
  "endustriyel": (p) =>
    p.category?.main_cat?.toLowerCase().includes("endüstriyel") ||
    p.category?.main_cat?.toLowerCase().includes("endustriyel") ||
    p.category?.main_cat?.toLowerCase().includes("industrial") ||
    false,
  "marin": (p) =>
    p.category?.main_cat?.toLowerCase().includes("marin") ||
    p.category?.main_cat?.toLowerCase().includes("marine") ||
    false,
};

function filterProducts(
  products: Product[],
  category: string,
  query: string
): Product[] {
  let result = products;

  if (category && CATEGORY_SLUG_MAP[category]) {
    result = result.filter(CATEGORY_SLUG_MAP[category]);
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.product_name?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.category?.sub_cat?.toLowerCase().includes(q) ||
        p.category?.main_cat?.toLowerCase().includes(q)
    );
  }

  return result;
}

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
      <div className="bg-[#002b3d] text-white py-10">
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
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#e3000f] transition-colors"
            />
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Sidebar */}
          <Suspense fallback={<div className="w-full lg:w-56 shrink-0" />}>
            <CategorySidebar />
          </Suspense>

          {/* Sağ: Ürün grid */}
          <div className="flex-1 min-w-0">
            {/* Sonuç sayısı */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-[#002b3d]">
                  {filtered.length}
                </span>{" "}
                ürün bulundu
                {category && (
                  <span className="ml-1">
                    — filtre:{" "}
                    <span className="font-bold capitalize">
                      {category.replace(/-/g, " ")}
                    </span>
                  </span>
                )}
              </p>
              {(category || query) && (
                <a
                  href="/urunler"
                  className="text-xs font-bold uppercase tracking-wider text-[#e3000f] hover:underline"
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
                  className="mt-6 text-sm font-bold text-[#e3000f] hover:underline uppercase tracking-wider"
                >
                  Tüm ürünleri göster
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
