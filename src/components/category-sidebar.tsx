"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface CategoryNode {
  label: string;
  slug: string;
  children?: CategoryNode[];
}

const CATEGORIES: CategoryNode[] = [
  {
    label: "Polisaj Ürünleri",
    slug: "polisaj-urunleri",
    children: [
      { label: "Pasta & Cila", slug: "pasta-cila" },
      { label: "Heavy Cut Compound", slug: "heavy-cut" },
      { label: "Medium Cut", slug: "medium-cut" },
      { label: "Fine Cut & Finish", slug: "fine-cut-finish" },
      { label: "Koruma", slug: "koruma" },
      { label: "Metal Polish", slug: "metal-polish" },
    ],
  },
  {
    label: "Aksesuarlar",
    slug: "aksesuarlar",
    children: [
      { label: "Sünger Pad", slug: "sunger-pad" },
      { label: "Yün Pad", slug: "yun-pad" },
      { label: "Taban", slug: "taban" },
    ],
  },
  { label: "Endüstriyel", slug: "endustriyel" },
  { label: "Marin", slug: "marin" },
];

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeCategory = searchParams.get("category") ?? "";

  function buildHref(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("q");
    return `${pathname}?${params.toString()}`;
  }

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="border border-gray-200 bg-white">
        <div className="px-4 py-3 border-b border-gray-200 bg-[#002b3d]">
          <span className="text-xs font-black uppercase tracking-widest text-white">
            Kategoriler
          </span>
        </div>

        <nav>
          {/* Tümü */}
          <Link
            href={buildHref("")}
            className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold border-l-2 transition-colors
              ${!activeCategory
                ? "text-[#e3000f] border-[#e3000f] bg-red-50/40"
                : "text-[#002b3d] border-transparent hover:border-[#e3000f] hover:bg-gray-50"
              }`}
          >
            Tüm Ürünler
          </Link>

          {CATEGORIES.map((cat) => {
            const isParentActive =
              activeCategory === cat.slug ||
              cat.children?.some((c) => c.slug === activeCategory);

            return (
              <div key={cat.slug}>
                <Link
                  href={buildHref(cat.slug)}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold border-l-2 transition-colors
                    ${activeCategory === cat.slug
                      ? "text-[#e3000f] border-[#e3000f] bg-red-50/40"
                      : "text-[#002b3d] border-transparent hover:border-[#e3000f] hover:bg-gray-50"
                    }`}
                >
                  <span>{cat.label}</span>
                  {cat.children && (
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${isParentActive ? "rotate-90 text-[#e3000f]" : "text-gray-400"}`}
                    />
                  )}
                </Link>

                {/* Alt kategoriler */}
                {cat.children && isParentActive && (
                  <div className="bg-gray-50/60 border-t border-b border-gray-100">
                    {cat.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={buildHref(child.slug)}
                        className={`flex items-center px-6 py-2 text-xs font-bold border-l-2 transition-colors
                          ${activeCategory === child.slug
                            ? "text-[#e3000f] border-[#e3000f] bg-red-50/40"
                            : "text-gray-600 border-transparent hover:border-[#e3000f] hover:text-[#002b3d] hover:bg-gray-100"
                          }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
