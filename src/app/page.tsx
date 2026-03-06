import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { NewsCarousel } from "@/components/news-carousel";
import { FeatureCarousel } from "@/components/feature-carousel";
import { getPageContents } from "@/db/queries";

const featureCards = [
  {
    icon: "/icons/forschung_entwicklung.svg",
    iconWhite: "/icons/forschung_entwicklung_white.svg",
    title: "Araştırma ve Geliştirme",
    desc: "Uzmanlar, son teknoloji laboratuvarlarda yüksek performanslı formüller geliştirir.",
  },
  {
    icon: "/icons/spezialrezepturen_2_.svg",
    iconWhite: "/icons/spezialrezepturen_2__white.svg",
    title: "Özel Formüller",
    desc: "Yüzlerce özel geliştirilmiş formülle, her görev ve yüzey için özel ürünler sunuyoruz.",
  },
  {
    icon: "/icons/grossproduktion_2_.svg",
    iconWhite: "/icons/grossproduktion_2__white.svg",
    title: "Büyük Ölçekli Üretim",
    desc: "Derin süreç mühendisliği bilgisine dayalı, üstün kalite ve dakiklikle karmaşık parti üretimi.",
  },
  {
    icon: "/icons/industrie-expertise_2_.svg",
    iconWhite: "/icons/industrie-expertise_2__white.svg",
    title: "Endüstri Uzmanlığı",
    desc: "Endüstriyel polisaj söz konusu olduğunda, finisaj kalitesinin yanı sıra maliyet etkinliği de merkezdedir.",
  },
  {
    icon: "/icons/automobil-expertise_2_.svg",
    iconWhite: "/icons/automobil-expertise_2__white.svg",
    title: "Otomotiv Uzmanlığı",
    desc: "Otomobil üreticileri, otomotiv ticareti, detaycılar ve otomobil meraklıları için profesyonel araç cilaları sunuyoruz.",
  },
  {
    icon: "/icons/verfahrensentwicklung_Training_2_.svg",
    iconWhite: "/icons/verfahrensentwicklung_Training_2__white.svg",
    title: "Süreç Geliştirme & Eğitim",
    desc: "Polisaj süreçlerinizi iyileştirmenizde sizi destekliyor ve yoğun polisaj eğitimleri sunuyoruz.",
  },
];

const categoryCardsBase = [
  {
    image: "/images/hero-industrial.png",
    section: "cat-endustriyel",
    tag: "Endüstriyel Polisaj",
    title: "Polisajda Mükemmellik",
    desc: "Menzerna, birçok farklı yüzeyin endüstriyel işlenmesi için polisaj pastaları ve emülsiyonları geliştirir ve üretir.",
    buttonText: "Bileşikler & Emülsiyonlara Git",
    href: "/endustriyel",
  },
  {
    image: "/images/hero-car-polishing.png",
    section: "cat-arac",
    tag: "Araç Cilası",
    title: "İlham Veren Araç Cilaları",
    desc: "Yüksek parlaklıkta otomotiv cilası: Menzerna, dört yaygın polisaj aşaması için otomotiv cilaları sunar.",
    buttonText: "Araç Bakımına Git",
    href: "/arac-bakim",
  },
  {
    image: "/images/hero-marine.png",
    section: "cat-marin",
    tag: "Tekne Cilası",
    title: "İlham Veren Tekne Cilaları",
    desc: "Menzerna, her türlü jel kaplama için profesyonel tekne cilaları sunar: Yüzey hazırlığı, çizik giderme ve mat lekelerin giderilmesi.",
    buttonText: "Tekne Bakımına Git",
    href: "/marin",
  },
];

const stats = [
  { number: "1888", label: "Kuruluş Yılı" },
  { number: "150", label: "Formülasyon" },
  { number: "50", label: "Çalışan" },
  { number: "70", label: "Ülke" },
];

