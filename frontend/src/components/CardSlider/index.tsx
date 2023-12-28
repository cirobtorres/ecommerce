"use client";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import Link from "next/link";

export default function CardSlider({
  title,
  cards,
}: {
  title?: string;
  cards: ProductCardProps[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === cards.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: any) => {
    setCurrentIndex(index);
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
    },
    hiddenLeft: {
      x: "-100%",
    },
    visible: {
      transition: {},
    },
    exit: {
      transition: {},
    },
  };

  return (
    <section className="mx-auto my-3 max-w-product-card-slider min-w-product-card-slider bg-white rounded-[5px] p-product-card-slider">
      <div className="relative flex items-center justify-between py-2 px-4 h-16">
        {title && (
          <div className="flex items-center gap-3">
            <h2 className="text-inherit">{title}</h2>
            <Link href="/" className="text-blue-500">
              Mostrar todas as ofertas
            </Link>
          </div>
        )}
        <div className="absolute right-4 h-full -top-1 translate-y-1/2 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-theme-01" />
          <div className="w-2 h-2 rounded-full bg-theme-01" />
          <div className="w-2 h-2 rounded-full bg-theme-01" />
        </div>
      </div>
      <div className="relative">
        <button className="absolute -left-9 right-auto top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-theme-01 bg-white text-2xl hover:shadow-carousel-button transition-all duration-300">
          <MdOutlineArrowBackIos />
        </button>
        <div className="overflow-x-hidden p-product-card-slider">
          <div className="flex gap-product-card-slider duration-500 scrollbar-none">
            {cards.map((card, index) => (
              <ProductCard key={index} {...card} />
            ))}
          </div>
        </div>
        <button className="absolute -right-9 left-auto top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-theme-01 bg-white text-2xl hover:shadow-carousel-button transition-all duration-300">
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </section>
  );
}
