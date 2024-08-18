import Link from "next/link";
import Image from "next/image";
import {
  FaSignOutAlt,
  FaUser,
  FaTruck,
  FaBell,
  FaShoppingCart,
} from "react-icons/fa";
import { handleSignOut } from "../../../lib/authentication/auth";
import { IoHeart } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RefrigelUser } from "@/types/user-types";
import { getDisplayName } from "@/lib/user-utils";
import Styles from "./Styles.module.css";

const UserSection = ({ user }: { user: RefrigelUser | null }) => {
  if (user) {
    return (
      <nav className={Styles["user-nav-signedin-main-container"]}>
        <li>
          <div
            className={`${Styles["user-nav-auth"]} ${Styles["user-nav-auth-container-signedin"]}`}
          >
            <input
              type="checkbox"
              id="header-user-dropdown-menu"
              name="header-user-dropdown-menu"
              className={Styles["header-user-dropdown-menu"]}
            />
            <label
              htmlFor="header-user-dropdown-menu"
              className={Styles["user-nav-auth-signedin-subcontainer"]}
            >
              <Image
                src={
                  user.user_metadata.picture ??
                  user.refrigel_users.avatar_url ??
                  "/images/user/user-placeholder.png"
                }
                alt={`Imagem de perfil${user && " de " + getDisplayName(user)}`}
                width={35}
                height={35}
                className={Styles["user-nav-auth-image"]}
              />
              <span className={Styles["user-nav-auth-displayname"]}>
                {getDisplayName(user)} Bezerra Torres
              </span>
              <IoIosArrowDown className={Styles["user-nav-animation"]} />
            </label>
            <Submenu user={user} />
          </div>
        </li>
        <li className={Styles[""]}>
          <FaTruck />
        </li>
        <li className={Styles[""]}>
          <IoHeart />
        </li>
        <li className={Styles[""]}>
          <FaBell />
        </li>
        <li className={Styles[""]}>
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
        <li className={Styles[""]}>
          <FaTruck />
        </li>
        <li className={Styles[""]}>
          <IoHeart />
        </li>
        <li className={Styles[""]}>
          <FaBell />
        </li>
        <li className={Styles[""]}>
          <FaShoppingCart />
        </li>
      </nav>
    );
  }
};

const Submenu = ({ user }: { user: RefrigelUser }) => {
  return (
    <div className={Styles["user-nav-floating-menu-container"]}>
      <ul className={Styles["user-nav-floating-menu"]}>
        <li className={Styles["user-nav-floating-menu-items"]}>
          <Link
            href="/perfil"
            className={Styles["user-nav-floating-menu-profile-display"]}
          >
            <Image
              src={
                user.user_metadata.picture ??
                user.refrigel_users.avatar_url ??
                "/images/user/user-placeholder.png"
              }
              alt={`Imagem de perfil${user && " de " + getDisplayName(user)}`}
              width={50}
              height={50}
              className={Styles["user-nav-auth-image"]}
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xl font-extrabold truncate">
                {getDisplayName(user)}
              </span>
              <span className="text-sm">Perfil</span>
            </div>
          </Link>
        </li>
        <hr />
        <li className={`${Styles["user-nav-floating-menu-items"]} group`}>
          <span className="flex items-center gap-2 transition-transform group-hover:translate-x-1">
            Lista de Desejos{" "}
            {/* <IoIosArrowDown className="-rotate-90 opacity-0 transition-opacity group-hover:opacity-100" /> */}
          </span>
        </li>
        <li className={`${Styles["user-nav-floating-menu-items"]} group`}>
          <span className="flex items-center gap-2 transition-transform group-hover:translate-x-1">
            Compras{" "}
            {/* <IoIosArrowDown className="-rotate-90 opacity-0 transition-opacity group-hover:opacity-100" /> */}
          </span>
        </li>
        <li className={`${Styles["user-nav-floating-menu-items"]} group`}>
          <span className="flex items-center gap-2 transition-transform group-hover:translate-x-1">
            Avaliações{" "}
            {/* <IoIosArrowDown className="-rotate-90 opacity-0 transition-opacity group-hover:opacity-100" /> */}
          </span>
        </li>
        <hr />
        <li className={`${Styles["user-nav-floating-menu-items"]} group`}>
          <form className={Styles["user-nav-floating-menu-form-item"]}>
            <button
              formAction={handleSignOut}
              className="flex items-center justify-between"
            >
              Sair{" "}
              <FaSignOutAlt className="text-lg invisible transition-all duration-200 opacity-0 -translate-x-1 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0" />
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default UserSection;
