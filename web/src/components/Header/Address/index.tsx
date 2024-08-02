import { FaMapMarkerAlt } from "react-icons/fa";
import Styles from "./Styles.module.css";

const Address = () => {
  return (
    <button type="button">
      <div className={Styles["address-main-container"]}>
        <FaMapMarkerAlt className="flex-shrink-0 text-2xl text-red-500" />
        <div className={Styles["address-info-container"]}>
          <span>Enviar para Posto Ipiranga</span>
          <span>
            <b>BR-480, 3100D - Palmital, Chapecó - SC, 89801-973</b>
          </span>
        </div>
      </div>
    </button>
  );
};

export default Address;
