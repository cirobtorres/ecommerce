"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Styles from "../Styles.module.css";

const GenderInput = () => {
  function enumParser(gender: string) {
    switch (gender) {
      case "Não especificado":
        return "N";
      case "Feminino":
        return "F";
      case "Masculino":
        return "M";
      case "Outro":
        return "O";
    }
  }

  const [option, setOption] = useState<
    "Não especificado" | "Feminino" | "Masculino" | "Outro"
  >("Não especificado");
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

  const handleSelect = (
    option: "Não especificado" | "Feminino" | "Masculino" | "Outro"
  ) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        ref={dropdown}
        className={Styles["inner-container"]}
        // tabIndex={0}
      >
        <input type="hidden" name="gender" value={enumParser(option)} />
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
    </div>
  );
};

export default GenderInput;
