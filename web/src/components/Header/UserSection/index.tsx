"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { FaUser, FaTruck, FaBell, FaShoppingCart } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { handleSignOut } from "../../../lib/authenticationActions";
import Styles from "./Styles.module.css";

const UserSection = ({ user }: { user: User | null }) => {
  const [userMenu, setUserMenu] = useState(false);

  if (user) {
    return (
      <nav className={Styles["user-nav-signedin-main-container"]}>
        <li className={Styles["user-nav-auth-main-container"]}>
          <div>
            <div
              className={Styles["user-nav-auth"]}
              onMouseEnter={() => setUserMenu(true)}
              onMouseLeave={() => setUserMenu(false)}
            >
              <div className={Styles["user-nav-auth-container-signedin"]}>
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={`Imagem de perfil de ${user.user_metadata.full_name}`}
                  width={35}
                  height={35}
                  className={Styles["user-nav-auth-image"]}
                />
                <div className={Styles["user-nav-auth-signedin-subcontainer"]}>
                  <span className={Styles["user-nav-auth-displayname"]}>
                    {user.user_metadata.name}
                  </span>
                  <IoIosArrowDown
                    className={Styles["user-nav-animation"]}
                    style={{ transform: userMenu ? "rotate(180deg)" : "" }}
                  />
                </div>
              </div>
              {userMenu && <Submenu user={user} />}
            </div>
          </div>
        </li>
        <li>
          <Link href="/">
            <FaTruck /> Compras
          </Link>
        </li>
        <li>
          <Link href="/">
            <IoHeart /> Favoritos
          </Link>
        </li>
        <li>
          <FaBell />
        </li>
        <li>
          <FaShoppingCart />
        </li>
      </nav>
    );
  } else {
    return (
      <nav className={Styles["user-nav-signed-out-main-container"]}>
        <li>
          <div className={Styles["user-nav-auth-container"]}>
            <FaUser />
            <div className={Styles["user-nav-auth-subcontainer"]}>
              <span className="text-xs">
                Fazer <Link href="/entrar">login</Link>
              </span>
              <span className="text-xs">
                Criar <Link href="/cadastrar">cadastro</Link>
              </span>
            </div>
          </div>
        </li>
        <li>
          <FaShoppingCart />
        </li>
      </nav>
    );
  }
};

const Submenu = ({ user }: { user: User }) => {
  return (
    <div className={Styles["user-nav-floating-menu-container"]}>
      <div className={Styles["user-nav-floating-menu"]}>
        <Link
          href="/perfil"
          className={`${Styles["user-nav-floating-menu-items"]} ${Styles["user-nav-floating-menu-profile-display"]}`}
        >
          <Image
            src={user.user_metadata.avatar_url}
            alt={`Imagem de perfil de ${user.user_metadata.full_name}`}
            width={50}
            height={50}
            className={Styles["user-nav-auth-image"]}
          />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold">
              {user.user_metadata.name}
            </span>
            <span className="text-sm">Perfil</span>
          </div>
        </Link>
        <hr />
        <div className={Styles["user-nav-floating-menu-items"]}>
          <span>Lista de Desejos</span>
        </div>
        <div className={Styles["user-nav-floating-menu-items"]}>
          <span>Compras</span>
        </div>
        <div className={Styles["user-nav-floating-menu-items"]}>
          <span>Avaliações</span>
        </div>
        <hr />
        <form className={Styles["user-nav-floating-menu-form-item"]}>
          <button formAction={handleSignOut}>Sair</button>
        </form>
      </div>
    </div>
  );
};

export default UserSection;
