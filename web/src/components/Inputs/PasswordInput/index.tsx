"use client";

import { useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Styles from "../Styles.module.css";

const PasswordInput = ({
  value,
  setValue,
  id,
  text,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  id: string;
  text: string;
  placeholder: string;
}) => {
  const [type, setType] = useState<"text" | "password">("password");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTypeToggle = () => {
    setType(type === "password" ? "text" : "password");
    setTimeout(() => {
      // setTimeout is used here to ensure the focus and selection range are updated after DOM remontage
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(value.length, value.length); // Set position focus after the last character of the input value
      }
    }, 0);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`${Styles["inner-container"]} ${Styles["pass-label-element-padding"]}`}
      >
        <input
          ref={inputRef}
          id={id}
          name={id}
          type={type}
          autoComplete="new-password"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["pass-input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="password" className={Styles["label-element"]}>
          {text}
        </label>
        <button
          type="button"
          onClick={handleTypeToggle}
          className={Styles["pass-toggle-eye"]}
          tabIndex={-1}
        >
          {type === "password" ? (
            <IoEyeOffOutline className={Styles["toggle-off"]} />
          ) : (
            <IoEyeOutline className={Styles["toggle-on"]} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
