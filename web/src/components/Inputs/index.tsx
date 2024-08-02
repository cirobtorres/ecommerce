"use client";

import Styles from "./Styles.module.css";
import { useEffect, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const NameInput = ({
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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <input
        id="name"
        name="name"
        type="text"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="name" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const EmailInput = ({
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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <input
        id="email"
        name="email"
        type="email"
        // autoComplete="off"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="email" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const CPFInput = ({
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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="cpf"
        name="cpf"
        type="text"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="cpf" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const CNPJInput = ({
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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="cnpj"
        name="cnpj"
        type="text"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="cnpj" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const DateInput = ({
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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="birth-date"
        name="birth-date"
        type="text"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="birth-date" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const PhoneInput = ({
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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <input
        id="phone"
        name="phone"
        type="text"
        value={value}
        onChange={handleOnChange}
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="phone" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

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
        console.log("SIM");
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

  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets

  return (
    <div
      ref={dropdown}
      className={Styles["outter-container"]}
      // tabIndex={0}
    >
      <input type="hidden" value={option} />
      <div
        className={Styles["gender-select-container"]}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <label className={Styles["gender-label"]}>{option}</label>
        <button
          type="button"
          className={Styles["gender-arrow"]}
          // tabIndex={-1}
          style={{ transform: isOpen ? "rotate(180deg)" : "" }}
        >
          <IoIosArrowDown />
        </button>
      </div>
      {isOpen && (
        <ul className={Styles["gender-dropdown"]} tabIndex={0}>
          <li onClick={() => handleSelect("Não especificado")}>
            Não especificado
          </li>
          <li onClick={() => handleSelect("Feminino")}>Feminino</li>
          <li onClick={() => handleSelect("Masculino")}>Masculino</li>
          <li onClick={() => handleSelect("Outro")}>Outro</li>
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
  );
};

const PasswordRules = ({
  pass1,
  pass2,
  message,
  progress,
}: {
  pass1: string;
  pass2: string;
  message: string;
  progress: string;
}) => {
  const getActiveColor = (type: string) => {
    switch (type) {
      case "muito forte":
        return "#3fbb60";
      case "forte":
        return "#e4c642";
      case "médio":
        return "#fe804d";
      default:
        return "#ff0054";
    }
  };

  return (
    <>
      <div className={Styles["pass-progress-bar-container"]}>
        <p className={Styles["pass-progress-bar-message"]}>
          Força da senha: {pass1 && message}
        </p>
        <div className={Styles["pass-progress-bar-bg"]}>
          <div
            className={Styles["pass-progress-bar"]}
            style={{
              width: progress,
              backgroundColor: getActiveColor(message),
            }}
          />
        </div>
      </div>
      <div className={Styles["pass-rules-container"]}>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: pass1 === pass2 ? "#22c55e" : "#ef4444",
          }}
        >
          Confirmação de Senha
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: pass1.length >= 8 ? "#22c55e" : "#ef4444",
          }}
        >
          &gt; 8 caracteres
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /[A-Z]/.test(pass1) ? "#22c55e" : "#ef4444",
          }}
        >
          Maiúscula
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /[a-z]/.test(pass1) ? "#22c55e" : "#ef4444",
          }}
        >
          Minúscula
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /\d/.test(pass1) ? "#22c55e" : "#ef4444",
          }}
        >
          Dígito
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /[^\w]/.test(pass1) ? "#22c55e" : "#ef4444",
          }}
        >
          Símbolo
        </span>
      </div>
    </>
  );
};

export {
  NameInput,
  EmailInput,
  CPFInput,
  CNPJInput,
  DateInput,
  PhoneInput,
  GenderInput,
  PasswordInput,
  PasswordRules,
};
