"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Styles from "../Styles.module.css";

type OptionType = string;

interface BaseProps<T extends OptionType> {
  name: string;
  option: T;
  options: T[];
  setOption: (selectOption: T) => void;
  parser: (value: T) => string;
}

interface ErrorProps {
  error: boolean;
  errorText: string;
  placeholder: string;
}

interface NoErrorProps {
  error?: false;
  errorText?: never;
  placeholder?: never;
}

type SelectInputProps<T extends OptionType> = BaseProps<T> &
  (ErrorProps | NoErrorProps);

// "error" & "errorText" & "placeholder": either you pass all of them, or none
// "error" was made up to validate the "placeholder" option, if exists
// "errorText" is the explanation of that error to the user
// If no "placeholder" option is being used, there is no purpose of using "ErrorProps", since all options should be valid

// "name": what name react actions should look up for when submiting a form

// "parser": a function that translates the select input options to a enum version of that option so the database may read it

// "option" & "setOption": long sentence of the database enum so the user can understand what the options are

// "options": list of every user interface options (long sentence, not the enum version)
const SelectInput = <T extends OptionType>({
  name,
  option,
  options,
  setOption,
  parser,
  error,
  errorText,
  placeholder,
}: SelectInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return; // Add an event listener only when isOpen is true
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

  const handleSelect = (option: T) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        ref={dropdown}
        className={`${Styles["inner-container"]} ${error && option === placeholder && Styles["inner-container-error"]}`}
        // tabIndex={0}
      >
        <input type="hidden" name={name} value={parser(option)} />
        <div
          className={Styles["select-select-container"]}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setIsOpen(false)}
        >
          <label className={Styles["select-label"]}>{option}</label>
          <button
            type="button"
            className={Styles["select-arrow"]}
            // tabIndex={-1}
            style={{ transform: isOpen ? "rotate(180deg)" : "" }}
          >
            <IoIosArrowDown />
          </button>
        </div>
        {isOpen && (
          <ul className={Styles["select-dropdown"]} tabIndex={0}>
            {options.map((opt) => (
              <li key={opt} onClick={() => handleSelect(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && option === placeholder && (
        <p className="text-xs px-2 mt-1 text-red-500">{errorText}</p>
      )}
    </div>
  );
};

export default SelectInput;
