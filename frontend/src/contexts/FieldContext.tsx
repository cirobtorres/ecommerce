"use client";

import { useState, createContext } from "react";

type FieldContextProps = {
  id: string;
  setId: (id: string) => void;
  value: string;
  setValue: (value: string) => void;
  error: [string, number][];
  setError: (error: [string, number][]) => void;
  isEmpty: boolean;
  setIsEmpty: (isEmpty: boolean) => void;
  isRequired: boolean;
  setIsRequired: (isRequired: boolean) => void;
};

const FieldContext = createContext<FieldContextProps>({} as FieldContextProps);

export function FieldContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setId] = useState("" as string);
  const [value, setValue] = useState("" as string);
  const [error, setError] = useState([] as [string, number][]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  return (
    <FieldContext.Provider
      value={{
        id,
        setId,
        value,
        setValue,
        error,
        setError,
        isEmpty,
        setIsEmpty,
        isRequired,
        setIsRequired,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
}

export default FieldContext;
export const FieldContextConsumer = FieldContext.Consumer;
