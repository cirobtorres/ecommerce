"use client";

import useProductsMenu from "../../../../hooks/useProductsMenu";

export default function ProductSectionFocusBg() {
  const { productItemIsOpen } = useProductsMenu();
  return (
    <div
      className={`fixed inset-0 bg-black/25 transition-opacity duration-200 ${productItemIsOpen ? "opacity-100" : "opacity-0"}`}
    />
  );
}
