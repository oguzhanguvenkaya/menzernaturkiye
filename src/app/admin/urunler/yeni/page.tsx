import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/urunler"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#e3000f] transition-colors mb-2"
        >
          <ChevronLeft className="w-3 h-3" />
          Urunlere don
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-wider text-[#002b3d]">
          Yeni Urun Ekle
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Urun bilgilerini doldurarak yeni bir urun ekleyin
        </p>
      </div>

      {/* Form */}
      <ProductForm />
    </div>
  );
}
