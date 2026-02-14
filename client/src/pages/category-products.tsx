import { useParams, Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { groupProductsBySize, ProductGroup } from "@/lib/product-utils";

interface SectionDef {
  key: string;
  label: string;
  title: string;
  description: string;
  match: (p: any) => boolean;
}

interface CategoryDef {
  title: string;
  description: string;
  mainCats: string[];
  sections: SectionDef[];
}

const categoryMap: Record<string, CategoryDef> = {
  "car-polish": {
    title: "Profesyonel Oto Pasta & Cilalar",
    description: "Menzerna'nın otomotiv boyaları için geliştirdiği, endüstri standardı pasta, cila ve koruma ürünlerini keşfedin. Silikon ve dolgu maddesi içermeyen formülleriyle gerçek polisaj sonuçları elde edin.",
    mainCats: ["DIŞ YÜZEY"],
    sections: [
      {
        key: "heavy-cut",
        label: "Menzerna Aşındırıcı Pastalar",
        title: "Heavy Cut",
        description: "Kaba zımparalama sonrası optimum polisaj sonuçları elde edin. Menzerna'nın yüksek performanslı kalın pastaları ile çizikleri, overspray'i ve ağır aşınma izlerini hızlı, güvenilir ve kapsamlı bir şekilde giderin.",
        match: (cat: any) => cat.sub_cat2 === "Kalın Pastalar",
      },
      {
        key: "medium-cut",
        label: "Menzerna İnce Aşındırıcı Pastalar",
        title: "Medium Cut",
        description: "Orta düzey çizikler ve aşınma izleri için Menzerna'nın medium cut pastalarını tercih edin. Hafif otomotiv kaplamaları için ideal, kusursuz yüzey ve üstün parlaklık elde edin.",
        match: (cat: any) => cat.sub_cat2 === "İnce Pastalar",
      },
      {
        key: "finish",
        label: "Menzerna Yüksek Parlaklık Cilaları",
        title: "Finish",
        description: "Menzerna finish ürünleri ile küçük çizikleri, izleri ve bulanıklığı giderin. Siyah boyalar dahil tüm yüzeylerde hologram içermeyen, showroom kalitesinde kusursuz parlaklık sağlayın.",
        match: (cat: any) => cat.sub_cat2 === "Hare Gidericiler",
      },
      {
        key: "protection",
        label: "Menzerna Boya Koruma Ürünleri",
        title: "Protection",
        description: "Menzerna koruyucu cilalar ve sealantlar ile aracınızın boyasını çevresel etkenlerden uzun süreli koruyun. Pürüzsüz yüzey, göz alıcı parlaklık ve üstün su iticilik sağlayın.",
        match: (cat: any) => cat.sub_cat2 === "Boya Korumalar" || cat.sub_cat2 === "Wax ve Sprey Cilalar",
      },
      {
        key: "metal",
        label: "Menzerna Metal Parlatıcılar",
        title: "Metal & Krom",
        description: "Metal, krom ve çelik yüzeyler için özel geliştirilmiş parlatıcı ürünler.",
        match: (cat: any) => cat.sub_cat === "Metal ve Krom Parlatıcılar",
      },
    ],
  },
  "accessories": {
    title: "Sünger, Keçe ve Aksesuarlar",
    description: "Polisaj sürecinizi tamamlayan profesyonel sünger, keçe, tabanlık ve temizlik aksesuarları.",
    mainCats: ["AKSESUAR", "MAKİNE-EKİPMAN"],
    sections: [
      {
        key: "rotary-pads",
        label: "Polisaj Süngerler",
        title: "Rotary Süngerler",
        description: "Rotary polisaj makineleri için tasarlanmış profesyonel polisaj süngerleri. Farklı kesme ve parlatma seviyeleri için çeşitli sertlik derecelerinde.",
        match: (cat: any) => cat.sub_cat2 === "Rotary Süngerler",
      },
      {
        key: "orbital-pads",
        label: "Polisaj Süngerler",
        title: "Orbital Süngerler",
        description: "Dual-action ve orbital polisaj makineleri için optimize edilmiş süngerler. Güvenli ve etkili polisaj için ideal.",
        match: (cat: any) => cat.sub_cat2 === "Orbital Süngerler",
      },
      {
        key: "wool-pads",
        label: "Polisaj Keçeleri",
        title: "Keçeler",
        description: "Yüksek kesme gücü gerektiren işlemler için doğal ve sentetik yün keçeler. Ağır çizik giderme ve boya düzeltme işlemleri için.",
        match: (cat: any) => cat.sub_cat2 === "Keçeler",
      },
      {
        key: "backing-plates",
        label: "Makine Ekipmanları",
        title: "Ped Destek Diskleri & Tabanlıklar",
        description: "Polisaj pedlerini makineye bağlamak için profesyonel destek diskleri ve tabanlıklar.",
        match: (cat: any) => cat.main_cat === "MAKİNE-EKİPMAN",
      },
    ],
  },
  "solid-compounds": {
    title: "Endüstriyel - Katı Pasta ve Cilalar",
    description: "Metal, alüminyum, paslanmaz çelik ve pirinç yüzeyler için tasarlanmış endüstriyel katı polisaj pastaları.",
    mainCats: ["ENDÜSTRİYEL"],
    sections: [],
  },
  "boat-polish": {
    title: "Marin - Tekne Pasta ve Cilaları",
    description: "Jelkot yüzeyler için profesyonel tekne polisaj ürünleri. Çizik giderme, sararma giderme ve parlak koruma.",
    mainCats: ["MARİN"],
    sections: [],
  },
  "marine-polish": {
    title: "Marin - Tekne Pasta ve Cilaları",
    description: "Jelkot yüzeyler için profesyonel tekne polisaj ürünleri.",
    mainCats: ["MARİN"],
    sections: [],
  },
};

const sectionColors: Record<string, string> = {
  "heavy-cut": "#e3000f",
  "medium-cut": "#eab308",
  "finish": "#22c55e",
  "protection": "#06b6d4",
  "metal": "#6b7280",
  "rotary-pads": "#e3000f",
  "orbital-pads": "#eab308",
  "wool-pads": "#6b7280",
  "backing-plates": "#002b3d",
};

function CategorySection({ section, groups, categorySlug }: { section: SectionDef; groups: ProductGroup[]; categorySlug: string }) {
  if (groups.length === 0) return null;
  const accentColor = sectionColors[section.key] || "#e3000f";

  return (
    <section className="mb-20" data-testid={`section-${section.key}`}>
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e3000f] mb-2">
          {section.label}
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-[#002b3d] uppercase tracking-wider mb-4">
          {section.title}
        </h2>
        <div className="w-12 h-1" style={{ backgroundColor: accentColor }} />
        <p className="text-gray-600 text-base leading-relaxed mt-4 max-w-4xl">
          {section.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group) => (
          <ProductCard key={group.primary.sku} product={group.primary} categorySlug={categorySlug} group={group} />
        ))}
      </div>
    </section>
  );
}

