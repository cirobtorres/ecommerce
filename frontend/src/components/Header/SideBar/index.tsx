import { IoClose, IoChevronUpOutline } from "react-icons/io5";
import { SIDENAV_ITEMS } from "@/constants/sideBarConstants";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

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
          className="fixed inset-0 z-[999] bg-side-bar-transparent"
          onClick={toggleSideBar}
        />
        <motion.aside
          initial="initial"
          animate={isCollapsed ? "animate" : "initial"}
          variants={displaySideBar}
          transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.25 }} // -> cubic-bezier(0.33, 1, 0.68, 1)
          className="fixed w-80 left-0 top-0 z-[1000] flex h-screen flex-col overflow-hidden whitespace-nowrap bg-side-bar py-6"
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
          <SignInSignUp closeSideBar={toggleSideBar} />
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
      className="absolute left-auto right-6 top-1/2 flex -translate-y-1/2 items-center rounded bg-theme-08 p-2 hover:shadow-bright"
    >
      <IoClose size="1.25rem" />
    </button>
  );
};

const Avatar = () => {
  const { data: session } = useSession();
  return (
    <div className="mx-6 flex w-fit flex-row items-center gap-4">
      {session?.user?.name ? (
        <>
          <div className="overflow-hidden rounded-full border-2 border-theme-01 bg-theme-01">
            <Link href="/">
              <Image
                src={
                  session.user.image ??
                  "/images/user-not-signed-in/1281x1281-user-icon.png"
                }
                alt="User profile picture"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <Link href="/">
            <span className="text-2xl text-theme-01 hover:underline">
              <strong>{session?.user.name}</strong>
            </span>
          </Link>
        </>
      ) : (
        <>
          <div className="overflow-hidden rounded-full border-2 border-theme-01 bg-theme-01">
            <Link href="/">
              <Image
                src="/images/user-not-signed-in/1281x1281-user-icon.png"
                alt="User profile picture"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <span className="text-2xl text-theme-01">Visitante</span>
        </>
      )}
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

const containerVariants = {
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
                  className="flex flex-col items-center gap-2 text-sm text-theme-01"
                >
                  {submenu ? (
                    <div className="w-full">
                      <motion.summary
                        initial="open"
                        animate={userSubMenu ? "open" : "closed"}
                        onClick={() => setUserSubMenu(!userSubMenu)}
                        className="flex w-full flex-row gap-4 whitespace-nowrap p-2 rounded-md cursor-pointer"
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
                          variants={containerVariants}
                          className="flex items-center top-full left-0 ms-4 my-3 ps-4 border-l border-theme-02 before:border-l overflow-hidden"
                        >
                          <motion.ul className="w-full">
                            {subMenuItems?.map(
                              ({ title, href, icon: Icon }, index) => (
                                <motion.li
                                  key={index}
                                  variants={submenuVariants}
                                  className="flex w-full items-center gap-2 text-sm text-theme-01"
                                >
                                  <Link
                                    href={href}
                                    className="flex w-full flex-row gap-4 whitespace-nowrap p-2 rounded-md"
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
                      className="flex w-full flex-row gap-4 whitespace-nowrap p-2 rounded-md"
                    >
                      <Icon size="1.25rem" /> {title}
                    </Link>
                  )}
                </li>
              </ul>
              {separation && <hr className={"my-1 border-theme-02"} />}
            </>
          )
        )}
      </div>
    )
  );
};

const SignInSignUp = ({ closeSideBar }: { closeSideBar: () => void }) => {
  return (
    <>
      <Link
        href="/login"
        className="mx-6 text-xl text-center rounded bg-theme-08 p-4 font-bold uppercase text-theme-01 hover:shadow-bright"
        onClick={closeSideBar}
      >
        Login
      </Link>
      <Link
        href="/register"
        className="mx-6 text-xl text-center text p-4 font-bold uppercase text-theme-01"
        onClick={closeSideBar}
      >
        Cadastrar
      </Link>
    </>
  );
};
