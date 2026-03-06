import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts, getPageContents } from "@/db/queries";
import { parseImageSettings } from "@/lib/image-settings";
import { ProductCard } from "@/components/product-card";
import {
  groupProductsBySize,
  buildGroupCardData,
  type ProductGroup,
} from "@/lib/product-utils";
import type { Product } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Araç Bakım",
  description:
    "Menzerna profesyonel araç polisaj ve koruma ürünleri. Kalın pasta, ince pasta, hare giderici, boya koruma ve metal parlatıcı ürünleri.",
  keywords: [
    "araç bakım",
    "araç polisaj",
    "kalın pasta",
    "ince pasta",
    "hare giderici",
    "boya koruma",
    "cila",
    "menzerna",
  ],
};

// Sub-kategori konfigürasyonları
const CAR_SECTIONS = [
  {
    id: "kalin-pasta",
    title: "Kalın Pastalar",
    subtitle: "Heavy Cut Compound",
    description:
      "Derin çizikler, rutubet izleri ve ağır kir birikimlerini etkili şekilde gidermek için tasarlanmış agresif kesim pastalar.",
    color: "#af1d1f",
    filter: (sub_cat: string, sub_cat2: string) =>
      sub_cat2 === "Kalın Pastalar",
  },
  {
    id: "ince-pasta",
    title: "İnce Pastalar",
    subtitle: "Fine Cut / Finish",
    description:
      "Yüzey pürüzlülüklerini gideren, parlak ve mükemmel boya finişi için formüle edilmiş bitiş pastalar.",
    color: "#006b52",
    filter: (sub_cat: string, sub_cat2: string) =>
      sub_cat2 === "İnce Pastalar",
  },
  {
    id: "hare-giderici",
    title: "Hare Gidericiler",
    subtitle: "Swirl Remover",
    description:
      "Döner fırça ve otomatik yıkama kaynaklı hare izlerini ortadan kaldıran özel cila ürünleri.",
    color: "#f5a623",
    filter: (sub_cat: string, sub_cat2: string) =>
      sub_cat2 === "Hare Gidericiler",
  },
  {
    id: "boya-koruma",
    title: "Boya Koruma",
    subtitle: "Paint Protection",
    description:
      "Boyayı UV ışınları, kirlilik ve hava koşullarına karşı koruyan wax ve sealant ürünleri.",
    color: "#1d1d1d",
    filter: (sub_cat: string, sub_cat2: string) =>
      sub_cat === "Boya Koruma Ürünleri",
  },
  {
    id: "metal-parlatici",
    title: "Metal Parlatıcılar",
    subtitle: "Metal Polish",
    description:
      "Krom, çelik ve metal yüzeyleri ayna parlaklığına kavuşturan özel formüllü parlatıcılar.",
    color: "#6b7280",
    filter: (sub_cat: string, sub_cat2: string) =>
      sub_cat === "Metal ve Krom Parlatıcılar",
  },
];

const ACCESSORY_SECTIONS = [
  {
    id: "orbital-sunger",
    title: "Orbital Süngerler",
    filter: (sub_cat2: string) => sub_cat2 === "Orbital Süngerler",
  },
  {
    id: "rotary-sunger",
    title: "Rotary Süngerler",
    filter: (sub_cat2: string) => sub_cat2 === "Rotary Süngerler",
  },
  {
    id: "keceler",
    title: "Kuzu Yünü Keçeler",
    filter: (sub_cat2: string) => sub_cat2 === "Keçeler",
  },
];

/** Filter groups where ANY variant matches a section filter */
function filterGroupsBySection(
  groups: ProductGroup[],
  sectionFilter: (sub_cat: string, sub_cat2: string) => boolean
): ProductGroup[] {
  return groups.filter((g) =>
    g.variants.some((v) => {
      const cat = v.product.category as { main_cat: string; sub_cat: string; sub_cat2?: string };
      return sectionFilter(cat?.sub_cat ?? "", cat?.sub_cat2 ?? "");
    })
  );
}

