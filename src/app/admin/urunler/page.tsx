import Link from "next/link";
import Image from "next/image";
import { Plus, Package } from "lucide-react";
import { getAllProducts } from "@/db/queries";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import ProductSearch from "./product-search";
import DeleteProductButton from "./delete-product-button";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const allProducts = await getAllProducts();

  // Client-side filtering is moved to client component, but we can
  // do server-side filtering for the initial render
  const products = q
    ? allProducts.filter(
        (p) =>
          p.product_name.toLowerCase().includes(q.toLowerCase()) ||
          p.sku.toLowerCase().includes(q.toLowerCase())
      )
    : allProducts;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#002b3d]">
            Urunler
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {allProducts.length} urun kayitli
          </p>
        </div>
        <Link
          href="/admin/urunler/yeni"
          className="inline-flex items-center gap-2 bg-[#e3000f] hover:bg-red-700 text-white px-4 py-2.5 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Urun Ekle
        </Link>
      </div>

      {/* Search */}
      <ProductSearch defaultValue={q} />

      {/* Table */}
      {products.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {q ? "Aramanizla eslesen urun bulunamadi." : "Henuz urun eklenmemis."}
          </p>
          {!q && (
            <Link
              href="/admin/urunler/yeni"
              className="inline-flex items-center gap-2 mt-4 text-[#e3000f] hover:underline text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Ilk urunu ekle
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[60px] text-xs font-bold uppercase tracking-wider">
                  Gorsel
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">
                  Urun Adi
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">
                  SKU
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">
                  Kategori
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-right w-[160px]">
                  Islemler
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const cat = product.category as any;
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.product_name}
                          width={50}
                          height={50}
                          className="object-contain border border-gray-100"
                        />
                      ) : (
                        <div className="w-[50px] h-[50px] bg-gray-100 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-[#002b3d]">
                      {product.product_name}
                    </TableCell>
                    <TableCell className="text-gray-600 font-mono text-xs">
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 font-medium">
                        {cat?.main_cat || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/urunler/${product.id}/duzenle`}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                          Duzenle
                        </Link>
                        <DeleteProductButton
                          productId={product.id}
                          productName={product.product_name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