export default function CategoryProducts() {
  const { category } = useParams();
  const catKey = category as string;
  const catInfo = categoryMap[catKey] || { title: catKey?.replace(/-/g, " ") || "", description: "", mainCats: [] as string[], sections: [] };

  const { data: allProducts, isLoading } = useProducts();

  const products = allProducts?.filter((p) => {
    const cat = p.category as any;
    if (!cat) return false;
    return catInfo.mainCats.some((mc: string) => cat.main_cat === mc);
  }) || [];

  const hasSections = catInfo.sections.length > 0;

  const groupedSections = hasSections
    ? catInfo.sections.map((section) => {
        const sectionProducts = products.filter((p) => section.match(p.category as any));
        return { section, groups: groupProductsBySize(sectionProducts) };
      }).filter((g) => g.groups.length > 0)
    : [];

  const ungroupedProductsList = hasSections
    ? products.filter((p) => !catInfo.sections.some((s) => s.match(p.category as any)))
    : products;
  const ungroupedGroups = groupProductsBySize(ungroupedProductsList);

  const totalGroupedCount = groupedSections.reduce((sum, g) => sum + g.groups.length, 0) + ungroupedGroups.length;

  return (
    <div className="min-h-screen bg-white pb-24" data-testid="page-category">
      <div className="bg-[#002b3d] pt-20 pb-16 relative overflow-hidden border-t-4 border-[#e3000f]">
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#e3000f] mb-3">
            Ürün Yelpazesini Keşfedin
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4" data-testid="text-category-title">
            {catInfo.title}
          </h1>
          <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl font-light leading-relaxed">
            {catInfo.description}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200 py-4 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 flex-wrap gap-y-2">
          <Link href="/"><span className="hover:text-[#e3000f] cursor-pointer transition-colors">Ana Sayfa</span></Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#002b3d] uppercase">{catInfo.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="space-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-8 w-48 mb-4 rounded-none bg-gray-200" />
                <Skeleton className="h-4 w-96 mb-8 rounded-none bg-gray-100" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-[420px] w-full rounded-none bg-gray-200" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-medium">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-12 font-bold uppercase tracking-widest">
              {totalGroupedCount} ürün listeleniyor
            </p>

            {groupedSections.map(({ section, groups }) => (
              <CategorySection
                key={section.key}
                section={section}
                groups={groups}
                categorySlug={catKey}
              />
            ))}

            {ungroupedGroups.length > 0 && (
              <section className="mb-20">
                {hasSections && (
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-[#002b3d] uppercase tracking-wider mb-4">
                      Diğer Ürünler
                    </h2>
                    <div className="w-12 h-1 bg-gray-400" />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {ungroupedGroups.map((group) => (
                    <ProductCard key={group.primary.sku} product={group.primary} categorySlug={catKey} group={group} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
