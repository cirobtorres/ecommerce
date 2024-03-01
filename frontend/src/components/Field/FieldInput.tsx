"use client";

import useField from "@/hooks/useField";
import { useCallback, useEffect } from "react";

import {
  cepMask,
  phoneMask,
  dateMask,
  cpfMask,
  cnpjMask,
} from "@/functions/inputMasks";

type FieldProps = {
  children?: React.ReactNode;
  type?: "text" | "date" | "email" | "password";
  id: string;
  name: string;
  mask?: "cep" | "phone" | "date" | "cpf" | "cnpj";
  bgColor?: string;
  placeholder?: string;
  isRequired?: boolean;
  errorFunction?: (value: string) => any[];
};

export default function FieldInput({
  children,
  type = "text",
  id,
  name,
  mask,
  bgColor = "bg-theme-01",
  placeholder = "",
  isRequired = false,
  errorFunction,
}: FieldProps) {
  const {
    isEmpty,
    setBgColor,
    setId,
    setValue,
    setError,
    setIsEmpty,
    setIsRequired,
  } = useField();

  useEffect(() => {
    setId(id);
    setBgColor(bgColor);
    setIsRequired(isRequired);
  }, []);

  const handleOnChange = (event: any) => {
    if (errorFunction) {
      setValue(event.target.value);
      setError(errorFunction(event.target.value));
    }
  };

  const handleOnBlur = (event: any) => {
    if (event.target.value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const handleOnFocus = () => {
    setIsEmpty(false);
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
    <div className={"relative"}>
      <input
        type={type}
        id={id}
        name={name}
        required={isRequired}
        placeholder={placeholder}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        // maxLength={
        //   mask
        //     ? mask === "cep"
        //       ? 9
        //       : mask === "phone"
        //         ? 14
        //         : mask === "date"
        //           ? 10
        //           : mask === "cpf"
        //             ? 14
        //             : mask === "cnpj"
        //               ? 19
        //               : undefined
        //     : undefined
        // }
        className={`
          peer w-full rounded border ${bgColor} p-3 text-theme-04 
          outline-none focus:ring-0 focus:placeholder:text-theme-08 
          placeholder:text-transparent active:placeholder:text-theme-08
          ${isEmpty && isRequired ? "border-red-500" : "border-theme-02"}
          ${
            isEmpty && isRequired
              ? "focus:border-red-500"
              : "focus:border-theme-08"
          }
        `}
      />
      {children}
    </div>
  );
}
