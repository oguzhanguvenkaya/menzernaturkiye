import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProductById, getAllProducts } from "@/db/queries";
import ProductForm from "@/components/admin/product-form";
import {
  groupProductsBySize,
  extractSizeLabel,
  getGroupGalleryImages,
} from "@/lib/product-utils";
import type { Product } from "@/lib/types";

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

  // Build gallery and size variants for GalleryManager
  const allProducts = (await getAllProducts()) as unknown as Product[];
  const groups = groupProductsBySize(allProducts);
  const productGroup = groups.find((g) =>
    g.variants.some((v) => v.product.sku === product.sku)
  );

  // Gallery: product image + content.gallery + variant images (deduplicated)
  const gallery = productGroup
    ? getGroupGalleryImages(productGroup)
    : (() => {
        const imgs: string[] = [];
        if (product.image_url) imgs.push(product.image_url);
        const g = (product.content as any)?.gallery;
        if (Array.isArray(g)) {
          for (const url of g) {
            if (url && !imgs.includes(url)) imgs.push(url);
          }
        }
        return imgs;
      })();

  // Size variants for the group
  const sizeVariants = productGroup
    ? productGroup.variants.map((v) => ({
        sku: v.product.sku,
        sizeLabel: v.sizeLabel || extractSizeLabel(v.product.product_name),
        imageUrl: v.product.image_url || null,
      }))
    : [
        {
          sku: product.sku,
          sizeLabel: extractSizeLabel(product.product_name),
          imageUrl: product.image_url || null,
        },
      ];

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
      <ProductForm
        product={product}
        gallery={gallery}
        sizeVariants={sizeVariants}
      />
    </div>
  );
}
