import useField from "@/hooks/useField";
import { IoIosWarning } from "react-icons/io";

export default function FieldError({ errorText }: { errorText: string }) {
  const { isRequired, isEmpty } = useField();
  return (
    isRequired &&
    isEmpty && (
      <span className="ml-1 flex flex-row items-center gap-1 p-1 text-left text-sm text-red-500">
        <IoIosWarning size="1.25rem" /> {errorText}
      </span>
    )
  );
}
