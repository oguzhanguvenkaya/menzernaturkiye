import type { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  Factory,
  PackageSearch,
  Settings2,
  ArrowRight,
  PlayCircle,
  Users,
  BadgeCheck,
} from "lucide-react";
import { getPageContents } from "@/db/queries";
import { parseImageSettings } from "@/lib/image-settings";

export const metadata: Metadata = {
  title: "Eğitim Programı",
  description:
    "Menzerna Türkiye profesyonel polisaj eğitim programları. Araç bakım, endüstriyel uygulama ve ürün kullanım seminerleri.",
};

const trainingTopics = [
  {
    icon: Car,
    title: "Araç Polisaj Teknikleri",
    description:
      "Tek adım ve çok adımlı polisaj yöntemleri, boya derinliği ölçümü, paint correction teknikleri ve son kat koruma uygulamaları.",
    tags: ["Başlangıç", "Orta Seviye", "İleri"],
  },
  {
    icon: Factory,
    title: "Endüstriyel Polisaj Uygulamaları",
    description:
      "Metal, alüminyum, paslanmaz çelik ve plastik yüzeylerde mekanik yüzey işleme yöntemleri ve doğru pasta seçimi.",
    tags: ["Endüstriyel", "Teknik"],
  },
  {
    icon: PackageSearch,
    title: "Ürün Seçimi ve Kullanımı",
    description:
      "Cut ve Gloss skalası, doğru ürün-yüzey eşleştirmesi, uygulama miktarı optimizasyonu ve verimli kullanım rehberi.",
    tags: ["Temel Eğitim"],
  },
  {
    icon: Settings2,
    title: "Makine ve Pad Eşleştirme",
    description:
      "Rotary ve DA (dual action) makine kullanımı, pad sertlik seçimi, hız ayarları ve farklı yüzey tiplerinde doğru kombinasyon.",
    tags: ["Ekipman", "Teknik"],
  },
];

const highlights = [
  {
    icon: Users,
    label: "Küçük Gruplar",
    desc: "Birebir rehberlik imkanı",
  },
  {
    icon: BadgeCheck,
    label: "Sertifika",
    desc: "Katılım belgesi verilir",
  },
  {
    icon: PlayCircle,
    label: "Uygulamalı",
    desc: "Teorik + pratik eğitim",
  },
];

export default async function EgitimPage() {
  const heroContents = await getPageContents("egitim");
  const heroEntry = heroContents.find((c) => c.section === "hero");
  const heroImage = heroEntry?.image_url;
  const heroSettings = parseImageSettings(heroEntry?.body);

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-[#1d1d1d] text-white overflow-hidden">
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
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#af1d1f]" />

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#af1d1f]" />
              <span className="text-[#af1d1f] text-xs font-bold uppercase tracking-widest">
                Kurumsal
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
              Eğitim Programı
            </h1>
          </div>
        </div>
      </section>

      {/* Giriş */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
              Profesyoneller İçin
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d] mb-6">
              Doğru Teknikle Fark Yarat
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Menzerna Türkiye olarak sunduğumuz eğitim programları, polisaj
              sektöründeki profesyonellerin bilgi ve uygulama becerilerini en
              üst düzeye taşımak amacıyla tasarlanmıştır. Uygulamalı atölye
              çalışmaları, teknik seminerler ve ürün kullanım rehberlikleri ile
              katılımcıları sektörün gereksinimlerine hazırlıyoruz.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ankara merkezli seminer etkinliklerimizde küçük gruplar halinde
              yoğun, birebir uygulamalı eğitimler verilmektedir. Eğitimler;
              araç detay uzmanları, boyahane çalışanları ve endüstriyel yüzey
              işleme teknisyenlerine yönelik farklı içerik modülleriyle
              düzenlenmektedir.
            </p>
          </div>

          {/* Öne Çıkan Özellikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 max-w-3xl mx-auto">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="bg-[#f8f9fa] border border-gray-200 p-6 text-center"
              >
                <div className="w-12 h-12 bg-[#1d1d1d] flex items-center justify-center mx-auto mb-3">
                  <h.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-black text-sm uppercase tracking-wider text-[#1d1d1d] mb-1">
                  {h.label}
                </p>
                <p className="text-xs text-gray-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video */}
      <section className="py-16 md:py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
                Seminer Kaydı
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#1d1d1d]">
                Ankara Semineri
              </h2>
            </div>

            <div className="relative w-full aspect-video bg-[#1d1d1d] border border-gray-200 overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Menzerna Türkiye — Ankara Polisaj Semineri"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <p className="text-center text-xs text-gray-400 mt-3">
              Menzerna Türkiye polisaj semineri — Ankara, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Eğitim Konuları */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
              Müfredat
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d]">
              Eğitim Konuları
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {trainingTopics.map((topic, idx) => (
              <div
                key={topic.title}
                className="bg-white border border-gray-200 hover:border-[#af1d1f] p-7 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#1d1d1d] group-hover:bg-[#af1d1f] flex items-center justify-center shrink-0 transition-colors">
                    <topic.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#1d1d1d] bg-[#f8f9fa] border border-gray-200 px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Eğitime Katılmak İster misiniz?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Eğitim programları hakkında bilgi almak için bizimle iletişime
            geçin. Yaklaşan seminer tarihlerini ve kontenjan durumunu size
            iletebiliriz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center gap-2"
            >
              İletişime Geç
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/urunler"
              className="border-2 border-white hover:bg-white hover:text-[#1d1d1d] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Ürünleri İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
