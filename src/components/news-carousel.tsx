"use client";

import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface NewsItem {
  image: string;
  title: string;
  day: string;
  month: string;
}

export function NewsCarousel({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && active < items.length - 1) setActive(active + 1);
      if (diff < 0 && active > 0) setActive(active - 1);
    }
  };

  const Card = ({ news }: { news: NewsItem }) => (
    <div className="group">
      <div className="relative overflow-hidden mb-4">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-0 left-0 bg-[#af1d1f] text-white text-center px-3 py-2 leading-tight">
          <span className="block text-[20px] font-bold">{news.day}</span>
          <span className="block text-[13px] font-bold uppercase">{news.month}</span>
        </div>
      </div>
      <h3 className="text-[19px] md:text-[22px] font-bold text-[#1d1d1d] mb-3 leading-[1.3]">
        {news.title}
      </h3>
      <span className="inline-flex items-center text-[#1d1d1d] text-[16px] font-bold group-hover:text-[#af1d1f] transition-colors">
        Devamını Oku
        <ArrowRight className="ml-2 w-5 h-5" />
      </span>
    </div>
  );

  return (
    <>
      {/* Mobile: Carousel */}
      <div className="sm:hidden">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {items.map((news) => (
              <div key={news.title} className="w-full shrink-0 px-1">
                <Card news={news} />
              </div>
            ))}
          </div>
        </div>
        {/* Dot navigator */}
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Haber ${i + 1}`}
              className={`rounded-full transition-all ${
                i === active
                  ? "w-3 h-3 bg-[#af1d1f]"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tablet+: Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((news) => (
          <Card key={news.title} news={news} />
        ))}
      </div>
    </>
  );
}
