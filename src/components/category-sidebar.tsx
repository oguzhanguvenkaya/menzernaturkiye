"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { CATEGORIES, CATEGORY_SLUG_MAP, type CategoryNode } from "@/lib/categories";

// Re-export for backward compatibility
export { CATEGORY_SLUG_MAP } from "@/lib/categories";
export type { SlugFilter } from "@/lib/categories";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function collectSlugs(node: CategoryNode): string[] {
  const slugs = [node.slug];
  if (node.children) {
    for (const child of node.children) {
      slugs.push(...collectSlugs(child));
    }
  }
  return slugs;
}

function isActiveOrDescendant(node: CategoryNode, activeSlug: string): boolean {
  return collectSlugs(node).includes(activeSlug);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") ?? "";

  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!activeCategory) return;
    const toExpand = new Set<string>();
    function walk(nodes: CategoryNode[], ancestors: string[]) {
      for (const node of nodes) {
        const path = [...ancestors, node.slug];
        if (node.slug === activeCategory) {
          for (const a of ancestors) toExpand.add(a);
        }
        if (node.children) walk(node.children, path);
      }
    }
    walk(CATEGORIES, []);
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const s of toExpand) next.add(s);
      return next;
    });
  }, [activeCategory]);

  function toggleExpand(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const navigateToCategory = useCallback(
    (slug: string) => {
      if (slug) {
        router.push(`/urunler?category=${slug}`);
      } else {
        router.push("/urunler");
      }
    },
    [router],
  );

  // ----- Render helpers -----

  function renderLevel3(node: CategoryNode) {
    const isActive = activeCategory === node.slug;
    return (
      <button
        key={node.slug}
        onClick={() => navigateToCategory(node.slug)}
        className={`w-full text-left flex items-center pl-12 pr-4 py-2 text-xs font-semibold border-l-2 transition-colors
          ${
            isActive
              ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/60"
              : "text-gray-500 border-transparent hover:border-[#af1d1f] hover:text-[#1d1d1d] hover:bg-gray-50"
          }`}
      >
        {node.label}
      </button>
    );
  }

  function renderLevel2(node: CategoryNode) {
    const isActive = activeCategory === node.slug;
    const hasChildren = !!node.children?.length;
    const isOpen = expanded.has(node.slug) || isActiveOrDescendant(node, activeCategory);

    return (
      <div key={node.slug}>
        <div className="flex items-center">
          <button
            onClick={() => navigateToCategory(node.slug)}
            className={`flex-1 text-left flex items-center pl-8 pr-2 py-2 text-xs font-bold border-l-2 transition-colors
              ${
                isActive
                  ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/40"
                  : "text-gray-600 border-transparent hover:border-[#af1d1f] hover:text-[#1d1d1d] hover:bg-gray-50"
              }`}
          >
            {node.label}
          </button>
          {hasChildren && (
            <button
              onClick={() => toggleExpand(node.slug)}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? "Daralt" : "Genişlet"}
            >
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
        {hasChildren && isOpen && (
          <div className="bg-gray-50/40">
            {node.children!.map(renderLevel3)}
          </div>
        )}
      </div>
    );
  }

  function renderLevel1(node: CategoryNode) {
    const isActive = activeCategory === node.slug;
    const hasChildren = !!node.children?.length;
    const isOpen = expanded.has(node.slug) || isActiveOrDescendant(node, activeCategory);

    return (
      <div key={node.slug}>
        <div className="flex items-center">
          <button
            onClick={() => navigateToCategory(node.slug)}
            className={`flex-1 text-left flex items-center px-4 py-2.5 text-sm font-bold border-l-2 transition-colors uppercase tracking-wide
              ${
                isActive
                  ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/40"
                  : "text-[#1d1d1d] border-transparent hover:border-[#af1d1f] hover:bg-gray-50"
              }`}
          >
            {node.label}
          </button>
          {hasChildren && (
            <button
              onClick={() => toggleExpand(node.slug)}
              className="p-2 mr-1 hover:bg-gray-100 rounded transition-colors"
              aria-label={isOpen ? "Daralt" : "Genişlet"}
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#af1d1f]" : "text-gray-400"}`}
              />
            </button>
          )}
        </div>
        {hasChildren && isOpen && (
          <div className="border-t border-b border-gray-100 bg-gray-50/60">
            {node.children!.map(renderLevel2)}
          </div>
        )}
      </div>
    );
  }

  return (
    <aside className="w-full lg:w-60 shrink-0">
      <div className="border border-gray-200 bg-white">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <span className="text-base font-black text-[#1d1d1d]">
            Kategoriler
          </span>
        </div>

        <nav>
          {/* Tüm Ürünler */}
          <button
            onClick={() => navigateToCategory("")}
            className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm font-bold border-l-2 transition-colors
              ${
                !activeCategory
                  ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/40"
                  : "text-[#1d1d1d] border-transparent hover:border-[#af1d1f] hover:bg-gray-50"
              }`}
          >
            Tüm Ürünler
          </button>

          {/* Category tree */}
          {CATEGORIES.map(renderLevel1)}
        </nav>
      </div>
    </aside>
  );
}
