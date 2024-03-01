import Link from "next/link";
import { LuCopyright } from "react-icons/lu";

const fullName = "Venda de Peças no Varejo LTDA ME";
const cnpj = "01.123.456/0001-78";
const address = "Rua dos Bobos, 16 - São Paulo/SP - 85001-650";

const temporaryArray = [
  {
    href: "/",
    text: "Trabalhe Conosco",
  },
  {
    href: "/",
    text: "Termos e Condições",
  },
  {
    href: "/",
    text: "Privacidade",
  },
  {
    href: "/",
    text: "Accessibilidade",
  },
  {
    href: "/",
    text: "Contato",
  },
];

export default function FooterCopyright() {
  return (
    <section className="h-20 flex flex-col justify-start text-sm text-theme-05 border-t border-light-gray py-2">
      <nav className="mx-auto mb-1 max-w-webpage">
        <ul className="flex flex-row gap-8 text-xs">
          {temporaryArray.map(({ href, text }, index) => (
            <li key={index}>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mx-auto flex flex-col items-center">
        <small className="inline-flex items-center text-theme-02 gap-1">
          Copyright <LuCopyright />{" "}
          {new Date().getFullYear() === 2024
            ? "2024"
            : `2024-${new Date().getFullYear()}`}{" "}
          <strong>{fullName}</strong>
        </small>
        <small className="inline-flex items-center text-theme-02 gap-1">
          CNPJ: {cnpj} / {address}
        </small>
      </div>
    </section>
  );
}
