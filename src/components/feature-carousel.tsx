"use client";

import { useState, useRef } from "react";

interface FeatureCard {
  icon: string;
  iconWhite: string;
  title: string;
  desc: string;
}

export function FeatureCarousel({ cards }: { cards: FeatureCard[] }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && active < cards.length - 1) setActive(active + 1);
      if (diff < 0 && active > 0) setActive(active - 1);
    }
  };

  const Card = ({ card }: { card: FeatureCard }) => (
    <div className="group">
      <div className="w-[81px] h-[81px] rounded-full bg-[#f5f5f5] border-2 border-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#af1d1f] shadow-[3px_3px_5px_rgba(228,228,228,0.56)] group-hover:shadow-[3px_-3px_5px_rgba(175,29,31,0.2)]">
        <img
          src={card.icon}
          alt=""
          className="w-[45px] h-[45px] block group-hover:hidden"
        />
        <img
          src={card.iconWhite}
          alt=""
          className="w-[45px] h-[45px] hidden group-hover:block"
        />
      </div>
      <h3 className="text-[22px] leading-[29px] xl:text-[24px] xl:leading-[32px] font-bold text-[#1d1d1d] mb-4">
        {card.title}
      </h3>
      <p className="text-[16px] leading-[24px] md:text-[19px] md:leading-[27px] xl:text-[20px] xl:leading-[28px] text-[#1d1d1d]">
        {card.desc}
      </p>
    </div>
  );

  return (
    <>
      {/* Mobile: Carousel */}
      <div className="sm:hidden mt-12">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {cards.map((card) => (
              <div key={card.title} className="w-full shrink-0 px-1">
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
        {/* Dot navigator */}
        <div className="flex justify-center gap-2 mt-8">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Özellik ${i + 1}`}
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
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 md:gap-y-12 mt-12 md:mt-16">
        {cards.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </>
  );
}
