'use client';

import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props: ProductCardProps) {
  return (
    <article className={`border border-slate-300 rounded h-[var(--product-card-height)] max-w-[var(--product-card-max-width)] 
    min-w-[var(--product-card-min-width)] bg-white overflow-hidden duration-700 ease-in-out hover:shadow-xl hover:border-slate-500 group`}>
      <Link href="/" className={`h-full flex flex-col`}>
        <div className={`p-2`}>
          <div className={`z-10 flex flex-row items-center justify-between`}>
            <div className={`flex flex-row gap-1`}>
              <div className={`flex justify-center items-center w-12 h-12 text-sm text-white bg-gradient-to-r from-slate-400 to-slate-500 rounded p-1 font-bold`}>-12%</div>
              {props.units > 0 && (
                <div className={`flex flex-col justify-center items-center w-12 h-12 text-xs rounded p-1 leading-3 border border-slate-300`}>
                  {props.units > 99 ? (
                    <span><b>99+</b></span>
                  ) : (
                    <>
                      <small>Apenas</small>
                      <span><b>{props.units}</b></span>
                    </>
                  )}
                  <small>unid</small>
                </div>
              )}
            </div>
            <div className={`flex justify-center items-center w-12 h-12`}>
              <span>Like</span>
            </div>
          </div>
          <div className={`relative my-2 h-40 max-w-[var(--product-card-max-width)] overflow-hidden`}>
            <Image src={props.image} alt={props.title} fill className={`object-cover duration-1000 ease-in-out group-hover:scale-105`} />
          </div>
          <span className={`flex justify-center items-center text-xs`}>x x x x x (46)</span>
        </div>
        <div className={`flex flex-col justify-between h-full w-full px-4 pb-4`}>
          <div>
            <span>{props.title}</span>
            <div className={`flex flex-col justify-between`}>
              <span className={`text-sm line-through text-slate-400`}>R$ {props.fullPrice.toFixed(2)}</span>
              <div className={`flex flex-row gap-2`}>
                <span className={`text-xl font-bold`}>R$ {props.discountPrice.toFixed(2)}</span>
                <span className={`flex items-center uppercase font-bold text-sm text-green-500`}>{props.discountRate}% off</span>
              </div>
              <span className={`text-sm text-slate-400`}>ou R$ {props.fullPrice.toFixed(2)} em {props.installmentNumber}x de R$ {props.installmentValue.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className={`p-2`}>
          <button className={`z-10 flex justify-center w-full rounded p-2 uppercase font-bold text-sm 
          text-white bg-gradient-to-r from-slate-400 to-slate-500 duration-300 ease-in-out hover:shadow-bright`} onClick={() => console.log('me clicaram')}>
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