import BannerCarousel from "@/components/BannerCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import FlashOffer from "@/components/FlashOffer";
import ProductCardCarousel from "@/components/ProductCardCarousel";

import { CARD_SLIDER_CONSTANTS } from "@/constants/cardSliderConstants"; // TODO: delete me when I'm done
import { CATEGORIES_CONSTANTS } from "@/constants/categoriesConstants"; // TODO: delete me when I'm done
import { FEATURED_PRODUCTS } from "@/constants/swipeCarouselConstants"; // TODO: delete me when I'm done
import { useSession } from "next-auth/react";

export default function Home(): JSX.Element {
  return (
    <main className="mx-auto h-full w-full">
      <BannerCarousel bannerArray={FEATURED_PRODUCTS} />
      <FlashOffer productShowcase={CARD_SLIDER_CONSTANTS[0][0]} />
      <ProductCardCarousel
        title="Oferta do dia"
        linkText="Mostrar todas as ofertas"
        cards={CARD_SLIDER_CONSTANTS}
      />
      <CategoryCarousel
        title="Categorias"
        linkText="Mostrar todas as categorias"
        cards={CATEGORIES_CONSTANTS}
      />
    </main>
  );
}
