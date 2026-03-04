"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FileText, Download, CheckCircle } from "lucide-react";

interface DownloadItem {
  label: string;
  url: string;
  size: string;
}

interface ProductTabsProps {
  fullDescription?: string;
  whenToUse?: string;
  targetSurface?: string;
  whyThisProduct?: string;
  howToUse?: string;
  faq?: { question: string; answer: string }[];
  downloads?: DownloadItem[];
}

// ---------------------------------------------------------------------------
// Rich description renderer — parses text into structured HTML
// ---------------------------------------------------------------------------

function RichDescription({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Bullet point line (• or - at start)
    if (/^[•\-]\s/.test(line)) {
      const bullets: string[] = [];
      while (i < lines.length) {
        const bl = lines[i].trim();
        if (/^[•\-]\s/.test(bl)) {
          bullets.push(bl.replace(/^[•\-]\s*/, ""));
          i++;
        } else break;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4">
          {bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-gray-50 p-3 border-l-4 border-[#af1d1f]">
              <CheckCircle className="w-5 h-5 text-[#af1d1f] shrink-0 mt-0.5" aria-hidden />
              <span className="font-medium">{b}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered line (1. or 1) at start)
    if (/^\d+[\.\)]\s/.test(line)) {
      const steps: { num: string; text: string; subs: string[] }[] = [];
      while (i < lines.length) {
        const sl = lines[i].trim();
        if (/^\d+[\.\)]\s/.test(sl)) {
          const num = sl.match(/^(\d+)/)?.[1] || "";
          steps.push({ num, text: sl.replace(/^\d+[\.\)]\s*/, ""), subs: [] });
          i++;
        } else if (/^[○o]\s/.test(sl) && steps.length > 0) {
          steps[steps.length - 1].subs.push(sl.replace(/^[○o]\s*/, ""));
          i++;
        } else break;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-4">
          {steps.map((s, idx) => (
            <li key={idx}>
              <div className="flex items-start gap-3 bg-gray-50 p-3 border-l-4 border-[#1d1d1d]">
                <span className="flex items-center justify-center w-7 h-7 bg-[#1d1d1d] text-white font-black shrink-0 text-sm">
                  {s.num}
                </span>
                <span className="font-medium">{s.text}</span>
              </div>
              {s.subs.length > 0 && (
                <div className="space-y-0">
                  {s.subs.map((sub, si) => (
                    <div key={si} className="flex items-start gap-3 ml-10 p-2">
                      <span className="text-gray-400 shrink-0 mt-0.5">○</span>
                      <span className="text-gray-700 text-sm">{sub}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Sub-item line (o or ○ at start) — standalone
    if (/^[○o]\s/.test(line)) {
      i++;
      continue;
    }

    // Check if it looks like a heading (short, no period at end, often followed by empty line or list)
    const nextLine = i + 1 < lines.length ? lines[i + 1]?.trim() : "";
    const isHeading =
      line.length < 120 &&
      !line.endsWith(".") &&
      !line.endsWith(":") &&
      (nextLine === "" || /^[•\-\d○o]/.test(nextLine)) &&
      !/^[•\-\d○o]/.test(line);

    // Heading with colon at end
    const isHeadingColon = line.length < 120 && line.endsWith(":") && !line.startsWith("•");

    if (isHeading || isHeadingColon) {
      const headingText = isHeadingColon ? line.slice(0, -1) : line;
      elements.push(
        <h3 key={`h-${i}`} className="text-xl font-black text-[#1d1d1d] uppercase tracking-wide mt-8 mb-3">
          {headingText}
        </h3>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="mb-4 text-gray-700 leading-relaxed">
        {line}
      </p>
    );
    i++;
  }

  return <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">{elements}</div>;
}

// ---------------------------------------------------------------------------
// ProductTabs
// ---------------------------------------------------------------------------

export function ProductTabs({
  fullDescription,
  whenToUse,
  targetSurface,
  whyThisProduct,
  howToUse,
  faq,
  downloads,
}: ProductTabsProps) {
  const hasDescription = !!(fullDescription || whenToUse || targetSurface || whyThisProduct);
  const hasUsage = !!howToUse;
  const hasFaq = !!(faq && faq.length > 0);
  const hasDownloads = !!(downloads && downloads.length > 0);

  type TabId = "aciklama" | "uygulama" | "sss" | "dokuman";

  const tabs: { id: TabId; label: string; show: boolean }[] = [
    { id: "aciklama", label: "Ürün Açıklaması", show: hasDescription },
    { id: "uygulama", label: "Kullanım Talimatları", show: hasUsage },
    { id: "sss", label: "Sıkça Sorulan Sorular", show: hasFaq },
    { id: "dokuman", label: "Dokümanlar", show: true },
  ];

  const visibleTabs = tabs.filter((t) => t.show);
  const [activeTab, setActiveTab] = useState<TabId>(visibleTabs[0]?.id || "aciklama");

  if (visibleTabs.length === 0) return null;

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-3 sm:py-4 uppercase tracking-wider transition-colors text-[12px] sm:text-[14px] font-bold flex-1 sm:flex-none ${
              activeTab === tab.id
                ? "bg-[#1d1d1d] text-white border-t-4 border-[#af1d1f]"
                : "bg-gray-100 text-gray-500 border-t-4 border-transparent hover:bg-gray-200 hover:text-[#1d1d1d]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="border border-gray-200 border-t-0 p-8">
        {/* Açıklama */}
        {activeTab === "aciklama" && hasDescription && (
          <div>
            {fullDescription && (
              <RichDescription text={fullDescription} />
            )}
            {whyThisProduct && (
              <div className="mt-8">
                <h3 className="text-xl font-black text-[#1d1d1d] uppercase tracking-wide mb-3">
                  Neden Bu Ürün?
                </h3>
                <RichDescription text={whyThisProduct} />
              </div>
            )}
            {whenToUse && (
              <div className="mt-8">
                <h3 className="text-xl font-black text-[#1d1d1d] uppercase tracking-wide mb-3">
                  Ne Zaman Kullanılır
                </h3>
                <p className="text-gray-700 leading-relaxed">{whenToUse}</p>
              </div>
            )}
            {targetSurface && (
              <div className="mt-8">
                <h3 className="text-xl font-black text-[#1d1d1d] uppercase tracking-wide mb-3">
                  Uygulanacak Yüzeyler
                </h3>
                <p className="text-gray-700 leading-relaxed">{targetSurface}</p>
              </div>
            )}
          </div>
        )}

        {/* Kullanım Talimatları */}
        {activeTab === "uygulama" && hasUsage && (
          <RichDescription text={howToUse!} />
        )}

        {/* SSS */}
        {activeTab === "sss" && hasFaq && (
          <Accordion type="single" collapsible className="w-full">
            {faq!.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-sm font-bold text-[#1d1d1d] py-4 hover:no-underline hover:text-[#af1d1f] text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-sm pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Dokümanlar */}
        {activeTab === "dokuman" && (
          <>
            {hasDownloads ? (
              <div className="space-y-3 max-w-xl">
                {downloads!.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-gray-200 hover:border-[#af1d1f] transition-colors group"
                  >
                    <FileText className="w-5 h-5 text-[#af1d1f] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1d1d1d] group-hover:text-[#af1d1f] transition-colors truncate">
                        {doc.label}
                      </p>
                      <p className="text-xs text-gray-400">{doc.size}</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-[#af1d1f] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 p-8 flex flex-col items-center gap-3 text-center">
                <FileText className="w-8 h-8 text-gray-300" />
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  Teknik Veri Sayfaları
                </p>
                <p className="text-xs text-gray-400">
                  Dokümanlar yakında eklenecek.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
