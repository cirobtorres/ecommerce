"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Items } from "./Items";
import { USER_SIDENAV_ITEMS } from "@/constants/quickSideBarConstants";
import { usePathname } from "next/navigation";

const displayModal = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function QuickSideBar() {
  const [onHover, setOnHover] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (onHover) {
      setOnHover(false);
    }
  }, [pathname]);

  return (
    <>
      {onHover && (
        <motion.div
          initial={false}
          variants={displayModal}
          animate={onHover ? "animate" : "initial"}
          transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.15 }}
          className="z-20 absolute top-0 bottom-0 left-0 right-0 bg-side-bar-transparent"
        />
      )}
      <motion.aside
        initial="initial"
        whileHover="animate"
        onHoverStart={() => setOnHover(true)}
        onHoverEnd={() => setOnHover(false)}
        className="z-30 absolute left-0 top-0 h-full flex flex-col bg-white [&_a:hover]:bg-blue-300 [&_svg]:text-theme-07 [&_svg]:text-2xl group"
      >
        <Items items={USER_SIDENAV_ITEMS} />
      </motion.aside>
    </>
  );
}
