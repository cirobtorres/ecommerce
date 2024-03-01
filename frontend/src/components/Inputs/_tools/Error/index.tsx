import { IoIosWarning } from "react-icons/io";

export default function Error({
  isError,
  isRequired,
}: {
  isError: [boolean, string];
  isRequired: boolean;
}) {
  return (
    isRequired &&
    isError[0] && (
      <span className="ml-1 flex flex-row items-center gap-1 p-1 text-left text-sm text-red-500">
        <IoIosWarning size="1.25rem" /> {isError[1]}
      </span>
    )
  );
}
