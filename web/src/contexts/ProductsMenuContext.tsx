"use client";

import { useState, createContext } from "react";

type ProductsMenuProps = {
  productItemIsOpen: boolean;
  setProductItemIsOpen: (bool: boolean) => void;
};

const ProductsMenuContext = createContext<ProductsMenuProps>(
  {} as ProductsMenuProps
);

export function ProductsMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productItemIsOpen, setProductItemIsOpen] = useState(false);

  return (
    <ProductsMenuContext.Provider
      value={{
        productItemIsOpen,
        setProductItemIsOpen,
      }}
    >
      {children}
    </ProductsMenuContext.Provider>
  );
}

export default ProductsMenuContext;
export const ProductsMenuConsumer = ProductsMenuContext.Consumer;
