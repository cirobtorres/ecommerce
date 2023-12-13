import ProductCard from "@/components/ProductCard";
import CarouselBanner from "@/components/CarouselBanner";
import CardSlider from "@/components/CardSlider";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function Home (): JSX.Element {
	return (
		<>
			<CarouselBanner />
			<CardSlider />
			<div className={`
				my-8 py-4 px-6 rounded
				bg-theme-02-light-gray dark:bg-theme-07-dark-blue 
				text-theme-04-medium-gray dark:text-theme-01-light-gray
			`}>
				<h2 className="text-inherit">Departamentos</h2>
			</div>
		</>
	);
}
