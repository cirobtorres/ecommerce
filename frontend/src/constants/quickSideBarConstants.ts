import { AiFillLike } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { IoHome, IoHeart, IoCartSharp } from "react-icons/io5";

export const USER_SIDENAV_ITEMS: userQuickSideNavItems[] = [
  {
    title: "Início",
    href: "/user",
    icon: IoHome,
  },
  {
    title: "Meus dados",
    href: "/user/my-data",
    icon: FaClipboardList,
  },
  {
    title: "Favoritos",
    href: "/",
    icon: IoHeart,
  },
  {
    title: "Carrinho",
    href: "/",
    icon: IoCartSharp,
  },
  {
    title: "Meus Pedidos",
    href: "/",
    icon: MdLocalShipping,
  },
  {
    title: "Avaliações",
    href: "/",
    icon: AiFillLike,
  },
];
