"use client";

import useShoppingCartMenu from "@/hooks/useShoppingCartMenu";
import { FaShoppingCart } from "react-icons/fa";

export default function ShoppingCartButton() {
  const { isOpen, setIsOpen } = useShoppingCartMenu();
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      <FaShoppingCart />
    </button>
  );
}
