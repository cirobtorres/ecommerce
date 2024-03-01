"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCarousel({
  title,
  linkText,
  cards,
}: {
  title?: string;
  linkText?: string;
  cards: CategoriesProps[];
}) {
  return (
    <section className="relative mx-auto my-8 max-w-product-card-slider min-w-product-card-slider bg-white shadow-generic border border-light-gray rounded-[5px] p-product-card-slider">
      <div className="flex items-center justify-between py-2 px-4 h-16">
        {title && (
          <div className="flex items-center gap-3">
            <h2 className="text-inherit">{title}</h2>
            <Link href="/" className="text-blue-500">
              {linkText}
            </Link>
          </div>
        )}
      </div>
      <div className="relative mx-4 overflow-x-hidden after:h-full after:absolute after:right-0 after:top-0 after:rotate-180 after:bg-category-carousel-gradient after:w-8 after:z-10 before:h-full before:absolute before:left-0 before:top-0 before:bg-category-carousel-gradient before:w-8 before:z-10">
        <div className="flex gap-category-card-slider p-category-card-slider duration-500 scrollbar-none">
          <AnimatedCategories items={cards} />
          <AnimatedCategories items={cards} />
        </div>
      </div>
    </section>
  );
}

const AnimatedCategories = ({ items }: { items: CategoriesProps[] }) => {
  return items.map(({ image: { src, alt }, title }, index) => (
    <motion.div
      key={index}
      animate={{ x: ["0px", `-${164.5 * items.length + 8 * 13}px`] }}
      transition={{
        duration: 40,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0,
      }}
    >
      <Link href="/" className="min-w-category h-category flex flex-col gap-3">
        <div className="relative w-full h-full top-0">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
        <p className="text-center text-sm shadow-generic p-2">{title}</p>
      </Link>
    </motion.div>
  ));
};
