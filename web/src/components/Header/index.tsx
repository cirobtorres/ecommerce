"use client";

import RefrigelLogo from "../../icons/logo";
import RefrigelLogoLarge from "../../icons/logo-large";
import Header from "./Header.module.css";
import Search from "./Search.module.css";
import Products from "./Products.module.css";
import User from "./User.module.css";
import Main from "./Main.module.css";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function RefrigelHeader() {
  const pathname = usePathname();

  if (pathname.includes("entrar") || pathname.includes("cadastrar")) {
    return (
      <header className={`${Header["header-outter-container"]} relative`}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <RefrigelLogo color="#e2e8f0" size="40" />
        </div>
      </header>
    );
  } else {
    return (
      <header className={Header["header-outter-container"]}>
        <nav className={Header["split-container"]}>
          <div className={Main["positioning-container"]}>
            <div className={Header["nav-grid"]}>
              Refrigel Logo
              <SearchBar />
              <UserSection />
            </div>
          </div>
        </nav>
        <ProductsSection />
      </header>
    );
  }
}

const SearchBar = () => {
  return (
    <form className={Search["form-container"]}>
      <button className={Search["button"]}>
        <CiSearch />
      </button>
      <input type="search" className={Search["input"]} />
    </form>
  );
};

const ProductsSection = () => {
  return (
    <nav className={Products["products-main-container"]}>
      <div className={Main["positioning-container"]}>
        <ul className={Products["products-list-container"]}>
          <li>Ar Condicionado</li>
          <li>Refrigerador</li>
          <li>Kits de Instalação</li>
          <li>Peças</li>
        </ul>
      </div>
    </nav>
  );
};

const UserSection = () => {
  return (
    <nav className={User["user-nav-container"]}>
      <li>
        <FaRegUser />
      </li>
      <li>Compras</li>
      <li>Favoritos</li>
      {/* <li>Avisos</li> */}
      <li>Carrinho</li>
      <Address />
    </nav>
  );
};

const Address = () => {
  return <div>Endereço</div>;
};