export default async function AracBakimPage() {
  const allProducts = (await getAllProducts()) as unknown as Product[];
  const heroContents = await getPageContents("arac-bakim");
  const heroEntry = heroContents.find((c) => c.section === "hero");
  const heroImage = heroEntry?.image_url;
  const heroSettings = parseImageSettings(heroEntry?.body);

  // Araç bakım ürünleri — main_cat: "DIŞ YÜZEY" → group by size
  const carProducts = allProducts.filter((p) => {
    const cat = p.category as { main_cat: string; sub_cat: string; sub_cat2?: string };
    return cat?.main_cat === "DIŞ YÜZEY";
  });
  const carGroups = groupProductsBySize(carProducts);

  // Aksesuar ürünleri — main_cat: "AKSESUAR" → group by size
  const accessories = allProducts.filter((p) => {
    const cat = p.category as { main_cat: string; sub_cat: string; sub_cat2?: string };
    return cat?.main_cat === "AKSESUAR";
  });
  const accGroups = groupProductsBySize(accessories);

  // Makine ekipmanlar — main_cat: "MAKİNE-EKİPMAN" → group by size
  const equipment = allProducts.filter((p) => {
    const cat = p.category as { main_cat: string; sub_cat: string; sub_cat2?: string };
    return cat?.main_cat === "MAKİNE-EKİPMAN";
  });
  const equipGroups = groupProductsBySize(equipment);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#1d1d1d] text-white overflow-hidden">
        {/* Arka plan gorseli veya deseni */}
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: heroSettings.position,
                filter: `brightness(${heroSettings.brightness}%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0,0,0,${heroSettings.overlay / 100})` }}
            />
          </>
        ) : (
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}
        {/* Kırmızı vurgu çizgisi */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#af1d1f]" />

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#af1d1f]" />
              <span className="text-[#af1d1f] text-xs font-bold uppercase tracking-widest">
                Profesyonel Oto Pasta & Cila
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
              Araç Bakım{" "}
              <span className="text-[#af1d1f]">Ürünleri</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-8">
              Profesyonel araç polisaj ve koruma ürünleri — 1888&apos;den bu yana
              dünya genelinde oto pasta ustalarının tercihi.
            </p>
            <div className="flex flex-wrap gap-3">
              {CAR_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white border border-gray-600 hover:border-white px-4 py-2 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ürün Kategorileri */}
      <div className="bg-[#f8f9fa]">
        {CAR_SECTIONS.map((section) => {
          const sectionGroups = filterGroupsBySection(carGroups, section.filter);

          if (sectionGroups.length === 0) return null;

          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-[120px] py-14 border-b border-gray-200 last:border-b-0"
            >
              <div className="container mx-auto px-4">
                {/* Bölüm başlığı */}
                <div className="flex items-start gap-4 mb-8">
                  <div
                    className="w-1 self-stretch min-h-[3rem] shrink-0"
                    style={{ backgroundColor: section.color }}
                  />
                  <div className="flex-1">
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: section.color }}
                    >
                      {section.subtitle}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1d] uppercase tracking-tight leading-none mb-2">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-500 max-w-xl">
                      {section.description}
                    </p>
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-gray-400 self-center">
                    {sectionGroups.length} ürün
                  </span>
                </div>

                {/* Ürün grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sectionGroups.map((group) => (
                    <ProductCard
                      key={group.primary.sku}
                      data={buildGroupCardData(group, { showBars: false })}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Aksesuarlar */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#f5a623] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5a623] mb-1">
                Polisaj Ekipmanları
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1d] uppercase tracking-tight leading-none mb-2">
                Aksesuarlar
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Doğru ped ve keçe seçimi, polisaj sonucunu doğrudan etkiler. Her
                pasta türü için uygun aksesuar kombinasyonları.
              </p>
            </div>
          </div>

          {ACCESSORY_SECTIONS.map((accSection) => {
            const sectionAccGroups = accGroups.filter((g) =>
              g.variants.some((v) => {
                const cat = v.product.category as { main_cat: string; sub_cat: string; sub_cat2?: string };
                return accSection.filter(cat?.sub_cat2 ?? "");
              })
            );

            if (sectionAccGroups.length === 0) return null;

            return (
              <div key={accSection.id} className="mb-10">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-[#f5a623] inline-block" />
                  {accSection.title}
                  <span className="text-gray-400 font-normal text-xs ml-1">
                    ({sectionAccGroups.length})
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sectionAccGroups.map((group) => (
                    <ProductCard
                      key={group.primary.sku}
                      data={buildGroupCardData(group, { showBars: false })}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Makine ekipman */}
          {equipGroups.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#f5a623] inline-block" />
                Tabanlıklar & Destek Diskler
                <span className="text-gray-400 font-normal text-xs ml-1">
                  ({equipGroups.length})
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {equipGroups.map((group) => (
                  <ProductCard
                    key={group.primary.sku}
                    data={buildGroupCardData(group, { showBars: false })}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-8 h-0.5 bg-[#af1d1f] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Ürün seçiminde yardıma mı ihtiyacınız var?
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Uzman ekibimiz aracınıza ve boya durumunuza göre en uygun pasta ve
            cila kombinasyonunu belirlemenize yardımcı olur.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Bizimle İletişime Geçin
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
