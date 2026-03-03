import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  variant?: "full" | "compact";
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
  const barColor = color === "red" ? "bg-[#af1d1f]" : "bg-[#006b52]";
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

export function ProductCard({ product, variant = "full" }: ProductCardProps) {
  const { sku, product_name, image_url, category, template_fields } = product;
  const subCat = category?.sub_cat2 || category?.sub_cat_2 || category?.sub_cat || "";

  if (variant === "compact") {
    return (
      <Link
        href={`/urunler/${sku}`}
        className="group flex flex-col bg-white border border-gray-200 hover:border-[#af1d1f] hover:shadow-md transition-all duration-200"
      >
        {/* Gorsel - kompakt */}
        <div className="relative aspect-[4/3] bg-[#f8f9fa] flex items-center justify-center overflow-hidden p-2">
          {image_url ? (
            <Image
              src={image_url}
              alt={product_name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
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
              <span className="text-[9px] uppercase tracking-widest">Gorsel Yok</span>
            </div>
          )}
        </div>

        {/* Icerik - kompakt */}
        <div className="flex flex-col p-3 gap-1">
          {subCat && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#af1d1f] leading-none">
              {subCat}
            </span>
          )}
          <h3 className="text-xs font-bold text-[#1d1d1d] uppercase leading-tight group-hover:text-[#af1d1f] transition-colors line-clamp-2">
            {product_name}
          </h3>
        </div>
      </Link>
    );
  }

  // Full variant (varsayilan)
  const cutLevel = template_fields?.cut_level;
  const finishLevel = template_fields?.finish_level;
  const hasBars =
    (cutLevel != null && cutLevel > 0) ||
    (finishLevel != null && finishLevel > 0);

  return (
    <Link
      href={`/urunler/${sku}`}
      className="group flex flex-col bg-white border border-gray-200 hover:border-[#af1d1f] hover:shadow-md transition-all duration-200"
    >
      {/* Gorsel */}
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
            <span className="text-[10px] uppercase tracking-widest">Gorsel Yok</span>
          </div>
        )}
      </div>

      {/* Icerik */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Alt kategori etiketi */}
        {subCat && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#af1d1f] leading-none">
            {subCat}
          </span>
        )}

        {/* Urun adi */}
        <h3 className="text-sm font-bold text-[#1d1d1d] uppercase leading-tight group-hover:text-[#af1d1f] transition-colors line-clamp-2">
          {product_name}
        </h3>

        {/* Seviye cubuklari */}
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
