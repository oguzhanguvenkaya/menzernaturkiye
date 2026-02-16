import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const heroSlides = [
  {
    image: "/images/hero-marine.jpg",
    title: "Marin Polisaj",
    subtitle: "Profesyonel tekne cilaları & bakım",
    link: "/products?category=MARİN",
  },
  {
    image: "/images/hero-car-polishing.png",
    title: "Profesyonel Araç Bakımı",
    subtitle: "Menzerna ile mükemmel parlaklık",
    link: "/products",
  },
  {
    image: "/images/hero-industrial-polishing.png",
    title: "Endüstriyel Çözümler",
    subtitle: "Katı polisaj pastaları & emülsiyonlar",
    link: "/products?category=ENDÜSTRİYEL",
  },
];

const features = [
  {
    icon: "/icons/menzerna/research.svg",
    iconWhite: "/icons/menzerna/research_white.svg",
    title: "Araştırma ve Geliştirme",
    desc: "Uzmanlar, son teknoloji laboratuvarlarda yüksek performanslı formüller geliştirir.",
  },
  {
    icon: "/icons/menzerna/formulas.svg",
    iconWhite: "/icons/menzerna/formulas_white.svg",
    title: "Özel Formüller",
    desc: "Yüzlerce özel geliştirilmiş formülle, her görev ve yüzey için özel ürünler sunuyoruz.",
  },
  {
    icon: "/icons/menzerna/production.svg",
    iconWhite: "/icons/menzerna/production_white.svg",
    title: "Büyük Ölçekli Üretim",
    desc: "Derin süreç mühendisliği bilgisine dayalı, üstün kalite ve dakiklikle karmaşık parti üretimi.",
  },
  {
    icon: "/icons/menzerna/industry.svg",
    iconWhite: "/icons/menzerna/industry_white.svg",
    title: "Endüstri Uzmanlığı",
    desc: "Endüstriyel polisaj söz konusu olduğunda, finisaj kalitesinin yanı sıra maliyet etkinliği de merkezdedir.",
  },
  {
    icon: "/icons/menzerna/automotive.svg",
    iconWhite: "/icons/menzerna/automotive_white.svg",
    title: "Otomotiv Uzmanlığı",
    desc: "Otomobil üreticileri, otomotiv ticareti, detaycılar ve otomobil meraklıları için profesyonel araç cilaları sunuyoruz.",
  },
  {
    icon: "/icons/menzerna/training.svg",
    iconWhite: "/icons/menzerna/training_white.svg",
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
                        className="bg-[#ae1d1e] hover:bg-red-800 text-white rounded-none px-6 md:px-8 h-12 md:h-14 text-base md:text-lg"
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
      <section className="pt-16 md:pt-20 pb-10 md:pb-12 bg-[#f3f3f3]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[780px]">
            <span className="text-[#ae1d1e] font-bold tracking-widest uppercase text-[14px] mb-4 block">
              1888'den Beri
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#1d1d1d] mb-6 leading-[1.2]">
              Profesyonel polisaj bileşikleri ve cilaları
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#555] leading-[1.75] font-normal">
              Menzerna, 1888'den beri endüstri ve zanaat için profesyonel polisaj
              pastalarının geliştirilmesi ve üretiminde standartları
              belirlemektedir. Katı bileşikler, emülsiyonlar, araç cilaları veya
              tekne cilaları – Menzerna her yüzey ve her uygulama için doğru
              cilaya sahiptir. Yenilikçi karışımlarımız ve polisaj
              süreçlerimizle, ilham veren ve etkileyen premium sonuçlar elde
              etmenizi sağlıyoruz. Kapsamlı formülasyon bilgi birikimi ve müşteri
              gereksinimlerinin hassas bir şekilde anlaşılması, Menzerna'yı
              endüstriyel polisaj bileşikleri için bir uzman ve teknoloji lideri
              haline getirmiştir.
            </p>
          </div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="pt-6 md:pt-8 pb-16 md:pb-20 bg-[#f3f3f3]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-14">
            {features.map((f, i) => (
              <div key={i} className="group flex flex-col items-start" data-testid={`feature-card-${i}`}>
                <div className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full border border-neutral-300 flex items-center justify-center mb-5 md:mb-6 transition-colors duration-300 group-hover:bg-[#ae1d1e] group-hover:border-[#ae1d1e]">
                  <img
                    src={f.icon}
                    alt={f.title}
                    className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] block group-hover:hidden"
                  />
                  <img
                    src={f.iconWhite}
                    alt={f.title}
                    className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] hidden group-hover:block"
                  />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#1d1d1d] mb-2 leading-[1.3]">
                  {f.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.7] font-normal">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
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
            <span className="text-[#ae1d1e] font-bold uppercase tracking-widest text-[14px] mb-4 block">
              Hakkımızda
            </span>
            <h2 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-[#1d1d1d] mb-6 leading-[1.2]">
              Menzerna premium markalara parlaklık verir.
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#555] leading-[1.75] mb-4">
              Bir asırlık deneyimle desteklenen Menzerna, 1888'den beri yüksek
              kaliteli katı polisaj pastaları, polisaj emülsiyonları ve araç ve
              tekne cilaları geliştirip üretmektedir.
            </p>
            <p className="text-[16px] md:text-[18px] text-[#555] leading-[1.75] mb-4">
              Mükemmellik tutkusu her Menzerna ürününe dahil edilmiştir, bu da
              nihai kalite ve ekonomik verimliliği garanti eder. 200'den fazla
              yenilikçi formülasyonla tüm endüstriyel polisaj uygulama alanları
              kapsanmaktadır.
            </p>
            <p className="text-[16px] md:text-[18px] text-[#555] leading-[1.75] mb-8">
              Almanya Ötigheim'daki premium polisaj bileşikleri ile bir şube
              ve bayi ağı, dünya çapında endüstriye ve ticarete hizmet
              vermektedir.
            </p>
            <Link href="/about">
              <Button
                size="lg"
                className="bg-[#1d1d1d] hover:bg-neutral-800 text-white rounded-none px-8 h-[48px] text-[16px] w-fit"
                data-testid="link-about-company"
              >
                Şirket Hakkında
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Category Teasers */}
      <section className="pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="group relative h-[300px] md:h-[550px] overflow-hidden border-r border-white">
            <div className="absolute inset-0">
              <img
                src="/images/hero-industrial-polishing.png"
                className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-700" />
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-white/80 font-bold uppercase tracking-widest text-[14px] mb-3 block group-hover:text-neutral-500 transition-colors">
                  Endüstriyel Polisaj
                </span>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-4 text-white group-hover:text-[#1d1d1d] transition-colors leading-[1.3]">
                  Polisajda Mükemmellik
                </h3>
                <p className="text-[15px] md:text-[17px] text-white/80 mb-6 group-hover:text-[#555] transition-colors leading-[1.7]">
                  Menzerna, birçok farklı yüzeyin endüstriyel işlenmesi için
                  polisaj pastaları ve emülsiyonları geliştirir ve üretir.
                </p>
              </div>
              <Link href="/products?category=ENDÜSTRİYEL">
                <Button
                  variant="link"
                  className="text-white hover:text-[#ae1d1e] p-0 text-[16px] font-bold justify-start group-hover:text-[#ae1d1e]"
                  data-testid="link-category-industrial"
                >
                  Bileşikler & Emülsiyonlara Git{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="group relative h-[300px] md:h-[550px] overflow-hidden border-r border-white">
            <div className="absolute inset-0">
              <img
                src="/images/hero-car-polishing.png"
                className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-700" />
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-white/80 font-bold uppercase tracking-widest text-[14px] mb-3 block group-hover:text-neutral-500 transition-colors">
                  Araç Cilası
                </span>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-4 text-white group-hover:text-[#1d1d1d] transition-colors leading-[1.3]">
                  İlham Veren Araç Cilaları
                </h3>
                <p className="text-[15px] md:text-[17px] text-white/80 mb-6 group-hover:text-[#555] transition-colors leading-[1.7]">
                  Yüksek parlaklıkta otomotiv cilası: Menzerna, dört yaygın
                  polisaj aşaması için otomotiv cilaları sunar.
                </p>
              </div>
              <Link href="/products">
                <Button
                  variant="link"
                  className="text-white hover:text-[#ae1d1e] p-0 text-[16px] font-bold justify-start group-hover:text-[#ae1d1e]"
                  data-testid="link-category-car"
                >
                  Araç Bakımına Git <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="group relative h-[300px] md:h-[550px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/images/hero-marine.jpg"
                className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-700" />
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-white/80 font-bold uppercase tracking-widest text-[14px] mb-3 block group-hover:text-neutral-500 transition-colors">
                  Tekne Cilası
                </span>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-4 text-white group-hover:text-[#1d1d1d] transition-colors leading-[1.3]">
                  İlham Veren Tekne Cilaları
                </h3>
                <p className="text-[15px] md:text-[17px] text-white/80 mb-6 group-hover:text-[#555] transition-colors leading-[1.7]">
                  Menzerna, her türlü jel kaplama için profesyonel tekne
                  cilaları sunar: Yüzey hazırlığı, çizik giderme ve mat
                  lekelerin giderilmesi.
                </p>
              </div>
              <Link href="/products?category=MARİN">
                <Button
                  variant="link"
                  className="text-white hover:text-[#ae1d1e] p-0 text-[16px] font-bold justify-start group-hover:text-[#ae1d1e]"
                  data-testid="link-category-marine"
                >
                  Tekne Bakımına Git <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-14 md:py-16 bg-[#f3f3f3]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#ae1d1e] mb-1 leading-[1.1]">
                1888
              </div>
              <div className="text-[16px] md:text-[18px] font-bold text-[#1d1d1d]">
                Kuruluş Yılı
              </div>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#ae1d1e] mb-1 leading-[1.1]">
                150
              </div>
              <div className="text-[16px] md:text-[18px] font-bold text-[#1d1d1d]">
                Formülasyon
              </div>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#ae1d1e] mb-1 leading-[1.1]">
                50
              </div>
              <div className="text-[16px] md:text-[18px] font-bold text-[#1d1d1d]">
                Çalışan
              </div>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4 md:pl-6">
              <div className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#ae1d1e] mb-1 leading-[1.1]">
                70
              </div>
              <div className="text-[16px] md:text-[18px] font-bold text-[#1d1d1d]">
                Ülke
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* News Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mb-8 md:mb-10">
            <span className="text-[#ae1d1e] font-bold uppercase tracking-widest text-[14px] mb-2 block">
              Güncel Kalın
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#1d1d1d] leading-[1.2]">
              Haberlerimiz
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-5 overflow-hidden relative">
                <img
                  src="https://www.menzerna.com/fileadmin/user_upload/1767948586407.png"
                  alt="News 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#ae1d1e] text-white p-2 text-center min-w-[50px]">
                  <span className="block text-[18px] font-bold leading-tight">06</span>
                  <span className="block text-[11px] font-bold uppercase">ŞUB</span>
                </div>
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#1d1d1d] group-hover:text-[#ae1d1e] transition-colors leading-[1.3]">
                Yeni Menzerna kurumsal filmi yayında!
              </h3>
              <span className="text-[#ae1d1e] font-bold text-[14px] flex items-center gap-1">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-5 overflow-hidden relative">
                <img
                  src="https://www.menzerna.com/fileadmin/_processed_/8/5/csm_Screenshot_2025-12-08_132700_3f06b085b9.png"
                  alt="News 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#ae1d1e] text-white p-2 text-center min-w-[50px]">
                  <span className="block text-[18px] font-bold leading-tight">04</span>
                  <span className="block text-[11px] font-bold uppercase">ŞUB</span>
                </div>
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#1d1d1d] group-hover:text-[#ae1d1e] transition-colors leading-[1.3]">
                VDA ve ISO'ya göre Çifte Sertifikasyon!
              </h3>
              <span className="text-[#ae1d1e] font-bold text-[14px] flex items-center gap-1">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-5 overflow-hidden relative">
                <img
                  src="https://www.menzerna.com/fileadmin/user_upload/Academy_1.png"
                  alt="News 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#ae1d1e] text-white p-2 text-center min-w-[50px]">
                  <span className="block text-[18px] font-bold leading-tight">08</span>
                  <span className="block text-[11px] font-bold uppercase">KAS</span>
                </div>
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#1d1d1d] group-hover:text-[#ae1d1e] transition-colors leading-[1.3]">
                Menzerna Saxdor Academy ile işbirliği yapıyor!
              </h3>
              <span className="text-[#ae1d1e] font-bold text-[14px] flex items-center gap-1">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Quality Text + CTA */}
      <section className="py-14 md:py-20 bg-[#f3f3f3]">
        <div className="container mx-auto px-6 md:px-8 max-w-[900px] text-center">
          <h2 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-[#1d1d1d] mb-6 leading-[1.2]">
            Premium kalitede cilalar
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#555] leading-[1.75] mb-10">
            Menzerna, cila ve bileşik üreticileri arasında uzmandır. Mükemmel
            polisaj için her zaman bir adım öteye gideriz. Menzerna, neredeyse
            her yüzey için yüksek kaliteli{" "}
            <Link href="/products" className="text-[#ae1d1e] hover:underline">
              cilalar
            </Link>
            ,{" "}
            <Link
              href="/products?category=ENDÜSTRİYEL"
              className="text-[#ae1d1e] hover:underline"
            >
              polisaj pastaları
            </Link>{" "}
            ve{" "}
            <Link
              href="/products?category=AKSESUAR"
              className="text-[#ae1d1e] hover:underline"
            >
              polisaj aksesuarları
            </Link>{" "}
            sunar. 1888'den beri profesyonel{" "}
            <Link href="/products" className="text-[#ae1d1e] hover:underline">
              araç cilası
            </Link>
            ,{" "}
            <Link
              href="/products?category=MARİN"
              className="text-[#ae1d1e] hover:underline"
            >
              tekne cilası
            </Link>
            ,{" "}
            <Link
              href="/products?category=ENDÜSTRİYEL"
              className="text-[#ae1d1e] hover:underline"
            >
              katı polisaj pastaları
            </Link>{" "}
            ve{" "}
            <Link
              href="/products?category=ENDÜSTRİYEL"
              className="text-[#ae1d1e] hover:underline"
            >
              polisaj emülsiyonları
            </Link>{" "}
            üretmektedir.
          </p>

          <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-[20px] md:text-[24px] font-bold text-[#1d1d1d] mb-2 leading-[1.3]">
                Size nasıl yardımcı olabiliriz?
              </h3>
              <p className="text-[15px] md:text-[17px] text-[#555]">
                Ürünlerimiz ve hizmetlerimiz hakkında herhangi bir sorunuz
                varsa, lütfen bizimle iletişime geçmekten çekinmeyin.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-[220px]">
              <Link href="/contact" className="w-full">
                <Button
                  size="lg"
                  className="bg-[#ae1d1e] hover:bg-red-800 text-white rounded-none h-[48px] px-8 text-[15px] w-full"
                  data-testid="button-contact-form"
                >
                  İletişim Formu
                </Button>
              </Link>
              <a href="tel:+905352517411" className="w-full">
                <Button
                  size="lg"
                  className="bg-[#ae1d1e] hover:bg-red-800 text-white rounded-none h-[48px] px-8 text-[15px] w-full"
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
