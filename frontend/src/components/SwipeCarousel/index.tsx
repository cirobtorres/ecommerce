"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const featuredProducts = [
  {
    src: "/images/featured-product-placeholder-2560x1440.png",
    alt: "Carousel title 1",
  },
  {
    src: "/images/featured-product-placeholder-2560x1440.png",
    alt: "Carousel title 2",
  },
  { 
    src: "/images/featured-product-placeholder-2560x1440.png",
    alt: "Carousel title 3",
  },
  {
    src: "/images/featured-product-placeholder-2560x1440.png",
    alt: "Carousel title 4",
  },
  {
    src: "/images/featured-product-placeholder-2560x1440.png",
    alt: "Carousel title 5",
  },
];

export default function SwipeCarousel() {
  return (
    <div className="relative flex h-72">
      <Images />
    </div>
  );
}

const Images = () => {
  return (
    <>
      {featuredProducts.map((item, index) => (
        <motion.div drag="x" key={index} className="flex items-center cursor-grab active:cursor-pointer">
          <Image src={item.src} alt={item.alt} fill className="aspect-video object-cover bg-center" />
        </motion.div>
      ))}
    </>
  )
}