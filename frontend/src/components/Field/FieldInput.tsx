"use client";

import useField from "@/hooks/useField";
import { useEffect } from "react";

type FieldProps = {
  children?: React.ReactNode;
  type?: "text" | "date" | "email" | "password";
  id: string;
  onChange: (value: string) => void;
  isRequired?: boolean;
  errorFunction?: (value: string) => any[];
};

export default function FieldInput({
  children,
  type = "text",
  id,
  isRequired = false,
  onChange: onChangeValue,
  errorFunction,
}: FieldProps) {
  const { isEmpty, setId, setValue, setError, setIsEmpty, setIsRequired } =
    useField();

  useEffect(() => {
    setId(id);
    setIsRequired(isRequired);
  }, []);

  function handleOnChange(event: any) {
    onChangeValue(event.target.value);
    setValue(event.target.value);
    if (errorFunction) {
      setError(errorFunction(event.target.value));
    }
  }

  function handleOnBlur(event: any) {
    if (event.target.value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }

  function handleOnFocus() {
    setIsEmpty(false);
  }

  return (
    <div className={"relative"}>
      <input
        type={type}
        id={id}
        onChange={handleOnChange}
        required={isRequired}
        onBlur={handleOnBlur} // Leaving input
        onFocus={handleOnFocus} // Clicking on input
        placeholder=""
        className={`
          peer w-full rounded border bg-theme-01 p-3 text-theme-04 
          outline-none focus:ring-0 
          ${
            isEmpty && isRequired
              ? "border-red-500"
              : "border-theme-02"
          }
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
