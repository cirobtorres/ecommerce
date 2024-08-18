import { useContext } from "react";
import ProductsMenuContext from "../contexts/ProductsMenuContext";

const useProductsMenu = () => useContext(ProductsMenuContext);

export default useProductsMenu;
