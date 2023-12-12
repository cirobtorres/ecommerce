"use client";

import Image from "next/image";
import Link from "next/link";

import { heart, shoppingCart, star } from "@/icons";
import styles from "./styles.module.css";

export default function ProductCard(props: ProductCardProps) {
	return (
		<article className={`border border-theme-02-light-gray rounded h-[var(--product-card-height)] max-w-[var(--product-card-max-width)] 
    min-w-[var(--product-card-min-width)] bg-white overflow-hidden duration-700 ease-in-out hover:shadow-xl hover:border-theme-04-medium-gray group`}>
			<Link href="/" className={"h-full flex flex-col"}>
				<div className={"p-2"}>
					<div className={"z-10 flex flex-row items-center justify-between"}>
						<div className={"flex flex-row gap-1"}>
							<div className={"flex justify-center items-center w-12 h-12 text-sm text-white bg-gradient-to-r from-theme-03-medium-gray to-theme-04-medium-gray rounded p-1 font-bold"}>-{props.discountRate.toFixed(0)}%</div>
							{props.units > 0 && (
								<div className={"flex flex-col justify-center items-center w-12 h-12 text-xs rounded p-1 leading-3 border border-theme-02-light-gray"}>
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
						<div className={"flex justify-center items-center w-12 h-12"}>
							<span>{heart(20, 20)}</span>
						</div>
					</div>
					<div className={"relative my-2 h-40 max-w-[calc(var(--product-card-max-width)-16px)] overflow-hidden"}>
						{/* <Image src={props.image} alt={props.title} fill sizes='100%' priority className={"object-cover duration-1000 ease-in-out group-hover:scale-105"} /> */}
						<img src={props.image} alt={props.title} sizes='100%' className={"object-cover duration-1000 ease-in-out group-hover:scale-105"} />
					</div>
					<span className={"flex justify-center items-center text-xs"}>{star(20, 20)} {star(20, 20)} {star(20, 20)} {star(20, 20)} {star(20, 20)} (46)</span>
				</div>
				<div className={"flex flex-col justify-between h-full w-full text-sm px-4 pb-4"}>
					<div className={""}>
						<span className={`${styles.ellipsisClass}`}>{props.title}</span>
						<div className={"flex flex-col justify-between"}>
							<span className={"text-sm line-through text-theme-03-medium-gray"}>R$ {props.fullPrice.toFixed(2)}</span>
							<div className={"flex flex-row gap-2"}>
								<span className={"text-xl font-bold"}>R$ {props.discountPrice.toFixed(2)}</span>
								<span className={"flex items-center uppercase font-bold text-sm text-green-500"}>{props.discountRate}% off</span>
							</div>
							<span className={"text-sm text-theme-03-medium-gray"}>ou R$ {props.fullPrice.toFixed(2)} em {props.installmentNumber}x de R$ {(props.fullPrice / props.installmentNumber).toFixed(2)}</span>
						</div>
					</div>
				</div>
				<div className={"p-2"}>
					<button className={`z-10 flex justify-center w-full rounded p-2 uppercase font-bold text-sm 
          text-white bg-gradient-to-r from-theme-03-medium-gray to-theme-04-medium-gray duration-300 ease-in-out hover:shadow-bright`} onClick={() => console.log("me clicaram")}>
						{shoppingCart(20, 20)} {props.units > 0 ? "carrinho" : "esgotado"}
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