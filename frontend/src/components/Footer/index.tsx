"use client";

import { usePathname } from "next/navigation";

import FooterShoppingInfo from "./FooterShoppingInfo";
import FooterCompanyInfo from "./FooterCompanyInfo";
import FooterCopyright from "./FooterCopyright";

import { FOOTER_SHOPPING } from "@/constants/footerShoppingConstants"; // TODO: delete me when I'm done
import { FOOTER_COMPANY } from "@/constants/footerCompanyConstants"; // TODO: delete me when I'm done

export default function FooterBody() {
  const pathname = usePathname();
  return (
    <footer className="bg-white">
      {pathname.match(/\/./) ? null : (
        <>
          <FooterShoppingInfo items={FOOTER_SHOPPING} />
        </>
      )}
      <FooterCompanyInfo items={FOOTER_COMPANY} />
      <FooterCopyright />
    </footer>
  );
}
