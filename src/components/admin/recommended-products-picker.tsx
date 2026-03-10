"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, X, GripVertical } from "lucide-react";

export interface RecommendedProduct {
  sku: string;
  name: string;
  imageUrl: string | null;
}

interface RecommendedProductsPickerProps {
  allProducts: RecommendedProduct[];
  initialSelected: RecommendedProduct[];
}

export default function RecommendedProductsPicker({
  allProducts,
  initialSelected,
}: RecommendedProductsPickerProps) {
  const [selected, setSelected] = useState<RecommendedProduct[]>(initialSelected);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedSkus = new Set(selected.map((p) => p.sku));

  const filtered = query.trim()
    ? allProducts.filter(
        (p) =>
          !selectedSkus.has(p.sku) &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  function addProduct(product: RecommendedProduct) {
    setSelected((prev) => [...prev, product]);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function removeProduct(sku: string) {
    setSelected((prev) => prev.filter((p) => p.sku !== sku));
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setSelected((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(index);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  // Hidden input for form submission
  const jsonValue = JSON.stringify(
    selected.map((p) => ({
      name: p.name,
      name_tr: p.name,
      sku: p.sku,
    }))
  );

  return (
    <div className="space-y-3">
      {/* Search input */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => query.trim() && setIsOpen(true)}
            placeholder="Urun adi veya SKU ile ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#af1d1f] focus:border-[#af1d1f]"
          />
        </div>

        {/* Dropdown results */}
        {isOpen && filtered.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
            {filtered.slice(0, 20).map((product) => (
              <button
                key={product.sku}
                type="button"
                onClick={() => addProduct(product)}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors"
              >
                <div className="w-8 h-8 bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt=""
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-400">{product.sku}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {isOpen && query.trim() && filtered.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg p-3 text-sm text-gray-500">
            Sonuc bulunamadi
          </div>
        )}
      </div>

      {/* Selected products */}
      {selected.length > 0 && (
        <div className="space-y-1">
          {selected.map((product, index) => (
            <div
              key={product.sku}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 px-3 py-2 border transition-colors ${
                dragIndex === index
                  ? "border-[#af1d1f] bg-red-50"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0" />
              <div className="w-8 h-8 bg-white flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </div>
                <div className="text-xs text-gray-400">{product.sku}</div>
              </div>
              <button
                type="button"
                onClick={() => removeProduct(product.sku)}
                className="p-1 text-gray-400 hover:text-[#af1d1f] transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {selected.length === 0 && (
        <p className="text-xs text-gray-400">
          Henuz urun eklenmedi. Yukaridaki arama kutusundan urun ekleyebilirsiniz.
        </p>
      )}

      {/* Hidden form input */}
      <input type="hidden" name="recommended_products_json" value={jsonValue} />
    </div>
  );
}
