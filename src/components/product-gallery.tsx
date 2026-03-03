"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerDownRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
    pointerDownRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerDownRef.current || !swipeStartRef.current) return;
      pointerDownRef.current = false;
      const dx = e.clientX - swipeStartRef.current.x;
      const dy = e.clientY - swipeStartRef.current.y;
      swipeStartRef.current = null;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40 && images.length > 1) {
        if (dx < 0) {
          setSelectedIndex((prev) => (prev + 1) % images.length);
        } else {
          setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
        }
      }
    },
    [images.length]
  );

  const handlePointerCancel = useCallback(() => {
    pointerDownRef.current = false;
    swipeStartRef.current = null;
  }, []);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square bg-[#f8f9fa] flex items-center justify-center overflow-hidden border border-gray-200">
        <div className="flex flex-col items-center gap-3 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={0.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs uppercase tracking-widest">
            Gorsel Mevcut Degil
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 shrink-0">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-16 h-16 lg:w-20 lg:h-20 border-2 p-1 bg-white flex items-center justify-center transition-all ${
                idx === selectedIndex
                  ? "border-[#af1d1f] shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${productName} - ${idx + 1}`}
                width={72}
                height={72}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div
        className="relative aspect-square bg-[#f8f9fa] flex items-center justify-center overflow-hidden border border-gray-200 flex-1 select-none cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {images.map((imgUrl, idx) => (
          <Image
            key={imgUrl}
            src={imgUrl}
            alt={`${productName} - ${idx + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority={idx === 0}
            className="object-contain p-8 transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(${(idx - selectedIndex) * 100}%)`,
              opacity: idx === selectedIndex ? 1 : 0,
            }}
            draggable={false}
          />
        ))}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-2 h-2 transition-all ${
                  idx === selectedIndex
                    ? "bg-[#af1d1f] scale-125"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
                aria-label={`Gorsel ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
