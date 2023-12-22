"use client";

import useField from "@/hooks/useField";
import { useEffect } from "react";

type FieldProps = {
  children?: React.ReactNode;
  type?: "text" | "date" | "email" | "password";
  id: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
  errorFunction?: (value: string) => any[];
};

export default function FieldInput({
  children,
  type = "text",
  id,
  isRequired = false,
  setValue,
  errorFunction,
}: FieldProps) {
  const { isEmpty, setIsEmpty, handleValue, handleError, saveVariables } =
    useField();

  useEffect(() => {
    saveVariables(id, isRequired);
  }, []);

  function handleOnChange(event: any) {
    setValue(event.target.value);
    handleValue(event.target.value);
    if (errorFunction) {
      handleError(errorFunction(event.target.value));
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
						peer w-full rounded border bg-theme-01-light-gray p-3 text-theme-04-medium-gray 
						outline-none focus:ring-0 
						${isEmpty ? "border-red-500" : "border-theme-02-light-gray"}
						${isEmpty ? "focus:border-red-500" : "focus:border-theme-08-light-green"}
					`}
      />
      {children}
    </div>
  );
}
