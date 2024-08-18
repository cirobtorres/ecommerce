import GoogleMapsIcon from "@/icons/googleMaps";
import { RefrigelUser } from "../../../types/user-types";
import styles from "./Styles.module.css";

const Address = ({ user }: { user: RefrigelUser | null }) => {
  const defaultAddress = user?.refrigel_users.address.filter(
    (address) => address.is_default
  )[0];
  return (
    <button type="button" className={styles["address-button"]}>
      {defaultAddress && (
        <div className={styles["address-main-container"]}>
          <GoogleMapsIcon />
          <div className={styles["address-info-container"]}>
            <span>
              Enviar para{" "}
              {user?.refrigel_users.user_type === "F"
                ? user?.refrigel_users.display_name
                : null}{" "}
              {/* user?.refrigel_users.company_data.brand_name */}
            </span>
            <span>
              <b>
                {defaultAddress.street}, {defaultAddress.number} -{" "}
                {defaultAddress.district}, {defaultAddress.city} -{" "}
                {defaultAddress.uf}
              </b>{" "}
              BR-480, 3100D - Palmital, Chapecó - SC, 89801-973
            </span>
          </div>
        </div>
      )}
      {/* {!defaultAddress && (
        <div>
          <h2>Crie um endereço</h2>
        </div>
      )} */}
    </button>
  );
};

export default Address;
