"use client";

import { useCallback, useState } from "react";
import Label from "../_tools/Label";
import Error from "../_tools/Error";
import {
  cepMask,
  cnpjMask,
  cpfMask,
  dateMask,
  phoneMask,
} from "@/functions/inputMasks";

interface InputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  type?: "text" | "email" | "date";
  bgColor?: string;
  mask?: "cep" | "phone" | "date" | "cpf" | "cnpj";
  placeholder?: string;
  isRequired?: [boolean, string];
  setValue: (value: string) => void;
}

export default function Input({
  id,
  type = "text",
  name,
  label,
  value,
  bgColor = "bg-theme-01",
  mask,
  placeholder = "",
  isRequired = [false, ""],
  setValue,
}: InputProps) {
  const [isError, setIsError] = useState<[boolean, string]>([false, ""]);

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleOnBlur = () => {
    if (value === "" && isRequired[0]) {
      setIsError(isRequired);
    } else {
      setIsError([false, ""]);
    }
  };

  const handleOnFocus = () => {
    setIsError([false, ""]);
  };

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      if (mask === "cep") {
        cepMask(event);
      }
      if (mask === "phone") {
        phoneMask(event);
      }
      if (mask === "date") {
        dateMask(event);
      }
      if (mask === "cpf") {
        cpfMask(event);
      }
      if (mask === "cnpj") {
        cnpjMask(event);
      }
    },
    [mask]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className={"relative"}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          required={isRequired[0]}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
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
        <Label
          id={`${id}_label`}
          label={label}
          bgColor={bgColor}
          isError={isError[0]}
          isRequired={isRequired[0]}
        />
      </div>
      <Error isError={isError} isRequired={isRequired[0]} />
    </div>
  );
}
