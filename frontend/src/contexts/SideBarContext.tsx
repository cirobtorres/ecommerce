'use client';

import { useState, createContext } from 'react';

type SideBarContextProps = {
  isCollapsed: boolean;
  toggleSideBar: () => void;
}

const SideBarContext = createContext<SideBarContextProps>({
  isCollapsed: false,
  toggleSideBar: () => {},
})

export function SideBarContextProvider(
  { children }: { children: React.ReactNode }
) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSideBar() {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SideBarContext.Provider value={{
      isCollapsed,
      toggleSideBar,
    }}>
      {children}
    </SideBarContext.Provider>
  )
}

export default SideBarContext;
export const SideBarContextConsumer = SideBarContext.Consumer;