"use client";

import Link from "next/link";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { IoChevronUpOutline } from "react-icons/io5";

const chevronVariants = {
  close: { rotate: 0 },
  open: { rotate: 180 },
};

const bodyVariants = {
  close: {
    height: 0,
  },
  open: {
    height: "auto",
  },
};

export default function FooterCompanyInfo({
  items,
}: {
  items: FooterCompanyItemsProps[];
}) {
  const [subMenu, setSubMenu] = useState(false);

  return (
    <AnimatePresence>
      <motion.section
        initial="close"
        variants={bodyVariants}
        animate={subMenu ? "open" : "close"}
        className="relative bg-very-light-gray"
      >
        <button
          className={`absolute bottom-full [transform:translate(-50%,1px)] left-1/2 -translate-x-1/2 inline-flex items-center gap-1 py-2 px-4 border border-b-0 border-light-gray rounded-t text-sm text-theme-03 duration-150 ${
            subMenu ? "bg-very-light-gray" : "bg-white"
          }`}
          onClick={() => setSubMenu(!subMenu)}
        >
          Mais Informações{" "}
          <motion.span
            variants={chevronVariants}
            transition={{ duration: 0.15 }}
          >
            <IoChevronUpOutline size="1.25rem" />
          </motion.span>
        </button>
        <FooterCompanyGrid items={items} />
      </motion.section>
    </AnimatePresence>
  );
}

export const FooterCompanyGrid = ({ items }: FooterCompanyGridProps) => {
  return (
    <article className="w-full mx-auto h-full border-t border-light-gray overflow-hidden">
      <div className="mx-80 grid grid-cols grid-cols-6 gap-20 p-8">
        {items.map(({ title, items }, index) => (
          <FooterCompanyItems key={index} title={title} items={items} />
        ))}
      </div>
    </article>
  );
};

export const FooterCompanyItems = ({
  title,
  items,
}: FooterCompanyItemsProps) => {
  return (
    <div>
      <h3 className="text-sm mb-4">{title}</h3>
      <ul className="text-sm text-theme-03">
        {items.map(({ href, text }, index) => (
          <li key={index} className="w-fit h-6">
            <Link href={href} className="hover:underline">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
