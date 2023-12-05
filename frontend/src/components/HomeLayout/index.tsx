'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useTheme from "@/hooks/useTheme";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  
  const { theme } = useTheme(); // 'dark' or '' (light): requires it to be a client-side rendered component

  return (
    <div className={`${theme}`}>
      <div className={`flex flex-col justify-center h-screen bg-theme-01-light-gray dark:bg-slate-800`}>
        <Header />
          <main className={`w-full h-full max-w-7xl min-w-[480px] mx-auto`}>
            {children}
          </main>
        <Footer />
      </div>
    </div>
  )
}