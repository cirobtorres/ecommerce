import useField from "@/hooks/useField";
import { FaCheck } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function FieldHelp() {
  const { value, error } = useField();

  return (
    error.length > 0 &&
    value && (
      <div className={"my-2 grid grid-cols-2 gap-1 text-base"}>
        {error.map((errorText, index) =>
          Number(errorText[1]) === 0 ? (
            <span
              key={index}
              className="flex items-center justify-center rounded border bg-green-100 text-sm text-theme-08 border-theme-08"
            >
              <FaCheck size="1rem" className="mr-1" /> {errorText[0]}
            </span>
          ) : (
            <span
              key={index}
              className="flex items-center justify-center rounded border bg-red-200 text-sm text-red-500 border-red-500"
            >
              <IoIosClose size="1rem" /> {errorText[0]}
            </span>
          )
        )}
      </div>
    )
  );
}
