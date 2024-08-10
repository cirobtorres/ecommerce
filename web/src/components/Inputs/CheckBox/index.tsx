"use client";

import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Styles from "./Styles.module.css";

const CheckBox = ({
  children,
  id,
  value,
  error,
  checked = false,
}: {
  children: React.ReactNode;
  id: string;
  value: string;
  error?: boolean;
  checked?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={Styles["checkbox-main-container"]}>
      <input
        id={id}
        name={id}
        value={value}
        type="checkbox"
        className="hidden"
        onChange={handleCheck}
        checked={isChecked}
      />
      <label
        htmlFor={id}
        className={`${Styles["checkbox-label-container"]} ${error && !isChecked && Styles["checkbox-label-container-error"]}`}
      >
        <div
          className={`${Styles["checkbox-container"]} ${error && !isChecked && Styles["checkbox-container-error"]}`}
          tabIndex={0}
        >
          <FaCheck className={Styles["checkbox-element"]} />
        </div>
        {children}
      </label>
      {error && !isChecked && (
        <p className="text-xs px-2 mt-1 text-red-500">
          É importante que você concorde com nossas políticas de privacidade e
          proteção de dados e informação
        </p>
      )}
    </div>
  );
};

export default CheckBox;
