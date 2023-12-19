"use client";

import Link from "next/link";

import { IoHeart, IoCartSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaMagnifyingGlass } from "react-icons/fa6";
import SideBar from "../SideBar";
import useSideBar from "@/hooks/useSideBar";

export default function Header() {
  const { toggleSideBar } = useSideBar();

  return (
    <header className={"bg-theme-08-light-green text-white"}>
      <SideBar toggle={toggleSideBar} />
      <div
        className={
          "mx-auto grid h-16 max-w-[var(--page-max-width)] grid-cols-12 gap-4"
        }
      >
        <div
          className={
            "col-span-8 flex flex-row items-center justify-center gap-4"
          }
        >
          <GiHamburgerMenu
            size="2rem"
            onClick={toggleSideBar}
            className={"cursor-pointer"}
          />
          <Link href="/">
            <div>Logo</div>
          </Link>
          <div className={"h-full w-full bg-theme-01-light-gray"}>
            <form className={"relative flex h-full w-full flex-row"}>
              <button
                className={
                  "absolute left-4 top-1/2 -translate-y-1/2 text-theme-07-dark-blue"
                }
              >
                <FaMagnifyingGlass />
              </button>
              <input
                type="text"
                placeholder="Search"
                className={"h-full w-full bg-transparent px-12 py-4"}
              />
            </form>
          </div>
        </div>
        <div
          className={
            "col-span-4 flex h-full flex-row items-center gap-4 text-xs"
          }
        >
          <div className={"flex-2 flex h-full flex-row items-center gap-1"}>
            <FaUser size="1.25rem" />
            <div
              className={
                "flex h-full flex-[2_2_0%] flex-col items-start justify-center gap-1"
              }
            >
              <Link href="/login" className={"hover:underline"}>
                Entrar
              </Link>
              <Link href="/register" className={"hover:underline"}>
                Crie sua conta
              </Link>
            </div>
          </div>
          <Link
            href="/"
            className={
              "flex h-full flex-1 items-center justify-center gap-1 px-2"
            }
            title="Favoritos"
          >
            <IoHeart size="1.25rem" /> Favoritos
          </Link>
          <Link
            href="/"
            className={
              "flex h-full flex-1 items-center justify-center gap-1 px-2"
            }
            title="Carrinho"
          >
            <IoCartSharp size="1.25rem" /> Carrinho
          </Link>
        </div>
      </div>
      <div
        className={
          "h-12 border-b-4 border-theme-07-dark-blue bg-theme-02-light-gray"
        }
      >
        <ul
          className={
            "mx-auto flex h-full max-w-[var(--page-max-width)] flex-row	gap-4"
          }
        >
          <li>
            <Link
              href="/"
              className={"flex h-full items-center"}
              title="Departamentos"
            >
              Departamentos
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={"flex h-full items-center"}
              title="Geladeiras"
            >
              Geladeiras
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={"flex h-full items-center"}
              title="Lavadoras"
            >
              Lavadoras
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={"flex h-full items-center"}
              title="Fogões"
            >
              Fogões
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={"flex h-full items-center"}
              title="Freezers"
            >
              Freezers
            </Link>
          </li>
          <li>
            <Link href="/" className={"flex h-full items-center"} title="Peças">
              Peças
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
