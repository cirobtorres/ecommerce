"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { wrap, motion, AnimatePresence, Variants } from "framer-motion";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

type BannerArrayProps = {
  src: string; // 1440px x 384px
  alt: string;
  href: string;
}[];

export default function BannerCarousel({
  bannerArray,
}: {
  bannerArray: BannerArrayProps;
}) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  // newDirection:
  // 1 -> navigate forward
  // -1 -> navigate backward

  const imageIndex = wrap(0, bannerArray.length, page);
  // wrap -> [min, max, value]:
  //    - if value lies within the range, it is returned;
  //    - if value is greater than max, it returns min;
  //    - if value is less than min, it returns max.

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <section className="relative overflow-hidden h-96">
      <NavButton
        icon={MdOutlineArrowBackIos}
        navTo="backward"
        onClick={paginate}
      />
      <SlideShow
        images={bannerArray}
        direction={direction}
        page={page}
        imageIndex={imageIndex}
        paginate={paginate}
      />
      <NavDots
        images={bannerArray}
        imageIndex={imageIndex}
        onClick={paginate}
      />
      <NavButton
        icon={MdOutlineArrowForwardIos}
        onClick={paginate}
        navTo="forward"
      />
    </section>
  );
}

const slideVariants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 2000 : -2000,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 2000 : -2000,
    };
  },
};

type SlideShowProps = {
  images: any;
  page: number;
  imageIndex: number;
  direction: number;
  paginate: (direction: number) => void;
};

const swipeThreshold = 10000; // swipeIntensity must be greater than this value for page transition to occur
const swipeIntensity = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity; // Page will transition only if either velocity is quick enough or offset large enough or both
};

const SlideShow = ({
  images,
  page,
  imageIndex,
  direction,
  paginate,
}: SlideShowProps) => {
  return (
    <Link
      href={images[imageIndex].href}
      draggable={false} // Prevents this link component from being dragged as it was a file which interferes with drag gesture from motion.div
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute max-w-webpage h-full left-0 right-0 mx-auto flex gap-[15%]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipeIntensity(offset.x, velocity.x);

            if (swipe < -swipeThreshold) {
              paginate(1);
            } else if (swipe > swipeThreshold) {
              paginate(-1);
            }
          }}
        >
          <Image
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            draggable={false} // Prevents Banner Carousel Image from being dragged as a file and interfering with drag gesture from motion.div
            className="aspect-video object-cover bg-center"
          />
        </motion.div>
      </AnimatePresence>
    </Link>
  );
};

type NavDotsProps = {
  images: any;
  imageIndex: number;
  onClick: (direction: number) => void;
};

const NavDots = ({ images, imageIndex, onClick }: NavDotsProps) => {
  return (
    <div className="absolute flex h-full top-[90%] left-1/2 -translate-x-1/2 gap-1 z-10">
      {images.map((_: any, index: number) => (
        <div
          key={index}
          className={
            "w-2 h-2 rounded-full bg-theme-01 cursor-pointer overflow-hidden"
          }
          onClick={() => onClick(index - imageIndex)}
        >
          {imageIndex === index && (
            <motion.div className="h-full bg-blue-500" />
          )}
        </div>
      ))}
    </div>
  );
};

const NavButton = ({ icon: Icon, onClick, navTo }: NavButtonProps) => {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white w-16 h-16 flex items-center p-3 rounded-full hover:shadow-carousel-button transition-all duration-300 hover:text-blue-500 ${
        navTo === "forward" ? "-right-8 justify-start" : "-left-8 justify-end"
      }`}
      onClick={() => onClick(navTo === "forward" ? 1 : -1)}
    >
      <Icon />
    </button>
  );
};
