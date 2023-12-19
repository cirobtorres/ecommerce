"use client";

import { useState } from "react";

import { xMark, warning } from "@/icons";
// import useTheme from "@/hooks/useTheme";

type FieldProps = {
  type: "text" | "date" | "email" | "password";
  id: string;
  label: string;
  required?: boolean;
  onChange: (event: any) => void;
  errorFunction?: (value: string) => any[];
};

export default function Field(props: FieldProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [value, setValue] = useState("" as string);
  const [error, setError] = useState([] as string[]);

  // const { theme } = useTheme();

  function handleOnChange(event: any) {
    setValue(event.target.value);
    props.onChange(value);
    if (props.errorFunction) {
      setError(props.errorFunction(event.target.value));
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
    // This component is intended to be nested inside a flex container
    <div className={"flex h-full w-full flex-col"}>
      <div className={"relative"}>
        <input
          type={props.type}
          id={props.id}
          onChange={handleOnChange}
          required={props.required}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          placeholder=""
          className={`
						peer w-full rounded border bg-theme-01-light-gray p-3 text-theme-04-medium-gray 
						outline-none focus:ring-0 dark:bg-slate-800 dark:text-theme-01-light-gray 
						${
              isEmpty
                ? "border-red-500"
                : "border-theme-02-light-gray dark:border-theme-04-medium-gray"
            }
						${
              isEmpty
                ? "focus:border-red-500"
                : "focus:border-theme-08-light-green dark:focus:border-theme-08-light-green"
            }
					`}
        />
        <label
          htmlFor={props.id}
          className={`
						pointer-events-none absolute start-2 top-2 z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform px-2 text-base duration-300 
						peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
						peer-focus:top-2 peer-focus:-translate-y-[1.1rem] peer-focus:scale-75 peer-focus:px-2
						rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 
						${
              isEmpty ? "text-red-500" : "text-theme-03-medium-gray"
            } bg-theme-01-light-gray dark:bg-slate-800 
						${isEmpty ? "peer-focus:text-red-500" : "peer-focus:text-theme-08-light-green"}
					`}
        >
          {/* duration-300 delays the background recolor from light to dark mode and vice versa */}
          {props.label}
        </label>
      </div>
      {/* {props.required && isEmpty && (
        <span
          className={"flex flex-row gap-1 p-1 text-left text-sm text-red-500"}
        >
          {warning(20, 20)} Campo obrigatório
        </span>
      )} */}
      {error.length > 0 && value && (
        <div className={"my-2 grid grid-cols-2 gap-1 text-base"}>
          {error &&
            error.map((errorText, index) =>
              Number(errorText[1]) === 0 ? (
                <span
                  key={index}
                  className={`
							flex items-center justify-center rounded border bg-green-100 text-sm text-theme-08-light-green`}
                >
                  {errorText[0]}
                </span>
              ) : (
                <span
                  key={index}
                  className={`
							flex items-center justify-center rounded border bg-red-200 text-sm text-red-500
						`}
                >
                  {xMark(20, 20)} {errorText[0]}
                </span>
              )
            )}
        </div>
      )}
    </div>
  );
}
