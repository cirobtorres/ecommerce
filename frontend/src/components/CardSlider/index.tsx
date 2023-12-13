"use client";

import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import ProductCard from "../ProductCard";
import { useState } from "react";
import { iMaTemporary } from "./data"; // TODO: delete me when I'm done

export default function CardSlider() {

	const [cards, setCards] = useState(iMaTemporary);
	const [scrollPosition, setScrollPosition] = useState(0);
	const cardWidth = 280;
	const maxScroll = -((cards.length - 5) * cardWidth + 50);
	const newPositivePosition = scrollPosition + cardWidth * 5 + 50;
	const newNegativePosition = scrollPosition - cardWidth * 5 - 50;

	const handleLeftButton = () => {
		setScrollPosition(newPositivePosition > 0 ? 0 : newPositivePosition);
	};

	const handleRightButton = () => {
		setScrollPosition(newNegativePosition < (maxScroll - 100) ? maxScroll : newNegativePosition);
	};
	
	return (
		<section className="max-w-[var(--page-max-width)]">
			<div className={`
				my-8 py-4 px-6 rounded
				bg-theme-02-light-gray dark:bg-theme-07-dark-blue 
				text-theme-04-medium-gray dark:text-theme-01-light-gray
			`}>
				<h2 className="text-inherit">Ofertas</h2>
			</div>
			<div className="relative">
				{newPositivePosition > 0 ? null : (
					<button
						onClick={handleLeftButton} 
						className={`
							absolute top-1/2 -left-9 right-auto -translate-y-1/2 bg-white text-2xl 
							flex justify-center items-center w-16 h-16 rounded-full border border-theme-01-light-gray z-10 hover:shadow-xl
						`}>
						<MdOutlineArrowBackIos />
					</button>
				)}
				<div className="overflow-hidden">
					<div 
						style={{ transform: `translateX(${scrollPosition}px)` }} 
						className={`
							[transform:translateX(${scrollPosition}px)] 
							flex gap-[var(--grid-product-card-gap)] 
							scrollbar-none duration-500
						`}>
						{
							cards.map((card, index) => (
								<ProductCard key={index} {...card} />
							))
						}
					</div>
				</div>
				{newNegativePosition < (maxScroll - 100) ? null : (
					<button 
						onClick={handleRightButton}
						className={`
							absolute top-1/2 left-auto -right-9 -translate-y-1/2
							flex justify-center items-center w-16 h-16 text-2xl bg-white
							rounded-full border border-theme-01-light-gray z-10 hover:shadow-xl
						`}>
						<MdOutlineArrowForwardIos />
					</button>
				)}
			</div>
		</section>
	);
}