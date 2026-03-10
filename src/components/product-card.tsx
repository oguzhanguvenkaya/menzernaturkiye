"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BadgeType, CardVariant } from "@/lib/product-utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductCardData {
  sku: string;
  productName: string;
  imageUrl: string | null;
  subCat: string;
  badge: BadgeType;
  cutLevel: number | null;
  finishLevel: number | null;
  variants: CardVariant[];
  defaultSku: string;
  gallery?: string[];
}

interface ProductCardProps {
  data: ProductCardData;
  variant?: "full" | "compact";
}

// ---------------------------------------------------------------------------
// Segmented Bar
// ---------------------------------------------------------------------------

function SegmentedBar({
  value,
  color,
  label,
}: {
  value: number;
  color: "red" | "green";
  label: string;
}) {
  const clamped = Math.min(Math.max(value, 0), 10);
  const filled = color === "red" ? "bg-[#af1d1f]" : "bg-[#006b52]";

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 w-12 shrink-0">
        {label}
      </span>
      <div className="flex gap-[2px] flex-1">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`h-[6px] flex-1 ${i < clamped ? filled : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hook: cycle through GALLERY images on hover over image area
// ---------------------------------------------------------------------------

function useHoverGallerySlide(galleryImages: string[]) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const canSlide = galleryImages.length > 1;
  const isHovering = activeIndex >= 0;
  const hoverImageUrl = isHovering ? galleryImages[activeIndex] ?? null : null;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startSlide = useCallback(() => {
    if (!canSlide) return;
    clearTimer();
    indexRef.current = 1;
    setActiveIndex(1);

    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % galleryImages.length;
      setActiveIndex(indexRef.current);
    }, 1500);
  }, [canSlide, galleryImages, clearTimer]);

  const stopSlide = useCallback(() => {
    clearTimer();
    setActiveIndex(-1);
  }, [clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return {
    hoverImageUrl,
    activeIndex,
    isHovering,
    startSlide,
    stopSlide,
    canSlide,
    totalImages: galleryImages.length,
  };
}

// ---------------------------------------------------------------------------
// ProductCard
// ---------------------------------------------------------------------------

export function ProductCard({ data, variant = "full" }: ProductCardProps) {
  const {
    productName,
    imageUrl,
    subCat,
    badge,
    cutLevel,
    finishLevel,
    variants,
    defaultSku,
    gallery = [],
  } = data;

  const [selectedSku, setSelectedSku] = useState(defaultSku);

  const currentVariant = variants.find((v) => v.sku === selectedSku);
  const baseImage = currentVariant?.imageUrl || imageUrl;

  const { hoverImageUrl, activeIndex, isHovering, startSlide, stopSlide, totalImages } =
    useHoverGallerySlide(gallery);

  // When hovering image area → show gallery slide, otherwise show selected variant image
  const displayImage = hoverImageUrl || baseImage;
  const showDots = isHovering && totalImages > 1;

  const hasBars =
    (cutLevel != null && cutLevel > 0) ||
    (finishLevel != null && finishLevel > 0);

  const badgeInfo = badge ? getBadgeInfoLocal(badge) : null;

  // Size button click → stop slide, switch to that variant's image
  const handleSizeClick = useCallback(
    (sku: string) => {
      stopSlide();
      setSelectedSku(sku);
    },
    [stopSlide],
  );

  // --- Compact variant ---
  if (variant === "compact") {
    return (
      <div className="group flex flex-col bg-white border border-gray-100 hover:border-[#af1d1f]/30 hover:shadow-sm transition-all duration-200">
        {/* Image area — slide only here */}
        <Link
          href={`/urunler/${selectedSku}`}
          className="relative aspect-[4/3] bg-white flex items-center justify-center overflow-hidden"
          onMouseEnter={startSlide}
          onMouseLeave={stopSlide}
        >
          {badgeInfo && (
            <span
              className="absolute top-2 left-2 z-10 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5"
              style={{ backgroundColor: badgeInfo.bg, color: badgeInfo.color }}
            >
              {badgeInfo.label}
            </span>
          )}
          {displayImage ? (
            <Image
              src={displayImage}
              alt={productName}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 transition-opacity duration-300"
            />
          ) : (
            <PlaceholderIcon size="sm" />
          )}
          {showDots && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1">
              {Array.from({ length: totalImages }, (_, i) => (
                <span
                  key={i}
                  className={`w-[6px] h-[6px] transition-colors ${
                    i === activeIndex ? "bg-[#af1d1f]" : "bg-white border border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </Link>
        <div className="flex flex-col p-3 gap-1">
          {subCat && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#af1d1f] leading-none">
              {subCat}
            </span>
          )}
          <Link href={`/urunler/${selectedSku}`}>
            <h3 className="text-sm font-bold text-[#1d1d1d] uppercase leading-tight group-hover:text-[#af1d1f] transition-colors line-clamp-2">
              {productName}
            </h3>
          </Link>
          {variants.length > 1 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {variants.map((v) => {
                const isActive = v.sku === selectedSku;
                return (
                  <button
                    key={v.sku}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSizeClick(v.sku);
                    }}
                    className={`px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border transition-colors ${
                      isActive
                        ? "bg-[#1d1d1d] text-white border-[#1d1d1d]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#af1d1f] hover:text-[#af1d1f]"
                    }`}
                  >
                    {v.sizeLabel || "Standart"}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Full variant ---
  return (
    <div className="group flex flex-col bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      {/* Image area — slide only here */}
      <Link
        href={`/urunler/${selectedSku}`}
        className="relative aspect-square bg-white flex items-center justify-center overflow-hidden"
        onMouseEnter={startSlide}
        onMouseLeave={stopSlide}
      >
        {badgeInfo && (
          <span
            className="absolute top-2 left-2 z-10 text-[9px] font-bold uppercase tracking-wider px-2 py-1"
            style={{ backgroundColor: badgeInfo.bg, color: badgeInfo.color }}
          >
            {badgeInfo.label}
          </span>
        )}
        {displayImage ? (
          <Image
            src={displayImage}
            alt={productName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 transition-opacity duration-300"
          />
        ) : (
          <PlaceholderIcon size="lg" />
        )}
        {showDots && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1">
            {Array.from({ length: totalImages }, (_, i) => (
              <span
                key={i}
                className={`w-[7px] h-[7px] transition-colors ${
                  i === activeIndex ? "bg-[#af1d1f]" : "bg-white border border-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Content area — no slide trigger here */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {subCat && (
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#af1d1f] leading-none">
            {subCat}
          </span>
        )}

        <Link href={`/urunler/${selectedSku}`}>
          <h3 className="text-[13px] font-bold text-[#1d1d1d] uppercase leading-tight group-hover:text-[#af1d1f] transition-colors line-clamp-2">
            {productName}
          </h3>
        </Link>

        {/* Size selector — click stops slide and switches variant image */}
        {variants.length > 1 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {variants.map((v) => {
              const isActive = v.sku === selectedSku;
              return (
                <button
                  key={v.sku}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSizeClick(v.sku);
                  }}
                  className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    isActive
                      ? "bg-[#1d1d1d] text-white border-[#1d1d1d]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#af1d1f] hover:text-[#af1d1f]"
                  }`}
                >
                  {v.sizeLabel || "Standart"}
                </button>
              );
            })}
          </div>
        )}

        {/* Cut/Gloss bars */}
        {hasBars && (
          <div className="mt-auto pt-2 flex flex-col gap-1">
            {cutLevel != null && cutLevel > 0 && (
              <SegmentedBar value={cutLevel} color="red" label="Kesim" />
            )}
            {finishLevel != null && finishLevel > 0 && (
              <SegmentedBar value={finishLevel} color="green" label="Parlaklık" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBadgeInfoLocal(badge: BadgeType): { label: string; color: string; bg: string } | null {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    "Heavy Cut":  { label: "Heavy Cut",  color: "#fff",   bg: "#B6352E" },
    "Medium Cut": { label: "Medium Cut", color: "#1d1d1d", bg: "#F3EE50" },
    "Finish":     { label: "Finish",     color: "#1d1d1d", bg: "#CDDB3B" },
    "3in1":       { label: "3in1",       color: "#fff",   bg: "#622B86" },
    "Marin 3in1": { label: "3in1",       color: "#fff",   bg: "#393156" },
    "Protection": { label: "Protection", color: "#1d1d1d", bg: "#87B6E6" },
    "Matte":      { label: "Matte",      color: "#1d1d1d", bg: "#EACC3E" },
  };
  if (!badge) return null;
  return map[badge] || null;
}

function PlaceholderIcon({ size }: { size: "sm" | "lg" }) {
  const cls = size === "sm" ? "w-8 h-8" : "w-12 h-12";
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}
