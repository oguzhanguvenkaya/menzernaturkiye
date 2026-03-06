import type { Metadata } from "next";
import Link from "next/link";
import {
  Lightbulb,
  Award,
  Scale,
  Star,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  MapPin,
  Factory,
  Anchor,
  Car,
} from "lucide-react";
import { getPageContents } from "@/db/queries";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "1888'den bu yana polisajda mükemmellik. Menzerna'nın Türkiye yetkili distribütörü MG Polisaj hakkında bilgi alın.",
};

const values = [
  {
    icon: Lightbulb,
    title: "İnovasyon",
    description:
      "100 yılı aşkın Alman mühendislik mirası ile sürekli ar-ge ve ürün geliştirme odağı.",
  },
  {
    icon: Award,
    title: "Yetkinlik",
    description:
      "Araç bakım, endüstriyel ve marin sektörlerinde kanıtlanmış teknik uzmanlık.",
  },
  {
    icon: Scale,
    title: "Adillik",
    description:
      "Müşteri, iş ortağı ve çevreye karşı dürüst, şeffaf ve adil ilişki anlayışı.",
  },
  {
    icon: Star,
    title: "Mükemmellik",
    description:
      "Her ürün formülünde, her yüzey uygulamasında en yüksek sonuç standardını hedefleme.",
  },
  {
    icon: ShieldCheck,
    title: "Sorumluluk",
    description:
      "Sürdürülebilir üretim süreçleri ve çevreye duyarlı ürün içerikleriyle gelecek nesle sorumluluk.",
  },
  {
    icon: TrendingDown,
    title: "Maliyet Etkinliği",
    description:
      "Yüksek konsantrasyonlu formüller sayesinde daha az ürünle daha fazla yüzey işleme kapasitesi.",
  },
];

const sectors = [
  {
    icon: Car,
    label: "Araç Bakım",
    desc: "Profesyonel oto detay ve araç koruma",
  },
  {
    icon: Factory,
    label: "Endüstriyel",
    desc: "Metal, plastik ve kompozit yüzey işleme",
  },
  {
    icon: Anchor,
    label: "Marin",
    desc: "Jelkot ve deniz araçları için bakım çözümleri",
  },
];

export default async function HakkimizdaPage() {
  const heroContents = await getPageContents("hakkimizda");
  const heroImage = heroContents.find((c) => c.section === "hero")?.image_url;

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-[#1d1d1d] py-20 md:py-28 overflow-hidden">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px)",
            }}
          />
        )}
        <div className="relative container mx-auto px-4 text-center">
          <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
            Kurumsal
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Hakkımızda
          </h1>
          <div className="w-16 h-1 bg-[#af1d1f] mx-auto" />
        </div>
      </section>

      {/* Menzerna Tarihi */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
                Menzerna GmbH
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d] mb-6 leading-tight">
                1888&apos;den Bu Yana
                <br />
                <span className="text-[#af1d1f]">Polisajda Mükemmellik</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Menzerna, 1888 yılında Almanya&apos;nın Öhringen şehrinde
                  kurulmuş, dünya genelinde profesyonel polisaj ürünleri
                  alanında lider bir markadır. 130 yılı aşkın tecrübesiyle
                  Menzerna, endüstrinin en zorlu yüzey işleme gereksinimlerine
                  çözüm sunan formüller geliştirmektedir.
                </p>
                <p>
                  Ürün yelpazesi; katı polisaj pastası, polisaj emülsiyonu ve
                  sıvı araç ile tekne cilası olmak üzere geniş bir ürün
                  gamını kapsamaktadır. Her formül, Alman mühendislik
                  standardında laboratuvar ortamında geliştirilerek sektörün
                  beklentilerini karşılayacak şekilde optimize edilmektedir.
                </p>
                <p>
                  Menzerna&apos;nın uzmanlık alanları arasında otomotiv, ağır
                  sanayi ve marin sektörleri bulunmaktadır. Araç üreticilerinden
                  tersanelere, oto detay uzmanlarından endüstriyel yüzey işleme
                  tesislerine kadar geniş bir müşteri portföyüne hizmet
                  sunulmaktadır.
                </p>
              </div>
            </div>

            {/* Sektörler yan panel */}
            <div className="space-y-4">
              <div className="bg-[#f8f9fa] border-l-4 border-[#af1d1f] p-6">
                <p className="text-xs font-black uppercase tracking-widest text-[#1d1d1d] mb-1">
                  Kuruluş Yılı
                </p>
                <p className="text-5xl font-black text-[#af1d1f]">1888</p>
                <p className="text-sm text-gray-500 mt-1">Öhringen, Almanya</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {sectors.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white border border-gray-200 p-4 flex items-center gap-4 hover:border-[#af1d1f] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#1d1d1d] flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-[#1d1d1d]">
                        {s.label}
                      </p>
                      <p className="text-xs text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Değerler Grid */}
      <section className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
              Temel Değerlerimiz
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d]">
              Bizi Biz Yapan İlkeler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white border border-gray-200 hover:border-[#af1d1f] p-7 transition-colors group"
              >
                <div className="w-11 h-11 bg-[#1d1d1d] group-hover:bg-[#af1d1f] flex items-center justify-center mb-4 transition-colors">
                  <value.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-black uppercase tracking-widest text-[#1d1d1d] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MG Polisaj Bölümü */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
                  Yetkili Distribütör
                </p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d] mb-6 leading-tight">
                  Türkiye Distribütörü:
                  <br />
                  <span className="text-[#af1d1f]">MG Polisaj</span>
                </h2>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    MG Polisaj, Menzerna markasının Türkiye&apos;deki tek yetkili
                    distribütörüdür. Ankara merkezli olarak faaliyet gösteren
                    şirketimiz, Menzerna&apos;nın yüksek kaliteli polisaj
                    ürünlerini Türkiye genelindeki profesyonel kullanıcılara
                    ulaştırmaktadır.
                  </p>
                  <p>
                    Oto detay atölyeleri, boyahaneler, endüstriyel yüzey işleme
                    tesisleri ve marin bakım merkezlerine ürün temini ile teknik
                    destek sağlayan MG Polisaj; aynı zamanda kullanıcı eğitimi
                    ve uygulama rehberliği sunmaktadır.
                  </p>
                  <p>
                    Türkiye genelinde yetkili satıcı ağı aracılığıyla geniş bir
                    coğrafi kapsama hizmet sunulmakta; sektör profesyonellerine
                    doğru ürün ve teknik bilgiyle destek sağlanmaktadır.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#1d1d1d] text-white p-7">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Merkez
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-[#af1d1f] shrink-0" />
                    <p className="font-black text-lg uppercase tracking-wider">
                      Ankara, Türkiye
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                    Türkiye genelinde yetkili satıcı ağı ile hizmet
                    vermekteyiz.
                  </p>
                </div>
                <div className="border border-gray-200 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Yetki Belgesi
                  </p>
                  <p className="text-sm font-black text-[#1d1d1d] uppercase tracking-wider">
                    Menzerna GmbH
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Resmi Türkiye Distribütörü
                  </p>
                  <div className="w-12 h-0.5 bg-[#af1d1f] mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Daha Fazlasını Keşfet
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Ürün kataloğumuzu inceleyin veya bizimle iletişime geçerek
            ihtiyacınıza uygun çözümü birlikte belirleyelim.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center gap-2"
            >
              İletişim
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/urunler"
              className="border-2 border-white hover:bg-white hover:text-[#1d1d1d] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
