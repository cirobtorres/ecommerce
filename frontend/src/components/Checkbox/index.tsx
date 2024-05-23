import { useEffect, useState } from "react";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  error: boolean;
  value: number;
  setValue: (value: number) => void;
}

export const Checkbox = ({
  id,
  name,
  label,
  checked,
  error,
  value,
  setValue,
}: CheckboxProps) => {
  return (
    <label
      className={`relative pl-8 py-2 cursor-pointer has-[:checked]:text-theme-03 ${
        error ? "text-red-500" : "text-theme-03"
      }`}
    >
      {label}
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={() => setValue(value * -1)}
        defaultChecked={checked}
        className="opacity-0 h-0 w-0 peer selection"
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-0 h-6 w-6 rounded bg-inherit border ${
          error ? "border-red-500" : "border-theme-02"
        } peer-checked:border-theme-08`}
      />
      <div
        className={`absolute top-2 left-2 hidden border-theme-08 border-r-4 border-b-4 w-2 h-4 
        [-webkit-transform:rotate(45deg)] [-ms-transform:rotate(45deg)] [transform:rotate(45deg)] 
        peer-checked:block peer-checked:animate-bounce-once`}
      />
    </label>
  );
};
