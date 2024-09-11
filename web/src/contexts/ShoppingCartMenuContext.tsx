"use client";

import { useState, createContext } from "react";

type ShoppingCartMenuProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
};

const ShoppingCartMenuContext = createContext<ShoppingCartMenuProps>(
  {} as ShoppingCartMenuProps
);

export function ShoppingCartMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ShoppingCartMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ShoppingCartMenuContext.Provider>
  );
}

export default ShoppingCartMenuContext;
export const ShoppingCartMenuConsumer = ShoppingCartMenuContext.Consumer;
