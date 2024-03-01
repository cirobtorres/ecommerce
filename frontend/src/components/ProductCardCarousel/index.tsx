"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { AnimatePresence, motion, wrap } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function ProductCardCarousel({
  title,
  linkText,
  cards,
}: {
  title?: string;
  linkText?: string;
  cards: ProductCardProps[][]; // 2D array
}) {
  const [[page, direction], setPage] = useState([0, 0]);

  // newDirection:
  // 1 -> navigate forward
  // -1 -> navigate backward
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // wrap -> [min, max, value]:
  //    - if value lies within the range, it is returned;
  //    - if value is greater than max, it returns min;
  //    - if value is less than min, it returns max.
  const cardIndex = wrap(0, cards.length, page);

  const slideVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
      };
    },
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
      };
    },
  };

  return (
    <section className="relative mx-auto my-8 max-w-product-card-slider min-w-product-card-slider bg-white shadow-generic border border-light-gray rounded-[5px] p-product-card-slider">
      <div className="relative flex items-center justify-between py-2 px-4 h-16">
        {title && (
          <div className="flex items-center gap-3">
            <h2 className="text-inherit">{title}</h2>
            <Link href="/" className="text-blue-500">
              {linkText}
            </Link>
          </div>
        )}
        <NavDots cards={cards} cardIndex={cardIndex} onClick={paginate} />
      </div>
      <div>
        <NavButton
          icon={MdOutlineArrowBackIos}
          onClick={paginate}
          navTo="backward"
        />
        <div className="relative w-full overflow-x-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              variants={slideVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="overflow-x-hidden p-product-card-slider"
            >
              <div className="flex gap-product-card-slider duration-500 scrollbar-none">
                {cards[cardIndex].map((card, index) => (
                  <ProductCard key={index} {...card} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <NavButton
          icon={MdOutlineArrowForwardIos}
          onClick={paginate}
          navTo="forward"
        />
      </div>
    </section>
  );
}

type NavDotsProps = {
  cards: ProductCardProps[][];
  cardIndex: number;
  onClick: (newDirection: number) => void;
};

const NavDots = ({ cards, cardIndex, onClick }: NavDotsProps) => {
  return (
    <div className="absolute right-4 h-full -top-1 translate-y-1/2 flex gap-1">
      {cards.map((_, index) => (
        <div
          key={index}
          className="w-2 h-2 rounded-full bg-theme-01 overflow-hidden" // cursor-pointer
          // onClick={() => onClick(index - cardIndex)}
        >
          {cardIndex === index && <motion.div className="h-full bg-blue-500" />}
        </div>
      ))}
    </div>
  );
};

const NavButton = ({ icon: Icon, onClick, navTo }: NavButtonProps) => {
  return (
    <button
      className={`absolute ${
        navTo === "forward" ? "-right-8" : "-left-8"
      } top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-theme-01 bg-white text-2xl hover:shadow-carousel-button transition-all duration-300 hover:text-blue-500`}
      onClick={() => onClick(navTo === "forward" ? 1 : -1)}
    >
      <Icon />
    </button>
  );
};
