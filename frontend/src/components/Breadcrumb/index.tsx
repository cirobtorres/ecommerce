import Link from "next/link";

import { MdChevronRight } from "react-icons/md";

export default function Breadcrumbs(params: any) {
  return (
    <div className="py-4 mb-6 border-b border-light-gray">
      <div className="flex mx-auto w-full max-w-webpage">
        {params.category ? (
          <span>
            <b>Você pesquisou por: </b>
            {params.category}
          </span>
        ) : (
          <>
            <span className="font-bold">Você está em:</span>
            <Link href="/" className="ml-1 hover:text-theme-08">
              Home
            </Link>
            {Object.values(params).map((item: any, index: number) => (
              <span key={index} className="flex items-center">
                <MdChevronRight size="1.25rem" />
                <Link href="/" className="hover:text-theme-08">
                  {item}
                </Link>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
