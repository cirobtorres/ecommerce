import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type Slide = { id: string; src: string; href: string; alt: string };

type CarouselProps = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

type ThumpProps = {
  selected: boolean;
  slide: Slide;
  onClick: () => void;
};

const ProductCarousel: React.FC<CarouselProps> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="max-w-2xl m-auto [--slide-height:28rem] [--slide-spacing:1rem] [--slide-size:100%]">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)*-1)]">
          {slides.map((slide) => (
            <div
              className="min-w-0 flex-[0_0_var(--slide-size)] pl-[var(--slide-spacing)] [transform:translate3d(0,0,0)]"
              key={slide.id}
            >
              <div className="relative flex justify-center items-center h-[var(--slide-height)] min-w-[25rem] select-none overflow-hidden shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="absolute object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <Thumb
              key={slide.id}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              slide={slide}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Thumb: React.FC<ThumpProps> = (props) => {
  const { selected, slide, onClick } = props;

  return (
    <div
      className={`aspect-square flex-[0_0_22%] md:flex-[0_0_12%] size-20 min-w-0 pl-[var(--thumbs-slide-spacing)] border-[3px] ${
        selected ? "border border-blue-500" : "border-transparent"
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className="relative w-full h-full flex-[0_0_100%] flex justify-center items-center border-0 p-0 m-0 cursor-pointer appearance-none [-webkit-appearance:none] touch-manipulation bg-transparent"
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(max-width: 100vw), (max-width: 50vw), 33vw"
          className="absolute object-cover"
        />
      </button>
    </div>
  );
};

export default ProductCarousel;
