"use client";

import { useEffect } from "react";
import { FaLock } from "react-icons/fa6";
import Styles from "../Styles.module.css";

const DisableInput = ({
  id,
  value,
  setValue,
  text,
  placeholder,
  disable,
  state,
}: {
  id: string;
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
  disable?: boolean;
  state?: { blankError: boolean };
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (disable) setValue("");
  }, [disable]);

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`
          ${Styles["inner-container"]} 
          ${state?.blankError && !disable && !value && Styles["inner-container-error"]} 
          ${disable && Styles["inner-container-disabled"]}
        `}
      >
        {!disable && (
          <input
            id={id}
            name={id}
            type="text"
            value={value}
            tabIndex={disable ? -1 : 0}
            disabled={disable}
            onChange={handleOnChange}
            className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
            placeholder={placeholder}
          />
        )}
        <label
          htmlFor={id}
          className={`${!disable && Styles["label-element"]} ${disable && Styles["label-element-disabled"]}`}
        >
          {text}
        </label>
        {disable && <FaLock className={Styles["disabled-icon-lock"]} />}
      </div>
      {state?.blankError && !disable && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">Campo obrigatório</p>
      )}
    </div>
  );
};

export default DisableInput;
