import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/product-form";
import { getAllProducts } from "@/db/queries";
import type { Product } from "@/lib/types";

export default async function NewProductPage() {
  const allProducts = (await getAllProducts()) as unknown as Product[];
  const allProductsForPicker = allProducts.map((p) => ({
    sku: p.sku,
    name: p.product_name,
    imageUrl: p.image_url || null,
  }));
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/urunler"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#af1d1f] transition-colors mb-2"
        >
          <ChevronLeft className="w-3 h-3" />
          Urunlere don
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-wider text-[#1d1d1d]">
          Yeni Urun Ekle
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Urun bilgilerini doldurarak yeni bir urun ekleyin
        </p>
      </div>

      {/* Form */}
      <ProductForm allProducts={allProductsForPicker} />
    </div>
  );
}
