"use client";

import { useState } from "react";
import Image from "next/image";

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

export function SurfaceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#af1d1f] mb-2">
            Her Malzeme İçin Premium Polisaj Sonuçları
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-[#1d1d1d] leading-tight">
            Her Yüzey İçin Doğru Polisaj Pastası
          </h2>
        </div>

        {/* Tab Navigasyonu */}
        <div className="flex items-center overflow-x-auto border-b border-gray-200 mb-10 -mx-4 px-4 md:mx-0 md:px-0">
          {TABS.map((t, i) => (
            <div key={t.id} className="flex items-center shrink-0">
              {i > 0 && <span className="text-gray-300 mx-1 select-none">|</span>}
              <button
                onClick={() => setActiveTab(i)}
                className={`px-4 py-3 text-sm font-bold transition-colors relative ${
                  activeTab === i
                    ? "text-[#af1d1f]"
                    : "text-[#1d1d1d] hover:text-[#af1d1f]"
                }`}
              >
                {t.label}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#af1d1f]" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Tab İçeriği */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Sol: Görsel */}
          <div className="relative aspect-[3/2] bg-gray-100 overflow-hidden">
            <Image
              src={tab.image}
              alt={tab.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Sağ: Metin */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#1d1d1d] mb-4">
              {tab.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {tab.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
