import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProductById } from "@/db/queries";
import ProductForm from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

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
          Urunu Duzenle
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {product.product_name}
        </p>
      </div>

      {/* Form */}
      <ProductForm product={product} />
    </div>
  );
}
