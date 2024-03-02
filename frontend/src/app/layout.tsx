import type { Metadata } from "next";
import { Inter, Roboto, Open_Sans, Poppins } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce description",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-theme-01`}>
        <SessionProvider session={session}>
          <div className="flex flex-col justify-between w-full min-h-svh">
            <Header />
            {children}
            <Footer />
            {/* TODO: FooterCompany & FooterShopping are not intended to be in not-found page */}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
