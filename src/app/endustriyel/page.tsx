import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts, getPageContents } from "@/db/queries";
import { parseImageSettings } from "@/lib/image-settings";
import { ProductCard } from "@/components/product-card";
import { SurfaceTabs } from "@/components/surface-tabs";
import { groupProductsBySize, buildGroupCardData } from "@/lib/product-utils";
import type { Product } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Endüstriyel Polisaj",
  description:
    "Menzerna endüstriyel polisaj çözümleri. Otomotiv, mobilya, müzik aletleri, elektronik ve daha fazlası için profesyonel katı pasta ve yüzey işleme ürünleri.",
  keywords: [
    "endüstriyel polisaj",
    "katı pasta",
    "yüzey parlatma",
    "metal parlatma",
    "paslanmaz çelik polisaj",
    "alüminyum parlatma",
    "menzerna endüstriyel",
  ],
};

// Endüstri sektörleri
const SECTORS = [
  {
    id: "otomotiv",
    title: "Otomotiv",
    description: "Araç boyası, tampon ve plastik parçalar için profesyonel çözümler.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    id: "mobilya",
    title: "Mobilya",
    description: "Ahşap, laminat ve lakeli mobilya yüzeyleri için cilalama çözümleri.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "muzik-aletleri",
    title: "Müzik Aletleri",
    description: "Gitar, keman ve diğer enstrümanların lakeli yüzeyleri için.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    id: "elektronik",
    title: "Elektronik",
    description: "Plastik ve kompozit elektronik ürün kasaları için parlatma.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    id: "sihhi-tesisat",
    title: "Sıhhi Tesisat",
    description: "Krom armatürler, paslanmaz çelik ve bakır borular için.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: "saat-mucevher",
    title: "Saat & Mücevher",
    description: "Değerli metaller, titanyum ve çelik kasa & bilezikler için.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "havacilik",
    title: "Havacılık",
    description: "Uçak gövdesi, alüminyum yapısal parçalar ve kabin ekipmanları.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    id: "tekne",
    title: "Tekne & Denizcilik",
    description: "GRP/jelkot tekneler, paslanmaz çelik aksam ve alüminyum profiller.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
];

export default async function EndustriyelPage() {
  const allProducts = (await getAllProducts()) as unknown as Product[];
  const heroContents = await getPageContents("endustriyel");
  const heroEntry = heroContents.find((c) => c.section === "hero");
  const heroImage = heroEntry?.image_url;
  const heroSettings = parseImageSettings(heroEntry?.body);

  // Endüstriyel ürünler — main_cat: "ENDÜSTRİYEL" → group by size
  const industrialProducts = allProducts.filter((p) => {
    const cat = p.category as { main_cat: string };
    return cat?.main_cat === "ENDÜSTRİYEL";
  });
  const industrialGroups = groupProductsBySize(industrialProducts);

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
                  "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 0, transparent 40px)",
              }}
            />
          </div>
        )}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#af1d1f]" />

        <div className="relative container mx-auto px-4 py-20 md:py-28 min-h-[498px] md:min-h-[471px] flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#af1d1f]" />
              <span className="text-[#af1d1f] text-xs font-bold uppercase tracking-widest">
                Endüstriyel Yüzey İşleme
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
              Endüstriyel{" "}
              <span className="text-[#af1d1f]">Polisaj</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Endüstriyel yüzey işleme çözümleri — 1888&apos;den bu yana metal,
              plastik, ahşap ve kompozit yüzeyler için güvenilir polisaj teknolojisi.
            </p>
          </div>
        </div>
      </section>

      {/* Endüstri Sektörleri Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#af1d1f] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#af1d1f] mb-1">
                Uygulama Alanları
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1d] uppercase tracking-tight leading-none mb-2">
                Hangi Sektöre Hizmet Veriyoruz?
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Menzerna endüstriyel ürünleri birbirinden farklı sektörlerde
                güvenle kullanılmaktadır.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="group bg-white border border-gray-200 hover:border-[#af1d1f] p-6 transition-all hover:shadow-md"
              >
                <div className="text-[#1d1d1d] group-hover:text-[#af1d1f] transition-colors mb-3">
                  {sector.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-[#1d1d1d] group-hover:text-[#af1d1f] transition-colors mb-1.5">
                  {sector.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {sector.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yüzey Tabları */}
      <SurfaceTabs />

      {/* Video Placeholder */}
      <section className="py-16 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#006b52] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#006b52] mb-1">
                Görsel Rehber
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1d] uppercase tracking-tight leading-none">
                Endüstriyel Polisaj Uygulaması
              </h2>
            </div>
          </div>

          <div className="aspect-video bg-[#1d1d1d] flex items-center justify-center max-w-3xl relative overflow-hidden">
            {/* Video yerleşim alanı */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1d] to-[#001520]" />
            <div className="relative flex flex-col items-center gap-4 text-white">
              <div className="w-16 h-16 border-2 border-white/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                Endüstriyel Polisaj Videosu
              </p>
              <p className="text-xs text-white/40">Yakında Eklenecek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ürünler */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#1d1d1d] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-1">
                Ürün Kataloğu
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1d] uppercase tracking-tight leading-none mb-2">
                Endüstriyel Polisaj Ürünleri
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Katı pasta formülasyonları; metal, plastik, ahşap ve kompozit
                yüzeylerde üstün parlatma performansı sunar.
              </p>
            </div>
            <span className="hidden sm:block text-sm font-bold text-gray-400 self-center ml-auto">
              {industrialGroups.length} ürün
            </span>
          </div>

          {industrialGroups.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {industrialGroups.map((group) => (
                <ProductCard
                  key={group.primary.sku}
                  data={buildGroupCardData(group, { showBars: false })}
                  variant="compact"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm font-bold uppercase tracking-widest">
                Ürünler yükleniyor...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ürün Bilgi Tablosu */}
      <section className="py-16 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#f5a623] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5a623] mb-1">
                Teknik Bilgi
              </p>
              <h2 className="text-2xl font-black text-[#1d1d1d] uppercase tracking-tight leading-none">
                Ürün Renk Kodları & Kullanım Alanları
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1d1d1d] text-white">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                    Renk
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                    Özellik
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                    Uygun Yüzeyler
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { renk: "Kahverengi (113GZ)", ozellik: "Agresif Kesim", yuzeyler: "Pirinç, Zamak, Alüminyum" },
                  { renk: "Yeşil (439T)", ozellik: "Kesici", yuzeyler: "Paslanmaz Çelik, Alüminyum, Pirinç" },
                  { renk: "Mavi (P164)", ozellik: "Orta Kesim", yuzeyler: "Çok Amaçlı Yüzey" },
                  { renk: "Bej (GW18 / GW16)", ozellik: "Kesici / Parlatıcı", yuzeyler: "Plastik, Kompozit, Boyalı Yüzey" },
                  { renk: "Bej (480W)", ozellik: "Parlatıcı", yuzeyler: "Pirinç, Krom, Zamak, Alüminyum, Kompozit" },
                  { renk: "Pembe (P126)", ozellik: "Parlatıcı", yuzeyler: "Paslanmaz Çelik, Değerli Metal" },
                  { renk: "Beyaz (M5 / 495P)", ozellik: "Süper Parlatıcı", yuzeyler: "Değerli Metaller, Plastik, Boyalı Yüzey" },
                  { renk: "Sarı (P175)", ozellik: "Süper Parlatıcı", yuzeyler: "Çok Amaçlı Yüzey" },
                  { renk: "Beyaz (P14F)", ozellik: "Orta Kesim Tek Adım", yuzeyler: "Alüminyum, Pirinç, Paslanmaz" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 text-[#1d1d1d] font-bold text-xs">{row.renk}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{row.ozellik}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{row.yuzeyler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-8 h-0.5 bg-[#af1d1f] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Endüstriyel polisaj çözümleri için bizimle iletişime geçin
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Yüzey türünüze ve işlem hacminize uygun endüstriyel pasta ve ekipman
            önerisi almak için uzmanlarımızla görüşün.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            İletişime Geçin
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
