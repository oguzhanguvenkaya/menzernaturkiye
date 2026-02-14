import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "wouter";
import { ChevronRight, CheckCircle2, HelpCircle, Droplets, Shield, Settings, Beaker } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct, useProducts } from "@/lib/data";
import { groupProductsBySize } from "@/lib/product-utils";

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

const volumeLineRegex = /^[•\s]*(Hacim|Volume|İçerik|Ambalaj)\s*[:;]\s*\d+[\d.,]*\s*(ml|lt|litre|liter|kg|gr)\b.*$/i;
const volumeParenRegex = /\s*[\(\[]\s*\d+[\d.,]*\s*(ml|lt|litre|liter|kg|gr)\s*[\)\]]/gi;
const volumeSuffixRegex = /\s*[-–—]\s*\d+[\d.,]*\s*(ml|lt|litre|liter|kg|gr)\b/gi;

function stripVolumeFromText(text: string): string {
  const lines = text.split("\n");
  const filtered = lines.filter(line => !volumeLineRegex.test(line.trim()));
  return filtered.join("\n");
}

function stripVolumeFromTitle(text: string): string {
  let result = text;
  result = result.replace(volumeParenRegex, "");
  result = result.replace(volumeSuffixRegex, "");
  return result.replace(/\s+$/, "").trim();
}

function cleanDescription(raw: string): string {
  let text = raw;
  text = text.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "\n\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = decodeHtmlEntities(text);
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  text = stripVolumeFromText(text);
  return text;
}

function renderFormattedDescription(raw: string) {
  const cleaned = cleanDescription(raw);
  const paragraphs = cleaned.split(/\n\n+/);

  return paragraphs.map((paragraph: string, i: number) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("•") || trimmed.includes("\n•")) {
      const lines = trimmed.split("\n").filter((l: string) => {
        const t = l.trim();
        if (!t) return false;
        const content = t.replace(/^[•\s]+/, "");
        if (volumeLineRegex.test(content)) return false;
        if (/^(Hacim|Volume)\s*[:;]/i.test(content)) return false;
        return true;
      });
      if (lines.length === 0) return null;
      return (
        <ul key={i} className="space-y-2 my-4">
          {lines.map((line: string, j: number) => {
            const stripped = line.trim();
            if (stripped.startsWith("o ")) {
              return (
                <li key={j} className="flex items-start gap-3 ml-8 p-2">
                  <span className="text-gray-400 shrink-0 mt-0.5">○</span>
                  <span className="text-gray-700">{stripped.replace(/^o\s+/, "")}</span>
                </li>
              );
            }
            return (
              <li key={j} className="flex items-start gap-3 bg-gray-50 p-3 border-l-4 border-[#e3000f]">
                <CheckCircle2 className="w-5 h-5 text-[#e3000f] shrink-0 mt-0.5" />
                <span className="font-medium">{stripped.replace(/^[•\s]+/, "")}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    if (/^\d+\./.test(trimmed)) {
      const lines = trimmed.split("\n").filter((l: string) => l.trim());
      const elements: React.ReactNode[] = [];
      let stepNum = 0;
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j].trim();
        if (/^\d+[\.\)]/.test(line)) {
          stepNum++;
          elements.push(
            <li key={j} className="flex items-start gap-3 bg-gray-50 p-3 border-l-4 border-[#002b3d]">
              <span className="flex items-center justify-center w-7 h-7 bg-[#002b3d] text-white font-black shrink-0 text-sm">{stepNum}</span>
              <span className="font-medium">{line.replace(/^\d+[\.\)]\s*/, "")}</span>
            </li>
          );
        } else if (line.startsWith("o ")) {
          elements.push(
            <li key={j} className="flex items-start gap-3 ml-10 p-2">
              <span className="text-gray-400 shrink-0 mt-0.5">○</span>
              <span className="text-gray-700 text-sm">{line.replace(/^o\s+/, "")}</span>
            </li>
          );
        } else {
          elements.push(
            <li key={j} className="flex items-start gap-3 ml-10 p-2">
              <span className="text-gray-700 text-sm">{line}</span>
            </li>
          );
        }
      }
      return <ol key={i} className="space-y-2 my-4">{elements}</ol>;
    }

    const cleanedTrimmed = stripVolumeFromTitle(trimmed);
    const isBold = cleanedTrimmed.length < 80 && !cleanedTrimmed.includes(".");
    if (isBold) {
      return <h3 key={i} className="text-xl font-black text-[#002b3d] uppercase tracking-wide mt-8 mb-3">{cleanedTrimmed}</h3>;
    }
    return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{cleanedTrimmed}</p>;
  });
}

