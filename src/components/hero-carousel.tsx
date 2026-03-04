"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/images/hero-car-polishing.png",
    title: "Profesyonel Araç Bakımı",
    subtitle: "Araç cilaları ve koruma ürünleri",
    buttonText: "Ürünleri Keşfet",
    href: "/urunler",
    darkText: false,
  },
  {
    image: "/images/hero-industrial.png",
    title: "Endüstriyel Polisaj",
    subtitle: "Yüksek performanslı endüstriyel çözümler",
    buttonText: "Endüstriyel Çözümler",
    href: "/endustriyel",
    darkText: true,
  },
  {
    image: "/images/hero-marine.png",
    title: "Marin Polisaj",
    subtitle: "Tekne ve yat bakım ürünleri",
    buttonText: "Marin Ürünleri",
    href: "/marin",
    darkText: false,
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[calc(100vh-126px)] min-h-[500px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay — lighter for dark-text slides */}
          <div className={`absolute inset-0 ${slide.darkText ? "bg-gradient-to-t from-white/50 via-transparent to-transparent" : "bg-gradient-to-t from-black/70 via-black/30 to-transparent"}`} />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-32 px-4 text-center">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${slide.darkText ? "text-[#1d1d1d]" : "text-white"}`}>
              {slide.title}
            </h1>
            <p className={`text-base md:text-lg mb-8 ${slide.darkText ? "text-[#1d1d1d]/70" : "text-white/80"}`}>
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c62828] to-[#af1d1f] text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:from-[#af1d1f] hover:to-[#8b1618] transition-all"
            >
              {slide.buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Slayt ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
