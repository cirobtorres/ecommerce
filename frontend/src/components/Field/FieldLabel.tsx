import useField from "@/hooks/useField";

export default function FieldLabel({ label }: { label: string }) {
  const { id, isEmpty, isRequired } = useField();
  return (
    <label
      htmlFor={id}
      className={`pointer-events-none absolute start-2 top-2 z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform px-2 text-base duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-[1.1rem] peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 ${
        isEmpty && isRequired ? "text-red-500" : "text-theme-03-medium-gray"
      }  bg-theme-01-light-gray dark:bg-slate-800 ${
        isEmpty && isRequired
          ? "peer-focus:text-red-500"
          : "peer-focus:text-theme-08-light-green"
      }`}
    >
      {label}
    </label>
  );
}
