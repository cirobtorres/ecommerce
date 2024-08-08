import Link from "next/link";
import { Suspense } from "react";
import RefrigelLogo from "../../icons/logo";
import HamburgerMenu from "./HamburgerMenu";
import { FaWhatsapp } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Address from "./Address";
import UserSection from "./UserSection";
import Styles from "./Styles.module.css";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import ProductSection from "./ProductSection";
import MegaMenu from "./MegaMenu";

export default async function Header({ user }: { user: User | null }) {
  return (
    <header className={Styles["header-outter-container"]}>
      <div className={Styles["header-submenu"]}>
        <div className={Styles["positioning-container"]}>
          <span className={Styles["header-submenu-item"]}>
            <FaWhatsapp className="text-lg" /> Central de Atendimento:
            &#40;xx&#41; xxxxx-xxxx
          </span>
        </div>
      </div>
      <nav>
        <div className={Styles["positioning-container"]}>
          <div className={Styles["header-nav-grid"]}>
            <HamburgerMenu />
            <Link href="/" className={Styles["header-refrigel-logo"]}>
              <Image
                src="/images/refrigel/logo/refrigel-logo-transparente-1.png"
                alt="Logo da Refrigel"
                fill
                sizes="15vw"
                className={Styles["header-refrigel-logo-image"]}
              />
            </Link>
            <Address />
            <SearchBar />
            <Suspense>
              <UserSection user={user} />
            </Suspense>
          </div>
        </div>
      </nav>
      <ProductSection />
      <MegaMenu />
    </header>
  );
}

export function AuthHeader() {
  // This header to be used on "entrar" and "cadastrar" pages
  return (
    <header className={Styles["auth-header-container"]}>
      {/* <Link href="/">
        <RefrigelLogo color="#e2e8f0" size="40" />
      </Link> */}
      <Link href="/" className={Styles["header-refrigel-logo-auth"]}>
        <Image
          src="/images/refrigel/logo/refrigel-logo-transparente-1.png"
          alt="Logo da Refrigel"
          fill
          sizes="15vw"
          className={Styles["header-refrigel-logo-image"]}
        />
      </Link>
    </header>
  );
}
