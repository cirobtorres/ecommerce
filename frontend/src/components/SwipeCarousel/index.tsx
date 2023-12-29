"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { featuredProducts } from "@/constants/swipeCarouselConstants";

export default function SwipeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === featuredProducts.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: any) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden">
      <NavButton
        icon={MdOutlineArrowBackIos}
        direction="left"
        handleOnClick={handlePrevious}
      />
      <ImagesComponent
        image={featuredProducts[currentIndex]}
        index={currentIndex}
        direction={direction}
      />
      <NavDots
        images={featuredProducts}
        currentIndex={currentIndex}
        onClick={handleDotClick}
      />
      <NavButton
        icon={MdOutlineArrowForwardIos}
        direction="right"
        handleOnClick={handleNext}
      />
    </div>
  );
}

const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

const ImagesComponent = ({ image, index, direction }: any) => {
  return (
    // <AnimatePresence>
    <motion.div
      key={index}
      variants={slideVariants}
      initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
      animate="visible"
      exit="exit"
      transition={
        direction === "right"
          ? { duration: 0.5, ease: "easeInOut" }
          : { duration: 0.5, ease: "easeInOut" }
      }
      className="relative flex items-center h-96"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="aspect-video object-cover bg-center"
      />
    </motion.div>
    // </AnimatePresence>
  );
};

const NavDots = ({ images, currentIndex, onClick }: any) => {
  return (
    <div className="absolute flex h-full top-[92%] left-1/2 -translate-x-1/2 gap-1">
      {images.map((_: any, index: any) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full bg-theme-01 cursor-pointer ${
            currentIndex === index ? "bg-blue-400" : ""
          }`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

const NavButton = ({ icon: Icon, handleOnClick, direction }: any) => {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white w-16 h-16 flex items-center p-3 rounded-full hover:shadow-carousel-button transition-all duration-300 hover:text-blue-500 ${
        direction === "right" ? "-right-8 justify-start" : "-left-8 justify-end"
      }`}
      onClick={handleOnClick}
    >
      <Icon />
    </button>
  );
};
