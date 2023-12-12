import type { Metadata } from "next";
import { Inter, Roboto, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";

import HomeLayout from "@/components/HomeLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { SideBarContextProvider } from "@/contexts/SideBarContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "E-commerce",
	description: "E-commerce description",
};

export default function RootLayout ({
	children
}: {
  children: React.ReactNode
}): JSX.Element {
	return (
		<html lang='pt'>
			<SideBarContextProvider>
				<ThemeProvider>
					<AuthContextProvider>
						<body className={`${poppins.className}`}>
							<HomeLayout>
								{children}
							</HomeLayout>
						</body>
					</AuthContextProvider>
				</ThemeProvider>
			</SideBarContextProvider>
		</html>
	);
}
