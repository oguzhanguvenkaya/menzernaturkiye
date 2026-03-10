// ---------------------------------------------------------------------------
// Shared category definitions — used by both server and client components
// ---------------------------------------------------------------------------

export interface SlugFilter {
  field: "main_cat" | "sub_cat" | "sub_cat2";
  value: string;
}

export interface CategoryNode {
  label: string;
  slug: string;
  filterField: "main_cat" | "sub_cat" | "sub_cat2";
  filterValue: string;
  children?: CategoryNode[];
}

export const CATEGORIES: CategoryNode[] = [
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
          { label: "Kalın Pastalar", slug: "kalin-pastalar", filterField: "sub_cat2", filterValue: "Kalın Pastalar" },
          { label: "İnce Pastalar", slug: "ince-pastalar", filterField: "sub_cat2", filterValue: "İnce Pastalar" },
          { label: "Hare Gidericiler", slug: "hare-gidericiler", filterField: "sub_cat2", filterValue: "Hare Gidericiler" },
          { label: "Boya Korumalar", slug: "boya-korumalar", filterField: "sub_cat2", filterValue: "Boya Korumalar" },
        ],
      },
      { label: "Metal ve Krom Parlatıcılar", slug: "metal-krom-parlaticilar", filterField: "sub_cat", filterValue: "Metal ve Krom Parlatıcılar" },
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
          { label: "Keçeler", slug: "keceler", filterField: "sub_cat2", filterValue: "Keçeler" },
          { label: "Rotary Süngerler", slug: "rotary-sungerler", filterField: "sub_cat2", filterValue: "Rotary Süngerler" },
          { label: "Orbital Süngerler", slug: "orbital-sungerler", filterField: "sub_cat2", filterValue: "Orbital Süngerler" },
        ],
      },
      { label: "Ped Destek Diskleri Tabanlıklar", slug: "ped-destek-diskleri", filterField: "sub_cat", filterValue: "Ped Destek Diskleri Tabanlıklar" },
      { label: "Yardımcı Ürünler", slug: "yardimci-urunler", filterField: "sub_cat", filterValue: "Yardımcı Ürünler" },
    ],
  },
  {
    label: "Endüstriyel",
    slug: "endustriyel",
    filterField: "main_cat",
    filterValue: "ENDÜSTRİYEL",
    children: [
      { label: "Kesici Cilalar", slug: "kesici-cilalar", filterField: "sub_cat", filterValue: "Kesici Cilalar" },
      { label: "Parlatıcı Cilalar", slug: "parlatici-cilalar", filterField: "sub_cat", filterValue: "Parlatıcı Cilalar" },
    ],
  },
  {
    label: "Marin",
    slug: "marin",
    filterField: "main_cat",
    filterValue: "MARİN",
  },
];

// Build flat slug -> filter map
function buildSlugMap(
  nodes: CategoryNode[],
  map: Record<string, SlugFilter> = {},
): Record<string, SlugFilter> {
  for (const node of nodes) {
    map[node.slug] = { field: node.filterField, value: node.filterValue };
    if (node.children) buildSlugMap(node.children, map);
  }
  return map;
}

export const CATEGORY_SLUG_MAP: Record<string, SlugFilter> = buildSlugMap(CATEGORIES);
