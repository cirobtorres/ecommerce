import { useContext } from "react";
import ShoppingCartMenuContext from "@/contexts/ShoppingCartMenuContext";

const useShoppingCartMenu = () => useContext(ShoppingCartMenuContext);

export default useShoppingCartMenu;
