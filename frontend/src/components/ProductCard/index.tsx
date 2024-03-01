"use client";

import Image from "next/image";
import Link from "next/link";

import { FaStar } from "react-icons/fa";

export default function ProductCard(props: ProductCardProps) {
  return (
    <article className="h-card max-w-card min-w-card rounded p-product-card bg-white transition duration-200 hover:shadow-generic overflow-hidden group">
      <Link href="/" className="flex h-full flex-col">
        <div className="relative min-h-[calc(var(--product-card-height)/2)] max-w-[calc(var(--product-card-max-width)-16px)] overflow-hidden">
          <Image
            src={props.image}
            alt={props.title}
            fill
            sizes="(max-width: 240px) 100vw, 33vw"
            priority
            className="object-contain duration-1000 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex h-full w-full flex-col text-sm">
          <span className={"flex justify-center text-xs"}>
            <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
            <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
            <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
            <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
            <FaStar size="0.9rem" fill="var(--like-star-color-unchecked)" />{" "}
            (46)
          </span>
          <div className="h-full">
            <span className="[display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis group-hover:text-blue-500">
              {props.title}
            </span>
            <div className={"flex flex-col justify-between"}>
              <span className={"text-sm text-theme-03 line-through"}>
                R$ {props.fullPrice.toFixed(2)}
              </span>
              <div className={"flex flex-row gap-2"}>
                <span className={"text-xl font-bold"}>
                  R$ {props.discountPrice.toFixed(2)}
                </span>
                <span className="flex items-center text-sm font-bold uppercase text-green-500">
                  {props.discountRate}% off
                </span>
              </div>
              <span className="text-xs text-theme-03">
                ou R$ {props.fullPrice.toFixed(2)} em {props.installmentNumber}x
                de R$ {(props.fullPrice / props.installmentNumber).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/*
Using Image from Next.js:

<div className="relative h-[something] w-[something] overflow-hidden">
  <Image src={image} alt={title} fill className="object-cover"  /> 
</div>

Required props: src - width - height - alt

If we do not know image dimensions, we should use fill instead width/height.
For that, the parent element must be assigned position: "relative", "fixed", or "absolute"

object-cover:
  - Fill the container and preserve aspect ratio. The overflow: "hidden" should be assigned to the parent element
object-fit:
  - Fill the container but do not preserve aspect ratio.
  - If the object's aspect ratio does not match the aspect ratio of its box, then the object will be stretched to fit
object-contain: 
  - Fill the entire container but crop it to preserve aspect ratio 
object-scale-down:
  - The content is sized as if none or contain were specified, whichever would result in a smaller concrete object size
object-none: 
  - The replaced content is not resized

*/
