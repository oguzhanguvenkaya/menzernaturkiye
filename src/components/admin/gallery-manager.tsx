"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUp, ArrowDown, X, ImageIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface SizeVariantInfo {
  sku: string;
  sizeLabel: string;
  imageUrl: string | null;
}

interface GalleryManagerProps {
  images: string[];
  sizeVariants: SizeVariantInfo[];
}

export default function GalleryManager({
  images: initialImages,
  sizeVariants: initialVariants,
}: GalleryManagerProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [variantMap, setVariantMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const v of initialVariants) {
      if (v.imageUrl) map[v.sku] = v.imageUrl;
    }
    return map;
  });
  const [newUrl, setNewUrl] = useState("");

  const moveUp = useCallback((index: number) => {
    if (index <= 0) return;
    setImages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((index: number) => {
    setImages((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addImage = useCallback(() => {
    const url = newUrl.trim();
    if (!url) return;
    setImages((prev) => (prev.includes(url) ? prev : [...prev, url]));
    setNewUrl("");
  }, [newUrl]);

  const handleVariantChange = useCallback(
    (sku: string, imageUrl: string) => {
      setVariantMap((prev) => ({ ...prev, [sku]: imageUrl }));
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Hidden inputs for form submission */}
      <input type="hidden" name="gallery_json" value={JSON.stringify(images)} />
      <input
        type="hidden"
        name="image_url"
        value={images[0] || ""}
      />
      {initialVariants.length > 1 && (
        <input
          type="hidden"
          name="variant_images_json"
          value={JSON.stringify(variantMap)}
        />
      )}

      {/* Gallery grid */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
          Gorsel Galerisi
        </p>
        {images.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-gray-400 py-8 justify-center border border-dashed border-gray-300 bg-gray-50">
            <ImageIcon className="w-5 h-5" />
            Henuz gorsel eklenmemis
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative border border-gray-200 bg-white group"
              >
                {/* Order number */}
                <div className="absolute top-1 left-1 z-10 bg-black/70 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </div>
                {index === 0 && (
                  <div className="absolute top-1 right-1 z-10 bg-[#af1d1f] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                    Ana
                  </div>
                )}

                {/* Image */}
                <div className="aspect-square relative bg-white">
                  <Image
                    src={url}
                    alt={`Gorsel ${index + 1}`}
                    fill
                    sizes="150px"
                    className="object-contain p-1"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-1 p-1.5 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    title="Yukari tasi"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === images.length - 1}
                    className="p-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    title="Asagi tasi"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1 hover:bg-red-50 text-red-500 transition-colors"
                    title="Sil"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new image URL */}
        <div className="flex gap-2 mt-3">
          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Yeni gorsel URL ekle..."
            className="rounded-none flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImage();
              }
            }}
          />
          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1 bg-[#1d1d1d] hover:bg-[#333] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ekle
          </button>
        </div>
      </div>

      {/* Variant-image mapping (only show if multiple variants) */}
      {initialVariants.length > 1 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
            Boyut-Gorsel Eslestirmesi
          </p>
          <div className="border border-gray-200 divide-y divide-gray-200">
            {initialVariants.map((v) => (
              <div
                key={v.sku}
                className="flex items-center gap-4 p-3 bg-white"
              >
                {/* Variant info */}
                <div className="w-24 shrink-0">
                  <span className="text-xs font-bold text-[#1d1d1d] uppercase">
                    {v.sizeLabel || "Standart"}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">{v.sku}</p>
                </div>

                {/* Current image preview */}
                <div className="w-10 h-10 border border-gray-200 bg-white shrink-0 relative">
                  {(variantMap[v.sku] || v.imageUrl) ? (
                    <Image
                      src={variantMap[v.sku] || v.imageUrl!}
                      alt={v.sizeLabel}
                      fill
                      sizes="40px"
                      className="object-contain p-0.5"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Dropdown: select from gallery */}
                <select
                  value={variantMap[v.sku] || ""}
                  onChange={(e) => handleVariantChange(v.sku, e.target.value)}
                  className="flex-1 h-8 border border-gray-200 bg-white px-2 text-xs focus:outline-none focus:border-[#af1d1f]"
                >
                  <option value="">Galeriden sec...</option>
                  {images.map((url, i) => (
                    <option key={`${url}-${i}`} value={url}>
                      Gorsel {i + 1} {i === 0 ? "(Ana)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
