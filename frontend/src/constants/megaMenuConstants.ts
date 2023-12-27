import { FaDrumSteelpan, FaFan } from "react-icons/fa";
import { PiThermometerColdBold } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { IoIosBeer } from "react-icons/io";

export const MEGA_MENU_ITEMS = [
  {
    title: "Cozinhar",
    icon: FaDrumSteelpan,
    subElements: [
      { text: "Fogões", href: "/" },
      { text: "Micro-Ondas", href: "/" },
      { text: "Cooktops", href: "/" },
      { text: "Fornos", href: "/" },
      { text: "Fornos de Embutir", href: "/" },
    ],
  },
  {
    title: "Gelar",
    icon: PiThermometerColdBold,
    subElements: [
      { text: "Geladeiras / Refrigeradores", href: "/" },
      { text: "Cervejeiras", href: "/" },
      { text: "Freezers", href: "/" },
      { text: "Frigobares", href: "/" },
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
      { text: "Cervejeiras", href: "/" },
      { text: "Purificadores de Água", href: "/" },
      { text: "Refil", href: "/" },
      { text: "Bebedouros", href: "/" },
    ],
  },
  {
    title: "Lavar e Limpar",
    icon: BsStars,
    subElements: [
      { text: "Lavadoras", href: "/" },
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
