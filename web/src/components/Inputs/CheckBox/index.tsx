import { FaCheck } from "react-icons/fa";
import Styles from "./Styles.module.css";

const CheckBox = ({
  children,
  id,
  value,
}: {
  children: React.ReactNode;
  id: string;
  value: string;
}) => {
  return (
    <div className={Styles["checkbox-main-container"]}>
      <input
        id={id}
        name={id}
        value={value}
        type="checkbox"
        className="hidden"
      />
      <label htmlFor={id} className={Styles["checkbox-label-container"]}>
        <div className={Styles["checkbox-container"]} tabIndex={0}>
          <FaCheck className={Styles["checkbox-element"]} />
        </div>
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
