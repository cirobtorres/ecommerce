import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RefrigelUser } from "@/types/user-types";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./SearchBar";
import Address from "./Address";
import UserSection from "./UserSection";
import ProductSection from "./ProductSection";
import MegaMenu from "./MegaMenu";
import ProductSectionFocusBg from "./ProductSection/ProductSectionFocusBg";
import Styles from "./Styles.module.css";
import ShoppingCartMenu from "./ShoppingCartMenu";

export default async function Header({ user }: { user: RefrigelUser | null }) {
  return (
    <>
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
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={Styles["header-refrigel-logo-image"]}
                />
              </Link>
              <Address user={user} />
              <SearchBar />
              <Suspense>
                <UserSection user={user} />
              </Suspense>
            </div>
          </div>
        </nav>
        <ProductSection />
        <MegaMenu user={user} />
        <ShoppingCartMenu />
      </header>
      <ProductSectionFocusBg />
    </>
  );
}

export function AuthHeader() {
  // This header is meant to be used on "entrar" and "cadastrar" pages
  return (
    <header className="w-full h-24 flex items-center justify-center bg-[#41689c]">
      <Link href="/" className="relative w-80 h-2/3">
        <Image
          src="/images/refrigel/logo/refrigel-logo-transparente-1.png"
          alt="Logo da Refrigel"
          fill
          sizes="300px"
          className="absolute object-contain"
        />
      </Link>
    </header>
  );
}
