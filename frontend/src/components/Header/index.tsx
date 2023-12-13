import Link from "next/link";

import useTheme from "@/hooks/useTheme";
import { IoHeart, IoCartSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaMagnifyingGlass } from "react-icons/fa6";
import ThemeSwitcher from "../ThemeSwitcher";
import SideBar from "../SideBar";
import useSideBar from "@/hooks/useSideBar";

export default function Header() {
	const { toggleSideBar } = useSideBar();
	const theme = useTheme();

	return (
		<header className={"text-white bg-theme-03-medium-gray"}>
			<div className={"h-8 bg-theme-04-medium-gray"}></div>
			<SideBar toggle={toggleSideBar} />
			<div className={"grid grid-cols-12 h-16 max-w-[var(--page-max-width)] mx-auto gap-4"}>
				<div className={"flex flex-row items-center justify-center gap-4 col-span-8"}>
					<GiHamburgerMenu size='2rem' onClick={toggleSideBar} className={"cursor-pointer"} />
					<Link href='/'>
						<div>Logo</div>
					</Link>
					<div className={"w-full bg-theme-01-light-gray h-full"}>
						<form className={"relative flex flex-row w-full h-full"}>
							<button className={"absolute top-1/2 left-4 -translate-y-1/2 text-theme-07-dark-blue"}>
								<FaMagnifyingGlass />
							</button>
							<input type='text' placeholder='Search' className={"w-full h-full py-4 px-12 bg-transparent"} />
						</form>
					</div>
				</div>
				<div className={"flex flex-row items-center col-span-4 gap-4 text-xs h-full"}>
					<div className={"flex flex-row items-center h-full gap-1 flex-2"}>
						<FaUser size='1.25rem' />
						<div className={"flex flex-col justify-center items-start h-full gap-1 flex-[2_2_0%]"}>
							<Link href='/login' className={"hover:underline"}>Entrar</Link>
							<Link href='/register' className={"hover:underline"}>Crie sua conta</Link>
						</div>
					</div>
					<Link href='/' className={"flex items-center h-full gap-1 flex-1 justify-center px-2"} title='Favoritos'>
						<IoHeart size='1.25rem' /> Favoritos
					</Link>
					<Link href='/' className={"flex items-center h-full gap-1 flex-1 justify-center px-2"} title='Carrinho'>
						<IoCartSharp size='1.25rem' /> Carrinho
					</Link>
					<ThemeSwitcher onClick={theme.alternateTheme} />
				</div>
			</div>
			<div className={"h-12 bg-theme-02-light-gray"}>
				<ul className={"flex flex-row h-full gap-4 max-w-7xl mx-auto"}>
					<li><Link href='/' className={"flex items-center h-full"} title='Departamentos'>Departamentos</Link></li>
					<li><Link href='/' className={"flex items-center h-full"} title='Geladeiras'>Geladeiras</Link></li>
					<li><Link href='/' className={"flex items-center h-full"} title='Lavadoras'>Lavadoras</Link></li>
					<li><Link href='/' className={"flex items-center h-full"} title='Fogões'>Fogões</Link></li>
					<li><Link href='/' className={"flex items-center h-full"} title='Freezers'>Freezers</Link></li>
					<li><Link href='/' className={"flex items-center h-full"} title='Peças'>Peças</Link></li>
				</ul>
			</div>
		</header>
	);
}