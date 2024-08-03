"use client";

import RefrigelLogo from "../../icons/logo";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./SearchBar";
import Address from "./Address";
import UserSection from "./UserSection";
import ProductSection from "./ProductSection";
import Styles from "./Styles.module.css";

export default function RefrigelHeader() {
  const pathname = usePathname();

  if (pathname.includes("entrar") || pathname.includes("cadastrar")) {
    return (
      <header
        className={`${Styles["header-authentication-container"]} relative`}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <RefrigelLogo color="#e2e8f0" size="40" />
        </div>
      </header>
    );
  } else {
    return (
      <header className={Styles["header-outter-container"]}>
        <div className={Styles["header-submenu"]}></div>
        <nav>
          <div className={Styles["positioning-container"]}>
            <div className={Styles["header-nav-grid"]}>
              <HamburgerMenu />
              <RefrigelLogo color="#e2e8f0" size="40" />
              <Address />
              <SearchBar />
              <UserSection />
            </div>
          </div>
        </nav>
        <ProductSection />
      </header>
    );
  }
}
