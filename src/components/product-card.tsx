import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

function LevelBar({
  value,
  color,
  label,
}: {
  value: number;
  color: "red" | "green";
  label: string;
}) {
  const clampedValue = Math.min(Math.max(value, 0), 10);
  const percentage = (clampedValue / 10) * 100;
  const barColor = color === "red" ? "bg-[#e3000f]" : "bg-[#009b77]";
  const trackColor = color === "red" ? "bg-red-100" : "bg-green-100";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 w-8 shrink-0">
        {label}
      </span>
      <div className={`flex-1 h-1.5 ${trackColor} rounded-none overflow-hidden`}>
        <div
          className={`h-full ${barColor} rounded-none`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[10px] font-bold text-gray-500 w-4 text-right shrink-0">
        {clampedValue}
      </span>
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const { sku, product_name, image_url, category, template_fields } = product;
  const subCat = category?.sub_cat2 || category?.sub_cat_2 || category?.sub_cat || "";
  const cutLevel = template_fields?.cut_level;
  const finishLevel = template_fields?.finish_level;
  const hasBars =
    (cutLevel != null && cutLevel > 0) ||
    (finishLevel != null && finishLevel > 0);

  return (
    <Link
      href={`/urunler/${sku}`}
      className="group flex flex-col bg-white border border-gray-200 hover:border-[#e3000f] hover:shadow-md transition-all duration-200"
    >
      {/* Görsel */}
      <div className="relative aspect-square bg-[#f8f9fa] flex items-center justify-center overflow-hidden p-4">
        {image_url ? (
          <Image
            src={image_url}
            alt={product_name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-[10px] uppercase tracking-widest">Görsel Yok</span>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Alt kategori etiketi */}
        {subCat && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#e3000f] leading-none">
            {subCat}
          </span>
        )}

        {/* Ürün adı */}
        <h3 className="text-sm font-bold text-[#002b3d] uppercase leading-tight group-hover:text-[#e3000f] transition-colors line-clamp-2">
          {product_name}
        </h3>

        {/* Seviye çubukları */}
        {hasBars && (
          <div className="mt-auto pt-3 flex flex-col gap-1.5">
            {cutLevel != null && cutLevel > 0 && (
              <LevelBar value={cutLevel} color="red" label="Kes" />
            )}
            {finishLevel != null && finishLevel > 0 && (
              <LevelBar value={finishLevel} color="green" label="Parla" />
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
