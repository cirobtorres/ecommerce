import { IoHome, IoHeart, IoCartSharp } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

type UserSideBarItemsProps = {
  name: string;
  href: string;
  icon?: any;
  submenu?: true,
  subMenuItems?: { title: string, path: string, icon?: any}[]
};

export const SIDENAV_ITEMS: UserSideBarItemsProps[] = [
  {
    name: "Home",
    href: "/",
    icon: IoHome,
  },
  {
    name: "Minha conta",
    href: "/",
    icon: FaUser,
    submenu: true,
    subMenuItems: [
      { title: "Meus dados", path: "/", icon: FaClipboardList },
      { title: "Favoritos", path: "/", icon: IoHeart },
      { title: "Carrinho", path: "/", icon: IoCartSharp },
      { title: "Meus Pedidos", path: "/", icon: MdLocalShipping },
      { title: "Avaliações", path: "/", icon: AiFillLike },
    ]
  },
];