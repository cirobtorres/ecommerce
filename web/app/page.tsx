"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  BannerCarousel,
  BannerCarouselContent,
  BannerCarouselItem,
} from "@/components/ui/carouselBanner";
import {
  CardCarousel,
  CardCarouselContent,
  CardCarouselItem,
  CardCarouselNext,
  CardCarouselPrevious,
} from "@/components/ui/carouselCard";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Banners />
      <Cards />
    </>
  );
}

const BANNERS_FROM_DB = [
  {
    id: "1",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "a",
  },
  {
    id: "2",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "b",
  },
  {
    id: "3",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "c",
  },
  {
    id: "4",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "d",
  },
  {
    id: "5",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "e",
  },
  {
    id: "6",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "f",
  },
  {
    id: "7",
    href: "/",
    src: "https://placehold.co/1920x1080/jpeg",
    alt: "g",
  },
];

const BannersContent = () => {
  return (
    <>
      {BANNERS_FROM_DB.map((banner) => (
        <BannerCarouselItem key={banner.id} className="pl-1">
          <div
          // className="p-1"
          >
            <Card>
              <CardContent className="h-96 flex items-center justify-center cursor-pointer">
                <Link href={banner.href} className="relative w-full h-full">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    sizes=""
                    className="absolute object-cover"
                  />
                </Link>
              </CardContent>
            </Card>
          </div>
        </BannerCarouselItem>
      ))}
    </>
  );
};

const Banners = () => {
  const plugin = useRef(
    Autoplay({
      delay: 10000,
      stopOnMouseEnter: true,
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
        <BannersContent />
      </BannerCarouselContent>
    </BannerCarousel>
  );
};

const PRODUCTS_FROM_DB = [
  {
    id: "1",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, architecto? Ad unde excepturi possimus illo itaque, sapiente est fugiat ab voluptatibus consequatur earum autem deleniti. Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "2",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, architecto?",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "3",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title: "Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "4",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, architecto?",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "5",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, architecto? Ad unde excepturi possimus illo itaque, sapiente est fugiat ab voluptatibus consequatur earum autem deleniti. Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "6",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, architecto?",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "7",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Ad unde excepturi possimus illo itaque, sapiente est fugiat ab voluptatibus consequatur earum autem deleniti. Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "8",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Sapiente est fugiat ab voluptatibus consequatur earum autem deleniti. Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "9",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title: "Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
  {
    id: "10",
    src: "https://placehold.co/640x640/jpeg",
    alt: "",
    title:
      "Est fugiat ab voluptatibus consequatur earum autem deleniti. Porro quae ipsam magnam! Corporis!",
    fullPrice: "R$ 1.150,00",
    finalPrice: "R$ 900,00",
  },
];

const Cards = () => {
  return (
    <CardCarousel opts={{ loop: true }} className="w-full max-w-7xl">
      <CardCarouselPrevious />
      <CardCarouselContent className="-ml-1">
        {PRODUCTS_FROM_DB.map((product) => (
          <CardCarouselItem
            key={product.id}
            className="px-1 md:basis-1/2 lg:basis-1/5"
          >
            <div className="border border-slate-200 rounded">
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </CardCarouselItem>
        ))}
      </CardCarouselContent>
      <CardCarouselNext />
    </CardCarousel>
  );
};
