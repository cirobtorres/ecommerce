import Styles from "./Styles.module.css";

const ProductSection = () => {
  return (
    <nav className={Styles["products-main-container"]}>
      <div className={Styles["positioning-container"]}>
        <ul className={Styles["products-list-container"]}>
          <li>Ar Condicionado</li>
          <li>Refrigerador</li>
          <li>Kits de Instalação</li>
          <li>Peças</li>
        </ul>
      </div>
    </nav>
  );
};

export default ProductSection;
