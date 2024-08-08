"use client";

import { useState, createContext } from "react";

type MegaMenuProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
};

const MegaMenuContext = createContext<MegaMenuProps>({} as MegaMenuProps);

export function MegaMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MegaMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </MegaMenuContext.Provider>
  );
}

export default MegaMenuContext;
export const MegaMenuConsumer = MegaMenuContext.Consumer;
