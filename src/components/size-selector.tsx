"use client";

import { useRouter } from "next/navigation";

interface SizeSelectorProps {
  variants: { sku: string; sizeLabel: string }[];
  currentSku: string;
}

export function SizeSelector({ variants, currentSku }: SizeSelectorProps) {
  const router = useRouter();

  if (variants.length < 1) return null;

  return (
    <div>
      <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">
        Boyut Secenekleri
      </span>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isActive = v.sku === currentSku;
          return (
            <button
              key={v.sku}
              onClick={() => {
                if (!isActive) {
                  router.push(`/urunler/${v.sku}`);
                }
              }}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                isActive
                  ? "bg-[#1d1d1d] text-white border-[#1d1d1d]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#af1d1f] hover:text-[#af1d1f]"
              }`}
            >
              {v.sizeLabel || "Standart"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
