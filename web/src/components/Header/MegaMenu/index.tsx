"use client";

import { useEffect, useRef } from "react";
import useMegaMenu from "../../../hooks/useMegaMenu";
import { IoIosClose } from "react-icons/io";
import Styles from "./Styles.module.css";
import { RefrigelUser } from "@/types/user-types";
import Image from "next/image";
import Link from "next/link";

export default function MegaMenu({ user }: { user: RefrigelUser | null }) {
  const { isOpen, setIsOpen } = useMegaMenu();
  const menuDivRef = useRef<HTMLDivElement>(null);

  const handleCloseMegaMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={menuDivRef}
      id="mega-menu"
      className={isOpen ? Styles["mega-menu-enter"] : ""}
      onClick={handleCloseMegaMenu}
    >
      <nav
        className={`${Styles["mega-menu-container"]} ${isOpen ? Styles["mega-menu-animation-enter"] : ""} relative p-10`}
      >
        <div className={Styles["mega-menu-user-section"]}>
          <div className={Styles["mega-menu-heading"]}>
            <div className={Styles["mega-menu-user-greetings"]}>
              <Image
                src={
                  user?.refrigel_users.avatar_url ??
                  "/images/user/user-placeholder.png"
                }
                alt={`Imagem de perfil${user && " de " + user.refrigel_users.person_data.display_name}`}
                width={40}
                height={40}
                className={Styles["mega-menu-user-image"]}
              />
              {user && (
                <h2 className={Styles["mega-menu-authenticated-heading"]}>
                  Olá,{" "}
                  <Link
                    href="/perfil"
                    className={Styles["mega-menu-user-profile-link"]}
                  >
                    {user.refrigel_users.person_data.display_name}
                  </Link>
                  !
                </h2>
              )}
              {!user && (
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
              )}
            </div>
            <IoIosClose
              className="text-5xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
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
              <Link href="/">Protocolos</Link>
            </li>
          </ul>
        </div>
        <div className={Styles["mega-menu-product-section"]}>
          <h2>Produtos</h2>
          <ul className="text-xl">
            <li>Ar condicionado</li>
            <li>Fogão</li>
            <li>Lavadora</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
