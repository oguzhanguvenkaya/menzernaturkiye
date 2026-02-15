import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const heroSlides = [
  {
    image: "/images/hero-car.png",
    title: "Menzerna Araç Cilaları",
    subtitle: "Premium araç cilaları & aksesuarlar",
    link: "/products",
  },
  {
    image: "/images/hero-industrial.jpg",
    title: "Endüstriyel Polisaj",
    subtitle: "Katı cilalar & polisaj emülsiyonları",
    link: "/products?category=ENDÜSTRİYEL",
  },
  {
    image: "/images/hero-marine.jpg",
    title: "Marin Polisaj",
    subtitle: "Profesyonel tekne cilaları & bakım",
    link: "/products?category=MARİN",
  },
];

const features = [
  {
    icon: "/icons/menzerna/research.svg",
    title: "Araştırma ve Geliştirme",
    desc: "Uzmanlar, son teknoloji laboratuvarlarda yüksek performanslı formüller geliştirir.",
  },
  {
    icon: "/icons/menzerna/formulas.svg",
    title: "Özel Formüller",
    desc: "Yüzlerce özel geliştirilmiş formülle, her görev ve yüzey için özel ürünler sunuyoruz.",
  },
  {
    icon: "/icons/menzerna/production.svg",
    title: "Büyük Ölçekli Üretim",
    desc: "Derin süreç mühendisliği bilgisine dayalı, üstün kalite ve dakiklikle karmaşık parti üretimi.",
  },
  {
    icon: "/icons/menzerna/industry.svg",
    title: "Endüstri Uzmanlığı",
    desc: "Endüstriyel polisaj söz konusu olduğunda, finisaj kalitesinin yanı sıra maliyet etkinliği de merkezdredir.",
  },
  {
    icon: "/icons/menzerna/automotive.svg",
    title: "Otomotiv Uzmanlığı",
    desc: "Otomobil üreticileri, otomotiv ticareti, detaycılar ve otomobil meraklıları için profesyonel araç cilaları sunuyoruz.",
  },
  {
    icon: "/icons/menzerna/training.svg",
    title: "Süreç Geliştirme & Eğitim",
    desc: "Polisaj süreçlerinizi iyileştirmenizde sizi destekliyor ve yoğun polisaj eğitimleri sunuyoruz.",
  },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <>
      {/* Hero Carousel */}
      <section className="relative" data-testid="hero-carousel">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {heroSlides.map((slide, i) => (
              <CarouselItem key={i} className="pl-0 relative">
                <div className="relative h-[60vh] md:h-[80vh] min-h-[400px] md:min-h-[600px]">
                  <div className="absolute inset-0 bg-neutral-900">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 pl-[32px] pr-[32px] ml-[0px] mr-[0px] pt-[60px] pb-[60px] text-center">
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                      {slide.title}
                    </h2>
                    <Link href={slide.link}>
                      <Button
                        size="lg"
                        className="bg-[#e3000f] hover:bg-red-800 text-white rounded-none px-6 md:px-8 h-12 md:h-14 text-base md:text-lg"
                        data-testid={`hero-cta-${i}`}
                      >
                        {slide.subtitle} <ChevronRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-3 h-3 transition-all duration-300 ${
                  current === i
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                data-testid={`hero-dot-${i}`}
              />
            ))}
          </div>
        </Carousel>
      </section>
      {/* Intro Text */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <span className="text-[#e3000f] font-bold tracking-widest uppercase text-sm mb-4 block">
            1888'den Beri
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 md:mb-8 leading-tight">
            Profesyonel polisaj bileşikleri ve cilaları
          </h2>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
            Menzerna, 1888'den beri endüstri ve zanaat için profesyonel polisaj
            pastalarının geliştirilmesi ve üretiminde standartları
            belirlemektedir. Katı bileşikler, emülsiyonlar, araç cilaları veya
            tekne cilaları – Menzerna her yüzey ve her uygulama için doğru
            cilaya sahiptir. Yenilikçi karışımlarımız ve polisaj
            süreçlerimizle, ilham veren ve etkileyen premium sonuçlar elde
            etmenizi sağlıyoruz.
          </p>
        </div>
      </section>
      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 border border-neutral-300">
                  <img
                    src={f.icon}
                    alt={f.title}
                    className="w-10 h-10 md:w-14 md:h-14"
                  />
                </div>
                <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3 leading-tight">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section - Original Style */}
      <section className="bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="/images/factory.jpg"
              alt="Menzerna Fabrika"
              className="w-full h-[300px] md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
            <span className="text-[#e3000f] font-bold uppercase tracking-widest text-sm mb-4 block">
              Hakkımızda
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
              Menzerna premium markalara parlaklık verir.
            </h2>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4">
              Bir asırlık deneyimle desteklenen Menzerna, 1888'den beri yüksek
              kaliteli katı polisaj pastaları, polisaj emülsiyonları ve araç ve
              tekne cilaları geliştirip üretmektedir.
            </p>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4">
              Mükemmellik tutkusu her Menzerna ürününe dahil edilmiştir, bu da
              nihai kalite ve ekonomik verimliliği garanti eder. 200'den fazla
              yenilikçi formülasyonla tüm endüstriyel polisaj uygulama alanları
              kapsanmaktadır.
            </p>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8">
              Almanya Ötigheim'daki premium polisaj bileşikleri ile bir şube
              ve bayi ağı, dünya çapında endüstriye ve ticarete hizmet
              vermektedir.
            </p>
            <Link href="/about">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-none px-8 h-12 md:h-14 text-sm md:text-base w-fit"
                data-testid="link-about-company"
              >
                Şirket Hakkında
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Category Teasers */}
      <section className="pt-16 md:pt-24 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="group relative bg-neutral-100 h-[300px] md:h-[600px] overflow-hidden border-r border-white">
            <div className="absolute inset-0">
              <img
                src="/images/hero-industrial.jpg"
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block group-hover:text-white transition-colors">
                  Endüstriyel Polisaj
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 group-hover:text-white transition-colors">
                  Polisajda Mükemmellik
                </h3>
                <p className="text-sm md:text-base text-neutral-600 mb-6 md:mb-8 group-hover:text-neutral-200 transition-colors">
                  Menzerna, birçok farklı yüzeyin endüstriyel işlenmesi için
                  polisaj pastaları ve emülsiyonları geliştirir ve üretir.
                </p>
              </div>
              <Link href="/products?category=ENDÜSTRİYEL">
                <Button
                  variant="link"
                  className="text-[#e3000f] hover:text-white p-0 text-base md:text-lg font-bold justify-start group-hover:text-white"
                  data-testid="link-category-industrial"
                >
                  Bileşikler & Emülsiyonlara Git{" "}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="group relative bg-neutral-100 h-[300px] md:h-[600px] overflow-hidden border-r border-white">
            <div className="absolute inset-0">
              <img
                src="/images/hero-car.png"
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block group-hover:text-white transition-colors">
                  Araç Cilası
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 group-hover:text-white transition-colors">
                  İlham Veren Araç Cilaları
                </h3>
                <p className="text-sm md:text-base text-neutral-600 mb-6 md:mb-8 group-hover:text-neutral-200 transition-colors">
                  Yüksek parlaklıkta otomotiv cilası: Menzerna, dört yaygın
                  polisaj aşaması için otomotiv cilaları sunar.
                </p>
              </div>
              <Link href="/products">
                <Button
                  variant="link"
                  className="text-[#e3000f] hover:text-white p-0 text-base md:text-lg font-bold justify-start group-hover:text-white"
                  data-testid="link-category-car"
                >
                  Araç Bakımına Git <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="group relative bg-neutral-100 h-[300px] md:h-[600px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/images/hero-marine.jpg"
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block group-hover:text-white transition-colors">
                  Tekne Cilası
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 group-hover:text-white transition-colors">
                  İlham Veren Tekne Cilaları
                </h3>
                <p className="text-sm md:text-base text-neutral-600 mb-6 md:mb-8 group-hover:text-neutral-200 transition-colors">
                  Menzerna, her türlü jel kaplama için profesyonel tekne
                  cilaları sunar: Yüzey hazırlığı, çizik giderme ve mat
                  lekelerin giderilmesi.
                </p>
              </div>
              <Link href="/products?category=MARİN">
                <Button
                  variant="link"
                  className="text-[#e3000f] hover:text-white p-0 text-base md:text-lg font-bold justify-start group-hover:text-white"
                  data-testid="link-category-marine"
                >
                  Tekne Bakımına Git <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Dealer Network */}
      <section className="py-16 md:py-20 bg-[#e0e0e0] mt-[60px] mb-[60px] pt-[60px] pb-[60px]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                Satıcı Ağımız
              </h2>
              <a
                href="https://mgpolishing.com/yetkili-saticilar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e3000f] font-bold text-sm md:text-base flex items-center gap-2 hover:underline"
              >
                Tüm Menzerna bayilerini ve online mağazaları keşfedin
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mb-10 md:mb-12">
            <span className="text-[#e3000f] font-bold uppercase tracking-widest text-sm mb-2 block">
              Güncel Kalın
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Haberlerimiz
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
                <img
                  src="https://www.menzerna.com/fileadmin/user_upload/1767948586407.png"
                  alt="News 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#e3000f] text-white p-2 text-center min-w-[50px]">
                  <span className="block text-lg font-bold leading-tight">06</span>
                  <span className="block text-xs font-bold uppercase">ŞUB</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-[#e3000f] transition-colors">
                Yeni Menzerna kurumsal filmi yayında!
              </h3>
              <span className="text-[#e3000f] font-bold text-sm flex items-center gap-1">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
                <img
                  src="https://www.menzerna.com/fileadmin/_processed_/8/5/csm_Screenshot_2025-12-08_132700_3f06b085b9.png"
                  alt="News 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#e3000f] text-white p-2 text-center min-w-[50px]">
                  <span className="block text-lg font-bold leading-tight">04</span>
                  <span className="block text-xs font-bold uppercase">ŞUB</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-[#e3000f] transition-colors">
                VDA ve ISO'ya göre Çifte Sertifikasyon!
              </h3>
              <span className="text-[#e3000f] font-bold text-sm flex items-center gap-1">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
                <img
                  src="https://www.menzerna.com/fileadmin/user_upload/Academy_1.png"
                  alt="News 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#e3000f] text-white p-2 text-center min-w-[50px]">
                  <span className="block text-lg font-bold leading-tight">08</span>
                  <span className="block text-xs font-bold uppercase">KAS</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-[#e3000f] transition-colors">
                Menzerna Saxdor Academy ile işbirliği yapıyor!
              </h3>
              <span className="text-[#e3000f] font-bold text-sm flex items-center gap-1">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section - Original Style with border-left */}
      <section className="py-16 md:py-20 bg-neutral-100 border-t border-neutral-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e3000f] mb-1">
                1888
              </div>
              <div className="text-sm md:text-base font-bold text-neutral-900">
                Kuruluş Yılı
              </div>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e3000f] mb-1">
                150
              </div>
              <div className="text-sm md:text-base font-bold text-neutral-900">
                Formülasyon
              </div>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e3000f] mb-1">
                50
              </div>
              <div className="text-sm md:text-base font-bold text-neutral-900">
                Çalışan
              </div>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e3000f] mb-1">
                70
              </div>
              <div className="text-sm md:text-base font-bold text-neutral-900">
                Ülke
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Quality Text + CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
            Premium kalitede cilalar
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-10">
            Menzerna, cila ve bileşik üreticileri arasında uzmandır. Mükemmel
            polisaj için her zaman bir adım öteye gideriz. Menzerna, neredeyse
            her yüzey için yüksek kaliteli{" "}
            <Link href="/products" className="text-[#e3000f] hover:underline">
              cilalar
            </Link>
            ,{" "}
            <Link
              href="/products?category=ENDÜSTRİYEL"
              className="text-[#e3000f] hover:underline"
            >
              polisaj pastaları
            </Link>{" "}
            ve{" "}
            <Link
              href="/products?category=AKSESUAR"
              className="text-[#e3000f] hover:underline"
            >
              polisaj aksesuarları
            </Link>{" "}
            sunar. 1888'den beri profesyonel{" "}
            <Link href="/products" className="text-[#e3000f] hover:underline">
              araç cilası
            </Link>
            ,{" "}
            <Link
              href="/products?category=MARİN"
              className="text-[#e3000f] hover:underline"
            >
              tekne cilası
            </Link>
            ,{" "}
            <Link
              href="/products?category=ENDÜSTRİYEL"
              className="text-[#e3000f] hover:underline"
            >
              katı polisaj pastaları
            </Link>{" "}
            ve{" "}
            <Link
              href="/products?category=ENDÜSTRİYEL"
              className="text-[#e3000f] hover:underline"
            >
              polisaj emülsiyonları
            </Link>{" "}
            üretmektedir.
          </p>

          <div className="bg-neutral-50 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">
                Size nasıl yardımcı olabiliriz?
              </h3>
              <p className="text-sm md:text-base text-neutral-500">
                Ürünlerimiz ve hizmetlerimiz hakkında herhangi bir sorunuz
                varsa, lütfen bizimle iletişime geçmekten çekinmeyin.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#e3000f] hover:bg-red-800 text-white rounded-none h-12 px-8 text-sm md:text-base w-full md:w-auto"
                  data-testid="button-contact-form"
                >
                  İletişim Formu
                </Button>
              </Link>
              <a href="tel:+905352517411">
                <Button
                  size="lg"
                  className="bg-[#e3000f] hover:bg-red-800 text-white rounded-none h-12 px-8 text-sm md:text-base w-full md:w-auto"
                >
                  +90 (535) 251 74 11
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
