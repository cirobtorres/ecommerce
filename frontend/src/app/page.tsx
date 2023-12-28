import SwipeCarousel from "@/components/SwipeCarousel";
import CardSlider from "@/components/CardSlider";
import { cardSliderConstants } from "@/constants/cardSliderConstants"; // TODO: delete me when I'm done

export default function Home(): JSX.Element {
  return (
    <>
      <SwipeCarousel />
      <CardSlider title="Ofertas do dia" cards={cardSliderConstants} />
    </>
  );
}
