"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Category tree that maps 1-to-1 with the DB JSONB `category` field.
// Each node specifies which field to filter on and its exact DB value.
// ---------------------------------------------------------------------------

interface CategoryNode {
  label: string;
  slug: string;
  filterField: "main_cat" | "sub_cat" | "sub_cat2";
  filterValue: string;
  children?: CategoryNode[];
}

const CATEGORIES: CategoryNode[] = [
  {
    label: "Polisaj Ürünleri",
    slug: "polisaj-urunleri",
    filterField: "main_cat",
    filterValue: "DIŞ YÜZEY",
    children: [
      {
        label: "Pasta Cila Ürünleri",
        slug: "pasta-cila-urunleri",
        filterField: "sub_cat",
        filterValue: "Pasta Cila Ürünleri",
        children: [
          {
            label: "Kalın Pastalar",
            slug: "kalin-pastalar",
            filterField: "sub_cat2",
            filterValue: "Kalın Pastalar",
          },
          {
            label: "İnce Pastalar",
            slug: "ince-pastalar",
            filterField: "sub_cat2",
            filterValue: "İnce Pastalar",
          },
          {
            label: "Hare Gidericiler",
            slug: "hare-gidericiler",
            filterField: "sub_cat2",
            filterValue: "Hare Gidericiler",
          },
          {
            label: "Boya Korumalar",
            slug: "boya-korumalar",
            filterField: "sub_cat2",
            filterValue: "Boya Korumalar",
          },
        ],
      },
      {
        label: "Metal ve Krom Parlatıcılar",
        slug: "metal-krom-parlaticilar",
        filterField: "sub_cat",
        filterValue: "Metal ve Krom Parlatıcılar",
      },
    ],
  },
  {
    label: "Aksesuarlar",
    slug: "aksesuarlar",
    filterField: "main_cat",
    filterValue: "AKSESUAR",
    children: [
      {
        label: "Polisaj Süngerler ve Keçeler",
        slug: "polisaj-sungerler-keceler",
        filterField: "sub_cat",
        filterValue: "Polisaj Pedleri ve Keçeler",
        children: [
          {
            label: "Keçeler",
            slug: "keceler",
            filterField: "sub_cat2",
            filterValue: "Keçeler",
          },
          {
            label: "Rotary Süngerler",
            slug: "rotary-sungerler",
            filterField: "sub_cat2",
            filterValue: "Rotary Süngerler",
          },
          {
            label: "Orbital Süngerler",
            slug: "orbital-sungerler",
            filterField: "sub_cat2",
            filterValue: "Orbital Süngerler",
          },
        ],
      },
      {
        label: "Ped Destek Diskleri Tabanlıklar",
        slug: "ped-destek-diskleri",
        filterField: "sub_cat",
        filterValue: "Ped Destek Diskleri Tabanlıklar",
      },
      {
        label: "Yardımcı Ürünler",
        slug: "yardimci-urunler",
        filterField: "main_cat",
        filterValue: "MAKİNE-EKİPMAN",
      },
    ],
  },
  {
    label: "Endüstriyel",
    slug: "endustriyel",
    filterField: "main_cat",
    filterValue: "ENDÜSTRİYEL",
  },
  {
    label: "Marin",
    slug: "marin",
    filterField: "main_cat",
    filterValue: "MARİN",
  },
];

// ---------------------------------------------------------------------------
// Exported slug-to-filter mapping so page.tsx can import it
// ---------------------------------------------------------------------------

export interface SlugFilter {
  field: "main_cat" | "sub_cat" | "sub_cat2";
  value: string;
}

/** Build a flat slug -> {field, value} map from the tree */
function buildSlugMap(
  nodes: CategoryNode[],
  map: Record<string, SlugFilter> = {},
): Record<string, SlugFilter> {
  for (const node of nodes) {
    map[node.slug] = { field: node.filterField, value: node.filterValue };
    if (node.children) {
      buildSlugMap(node.children, map);
    }
  }
  return map;
}

export const CATEGORY_SLUG_MAP: Record<string, SlugFilter> = buildSlugMap(CATEGORIES);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Collect all slugs that exist under a node (including the node itself) */
function collectSlugs(node: CategoryNode): string[] {
  const slugs = [node.slug];
  if (node.children) {
    for (const child of node.children) {
      slugs.push(...collectSlugs(child));
    }
  }
  return slugs;
}

/** Check if a slug is the active one OR a descendant of the active one */
function isActiveOrDescendant(node: CategoryNode, activeSlug: string): boolean {
  return collectSlugs(node).includes(activeSlug);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeCategory = searchParams.get("category") ?? "";

  // Track which parent sections are expanded (by slug)
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Auto-expand ancestors of the active category on mount / change
  useEffect(() => {
    if (!activeCategory) return;
    const toExpand = new Set<string>();
    function walk(nodes: CategoryNode[], ancestors: string[]) {
      for (const node of nodes) {
        const path = [...ancestors, node.slug];
        if (node.slug === activeCategory) {
          // expand all ancestors
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

  // ----- Render helpers -----

  function renderLevel3(node: CategoryNode) {
    const isActive = activeCategory === node.slug;
    return (
      <Link
        key={node.slug}
        href={buildHref(node.slug)}
        className={`flex items-center pl-12 pr-4 py-2 text-xs font-semibold border-l-2 transition-colors
          ${
            isActive
              ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/60"
              : "text-gray-500 border-transparent hover:border-[#af1d1f] hover:text-[#1d1d1d] hover:bg-gray-50"
          }`}
      >
        {node.label}
      </Link>
    );
  }

  function renderLevel2(node: CategoryNode) {
    const isActive = activeCategory === node.slug;
    const hasChildren = !!node.children?.length;
    const isOpen = expanded.has(node.slug) || isActiveOrDescendant(node, activeCategory);

    return (
      <div key={node.slug}>
        <div className="flex items-center">
          <Link
            href={buildHref(node.slug)}
            className={`flex-1 flex items-center pl-8 pr-2 py-2 text-xs font-bold border-l-2 transition-colors
              ${
                isActive
                  ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/40"
                  : "text-gray-600 border-transparent hover:border-[#af1d1f] hover:text-[#1d1d1d] hover:bg-gray-50"
              }`}
          >
            {node.label}
          </Link>
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
          <Link
            href={buildHref(node.slug)}
            className={`flex-1 flex items-center px-4 py-2.5 text-sm font-bold border-l-2 transition-colors uppercase tracking-wide
              ${
                isActive
                  ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/40"
                  : "text-[#1d1d1d] border-transparent hover:border-[#af1d1f] hover:bg-gray-50"
              }`}
          >
            {node.label}
          </Link>
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
        <div className="px-4 py-3 border-b border-gray-200 bg-[#1d1d1d]">
          <span className="text-xs font-black uppercase tracking-widest text-white">
            Kategoriler
          </span>
        </div>

        <nav>
          {/* Tüm Ürünler */}
          <Link
            href={buildHref("")}
            className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold border-l-2 transition-colors
              ${
                !activeCategory
                  ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/40"
                  : "text-[#1d1d1d] border-transparent hover:border-[#af1d1f] hover:bg-gray-50"
              }`}
          >
            Tüm Ürünler
          </Link>

          {/* Category tree */}
          {CATEGORIES.map(renderLevel1)}
        </nav>
      </div>
    </aside>
  );
}