function findMatchingProduct(accessoryName: string, accessoryNameTr: string | undefined, allProducts: any[]): any | null {
  if (!allProducts || allProducts.length === 0) return null;
  const names = [accessoryName, accessoryNameTr].filter(Boolean) as string[];
  let bestMatch: any = null;
  let bestScore = 0;
  for (const name of names) {
    const lower = name.toLowerCase().replace(/[^a-z0-9\süçöğışçöüğişÇÖÜĞİŞ]/gi, "");
    const keywords = lower.split(/\s+/).filter(w => w.length > 2 && !["for", "the", "and", "with", "bir", "ile", "olan", "pad"].includes(w));
    if (keywords.length === 0) continue;
    for (const p of allProducts) {
      const pName = (p.product_name || "").toLowerCase();
      let score = 0;
      for (const kw of keywords) {
        if (pName.includes(kw)) score++;
      }
      if (score > bestScore && score >= 2) {
        bestScore = score;
        bestMatch = p;
      }
    }
  }
  return bestMatch;
}

function getCategorySlug(product: any): string {
  const mainCat = (product.category?.main_cat || "").toUpperCase();
  const subCat = (product.category?.sub_cat || "").toLowerCase();
  if (mainCat === "AKSESUAR" || subCat.includes("ped") || subCat.includes("keçe") || subCat.includes("aksesuar")) return "accessories";
  if (subCat.includes("marin") || subCat.includes("boat") || subCat.includes("tekne")) return "boat-polish";
  if (subCat.includes("katı") || subCat.includes("solid")) return "solid-compounds";
  return "car-polish";
}

