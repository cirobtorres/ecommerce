import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body id="body" className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
