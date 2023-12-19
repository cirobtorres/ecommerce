import CarouselComponent from "@/components/CarouselComponent";
import CardSlider from "@/components/CardSlider";

export default function Home(): JSX.Element {
  return (
    <>
      <CarouselComponent />
      <CardSlider />
      <div
        className={`
				my-8 rounded bg-theme-02-light-gray px-6
				py-4 text-theme-04-medium-gray 
			`}
      >
        <h2 className="text-inherit">Departamentos</h2>
      </div>
    </>
  );
}
