import SwipeCarousel from "@/components/SwipeCarousel";
import CardSlider from "@/components/CardSlider";

export default function Home(): JSX.Element {
  return (
    <>
      <SwipeCarousel />
      <CardSlider />
      <div className="my-8 px-6 py-4 text-theme-05">
        <h2 className="text-inherit">Departamentos</h2>
      </div>
    </>
  );
}
