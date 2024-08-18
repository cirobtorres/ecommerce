"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { handleSignOut as signOut } from "@/lib/authentication/auth";
import { RefrigelUser } from "@/types/user-types";
import { getDisplayName } from "@/lib/user-utils";
import useMegaMenu from "../../../hooks/useMegaMenu";
import Styles from "./Styles.module.css";

export default function MegaMenu({ user }: { user: RefrigelUser | null }) {
  const { isOpen, setIsOpen } = useMegaMenu();

  const handleCloseMegaMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSignOut = (event: React.MouseEvent) => {
    event.preventDefault();
    signOut();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-shown");
    } else {
      document.body.classList.remove("modal-shown");
    }
  }, [isOpen]);

  if (user) {
    return (
      <div
        id="mega-menu"
        className={isOpen ? Styles["mega-menu-enter"] : ""}
        onClick={handleCloseMegaMenu}
      >
        <nav
          className={`${Styles["mega-menu-container"]} ${isOpen ? Styles["mega-menu-animation-enter"] : ""} relative p-2 flex flex-col justify-between`}
        >
          <div className={`${Styles["mega-menu-heading"]} p-8`}>
            <div className={Styles["mega-menu-user-greetings"]}>
              <Image
                src={
                  user.user_metadata.picture ??
                  user.refrigel_users.avatar_url ??
                  "/images/user/user-placeholder.png"
                }
                alt={`Imagem de perfil${user && " de " + getDisplayName(user)}`}
                width={40}
                height={40}
                className={Styles["mega-menu-user-image"]}
              />
              <h2 className={Styles["mega-menu-authenticated-heading"]}>
                Olá,{" "}
                <Link
                  href="/perfil"
                  className={Styles["mega-menu-user-profile-link"]}
                >
                  {getDisplayName(user)}
                </Link>
                !
              </h2>
            </div>
            <IoIosClose
              className="text-5xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className={`${Styles["mega-menu-overflow-section"]} scrollbar`}>
            <ul className="text-xl">
              <li>
                <Link href="/">Perfil</Link>
              </li>
              <li>
                <Link href="/">Compras</Link>
              </li>
              <li>
                <Link href="/">Lista de desejos</Link>
              </li>
              <li>
                <Link href="/">Avaliações</Link>
              </li>
              <li>
                <Link href="/">Protocolos</Link>
              </li>
            </ul>
            <hr className="mt-4 mb-3 border-[#dddfe0]" />
            <div className={Styles["mega-menu-product-section"]}>
              <h2>Produtos</h2>
              <ul className="text-xl">
                <li>Ar condicionado</li>
                <li>Fogão</li>
                <li>Lavadora</li>
                <li>Kits de instalação</li>
                <li>Peças</li>
              </ul>
            </div>
            <hr className="mt-4 mb-3 border-[#dddfe0]" />
            <div className={Styles["mega-menu-product-section"]}>
              <h2>Produtos</h2>
              <ul className="text-xl">
                <li>Ar condicionado</li>
                <li>Fogão</li>
                <li>Lavadora</li>
                <li>Kits de instalação</li>
                <li>Peças</li>
              </ul>
            </div>
            <hr className="mt-4 mb-3 border-[#dddfe0]" />
            <div className={Styles["mega-menu-product-section"]}>
              <h2>Produtos</h2>
              <ul className="text-xl">
                <li>Ar condicionado</li>
                <li>Fogão</li>
                <li>Lavadora</li>
                <li>Kits de instalação</li>
                <li>Peças</li>
              </ul>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="m-8 px-4 py-3 rounded text-xl uppercase font-extrabold transition-colors text-[#1d4f91] bg-[#cfd5d6] hover:bg-[#c9cfd1]"
          >
            Sair
          </button>
        </nav>
      </div>
    );
  } else {
    return (
      <div
        id="mega-menu"
        className={isOpen ? Styles["mega-menu-enter"] : ""}
        onClick={handleCloseMegaMenu}
      >
        <nav
          className={`${Styles["mega-menu-container"]} ${isOpen ? Styles["mega-menu-animation-enter"] : ""} relative p-2 flex flex-col justify-between`}
        >
          <div className={`${Styles["mega-menu-heading"]} p-8`}>
            <div className={Styles["mega-menu-user-greetings"]}>
              <Image
                src={"/images/user/user-placeholder.png"}
                alt={`Imagem de perfil de usuário anônimo`}
                width={40}
                height={40}
                className={Styles["mega-menu-user-image"]}
              />
              <h2 className={Styles["mega-menu-anonymous-heading"]}>
                Olá, visitante!
                <br />
                Faça seu{" "}
                <Link
                  href="/entrar"
                  className={Styles["mega-menu-user-anonymous-link"]}
                >
                  login
                </Link>
                .
              </h2>
            </div>
            <IoIosClose
              className="text-5xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className={Styles["overflow"]}>
            <ul className="text-xl">
              <li>
                <Link href="/">Perfil</Link>
              </li>
              <li>
                <Link href="/">Compras</Link>
              </li>
              <li>
                <Link href="/">Lista de desejos</Link>
              </li>
              <li>
                <Link href="/">Avaliações</Link>
              </li>
              <li>
                <Link href="/">Protocolos</Link>
              </li>
            </ul>
            <div className={Styles["mega-menu-product-section"]}>
              <h2>Produtos</h2>
              <ul className="text-xl">
                <li>Ar condicionado</li>
                <li>Fogão</li>
                <li>Lavadora</li>
                <li>Kits de instalação</li>
                <li>Peças</li>
              </ul>
            </div>
            <div className={Styles["mega-menu-product-section"]}>
              <h2>Produtos</h2>
              <ul className="text-xl">
                <li>Ar condicionado</li>
                <li>Fogão</li>
                <li>Lavadora</li>
                <li>Kits de instalação</li>
                <li>Peças</li>
              </ul>
            </div>
            <div className={Styles["mega-menu-product-section"]}>
              <h2>Produtos</h2>
              <ul className="text-xl">
                <li>Ar condicionado</li>
                <li>Fogão</li>
                <li>Lavadora</li>
                <li>Kits de instalação</li>
                <li>Peças</li>
              </ul>
            </div>
          </div>
          <Link
            href="/entrar"
            className="block m-8 px-4 py-3 rounded text-center uppercase font-extrabold transition-colors text-[#e2e8f0] bg-[#1d4f91] hover:bg-[#34619c]"
          >
            Entrar
          </Link>
        </nav>
      </div>
    );
  }
}
