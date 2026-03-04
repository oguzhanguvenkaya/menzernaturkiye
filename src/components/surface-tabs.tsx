"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

const TABS = [
  {
    id: "aluminyum",
    label: "Alüminyum",
    title: "Alüminyum İçin Katı Pastalar",
    description:
      "Otomobil süsleme parçaları, sac metal, jantlar, mutfak eşyaları, kapı kolları ve birçok uygulama için endüstriyel polisaj pastaları. Fırçalanmış, anodize edilebilir, yarı parlak veya yüksek parlak alüminyum yüzeyler: Doğru polisaj pastasını burada bulacaksınız.",
    image:
      "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Bilder/Industrielles_Polieren/Produktbilder/Menzerna_surface_Aluminium.jpg",
  },
  {
    id: "pirinc",
    label: "Pirinç / Demir Dışı Metaller",
    title: "Pirinç ve Demir Dışı Metaller İçin Katı Pastalar",
    description:
      "Sıhhi tesisat armatürlerinin polisajı için üstün performanslı pasta gereklidir. En yüksek kalitedeki malzemeler, galvanizleme öncesi optimum yüzey hazırlığını sağlar. Lambalar, müzik aletleri veya teknik bileşenler: Menzerna katı pastalarıyla pirinç iş parçanızı yüksek parlaklığa kavuşturun.",
    image:
      "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Bilder/Industrielles_Polieren/Produktbilder/Menzerna_surface_brass.jpg",
  },
  {
    id: "paslanmaz-celik",
    label: "Paslanmaz Çelik",
    title: "Paslanmaz Çelik İçin Katı Pastalar",
    description:
      "Fırçalanmış, yarı parlak veya yüksek parlak yüzeyler; otomobil bileşenleri, çatal-bıçak takımları, mutfak eşyaları ve evyeler için arzu edilen nihai kaliteyi sunar. Paslanmaz çelik için özel geliştirilmiş pastamız, polisaj sürelerini kısa tutar ve ince parçalarda aşırı ısınmayı önler.",
    image:
      "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Bilder/Industrielles_Polieren/Produktbilder/Menzerna_surface_Stainless_steel.jpg",
  },
  {
    id: "boyali-yuzey",
    label: "Boyalı Yüzeyler",
    title: "Boyalı Yüzeyler ve Ahşap İçin Katı Pastalar",
    description:
      "GW 16, kaplamalı ahşap yüzeylerin polisajında Menzerna'nın amiral gemisi katı pastasıdır. Mobilya, mutfak, otomobil iç mekan, keman ve piyano sadece birkaç uygulama örneğidir. Özellikle siyah kaplamalarda derin ayna parlaklığı: Menzerna katı pastaları işi halleder.",
    image:
      "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Bilder/Industrielles_Polieren/Produktbilder/Menzerna_Surface_Paint.jpg",
  },
];

function TabContent({ tab }: { tab: (typeof TABS)[number] }) {
  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
      {/* Sol: Görsel — 5/12 */}
      <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-[420px] bg-gray-100 overflow-hidden">
        <Image
          src={tab.image}
          alt={tab.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
      </div>
      {/* Sağ: Metin — 7/12 */}
      <div className="md:col-span-7">
        <h4 className="text-[20px] md:text-[24px] font-bold text-[#1d1d1d] mb-4 leading-snug">
          {tab.title}
        </h4>
        <p className="text-[16px] md:text-[18px] text-[#555] leading-[1.7]">
          {tab.description}
        </p>
      </div>
    </div>
  );
}

export function SurfaceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

  return (
    <section className="py-14 md:py-[55px] bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="mb-8 md:mb-10">
          <p className="text-[16px] md:text-[18px] font-bold uppercase tracking-widest text-[#af1d1f] mb-2">
            Her Malzeme İçin Premium Polisaj Sonuçları
          </p>
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-normal text-[#1d1d1d] leading-[1.15]">
            Her Yüzey İçin Doğru Polisaj Pastası
          </h2>
        </div>

        {/* Desktop: Tab Navigasyonu */}
        <div className="hidden md:flex items-center border-b border-gray-200 mb-10">
          {TABS.map((t, i) => (
            <div key={t.id} className="flex items-center shrink-0">
              {i > 0 && (
                <span className="text-gray-300 mx-2 select-none text-[18px]">
                  |
                </span>
              )}
              <button
                onClick={() => setActiveTab(i)}
                className={`px-4 py-3 text-[18px] lg:text-[20px] font-bold transition-colors relative ${
                  activeTab === i
                    ? "text-[#af1d1f]"
                    : "text-[#1d1d1d] hover:text-[#af1d1f]"
                }`}
              >
                {t.label}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#af1d1f]" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Desktop: Aktif Tab İçeriği */}
        <div className="hidden md:block">
          <TabContent tab={TABS[activeTab]} />
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-0 border-t border-gray-200">
          {TABS.map((t, i) => (
            <div key={t.id} className="border-b border-gray-200">
              <button
                onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span
                  className={`text-[18px] font-bold ${
                    mobileOpen === i ? "text-[#af1d1f]" : "text-[#1d1d1d]"
                  }`}
                >
                  {t.label}
                </span>
                <ChevronUp
                  className={`w-5 h-5 transition-transform ${
                    mobileOpen === i
                      ? "rotate-0 text-[#af1d1f]"
                      : "rotate-180 text-gray-400"
                  }`}
                />
              </button>
              {mobileOpen === i && (
                <div className="pb-6">
                  <TabContent tab={t} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
