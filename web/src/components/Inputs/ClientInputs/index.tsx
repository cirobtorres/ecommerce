"use client";

import { useEffect, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PassStyles from "./PassStyles.module.css";
import Styles from "../Styles.module.css";

const GenderInput = () => {
  const [option, setOption] = useState("Gênero");
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return; // Add a event listener only when is opened is true
    function handleClick(event: MouseEvent) {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick); // Clean up
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdown} className={Styles["outter-container"]}>
      <input type="hidden" value={option} />
      <div
        className={Styles["gender-select-container"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className={Styles["gender-label"]}>{option}</label>
        <button
          type="button"
          className={Styles["gender-arrow"]}
          style={{ transform: isOpen ? "rotate(180deg)" : "" }}
        >
          <IoIosArrowDown />
        </button>
      </div>
      {isOpen && (
        <ul className={Styles["gender-dropdown"]}>
          <li onClick={() => handleSelect("Hello World 1")}>Hello World 1</li>
          <li onClick={() => handleSelect("Hello World 2")}>Hello World 2</li>
          <li onClick={() => handleSelect("Hello World 3")}>Hello World 3</li>
          <li onClick={() => handleSelect("Hello World 4")}>Hello World 4</li>
        </ul>
      )}
    </div>
  );
};

const PasswordInput = ({
  value,
  setValue,
  text,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
}) => {
  const [type, setType] = useState<"text" | "password">("password");

  const handleTypeToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={`${
        Styles["outter-container"]
      } ${Styles["pass-label-element-padding"]}`}
    >
      <input
        id="password"
        name="password"
        type={type}
        autoComplete="new-password"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${PassStyles["pass-input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="password" className={Styles["label-element"]}>
        {text}
      </label>
      <button
        type="button"
        onClick={handleTypeToggle}
        className={PassStyles["pass-toggle-eye"]}
        tabIndex={-1}
      >
        {type === "password" ? (
          <IoEyeOffOutline className={PassStyles["toggle-off"]} />
        ) : (
          <IoEyeOutline className={PassStyles["toggle-on"]} />
        )}
      </button>
    </div>
  );
};

const PasswordRules = ({
  password1,
  password2,
}: {
  password1: string;
  password2: string;
}) => {
  return (
    <div className={PassStyles["pass-rules-container"]}>
      {password1 && (
        <>
          <span
            className={PassStyles["pass-rules-elements"]}
            style={{
              backgroundColor: password1 === password2 ? "#22c55e" : "#ef4444",
            }}
          >
            Confirmação de Senha
          </span>
          <span
            className={PassStyles["pass-rules-elements"]}
            style={{
              backgroundColor: password1.length >= 8 ? "#22c55e" : "#ef4444",
            }}
          >
            &gt; 8 caracteres
          </span>
          <span
            className={PassStyles["pass-rules-elements"]}
            style={{
              backgroundColor: /[A-Z]/.test(password1) ? "#22c55e" : "#ef4444",
            }}
          >
            Maiúscula
          </span>
          <span
            className={PassStyles["pass-rules-elements"]}
            style={{
              backgroundColor: /[a-z]/.test(password1) ? "#22c55e" : "#ef4444",
            }}
          >
            Minúscula
          </span>
          <span
            className={PassStyles["pass-rules-elements"]}
            style={{
              backgroundColor: /\d/.test(password1) ? "#22c55e" : "#ef4444",
            }}
          >
            Dígito
          </span>
          <span
            className={PassStyles["pass-rules-elements"]}
            style={{
              backgroundColor: /[^\w]/.test(password1) ? "#22c55e" : "#ef4444",
            }}
          >
            Símbolo
          </span>
        </>
      )}
    </div>
  );
};

export { GenderInput, PasswordInput, PasswordRules };
