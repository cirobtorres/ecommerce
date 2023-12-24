"use client";

import Image from "next/image";
import Link from "next/link";

import { IoHeart, IoCartSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

export default function ProductCard(props: ProductCardProps) {
  return (
    <article
      className={`group h-[var(--product-card-height)] min-w-[280px] overflow-hidden 
		rounded
		border border-theme-02 bg-white duration-700 ease-in-out hover:border-theme-06 hover:shadow-xl`}
    >
      <Link href="/" className={"flex h-full flex-col"}>
        <div className={"p-2"}>
          <div className={"z-10 flex flex-row items-center justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <div
                className={
                  "flex h-12 w-12 items-center justify-center rounded bg-gradient-to-r from-theme-03 to-theme-04 p-1 text-sm font-bold text-white"
                }
              >
                -{props.discountRate.toFixed(0)}%
              </div>
              {props.units > 0 && (
                <div
                  className={
                    "flex h-12 w-12 flex-col items-center justify-center rounded border border-theme-02 p-1 text-xs leading-3"
                  }
                >
                  {props.units > 99 ? (
                    <span>
                      <b>99+</b>
                    </span>
                  ) : (
                    <>
                      <small>Apenas</small>
                      <span>
                        <b>{props.units}</b>
                      </span>
                    </>
                  )}
                  <small>unid</small>
                </div>
              )}
            </div>
            <div className={"flex h-12 w-12 items-center justify-center"}>
              <span>
                <IoHeart size="1.25rem" />
              </span>
            </div>
          </div>
          <div
            className={
              "relative my-2 h-40 max-w-[calc(var(--product-card-max-width)-16px)] overflow-hidden"
            }
          >
            <Image
              src={props.image}
              alt={props.title}
              fill
              sizes="(max-width: 240px)"
              priority
              className={
                "object-cover duration-1000 ease-in-out group-hover:scale-105"
              }
            />
          </div>
          <span className={"flex items-center justify-center text-xs"}>
            <FaRegStar size="1.25rem" /> <FaRegStar size="1.25rem" />{" "}
            <FaRegStar size="1.25rem" /> <FaRegStar size="1.25rem" />{" "}
            <FaRegStar size="1.25rem" /> (46)
          </span>
        </div>
        <div
          className={
            "flex h-full w-full flex-col justify-between px-4 pb-4 text-sm"
          }
        >
          <div className={""}>
            <span className="[display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis">
              {props.title}
            </span>
            <div className={"flex flex-col justify-between"}>
              <span
                className={"text-sm text-theme-03 line-through"}
              >
                R$ {props.fullPrice.toFixed(2)}
              </span>
              <div className={"flex flex-row gap-2"}>
                <span className={"text-xl font-bold"}>
                  R$ {props.discountPrice.toFixed(2)}
                </span>
                <span
                  className={
                    "flex items-center text-sm font-bold uppercase text-green-500"
                  }
                >
                  {props.discountRate}% off
                </span>
              </div>
              <span className={"text-sm text-theme-03"}>
                ou R$ {props.fullPrice.toFixed(2)} em {props.installmentNumber}x
                de R$ {(props.fullPrice / props.installmentNumber).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className={"p-2"}>
          <button
            className={`z-10 flex w-full justify-center rounded bg-gradient-to-r from-theme-03 to-theme-04 p-2 
          text-sm font-bold uppercase text-white duration-300 ease-in-out hover:shadow-bright`}
            onClick={() => console.log("me clicaram")}
          >
            <IoCartSharp size="1.25rem" />{" "}
            {props.units > 0 ? "carrinho" : "esgotado"}
          </button>
        </div>
      </Link>
    </article>
  );
}

/*
Using Image from Next.js:

<div className={`relative h-[something] w-[something] overflow-hidden`}>
  <Image src={image} alt={title} fill className={`object-cover`}  />
</div>
*/
