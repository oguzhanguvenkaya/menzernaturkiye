"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

interface ProductSearchProps {
  defaultValue?: string;
}

export default function ProductSearch({ defaultValue }: ProductSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue || "");
  const [isPending, startTransition] = useTransition();

  function handleSearch(value: string) {
    setQuery(value);
    startTransition(() => {
      const params = new URLSearchParams();
      if (value.trim()) {
        params.set("q", value.trim());
      }
      router.push(`/admin/urunler${params.toString() ? `?${params}` : ""}`);
    });
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Urun adi veya SKU ile ara..."
        className="w-full border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors"
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-[#e3000f] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
