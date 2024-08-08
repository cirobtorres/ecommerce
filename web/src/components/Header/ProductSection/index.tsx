import ProductItems, { ProductItem } from "./ProductItem";
import Styles from "./Styles.module.css";

const airConditioning = [
  {
    href: "/",
    title: "Ar condicionado split",
  },
  {
    href: "/",
    title: "Ar condicionado split inverter",
  },
  {
    href: "/",
    title: "Ar condicionado de janela",
  },
  {
    href: "/",
    title: "Ar condicionado split piso teto",
  },
];

const cooker = [
  {
    href: "/",
    title: "4 bocas",
  },
  {
    href: "/",
    title: "5 bocas",
  },
  {
    href: "/",
    title: "6 bocas",
  },
];

const washer = [
  {
    href: "/",
    title: "9 kg",
  },
  {
    href: "/",
    title: "12 kg",
  },
  {
    href: "/",
    title: "14 kg",
  },
  {
    href: "/",
    title: "15 kg",
  },
];

const ProductSection = () => {
  return (
    <nav className={Styles["products-main-container"]}>
      <div className={Styles["positioning-container"]}>
        <ul className={Styles["products-list-container"]}>
          <ProductItems
            href="/"
            title="Ar Condicionado"
            listItems={airConditioning}
          />
          <ProductItems href="/" title="Fogão" listItems={cooker} />
          <ProductItems href="/" title="Lavadora" listItems={washer} />
          <ProductItem href="/" title="Kits de Instalação" />
          <ProductItem href="/" title="Peças" />
        </ul>
      </div>
    </nav>
  );
};

export default ProductSection;
