"use client";

import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Label from "../_tools/Label";
import Error from "../_tools/Error";

interface PassConfProps {
  id: string;
  name: string;
  label: string;
  value: string;
  passwordValue: string;
  bgColor?: string;
  placeholder?: string;
  isRequired?: boolean;
  setValue: (value: string) => void;
}

export default function PasswordConfirm({
  id,
  name,
  label,
  value,
  passwordValue,
  bgColor = "bg-theme-01",
  placeholder = "",
  isRequired = true,
  setValue,
}: PassConfProps) {
  const [type, setType] = useState("password");
  const [isError, setIsError] = useState<[boolean, string]>([false, ""]);
  /*
  Error types: 
    - 1. mandatory fields left empty; 
    - 2. different password and password confirmation.
  */

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
    if (event.target.value !== passwordValue) {
      setIsError([true, "Senhas não são iguais"]);
    } else {
      setIsError([false, ""]);
    }
  };

  const handleOnBlur = (event: any) => {
    if (value === "") {
      setIsError([true, "É necessário confirmar sua senha"]);
    } else if (passwordValue !== "" && event.target.value !== passwordValue) {
      setIsError([true, "Senhas não são iguais"]);
    } else {
      setIsError([false, ""]);
    }
  };

  const handleOnFocus = () => {
    setIsError([false, ""]);
  };

  const handleTypeSwitch = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className={"relative"}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          required={isRequired}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          className={`
          peer w-full rounded border ${bgColor} p-3 text-theme-04 
          outline-none focus:ring-0 focus:placeholder:text-theme-08 
          placeholder:text-transparent active:placeholder:text-theme-08
          ${isError[0] && isRequired ? "border-red-500" : "border-theme-02"}
          ${
            isError[0] && isRequired
              ? "focus:border-red-500"
              : "focus:border-theme-08"
          }
        `}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-theme-03 outline-none"
          tabIndex={-1}
          onClick={handleTypeSwitch}
        >
          {type === "password" ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
        <Label
          id={`${id}_label`}
          label={label}
          bgColor={bgColor}
          isError={isError[0]}
          isRequired={isRequired}
        />
      </div>
      <Error isError={isError} isRequired={isRequired} />
    </div>
  );
}
