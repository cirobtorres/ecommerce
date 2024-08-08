"use client";

import { useEffect, useRef } from "react";
import useMegaMenu from "../../../hooks/useMegaMenu";
import { IoIosClose } from "react-icons/io";
import Styles from "./Styles.module.css";

export default function MegaMenu() {
  const { isOpen, setIsOpen } = useMegaMenu();
  const menuDivRef = useRef<HTMLDivElement>(null);

  const handleCloseMegaMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.position = "fixed";
  //   } else {
  //     document.body.style.position = "";
  //   }
  // }, [isOpen]);

  return (
    <div
      ref={menuDivRef}
      id="mega-menu"
      className={isOpen ? Styles["mega-menu-enter"] : ""}
      onClick={handleCloseMegaMenu}
    >
      <nav
        className={`${Styles["mega-menu-container"]} ${isOpen ? Styles["mega-menu-animation-enter"] : ""} relative`}
      >
        <IoIosClose
          className="text-5xl absolute top-8 right-8 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      </nav>
    </div>
  );
}
