import { home } from "@/icons";
import { IoHome, IoHeart, IoCartSharp, IoCloseCircle } from "react-icons/io5";
import { FaClipboardList, FaUserCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import Link from "next/link";
import useSideBar from "@/hooks/useSideBar";
import { useEffect } from "react";
import Image from "next/image";

type SideBarProps = {
  toggle: () => void;
}

type UserSideBarItemsProps = {
  name: string;
  href: string;
  icon: any;
}

const userSideBarItems: UserSideBarItemsProps[] = [
  {
    name: 'Home',
    href: '/',
    icon: IoHome,
  },
  {
    name: 'Minha conta',
    href: '/',
    icon: FaUser,
  },
  {
    name: 'Meus dados',
    href: '/',
    icon: FaClipboardList,
  },
  {
    name: 'Favoritos',
    href: '/',
    icon: IoHeart,
  },
  {
    name: 'Carrinho',
    href: '/',
    icon: IoCartSharp,
  },
  {
    name: 'Meus Pedidos',
    href: '/',
    icon: MdLocalShipping,
  },
  {
    name: 'Avaliações',
    href: '/',
    icon: AiFillLike,
  },
];

export default function SideBar({ toggle }: SideBarProps) {
  const { isCollapsed } = useSideBar();

  return (
    <div className={`relative`}>
      <div className={`absolute transition-all z-[1000] -top-12 left-0 right-80 ${isCollapsed ? 'block' : 'hidden'}`}>
        <button onClick={toggle}><IoCloseCircle size='3rem' /></button>
      </div>
      <aside className={`
        flex flex-col overflow-hidden fixed
        left-0 top-0 h-screen
        z-[1000] py-6 bg-stone-800 
        transition-all whitespace-nowrap 
        ${isCollapsed ? 'w-80' : 'w-0'}
      `}>
        <Link href='/' className={`flex flex-row items-center gap-4 px-6`}>
          <div className={`relative w-8 h-8 rounded-full border-2 overflow-hidden bg-white`}>
            <Image src='/images/user-not-signed-in/1281x1281-user-icon.png' alt='' fill sizes='100%' priority className={`object-cover`} />
          </div>
          <span>Olá Fulano</span>
        </Link>
        <div className={`h-full my-6 px-6 overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-900 scrollbar-track-gray-100`}>
          {userSideBarItems.length > 0 && (
            <ul>
              {
                userSideBarItems.map(({ name, href, icon: Icon }, index) => (
                  <li key={index} className={`
                    flex items-center gap-2 rounded-md 
                    text-sm text-white hover:bg-stone-700 
                  `}>
                    <Link href={href} className={`flex flex-row gap-4 p-2 w-full whitespace-nowrap`}>
                      <Icon size='1.25rem' /> {name}
                    </Link>
                  </li>
                ))
              }
            </ul>)}
          <hr className={`my-4`} />
          {/* Expand here */}
        </div>
        <button 
          className={`
            mx-6 p-4 rounded uppercase font-bold 
            text-theme-01-light-gray bg-theme-07-dark-blue 
            hover:shadow-bright
          `} 
          onClick={toggle}
        >
          Fechar
        </button>
      </aside>
    </div>
  )
}
