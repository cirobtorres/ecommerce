"use client";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { iMaTemporary } from "./data"; // TODO: delete me when I'm done

export default function CardSlider() {
  const [cards, setCards] = useState(iMaTemporary);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 280;
  const maxScroll = -((cards.length - 5) * cardWidth + 50);
  const newPositivePosition = scrollPosition + cardWidth * 5 + 50;
  const newNegativePosition = scrollPosition - cardWidth * 5 - 50;

  const handleLeftButton = () => {
    setScrollPosition(newPositivePosition > 0 ? 0 : newPositivePosition);
  };

  const handleRightButton = () => {
    setScrollPosition(
      newNegativePosition < maxScroll - 100 ? maxScroll : newNegativePosition
    );
  };

  return (
    <section className="max-w-webpage">
      <div className="my-8 rounded px-6 py-4">
        <h2 className="text-inherit">Ofertas</h2>
      </div>
      <div className="relative">
        {newPositivePosition > 0 ? null : (
          <button
            onClick={handleLeftButton}
            className="absolute -left-9 right-auto top-1/2 z-10 
							flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border 
							border-theme-01 bg-white text-2xl hover:shadow-xl"
          >
            <MdOutlineArrowBackIos />
          </button>
        )}
        <div className="overflow-hidden">
          <div
            style={{ transform: `translateX(${scrollPosition}px)` }}
            className="flex gap-product-card-slider duration-500 scrollbar-none">
            {cards.map((card, index) => (
              <ProductCard key={index} {...card} />
            ))}
          </div>
        </div>
        {newNegativePosition < maxScroll - 100 ? null : (
          <button
            onClick={handleRightButton}
            className="absolute -right-9 left-auto top-1/2 z-10
							flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full
							border border-theme-01 bg-white text-2xl hover:shadow-xl"
          >
            <MdOutlineArrowForwardIos />
          </button>
        )}
      </div>
    </section>
  );
}
