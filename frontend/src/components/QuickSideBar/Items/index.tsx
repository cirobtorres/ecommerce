import Link from "next/link";
import { motion } from "framer-motion";

const displayQuickSideBar = {
  initial: { width: 0 },
  animate: { width: "24rem" },
};

export const Items = ({ items }: { items: userQuickSideNavItems[] }) => {
  return (
    <>
      {items.map(({ title, href, icon: Icon }, index) => (
        <Link
          href={href}
          key={index}
          className="w-full flex items-center pl-4 py-4 gap-4"
        >
          <Icon />
          <motion.span
            variants={displayQuickSideBar}
            transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.15 }}
            className="whitespace-nowrap overflow-hidden"
          >
            {title}
          </motion.span>
        </Link>
      ))}
    </>
  );
};
