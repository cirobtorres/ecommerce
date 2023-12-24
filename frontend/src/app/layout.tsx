import type { Metadata } from "next";
import { Inter, Roboto, Open_Sans, Poppins } from "next/font/google";
import "@/styles/globals.css";

import LayoutWrapper from "@/components/LayoutWrapper";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pt">
      <SideBarContextProvider>
        <AuthContextProvider>
          <body className={`${inter.className}`}>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </body>
        </AuthContextProvider>
      </SideBarContextProvider>
    </html>
  );
}
