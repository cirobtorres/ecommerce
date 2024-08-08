import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Styles.module.css";
import GoogleMapsIcon from "@/icons/googleMaps";

const Address = () => {
  return (
    <button type="button" className={styles["address-button"]}>
      <div className={styles["address-main-container"]}>
        <GoogleMapsIcon />
        {/* <FaMapMarkerAlt className="flex-shrink-0 text-2xl text-red-500" /> */}
        <div className={styles["address-info-container"]}>
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
