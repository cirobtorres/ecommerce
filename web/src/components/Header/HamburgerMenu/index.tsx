"use client";

import { useState } from "react";
import Styles from "./Styles.module.css";

const HamburgerMenu = () => {
  const [active, isActive] = useState<boolean>(false);

  return (
    <div
      className={Styles["hamb-menu-container"]}
      onClick={() => isActive(!active)}
    >
      <div className={Styles["hamb-menu-wrapper"]}>
        <div
          className={`${Styles["hamb-menu"]} ${active ? Styles["animate"] : ""}`}
        />
      </div>
    </div>
  );
};

export default HamburgerMenu;
