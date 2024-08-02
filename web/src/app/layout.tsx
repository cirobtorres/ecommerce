import type { Metadata } from "next";
import { Inter, Kanit, Poppins, Roboto, Open_Sans } from "next/font/google";
import "../styles/globals.css";
import Body from "@/components/Body";

const inter = Inter({ subsets: ["latin"] });
// const kanit = Kanit({ subsets: ["latin"], weight: ["500", "700", "900"] });
// const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700", "900"] });
// const roboto = Roboto({ subsets: ["latin"], weight: ["500", "700", "900"] });
// const open_sans = Open_Sans({ subsets: ["latin"], weight: ["500", "800"] });

export const metadata: Metadata = {
  title: "Refrigel",
  description:
    "Uma das lojas de vendas de peças de linha branca mais bem conceituada do sudoeste da Bahia!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} h-svh`}>{children}</body>
    </html>
  );
}
