"use client";

import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  BannerCarousel,
  BannerCarouselContent,
  BannerCarouselItem,
} from "@/app/ui/BannerCarousel";
import {
  CardCarousel,
  CardCarouselContent,
  CardCarouselItem,
  CardCarouselNext,
  CardCarouselPrevious,
} from "@/app/ui/carouselCard";
import {
  CategoriesCarousel,
  CategoriesCarouselContent,
  CategoriesCarouselItem,
} from "./ui/carouselCategories";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BANNERS_FROM_DB,
  CATEGORIES,
  PRODUCTS,
  PRODUCTS_FROM_DB,
} from "./lib/placeholders";
import ProductCarousel from "./ui/ProductCarousel";

export default function Home() {
  return (
    <>
      <Banners />
      <Cards />
      <Categories />
      <Products />
    </>
  );
}

const Banners = () => {
  const plugin = useRef(
    Autoplay({
      playOnInit: true,
      delay: 10000,
      // stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  );

  return (
    <BannerCarousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      dotButtons
      className="w-full max-w-7xl"
    >
      <BannerCarouselContent className="-ml-1">
        {BANNERS_FROM_DB.map((banner) => (
          <BannerCarouselItem key={banner.id} className="pl-1">
            <div className="h-96 flex items-center justify-center cursor-pointer">
              <Link href={banner.href} className="relative w-full h-full">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  sizes=""
                  className="absolute object-cover"
                />
              </Link>
            </div>
          </BannerCarouselItem>
        ))}
      </BannerCarouselContent>
    </BannerCarousel>
  );
};

const Cards = () => {
  return (
    <CardCarousel opts={{ loop: true }} className="w-full max-w-7xl mt-4">
      <CardCarouselPrevious />
      <CardCarouselContent className="-ml-1">
        {PRODUCTS_FROM_DB.map((product) => (
          <CardCarouselItem
            key={product.id}
            className="px-1 md:basis-1/2 lg:basis-1/5"
          >
            <div className="border border-slate-200 rounded">
              <div>
                <Link
                  href="/"
                  className={`
                      p-2 h-[450px] 
                      flex flex-col gap-2 
                      items-center  
                    `}
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={product.src}
                      alt={product.alt}
                      fill
                      sizes=""
                      className="absolute object-cover"
                    />
                  </div>
                  <span className="text-start w-full text-sm font-semibold line-clamp-3">
                    {product.title}
                  </span>
                  <span className="text-start text-xs line-through w-full">
                    {product.fullPrice}
                  </span>
                  <span className="text-start text-base font-extrabold w-full">
                    {product.finalPrice}
                  </span>
                  <button className="mb-0 mt-auto w-full py-2 bg-blue-500 text-white rounded">
                    Comprar
                  </button>
                </Link>
              </div>
            </div>
          </CardCarouselItem>
        ))}
      </CardCarouselContent>
      <CardCarouselNext />
    </CardCarousel>
  );
};

// https://www.embla-carousel.com/plugins/auto-scroll/
// https://codesandbox.io/p/sandbox/qxhgws?file=%2Fsrc%2Fjs%2FEmblaCarousel.tsx%3A40%2C20
const Categories = () => {
  const plugin = useRef(
    AutoScroll({
      speed: 1,
      playOnInit: true,
    })
  );

  return (
    <CategoriesCarousel
      opts={{ loop: true, watchDrag: false }}
      plugins={[plugin.current]}
      className="my-4"
    >
      <CategoriesCarouselContent className="w-full max-w-7xl">
        {CATEGORIES.map((category) => (
          <CategoriesCarouselItem key={category.id}>
            <Link href={category.href}>
              <div className="relative size-48">
                <Image
                  src={category.src}
                  alt={category.alt}
                  fill
                  sizes=""
                  className="absolute object-cover"
                />
              </div>
            </Link>
          </CategoriesCarouselItem>
        ))}
      </CategoriesCarouselContent>
    </CategoriesCarousel>
  );
};

const Products = () => {
  return <ProductCarousel slides={PRODUCTS} />;
};