export default async function HomePage() {
  const pageContents = await getPageContents("anasayfa");
  const getImage = (section: string) =>
    pageContents.find((c) => c.section === section)?.image_url;
  return (
    <div>
      {/* 1. HERO BANNER — 2-column static layout, full viewport height */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[calc(100vh-126px)] md:min-h-[500px]">
          {/* Left — Endüstriyel Polisaj */}
          <Link href="/endustriyel" className="group relative block h-[350px] md:h-full overflow-hidden">
            <img
              src={getImage("hero-left") || "https://www.menzerna.com/fileadmin/_processed_/7/6/csm_Menzerna_IndustriellesPolieren_ef4ba9af14.jpg"}
              alt="Endüstriyel Polisaj"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
              <h1 className="text-[36px] md:text-[50px] lg:text-[64px] font-bold text-[#1d1d1d] leading-[1.1] mb-6">
                Endüstriyel Polisaj
              </h1>
              <span className="inline-block bg-[#af1d1f] text-white text-[14px] md:text-[16px] font-bold px-6 py-3 hover:bg-[#8b1618] transition-colors">
                Katı pastalar &amp; polisaj emülsiyonları
              </span>
            </div>
          </Link>

          {/* Right — Araç Cilaları */}
          <Link href="/arac-bakim" className="group relative block h-[350px] md:h-full overflow-hidden">
            <img
              src={getImage("hero-right") || "https://www.menzerna.com/fileadmin/_processed_/7/e/csm_Professionelle_Autopolituren_Menzerna_1dd33b6b56.jpg"}
              alt="Menzerna Araç Cilaları"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
              <h2 className="text-[36px] md:text-[50px] lg:text-[64px] font-bold text-white leading-[1.1] mb-6">
                Menzerna Araç Cilaları
              </h2>
              <span className="inline-block bg-[#af1d1f] text-white text-[14px] md:text-[16px] font-bold px-6 py-3 hover:bg-[#8b1618] transition-colors">
                Premium araç cilaları &amp; aksesuarlar
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. "1888'den Beri" INTRO SECTION + 3. FEATURE CARDS */}
      <section className="bg-[#f3f3f3] pt-14 pb-16 md:pt-16 md:pb-20 lg:pt-[85px] lg:pb-[100px]">
        <div className="container mx-auto px-4">
          {/* Intro - left aligned, col-lg-10 col-xl-8 equivalent */}
          <div className="max-w-[780px] lg:max-w-[66%] xl:max-w-[60%]">
            <p className="text-[#af1d1f] font-bold tracking-widest uppercase text-[20px] leading-[28px] lg:text-[22px] lg:leading-[30px] mb-2">
              1888&apos;DEN BERİ
            </p>
            <h2 className="text-[32px] leading-[42px] md:text-[36px] md:leading-[46px] lg:text-[42px] lg:leading-[52px] xl:text-[52px] xl:leading-[62px] font-bold text-[#1d1d1d] mb-6">
              Profesyonel polisaj bileşikleri ve cilaları
            </h2>
            <p className="text-[16px] leading-[24px] md:text-[19px] md:leading-[27px] xl:text-[20px] xl:leading-[28px] text-[#1d1d1d]">
              Menzerna, 1888&apos;den beri endüstri ve zanaat için profesyonel
              polisaj pastalarının geliştirilmesi ve üretiminde standartları
              belirlemektedir. Katı bileşikler, emülsiyonlar, araç cilaları
              veya tekne cilaları – Menzerna her yüzey ve her uygulama
              için doğru cilaya sahiptir. Yenilikçi karışımlarımız ve polisaj
              süreçlerimizle, ilham veren ve etkileyen premium sonuçlar elde
              etmenizi sağlıyoruz. Kapsamlı formülasyon bilgi birikimi ve
              müşteri gereksinimlerinin hassas bir şekilde anlaşılması,
              Menzerna&apos;yı endüstriyel polisaj bileşikleri için bir uzman ve
              teknoloji lideri haline getirmiştir.
            </p>
          </div>

          {/* 3. FEATURE CARDS */}
          <FeatureCarousel cards={featureCards} />
        </div>
      </section>

      {/* 4. ABOUT / FACTORY SECTION (50/50 split) */}
      <section className="bg-[#f3f3f3]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image left */}
          <div className="relative h-[400px] lg:h-auto min-h-[400px]">
            <Image
              src={getImage("factory") || "/images/factory.png"}
              alt="Menzerna Fabrika"
              fill
              className="object-cover"
            />
          </div>
          {/* Content right */}
          <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
            <p className="text-[#af1d1f] font-bold tracking-widest uppercase text-[20px] leading-[28px] lg:text-[22px] lg:leading-[30px] mb-4">
              Hakkımızda
            </p>
            <h2 className="text-[32px] leading-[42px] md:text-[36px] md:leading-[46px] lg:text-[42px] lg:leading-[52px] font-bold text-[#1d1d1d] mb-6">
              Menzerna premium markalara parlaklık verir.
            </h2>
            <div className="space-y-5 mb-8">
              <p className="text-[16px] leading-[24px] md:text-[19px] md:leading-[27px] xl:text-[20px] xl:leading-[28px] text-[#1d1d1d]">
                Bir asırlık deneyimle desteklenen Menzerna, 1888&apos;den beri
                yüksek kaliteli katı polisaj pastaları, polisaj emülsiyonları ve
                araç ve tekne cilaları geliştirip üretmektedir.
              </p>
              <p className="text-[16px] leading-[24px] md:text-[19px] md:leading-[27px] xl:text-[20px] xl:leading-[28px] text-[#1d1d1d]">
                Mükemmellik tutkusu her Menzerna ürününe dahil edilmiştir, bu da
                nihai kalite ve ekonomik verimliliği garanti eder. 200&apos;den
                fazla yenilikçi formülasyonla tüm endüstriyel polisaj uygulama
                alanları kapsanmaktadır.
              </p>
              <p className="text-[16px] leading-[24px] md:text-[19px] md:leading-[27px] xl:text-[20px] xl:leading-[28px] text-[#1d1d1d]">
                Almanya Ötigheim&apos;daki premium polisaj bileşikleri ile bir
                şube ve bayi ağı, dünya çapında endüstriye ve ticarete hizmet
                vermektedir.
              </p>
            </div>
            <div>
              <Link
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center gap-2 bg-[#1d1d1d] text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-[#333] transition-colors"
              >
                Şirket Hakkında
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer between About and Categories */}
      <div className="h-[130px] bg-[#f3f3f3]" />

      {/* 5. THREE-COLUMN CATEGORY SHOWCASE (full-bleed) */}
      <section className="pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {categoryCardsBase.map((card) => ({
            ...card,
            image: getImage(card.section) || card.image,
          })).map((card, i) => (
            <div
              key={card.title}
              className={`group relative h-[300px] md:h-[550px] overflow-hidden${
                i < categoryCardsBase.length - 1 ? " border-r border-white" : ""
              }`}
            >
              {/* Background image — fades out on hover */}
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
              </div>
              {/* Light bg — fades in on hover */}
              <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Gradient overlay — fades out on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-700" />
              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-white/80 font-bold uppercase tracking-widest text-[14px] mb-3 block group-hover:text-neutral-500 transition-colors">
                    {card.tag}
                  </span>
                  <h3 className="text-[22px] md:text-[24px] font-bold mb-4 text-white group-hover:text-[#1d1d1d] transition-colors leading-[1.3]">
                    {card.title}
                  </h3>
                  <p className="text-[15px] md:text-[17px] text-white/80 mb-6 group-hover:text-[#555] transition-colors leading-[1.7]">
                    {card.desc}
                  </p>
                </div>
                <Link
                  href={card.href}
                  className="inline-flex items-center text-white text-[16px] font-bold group-hover:text-[#ae1d1e] transition-colors hover:underline underline-offset-4"
                >
                  {card.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NEWS SECTION */}
      <section className="bg-[#f3f3f3] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-[780px] lg:max-w-[66%] xl:max-w-[60%] mb-10 md:mb-14">
            <p className="text-[#af1d1f] font-bold tracking-widest uppercase text-[20px] leading-[28px] lg:text-[22px] lg:leading-[30px] mb-2">
              Güncel Kalın
            </p>
            <h2 className="text-[32px] leading-[42px] md:text-[36px] md:leading-[46px] lg:text-[42px] lg:leading-[52px] font-bold text-[#1d1d1d]">
              Haberlerimiz
            </h2>
          </div>
          <NewsCarousel
            items={[
              {
                image: "https://www.menzerna.com/fileadmin/_processed_/2/1/csm_1767948586407_16f6f8a65d.png",
                title: "Yeni Menzerna kurumsal filmi yayında!",
                day: "06",
                month: "Şub",
              },
              {
                image: "https://www.menzerna.com/fileadmin/_processed_/8/5/csm_Screenshot_2025-12-08_132700_eb4d61f808.png",
                title: "VDA ve ISO'ya göre Çifte Sertifikasyon!",
                day: "04",
                month: "Şub",
              },
              {
                image: "https://www.menzerna.com/fileadmin/_processed_/7/1/csm_Academy_1_97a8c616ee.png",
                title: "Menzerna, Saxdor Academy ile iş birliği yapıyor!",
                day: "08",
                month: "Kas",
              },
            ]}
          />
        </div>
      </section>

      {/* 7. STATISTICS SECTION */}
      <section className="bg-white border-t border-gray-200 py-[34px] md:py-[66px]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-l-[3px] border-[#1d1d1d] pl-6 md:pl-8"
              >
                <p className="text-[40px] md:text-[50px] lg:text-[62px] font-bold text-[#af1d1f] leading-none mb-2">
                  {stat.number}
                </p>
                <p className="text-[16px] md:text-[20px] lg:text-[22px] font-bold text-[#1d1d1d]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PREMIUM QUALITY CTA */}
      <section className="bg-[#f3f3f3] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#1d1d1d] mb-6 leading-tight">
              Premium kalitede cilalar
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#555] leading-relaxed mb-10">
              Menzerna, her uygulama alanı için geniş bir{" "}
              <Link
                href="/urunler"
                className="text-[#af1d1f] font-bold hover:underline"
              >
                ürün yelpazesi
              </Link>{" "}
              sunmaktadır.{" "}
              <Link
                href="/endustriyel"
                className="text-[#af1d1f] font-bold hover:underline"
              >
                Endüstriyel polisaj
              </Link>
              ,{" "}
              <Link
                href="/marin"
                className="text-[#af1d1f] font-bold hover:underline"
              >
                marin bakım
              </Link>{" "}
              ve araç cilalama alanlarında dünya çapında güvenilen
              formülasyonlar.
            </p>

            {/* Contact card */}
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1d1d1d] mb-6">
                Size nasıl yardımcı olabiliriz?
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="/iletisim"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#af1d1f] text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-[#8b1618] transition-colors"
                >
                  İletişim Formu
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+902326835043"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1d1d1d] text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-[#333] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  0232 683 50 43
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
