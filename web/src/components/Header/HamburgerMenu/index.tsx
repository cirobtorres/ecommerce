"use client";

import useMegaMenu from "../../../hooks/useMegaMenu";
import Styles from "./Styles.module.css";

const HamburgerMenu = () => {
  const { isOpen, setIsOpen } = useMegaMenu();

  return (
    <div
      className={Styles["hamb-menu-container"]}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={Styles["hamb-menu-wrapper"]}>
        <div
          className={`${Styles["hamb-menu"]} ${isOpen ? Styles["animate"] : ""}`}
        />
      </div>
    </div>
  );
};

export default HamburgerMenu;
