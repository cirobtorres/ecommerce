import React from "react";
import { CarouselContextProps } from "../types/carousel";

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export default CarouselContext;
