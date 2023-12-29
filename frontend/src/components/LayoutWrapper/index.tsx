"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex min-h-screen flex-col justify-between bg-theme-01">
        <Header />
        <main className="mx-auto w-full min-w-[480px]">{children}</main>
        {/* max-w-webpage */}
        <Footer />
      </div>
    </div>
  );
}
