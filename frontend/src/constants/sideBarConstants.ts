import { IoHome, IoHeart, IoCartSharp } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

export const SIDENAV_ITEMS: UserSideBarItemsProps[] = [
  {
    title: "Home",
    href: "/",
    icon: IoHome,
    submenu: false,
    separation: true,
  },
  {
    title: "Minha conta",
    href: "/",
    icon: FaUser,
    submenu: true,
    subMenuItems: [
      { title: "Meus dados", href: "/", icon: FaClipboardList },
      { title: "Favoritos", href: "/", icon: IoHeart },
      { title: "Carrinho", href: "/", icon: IoCartSharp },
      { title: "Meus Pedidos", href: "/", icon: MdLocalShipping },
      { title: "Avaliações", href: "/", icon: AiFillLike },
    ],
    separation: true,
  },
  {
    title: "Mais vendidos",
    href: "/",
    icon: IoHome,
    submenu: false,
  },
  {
    title: "Mais procurados",
    href: "/",
    icon: IoHome,
    submenu: false,
  },
];
