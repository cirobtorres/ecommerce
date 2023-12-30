import { FaDrumSteelpan, FaFan } from "react-icons/fa";
import { PiThermometerColdBold } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { IoIosBeer } from "react-icons/io";

export const MEGA_MENU_ITEMS = [
  {
    title: "Cozinhar",
    icon: FaDrumSteelpan,
    subElements: [
      { text: "Fogão", href: "/" },
      { text: "Micro-Ondas", href: "/" },
      { text: "Cooktop", href: "/" },
      { text: "Forno", href: "/" },
      { text: "Forno de Embutir", href: "/" },
    ],
  },
  {
    title: "Gelar",
    icon: PiThermometerColdBold,
    subElements: [
      { text: "Geladeira / Refrigerador", href: "/" },
      { text: "Cervejeira", href: "/" },
      { text: "Freezer", href: "/" },
      { text: "Frigobar", href: "/" },
    ],
  },
  {
    title: "Climatizar",
    icon: FaFan,
    subElements: [{ text: "Ar-Condicionado", href: "/" }],
  },
  {
    title: "Beber",
    icon: IoIosBeer,
    subElements: [
      { text: "Cervejeira", href: "/" },
      { text: "Purificador de Água", href: "/" },
      { text: "Refil", href: "/" },
      { text: "Bebedouro", href: "/" },
    ],
  },
  {
    title: "Lavar e Limpar",
    icon: BsStars,
    subElements: [
      { text: "Lavadora", href: "/" },
      { text: "Lava e Seca", href: "/" },
    ],
  },
  {
    title: "Outros",
    subElements: [
      { text: "Peças", href: "/" },
      { text: "Acessórios", href: "/" },
    ],
  },
];
