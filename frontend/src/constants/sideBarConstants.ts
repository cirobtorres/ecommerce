import { IoHome, IoHeart, IoCartSharp } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdSell, MdLocalShipping, MdScreenSearchDesktop } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
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
    title: "Sessão do usuário",
    icon: FaUser,
    submenu: true,
    subMenuItems: [
      { title: "Minha conta", href: "/user", icon: PiUserListFill },
      { title: "Meus dados", href: "/user/my-data", icon: FaClipboardList },
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
    icon: MdSell,
    submenu: false,
  },
  {
    title: "Mais procurados",
    href: "/",
    icon: MdScreenSearchDesktop,
    submenu: false,
  },
];