export default function ProductDetail() {
  const { category, id } = useParams();
  const sku = id as string;

  const { data: product, isLoading } = useProduct(sku);
  const { data: allProducts } = useProducts();

  const group = useMemo(() => {
    if (!allProducts || !product) return null;
    const groups = groupProductsBySize(allProducts);
    return groups.find((g) => g.variants.some((v) => v.product.sku === sku)) || null;
  }, [allProducts, product, sku]);

  const hasVariants = group && group.variants.length > 1;

  const [activeSku, setActiveSku] = useState(sku);
  const [activeTab, setActiveTab] = useState<'description' | 'usage' | 'faq'>('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setActiveSku(sku);
  }, [sku]);

  const activeVariant = hasVariants
    ? group.variants.find((v) => v.product.sku === activeSku)?.product || product
    : product;

  const dataSource = hasVariants ? group.primary : product;

  const galleryImages = useMemo(() => {
    const images: string[] = [];
    const mainImg = activeVariant?.image_url;
    if (mainImg) images.push(mainImg);
    const gallery = (dataSource as any)?.content?.gallery as string[] | undefined;
    if (gallery) {
      for (const url of gallery) {
        if (!images.includes(url)) images.push(url);
      }
    }
    return images;
  }, [activeVariant, dataSource]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [activeSku]);

  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerDownRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
    pointerDownRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!pointerDownRef.current || !swipeStartRef.current) return;
    pointerDownRef.current = false;
    const dx = e.clientX - swipeStartRef.current.x;
    const dy = e.clientY - swipeStartRef.current.y;
    swipeStartRef.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40 && galleryImages.length > 1) {
      if (dx < 0) {
        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
      } else {
        setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
  }, [galleryImages.length]);

  const handlePointerCancel = useCallback(() => {
    pointerDownRef.current = false;
    swipeStartRef.current = null;
  }, []);

  const categoryTitles: Record<string, string> = {
    "car-polish": "Pasta, Cila ve Boya Korumalar",
    "marine-polish": "Marin Pasta ve Cilalar",
    "solid-compounds": "Katı Pasta ve Cilalar",
    "boat-polish": "Marin Pasta ve Cilalar",
    "accessories": "Sünger, Keçe ve Aksesuarlar"
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-[600px] w-full rounded-none bg-gray-200" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest">Ürün bulunamadı.</h1>
        <Link href={`/category/${category}`}>
          <span className="text-[#e3000f] font-bold mt-4 inline-block cursor-pointer hover:underline">Kategoriye Dön</span>
        </Link>
      </div>
    );
  }

  const p = activeVariant || product;
  const d = dataSource || product;
  const content = d.content as any || {};
  const fields = d.template_fields as any || {};
  const faq = d.faq as any[] || [];
  const cutLevel = fields.cut_level;
  const glossLevel = fields.finish_level;

  const features: { label: string; value: string; icon: React.ReactNode }[] = [];
  if (fields.silicone_free) features.push({ label: "Silikon", value: "İçermez", icon: <Shield className="w-5 h-5" /> });
  if (fields.filler_free) features.push({ label: "Dolgu Maddesi", value: "İçermez", icon: <Shield className="w-5 h-5" /> });
  if (fields.voc_free) features.push({ label: "VOC", value: "İçermez", icon: <Shield className="w-5 h-5" /> });
  if (fields.grit_removal) features.push({ label: "Zımpara İzi Giderme", value: fields.grit_removal, icon: <Settings className="w-5 h-5" /> });
  if (fields.dusting_level) features.push({ label: "Tozuma Seviyesi", value: fields.dusting_level === "Low" ? "Düşük" : fields.dusting_level === "High" ? "Yüksek" : fields.dusting_level, icon: <Beaker className="w-5 h-5" /> });
  if (fields.made_in) features.push({ label: "Üretim", value: fields.made_in, icon: <CheckCircle2 className="w-5 h-5" /> });

  const machineCompat = Array.isArray(fields.machine_compatibility) ? fields.machine_compatibility : fields.machine_compatibility ? [fields.machine_compatibility] : [];

  const scrape = content.menzerna_scrape as any || {};
  const scrapeSubtitle = scrape.subtitle || scrape.subtitle_en || "";
  const scrapeDescription = scrape.description || scrape.description_en || "";
  const scrapeProcessing = scrape.processing || null;
  const scrapeSteps = scrape.steps as any[] || [];
  const scrapeOptimisedFor = scrape.optimised_for as any[] || [];

  const displayName = hasVariants ? group.baseName : stripVolumeFromTitle(p.product_name || "");

  const stepColors: Record<number, string> = { 1: "#e3000f", 2: "#eab308", 3: "#22c55e", 4: "#06b6d4" };

  const hasDescription = !!content.full_description;
  const hasUsage = !!(content.how_to_use || content.why_this_product || content.when_to_use || content.target_surface);
  const hasFaq = faq && faq.length > 0;

  const tabs = [
    ...(hasDescription ? [{ key: 'description' as const, label: 'Ürün Açıklaması', testId: 'tab-description' }] : []),
    ...(hasUsage ? [{ key: 'usage' as const, label: 'Kullanım Talimatları', testId: 'tab-usage' }] : []),
    ...(hasFaq ? [{ key: 'faq' as const, label: 'Sıkça Sorulan Sorular', testId: 'tab-faq' }] : []),
  ];

  const effectiveTab = tabs.find(t => t.key === activeTab) ? activeTab : tabs[0]?.key || 'description';

  return (
    <div className="bg-white min-h-screen pb-24" data-testid="page-product-detail">
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center text-xs uppercase tracking-widest font-black text-gray-500 flex-wrap gap-y-2">
          <Link href="/"><span className="hover:text-[#e3000f] cursor-pointer">Ana Sayfa</span></Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href={`/category/${category}`}>
            <span className="hover:text-[#e3000f] cursor-pointer uppercase">{categoryTitles[category as string] || category}</span>
          </Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#002b3d] uppercase truncate max-w-[200px]">{displayName}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex gap-3">
            {galleryImages.length > 1 && (
              <div className="flex flex-col gap-2 shrink-0" data-testid="gallery-thumbnails">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 lg:w-20 lg:h-20 border-2 p-1 bg-white flex items-center justify-center transition-all ${
                      idx === selectedImageIndex
                        ? "border-[#e3000f] shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    data-testid={`btn-thumbnail-${idx}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${p.product_name} - ${idx + 1}`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
            <div
              className="bg-white flex justify-center items-center relative border border-gray-200 min-h-[400px] lg:min-h-[500px] shadow-sm flex-1 overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              data-testid="gallery-main"
            >
              {galleryImages.length > 0 ? (
                <div className="w-full h-full flex relative">
                  {galleryImages.map((imgUrl, idx) => (
                    <img
                      key={imgUrl}
                      src={imgUrl}
                      alt={`${p.product_name} - ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out"
                      style={{
                        transform: `translateX(${(idx - selectedImageIndex) * 100}%)`,
                        opacity: idx === selectedImageIndex ? 1 : 0,
                      }}
                      draggable={false}
                      data-testid={idx === selectedImageIndex ? "img-product" : undefined}
                    />
                  ))}
                </div>
              ) : p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.product_name}
                  className="w-full h-full object-contain"
                  data-testid="img-product"
                />
              ) : (
                <div className="text-gray-300 font-bold text-lg uppercase tracking-widest">Görsel Yok</div>
              )}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-2 h-2 transition-all ${
                        idx === selectedImageIndex ? "bg-[#e3000f] scale-125" : "bg-gray-300 hover:bg-gray-500"
                      }`}
                      aria-label={`Görsel ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[11px] text-gray-400 font-black uppercase tracking-[0.15em] mb-2">
              {p.category?.sub_cat2 || p.category?.sub_cat || ""} &bull; SKU: {p.sku}
            </div>

            <h1 className="text-xl lg:text-2xl font-black text-[#002b3d] mb-4 tracking-tight uppercase leading-tight" data-testid="text-product-name">
              {displayName}
            </h1>
            <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>

            {scrapeSubtitle && (
              <p className="text-gray-700 leading-relaxed mb-3 text-base font-semibold" data-testid="text-product-subtitle">
                {scrapeSubtitle}
              </p>
            )}

            {scrapeDescription && (
              <p className="text-gray-600 leading-relaxed mb-6 text-sm" data-testid="text-product-description">
                {scrapeDescription}
              </p>
            )}

            {!scrapeSubtitle && !scrapeDescription && content.short_description && (
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {content.short_description}
              </p>
            )}

            {hasVariants && (
              <div className="mb-6">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Boyut Seçenekleri</span>
                <div className="flex flex-wrap gap-2">
                  {group.variants.map((v) => {
                    const isActive = v.product.sku === activeSku;
                    return (
                      <button
                        key={v.product.sku}
                        onClick={() => setActiveSku(v.product.sku)}
                        className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                          isActive
                            ? "bg-[#002b3d] text-white border-[#002b3d]"
                            : "bg-white text-gray-600 border-gray-300 hover:border-[#e3000f] hover:text-[#e3000f]"
                        }`}
                        data-testid={`detail-size-${v.product.sku}`}
                      >
                        {v.sizeLabel || "Standart"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {(cutLevel !== undefined || glossLevel !== undefined) && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#f8f9fa] border border-gray-200 mb-8">
                {cutLevel !== undefined && (
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-black text-[#002b3d] uppercase tracking-widest text-sm">Kesicilik (Cut)</span>
                      <span className="font-black text-xl text-[#e3000f] leading-none">{cutLevel}<span className="text-base text-gray-400 ml-1">/10</span></span>
                    </div>
                    <div className="flex gap-1.5 h-2 w-full">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 ${i < cutLevel ? 'bg-[#e3000f]' : 'bg-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                )}
                {glossLevel !== undefined && (
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-black text-[#002b3d] uppercase tracking-widest text-sm">Parlaklık (Gloss)</span>
                      <span className="font-black text-xl text-[#009b77] leading-none">{glossLevel}<span className="text-base text-gray-400 ml-1">/10</span></span>
                    </div>
                    <div className="flex gap-1.5 h-2 w-full">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 ${i < glossLevel ? 'bg-[#009b77]' : 'bg-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {features.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {features.map((f, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-3 flex flex-col items-center text-center">
                    <div className="text-[#e3000f] mb-1">{f.icon}</div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{f.label}</span>
                    <span className="text-sm font-black text-[#002b3d]">{f.value}</span>
                  </div>
                ))}
                {machineCompat.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 p-3 flex flex-col items-center text-center">
                    <div className="text-[#e3000f] mb-1"><Settings className="w-5 h-5" /></div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Makine</span>
                    <span className="text-sm font-black text-[#002b3d]">{machineCompat.join(" / ")}</span>
                  </div>
                )}
              </div>
            )}

            {(scrapeProcessing || scrapeSteps.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {scrapeProcessing && (scrapeProcessing.rotary?.start || scrapeProcessing.orbital) && (
                  <div data-testid="section-processing">
                    <h3 className="font-black text-[#002b3d] uppercase tracking-widest text-sm mb-4">Uygulama</h3>
                    <div className="space-y-3">
                      {scrapeProcessing.rotary?.start && (
                        <div className="flex items-start gap-3">
                          <span className="text-[#e3000f] font-black text-lg leading-none mt-0.5">&rarr;</span>
                          <div>
                            <span className="font-bold text-[#002b3d] text-sm">Rotary:</span>
                            <p className="text-xs text-gray-600 mt-0.5">Başlangıç: {scrapeProcessing.rotary.start}</p>
                            {scrapeProcessing.rotary.end && (
                              <p className="text-xs text-gray-600">Bitiş: {scrapeProcessing.rotary.end}</p>
                            )}
                          </div>
                        </div>
                      )}
                      {scrapeProcessing.orbital && (
                        <div className="flex items-start gap-3">
                          <span className="text-[#e3000f] font-black text-lg leading-none mt-0.5">&rarr;</span>
                          <div>
                            <span className="font-bold text-[#002b3d] text-sm">Orbital:</span>
                            <p className="text-xs text-gray-600 mt-0.5">{scrapeProcessing.orbital}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {scrapeSteps.length > 0 && (
                  <div data-testid="section-steps">
                    <h3 className="font-black text-[#002b3d] uppercase tracking-widest text-sm mb-4">Adımlar</h3>
                    <div className="flex flex-wrap gap-2">
                      {scrapeSteps.map((step: any) => {
                        const color = stepColors[step.number] || "#6b7280";
                        const isActive = step.isActive;
                        const isHalf = step.isHalfActive;
                        return (
                          <div key={step.number} className="flex flex-col items-center gap-1" data-testid={`step-${step.number}`}>
                            <div
                              className={`w-16 h-8 flex items-center justify-center text-[10px] font-black uppercase tracking-wider border-2 ${
                                isActive
                                  ? "text-white"
                                  : isHalf
                                  ? "bg-white"
                                  : "bg-gray-100 text-gray-400 border-gray-300"
                              }`}
                              style={isActive ? { backgroundColor: color, borderColor: color } : isHalf ? { borderColor: color, color } : {}}
                            >
                              Adım {step.number}
                            </div>
                            <span className="text-[9px] text-gray-500 font-bold text-center leading-tight">
                              {step.label_tr || step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="https://mgpolishing.com/yetkili-saticilar/" target="_blank" rel="noopener noreferrer" className="bg-[#e3000f] hover:bg-[#002b3d] text-white flex-1 h-14 font-black text-sm uppercase tracking-widest transition-colors duration-300 flex items-center justify-center">
                Yetkili Satıcı Bul
              </a>
            </div>
          </div>
        </div>

        {scrapeOptimisedFor.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-12" data-testid="section-optimised-accessories">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Önerilen Aksesuarlar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {scrapeOptimisedFor.map((item: any, i: number) => {
                const matchedProduct = findMatchingProduct(item.name, item.name_tr, allProducts || []);
                const card = (
                  <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col items-center text-center hover:border-[#e3000f] transition-colors" data-testid={`accessory-${i}`}>
                    {matchedProduct?.image_url ? (
                      <div className="w-16 h-16 flex items-center justify-center mb-3">
                        <img src={matchedProduct.image_url} alt={item.name_tr || item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mb-3">
                        <Settings className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-[#002b3d] leading-tight" data-testid={`text-accessory-name-${i}`}>
                      {item.name_tr || item.name}
                    </span>
                  </div>
                );

                if (matchedProduct) {
                  const matchedCategory = getCategorySlug(matchedProduct);
                  return (
                    <Link key={i} href={`/category/${matchedCategory}/${matchedProduct.sku}`}>
                      {card}
                    </Link>
                  );
                }
                return <div key={i}>{card}</div>;
              })}
            </div>
          </div>
        )}

        {tabs.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  data-testid={tab.testId}
                  className={`px-6 py-4 text-sm font-black uppercase tracking-wider transition-colors ${
                    effectiveTab === tab.key
                      ? "bg-[#002b3d] text-white border-t-4 border-[#e3000f]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-t-4 border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="border border-gray-200 border-t-0 p-8" data-testid="tab-content">
              {effectiveTab === 'description' && hasDescription && (
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {renderFormattedDescription(content.full_description)}
                </div>
              )}

              {effectiveTab === 'usage' && hasUsage && (
                <div className="space-y-8">
                  {content.how_to_use && (
                    <div>
                      <div className="space-y-2">
                        {content.how_to_use.split("\n").filter((l: string) => l.trim()).map((step: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 border-l-4 border-l-[#002b3d]">
                            <span className="flex items-center justify-center w-8 h-8 bg-[#002b3d] text-white font-black shrink-0 text-sm">{i + 1}</span>
                            <span className="font-medium text-gray-800 text-sm leading-relaxed">{step.replace(/^\d+[\.\)]\s*/, "")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {content.why_this_product && (
                    <div>
                      <h3 className="text-lg font-bold text-[#002b3d] mb-4">Neden Bu Ürün?</h3>
                      <div className="space-y-2">
                        {content.why_this_product.split("\n").filter((l: string) => l.trim()).map((point: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-[#e3000f] shrink-0 mt-0.5" />
                            <span className="font-medium text-gray-800 text-sm">{point.replace(/^[•\s]+/, "")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {content.when_to_use && (
                    <div>
                      <h3 className="text-lg font-bold text-[#002b3d] mb-4">Ne Zaman Kullanılır?</h3>
                      <div className="bg-[#002b3d] text-white p-6">
                        <p className="leading-relaxed text-gray-200 text-sm">{content.when_to_use}</p>
                      </div>
                    </div>
                  )}

                  {content.target_surface && (
                    <div>
                      <h3 className="text-lg font-bold text-[#002b3d] mb-4">Hedef Yüzey</h3>
                      <div className="bg-gray-50 border border-gray-200 p-4">
                        <p className="font-medium text-gray-700 text-sm">{content.target_surface}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {effectiveTab === 'faq' && hasFaq && (
                <div className="space-y-3">
                  {faq.map((item: any, i: number) => (
                    <div key={i} className="border border-gray-200 p-5">
                      <div className="flex items-start gap-3 mb-2">
                        <HelpCircle className="w-5 h-5 text-[#e3000f] shrink-0 mt-0.5" />
                        <h3 className="font-black text-[#002b3d] text-sm">{item.question}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed ml-8 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
