"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const featuredProducts = [
	{
		src: "/images/featured-product-placeholder.png",
		title: "Carousel title 1",
	},
	{
		src: "/images/featured-product-placeholder.png",
		title: "Carousel title 2",
	},
	{
		src: "/images/featured-product-placeholder.png",
		title: "Carousel title 3",
	},
];

let count = 0;
let slideInterval: NodeJS.Timeout;
	
export default function Carousel() {

	const [currentIndex, setCurrentIndex] = useState(0);
	const slideRef = useRef();

	const removeAnimation = () => {
		slideRef.current.classList.remove("fade-anim");
	};

	const startSlider = () => {
		slideInterval = setInterval(() => {
			handleOnNextClick();
		}, 3000);
	};

	const pauseSlider = () => {
		clearInterval(slideInterval);
	};

	useEffect(() => {
		slideRef.current.addEventListener("animationend", removeAnimation);
		slideRef.current.addEventListener("mouseenter", pauseSlider);
		slideRef.current.addEventListener("mouseleave", startSlider);

		startSlider();
		return () => {
			pauseSlider();
		};
		// eslint-disable-next-line
	}, []);

	const handleOnNextClick = () => {
		count = (count + 1) % featuredProducts.length;
		setCurrentIndex(count);
		console.log(count);
		slideRef.current.classList.add("fade-anim");
	};
	const handleOnPrevClick = () => {
		const productsLength = featuredProducts.length;
		count = (currentIndex + productsLength - 1) % productsLength;
		setCurrentIndex(count);
		console.log(count);
		slideRef.current.classList.add("fade-anim");
	};

	return (
		<div ref={slideRef} className="relative w-full h-96 overflow-hidden">
			{featuredProducts.map((product, index) => (
				<div 
					key={index}
					className={`absolute top-0 start-0 w-full h-full ease-in-out duration-700 ${index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"}`}
				>
					<Image 
						src={product.src}
						alt={product.title}
						layout="fill"
						objectFit="cover"
					/>
				</div>
			)
			)}
			<div className="absolute top-1/2 start-0 -translate-y-1/2 z-30 px-4">
				<button 
					type="button" 
					onClick={handleOnPrevClick}
					className="flex justify-center items-center w-8 h-20 rounded text-2xl bg-white hover:shadow-xl"
				>
					<MdOutlineArrowBackIos />
				</button>
			</div>
			<div className="absolute top-1/2 end-0 -translate-y-1/2 z-30 px-4">
				<button 
					type="button" 
					onClick={handleOnNextClick}
					className="flex justify-center items-center w-8 h-20 rounded text-2xl bg-white hover:shadow-xl"
				>
					<MdOutlineArrowForwardIos />
				</button>
			</div>
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
				{featuredProducts.map((product, index) => (
					<div 
						key={index}
						className={`w-3 h-3 rounded-full bg-white ${index === currentIndex ? "opacity-100" : "opacity-50"}`}
					/>
				)
				)}
			</div>
		</div>
	);
}