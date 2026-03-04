"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {categories.map((cat, catIdx) => (
        <div key={cat.title} className="border border-gray-200">
          {/* Kategori başlığı */}
          <button
            onClick={() =>
              setOpenCategory(openCategory === catIdx ? null : catIdx)
            }
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-[16px] md:text-[18px] font-bold text-[#1d1d1d]">
              {cat.title}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-bold">
                {cat.items.length}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  openCategory === catIdx ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Sorular */}
          {openCategory === catIdx && (
            <div className="border-t border-gray-200">
              {cat.items.map((item, qIdx) => {
                const qKey = `${catIdx}-${qIdx}`;
                const isOpen = openQuestion === qKey;
                return (
                  <div key={qKey} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : qKey)
                      }
                      className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span
                        className={`text-[14px] md:text-[15px] font-semibold leading-snug transition-colors ${
                          isOpen ? "text-[#af1d1f]" : "text-[#1d1d1d]"
                        }`}
                      >
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 mt-0.5 transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 text-[#af1d1f]"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5">
                        <p className="text-[14px] text-gray-600 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
