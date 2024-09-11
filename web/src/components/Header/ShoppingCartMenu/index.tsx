"use client";

import { IoIosClose } from "react-icons/io";
import useShoppingCartMenu from "@/hooks/useShoppingCartMenu";
import Styles from "./Styles.module.css";

export default function ShoppingCartMenu() {
  const { isOpen, setIsOpen } = useShoppingCartMenu();

  const handleCloseShoppingMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      id="shopping-cart-menu"
      onClick={handleCloseShoppingMenu}
      className={isOpen ? Styles["shopping-cart-enter"] : ""}
    >
      <nav
        className={`${Styles["shopping-cart-menu-container"]} ${isOpen ? Styles["shopping-cart-animation-enter"] : ""}`}
      >
        <div className={`${Styles["shopping-cart-menu-heading"]}`}>
          <h2>
            Carrinho:{" "}
            <span className="before:content-['('] after:content-[')']">0</span>
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <IoIosClose className="text-5xl cursor-pointer transition-transform hover:rotate-90 rounded-full p-1 hover:bg-[#e4e4e4]" />
          </button>
        </div>
      </nav>
    </div>
  );
}
