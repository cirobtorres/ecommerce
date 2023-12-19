"use client";

import { Carousel } from "flowbite-react";

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
];

export default function CarouselComponent() {
  return (
    <div className="h-56 rounded-none sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={6000} pauseOnHover>
        {featuredProducts.map((item, index) => (
          <img key={index} src={item.src} alt={item.alt} />
        ))}
      </Carousel>
    </div>
  );
}
