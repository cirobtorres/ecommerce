"use client";

import { IoClose, IoChevronUpOutline } from "react-icons/io5";
import { SIDENAV_ITEMS } from "@/constants/sideBarConstants";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type SideBarProps = {
  userSubMenu: boolean;
  isCollapsed: boolean;
  toggleUserSubMenu: (value: boolean) => void;
  toggleSideBar: () => void;
};

const displaySideBar = {
  initial: { x: "-100%" },
  animate: { x: "0%" },
};

export default function SideBar({
  userSubMenu,
  isCollapsed,
  toggleUserSubMenu,
  toggleSideBar,
}: SideBarProps) {
  return (
    isCollapsed && (
      <>
        <div
          className="fixed inset-0 z-[999] bg-transparent-side-bar-bg"
          onClick={toggleSideBar}
        />
        <motion.aside
          initial="initial"
          animate={isCollapsed ? "animate" : "initial"}
          variants={displaySideBar}
          transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.25 }} // -> cubic-bezier(0.33, 1, 0.68, 1)
          className="fixed w-80 left-0 top-0 z-[1000] flex h-screen flex-col overflow-hidden whitespace-nowrap bg-theme-01 py-6"
        >
          <div className="relative">
            <CloseSideBarButton toggleSideBar={toggleSideBar} />
            <Avatar />
          </div>
          <MenuItems
            userSubMenu={userSubMenu}
            setUserSubMenu={toggleUserSubMenu}
            items={SIDENAV_ITEMS}
          />
          {/* Expand here */}
          <Link
            href="/"
            className="mx-6 text-center rounded bg-theme-07 p-4 font-bold uppercase text-theme-01 hover:shadow-bright"
            // onClick={toggleSideBar}
          >
            Login
          </Link>
          <Link
            href="/"
            className="mx-6 text-center text p-4 font-bold uppercase text-theme-07"
          >
            Cadastrar
          </Link>
        </motion.aside>
      </>
    )
  );
}

const CloseSideBarButton = ({
  toggleSideBar,
}: {
  toggleSideBar: () => void;
}) => {
  return (
    <button
      onClick={toggleSideBar}
      className="absolute left-auto right-6 top-1/2 flex -translate-y-1/2 items-center rounded bg-theme-07 p-2 hover:shadow-bright"
    >
      <IoClose size="1.25rem" />
    </button>
  );
};

const Avatar = () => {
  return (
    <div className="mx-6 flex w-fit flex-row items-center gap-4">
      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-theme-05 bg-theme-01">
        <Link href="/">
          <Image
            src="/images/user-not-signed-in/1281x1281-user-icon.png"
            alt="User profile picture"
            fill
            sizes="(max-width:768px)100%|8rem"
            priority
            className="object-cover"
          />
        </Link>
      </div>
      <Link href="/">
        <span className="text-theme-05 hover:underline">Olá Fulano</span>
      </Link>
    </div>
  );
};

type MenuItemsProps = {
  items: UserSideBarItemsProps[];
  userSubMenu: boolean;
  setUserSubMenu: (value: boolean) => void;
};

const chevronVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

const borderVariants = {
  open: {
    height: "auto",
    transition: {
      staggerChildren: 0.0,
      delayChildren: 0,
    },
  },
  closed: {
    height: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const submenuVariants = {
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const MenuItems = ({ items, userSubMenu, setUserSubMenu }: MenuItemsProps) => {
  return (
    items.length > 0 && (
      <div className="my-6 h-full overflow-auto px-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        {items.map(
          (
            { title, href, icon: Icon, submenu, subMenuItems, separation },
            index
          ) => (
            <>
              <ul>
                <li
                  key={index}
                  className="flex flex-col items-center gap-2 text-sm text-theme-05"
                >
                  {submenu ? (
                    <div className="w-full">
                      <motion.summary
                        initial="open"
                        animate={userSubMenu ? "open" : "closed"}
                        onClick={() => setUserSubMenu(!userSubMenu)}
                        className="flex w-full flex-row gap-4 whitespace-nowrap p-2 rounded-md hover:bg-theme-07 hover:text-theme-01 cursor-pointer"
                      >
                        <Icon size="1.25rem" /> {title}
                        <motion.span
                          variants={chevronVariants}
                          transition={{ ease: "easeInOut", duration: 0.15 }}
                        >
                          <IoChevronUpOutline size="1.25rem" />
                        </motion.span>
                      </motion.summary>
                      {userSubMenu && submenu && (
                        <motion.div
                          initial="closed"
                          animate={userSubMenu ? "open" : "closed"}
                          variants={borderVariants}
                          className="flex items-center top-full left-0 ms-4 my-3 ps-4 border-l border-border-light before:border-l overflow-hidden"
                        >
                          <motion.ul className="w-full">
                            {subMenuItems?.map(
                              ({ title, href, icon: Icon }, index) => (
                                <motion.li
                                  key={index}
                                  variants={submenuVariants}
                                  className="flex w-full items-center gap-2 text-sm text-theme-05"
                                >
                                  <Link
                                    href={href}
                                    className="flex w-full flex-row gap-4 whitespace-nowrap p-2 rounded-md hover:bg-theme-07 hover:text-theme-01"
                                  >
                                    <Icon size="1.25rem" />
                                    {title}
                                  </Link>
                                </motion.li>
                              )
                            )}
                          </motion.ul>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={href}
                      className="flex w-full flex-row gap-4 whitespace-nowrap p-2 rounded-md hover:bg-theme-07 hover:text-theme-01"
                    >
                      <Icon size="1.25rem" /> {title}
                    </Link>
                  )}
                </li>
              </ul>
              {separation && <hr className={"my-1 border-border-light"} />}
            </>
          )
        )}
      </div>
    )
  );
};
