import Link from "next/link";
import Image from "next/image";
import { FaSignOutAlt, FaUser, FaBell } from "react-icons/fa";
import { handleSignOut } from "../../../lib/authentication/auth";
import { IoIosArrowDown } from "react-icons/io";
import { RefrigelUser } from "@/types/user-types";
import { getDisplayName } from "@/lib/user-utils";
import ShoppingCartButton from "../ShoppingCartButton";

const UserSection = ({ user }: { user: RefrigelUser | null }) => {
  if (user) {
    return (
      <nav className="grid grid-cols-[280px_repeat(2,50px)] items-center list-none gap-[10px] [&_li]:flex [&_li]:items-center [&_li]:flex-1 [&_li]:gap-2 [&_li]:text-[#e2e8f0] [&_li:first-child]:justify-start [&_li]:justify-center [&_li:last-child]:justify-end">
        <li>
          <div className="relative flex items-center gap-2 transition-all cursor-pointer">
            <input
              type="checkbox"
              id="header-user-dropdown-menu"
              name="header-user-dropdown-menu"
              className="size-0 opacity-0 pointer-events-none peer/submenu-input [&~#submenu-main-container]:checked:opacity-100 [&~#submenu-main-container]:checked:scale-100 [&~#submenu-main-container]:checked:translate-y-0 [&~#submenu-main-container]:checked:pointer-events-auto"
            />
            <label
              htmlFor="header-user-dropdown-menu"
              className="flex flex-shrink-0 items-center gap-1 p-2 cursor-pointer [&_#submenu-arrow-rotate-toggle]:peer-checked/submenu-input:rotate-180 before:fixed before:inset-0 before:cursor-auto before:pointer-events-none peer-checked/submenu-input:before:pointer-events-auto peer-checked/submenu-input:before:bg-black/25"
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
                className="rounded-full flex-shrink-0 overflow-hidden"
              />
              <span
                className="truncate max-w-[calc(280px_-_35px_-_4px_*_2_-_8px_*_2_-_24px)]" // width: 280px; gaps: 4px * 2; imageWidth: 35px; padding: 8px * 2; arrowWidth: 24px
              >
                {getDisplayName(user)}
              </span>
              <IoIosArrowDown
                id="submenu-arrow-rotate-toggle"
                className="w-6 transition-all"
              />
            </label>
            <Submenu user={user} />
          </div>
        </li>
        <li className="text-2xl">
          <FaBell />
        </li>
        <li className="text-2xl">
          <ShoppingCartButton />
        </li>
      </nav>
    );
  } else {
    return (
      <nav className="grid grid-cols-[280px_repeat(2,50px)] items-center list-none gap-[10px] [&_li]:flex [&_li]:items-center [&_li]:flex-1 [&_li]:gap-2 [&_li]:text-[#e2e8f0] [&_li:first-child]:justify-start [&_li]:justify-center [&_li:last-child]:justify-end">
        <li>
          <div className="flex items-center gap-2 p-2">
            <FaUser className="text-2xl" />
            <div className="flex flex-col flex-shrink-0 gap-1">
              <span className="text-xs">
                Fazer <Link href="/entrar">login</Link>
              </span>
              <span className="text-xs">
                Criar <Link href="/cadastrar">cadastro</Link>
              </span>
            </div>
          </div>
        </li>
        <li className="text-2xl">
          <FaBell />
        </li>
        <li className="text-2xl">
          <ShoppingCartButton />
        </li>
      </nav>
    );
  }
};

const Submenu = ({ user }: { user: RefrigelUser }) => {
  return (
    <div
      id="submenu-main-container"
      className="opacity-0 pointer-events-none absolute top-[125%] left-1/2 transition-all -translate-x-1/2 -translate-y-[20%] scale-75"
    >
      <ul className="w-[300px] flex flex-col rounded overflow-hidden shadow-user-section-submenu bg-[#eeeeee] [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_li]:py-2 [&_li]:px-5 [&_li_span]:w-full [&_li_span]:text-[#26282b] [&_li:first-child]:border-b [&_li:first-child]:border-[#dbdbdb] [&_li:first-child]:bg-[#e2e2e2] [&_li:last-child]:bg-[#e2e2e2] [&_li:nth-last-child(2)]:border-b [&_li:nth-last-child(2)]:border-[#dbdbdb] hover:[&_li:not(:first-child):not(:last-child)]:bg-[#e9e9e9]">
        <li>
          <Link href="/perfil" className="flex gap-3">
            <Image
              src={
                user.user_metadata.picture ??
                user.refrigel_users.avatar_url ??
                "/images/user/user-placeholder.png"
              }
              alt={`Imagem de perfil${user && " de " + getDisplayName(user)}`}
              width={50}
              height={50}
              className="rounded-full flex-shrink-0 overflow-hidden"
            />
            <div className="flex flex-col">
              <span
                className="text-xl font-extrabold truncate max-w-[calc(300px_-_50px_-_12px_-_20px_*_2)]" // width: 300px; imageWidth:50px; gap: 12px; paddingX: 20px * 2;
              >
                {getDisplayName(user)}
              </span>
              <span className="text-sm">Perfil</span>
            </div>
          </Link>
        </li>
        <li className="group">
          <span className="flex items-center gap-2 justify-between transition-transform group-hover:translate-x-1">
            Lista de Desejos{" "}
            <IoIosArrowDown className="-translate-x-1 -rotate-90 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </li>
        <li className="group">
          <span className="flex items-center gap-2 justify-between transition-transform group-hover:translate-x-1">
            Compras{" "}
            <IoIosArrowDown className="-translate-x-1 -rotate-90 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </li>
        <li className="group">
          <span className="flex items-center gap-2 justify-between transition-transform group-hover:translate-x-1">
            Avaliações{" "}
            <IoIosArrowDown className="-translate-x-1 -rotate-90 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </li>
        <li className="[&_form]:w-full group">
          <form className="flex items-center text-[#26282b]">
            <button
              formAction={handleSignOut}
              className="w-full text-center flex items-center justify-between"
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
