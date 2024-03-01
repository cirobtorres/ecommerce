import Link from "next/link";

import { IconType } from "react-icons";

type ItemsProps = {
  icon: IconType;
  title: string;
  text: string;
  externalLink?: {
    href: string;
    linkText: string;
  };
}[];

export default function FooterShoppingInfo({ items }: { items: ItemsProps }) {
  return (
    <section className="flex flex-row max-w-webpage mx-auto text-center py-8 [&_h2]:text-xl [&_p]:text-sm [&_a]:text-sm text-theme-03 [&_div]:flex-1 [&_div]:after:p-8 [&_div:not(:last-child)]:after:border-r [&_div:not(:last-child)]:after:border-light-gray [&_div:not(:last-child)]:after:h-4 [&_div]:after:absolute [&_div:not(:last-child)]:after:-right-[0.5rem] [&_div:not(:last-child)]:after:top-1/2 [&_div:not(:last-child)]:after:-translate-y-1/2 [&_*]:selection:bg-theme-07 [&_*]:selection:text-white">
      {items.map(({ icon: Icon, title, text, externalLink }, index) => (
        <div
          key={index}
          className="relative m-2 p-8 flex flex-col gap-3 items-center"
        >
          <Icon size="4rem" className="text-theme-07" />
          <h2>{title}</h2>
          <p>{text}</p>
          {externalLink ? (
            <Link href={externalLink.href} className="hover:text-theme-08">
              {externalLink.linkText}
            </Link>
          ) : null}
        </div>
      ))}
    </section>
  );
}
