import { FaUser, FaBell, FaShoppingCart } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import Styles from "./Styles.module.css";
import Link from "next/link";

const UserSection = () => {
  return (
    <nav className={Styles["user-nav-container"]}>
      <li>
        <div className={Styles["user-nav-auth-container"]}>
          <FaUser />
          <div className={Styles["user-nav-auth-subcontainer"]}>
            <span>
              Fazer <Link href="/entrar">login</Link>
            </span>
            <span>
              Criar <Link href="/cadastrar">cadastro</Link>
            </span>
          </div>
        </div>
      </li>
      {/* <li>
        <MdLocalShipping />
      </li>
      <li>
        <GoHeartFill />
      </li> */}
      <li>
        <IoIosCall /> <span>Central de atendimento</span>
      </li>
      <li>
        <FaShoppingCart />
      </li>
    </nav>
  );
};

export default UserSection;
