"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImMenu3 } from "react-icons/im";
import { IoCartSharp, IoHeart } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";

import SideBar from "@/components/Header/SideBar";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import UserLoginRegisterSection from "./User";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className={`relative bg-theme-08 text-white ${
        pathname.includes("/login") || pathname.includes("/register")
          ? "border-b-4 border-theme-07"
          : ""
      }`}
    >
      <div className="mx-auto grid h-20 max-w-webpage grid-cols-12 gap-4">
        <TopLeftNavHeader />
        <div className="col-span-5 flex h-full flex-row items-center text-xs [&_div::after]:m-3 [&_div::after]:h-4 [&_div::after]:border-r [&_div::after]:border-theme-01">
          <UserLoginRegisterSection />
          <TopRightNavHeader />
        </div>
      </div>
      <BottomNavHeader />
    </header>
  );
}

const TopLeftNavHeader = () => {
  const [sideBarIsCollapsed, setSideBarIsCollapsed] = useState(false);
  const [userSubMenu, setUserSubMenu] = useState(false);
  const pathname = usePathname();

  const handleSideBar = () => {
    setSideBarIsCollapsed(!sideBarIsCollapsed);
    setUserSubMenu(false);
  };

  useEffect(() => {
    if (sideBarIsCollapsed) setSideBarIsCollapsed(!sideBarIsCollapsed);
  }, [pathname]);

  return (
    <div className="col-span-7 flex flex-row items-center gap-4">
      {pathname.includes("/login") || pathname.includes("/register") ? null : (
        <>
          <SideBar
            userSubMenu={userSubMenu}
            isCollapsed={sideBarIsCollapsed}
            pathname={pathname}
            toggleUserSubMenu={setUserSubMenu}
            toggleSideBar={handleSideBar}
          />
          <GiHamburgerMenu
            size="2rem"
            onClick={handleSideBar}
            className={"cursor-pointer"}
          />
        </>
      )}
      <div className="flex justify-center min-w-40">
        <Link href="/">LOGO</Link>
      </div>
      {pathname.includes("/login") || pathname.includes("/register") ? null : (
        <SearchBar />
      )}
    </div>
  );
};

const TopRightNavHeader = () => {
  const [whishList, setWhishList] = useState(false);
  const pathname = usePathname();

  const hoverEnterWhishList = () => {
    setWhishList(true);
  };

  const hoverLeaveWhishList = () => {
    setWhishList(false);
  };

  return (
    <div className="flex flex-row flex-[2_2_0%] justify-end items-center">
      {pathname.includes("/login") || pathname.includes("/register") ? null : (
        <>
          <div
            className="relative cursor-pointer h-full group"
            onMouseEnter={hoverEnterWhishList}
            onMouseLeave={hoverLeaveWhishList}
          >
            <Link
              href="/"
              className="flex h-full w-fit gap-1 items-center justify-center whitespace-nowrap px-2 after:m-3 after:h-4 after:border-r after:border-theme-01"
              title="Favoritos"
            >
              <IoHeart size="1.25rem" /> Favoritos
            </Link>
            {whishList && (
              <div className="absolute top-[80%] right-0 h-40 w-80 p-2 rounded text-theme-05 bg-theme-01 border border-light-gray z-[5000]"></div>
            )}
          </div>
          <Link
            href="/"
            className="flex h-full w-fit gap-1 items-center justify-center whitespace-nowrap px-2 after:m-3 after:h-4 after:border-r after:border-theme-01"
            title="Pedidos"
          >
            <MdLocalShipping size="1.25rem" /> Meus Pedidos
          </Link>
          <Link
            href="/"
            className="flex h-full w-fit gap-1 items-center justify-center whitespace-nowrap px-2"
            title="Carrinho"
          >
            <IoCartSharp size="1.25rem" /> Carrinho
          </Link>
        </>
      )}
    </div>
  );
};

const temporaryConstants = [
  {
    href: "/",
    text: "Geladeiras",
  },
  {
    href: "/",
    text: "Lavadoras",
  },
  {
    href: "/",
    text: "Fogões",
  },
  {
    href: "/",
    text: "Freezers",
  },
  {
    href: "/",
    text: "Peças",
  },
];

const BottomNavHeader = () => {
  const [megaMenuIsCollapsed, setMegaMenuIsCollapsed] = useState(false);
  const pathname = usePathname();
  return pathname.includes("/login") ||
    pathname.includes("/register") ? null : (
    <div className="h-8 bg-header-linear-gradient">
      <div className="mx-auto flex h-full max-w-webpage flex-row">
        <div>
          <button
            onClick={() => setMegaMenuIsCollapsed(!megaMenuIsCollapsed)}
            className="flex h-full items-center gap-2 px-4"
            title="Departamentos"
          >
            <ImMenu3 size="1.25rem" /> Departamentos
          </button>
          {megaMenuIsCollapsed && <MegaMenu />}
        </div>
        <ul className="flex w-full bg-theme-06 [&_a:not(:last-child)]:after:border-r [&_a:not(:last-child)]:after:border-[#2a5083] [&_a:not(:last-child)]:after:h-[70%] [&_a:not(:last-child)]:after:absolute [&_a:not(:last-child)]:after:-right-[1px] [&_a:not(:last-child):not(first-child)]:mr-[1px]">
          {temporaryConstants.map(({ href, text }, index) => (
            <li
              key={index}
              className="relative flex items-center px-4 hover:shadow-dark"
            >
              <Link href={href} title={text}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
