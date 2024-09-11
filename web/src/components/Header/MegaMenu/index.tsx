"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { TbAirConditioning } from "react-icons/tb";
import { BiSolidWasher } from "react-icons/bi";
import { PiOven } from "react-icons/pi";
import { FaStar, FaUser, FaTruck, FaBell } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { handleSignOut as signOut } from "@/lib/authentication/auth";
import { RefrigelUser } from "@/types/user-types";
import { getDisplayName } from "@/lib/user-utils";
import useMegaMenu from "../../../hooks/useMegaMenu";
import Styles from "./Styles.module.css";

export default function MegaMenu({ user }: { user: RefrigelUser | null }) {
  const { isOpen, setIsOpen } = useMegaMenu();
  const [productHover, setProductHover] = useState(false);

  const handleCloseMegaMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSignOut = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(false);
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
              className="text-5xl cursor-pointer transition-transform hover:rotate-90 rounded-full p-1 hover:bg-[#e4e4e4]"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <NavBody onHover={setProductHover} />
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
          <NavHeader closeFunc={setIsOpen} />
          <NavBody onHover={setProductHover} />
          <SignedOutNavButtons />
        </nav>
        <div
          onMouseEnter={() => setProductHover(true)}
          onMouseLeave={() => setProductHover(false)}
          className={`text-nowrap overflow-hidden transition-all duration-75 fixed top-0 bottom-0 left-[400px] z-[3] bg-[#eee] ${productHover ? "w-[400px]" : "w-0"}`}
        >
          <ul
            className={`${
              productHover
                ? "transition-all duration-75 delay-150 h-full"
                : "h-0"
            } w-full`}
          >
            {[...Array(10)].map((_, index: number) => (
              <li key={index} className="text-3xl">
                Hello World
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const NavHeader = ({ closeFunc }: { closeFunc: (value: boolean) => void }) => {
  const { setIsOpen } = useMegaMenu();
  return (
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
            // onClick={() => setIsOpen(false)}
            className={Styles["mega-menu-user-anonymous-link"]}
          >
            login
          </Link>
          .
        </h2>
      </div>
      <IoIosClose
        className="text-5xl cursor-pointer transition-transform hover:rotate-90 rounded-full p-0.5 hover:bg-[#e4e4e4]"
        onClick={() => closeFunc(false)}
      />
    </div>
  );
};

const NavBody = ({ onHover }: { onHover: (value: boolean) => void }) => {
  return (
    <div className={`${Styles["mega-menu-overflow-section"]} scrollbar`}>
      <MegaMenuUserList />
      <MegaMenuProductList onHover={onHover} />
    </div>
  );
};

const MegaMenuUserList = () => {
  return (
    <ul className="text-xl">
      {[
        { text: "Perfil", icon: <FaUser /> },
        { text: "Compras", icon: <FaTruck /> },
        { text: "Lista de Desejos", icon: <FaBell /> },
        { text: "Avaliações", icon: <FaStar /> },
        { text: "Protocolos", icon: <IoTicket /> },
      ].map(({ text, icon }, index) => (
        <li key={index} className="rounded hover:bg-[#e4e4e4] group">
          <Link
            href="/"
            className="flex justify-between items-center px-2 py-1 group-hover:text-[#16a34a] transition-all group-hover:translate-x-1"
          >
            <span className="flex gap-3 items-center">
              {icon}
              {text}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const MegaMenuProductList = ({
  onHover,
}: {
  onHover: (value: boolean) => void;
}) => {
  return (
    <div className={Styles["mega-menu-product-section"]}>
      <h2>Produtos</h2>
      <ul className="text-xl">
        {[
          { text: "Ar Condicionado" },
          { text: "Lavadora" },
          { text: "Fogão" },
          { text: "Kit de Instalação" },
          { text: "Peças" },
        ].map(({ text }, index) => (
          <li
            key={index}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="rounded hover:bg-[#e4e4e4] group"
          >
            <Link
              href="/"
              className="flex justify-between items-center px-2 py-1 group-hover:text-[#16a34a] transition-all group-hover:translate-x-1"
            >
              {text}
              <IoIosArrowDown className="text-[#16a34a] -rotate-90 opacity-0 -translate-x-2 group-hover:-translate-x-1 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SignedOutNavButtons = () => {
  const { setIsOpen } = useMegaMenu();
  return (
    <div className="flex flex-col gap-3 p-8">
      <Link
        href="/entrar"
        // onClick={() => setIsOpen(false)}
        className="block px-4 py-3 rounded text-center uppercase font-extrabold transition-colors text-[#e2e8f0] bg-[#1d4f91] hover:bg-[#34619c]"
      >
        Entrar
      </Link>
      <Link
        href="/cadastrar"
        // onClick={() => setIsOpen(false)}
        className="block px-4 py-3 rounded text-center uppercase font-extrabold transition-colors text-[#1d4f91] hover:text-[#34619c]"
      >
        Cadastrar
      </Link>
    </div>
  );
};
