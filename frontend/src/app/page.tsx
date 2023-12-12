import ProductCard from "@/components/ProductCard";
import CarouselBanner from "@/components/CarouselBanner";
import CarouselProductCard from "@/components/CarouselProductCard";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function Home (): JSX.Element {
	return (
		<>
			<CarouselBanner />
			<section>
				<div className="bg-theme-07-dark-blue my-8 py-4 px-6 rounded text-theme-04-medium-gray dark:text-theme-01-light-gray">
					<h2 className="text-inherit">Ofertas</h2>
				</div>
				<div className="relative">
					<button className="absolute top-1/2 -left-9 right-auto -translate-y-1/2 bg-white text-2xl flex justify-center items-center w-16 h-16 rounded-full z-10 hover:shadow-xl">
						<MdOutlineArrowBackIos />
					</button>
					<div className="mx-auto grid grid-cols-5 max-w-[calc(var(--page-max-width)-var(--grid-product-card-gap)*5)] gap-[var(--grid-product-card-gap)]">
						<ProductCard title="lorem ipsum dolor sit amet" image="https://placehold.co/241x160/png" units={10} fullPrice={99.99} discountPrice={89.99} discountRate={10} installmentNumber={3} />
						<ProductCard title="lorem ipsum dolor sit amet" image="https://placehold.co/241x160/png" units={10} fullPrice={99.99} discountPrice={89.99} discountRate={10} installmentNumber={3} />
						<ProductCard title="lorem ipsum dolor sit amet" image="https://placehold.co/241x160/png" units={10} fullPrice={99.99} discountPrice={89.99} discountRate={10} installmentNumber={3} />
						<ProductCard title="lorem ipsum dolor sit amet" image="https://placehold.co/241x160/png" units={10} fullPrice={99.99} discountPrice={89.99} discountRate={10} installmentNumber={3} />
						<ProductCard title="lorem ipsum dolor sit amet" image="https://placehold.co/241x160/png" units={10} fullPrice={99.99} discountPrice={89.99} discountRate={10} installmentNumber={3} />
					</div>
					<button className="absolute top-1/2 left-auto -right-9 -translate-y-1/2 bg-white text-2xl flex justify-center items-center w-16 h-16 rounded-full z-10 hover:shadow-xl">
						<MdOutlineArrowForwardIos />
					</button>
				</div>
			</section>
			<CarouselProductCard />
			<div className="bg-theme-07-dark-blue my-8 py-4 px-6 rounded text-theme-04-medium-gray dark:text-theme-01-light-gray">
				<h2 className="text-inherit">Departamentos</h2>
			</div>
		</>
	);
}
