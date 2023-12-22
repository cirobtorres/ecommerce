"use client";

import { useState, createContext } from "react";

type FieldContextProps = {
  id: string;
  value: string;
  error: [string, number][];
  isEmpty: boolean;
  setIsEmpty: (isEmpty: boolean) => void;
  isRequired: boolean;
  handleValue: (value: string) => void;
  handleError: (errorFunction: [string, number][]) => void;
  saveVariables: (id: string, isRequired: boolean) => void;
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

  const saveVariables = (id: string, isRequired: boolean) => {
    setId(id);
    setIsRequired(isRequired);
  };

  const handleError = (value: [string, number][]) => {
    setError(value);
  };

  const handleValue = (value: string) => {
    setValue(value);
  };

  return (
    <FieldContext.Provider
      value={{
        id,
        value,
        error,
        isEmpty,
        setIsEmpty,
        isRequired,
        handleValue,
        handleError,
        saveVariables,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
}

export default FieldContext;
export const FieldContextConsumer = FieldContext.Consumer;
