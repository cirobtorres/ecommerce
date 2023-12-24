"use client";

import Link from "next/link";
import { useState } from "react";

import { IoHeart, IoCartSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { ImMenu3 } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa6";

import SideBar from "@/components/SideBar";
import useSideBar from "@/hooks/useSideBar";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleSideBar } = useSideBar();

  return (
    <header className="relative bg-theme-08 text-white">
      <SideBar toggle={toggleSideBar} />
      <div className="mx-auto grid h-16 max-w-webpage grid-cols-12 gap-4">
        <div className="col-span-7 flex flex-row items-center justify-center gap-4">
          <GiHamburgerMenu
            size="2rem"
            onClick={toggleSideBar}
            className={"cursor-pointer"}
          />
          <div className="flex justify-center min-w-40">
            <Link href="/">LOGO</Link>
          </div>
          <SearchBar />
        </div>
        <div className="col-span-5 flex h-full flex-row items-center gap-4 text-xs">
          <div className="flex-2 flex h-full flex-row items-center gap-1">
            <FaUser size="1.25rem" />
            <div className="flex h-full flex-[2_2_0%] flex-col items-start justify-center gap-1">
              <Link href="/login" className="hover:underline">
                Entrar
              </Link>
              <Link href="/register" className="hover:underline">
                Crie sua conta
              </Link>
            </div>
          </div>
          <Link
            href="/"
            className="flex h-full flex-1 items-center justify-center gap-1 px-2"
            title="Favoritos"
          >
            <IoHeart size="1.25rem" /> Favoritos
          </Link>
          <Link
            href="/"
            className="flex h-full flex-1 items-center justify-center gap-1 px-2"
            title="Pedidos"
          >
            <MdLocalShipping size="1.25rem" /> Meus Pedidos
          </Link>
          <Link
            href="/"
            className="flex h-full flex-1 items-center justify-center gap-1 px-2"
            title="Carrinho"
          >
            <IoCartSharp size="1.25rem" /> Carrinho
          </Link>
        </div>
      </div>
      <div className="h-12 bg-header-linear-gradient">
        <ul className="mx-auto flex h-full max-w-webpage flex-row">
          <li>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-full items-center gap-2 px-4"
              title="Departamentos"
            >
              <ImMenu3 size="1.25rem" /> Departamentos
            </button>
            {isOpen && <MegaMenu />}
          </li>
          <div className="flex w-full bg-theme-06">
            <li className="flex items-center px-4">
              <Link href="/" className="" title="Geladeiras">
                Geladeiras
              </Link>
            </li>
            <li className="flex items-center px-4">
              <Link href="/" className="" title="Lavadoras">
                Lavadoras
              </Link>
            </li>
            <li className="flex items-center px-4">
              <Link href="/" className="" title="Fogões">
                Fogões
              </Link>
            </li>
            <li className="flex items-center px-4">
              <Link href="/" className="" title="Freezers">
                Freezers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex h-full items-center px-4"
                title="Peças"
              >
                Peças
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </header>
  );
}
