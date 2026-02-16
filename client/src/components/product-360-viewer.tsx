import { useState, useRef, useCallback, useEffect } from "react";
import { RotateCw } from "lucide-react";

const TOTAL_FRAMES = 24;
const MENZERNA_BASE = "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Products";

const SKUS_WITH_360 = new Set([
  "22202.261.001",
  "22200.261.001",
  "22748.261.001",
  "22771.261.001",
  "22828.261.001",
  "22870.261.001",
  "22911.261.001",
  "22930.261.001",
  "22992.261.001",
  "22029.261.001",
  "22070.261.001",
  "23003.391.001",
  "24011.261.080",
]);

function toMenzernaSku(sku: string): string {
  const parts = sku.split(".");
  if (parts.length >= 4) {
    return parts[0] + parts[1] + "." + parts[2] + "." + parts[3];
  }
  return sku;
}

export function has360View(sku: string): boolean {
  return SKUS_WITH_360.has(toMenzernaSku(sku));
}

function get360ImageUrl(sku: string, frame: number): string {
  const mSku = toMenzernaSku(sku);
  const padded = String(frame).padStart(2, "0");
  return `${MENZERNA_BASE}/${mSku}/rotation${padded}.jpg`;
}

interface Product360ViewerProps {
  sku: string;
  productName: string;
}

export function Product360Viewer({ sku, productName }: Product360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; frame: number } | null>(null);
  const autoSpinRef = useRef<number | null>(null);

  useEffect(() => {
    setImagesLoaded(false);
    setLoadedCount(0);
    setCurrentFrame(0);
    setIsAutoSpinning(false);
    if (autoSpinRef.current) {
      clearInterval(autoSpinRef.current);
      autoSpinRef.current = null;
    }

    let loaded = 0;
    let errorCount = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = get360ImageUrl(sku, i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded + errorCount);
        if (loaded + errorCount === TOTAL_FRAMES) {
          setImagesLoaded(loaded > 0);
        }
      };
      img.onerror = () => {
        errorCount++;
        setLoadedCount(loaded + errorCount);
        if (loaded + errorCount === TOTAL_FRAMES) {
          setImagesLoaded(loaded > 0);
        }
      };
      images.push(img);
    }
    return () => {
      images.forEach(img => { img.onload = null; img.onerror = null; });
    };
  }, [sku]);

  useEffect(() => {
    if (imagesLoaded && !isAutoSpinning) {
      setIsAutoSpinning(true);
      let frame = 0;
      autoSpinRef.current = window.setInterval(() => {
        frame++;
        if (frame >= TOTAL_FRAMES) {
          if (autoSpinRef.current) clearInterval(autoSpinRef.current);
          autoSpinRef.current = null;
          setIsAutoSpinning(false);
          return;
        }
        setCurrentFrame(frame % TOTAL_FRAMES);
      }, 80);
    }
    return () => {
      if (autoSpinRef.current) clearInterval(autoSpinRef.current);
    };
  }, [imagesLoaded]);

  const stopAutoSpin = useCallback(() => {
    if (autoSpinRef.current) {
      clearInterval(autoSpinRef.current);
      autoSpinRef.current = null;
      setIsAutoSpinning(false);
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    stopAutoSpin();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, frame: currentFrame };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [currentFrame, stopAutoSpin]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const sensitivity = 8;
    const frameDelta = Math.round(dx / sensitivity);
    const newFrame = ((dragStartRef.current.frame + frameDelta) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
    setCurrentFrame(newFrame);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  const handleReplay = useCallback(() => {
    stopAutoSpin();
    setCurrentFrame(0);
    setIsAutoSpinning(true);
    let frame = 0;
    autoSpinRef.current = window.setInterval(() => {
      frame++;
      if (frame >= TOTAL_FRAMES) {
        if (autoSpinRef.current) clearInterval(autoSpinRef.current);
        autoSpinRef.current = null;
        setIsAutoSpinning(false);
        return;
      }
      setCurrentFrame(frame % TOTAL_FRAMES);
    }, 80);
  }, [stopAutoSpin]);

  const frameIndex = currentFrame + 1;

  return (
    <div className="border border-gray-200 bg-white" data-testid="section-360-view">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-black text-[#1d1d1d] uppercase tracking-widest text-sm flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-[#ae1d1e]" />
          360° Görünüm
        </h3>
        <button
          onClick={handleReplay}
          className="text-xs font-bold text-[#ae1d1e] hover:text-[#1d1d1d] uppercase tracking-wider transition-colors"
          data-testid="btn-360-replay"
        >
          Tekrar Oynat
        </button>
      </div>
      <div
        ref={containerRef}
        className={`relative aspect-square max-h-[500px] w-full flex items-center justify-center overflow-hidden select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "none" }}
        data-testid="viewer-360-canvas"
      >
        {!imagesLoaded ? (
          <div className="flex flex-col items-center gap-3">
            <RotateCw className="w-8 h-8 text-[#ae1d1e] animate-spin" />
            <span className="text-sm text-gray-500 font-bold">
              Yükleniyor... {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
            </span>
            <div className="w-48 h-1.5 bg-gray-200">
              <div
                className="h-full bg-[#ae1d1e] transition-all duration-200"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <img
              src={get360ImageUrl(sku, frameIndex)}
              alt={`${productName} - 360° görünüm`}
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
            {!isDragging && !isAutoSpinning && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                Döndürmek için sürükleyin
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
