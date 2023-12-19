"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div
        className={
          "flex h-screen flex-col justify-between bg-theme-01-light-gray"
        }
      >
        <Header />
        <main className="mx-auto h-[svh] w-full min-w-[480px] max-w-[var(--page-max-width)]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
