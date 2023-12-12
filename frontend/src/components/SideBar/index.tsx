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
}

type UserSideBarItemsProps = {
  name: string;
  href: string;
  icon: any;
}

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
		<div className={`${isCollapsed ? "fixed inset-0 bg-theme-01-light-gray/10 z-[999]" : ""}`} onClick={handleClose} >
			<aside className={`
        flex flex-col overflow-hidden fixed
        left-0 top-0 h-screen opacity-100
        z-[1000] py-6 bg-stone-800 
        transition-all whitespace-nowrap 
        ${isCollapsed ? "w-80" : "w-0"}
      `}>
				<div className="relative">
					<button onClick={toggle} className={`
						absolute flex items-center rounded p-2
						top-1/2 -translate-y-1/2 right-6 left-auto 
						bg-theme-07-dark-blue hover:shadow-bright
					`} >
						<IoClose size="1.25rem" />
					</button>
					<div className={"flex flex-row items-center gap-4 mx-6 w-fit"}>
						<div className={"relative w-8 h-8 rounded-full border-2 overflow-hidden bg-white"}>
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
						<Link href="/"><span className={"hover:underline"}>Olá Fulano</span></Link>
					</div>
				</div>
				<div className={`
					h-full my-6 px-6 overflow-auto scrollbar-thin 
					scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
					scrollbar-thumb-gray-900 scrollbar-track-gray-100
				`}>
					{userSideBarItems.length > 0 && (
						<ul>
							{
								userSideBarItems.map(({ name, href, icon: Icon }, index) => (
									<li key={index} className={`
                    flex items-center gap-2 rounded-md 
                    text-sm text-white hover:bg-stone-700 
                  `}>
										<Link href={href} className={"flex flex-row gap-4 p-2 w-full whitespace-nowrap"}>
											<Icon size="1.25rem" /> {name}
										</Link>
									</li>
								))
							}
						</ul>)}
					<hr className={"my-4"} />
					{/* Expand here */}
				</div>
				<button 
					className={`
            mx-6 p-4 rounded uppercase font-bold 
            text-theme-01-light-gray bg-theme-07-dark-blue 
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
