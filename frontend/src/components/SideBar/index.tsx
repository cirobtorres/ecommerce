import { IoHome, IoHeart, IoCartSharp, IoClose } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import Link from "next/link";
import useSideBar from "@/hooks/useSideBar";
import Image from "next/image";
import { MouseEvent } from "react";

type SideBarProps = {
  toggle: () => void;
};

type UserSideBarItemsProps = {
  name: string;
  href: string;
  icon: any;
};

const userSideBarItems: UserSideBarItemsProps[] = [
  {
    name: "Home",
    href: "/",
    icon: IoHome,
  },
  {
    name: "Minha conta",
    href: "/",
    icon: FaUser,
  },
  {
    name: "Meus dados",
    href: "/",
    icon: FaClipboardList,
  },
  {
    name: "Favoritos",
    href: "/",
    icon: IoHeart,
  },
  {
    name: "Carrinho",
    href: "/",
    icon: IoCartSharp,
  },
  {
    name: "Meus Pedidos",
    href: "/",
    icon: MdLocalShipping,
  },
  {
    name: "Avaliações",
    href: "/",
    icon: AiFillLike,
  },
];

export default function SideBar({ toggle }: SideBarProps) {
  const { isCollapsed } = useSideBar();

  const handleClose = (event: MouseEvent) => {
    // Prevents the closing of the sidebar when clicking on the sidebar itself
    if (event.target !== event.currentTarget) return;
    toggle();
  };

  return (
    <div
      className={`${
        isCollapsed ? "fixed inset-0 z-[999] bg-theme-05-dark-gray/50" : ""
      }`}
      onClick={handleClose}
    >
      <aside
        className={`
        fixed left-0 top-0 z-[1000]
        flex h-screen flex-col overflow-hidden
        whitespace-nowrap bg-theme-01-light-gray py-6 
        opacity-100 transition-all 
        ${isCollapsed ? "w-[var(--side-bar-width)]" : "w-0"}
      `}
      >
        <div className="relative">
          <button
            onClick={toggle}
            className={`
						absolute left-auto right-6 top-1/2 flex
						-translate-y-1/2 items-center rounded bg-theme-07-dark-blue 
						p-2 hover:shadow-bright
					`}
          >
            <IoClose size="1.25rem" />
          </button>
          <div className={"mx-6 flex w-fit flex-row items-center gap-4"}>
            <div
              className={
                "relative h-8 w-8 overflow-hidden rounded-full border-2 border-theme-05-dark-gray bg-theme-01-light-gray"
              }
            >
              <Link href="/">
                <Image
                  src="/images/user-not-signed-in/1281x1281-user-icon.png"
                  alt="User profile picture"
                  fill
                  sizes="100%"
                  priority
                  className={"object-cover"}
                />
              </Link>
            </div>
            <Link href="/">
              <span className={"text-theme-05-dark-gray hover:underline"}>
                Olá Fulano
              </span>
            </Link>
          </div>
        </div>
        <div
          className={`
					my-6 h-full overflow-auto px-6 scrollbar-thin 
					scrollbar-track-gray-100 scrollbar-thumb-gray-900 
					scrollbar-track-rounded-full scrollbar-thumb-rounded-full
				`}
        >
          {userSideBarItems.length > 0 && (
            <ul>
              {userSideBarItems.map(({ name, href, icon: Icon }, index) => (
                <li
                  key={index}
                  className={`
                    flex items-center gap-2 rounded-md 
                    text-sm text-theme-05-dark-gray hover:bg-theme-07-dark-blue hover:text-theme-01-light-gray 
                  `}
                >
                  <Link
                    href={href}
                    className={
                      "flex w-full flex-row gap-4 whitespace-nowrap p-2"
                    }
                  >
                    <Icon size="1.25rem" /> {name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <hr className={"my-4"} />
          {/* Expand here */}
        </div>
        <button
          className={`
            mx-6 rounded bg-theme-07-dark-blue p-4 font-bold 
            uppercase text-theme-01-light-gray 
            hover:shadow-bright
          `}
          onClick={toggle}
        >
          Fechar
        </button>
      </aside>
    </div>
  );
}
