import { FaRegCreditCard, FaShippingFast } from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";

export const FOOTER_SHOPPING = [
  {
    icon: FaRegCreditCard,
    title: "Escolha como pagar",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, dignissimos quidem? Nostrum, perferendis? Exercitationem numquam commodi eius molestias! Pariatur, quibusdam?",
  },
  {
    icon: FaShippingFast,
    title: "Frete grátis a partir de R$ 100,00",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam similique, ab quisquam est beatae voluptates porro cum, esse nobis veniam error exercitationem. Voluptates quasi voluptas vel eius, a error neque aut placeat.",
    externalLink: {
      href: "/",
      linkText: "Termos e condições",
    },
  },
  {
    icon: MdOutlineSecurityUpdateGood,
    title: "Segurança, do início ao fim",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque iusto officiis expedita possimus dignissimos autem, aliquid tempora? Eum eaque, porro expedita rem qui tempora laborum, reprehenderit debitis totam minima in suscipit voluptas dolore iure vel eos quod odio soluta obcaecati fuga impedit a. Quia consequatur, eum sint animi fugiat voluptate.",
    externalLink: {
      href: "/",
      linkText: "Política de proteção de dados",
    },
  },
];
