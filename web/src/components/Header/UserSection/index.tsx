import { FaUser, FaBell, FaShoppingCart } from "react-icons/fa";
import Styles from "./Styles.module.css";

const UserSection = () => {
  return (
    <nav className={Styles["user-nav-container"]}>
      <li>
        <FaUser />
      </li>
      <li>Compras</li>
      {/* <li><FaBell/></li> */}
      <li>
        <FaShoppingCart />
      </li>
    </nav>
  );
};

export default UserSection;
