"use client";

import * as React from "react";
import CarouselContext from "../../contexts/carouselBanner";
import useEmblaCarousel from "embla-carousel-react";
// import { FaPause } from "react-icons/fa";
// import { FaPlay } from "react-icons/fa";
import { cn } from "@/app/lib/utils";
import { CarouselApi, CarouselProps, DotButn } from "../../types/carousel";
import {
  useAutoplay,
  useAutoplayProgress,
  useCarousel,
  useDotButton,
  usePrevNextButtons,
} from "../../hooks/carouselBanner";
import { DotButton, NextButton, PrevButton } from "./Buttons";

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & DotButn & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      dotButtons = false,
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const {
      selectedIndex,
      scrollSnaps,
      // onDotButtonClick
    } = useDotButton(emblaApi);
    const progressNode = React.useRef<HTMLDivElement>(null);
    const {
      // autoplayIsPlaying,
      // toggleAutoplay,
      onAutoplayButtonClick,
    } = useAutoplay(emblaApi);
    const { showAutoplayProgress } = useAutoplayProgress(
      emblaApi,
      progressNode
    );
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
      emblaApi?.scrollNext();
    }, [emblaApi]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!emblaApi || !setApi) {
        return;
      }

      setApi(emblaApi);
    }, [emblaApi, setApi]);

    React.useEffect(() => {
      if (!emblaApi) {
        return;
      }

      onSelect(emblaApi);
      emblaApi.on("reInit", onSelect);
      emblaApi.on("select", onSelect);

      return () => {
        emblaApi?.off("select", onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          emblaApi: emblaApi,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
          {children}
        </div>
        <div className="relative flex justify-center items-center my-2">
          <div className="relative w-24 h-2 justify-self-end self-center overflow-hidden bg-slate-200 rounded-full">
            <div
              className={`absolute w-full top-0 bottom-0 -left-full bg-blue-500 rounded-full animate-progressBar ${
                showAutoplayProgress ? "" : "pause-animation"
              }`}
              ref={progressNode}
            />
          </div>
          {/* <button
            className="absolute left-[calc(100%_+_4px)] top-1/2 -translate-y-1/2"
            onClick={toggleAutoplay}
            type="button"
          >
            {autoplayIsPlaying ? (
              <FaPause className="fill-blue-500 hover:fill-blue-400" />
            ) : (
              <FaPlay className="fill-blue-500 hover:fill-blue-400" />
            )}
          </button> */}
        </div>
        {dotButtons ? (
          <div className="flex gap-1 my-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                // onClick={() => onDotButtonClick(index)}
                className={`
                size-2 rounded-full transition-colors duration-300 cursor-auto
                ${index === selectedIndex ? " bg-blue-500" : " bg-slate-200"}
              `}
              />
            ))}
          </div>
        ) : null}
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export {
  type CarouselApi,
  Carousel as BannerCarousel,
  CarouselContent as BannerCarouselContent,
  CarouselItem as BannerCarouselItem,
};
