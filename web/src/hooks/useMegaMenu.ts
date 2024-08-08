import { useContext } from "react";
import MegaMenuContext from "../contexts/MegaMenuContext";

const useMegaMenu = () => useContext(MegaMenuContext);

export default useMegaMenu;
