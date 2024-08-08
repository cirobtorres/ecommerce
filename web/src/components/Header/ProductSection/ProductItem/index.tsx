"use client";

import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Styles from "./Styles.module.css";

const ProductItems = ({
  title,
  href,
  listItems,
}: {
  title: string;
  href: string;
  listItems: { href: string; title: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className={Styles["product-item-main-li-container"]}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={href} className={Styles["product-item-link"]}>
        {title}
        <IoIosArrowDown
          className={Styles["product-item-arrow-animation"]}
          style={{ transform: isOpen ? "rotate(180deg)" : "" }}
        />
      </Link>
      {isOpen && (
        <div className={Styles["product-item-floating-outter-container"]}>
          <div className={Styles["product-item-floating-inner-container"]}>
            <Link
              href={href}
              className={Styles["product-item-floating-link-heading"]}
            >
              {title}
            </Link>
            <ul className={Styles["product-item-floating-items"]}>
              {listItems.map((item, index) => (
                <li key={index} className={Styles["product-item"]}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const ProductItem = ({ title, href }: { title: string; href: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className={Styles["product-item-main-li-container"]}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={href} className={Styles["product-item-link"]}>
        {title}
      </Link>
    </li>
  );
};

export default ProductItems;
export { ProductItem };
