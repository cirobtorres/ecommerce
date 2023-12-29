import Link from "next/link";

import { motion } from "framer-motion";

import { BiSolidChevronRight } from "react-icons/bi";

import { MEGA_MENU_ITEMS } from "@/constants/megaMenuConstants";

export default function MegaMenu() {
  console.log("Renderizou");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.2 }}
      className="z-20 absolute w-full top-full left-0 bg-border-light text-theme-03 text-start"
    >
      <motion.ul
        initial={{ x: 0 }}
        animate={{ x: "1%" }}
        transition={{ ease: "easeIn", duration: 0.2 }}
        className="max-w-webpage mx-auto"
      >
        <div className="grid grid-cols-mega-menu [&_li]:p-3 [&_li_li]:py-3 [&_li_li]mr-3 [&_li_li:not(:first-child):not(:last-child)]:border-b-theme-01 [&_li_li:not(:first-child):not(:last-child)]:border-b">
          {MEGA_MENU_ITEMS.map((item, idx) => (
            <GridElements
              key={idx}
              title={item.title as string}
              icon={item.icon}
              listProps={item.subElements}
            />
          ))}
        </div>
      </motion.ul>
    </motion.div>
  );
}

type GridElementsProps = {
  title: string;
  icon?: any;
  listProps: {
    text: string;
    href: string;
  }[];
};

const GridElements = ({ title, icon: Icon, listProps }: GridElementsProps) => {
  return (
    <li>
      <div>
        <div className="flex h-12">
          <span className="flex items-center gap-1 whitespace-nowrap">
            {Icon && <Icon fill="var(--theme-07)" size="2rem" />}
            Para <b>{title}</b>
          </span>
        </div>
        {listProps.map((item, idx) => (
          <ListComponent key={idx} text={item.text} href={item.href} />
        ))}
      </div>
    </li>
  );
};

const moveOnHover = {
  initial: { x: 0 },
  animate: { x: "3%" },
};

const chevronHover = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const ListComponent = ({ text, href }: { text: string; href: string }) => {
  return (
    <li>
      <motion.div
        initial="initial"
        animate="initial"
        whileHover="animate"
        className="flex justify-between items-center hover:font-bold hover:text-theme-07"
        variants={moveOnHover}
        transition={{ ease: "easeInOut", duration: 0.15 }}
      >
        <Link href={href} className="w-full">
          {text}
        </Link>
        <motion.div variants={chevronHover}>
          <BiSolidChevronRight fill="var(--theme-07)" size="1.25rem" />
        </motion.div>
      </motion.div>
    </li>
  );
};
